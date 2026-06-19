import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Analytics for the email-gated field guides. Reads field_guide_leads +
// field_guide_views AS THE LOGGED-IN ADMIN (RLS: is_admin() = @mambahr.com).
// Each view row is one open of the gated page, enriched server-side with the
// owning network (ASN/firm) — so you see which prospect read which guide.

const GUIDE_TITLES: Record<string, string> = {
  'rif-playbook': 'The Defensible Layoff Playbook',
}
export function guideTitle(slug: string): string {
  return GUIDE_TITLES[slug] ?? slug
}

export type FieldGuideRow = {
  id: string
  guide: string
  guideTitle: string
  email: string
  company: string | null
  requestedAt: string
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

type LeadRow = { id: string; guide: string; email: string; company: string | null; requested_at: string }
type ViewRow = {
  lead_id: string
  viewed_at: string
  asn_org: string | null
  city: string | null
  region: string | null
  country: string | null
  device: string | null
}

export async function getFieldGuideAnalytics(): Promise<FieldGuideAnalytics> {
  const supabase = await createSupabaseServerClient()
  const warnings: string[] = []

  const [leadsRes, viewsRes] = await Promise.all([
    supabase
      .from('field_guide_leads')
      .select('id, guide, email, company, requested_at')
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
    return {
      id: l.id,
      guide: l.guide,
      guideTitle: guideTitle(l.guide),
      email: l.email,
      company: l.company,
      requestedAt: l.requested_at,
      opens: g?.opens ?? 0,
      lastOpenedAt: g?.last ?? null,
      network: g?.net ?? null,
      location: g?.loc ?? 'Unknown',
      device: g?.device ?? null,
    }
  })

  const now = Date.now()
  const DAY = 86_400_000
  const opened = rows.filter((r) => r.opens > 0).length
  const totals: FieldGuideTotals = {
    requests: rows.length,
    opened,
    openRatePct: rows.length ? Math.round((opened / rows.length) * 100) : 0,
    last7d: rows.filter((r) => now - new Date(r.requestedAt).getTime() <= 7 * DAY).length,
    opens: views.length,
  }

  return { warnings, rows, totals }
}
