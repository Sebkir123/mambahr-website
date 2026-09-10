import 'server-only'
import { randomBytes } from 'node:crypto'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'

// Analytics for the gated field guides. Reads field_guide_leads +
// field_guide_views AS THE LOGGED-IN ADMIN (RLS: is_admin() = @mambahr.com).
// Each view row is one open of the gated page, enriched server-side with the
// owning network (ASN/firm), so you see which prospect read which guide.
// Leads come from the public email form (source=form) OR an admin-created
// tracked share link (source=manual).

// Guide catalog, slug → public title + gated route path. The token-gated page
// lives at <path>?k=<token>.
export const GUIDES: Record<string, { title: string; path: string }> = {
  'rif-playbook': { title: 'The layoff playbook', path: '/resources/rif-playbook' },
}
export function guideTitle(slug: string): string {
  return GUIDES[slug]?.title ?? slug
}
export function guidePath(slug: string): string {
  return GUIDES[slug]?.path ?? `/resources/${slug}`
}
export function newFieldGuideToken(): string {
  return randomBytes(12).toString('base64url') // ~16 unguessable url-safe chars
}

export type FieldGuideRow = {
  id: string
  guide: string
  guideTitle: string
  path: string
  token: string
  source: 'form' | 'manual'
  who: string // recipient name (manual link) or email (form)
  email: string | null
  company: string | null
  requestedAt: string
  sentAt: string | null
  revokedAt: string | null
  opens: number
  lastOpenedAt: string | null
  network: string | null // owning ASN org (firm/ISP)
  location: string
  device: string | null
}

export type FieldGuideTotals = {
  requests: number
  opened: number
  openRatePct: number
  last7d: number
  opens: number
}

export type FieldGuideAnalytics = {
  warnings: string[]
  rows: FieldGuideRow[]
  totals: FieldGuideTotals
}

function loc(city: unknown, region: unknown, country: unknown): string {
  const parts = [city, region, country].filter((p): p is string => typeof p === 'string' && p.trim() !== '')
  return parts.length ? Array.from(new Set(parts)).join(', ') : 'Unknown'
}

type LeadRow = {
  id: string
  guide: string
  email: string | null
  company: string | null
  recipient_name: string | null
  source: string | null
  token: string
  requested_at: string
  sent_at: string | null
  revoked_at: string | null
}
type ViewRow = {
  lead_id: string
  viewed_at: string
  asn_org: string | null
  city: string | null
  region: string | null
  country: string | null
  device: string | null
}

const cachedFieldGuides = unstable_cache(async () => computeFieldGuideAnalytics(serviceDb()!), ['field-guide-analytics-v1'], { revalidate: 20 })

export async function getFieldGuideAnalytics(): Promise<FieldGuideAnalytics> {
  if (serviceDb()) return cachedFieldGuides()
  return computeFieldGuideAnalytics(await createSupabaseServerClient())
}

async function computeFieldGuideAnalytics(supabase: SupabaseClient): Promise<FieldGuideAnalytics> {
  const warnings: string[] = []

  const [leadsRes, viewsRes] = await Promise.all([
    supabase
      .from('field_guide_leads')
      .select('id, guide, email, company, recipient_name, source, token, requested_at, sent_at, revoked_at')
      .order('requested_at', { ascending: false })
      .limit(5000),
    supabase
      .from('field_guide_views')
      .select('lead_id, viewed_at, asn_org, city, region, country, device')
      .order('viewed_at', { ascending: false })
      .limit(10000),
  ])

  if (leadsRes.error) warnings.push(`Could not read field_guide_leads: ${leadsRes.error.message}`)
  if (viewsRes.error) warnings.push(`Could not read field_guide_views: ${viewsRes.error.message}`)

  const leads = (leadsRes.data as LeadRow[] | null) ?? []
  const views = (viewsRes.data as ViewRow[] | null) ?? []

  type Agg = { opens: number; last: string | null; net: string | null; loc: string; device: string | null }
  const byLead = new Map<string, Agg>()
  for (const v of views) {
    const cur = byLead.get(v.lead_id) ?? { opens: 0, last: null, net: null, loc: 'Unknown', device: null }
    cur.opens++
    // views arrive newest-first, so the first one we see per lead is the latest
    if (!cur.last) {
      cur.last = v.viewed_at
      cur.net = v.asn_org
      cur.loc = loc(v.city, v.region, v.country)
      cur.device = v.device
    }
    byLead.set(v.lead_id, cur)
  }

  const rows: FieldGuideRow[] = leads.map((l) => {
    const g = byLead.get(l.id)
    const source: 'form' | 'manual' = l.source === 'manual' ? 'manual' : 'form'
    return {
      id: l.id,
      guide: l.guide,
      guideTitle: guideTitle(l.guide),
      path: guidePath(l.guide),
      token: l.token,
      source,
      who: l.recipient_name || l.email || 'Unknown',
      email: l.email,
      company: l.company,
      requestedAt: l.requested_at,
      sentAt: l.sent_at,
      revokedAt: l.revoked_at,
      opens: g?.opens ?? 0,
      lastOpenedAt: g?.last ?? null,
      network: g?.net ?? null,
      location: g?.loc ?? 'Unknown',
      device: g?.device ?? null,
    }
  })

  return finalize(rows, views.length, warnings)
}

function finalize(rows: FieldGuideRow[], totalOpens: number, warnings: string[]): FieldGuideAnalytics {
  const now = Date.now()
  const DAY = 86_400_000
  const opened = rows.filter((r) => r.opens > 0).length
  const totals: FieldGuideTotals = {
    requests: rows.length,
    opened,
    openRatePct: rows.length ? Math.round((opened / rows.length) * 100) : 0,
    last7d: rows.filter((r) => now - new Date(r.requestedAt).getTime() <= 7 * DAY).length,
    opens: totalOpens,
  }

  return { warnings, rows, totals }
}

export type FieldGuideOpen = {
  viewedAt: string
  network: string | null
  location: string
  device: string | null
  browser: string | null
  os: string | null
}
export type FieldGuideLeadDetail = {
  who: string
  source: 'form' | 'manual'
  email: string | null
  company: string | null
  guideTitle: string
  requestedAt: string
  sentAt: string | null
  opens: FieldGuideOpen[]
}

export async function getFieldGuideLead(id: string): Promise<FieldGuideLeadDetail | null> {
  const supabase = await createSupabaseServerClient()
  const { data: lead } = await supabase
    .from('field_guide_leads')
    .select('id, guide, email, company, recipient_name, source, requested_at, sent_at')
    .eq('id', id)
    .maybeSingle()
  if (!lead) return null

  const { data: views } = await supabase
    .from('field_guide_views')
    .select('viewed_at, asn_org, city, region, country, device, browser, os')
    .eq('lead_id', id)
    .order('viewed_at', { ascending: false })
    .limit(500)

  const rows = (views as Record<string, unknown>[] | null) ?? []
  const opens: FieldGuideOpen[] = rows.map((v) => ({
    viewedAt: v.viewed_at as string,
    network: (v.asn_org as string) ?? null,
    location: loc(v.city, v.region, v.country),
    device: (v.device as string) ?? null,
    browser: (v.browser as string) ?? null,
    os: (v.os as string) ?? null,
  }))

  return {
    who: (lead.recipient_name as string) || (lead.email as string) || 'Unknown',
    source: lead.source === 'manual' ? 'manual' : 'form',
    email: (lead.email as string) ?? null,
    company: (lead.company as string) ?? null,
    guideTitle: guideTitle(lead.guide as string),
    requestedAt: lead.requested_at as string,
    sentAt: (lead.sent_at as string) ?? null,
    opens,
  }
}
