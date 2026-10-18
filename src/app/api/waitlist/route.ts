import { NextRequest, NextResponse } from 'next/server'
import { sendPassLinkAgain, sendWaitlistWelcome } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'
import { earlyAccessDb, isReferralCode, passUrl, referralUrl } from '@/lib/early-access'
import { companyFromEmail, sameCompany } from '@/content/early-access'

// Joining the early access list: one email, behind Turnstile and the rate
// limits. A new signup gets its pass token back and goes straight to its pass
// page; the token is never returned for an address that was already on the
// list, whose owner gets the link by email instead.

// Spam dampener: 5 requests / hour / IP, per instance (see lib/rate-limit.ts).
const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

type Row = { email: string; company: string | null; referral_code: string; pass_token: string; created_at: string }

const passEmail = (r: Row) => ({
  email: r.email,
  company: r.company,
  referralCode: r.referral_code,
  joinedAt: r.created_at,
  passUrl: passUrl(r.pass_token),
  referralUrl: referralUrl(r.referral_code),
})

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  const ip = getClientIp(req)
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many tries. Wait a little and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec ?? 3600) } },
    )
  }

  // Fail closed on misconfiguration, as /api/demo does.
  const db = earlyAccessDb()
  if (!db) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(db, { route: '/api/waitlist', ip, max: 5 }))) {
    return NextResponse.json({ error: 'Too many tries. Wait a little and try again.' }, { status: 429, headers: { 'Retry-After': '3600' } })
  }

  let email: string, ref: string | null, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 2048) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim().toLowerCase().slice(0, 200)
    const r = String(body.ref ?? '').trim().toLowerCase()
    ref = isReferralCode(r) ? r : null
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter an email address like you@company.com.' }, { status: 400 })
  }
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'The security check did not pass. Refresh the page and try again.' }, { status: 403 })
  }

  // A referral only counts when the code belongs to another company on the list:
  // the pass promises "your own company doesn't count".
  let referredBy: string | null = null
  let referrer: { email: string; company: string | null } | null = null
  if (ref) {
    const { data } = await db.from('waitlist').select('email, company').eq('referral_code', ref).maybeSingle()
    if (data && data.email !== email && !sameCompany(data.email, email)) { referredBy = ref; referrer = data }
  }

  const SELECT = 'email, company, referral_code, pass_token, created_at'
  const { data: created, error } = await db
    .from('waitlist')
    .insert({ email, company: companyFromEmail(email), referred_by: referredBy })
    .select(SELECT)
    .single<Row>()

  if (error?.code === '23505') {
    const { data: existing } = await db.from('waitlist').select(SELECT).eq('email', email).maybeSingle<Row>()
    if (existing) await sendPassLinkAgain(passEmail(existing))
    return NextResponse.json({ status: 'exists' })
  }
  if (error || !created) {
    console.error('[waitlist] insert failed:', error?.message)
    return NextResponse.json({ error: 'That did not go through. Try again, or email hello@mambahr.com.' }, { status: 500 })
  }

  await Promise.all([
    notifyLeadSlack({
      title: 'New early access signup',
      fields: [
        { label: 'Email', value: email },
        { label: 'Company (from domain)', value: created.company },
        { label: 'Referred by', value: referrer ? `${referrer.company ?? referrer.email}` : null },
      ],
      context: 'Early access · mambahr.com/early-access',
    }),
    sendWaitlistWelcome(passEmail(created)),
  ])

  return NextResponse.json({ status: 'joined', pass: created.pass_token })
}
