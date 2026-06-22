import 'server-only'
import { createHash } from 'node:crypto'

// Structural header type, satisfied by both the route's request Headers and
// next/headers' ReadonlyHeaders, without coupling to either concrete type.
type HeaderBag = { get(name: string): string | null }

// Shared server-side enrichment for deck analytics, used by both the
// JS-independent page-view log (deck server component) and the /api/deck/track
// beacon endpoint, so the two paths parse UA/geo/IP identically.

// Salt the IP hash so the stored value isn't a plain rainbow-table-able sha256
// of an IP. Not secret-grade (analytics), just basic hygiene. The raw IP is
// never persisted, only this hash + the resolved ASN org.
const IP_SALT = 'mambahr-deck-v1'

export function hashIp(ip: string): string {
  return createHash('sha256').update(`${IP_SALT}:${ip}`).digest('hex').slice(0, 32)
}

export type ParsedUA = {
  device: string
  browser: string
  browserVersion: string | null
  os: string
  osVersion: string | null
}

function major(re: RegExp, u: string): string | null {
  const m = u.match(re)
  return m ? m[1].replace(/_/g, '.') : null
}

export function parseUA(ua: string): ParsedUA {
  const u = ua.toLowerCase()

  const device = /ipad|tablet/.test(u)
    ? 'Tablet'
    : /mobi|iphone|android(?!.*tablet)/.test(u)
      ? 'Mobile'
      : 'Desktop'

  let browser = 'Other'
  let browserVersion: string | null = null
  if (/edg\//.test(u)) {
    browser = 'Edge'
    browserVersion = major(/edg\/(\d+(?:\.\d+)?)/, u)
  } else if (/opr\/|opera/.test(u)) {
    browser = 'Opera'
    browserVersion = major(/(?:opr|opera)\/(\d+(?:\.\d+)?)/, u)
  } else if (/chrome|crios/.test(u)) {
    browser = 'Chrome'
    browserVersion = major(/(?:chrome|crios)\/(\d+(?:\.\d+)?)/, u)
  } else if (/firefox|fxios/.test(u)) {
    browser = 'Firefox'
    browserVersion = major(/(?:firefox|fxios)\/(\d+(?:\.\d+)?)/, u)
  } else if (/safari/.test(u)) {
    browser = 'Safari'
    browserVersion = major(/version\/(\d+(?:\.\d+)?)/, u)
  }

  let os = 'Other'
  let osVersion: string | null = null
  if (/iphone|ipad|ios/.test(u)) {
    os = 'iOS'
    osVersion = major(/os (\d+(?:_\d+)?)/, u)
  } else if (/android/.test(u)) {
    os = 'Android'
    osVersion = major(/android (\d+(?:\.\d+)?)/, u)
  } else if (/mac os x|macintosh/.test(u)) {
    os = 'macOS'
    osVersion = major(/mac os x (\d+(?:_\d+)?)/, u)
  } else if (/windows/.test(u)) {
    os = 'Windows'
    // Windows NT 10.0 → 11 is indistinguishable from 10 in the UA; report NT.
    const nt = major(/windows nt (\d+(?:\.\d+)?)/, u)
    osVersion = nt ? `NT ${nt}` : null
  } else if (/linux/.test(u)) {
    os = 'Linux'
  }

  return { device, browser, browserVersion, os, osVersion }
}

/** First client IP from the proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(h: HeaderBag): string {
  return (h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || '').trim()
}

export type Geo = {
  country: string | null
  region: string | null
  city: string | null
  lat: number | null
  lng: number | null
}

function num(v: string | null): number | null {
  if (v == null) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/** Vercel edge geo headers → a normalized geo object. */
export function geoFromHeaders(h: HeaderBag): Geo {
  const city = h.get('x-vercel-ip-city')
  return {
    country: h.get('x-vercel-ip-country'),
    region: h.get('x-vercel-ip-country-region'),
    city: city ? decodeURIComponent(city) : null,
    lat: num(h.get('x-vercel-ip-latitude')),
    lng: num(h.get('x-vercel-ip-longitude')),
  }
}
