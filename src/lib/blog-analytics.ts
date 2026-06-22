import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'
import type { BlogStat, BlogPostAnalytics } from '@/lib/blog-analytics-types'

export * from '@/lib/blog-analytics-types'

// Read-side blog analytics over the first-party tracker. All callers MUST be
// behind requireAdmin(). Uses the service-role client when available (RLS
// bypass, no per-request cookie dependency); falls back to the admin cookie
// client locally, where the is_admin() RLS on the underlying tables applies.
async function db(): Promise<SupabaseClient> {
  return serviceDb() ?? (await createSupabaseServerClient())
}

function slugOf(path: string): string {
  return path.replace(/^\/blog\//, '')
}

type StatRow = {
  path: string
  views: number
  readers: number
  avg_dwell_ms: number | string
  avg_scroll: number | string
  completed: number
  last_view: string | null
}

function toStat(r: StatRow): BlogStat {
  const views = Number(r.views) || 0
  const completed = Number(r.completed) || 0
  return {
    slug: slugOf(r.path),
    path: r.path,
    views,
    readers: Number(r.readers) || 0,
    avgReadMs: Math.round(Number(r.avg_dwell_ms) || 0),
    avgScroll: Math.round(Number(r.avg_scroll) || 0),
    completionPct: views ? Math.round((completed / views) * 100) : 0,
    lastView: r.last_view,
  }
}

// All posts' read stats, keyed by slug. For the blog list. Posts with no reads
// simply won't appear in the map, callers default to zeroes.
export async function getBlogStatsBySlug(): Promise<Map<string, BlogStat>> {
  const client = await db()
  const { data, error } = await client.rpc('blog_stats')
  const map = new Map<string, BlogStat>()
  if (error || !data) return map
  for (const row of data as StatRow[]) {
    const stat = toStat(row)
    map.set(stat.slug, stat)
  }
  return map
}

// Full analytics for one post: headline rollup + 30-day daily series + sources.
export async function getBlogPostAnalytics(slug: string): Promise<BlogPostAnalytics> {
  const client = await db()
  const path = `/blog/${slug}`
  const [statsRes, seriesRes, sourcesRes] = await Promise.all([
    client.rpc('blog_stats'),
    client.rpc('blog_post_series', { p_path: path }),
    client.rpc('blog_post_sources', { p_path: path }),
  ])

  const row = ((statsRes.data as StatRow[] | null) ?? []).find((r) => r.path === path)
  const base: BlogStat = row
    ? toStat(row)
    : { slug, path, views: 0, readers: 0, avgReadMs: 0, avgScroll: 0, completionPct: 0, lastView: null }

  const series = ((seriesRes.data as { day: string; views: number }[] | null) ?? []).map((d) => ({
    day: d.day,
    views: Number(d.views) || 0,
  }))
  const sources = ((sourcesRes.data as { source: string; views: number }[] | null) ?? []).map((s) => ({
    source: s.source,
    views: Number(s.views) || 0,
  }))

  return { ...base, series, sources }
}
