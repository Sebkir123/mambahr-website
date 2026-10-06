import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendWaitlistWelcome } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'
import { HANDOFFS, HR_SYSTEMS, TEAM_SIZES, labelFor } from '@/content/early-access'

// The early access list (/early-access). Writes with the service-role key: the
// waitlist table has no public insert policy, so Turnstile and the rate limits
// here are the only way in.
let adminClient: SupabaseClient | null = null
function getAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient
  if (!env.supabaseServiceRoleKey) return null
  adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}

// Spam dampener: 5 requests / hour / IP, per instance (see lib/rate-limit.ts).
const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

function oneOf(options: { value: string }[], v: unknown): string | null {
  return typeof v === 'string' && options.some((o) => o.value === v) ? v : null
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
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec ?? 3600) } },
    )
  }

  // Fail closed on misconfiguration, as /api/demo does: without the service
  // role there is no durable limiter and no way to store the row.
  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(client, { route: '/api/waitlist', ip, max: 5 }))) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    )
  }

  let email: string, company: string, turnstileToken: string
  let teamSize: string | null, hrSystem: string | null, handoffs: string[]
  try {
    const rawBody = await req.text()
    if (rawBody.length > 4096) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    }
    const body = JSON.parse(rawBody)
    email = String(body.email ?? '').trim().slice(0, 200)
    company = String(body.company ?? '').trim().slice(0, 200)
    turnstileToken = String(body.turnstileToken ?? '').trim()
    teamSize = oneOf(TEAM_SIZES, body.teamSize)
    hrSystem = oneOf(HR_SYSTEMS, body.hrSystem)
    const rawHandoffs: unknown[] = Array.isArray(body.handoffs) ? body.handoffs : []
    handoffs = [...new Set(rawHandoffs.map((h) => oneOf(HANDOFFS, h)).filter((h): h is string => h !== null))]
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Valid work email required.' }, { status: 400 })
  }
  if (!company || !teamSize || !hrSystem) {
    return NextResponse.json({ error: 'Company, team size and HR system are required.' }, { status: 400 })
  }

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  const { error } = await client.from('waitlist').insert({
    email,
    company,
    team_size: teamSize,
    hr_system: hrSystem,
    first_handoff: handoffs.length ? handoffs : null,
  })

  // 23505 = already on the list. Answer the same as a new signup so the form
  // never tells a stranger whether an address has joined.
  if (error && error.code !== '23505') {
    console.error('[waitlist] insert failed:', error.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  if (!error) {
    const hrLabel = labelFor(HR_SYSTEMS, hrSystem)
    await Promise.all([
      notifyLeadSlack({
        title: 'New early access signup',
        fields: [
          { label: 'Email', value: email },
          { label: 'Company', value: company },
          { label: 'Team size', value: labelFor(TEAM_SIZES, teamSize) },
          { label: 'HR system', value: hrLabel },
          { label: 'Hand off first', value: handoffs.map((h) => labelFor(HANDOFFS, h)).join(', ') },
        ],
        context: 'Early access · mambahr.com/early-access',
      }),
      sendWaitlistWelcome({ email, company, hrSystem: hrLabel }),
    ])
  }

  return NextResponse.json({ success: true })
}
