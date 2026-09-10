import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { getSupabase } from '@/lib/supabase'
import { sendWaitlistWelcome } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'

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
  // Fail open on RPC error (logged in lib/rate-limit.ts): the in-memory limiter
  // and Turnstile still stand, and a Supabase blip must not block signups.
  return durableRateLimit(client, { route: '/api/waitlist', ip, max: 5 })
}

// Spam dampener: 5 requests / hour / IP, per instance (see lib/rate-limit.ts).
const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)

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
      notifyLeadSlack({
        title: 'New waitlist application',
        fields: [
          { label: 'Email', value: email },
          { label: 'Company', value: company },
        ],
        context: 'Waitlist · mambahr.com',
      }),
      sendWaitlistWelcome({ email, company }),
    ])
  }

  return NextResponse.json({ success: true })
}
