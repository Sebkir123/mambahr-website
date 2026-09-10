import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { resourceDownloadUrl } from '@/lib/resources'
import { sendResourceDownload } from '@/lib/email'
import { notifyLeadSlack } from '@/lib/slack'
import { verifyTurnstile } from '@/lib/turnstile'
import { createMemoryLimiter, durableRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

// Email-gated resource download. Captures a lead (email + which playbook) into
// magnet_requests, so it flows into the unified Leads admin + CSV export, then
// returns the PDF download URL. Mirrors the field-guide route's defenses
// (Turnstile + in-memory + durable rate-limit). The PDF URL is never in the page
// source, so the email wall can't be bypassed by reading the HTML.

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

  let slug: string, email: string, company: string, name: string, companyStage: string, turnstileToken: string
  try {
    const raw = await req.text()
    if (raw.length > 4096) return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
    const body = JSON.parse(raw)
    slug = String(body.slug ?? '').trim().slice(0, 80)
    email = String(body.email ?? '').trim().slice(0, 200)
    company = String(body.company ?? '').trim().slice(0, 200)
    name = String(body.name ?? '').trim().slice(0, 120)
    companyStage = String(body.companyStage ?? '').trim().slice(0, 40)
    turnstileToken = String(body.turnstileToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email.includes('@') || email.length < 4) return NextResponse.json({ error: 'Enter a valid work email.' }, { status: 400 })
  if (!slug) return NextResponse.json({ error: 'Missing resource.' }, { status: 400 })

  const client = getAdminClient()
  if (!client) return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  if (!(await durableRateLimit(client, { route: '/api/resources/lead', ip, max: 8 }))) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })

  // Resource must exist, be published, and have a file.
  const { data: r } = await client
    .from('resources')
    .select('slug, title, file_path, file_name, status')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (!r || !r.file_path) return NextResponse.json({ error: 'This resource isn’t available.' }, { status: 404 })

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: 'Verification failed. Refresh and try again.' }, { status: 403 })
  }

  // Capture the lead → flows into the unified Leads admin (source 'magnet').
  await client.from('magnet_requests').insert({
    email,
    name: name || null,
    company: company || null,
    company_stage: companyStage || null,
    magnet_id: slug,
    source_url: `/resources/${slug}`,
    ip,
  })

  const dlUrl = resourceDownloadUrl(r.file_path as string, r.file_name as string | null)

  // Best-effort: email + Slack in parallel.
  await Promise.allSettled([
    sendResourceDownload({ email, name: name || '', title: r.title, kicker: 'Playbook', downloadUrl: dlUrl }),
    notifyLeadSlack({
      title: 'New playbook lead',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Company', value: company },
        { label: 'Company size', value: companyStage },
        { label: 'Resource', value: r.title as string },
      ],
      context: 'Resource gate · mambahr.com/resources',
    }),
  ])

  return NextResponse.json({ ok: true, downloadUrl: dlUrl })
}
