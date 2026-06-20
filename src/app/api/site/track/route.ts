import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { clientIp, geoFromHeaders, hashIp, parseUA } from '@/lib/deck-tracking'
import { classifyBot, deriveSource } from '@/lib/site-tracking'

export const dynamic = 'force-dynamic'

// First-party, server-recorded analytics ingestion. The browser beacon only
// signals WHAT happened (path, scroll, dwell, event) + opaque session/visitor
// ids; the SERVER attaches the authoritative metadata (real IP→geo/ASN, UA →
// device/browser, traffic source, bot flag) and writes via the service role.
//
// Two beacon shapes share this endpoint:
//   pageview : { t:'pv', property, sessionKey, visitorId, pageviewId, path, title, referrer, screen, locale, utm }
//   update   : { t:'up', sessionKey, pageviewId, dwellMs, scroll, event?:{kind,label,meta} }
// The pageview row is keyed by the client-generated pageviewId, so the unload
// "update" beacon fills in final dwell + scroll on the same row.

const SELF_HOSTS = ['mambahr.com', 'mambahr-website-one.vercel.app', 'localhost']
const PROPERTIES = new Set(['website', 'deck', 'lp'])
const EVENT_KINDS = new Set(['widget_open', 'conversation', 'signup', 'cta_click', 'download', 'custom'])
const MAX_PAGEVIEWS_PER_SESSION = 300

// Coarse per-IP rate limit on the public write endpoint — blocks a tight POST
// loop bloating the table, while staying generous enough for real browsing
// (a page-view + 15s heartbeats + unload across many pages). Per serverless
// instance (not global), which is fine as a spam backstop.
const RL_WINDOW_MS = 60_000
const RL_MAX = 600
const rlBuckets = new Map<string, number[]>()
function rateLimited(ip: string): boolean {
  if (!ip) return false
  const now = Date.now()
  const cutoff = now - RL_WINDOW_MS
  const ts = (rlBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (ts.length >= RL_MAX) {
    rlBuckets.set(ip, ts)
    return true
  }
  ts.push(now)
  rlBuckets.set(ip, ts)
  return false
}

let admin: SupabaseClient | null = null
function db(): SupabaseClient | null {
  if (admin) return admin
  if (!env.supabaseServiceRoleKey) return null
  admin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return admin
}

function str(v: unknown, max = 512): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t ? t.slice(0, max) : null
}
function clampScroll(v: unknown): number {
  const n = typeof v === 'number' ? v : parseInt(String(v ?? 0), 10)
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0
}
function ms(v: unknown): number {
  const n = typeof v === 'number' ? v : parseInt(String(v ?? 0), 10)
  return Number.isFinite(n) && n >= 0 ? Math.min(n, 86_400_000) : 0
}

export async function POST(req: NextRequest) {
  const supabase = db()
  // Never break the page: always 204 even if analytics can't write.
  if (!supabase) return new NextResponse(null, { status: 204 })

  const reqIp = clientIp(req.headers)
  if (rateLimited(reqIp)) return new NextResponse(null, { status: 204 })

  let body: Record<string, unknown>
  try {
    const raw = await req.text()
    if (raw.length > 8192) return new NextResponse(null, { status: 204 })
    body = JSON.parse(raw)
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  const sessionKey = str(body.sessionKey, 64)
  const pageviewId = str(body.pageviewId, 64)
  if (!sessionKey) return new NextResponse(null, { status: 204 })

  try {
    if (body.t === 'up') {
      // Engagement update for an existing pageview + optional conversion event.
      // Bind to the originating IP: a session_key is client-supplied, so without
      // this an attacker who scrapes one could poison another visitor's metrics.
      const { data: sess } = await supabase
        .from('site_sessions')
        .select('id, ip_hash')
        .eq('session_key', sessionKey)
        .maybeSingle()
      if (!sess) return new NextResponse(null, { status: 204 })
      if (sess.ip_hash && reqIp && sess.ip_hash !== hashIp(reqIp)) {
        return new NextResponse(null, { status: 204 })
      }

      await supabase.from('site_sessions').update({ last_seen_at: new Date().toISOString() }).eq('id', sess.id)

      if (pageviewId) {
        const { data: pv } = await supabase
          .from('site_pageviews')
          .select('dwell_ms, max_scroll')
          .eq('id', pageviewId)
          .eq('session_id', sess.id)
          .maybeSingle()
        if (pv) {
          await supabase
            .from('site_pageviews')
            .update({
              dwell_ms: Math.max(Number(pv.dwell_ms) || 0, ms(body.dwellMs)),
              max_scroll: Math.max(Number(pv.max_scroll) || 0, clampScroll(body.scroll)),
            })
            .eq('id', pageviewId)
        }
      }

      const event = body.event as { kind?: string; label?: string; meta?: unknown } | undefined
      const kind = str(event?.kind, 40)
      // Allow-list conversion kinds so a client can't inflate the funnel with
      // forged 'signup'/'conversation' events the board sees.
      if (kind && EVENT_KINDS.has(kind)) {
        await supabase.from('site_events').insert({
          session_id: sess.id,
          property: str(body.property) ?? 'website',
          kind,
          label: str(event?.label, 120),
          meta: event?.meta && typeof event.meta === 'object' ? event.meta : {},
        })
      }
      return new NextResponse(null, { status: 204 })
    }

    // ── pageview (t:'pv') ──────────────────────────────────────────────────
    const property = (str(body.property) ?? 'website').toLowerCase()
    if (!PROPERTIES.has(property)) return new NextResponse(null, { status: 204 })
    const path = str(body.path, 512) ?? '/'
    const visitorId = str(body.visitorId, 64)

    const ua = req.headers.get('user-agent') ?? ''
    const ip = clientIp(req.headers)
    const geo = geoFromHeaders(req.headers)
    const { device, browser, browserVersion, os, osVersion } = parseUA(ua)
    const { isBot, reason } = classifyBot(ua)
    const referrer = str(body.referrer, 512)
    const utmSource = str((body.utm as Record<string, unknown>)?.source, 120)
    const { source } = deriveSource(referrer, utmSource, SELF_HOSTS)

    // Find-or-create the session.
    let { data: sess } = await supabase
      .from('site_sessions')
      .select('id')
      .eq('property', property)
      .eq('session_key', sessionKey)
      .maybeSingle()

    if (!sess) {
      // returning = this visitor was seen before (any earlier session).
      let isReturning = false
      if (visitorId) {
        const { count } = await supabase
          .from('site_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('visitor_id', visitorId)
        isReturning = (count ?? 0) > 0
      }
      // Resolve owning network transiently (raw IP never stored).
      let asn: string | null = null
      let asnOrg: string | null = null
      if (ip) {
        const { data: a } = await supabase.rpc('asn_for', { p_ip: ip })
        const row = Array.isArray(a) ? a[0] : a
        if (row) {
          asn = row.asn ?? null
          asnOrg = row.asn_org ?? null
        }
      }
      const utm = (body.utm as Record<string, unknown>) ?? {}
      // upsert with DO UPDATE (ignoreDuplicates:false) + select returns the row
      // in ONE statement — no second round-trip that could race and drop the view.
      const { data: created } = await supabase
        .from('site_sessions')
        .upsert(
          {
            property,
            session_key: sessionKey,
            visitor_id: visitorId,
            ip_hash: ip ? hashIp(ip) : null,
            country: geo.country,
            region: geo.region,
            city: geo.city,
            asn,
            asn_org: asnOrg,
            device,
            browser,
            browser_version: browserVersion,
            os,
            os_version: osVersion,
            screen: str(body.screen, 24),
            locale: str(body.locale, 24),
            referrer,
            source,
            utm_source: utmSource,
            utm_medium: str(utm.medium, 120),
            utm_campaign: str(utm.campaign, 120),
            landing_path: path,
            user_agent: ua.slice(0, 400),
            is_bot: isBot,
            bot_reason: reason,
            is_returning: isReturning,
          },
          { onConflict: 'property,session_key' },
        )
        .select('id')
        .maybeSingle()
      sess = created
    } else {
      await supabase.from('site_sessions').update({ last_seen_at: new Date().toISOString() }).eq('id', sess.id)
    }
    if (!sess) return new NextResponse(null, { status: 204 })

    if (pageviewId) {
      // Cap page-views per session so one (mis)behaving client can't bloat the
      // table unbounded.
      const { count } = await supabase
        .from('site_pageviews')
        .select('id', { count: 'exact', head: true })
        .eq('session_id', sess.id)
      if ((count ?? 0) < MAX_PAGEVIEWS_PER_SESSION) {
        await supabase.from('site_pageviews').upsert(
          {
            id: pageviewId,
            session_id: sess.id,
            property,
            path,
            title: str(body.title, 200),
            referrer,
          },
          { onConflict: 'id', ignoreDuplicates: true },
        )
      }
    }
    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
