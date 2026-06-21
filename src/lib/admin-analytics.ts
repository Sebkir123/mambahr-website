import 'server-only'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'

// First-party analytics for the admin panel. Reads lead tables + post_views AS
// THE LOGGED-IN ADMIN — the magic-link session, governed by RLS (is_admin() is
// true only for @mambahr.com). No RLS-bypassing service-role key. Every caller
// is behind requireAdmin(). Each table is queried defensively so a missing
// column/table degrades to empty rather than crashing the dashboard.

export type LeadSource = 'waitlist' | 'demo' | 'magnet'

export type Lead = {
  source: LeadSource
  email: string
  company: string | null
  name: string | null
  detail: string | null // referral code, magnet id, demo source, etc.
  created_at: string
}

export type TopPost = { slug: string; title: string; views: number }

export type Overview = {
  warnings: string[]
  leads: { total: number; waitlist: number; demo: number; magnet: number; last7d: number; last30d: number }
  trend: { day: string; count: number }[] // last 14 days, oldest → newest
  recent: Lead[]
  posts: { total: number; published: number; draft: number; scheduled: number }
  views: { total: number; last7d: number; top: TopPost[] }
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function str(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t || null
}

type RawRow = Record<string, unknown>

// Cached 20s (service-role, admin-gated at the page) so the Overview dashboard
// loads instantly on repeat visits instead of re-querying every lead table.
const cachedOverview = unstable_cache(async () => computeOverview(serviceDb()!), ['admin-overview-v1'], { revalidate: 20 })

export async function getOverview(): Promise<Overview> {
  if (serviceDb()) return cachedOverview()
  return computeOverview(await createSupabaseServerClient())
}

async function computeOverview(supabase: SupabaseClient): Promise<Overview> {
  const warnings: string[] = []

  async function fetchLeads(table: string, source: LeadSource, detailKeys: string[]): Promise<Lead[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000)
    if (error) {
      warnings.push(`Could not read ${table}: ${error.message}`)
      return []
    }
    return ((data as RawRow[] | null) ?? []).map((r) => {
      let detail: string | null = null
      for (const k of detailKeys) {
        const v = str(r[k])
        if (v) { detail = v; break }
      }
      return {
        source,
        email: str(r.email) ?? '—',
        company: str(r.company),
        name: str(r.name) ?? str(r.first_name),
        detail,
        created_at: (str(r.created_at) ?? new Date(0).toISOString()),
      }
    })
  }

  const [waitlist, demo, magnet] = await Promise.all([
    fetchLeads('waitlist', 'waitlist', ['referral_code', 'referred_by']),
    fetchLeads('demo_requests', 'demo', ['company_size', 'source']),
    fetchLeads('magnet_requests', 'magnet', ['magnet_id', 'magnetId', 'asset', 'source_url']),
  ])

  const all = [...waitlist, ...demo, ...magnet].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  const now = Date.now()
  const DAY = 86_400_000
  const last7d = all.filter((l) => now - new Date(l.created_at).getTime() <= 7 * DAY).length
  const last30d = all.filter((l) => now - new Date(l.created_at).getTime() <= 30 * DAY).length

  // 14-day trend, oldest → newest.
  const buckets = new Map<string, number>()
  for (let i = 13; i >= 0; i--) buckets.set(dayKey(new Date(now - i * DAY)), 0)
  for (const l of all) {
    const k = dayKey(new Date(l.created_at))
    if (buckets.has(k)) buckets.set(k, (buckets.get(k) || 0) + 1)
  }
  const trend = Array.from(buckets, ([day, count]) => ({ day, count }))

  // Posts + views.
  let postsAgg = { total: 0, published: 0, draft: 0, scheduled: 0 }
  const viewsAgg = { total: 0, last7d: 0, top: [] as TopPost[] }

  const { data: postRows, error: postErr } = await supabase
    .from('posts')
    .select('id, title, slug, status')
  if (postErr) {
    warnings.push(`Could not read posts: ${postErr.message}`)
  } else {
    const posts = (postRows as { id: string; title: string; slug: string; status: string }[] | null) ?? []
    postsAgg = {
      total: posts.length,
      published: posts.filter((p) => p.status === 'published').length,
      draft: posts.filter((p) => p.status === 'draft').length,
      scheduled: posts.filter((p) => p.status === 'scheduled').length,
    }
    const byId = new Map(posts.map((p) => [p.id, p]))

    const { data: viewRows, error: viewErr } = await supabase
      .from('post_views')
      .select('post_id, day, count')
    if (viewErr) {
      warnings.push(`Could not read post_views: ${viewErr.message}`)
    } else {
      const views = (viewRows as { post_id: string; day: string; count: number }[] | null) ?? []
      const totals = new Map<string, number>()
      for (const v of views) {
        viewsAgg.total += v.count
        totals.set(v.post_id, (totals.get(v.post_id) || 0) + v.count)
        if (now - new Date(v.day).getTime() <= 7 * DAY) viewsAgg.last7d += v.count
      }
      viewsAgg.top = Array.from(totals, ([post_id, count]) => {
        const p = byId.get(post_id)
        return { slug: p?.slug ?? '', title: p?.title ?? 'Unknown post', views: count }
      })
        .filter((t) => t.slug)
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
    }
  }

  return {
    warnings,
    leads: {
      total: all.length,
      waitlist: waitlist.length,
      demo: demo.length,
      magnet: magnet.length,
      last7d,
      last30d,
    },
    trend,
    recent: all.slice(0, 8),
    posts: postsAgg,
    views: viewsAgg,
  }
}

// Full lead list for the leads page + CSV export. Cached 20s (service-role,
// admin-gated at the page) so the leads page + export don't re-scan every table.
const cachedAllLeads = unstable_cache(async () => computeAllLeads(serviceDb()!), ['admin-all-leads-v1'], { revalidate: 20 })

export async function getAllLeads(): Promise<{ leads: Lead[]; warnings: string[] }> {
  if (serviceDb()) return cachedAllLeads()
  return computeAllLeads(await createSupabaseServerClient())
}

async function computeAllLeads(supabase: SupabaseClient): Promise<{ leads: Lead[]; warnings: string[] }> {
  const warnings: string[] = []

  async function fetchLeads(table: string, source: LeadSource, detailKeys: string[]): Promise<Lead[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10000)
    if (error) { warnings.push(`Could not read ${table}: ${error.message}`); return [] }
    return ((data as RawRow[] | null) ?? []).map((r) => {
      let detail: string | null = null
      for (const k of detailKeys) { const v = str(r[k]); if (v) { detail = v; break } }
      return {
        source,
        email: str(r.email) ?? '—',
        company: str(r.company),
        name: str(r.name) ?? str(r.first_name),
        detail,
        created_at: str(r.created_at) ?? new Date(0).toISOString(),
      }
    })
  }

  const [waitlist, demo, magnet] = await Promise.all([
    fetchLeads('waitlist', 'waitlist', ['referral_code', 'referred_by']),
    fetchLeads('demo_requests', 'demo', ['company_size', 'source']),
    fetchLeads('magnet_requests', 'magnet', ['magnet_id', 'magnetId', 'asset', 'source_url']),
  ])
  const leads = [...waitlist, ...demo, ...magnet].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
  return { leads, warnings }
}
