import 'server-only'
import { cache } from 'react'
import { getBlogReadSummary } from '@/lib/blog-analytics'
import { readAdminRows } from '@/lib/admin-rows'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'
import { COMPANIES_ADVISED, HR_SYSTEMS, PARTNER_TYPES, TEAM_SIZES, labelFor } from '@/content/early-access'

// First-party analytics for the admin panel. Reads lead tables as
// THE LOGGED-IN ADMIN, the magic-link session, governed by RLS (is_admin() is
// true only for @mambahr.com). No RLS-bypassing service-role key. Every caller
// is behind requireAdmin(). Each table is queried defensively so a missing
// column/table degrades to empty rather than crashing the dashboard.

export type LeadSource = 'waitlist' | 'demo' | 'magnet' | 'partner'

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
  leads: { total: number; waitlist: number; demo: number; magnet: number; partner: number; last7d: number; last30d: number }
  trend: { day: string; count: number }[] // last 14 days, oldest → newest
  recent: Lead[]
  posts: { total: number; published: number; draft: number; scheduled: number }
  views: { total: number; last7d: number; top: TopPost[] }
}

function dayKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

function str(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t || null
}

type RawRow = Record<string, unknown>

// A lead's one-line detail: the first non-empty of these columns, or a formatter.
type DetailOf = string[] | ((r: RawRow) => string | null)

function leadDetail(r: RawRow, detailOf: DetailOf): string | null {
  if (typeof detailOf === 'function') return detailOf(r)
  for (const k of detailOf) {
    const v = str(r[k])
    if (v) return v
  }
  return null
}

// "BambooHR · 75 to 150 · via a referral".
function earlyAccessDetail(r: RawRow): string | null {
  const parts = [
    labelFor(HR_SYSTEMS, str(r.hr_system)),
    labelFor(TEAM_SIZES, str(r.team_size)),
    str(r.referred_by) ? 'via a referral' : null,
  ].filter(Boolean)
  return parts.length ? parts.join(' · ') : null
}

// "Fractional CFO · 6 to 20 companies".
function partnerDetail(r: RawRow): string | null {
  const advised = labelFor(COMPANIES_ADVISED, str(r.companies_advised))
  return [labelFor(PARTNER_TYPES, str(r.partner_type)), advised ? `${advised} companies` : null].filter(Boolean).join(' · ') || null
}

// Cached 20s (service-role, admin-gated at the page) so the Overview dashboard
// loads instantly on repeat visits instead of re-querying every lead table.
const cachedOverview = unstable_cache(async () => computeOverview(serviceDb()!), ['admin-overview-v2'], { revalidate: 20, tags: ['admin-data'] })

export async function getOverview(): Promise<Overview> {
  if (serviceDb()) return cachedOverview()
  return computeOverview(await createSupabaseServerClient())
}

async function computeOverview(supabase: SupabaseClient): Promise<Overview> {
  const warnings: string[] = []

  const [{ leads: all, warnings: leadWarnings }, reads, postResult] = await Promise.all([
    getAllLeads(),
    getBlogReadSummary(),
    readAdminRows<{ id: string; title: string; slug: string; status: string }>((from, to) => supabase.from('posts').select('id, title, slug, status').order('id').range(from, to)),
  ])
  warnings.push(...leadWarnings, ...reads.warnings)
  const count = (source: LeadSource) => all.filter((lead) => lead.source === source).length

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

  if (postResult.error) warnings.push('Post totals could not be loaded.')
  if (postResult.truncated) warnings.push('Only the first 10,000 posts are included in these totals.')
  const posts = postResult.rows
  const postsAgg = {
    total: posts.length,
    published: posts.filter((post) => post.status === 'published').length,
    draft: posts.filter((post) => post.status === 'draft').length,
    scheduled: posts.filter((post) => post.status === 'scheduled').length,
  }
  const titles = new Map(posts.map((post) => [post.slug, post.title]))
  const viewsAgg = { total: reads.total, last7d: reads.last7d, top: reads.top.map((post) => ({ slug: post.slug, title: titles.get(post.slug) ?? post.slug, views: post.views })) }

  return {
    warnings,
    leads: {
      total: all.length,
      waitlist: count('waitlist'),
      demo: count('demo'),
      magnet: count('magnet'),
      partner: count('partner'),
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
const cachedAllLeads = unstable_cache(async () => computeAllLeads(serviceDb()!), ['admin-all-leads-v1'], { revalidate: 20, tags: ['admin-data'] })

export const getAllLeads = cache(async (): Promise<{ leads: Lead[]; warnings: string[] }> => {
  if (serviceDb()) return cachedAllLeads()
  return computeAllLeads(await createSupabaseServerClient())
})

async function computeAllLeads(supabase: SupabaseClient): Promise<{ leads: Lead[]; warnings: string[] }> {
  const warnings: string[] = []

  async function fetchLeads(table: string, source: LeadSource, detailOf: DetailOf): Promise<Lead[]> {
    const result = await readAdminRows<RawRow>((from, to) => supabase.from(table).select('*').order('created_at', { ascending: false }).order('id').range(from, to))
    if (result.error) warnings.push(`Could not read ${table}: ${result.error}`)
    if (result.truncated) warnings.push(`${table}: showing the newest 10,000 records. Older records are not included in these totals.`)
    const data = result.rows
    return ((data as RawRow[] | null) ?? []).map((r) => {
      const detail = leadDetail(r, detailOf)
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

  const [waitlist, demo, magnet, partner] = await Promise.all([
    fetchLeads('waitlist', 'waitlist', earlyAccessDetail),
    fetchLeads('demo_requests', 'demo', ['company_size', 'source']),
    fetchLeads('magnet_requests', 'magnet', ['company_stage', 'magnet_id', 'asset']),
    fetchLeads('partner_applications', 'partner', partnerDetail),
  ])
  const leads = [...waitlist, ...demo, ...magnet, ...partner].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
  return { leads, warnings }
}
