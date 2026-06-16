import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Deck analytics for the admin panel. Reads deck_links / deck_sessions /
// deck_slide_events AS THE LOGGED-IN ADMIN (RLS: is_admin() = @mambahr.com).
// All callers are behind requireAdmin(). Aggregation is done in JS; each query
// degrades to empty rather than throwing if a table is missing.

export type DeckLinkRow = {
  id: string
  token: string
  recipient_name: string
  recipient_org: string | null
  created_at: string
  revoked_at: string | null
  views: number
  lastViewedAt: string | null
  totalMs: number
}

export type DeckSessionRow = {
  id: string
  recipient: string | null
  org: string | null
  startedAt: string
  location: string
  device: string | null
  browser: string | null
  os: string | null
  durationMs: number
  maxSlide: number
  totalSlides: number
  referrer: string | null
}

export type SlideRow = { index: number; reach: number; reachPct: number; avgDwellMs: number }

export type DeckTotals = {
  views: number
  identified: number
  anonymous: number
  recipients: number
  avgDurationMs: number
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

export async function getDeckAnalytics(): Promise<DeckAnalytics> {
  const supabase = await createSupabaseServerClient()
  const warnings: string[] = []

  const linksRes = await supabase
    .from('deck_links')
    .select('id, token, recipient_name, recipient_org, created_at, revoked_at')
    .order('created_at', { ascending: false })
  const sessionsRes = await supabase
    .from('deck_sessions')
    .select(
      'id, link_id, recipient_name, recipient_org, started_at, duration_ms, max_slide, total_slides, country, region, city, device, browser, os, referrer',
    )
    .order('started_at', { ascending: false })
    .limit(500)
  const eventsRes = await supabase
    .from('deck_slide_events')
    .select('slide_index, dwell_ms')
    .limit(20000)

  if (linksRes.error) warnings.push('Could not read deck_links — run the deck_analytics migration.')
  if (sessionsRes.error) warnings.push('Could not read deck_sessions.')

  const rawLinks = linksRes.data ?? []
  const rawSessions = sessionsRes.data ?? []
  const rawEvents = eventsRes.data ?? []

  // Per-link rollups from sessions.
  const byLink = new Map<string, { views: number; last: string | null; ms: number }>()
  for (const s of rawSessions) {
    const id = (s as { link_id: string | null }).link_id
    if (!id) continue
    const cur = byLink.get(id) ?? { views: 0, last: null, ms: 0 }
    cur.views += 1
    cur.ms += Number((s as { duration_ms: number }).duration_ms) || 0
    const started = (s as { started_at: string }).started_at
    if (!cur.last || started > cur.last) cur.last = started
    byLink.set(id, cur)
  }

  const links: DeckLinkRow[] = rawLinks.map((l) => {
    const roll = byLink.get((l as { id: string }).id)
    return {
      id: (l as { id: string }).id,
      token: (l as { token: string }).token,
      recipient_name: (l as { recipient_name: string }).recipient_name,
      recipient_org: (l as { recipient_org: string | null }).recipient_org ?? null,
      created_at: (l as { created_at: string }).created_at,
      revoked_at: (l as { revoked_at: string | null }).revoked_at ?? null,
      views: roll?.views ?? 0,
      lastViewedAt: roll?.last ?? null,
      totalMs: roll?.ms ?? 0,
    }
  })

  const totalSlides = rawSessions.reduce(
    (m, s) => Math.max(m, Number((s as { total_slides: number }).total_slides) || 0),
    0,
  )

  const sessions: DeckSessionRow[] = rawSessions.map((s) => {
    const r = s as Record<string, unknown>
    return {
      id: r.id as string,
      recipient: (r.recipient_name as string) ?? null,
      org: (r.recipient_org as string) ?? null,
      startedAt: r.started_at as string,
      location: loc(r.city as string, r.region as string, r.country as string),
      device: (r.device as string) ?? null,
      browser: (r.browser as string) ?? null,
      os: (r.os as string) ?? null,
      durationMs: Number(r.duration_ms) || 0,
      maxSlide: Number(r.max_slide) || 0,
      totalSlides: Number(r.total_slides) || totalSlides,
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
    views: sessions.length,
    identified,
    anonymous: sessions.length - identified,
    recipients: new Set(sessions.filter((s) => s.recipient).map((s) => s.recipient)).size,
    avgDurationMs: sessions.length
      ? Math.round(sessions.reduce((a, s) => a + s.durationMs, 0) / sessions.length)
      : 0,
    completed,
    completionPct: sessions.length ? Math.round((completed / sessions.length) * 100) : 0,
  }

  return { warnings, links, sessions, funnel, totals }
}
