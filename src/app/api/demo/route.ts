import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendDemoConfirmation } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'

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

const rateLimit = createMemoryLimiter(8, 60 * 60 * 1000)


export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  const ip = getClientIp(req)
  if (!rateLimit(ip).ok) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

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

  // Fail closed on misconfiguration: without SUPABASE_SERVICE_ROLE_KEY there is
  // no durable limiter and no way to persist the request, so the route refuses
  // (503) rather than accepting on the per-instance memory limiter alone. An
  // RPC error at runtime still fails open, logged (see lib/rate-limit.ts).
  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(client, { route: '/api/demo', ip, max: 8 }))) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

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
