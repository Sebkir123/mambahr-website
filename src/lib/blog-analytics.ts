import 'server-only'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
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
const ALL_TIME = '1970-01-01T00:00:00.000Z'
async function loadStats(client: SupabaseClient, since: string) {
  const { data, error } = await client.rpc('blog_stats', { p_since: since })
  return { stats: ((data as StatRow[] | null) ?? []).map(toStat), warning: error ? 'Blog read analytics are temporarily unavailable.' : null }
}
const cachedStats = unstable_cache(async (since: string) => loadStats(serviceDb()!, since), ['admin-blog-stats-v2'], { revalidate: 20, tags: ['admin-data'] })
export const getBlogStatsResult = cache(async () => {
  const result = serviceDb() ? await cachedStats(ALL_TIME) : await loadStats(await db(), ALL_TIME)
  return { stats: new Map(result.stats.map((stat) => [stat.slug, stat])), warning: result.warning }
})

export async function getBlogStatsBySlug(): Promise<Map<string, BlogStat>> {
  return (await getBlogStatsResult()).stats
}

export async function getBlogReadSummary() {
  const [{ stats, warning }, recent] = await Promise.all([
    getBlogStatsResult(),
    loadStats(await db(), new Date(Date.now() - 7 * 86400000).toISOString()),
  ])
  return {
    total: Array.from(stats.values()).reduce((sum, stat) => sum + stat.views, 0),
    last7d: recent.stats.reduce((sum, stat) => sum + stat.views, 0),
    top: Array.from(stats.values()).sort((a, b) => b.views - a.views).slice(0, 5),
    warnings: [warning, recent.warning].filter((value): value is string => Boolean(value)),
  }
}

// Full analytics for one post: headline rollup + 30-day daily series + sources.
export async function getBlogPostAnalytics(slug: string): Promise<BlogPostAnalytics> {
  const client = await db()
  const path = `/blog/${slug}`
  const [statsRes, seriesRes, sourcesRes] = await Promise.all([
    getBlogStatsResult(),
    client.rpc('blog_post_series', { p_path: path }),
    client.rpc('blog_post_sources', { p_path: path, p_since: ALL_TIME }),
  ])

  const row = statsRes.stats.get(slug)
  const base: BlogStat = row
    ? row
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
