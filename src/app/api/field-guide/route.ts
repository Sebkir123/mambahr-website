import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendFieldGuide } from '@/lib/email'
import { hashIp } from '@/lib/deck-tracking'

// Lead-magnet capture: email wall → per-request unguessable token → emailed
// link to the gated guide page (/resources/<path>?k=<token>). Mirrors the
// waitlist route's defenses (Turnstile + in-memory + durable rate-limit).

// Guide catalog — slug → public title + gated route path.
const GUIDES: Record<string, { title: string; path: string }> = {
  'rif-playbook': { title: 'The Defensible Layoff Playbook', path: '/resources/rif-playbook' },
}
const SITE_URL = 'https://mambahr.com'

let adminClient: SupabaseClient | null = null
function getAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient
  if (!env.supabaseServiceRoleKey) return null
  adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}

async function checkDurableRateLimit(ip: string): Promise<boolean> {
  const client = getAdminClient()
  if (!client) return true
  const { data, error } = await client.rpc('check_signup_rate_limit', { p_ip: ip, p_max: 5, p_window_secs: 3600 })
  if (error) return true // fail open
  return data === true
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  // Only accept the dev bypass outside production. In prod with missing keys,
  // fail closed rather than let a misconfig open an unauthenticated spam vector.
  if (!secret || !siteKey) return process.env.NODE_ENV !== 'production' && token === 'dev-mode-bypass'
  if (!token) return false
  try {
    const form = new URLSearchParams({ secret, response: token, remoteip: ip })
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    if (!res.ok) return false
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    return false
  }
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
const ipBuckets = new Map<string, number[]>()
function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const ts = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (ts.length >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((ts[0] + RATE_LIMIT_WINDOW_MS - now) / 1000) }
  }
  ts.push(now)
  ipBuckets.set(ip, ts)
  return { ok: true }
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

async function notifySlack(text: string) {
  const url = process.env.SLACK_WEBHOOK_WAITLIST
  if (!url) return
  try {
    await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
  } catch {
    /* best-effort */
  }
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  const ip = getClientIp(req)
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, {
      status: 429,
      headers: { 'Retry-After': String(limit.retryAfterSec ?? 3600) },
    })
  }
  if (!(await checkDurableRateLimit(ip))) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429, headers: { 'Retry-After': '3600' } })
  }

  let email: string, name: string, company: string, companyStage: string, guide: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim()
    name = String(body.name ?? '').trim().slice(0, 120)
    company = String(body.company ?? '').trim().slice(0, 200)
    companyStage = String(body.companyStage ?? '').trim().slice(0, 40)
    guide = String(body.guide ?? '').trim()
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid work email required.' }, { status: 400 })
  }
  const meta = GUIDES[guide]
  if (!meta) return NextResponse.json({ error: 'Unknown guide.' }, { status: 400 })

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })

  const token = randomBytes(12).toString('base64url') // ~16 unguessable chars
  const { error } = await client.from('field_guide_leads').insert({
    guide,
    email: email.slice(0, 200),
    recipient_name: name || null,
    company: company || null,
    company_stage: companyStage || null,
    token,
    ip_hash: ip && ip !== 'unknown' ? hashIp(ip) : null,
    sent_at: new Date().toISOString(),
  })
  if (error) {
    console.error('[field-guide] insert failed:', error.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  const url = `${SITE_URL}${meta.path}?k=${encodeURIComponent(token)}`
  const slackLine = `New field-guide lead:\n• *Guide:* ${meta.title}\n• *Name:* ${name || '(none)'}\n• *Email:* ${email}\n• *Company:* ${company || '(none)'}${companyStage ? `\n• *Stage:* ${companyStage}` : ''}`
  await Promise.all([
    sendFieldGuide({ email, guideTitle: meta.title, url }),
    notifySlack(slackLine),
  ])

  return NextResponse.json({ success: true })
}
