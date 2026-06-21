import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendDemoConfirmation } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'

export const dynamic = 'force-dynamic'

// Book-a-demo form endpoint. Mirrors the field-guide / resource-lead routes so
// every lead-capture form on the site shares ONE server-side path and ONE
// Turnstile secret (TURNSTILE_SECRET_KEY): verify Turnstile (fail-closed in
// prod) → persist to demo_requests (service role) → confirm by email + ping
// Slack. Replaces the standalone Supabase edge function, which used a separate
// (stale) Turnstile secret and returned 403.

let adminClient: SupabaseClient | null = null
function getAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient
  if (!env.supabaseServiceRoleKey) return null
  adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 8
const ipBuckets = new Map<string, number[]>()
function rateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const ts = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (ts.length >= RATE_LIMIT_MAX) return false
  ts.push(now)
  ipBuckets.set(ip, ts)
  return true
}
function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  // Outside prod with no keys, accept the dev bypass; in prod with missing keys, fail closed.
  if (!secret || !siteKey) return process.env.NODE_ENV !== 'production' && token === 'dev-mode-bypass'
  if (!token) return false
  try {
    const form = new URLSearchParams({ secret, response: token, remoteip: ip })
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form.toString() })
    if (!res.ok) return false
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    return false
  }
}

async function durableRateLimit(client: SupabaseClient, ip: string): Promise<boolean> {
  const { data, error } = await client.rpc('check_signup_rate_limit', { p_ip: ip, p_max: 8, p_window_secs: 3600 })
  if (error) return true // fail open
  return data === true
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  const ip = getClientIp(req)
  if (!rateLimit(ip)) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  let email: string, company: string, name: string, companySize: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim().toLowerCase().slice(0, 254)
    company = String(body.company ?? '').trim().slice(0, 200)
    name = String(body.name ?? '').trim().slice(0, 120)
    companySize = String(body.companySize ?? '').trim().slice(0, 40)
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid work email.' }, { status: 400 })
  }

  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(client, ip))) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  const { error: dbError } = await client
    .from('demo_requests')
    .insert({ email, company: company || null, name: name || null, company_size: companySize || null, source: 'demo' })
  if (dbError) {
    console.error('[demo] insert failed:', dbError.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  // Best-effort: confirmation email + founders' Slack, in parallel.
  await Promise.allSettled([
    sendDemoConfirmation({ email, name, company }),
    notifyLeadSlack({
      title: 'New demo request',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Company', value: company },
        { label: 'Company size', value: companySize },
      ],
      context: 'Demo form · mambahr.com/demo',
    }),
  ])

  return NextResponse.json({ ok: true })
}
