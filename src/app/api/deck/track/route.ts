import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { clientIp, geoFromHeaders, hashIp, parseUA } from '@/lib/deck-tracking'

// Deck analytics ingest. The client posts a session id + (optional) recipient
// token + progress (duration, active/focused time, furthest + current slide,
// per-slide dwell). We enrich server-side with Vercel's edge geo, a parsed UA
// (browser/OS family + version), a salted IP hash (never the raw IP), and the
// owning network via lookup_asn — then write via the SECURITY DEFINER
// track_deck RPC. Best-effort: any failure returns 200 so the deck never errors.
//
// This is the ENRICHMENT path. Integrity (capturing the open even when this
// beacon is blocked) is handled separately by the server-side page-view log in
// the deck's server component — see app/<deck>/page.tsx::logOpen.

export const runtime = 'nodejs'

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
  const ipRaw = clientIp(h)
  const ua = h.get('user-agent') || ''
  const { device, browser, browserVersion, os, osVersion } = parseUA(ua)
  const geo = geoFromHeaders(h)

  const payload: Record<string, unknown> = {
    slug: typeof body.slug === 'string' ? body.slug : null,
    total: num(body.total) ?? 0,
    durationMs: num(body.durationMs) ?? 0,
    activeMs: num(body.activeMs) ?? 0,
    maxSlide: num(body.maxSlide) ?? 0,
    lastSlide: num(body.lastSlide) ?? 0,
    ...geo,
    ipHash: ipRaw ? hashIp(ipRaw) : null,
    ua: ua.slice(0, 400),
    device,
    browser,
    browserVersion,
    os,
    osVersion,
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
      p_ip: ipRaw || null,
    })
  } catch {
    /* swallow — analytics must never break the viewer */
  }
  return NextResponse.json({ ok: true })
}
