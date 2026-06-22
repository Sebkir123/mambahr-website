// Client-safe types + formatters for blog read analytics. No server imports, so
// these can be used in the editor (client component) without pulling server-only
// code into the bundle.

export type BlogStat = {
  slug: string
  path: string
  views: number // real (non-bot) page views
  readers: number // distinct visitors
  avgReadMs: number // avg time on page, clamped to 20 min
  avgScroll: number // avg max scroll depth %
  completionPct: number // share of views that scrolled past 75%
  lastView: string | null
}

export type BlogPostAnalytics = BlogStat & {
  series: { day: string; views: number }[] // daily reads, last 30 days
  sources: { source: string; views: number }[] // top referral sources
}

export const EMPTY_STAT: Omit<BlogStat, 'slug' | 'path'> = {
  views: 0,
  readers: 0,
  avgReadMs: 0,
  avgScroll: 0,
  completionPct: 0,
  lastView: null,
}

// "3m 20s", "45s", "1h 2m", compact human read time.
export function formatReadTime(ms: number): string {
  if (!ms || ms < 1000) return '0s'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return s % 60 ? `${m}m ${s % 60}s` : `${m}m`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}

// "2.3k", "812", compact counts for tight columns.
export function compact(n: number): string {
  if (n < 1000) return String(n)
  if (n < 10000) return `${(n / 1000).toFixed(1)}k`
  return `${Math.round(n / 1000)}k`
}
