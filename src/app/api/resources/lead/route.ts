import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { resourceDownloadUrl } from '@/lib/resources'
import { sendResourceDownload } from '@/lib/email'

export const dynamic = 'force-dynamic'

// Email-gated resource download. Captures a lead (email + which playbook) into
// magnet_requests — so it flows into the unified Leads admin + CSV export — then
// returns the PDF download URL. Mirrors the field-guide route's defenses
// (Turnstile + in-memory + durable rate-limit). The PDF URL is never in the page
// source, so the email wall can't be bypassed by reading the HTML.

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

  let slug: string, email: string, company: string, name: string, companyStage: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    slug = String(body.slug ?? '').trim().slice(0, 80)
    email = String(body.email ?? '').trim().slice(0, 200)
    company = String(body.company ?? '').trim().slice(0, 200)
    name = String(body.name ?? '').trim().slice(0, 120)
    companyStage = String(body.companyStage ?? '').trim().slice(0, 40)
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email.includes('@') || email.length < 4) return NextResponse.json({ error: 'Enter a valid work email.' }, { status: 400 })
  if (!slug) return NextResponse.json({ error: 'Missing resource.' }, { status: 400 })

  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(client, ip))) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  // Resource must exist, be published, and have a file.
  const { data: r } = await client
    .from('resources')
    .select('slug, title, file_path, file_name, status')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (!r || !r.file_path) return NextResponse.json({ error: 'This resource isn’t available.' }, { status: 404 })

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  // Capture the lead → flows into the unified Leads admin (source 'magnet').
  await client.from('magnet_requests').insert({
    email,
    name: name || null,
    company: company || null,
    company_stage: companyStage || null,
    magnet_id: slug,
    source_url: `/resources/${slug}`,
    ip,
  })

  const dlUrl = resourceDownloadUrl(r.file_path as string, r.file_name as string | null)

  // Best-effort: email + Slack in parallel.
  await Promise.allSettled([
    sendResourceDownload({ email, name: name || '', title: r.title, kicker: 'Playbook', downloadUrl: dlUrl }),
    (async () => {
      const hook = process.env.SLACK_WEBHOOK_WAITLIST
      if (!hook) return
      await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: `📥 Playbook lead: ${name ? `${name}, ` : ''}${email}${company ? ` · ${company}` : ''}${companyStage ? ` · ${companyStage}` : ''} → ${r.title}` }) })
    })(),
  ])

  return NextResponse.json({ ok: true, downloadUrl: dlUrl })
}
