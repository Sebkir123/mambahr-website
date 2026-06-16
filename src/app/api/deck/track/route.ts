import { NextResponse, type NextRequest } from 'next/server'
import { createHash } from 'node:crypto'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Deck analytics ingest. The client posts a session id + (optional) recipient
// token + progress; we enrich with Vercel's edge geo headers, a parsed UA, and
// a hashed IP (never the raw IP), then write via the SECURITY DEFINER track_deck
// RPC (anon-callable). Best-effort: any failure returns 200 so the deck never
// sees an error.

export const runtime = 'nodejs'

// Salt the IP hash so the stored value isn't a plain rainbow-table-able sha256
// of an IP. Not a secret-grade need (analytics), just basic hygiene.
const IP_SALT = 'mambahr-deck-v1'

function hashIp(ip: string): string {
  return createHash('sha256').update(`${IP_SALT}:${ip}`).digest('hex').slice(0, 32)
}

function parseUA(ua: string): { device: string; browser: string; os: string } {
  const u = ua.toLowerCase()
  const device = /ipad|tablet/.test(u)
    ? 'Tablet'
    : /mobi|iphone|android(?!.*tablet)/.test(u)
      ? 'Mobile'
      : 'Desktop'
  const os = /iphone|ipad|ios/.test(u)
    ? 'iOS'
    : /android/.test(u)
      ? 'Android'
      : /mac os x|macintosh/.test(u)
        ? 'macOS'
        : /windows/.test(u)
          ? 'Windows'
          : /linux/.test(u)
            ? 'Linux'
            : 'Other'
  const browser = /edg\//.test(u)
    ? 'Edge'
    : /opr\/|opera/.test(u)
      ? 'Opera'
      : /chrome|crios/.test(u)
        ? 'Chrome'
        : /firefox|fxios/.test(u)
          ? 'Firefox'
          : /safari/.test(u)
            ? 'Safari'
            : 'Other'
  return { device, browser, os }
}

function num(v: unknown): number | null {
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const sessionId = body.sessionId
  if (typeof sessionId !== 'string' || sessionId.length < 8) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const h = req.headers
  const ipRaw = (h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || '').trim()
  const ua = h.get('user-agent') || ''
  const { device, browser, os } = parseUA(ua)
  const city = h.get('x-vercel-ip-city')

  const payload: Record<string, unknown> = {
    slug: typeof body.slug === 'string' ? body.slug : null,
    total: num(body.total) ?? 0,
    durationMs: num(body.durationMs) ?? 0,
    maxSlide: num(body.maxSlide) ?? 0,
    country: h.get('x-vercel-ip-country'),
    region: h.get('x-vercel-ip-country-region'),
    city: city ? decodeURIComponent(city) : null,
    lat: num(h.get('x-vercel-ip-latitude')),
    lng: num(h.get('x-vercel-ip-longitude')),
    ipHash: ipRaw ? hashIp(ipRaw) : null,
    ua: ua.slice(0, 400),
    device,
    browser,
    os,
    referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : null,
  }
  // A slide dwell event is only recorded when both fields are present.
  if (Number.isInteger(body.slideIndex) && (num(body.dwellMs) ?? 0) > 0) {
    payload.slideIndex = body.slideIndex
    payload.slideTitle = typeof body.slideTitle === 'string' ? body.slideTitle : null
    payload.dwellMs = num(body.dwellMs)
  }

  try {
    const supabase = await createSupabaseServerClient()
    await supabase.rpc('track_deck', {
      p_session: sessionId,
      p_token: typeof body.token === 'string' && body.token ? body.token : null,
      p_payload: payload,
    })
  } catch {
    /* swallow — analytics must never break the viewer */
  }
  return NextResponse.json({ ok: true })
}
