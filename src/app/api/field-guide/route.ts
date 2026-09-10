import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendFieldGuide } from '@/lib/email'
import { hashIp } from '@/lib/deck-tracking'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'

// Lead-magnet capture: email wall → per-request unguessable token → emailed
// link to the gated guide page (/resources/<path>?k=<token>). Mirrors the
// waitlist route's defenses (Turnstile + in-memory + durable rate-limit).

// Guide catalog, slug → public title + gated route path.
const GUIDES: Record<string, { title: string; path: string }> = {
  'rif-playbook': { title: 'The layoff playbook', path: '/resources/rif-playbook' },
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
  if (!client) return true // no service-role key: the in-memory limiter + Turnstile stand alone
  return durableRateLimit(client, { route: '/api/field-guide', ip, max: 5 })
}

const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)

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

  let email: string, name: string, company: string, guide: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim()
    name = String(body.name ?? '').trim().slice(0, 120)
    company = String(body.company ?? '').trim().slice(0, 200)
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
    token,
    ip_hash: ip && ip !== 'unknown' ? hashIp(ip) : null,
    sent_at: new Date().toISOString(),
  })
  if (error) {
    console.error('[field-guide] insert failed:', error.message)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  const url = `${SITE_URL}${meta.path}?k=${encodeURIComponent(token)}`
  await Promise.all([
    sendFieldGuide({ email, guideTitle: meta.title, url }),
    notifyLeadSlack({
      title: 'New field-guide lead',
      fields: [
        { label: 'Guide', value: meta.title },
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Company', value: company },
      ],
      context: 'Field guide · mambahr.com',
    }),
  ])

  return NextResponse.json({ success: true })
}
