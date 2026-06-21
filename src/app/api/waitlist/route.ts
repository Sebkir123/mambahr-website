import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { getSupabase } from '@/lib/supabase'
import { sendWaitlistWelcome } from '@/lib/email'
import { getLeadSlackWebhook } from '@/lib/secrets'

// Service-role client used only for the rate-limit RPC (which is locked down to service_role).
// Typed as SupabaseClient (no generated DB types) so the untyped rpc() call type-checks.
// Lazily created so the module doesn't crash in environments without the key set.
let adminClient: SupabaseClient | null = null
function getAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient
  if (!env.supabaseServiceRoleKey) return null
  adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}

async function checkSupabaseRateLimit(ip: string): Promise<boolean> {
  const client = getAdminClient()
  if (!client) return true // No service-role key configured → skip durable check.
  const { data, error } = await client.rpc('check_signup_rate_limit', {
    p_ip: ip,
    p_max: 5,
    p_window_secs: 3600,
  })
  // Fail open: if the DB call errors, fall back to the in-memory limiter alone rather than blocking
  // legitimate signups. The in-memory limiter is still the first line of defense.
  if (error) return true
  return data === true
}

function escapeSlack(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  // No secret OR no site key (widget couldn't render) → accept bypass token
  if (!secret || !siteKey) return token === 'dev-mode-bypass'
  if (!token) return false

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secret)
    formData.append('response', token)
    formData.append('remoteip', ip)

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })
    if (!res.ok) return false
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    return false
  }
}

async function notifySlack(text: string) {
  const url = await getLeadSlackWebhook()
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch {
    // best-effort
  }
}

// In-memory rate limiter (per IP, sliding window).
// Vercel restarts the function frequently so this is more of a "spam dampener"
// than a hard guarantee. Good enough for a waitlist form.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5                     // 5 requests / hour / IP
const ipBuckets = new Map<string, number[]>()

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = timestamps[0]
    return { ok: false, retryAfterSec: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) }
  }
  timestamps.push(now)
  ipBuckets.set(ip, timestamps)
  return { ok: true }
}

function getClientIp(req: NextRequest): string {
  // Vercel forwards via x-forwarded-for; first value is the real client
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  const ip = getClientIp(req)
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSec ?? 3600) },
      }
    )
  }

  // Second-layer durable check that survives lambda cold-starts across instances.
  const durableOk = await checkSupabaseRateLimit(ip)
  if (!durableOk) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } }
    )
  }

  let email: string, company: string, turnstileToken: string
  try {
    const rawBody = await req.text()
    if (rawBody.length > 4096) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    }
    const body = JSON.parse(rawBody)
    email = String(body.email ?? '').trim()
    company = String(body.company ?? '').trim()
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid work email required.' }, { status: 400 })
  }

  const verified = await verifyTurnstile(turnstileToken, ip)
  if (!verified) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  const { error } = await getSupabase()
    .from('waitlist')
    .insert({ email, company })

  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  if (!error) {
    await Promise.all([
      notifySlack(`New waitlist signup:\n• *Email:* ${escapeSlack(email)}\n• *Company:* ${escapeSlack(company) || '(not provided)'}`),
      sendWaitlistWelcome({ email, company }),
    ])
  }

  return NextResponse.json({ success: true })
}
