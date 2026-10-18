import { NextRequest, NextResponse } from 'next/server'
import { notifyLeadSlack } from '@/lib/slack'
import { createMemoryLimiter, getClientIp } from '@/lib/rate-limit'
import { earlyAccessDb, isPassToken } from '@/lib/early-access'
import { HANDOFFS, HR_SYSTEMS, TEAM_SIZES, labelFor } from '@/content/early-access'

// "Tell us about your team" on the pass page. The pass token is the
// credential: 128 random bits only the owner was given.

const rateLimit = createMemoryLimiter(20, 60 * 60 * 1000)

function oneOf(options: { value: string }[], v: unknown): string | null {
  return typeof v === 'string' && options.some((o) => o.value === v) ? v : null
}

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }
  if (!rateLimit(getClientIp(req)).ok) {
    return NextResponse.json({ error: 'Too many tries. Wait a little and try again.' }, { status: 429 })
  }
  const db = earlyAccessDb()
  if (!db) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })

  let pass: string, company: string, teamSize: string | null, hrSystem: string | null, handoffs: string[]
  try {
    const raw = await req.text()
    if (raw.length > 2048) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    pass = String(body.pass ?? '')
    company = String(body.company ?? '').trim().slice(0, 120)
    teamSize = oneOf(TEAM_SIZES, body.teamSize)
    hrSystem = oneOf(HR_SYSTEMS, body.hrSystem)
    const rawHandoffs: unknown[] = Array.isArray(body.handoffs) ? body.handoffs : []
    handoffs = [...new Set(rawHandoffs.map((h) => oneOf(HANDOFFS, h)).filter((h): h is string => h !== null))]
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (!isPassToken(pass)) return NextResponse.json({ error: 'This pass link is not valid.' }, { status: 404 })
  if (!company || !teamSize || !hrSystem) {
    return NextResponse.json({ error: 'Add your company, team size and HR system.' }, { status: 400 })
  }

  const { data, error } = await db
    .from('waitlist')
    .update({ company, team_size: teamSize, hr_system: hrSystem, first_handoff: handoffs.length ? handoffs : null })
    .eq('pass_token', pass)
    .select('email')
    .maybeSingle()
  if (error) {
    console.error('[waitlist/profile] update failed:', error.message)
    return NextResponse.json({ error: 'That did not save. Try again.' }, { status: 500 })
  }
  if (!data) return NextResponse.json({ error: 'This pass link is not valid.' }, { status: 404 })

  await notifyLeadSlack({
    title: 'Early access: team details added',
    fields: [
      { label: 'Email', value: data.email },
      { label: 'Company', value: company },
      { label: 'Team size', value: labelFor(TEAM_SIZES, teamSize) },
      { label: 'HR system', value: labelFor(HR_SYSTEMS, hrSystem) },
      { label: 'Hand off first', value: handoffs.map((h) => labelFor(HANDOFFS, h)).join(', ') },
    ],
    context: 'Early access · pass page',
  })

  return NextResponse.json({ status: 'saved' })
}
