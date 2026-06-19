import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { SiteProperty, Range, SessionClass, SiteSessionRow, SitePageview, SiteSessionDetail } from '@/lib/site-analytics-types'

// Read-side analytics for the first-party tracker. Reads site_sessions /
// site_pageviews / site_events AS THE LOGGED-IN ADMIN (RLS). Per-session metrics
// (pageviews, dwell, scroll, class) are derived here from the pageview rows; bot
// detection layers a behavioral heuristic on top of the stored UA flag.
// Pure types + helpers live in ./site-analytics-types (client-safe); re-exported.
export * from '@/lib/site-analytics-types'

const RANGE_HOURS: Record<Range, number> = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 }

export type SiteAnalytics = {
  warnings: string[]
  property: SiteProperty
  range: Range
  totals: {
    all: number
    real: number
    bots: number
    botPct: number
    engagementPct: number
    avgActiveMs: number
    avgScroll: number
    returningPct: number
    pageviews: number
  }
  scrollDist: { gt25: number; gt50: number; gt75: number; full: number } // % of real sessions
  topCountry: { name: string; count: number; pct: number } | null
  topSource: { name: string; count: number; pct: number } | null
  events: { widget: number; conversation: number; signup: number }
  timeline: { label: string; visits: number; events: number }[]
  heatmap: number[][] // [weekday 0=Mon..6=Sun][hour 0..23] = real session count
  sessions: SiteSessionRow[]
}

type SessRow = Record<string, unknown>

function classify(pv: number, dwellMs: number, scroll: number): SessionClass {
  if (dwellMs >= 15_000 || scroll >= 50 || pv >= 2) return 'engaged'
  if (pv <= 1 && dwellMs < 10_000 && scroll < 25) return 'bounce'
  return 'visit'
}

export async function getSiteAnalytics(property: SiteProperty, range: Range): Promise<SiteAnalytics> {
  const supabase = await createSupabaseServerClient()
  const warnings: string[] = []
  const now = Date.now()
  const cutoffIso = new Date(now - RANGE_HOURS[range] * 3_600_000).toISOString()

  const [sessRes, pvRes, evRes] = await Promise.all([
    supabase
      .from('site_sessions')
      .select('id, started_at, last_seen_at, country, region, city, asn_org, device, browser, os, source, referrer, is_bot, bot_reason, is_returning')
      .eq('property', property)
      .gte('started_at', cutoffIso)
      .order('started_at', { ascending: false })
      .limit(10000),
    supabase
      .from('site_pageviews')
      .select('session_id, dwell_ms, max_scroll')
      .eq('property', property)
      .gte('viewed_at', cutoffIso)
      .limit(50000),
    supabase
      .from('site_events')
      .select('session_id, kind')
      .eq('property', property)
      .gte('occurred_at', cutoffIso)
      .limit(20000),
  ])
  if (sessRes.error) warnings.push(`sessions: ${sessRes.error.message}`)
  if (pvRes.error) warnings.push(`pageviews: ${pvRes.error.message}`)
  if (evRes.error) warnings.push(`events: ${evRes.error.message}`)

  const sessions = (sessRes.data as SessRow[] | null) ?? []
  const pvs = (pvRes.data as { session_id: string; dwell_ms: number; max_scroll: number }[] | null) ?? []
  const evs = (evRes.data as { session_id: string; kind: string }[] | null) ?? []

  const agg = new Map<string, { pv: number; dwell: number; scroll: number }>()
  for (const p of pvs) {
    const a = agg.get(p.session_id) ?? { pv: 0, dwell: 0, scroll: 0 }
    a.pv += 1
    a.dwell += Number(p.dwell_ms) || 0
    a.scroll = Math.max(a.scroll, Number(p.max_scroll) || 0)
    agg.set(p.session_id, a)
  }
  const evBySession = new Map<string, string[]>()
  const evCount = { widget: 0, conversation: 0, signup: 0 }
  for (const e of evs) {
    const arr = evBySession.get(e.session_id) ?? []
    arr.push(e.kind)
    evBySession.set(e.session_id, arr)
    if (e.kind === 'widget_open') evCount.widget++
    else if (e.kind === 'conversation') evCount.conversation++
    else if (e.kind === 'signup') evCount.signup++
  }

  const rows: SiteSessionRow[] = sessions.map((s) => {
    const a = agg.get(s.id as string) ?? { pv: 0, dwell: 0, scroll: 0 }
    // Behavioral bot heuristic on top of the stored UA flag: many views, no
    // engagement at all = prefetch/scanner.
    const heuristicBot = !s.is_bot && a.pv >= 8 && a.dwell < 2000 && a.scroll === 0
    const isBot = Boolean(s.is_bot) || heuristicBot
    return {
      id: s.id as string,
      startedAt: s.started_at as string,
      lastSeenAt: s.last_seen_at as string,
      country: (s.country as string) ?? null,
      region: (s.region as string) ?? null,
      city: (s.city as string) ?? null,
      network: (s.asn_org as string) ?? null,
      device: (s.device as string) ?? null,
      browser: (s.browser as string) ?? null,
      os: (s.os as string) ?? null,
      source: (s.source as string) ?? null,
      referrer: (s.referrer as string) ?? null,
      isBot,
      botReason: isBot ? ((s.bot_reason as string) ?? (heuristicBot ? 'heuristic: many views, no engagement' : null)) : null,
      isReturning: Boolean(s.is_returning),
      pageviews: a.pv,
      dwellMs: a.dwell,
      maxScroll: a.scroll,
      cls: classify(a.pv, a.dwell, a.scroll),
      events: evBySession.get(s.id as string) ?? [],
    }
  })

  const real = rows.filter((r) => !r.isBot)
  const bots = rows.filter((r) => r.isBot)
  const engaged = real.filter((r) => r.cls === 'engaged')
  const realPv = real.reduce((n, r) => n + r.pageviews, 0)

  const dist = { gt25: 0, gt50: 0, gt75: 0, full: 0 }
  for (const r of real) {
    if (r.maxScroll >= 25) dist.gt25++
    if (r.maxScroll >= 50) dist.gt50++
    if (r.maxScroll >= 75) dist.gt75++
    if (r.maxScroll >= 100) dist.full++
  }
  const pctOfReal = (n: number) => (real.length ? Math.round((n / real.length) * 100) : 0)

  const byCountry = tally(real.map((r) => r.country))
  const bySource = tally(real.map((r) => r.source))

  // Timeline buckets — hourly for ≤24h, daily otherwise.
  const hours = RANGE_HOURS[range]
  const hourly = hours <= 24
  const bucketMs = hourly ? 3_600_000 : 86_400_000
  const bucketCount = hourly ? hours : Math.round(hours / 24)
  const start = now - (bucketCount - 1) * bucketMs
  const tl: { label: string; visits: number; events: number }[] = []
  for (let i = 0; i < bucketCount; i++) {
    const t = new Date(start + i * bucketMs)
    tl.push({
      label: hourly
        ? `${String(t.getHours()).padStart(2, '0')}:00`
        : t.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visits: 0,
      events: 0,
    })
  }
  const bucketOf = (iso: string) => {
    const idx = Math.floor((new Date(iso).getTime() - start) / bucketMs)
    return idx >= 0 && idx < bucketCount ? idx : -1
  }
  for (const r of real) {
    const b = bucketOf(r.startedAt)
    if (b >= 0) tl[b].visits++
  }
  for (const e of evs) {
    // events tied to a real session only
    const sess = rows.find((r) => r.id === e.session_id)
    if (sess && !sess.isBot) {
      const b = bucketOf(sess.startedAt)
      if (b >= 0) tl[b].events++
    }
  }

  // Weekday (Mon=0) × hour heatmap of real sessions.
  const heatmap: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0))
  for (const r of real) {
    const d = new Date(r.startedAt)
    const wd = (d.getDay() + 6) % 7
    heatmap[wd][d.getHours()]++
  }

  return {
    warnings,
    property,
    range,
    totals: {
      all: rows.length,
      real: real.length,
      bots: bots.length,
      botPct: rows.length ? Math.round((bots.length / rows.length) * 100) : 0,
      engagementPct: real.length ? Math.round((engaged.length / real.length) * 100) : 0,
      avgActiveMs: real.length ? Math.round(real.reduce((n, r) => n + r.dwellMs, 0) / real.length) : 0,
      avgScroll: real.length ? Math.round(real.reduce((n, r) => n + r.maxScroll, 0) / real.length) : 0,
      returningPct: real.length ? Math.round((real.filter((r) => r.isReturning).length / real.length) * 100) : 0,
      pageviews: realPv,
    },
    scrollDist: { gt25: pctOfReal(dist.gt25), gt50: pctOfReal(dist.gt50), gt75: pctOfReal(dist.gt75), full: pctOfReal(dist.full) },
    topCountry: byCountry[0] ? { name: byCountry[0].key, count: byCountry[0].n, pct: pctOfReal(byCountry[0].n) } : null,
    topSource: bySource[0] ? { name: bySource[0].key, count: bySource[0].n, pct: pctOfReal(bySource[0].n) } : null,
    events: evCount,
    timeline: tl,
    heatmap,
    sessions: rows.slice(0, 200),
  }
}

function tally(values: (string | null)[]): { key: string; n: number }[] {
  const m = new Map<string, number>()
  for (const v of values) {
    if (!v) continue
    m.set(v, (m.get(v) ?? 0) + 1)
  }
  return Array.from(m, ([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n)
}

export async function getSiteSession(id: string): Promise<SiteSessionDetail | null> {
  const supabase = await createSupabaseServerClient()
  const { data: s } = await supabase.from('site_sessions').select('*').eq('id', id).maybeSingle()
  if (!s) return null

  const [{ data: pvRows }, { data: evRows }] = await Promise.all([
    supabase
      .from('site_pageviews')
      .select('path, title, viewed_at, dwell_ms, max_scroll')
      .eq('session_id', id)
      .order('viewed_at', { ascending: true })
      .limit(500),
    supabase
      .from('site_events')
      .select('kind, label, occurred_at')
      .eq('session_id', id)
      .order('occurred_at', { ascending: true })
      .limit(200),
  ])

  const pvs = (pvRows as Record<string, unknown>[] | null) ?? []
  const pageviews: SitePageview[] = pvs.map((p) => ({
    path: p.path as string,
    title: (p.title as string) ?? null,
    viewedAt: p.viewed_at as string,
    dwellMs: Number(p.dwell_ms) || 0,
    maxScroll: Number(p.max_scroll) || 0,
  }))
  const pv = pageviews.length
  const dwell = pageviews.reduce((n, p) => n + p.dwellMs, 0)
  const scroll = pageviews.reduce((n, p) => Math.max(n, p.maxScroll), 0)
  const heuristicBot = !s.is_bot && pv >= 8 && dwell < 2000 && scroll === 0
  const isBot = Boolean(s.is_bot) || heuristicBot

  return {
    session: {
      id: s.id as string,
      startedAt: s.started_at as string,
      lastSeenAt: s.last_seen_at as string,
      country: (s.country as string) ?? null,
      region: (s.region as string) ?? null,
      city: (s.city as string) ?? null,
      network: (s.asn_org as string) ?? null,
      device: (s.device as string) ?? null,
      browser: (s.browser as string) ?? null,
      os: (s.os as string) ?? null,
      source: (s.source as string) ?? null,
      referrer: (s.referrer as string) ?? null,
      isBot,
      botReason: isBot ? ((s.bot_reason as string) ?? (heuristicBot ? 'heuristic: many views, no engagement' : null)) : null,
      isReturning: Boolean(s.is_returning),
      pageviews: pv,
      dwellMs: dwell,
      maxScroll: scroll,
      cls: classify(pv, dwell, scroll),
      events: (evRows as { kind: string }[] | null)?.map((e) => e.kind) ?? [],
      sessionKey: s.session_key as string,
      visitorId: (s.visitor_id as string) ?? null,
      userAgent: (s.user_agent as string) ?? null,
      screen: (s.screen as string) ?? null,
      locale: (s.locale as string) ?? null,
      utmSource: (s.utm_source as string) ?? null,
      landingPath: (s.landing_path as string) ?? null,
    },
    pageviews,
    events: ((evRows as Record<string, unknown>[] | null) ?? []).map((e) => ({
      kind: e.kind as string,
      label: (e.label as string) ?? null,
      occurredAt: e.occurred_at as string,
    })),
  }
}
