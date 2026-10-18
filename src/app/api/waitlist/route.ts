import { NextRequest, NextResponse } from 'next/server'
import { sendPassLinkAgain, sendWaitlistWelcome } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'
import { earlyAccessDb, isReferralCode, passUrl, referralUrl } from '@/lib/early-access'
import { TEAM_SIZES, companyKey, labelFor, sameCompany } from '@/content/early-access'
import { describeTouch, sanitizeAttribution, type Attribution } from '@/lib/attribution'

// Joining the early access list: work email, name, company and team size,
// behind Turnstile and the rate limits. A new signup gets its pass token back and goes straight to its pass
// page; the token is never returned for an address that was already on the
// list, whose owner gets the link by email instead (at most three times a day,
// so the form cannot be used to flood an inbox).

// Spam dampener: 5 requests / hour / IP, per instance (see lib/rate-limit.ts).
const rateLimit = createMemoryLimiter(5, 60 * 60 * 1000)

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

type Row = { email: string; name: string | null; company: string | null; referral_code: string; pass_token: string; created_at: string }

const passEmail = (r: Row) => ({
  email: r.email,
  name: r.name,
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
  if (!(await durableRateLimit(db, { route: '/api/waitlist', key: ip, max: 5 }))) {
    return NextResponse.json({ error: 'Too many tries. Wait a little and try again.' }, { status: 429, headers: { 'Retry-After': '3600' } })
  }

  let email: string, name: string, company: string, teamSize: string | null, ref: string | null, turnstileToken: string
  let attribution: Attribution | null
  let page: string | null
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    email = String(body.email ?? '').trim().toLowerCase().slice(0, 200)
    name = String(body.name ?? '').trim().replace(/\s+/g, ' ').slice(0, 80)
    company = String(body.company ?? '').trim().replace(/\s+/g, ' ').slice(0, 120)
    const size = String(body.teamSize ?? '')
    teamSize = TEAM_SIZES.some((o) => o.value === size) ? size : null
    const r = String(body.ref ?? '').trim().toLowerCase()
    ref = isReferralCode(r) ? r : null
    attribution = sanitizeAttribution(body.attribution)
    const p = String(body.page ?? '').split(/[?#]/)[0].slice(0, 100)
    page = /^\/[a-z0-9/_-]*$/i.test(p) ? p : null
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter an email address like you@company.com.' }, { status: 400 })
  }
  if (!name || !company || !teamSize) {
    return NextResponse.json({ error: 'Add your name, your company and how many people work there.' }, { status: 400 })
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

  const SELECT = 'email, name, company, referral_code, pass_token, created_at'
  const { data: created, error } = await db
    .from('waitlist')
    .insert({ email, name, company, team_size: teamSize, referred_by: referredBy, signup_page: page, ...attributionColumns(attribution) })
    .select(SELECT)
    .single<Row>()

  if (error?.code === '23505') {
    const { data: existing } = await db.from('waitlist').select(SELECT).eq('email', email).maybeSingle<Row>()
    const resend = existing && (await durableRateLimit(db, { route: '/api/waitlist/resend', key: email, max: 3, windowSecs: 86400 }))
    if (resend) await sendPassLinkAgain(passEmail(existing))
    return NextResponse.json({ status: 'exists', sent: Boolean(resend) })
  }
  if (error || !created) {
    console.error('[waitlist] insert failed:', error?.message)
    return NextResponse.json({ error: 'That did not go through. Try again, or email hello@mambahr.com.' }, { status: 500 })
  }

  // For the founders only: a second person from a company already on the list
  // is the same company, not a new one. The person joining is never told.
  const domain = companyKey(email)
  let colleagues = 0
  if (domain !== email) {
    const { count } = await db
      .from('waitlist')
      .select('id', { count: 'exact', head: true })
      .like('email', `%@${domain.replace(/[\\%_]/g, '\\$&')}`)
      .neq('email', email)
    colleagues = count ?? 0
  }

  await Promise.all([
    notifyLeadSlack({
      title: PAGE_NAMES[page ?? ''] ? `New early access signup · ${PAGE_NAMES[page ?? '']}` : 'New early access signup',
      fields: [
        { label: 'Name', value: name },
        { label: 'Company', value: company },
        { label: 'Employees', value: labelFor(TEAM_SIZES, teamSize) },
        { label: 'Email', value: email },
        { label: 'Referred by', value: referrer ? `${referrer.company ?? referrer.email}` : null },
        { label: 'Already on the list', value: colleagues ? `${colleagues} more from ${domain}` : null },
        { label: 'Came from', value: cameFrom(attribution) },
        { label: 'Signed up on', value: page ? PAGE_NAMES[page] ?? page : null },
      ],
      context: 'Early access · mambahr.com/early-access',
    }),
    sendWaitlistWelcome(passEmail(created)),
  ])

  return NextResponse.json({ status: 'joined', pass: created.pass_token })
}

// The page a signup happened on, named for the Slack card. The two ad landing
// pages are the ad test (blue-collar companies vs SF tech startups).
const PAGE_NAMES: Record<string, string> = {
  '/crews': 'Crews page',
  '/startups': 'Startups page',
  '/early-access': 'Early access page',
}

// The ad or link that brought the signup, as columns the ad test can be counted
// by (the latest touch), plus the first touch whole.
function attributionColumns(a: Attribution | null) {
  if (!a) return {}
  const t = a.last
  return {
    utm_source: t.source,
    utm_medium: t.medium,
    utm_campaign: t.campaign,
    utm_content: t.content,
    utm_term: t.term,
    ad_platform: t.platform,
    landing_path: t.landing,
    referrer_host: t.referrer,
    touched_at: t.at,
    first_touch: a.first,
  }
}

function cameFrom(a: Attribution | null): string {
  if (!a) return 'Direct, or no source recorded'
  const last = describeTouch(a.last)
  const first = describeTouch(a.first)
  return first === last ? `${last} (landed on ${a.last.landing})` : `${last} (first came from ${first})`
}
