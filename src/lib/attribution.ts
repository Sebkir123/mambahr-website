// Which ad or link brought a visitor: kept in the browser from the visit that
// carries it until they join early access, then stored on their signup so the
// founders can see which ad wins. Two touches: the first that brought them
// (within 90 days) and the latest with an ad or another site behind it.
//
// Never stored: an ad platform's click id (only which platform it was) or a
// URL's query string. A browser that sends Global Privacy Control or Do Not
// Track keeps nothing, as the privacy policy promises.

export const AD_PLATFORMS = ['google', 'meta', 'linkedin', 'microsoft', 'tiktok', 'x', 'reddit'] as const
export type AdPlatform = (typeof AD_PLATFORMS)[number]

export type Touch = {
  source: string | null
  medium: string | null
  campaign: string | null
  content: string | null
  term: string | null
  platform: AdPlatform | null
  landing: string
  referrer: string | null
  at: string
}

export type Attribution = { first: Touch; last: Touch }

// The query parameter each platform adds to an ad click.
const CLICK_IDS: [string, AdPlatform][] = [
  ['gclid', 'google'], ['gbraid', 'google'], ['wbraid', 'google'],
  ['fbclid', 'meta'], ['li_fat_id', 'linkedin'], ['msclkid', 'microsoft'],
  ['ttclid', 'tiktok'], ['twclid', 'x'], ['rdt_cid', 'reddit'],
]

const FIRST_TOUCH_DAYS = 90
const KEY = 'mt_attr'

const short = (v: string | null | undefined, max = 100): string | null => {
  const s = (v ?? '').trim().slice(0, max)
  return s || null
}

function hostOf(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase() || null
  } catch {
    return null
  }
}

/**
 * The touch this page load carries, or null when it carries none (a visit with
 * no campaign tags, no ad click and no other site behind it).
 */
export function touchFromVisit(href: string, referrer: string, siteHost: string, now: Date): Touch | null {
  let url: URL
  try {
    url = new URL(href)
  } catch {
    return null
  }
  const sp = url.searchParams
  const platform = CLICK_IDS.find(([param]) => sp.has(param))?.[1] ?? null
  const site = siteHost.replace(/^www\./, '').toLowerCase()
  const ref = hostOf(referrer)
  const external = ref && ref !== site && !ref.endsWith(`.${site}`) ? ref : null
  const tagged = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].some((k) => sp.get(k))
  if (!tagged && !platform && !external) return null
  return {
    source: short(sp.get('utm_source')),
    medium: short(sp.get('utm_medium')),
    campaign: short(sp.get('utm_campaign')),
    content: short(sp.get('utm_content')),
    term: short(sp.get('utm_term')),
    platform,
    landing: url.pathname.slice(0, 200),
    referrer: external,
    at: now.toISOString(),
  }
}

/** The stored attribution after this visit: first touch kept for 90 days, latest replaced. */
export function mergeAttribution(prev: Attribution | null, touch: Touch | null, now: Date): Attribution | null {
  if (!touch) return prev
  const expired = prev && now.getTime() - new Date(prev.first.at).getTime() > FIRST_TOUCH_DAYS * 86_400_000
  if (!prev || expired) return { first: touch, last: touch }
  return { first: prev.first, last: touch }
}

function sanitizeTouch(raw: unknown): Touch | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const str = (v: unknown, max = 100) => (typeof v === 'string' ? short(v, max) : null)
  const landing = str(r.landing, 200)
  const at = str(r.at, 40)
  if (!landing || !landing.startsWith('/') || !at || Number.isNaN(Date.parse(at))) return null
  const platform = AD_PLATFORMS.find((p) => p === r.platform) ?? null
  const referrer = str(r.referrer)
  return {
    source: str(r.source),
    medium: str(r.medium),
    campaign: str(r.campaign),
    content: str(r.content),
    term: str(r.term),
    platform,
    landing: landing.split(/[?#]/)[0],
    referrer: referrer && /^[a-z0-9.-]+$/i.test(referrer) ? referrer.toLowerCase() : null,
    at: new Date(at).toISOString(),
  }
}

/** Server side: whatever the browser sent, reduced to well-formed touches. */
export function sanitizeAttribution(raw: unknown): Attribution | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const last = sanitizeTouch(r.last)
  if (!last) return null
  return { first: sanitizeTouch(r.first) ?? last, last }
}

/** "LinkedIn ad · sf-startups · founder-video", "google.com", "Direct": for the Slack card. */
export function describeTouch(t: Touch | null): string {
  if (!t) return 'Direct'
  const platformNames: Record<AdPlatform, string> = {
    google: 'Google', meta: 'Meta', linkedin: 'LinkedIn', microsoft: 'Microsoft', tiktok: 'TikTok', x: 'X', reddit: 'Reddit',
  }
  const head = t.platform ? `${platformNames[t.platform]} ad` : t.source ?? t.referrer ?? 'Direct'
  return [head, t.campaign, t.content].filter(Boolean).join(' · ')
}

// ── Browser ──

function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string }
  if (nav.globalPrivacyControl === true) return true
  const dnt = nav.doNotTrack ?? nav.msDoNotTrack ?? (window as Window & { doNotTrack?: string }).doNotTrack
  return dnt === '1' || dnt === 'yes'
}

function readStored(): Attribution | null {
  try {
    return sanitizeAttribution(JSON.parse(localStorage.getItem(KEY) ?? 'null'))
  } catch {
    return null
  }
}

// Once per document: a client-side navigation keeps the first page's referrer,
// so a second capture would record an inner page as the landing page.
let captured = false

/** Called when a page loads: remembers the touch this visit carries, if any. */
export function captureAttribution(): void {
  if (captured || typeof window === 'undefined' || optedOut()) return
  captured = true
  const next = mergeAttribution(readStored(), touchFromVisit(window.location.href, document.referrer, window.location.hostname, new Date()), new Date())
  if (!next) return
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage blocked: the signup simply arrives without a source.
  }
}

/** What the early access form sends with a signup; null when nothing is known or the visitor opted out. */
export function readAttribution(): Attribution | null {
  if (typeof window === 'undefined' || optedOut()) return null
  return readStored()
}
