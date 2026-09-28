import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { sendCareersApplication, sendCareersConfirmation } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'
import { ROLES, GENERAL_APPLICATION } from '@/content/careers'

export const dynamic = 'force-dynamic'

// Careers application endpoint. Same guards as /api/demo (Turnstile, per-IP
// memory + durable rate limit, fail closed without the service role), but no
// table: the application goes to the team inbox with reply-to set to the
// applicant, plus a Slack ping and a confirmation to the applicant. The inbox
// email is the one that must succeed; if it fails the applicant is told to
// retry, so nothing is lost silently.

let adminClient: SupabaseClient | null = null
function getAdminClient(): SupabaseClient | null {
  if (adminClient) return adminClient
  if (!env.supabaseServiceRoleKey) return null
  adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}

const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)
const ROLE_TITLES = new Set([GENERAL_APPLICATION, ...ROLES.map((r) => r.title)])

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  const ip = getClientIp(req)
  if (!rateLimit(ip).ok) return NextResponse.json({ error: 'Too many applications from this network. Try again later.' }, { status: 429 })

  let name: string, email: string, role: string, link: string, note: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 8192) return NextResponse.json({ error: 'Your application is too long. Keep the note under 2,000 characters.' }, { status: 413 })
    const b = JSON.parse(raw)
    name = String(b.name ?? '').trim().slice(0, 120)
    email = String(b.email ?? '').trim().toLowerCase().slice(0, 254)
    role = String(b.role ?? '').trim().slice(0, 120)
    link = String(b.link ?? '').trim().slice(0, 300)
    note = String(b.note ?? '').trim()
    turnstileToken = String(b.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'We could not read the form. Refresh the page and try again.' }, { status: 400 })
  }

  if (!name) return NextResponse.json({ error: 'Enter your name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  if (!ROLE_TITLES.has(role)) role = GENERAL_APPLICATION
  if (link && !/^https?:\/\/[^\s]+\.[^\s]+/i.test(link)) return NextResponse.json({ error: 'Links need to start with https://' }, { status: 400 })
  if (note.length < 20) return NextResponse.json({ error: 'Tell us a little more: at least a couple of sentences.' }, { status: 400 })
  if (note.length > 2000) return NextResponse.json({ error: 'Keep the note under 2,000 characters.' }, { status: 400 })

  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Applications are not available right now. Email hello@mambahr.com instead.' }, { status: 503 })
  if (!(await durableRateLimit(client, { route: '/api/careers', ip, max: 5 }))) {
    return NextResponse.json({ error: 'Too many applications from this network. Try again later.' }, { status: 429 })
  }
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'The verification check failed. Refresh the page and try again.' }, { status: 403 })
  }

  const delivered = await sendCareersApplication({ name, email, role, link, note })
  if (!delivered) {
    return NextResponse.json({ error: 'Your application did not go through. Try again, or email hello@mambahr.com.' }, { status: 502 })
  }

  await Promise.allSettled([
    sendCareersConfirmation({ email, name, role }),
    notifyLeadSlack({
      title: 'New job application',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Role', value: role },
        { label: 'Link', value: link },
      ],
      context: 'Careers · mambahr.com/careers',
    }),
  ])

  return NextResponse.json({ ok: true })
}
