// Client-safe types + helpers for site analytics — NO 'server-only', NO db.
// Imported by both the server lib (site-analytics.ts) and client components.

export type SiteProperty = 'website' | 'deck' | 'lp'
export type Range = '1h' | '24h' | '7d' | '30d'
export type Tz = 'UTC' | 'ET' | 'CET'
export type SessionClass = 'engaged' | 'bounce' | 'visit'

export type SiteSessionRow = {
  id: string
  startedAt: string
  lastSeenAt: string
  country: string | null
  region: string | null
  city: string | null
  network: string | null
  device: string | null
  browser: string | null
  os: string | null
  source: string | null
  referrer: string | null
  isBot: boolean
  botReason: string | null
  isReturning: boolean
  pageviews: number
  dwellMs: number
  maxScroll: number
  cls: SessionClass
  events: string[]
}

export type SitePageview = { path: string; title: string | null; viewedAt: string; dwellMs: number; maxScroll: number }

export type SiteSessionDetail = {
  session: SiteSessionRow & {
    sessionKey: string
    visitorId: string | null
    userAgent: string | null
    screen: string | null
    locale: string | null
    utmSource: string | null
    landingPath: string | null
  }
  pageviews: SitePageview[]
  events: { kind: string; label: string | null; occurredAt: string }[]
}

export function fmtDur(ms: number): string {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ${String(s % 60).padStart(2, '0')}s`
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`
}
