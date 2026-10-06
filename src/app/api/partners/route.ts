import { NextRequest, NextResponse } from 'next/server'
import { sendPartnerAck } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'
import { earlyAccessDb } from '@/lib/early-access'
import { COMPANIES_ADVISED, PARTNER_SHARE, PARTNER_TYPES, labelFor } from '@/content/early-access'

// Partner applications (/partners): accountants, fractional CFOs and HR leads,
// VC platform teams. Same defences as the other lead routes.

const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

function oneOf(options: { value: string }[], v: unknown): string | null {
  return typeof v === 'string' && options.some((o) => o.value === v) ? v : null
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  const ip = getClientIp(req)
  if (!rateLimit(ip).ok) return NextResponse.json({ error: 'Too many tries. Wait a little and try again.' }, { status: 429 })
  const db = earlyAccessDb()
  if (!db) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(db, { route: '/api/partners', ip, max: 5 }))) {
    return NextResponse.json({ error: 'Too many tries. Wait a little and try again.' }, { status: 429 })
  }

  let name: string, email: string, firm: string, partnerType: string | null, advised: string | null, note: string, token: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const b = JSON.parse(raw)
    name = String(b.name ?? '').trim().slice(0, 120)
    email = String(b.email ?? '').trim().toLowerCase().slice(0, 200)
    firm = String(b.firm ?? '').trim().slice(0, 160)
    partnerType = oneOf(PARTNER_TYPES, b.partnerType)
    advised = oneOf(COMPANIES_ADVISED, b.companiesAdvised)
    note = String(b.note ?? '').trim().slice(0, 1500)
    token = String(b.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (!name || !firm || !partnerType || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Add your name, work email, firm and what you do.' }, { status: 400 })
  }
  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json({ error: 'The security check did not pass. Refresh the page and try again.' }, { status: 403 })
  }

  const { error } = await db.from('partner_applications').insert({
    name, email, firm, partner_type: partnerType, companies_advised: advised, note: note || null,
  })
  // 23505: already applied. Same answer, no second acknowledgement.
  if (error && error.code !== '23505') {
    console.error('[partners] insert failed:', error.message)
    return NextResponse.json({ error: 'That did not go through. Try again, or email hello@mambahr.com.' }, { status: 500 })
  }
  if (!error) {
    await Promise.all([
      notifyLeadSlack({
        title: 'New partner application',
        fields: [
          { label: 'Name', value: name },
          { label: 'Email', value: email },
          { label: 'Firm', value: firm },
          { label: 'Type', value: labelFor(PARTNER_TYPES, partnerType) },
          { label: 'Companies advised', value: labelFor(COMPANIES_ADVISED, advised) },
          { label: 'Note', value: note },
        ],
        context: 'Partners · mambahr.com/partners',
      }),
      sendPartnerAck(email, { name, share: PARTNER_SHARE }),
    ])
  }
  return NextResponse.json({ status: 'received' })
}
