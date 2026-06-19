import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { DECK_SLIDE_COUNT } from '@/lib/deck-slides'

// Deck analytics for the admin panel. Reads deck_links / deck_sessions /
// deck_slide_events / deck_pageviews AS THE LOGGED-IN ADMIN (RLS: is_admin() =
// @mambahr.com). All callers are behind requireAdmin(). Aggregation is in JS;
// each query degrades to empty rather than throwing if a table is missing.
//
// Two sources of truth, by design:
//   deck_pageviews  — server-side opens, captured even if the client beacon is
//                     blocked. The reliable "was it opened, by whom, from where".
//   deck_sessions   — client telemetry: dwell, active time, furthest slide.
//                     Richer, but absent when JS/beacon is blocked.
// A link with opens but no sessions = someone read it with the beacon blocked.

export type DeckLinkRow = {
  id: string
  token: string
  recipient_name: string
  recipient_org: string | null
  created_at: string
  revoked_at: string | null
  opens: number // server-side page-views (reliable)
  views: number // client sessions (enriched)
  distinctViewers: number // distinct IPs — >1 means the link was forwarded
  forwarded: boolean
  lastViewedAt: string | null
  totalMs: number
}

export type DeckSessionRow = {
  id: string
  recipient: string | null
  org: string | null
  startedAt: string
  location: string
  org_network: string | null // ASN org — the owning network
  device: string | null
  browser: string | null
  os: string | null
  durationMs: number
  activeMs: number
  maxSlide: number
  lastSlide: number
  totalSlides: number
  revisits: number
  engagement: number // 0–100 composite
  referrer: string | null
}

export type SlideRow = { index: number; reach: number; reachPct: number; avgDwellMs: number }

export type DeckTotals = {
  opens: number
  views: number
  identified: number
  anonymous: number
  recipients: number
  forwarded: number
  avgActiveMs: number
  completed: number
  completionPct: number
}

export type DeckAnalytics = {
  warnings: string[]
  links: DeckLinkRow[]
  sessions: DeckSessionRow[]
  funnel: SlideRow[]
  totals: DeckTotals
}

function loc(city: string | null, region: string | null, country: string | null): string {
  const parts = [city, region, country].filter((p): p is string => !!p && p.trim() !== '')
  return parts.length ? Array.from(new Set(parts)).join(', ') : 'Unknown'
}

// Composite engagement, 0–100. Weighted: how far they got, how much attention
// they actually paid (active time, ~20s/slide = full credit), whether they
// looped back (revisits = interest), and reaching the ask.
function engagementScore(opts: {
  maxSlide: number
  totalSlides: number
  activeMs: number
  revisits: number
}): number {
  const { maxSlide, totalSlides, activeMs, revisits } = opts
  const slides = Math.max(totalSlides, 1)
  const completion = Math.min((maxSlide + 1) / slides, 1)
  const attention = Math.min(activeMs / (slides * 20_000), 1)
  const curiosity = Math.min(revisits / slides, 1)
  const reachedAsk = maxSlide >= slides - 1 ? 1 : maxSlide >= slides - 2 ? 0.5 : 0
  return Math.round(completion * 40 + attention * 30 + curiosity * 15 + reachedAsk * 15)
}

export async function getDeckAnalytics(): Promise<DeckAnalytics> {
  const supabase = await createSupabaseServerClient()
  const warnings: string[] = []

  const [linksRes, sessionsRes, eventsRes, pageviewsRes] = await Promise.all([
    supabase
      .from('deck_links')
      .select('id, token, recipient_name, recipient_org, created_at, revoked_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('deck_sessions')
      .select(
        'id, link_id, recipient_name, recipient_org, started_at, duration_ms, active_ms, max_slide, last_slide, total_slides, country, region, city, asn_org, ip_hash, device, browser, browser_version, os, os_version, referrer',
      )
      .order('started_at', { ascending: false })
      .limit(500),
    supabase.from('deck_slide_events').select('session_id, slide_index, dwell_ms').limit(50000),
    supabase
      .from('deck_pageviews')
      .select('link_id, ip_hash, viewed_at')
      .order('viewed_at', { ascending: false })
      .limit(2000),
  ])

  if (linksRes.error) warnings.push('Could not read deck_links — run the deck_analytics migration.')
  if (sessionsRes.error) warnings.push('Could not read deck_sessions.')
  if (pageviewsRes.error)
    warnings.push('Could not read deck_pageviews — run the deck_analytics_v2 migration.')

  const rawLinks = linksRes.data ?? []
  const rawSessions = sessionsRes.data ?? []
  const rawEvents = eventsRes.data ?? []
  const rawPageviews = pageviewsRes.data ?? []

  // Per-session revisit counts (events beyond the first visit to each slide).
  const eventsBySession = new Map<string, Map<number, number>>()
  for (const e of rawEvents) {
    const sidVal = (e as { session_id: string }).session_id
    if (!sidVal) continue
    const perSlide = eventsBySession.get(sidVal) ?? new Map<number, number>()
    const idx = Number((e as { slide_index: number }).slide_index)
    perSlide.set(idx, (perSlide.get(idx) ?? 0) + 1)
    eventsBySession.set(sidVal, perSlide)
  }
  const revisitsFor = (sidVal: string): number => {
    const perSlide = eventsBySession.get(sidVal)
    if (!perSlide) return 0
    let r = 0
    for (const c of perSlide.values()) r += Math.max(0, c - 1)
    return r
  }

  // Per-link rollups: opens + distinct viewers from pageviews; views/time from sessions.
  const pvByLink = new Map<string, { opens: number; ips: Set<string>; last: string | null }>()
  for (const p of rawPageviews) {
    const id = (p as { link_id: string | null }).link_id
    if (!id) continue
    const cur = pvByLink.get(id) ?? { opens: 0, ips: new Set<string>(), last: null }
    cur.opens += 1
    const ip = (p as { ip_hash: string | null }).ip_hash
    if (ip) cur.ips.add(ip)
    const at = (p as { viewed_at: string }).viewed_at
    if (!cur.last || at > cur.last) cur.last = at
    pvByLink.set(id, cur)
  }
  const sByLink = new Map<
    string,
    { views: number; last: string | null; ms: number; ips: Set<string> }
  >()
  for (const s of rawSessions) {
    const id = (s as { link_id: string | null }).link_id
    if (!id) continue
    const cur = sByLink.get(id) ?? { views: 0, last: null, ms: 0, ips: new Set<string>() }
    cur.views += 1
    cur.ms += Number((s as { duration_ms: number }).duration_ms) || 0
    const ip = (s as { ip_hash: string | null }).ip_hash
    if (ip) cur.ips.add(ip)
    const started = (s as { started_at: string }).started_at
    if (!cur.last || started > cur.last) cur.last = started
    sByLink.set(id, cur)
  }

  const links: DeckLinkRow[] = rawLinks.map((l) => {
    const id = (l as { id: string }).id
    const pv = pvByLink.get(id)
    const sn = sByLink.get(id)
    const ips = new Set<string>([...(pv?.ips ?? []), ...(sn?.ips ?? [])])
    const lastViewedAt =
      [pv?.last, sn?.last].filter((x): x is string => !!x).sort().at(-1) ?? null
    return {
      id,
      token: (l as { token: string }).token,
      recipient_name: (l as { recipient_name: string }).recipient_name,
      recipient_org: (l as { recipient_org: string | null }).recipient_org ?? null,
      created_at: (l as { created_at: string }).created_at,
      revoked_at: (l as { revoked_at: string | null }).revoked_at ?? null,
      opens: pv?.opens ?? 0,
      views: sn?.views ?? 0,
      distinctViewers: ips.size,
      forwarded: ips.size > 1,
      lastViewedAt,
      totalMs: sn?.ms ?? 0,
    }
  })

  // Floor at the canonical deck length so the funnel shows every slide even
  // before anyone has opened the deck (sessions can push it higher if the deck
  // grows before this constant is updated).
  const totalSlides = rawSessions.reduce(
    (m, s) => Math.max(m, Number((s as { total_slides: number }).total_slides) || 0),
    DECK_SLIDE_COUNT,
  )

  const sessions: DeckSessionRow[] = rawSessions.map((s) => {
    const r = s as Record<string, unknown>
    const id = r.id as string
    const maxSlide = Number(r.max_slide) || 0
    const activeMs = Number(r.active_ms) || 0
    const revisits = revisitsFor(id)
    const ts = Number(r.total_slides) || totalSlides
    return {
      id,
      recipient: (r.recipient_name as string) ?? null,
      org: (r.recipient_org as string) ?? null,
      startedAt: r.started_at as string,
      location: loc(r.city as string, r.region as string, r.country as string),
      org_network: (r.asn_org as string) ?? null,
      device: (r.device as string) ?? null,
      browser: [r.browser, r.browser_version].filter(Boolean).join(' ') || null,
      os: [r.os, r.os_version].filter(Boolean).join(' ') || null,
      durationMs: Number(r.duration_ms) || 0,
      activeMs,
      maxSlide,
      lastSlide: Number(r.last_slide) || 0,
      totalSlides: ts,
      revisits,
      engagement: engagementScore({ maxSlide, totalSlides: ts, activeMs, revisits }),
      referrer: (r.referrer as string) ?? null,
    }
  })

  // Slide funnel: reach % (sessions whose furthest slide ≥ i) + avg dwell.
  const slideCount = Math.max(totalSlides, 1)
  const dwellSum = new Array<number>(slideCount).fill(0)
  const dwellN = new Array<number>(slideCount).fill(0)
  for (const e of rawEvents) {
    const i = Number((e as { slide_index: number }).slide_index)
    if (!Number.isInteger(i) || i < 0 || i >= slideCount) continue
    dwellSum[i] += Number((e as { dwell_ms: number }).dwell_ms) || 0
    dwellN[i] += 1
  }
  const funnel: SlideRow[] = Array.from({ length: slideCount }, (_, i) => {
    const reach = sessions.filter((s) => s.maxSlide >= i).length
    return {
      index: i,
      reach,
      reachPct: sessions.length ? Math.round((reach / sessions.length) * 100) : 0,
      avgDwellMs: dwellN[i] ? Math.round(dwellSum[i] / dwellN[i]) : 0,
    }
  })

  const identified = sessions.filter((s) => s.recipient).length
  const completed = sessions.filter((s) => totalSlides > 0 && s.maxSlide >= totalSlides - 1).length
  const totals: DeckTotals = {
    opens: rawPageviews.length,
    views: sessions.length,
    identified,
    anonymous: sessions.length - identified,
    recipients: new Set(sessions.filter((s) => s.recipient).map((s) => s.recipient)).size,
    forwarded: links.filter((l) => l.forwarded).length,
    avgActiveMs: sessions.length
      ? Math.round(sessions.reduce((a, s) => a + s.activeMs, 0) / sessions.length)
      : 0,
    completed,
    completionPct: sessions.length ? Math.round((completed / sessions.length) * 100) : 0,
  }

  return { warnings, links, sessions, funnel, totals }
}

// ── Per-session detail (the timeline drill-down, rendered as a full page) ────

export type TimelineStep = {
  index: number
  title: string | null
  dwellMs: number
  at: string
}

export type DeckSessionDetail = {
  id: string
  recipient: string | null
  org: string | null
  startedAt: string
  location: string
  org_network: string | null
  device: string | null
  browser: string | null
  os: string | null
  durationMs: number
  activeMs: number
  maxSlide: number
  lastSlide: number
  totalSlides: number
  revisits: number
  engagement: number
  referrer: string | null
  timeline: TimelineStep[] // every slide visit, in order
  mostRevisited: { index: number; title: string | null; visits: number } | null
}

export async function getDeckSession(id: string): Promise<DeckSessionDetail | null> {
  const supabase = await createSupabaseServerClient()

  const { data: sRow, error } = await supabase
    .from('deck_sessions')
    .select(
      'id, recipient_name, recipient_org, started_at, duration_ms, active_ms, max_slide, last_slide, total_slides, country, region, city, asn_org, device, browser, browser_version, os, os_version, referrer',
    )
    .eq('id', id)
    .maybeSingle()
  if (error || !sRow) return null

  const { data: evs } = await supabase
    .from('deck_slide_events')
    .select('slide_index, slide_title, dwell_ms, created_at')
    .eq('session_id', id)
    .order('created_at', { ascending: true })

  const r = sRow as Record<string, unknown>
  const events = (evs ?? []) as Array<Record<string, unknown>>

  const timeline: TimelineStep[] = events.map((e) => ({
    index: Number(e.slide_index),
    title: (e.slide_title as string) ?? null,
    dwellMs: Number(e.dwell_ms) || 0,
    at: e.created_at as string,
  }))

  // Revisits + most-revisited slide.
  const perSlide = new Map<number, { visits: number; title: string | null }>()
  for (const t of timeline) {
    const cur = perSlide.get(t.index) ?? { visits: 0, title: t.title }
    cur.visits += 1
    if (!cur.title && t.title) cur.title = t.title
    perSlide.set(t.index, cur)
  }
  let revisits = 0
  let mostRevisited: DeckSessionDetail['mostRevisited'] = null
  for (const [index, v] of perSlide) {
    revisits += Math.max(0, v.visits - 1)
    if (v.visits > 1 && (!mostRevisited || v.visits > mostRevisited.visits)) {
      mostRevisited = { index, title: v.title, visits: v.visits }
    }
  }

  const maxSlide = Number(r.max_slide) || 0
  const activeMs = Number(r.active_ms) || 0
  const ts = Number(r.total_slides) || 0
  return {
    id: r.id as string,
    recipient: (r.recipient_name as string) ?? null,
    org: (r.recipient_org as string) ?? null,
    startedAt: r.started_at as string,
    location: loc(r.city as string, r.region as string, r.country as string),
    org_network: (r.asn_org as string) ?? null,
    device: (r.device as string) ?? null,
    browser: [r.browser, r.browser_version].filter(Boolean).join(' ') || null,
    os: [r.os, r.os_version].filter(Boolean).join(' ') || null,
    durationMs: Number(r.duration_ms) || 0,
    activeMs,
    maxSlide,
    lastSlide: Number(r.last_slide) || 0,
    totalSlides: ts,
    revisits,
    engagement: engagementScore({ maxSlide, totalSlides: ts, activeMs, revisits }),
    referrer: (r.referrer as string) ?? null,
    timeline,
    mostRevisited,
  }
}

export type DeckSummary = {
  opens: number // server-side page-views (reliable, beacon-proof)
  recipients: number // distinct identified viewers who opened
  links: number // active (non-revoked) recipient links
  lastOpenedAt: string | null
  warnings: string[]
}

// Lightweight deck rollup for the Overview dashboard — two cheap reads, no
// per-session aggregation. Reads as the logged-in admin (RLS), degrades to
// zeros if a table is missing.
export async function getDeckSummary(): Promise<DeckSummary> {
  const supabase = await createSupabaseServerClient()
  const warnings: string[] = []
  let opens = 0
  let lastOpenedAt: string | null = null
  const recipients = new Set<string>()

  const { data: pv, error: pvErr } = await supabase
    .from('deck_pageviews')
    .select('recipient_name, viewed_at')
    .order('viewed_at', { ascending: false })
    .limit(10000)
  if (pvErr) {
    warnings.push(`Could not read deck_pageviews: ${pvErr.message}`)
  } else {
    const rows = (pv as { recipient_name: string | null; viewed_at: string | null }[] | null) ?? []
    opens = rows.length
    if (rows.length) lastOpenedAt = rows[0].viewed_at ?? null
    for (const r of rows) if (r.recipient_name) recipients.add(r.recipient_name)
  }

  let links = 0
  const { data: lk, error: lkErr } = await supabase
    .from('deck_links')
    .select('id')
    .is('revoked_at', null)
  if (lkErr) {
    warnings.push(`Could not read deck_links: ${lkErr.message}`)
  } else {
    links = ((lk as unknown[] | null) ?? []).length
  }

  return { opens, recipients: recipients.size, links, lastOpenedAt, warnings }
}
