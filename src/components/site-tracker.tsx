'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Tiny first-party tracker. Signals page-views + engagement to /api/site/track,
// where the server attaches the authoritative metadata. Per page it tracks max
// scroll depth and ACTIVE time (only while the tab is visible), flushing on tab-
// hide / unload / route-change via sendBeacon so the data survives navigation.
// Declarative conversions: any element with data-track="kind" (optional
// data-track-label) fires an event on click — e.g. <a data-track="cta_click">.
const ENDPOINT = '/api/site/track'
const HEARTBEAT_MS = 15_000

function uuid(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch {
    /* fall through */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function SiteTracker() {
  const pathname = usePathname()
  const idRef = useRef<{ visitor: string; session: string } | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) return
    if (typeof window === 'undefined') return

    // Identity: visitor persists (returning detection); session is per tab session.
    if (!idRef.current) {
      let visitor = ''
      let session = ''
      try {
        visitor = localStorage.getItem('mt_vid') || ''
        if (!visitor) {
          visitor = uuid()
          localStorage.setItem('mt_vid', visitor)
        }
        session = sessionStorage.getItem('mt_sid') || ''
        if (!session) {
          session = uuid()
          sessionStorage.setItem('mt_sid', session)
        }
      } catch {
        visitor = visitor || uuid()
        session = session || uuid()
      }
      idRef.current = { visitor, session }
    }
    const { visitor: visitorId, session: sessionKey } = idRef.current
    const property = pathname.startsWith('/deck-') ? 'deck' : 'website'
    const pageviewId = uuid()

    let activeMs = 0
    let lastTick = document.visibilityState === 'visible' ? Date.now() : 0
    let sentFinal = false

    const scrollPct = () => {
      const el = document.documentElement
      const denom = el.scrollHeight - el.clientHeight
      if (denom <= 0) return 0 // page fits the viewport — not scrollable; don't inflate scroll depth
      return Math.max(0, Math.min(100, Math.round(((el.scrollTop || window.scrollY) / denom) * 100)))
    }
    let maxScroll = 0

    const sp = new URLSearchParams(window.location.search)
    const utm = { source: sp.get('utm_source'), medium: sp.get('utm_medium'), campaign: sp.get('utm_campaign') }

    // Initial page-view.
    fetch(ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        t: 'pv',
        property,
        sessionKey,
        visitorId,
        pageviewId,
        path: pathname,
        title: document.title,
        referrer: document.referrer || null,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        locale: navigator.language,
        utm,
      }),
    }).catch(() => {})

    const accrue = () => {
      if (lastTick) {
        activeMs += Date.now() - lastTick
        lastTick = 0
      }
    }
    const resume = () => {
      if (!lastTick) lastTick = Date.now()
    }
    const flush = (event?: { kind: string; label?: string }) => {
      accrue()
      const payload = JSON.stringify({
        t: 'up',
        property,
        sessionKey,
        pageviewId,
        dwellMs: activeMs,
        scroll: maxScroll,
        ...(event ? { event } : {}),
      })
      try {
        if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }))
        else fetch(ENDPOINT, { method: 'POST', keepalive: true, headers: { 'content-type': 'application/json' }, body: payload }).catch(() => {})
      } catch {
        /* ignore */
      }
      resume()
    }

    const onScroll = () => {
      const p = scrollPct()
      if (p > maxScroll) maxScroll = p
    }
    const onVis = () => {
      if (document.visibilityState === 'hidden') flush()
      else resume()
    }
    const onHide = () => {
      if (!sentFinal) {
        sentFinal = true
        flush()
      }
    }
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('[data-track]') as HTMLElement | null
      if (el) flush({ kind: el.dataset.track || 'custom', label: el.dataset.trackLabel || el.textContent?.trim().slice(0, 80) })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pagehide', onHide)
    document.addEventListener('click', onClick, true)
    // Heartbeat for long reads — but only while the tab is actually visible, so
    // a backgrounded tab doesn't keep beaconing.
    const hb = setInterval(() => {
      if (document.visibilityState === 'visible') flush()
    }, HEARTBEAT_MS)

    return () => {
      onHide() // route change ends this page-view
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pagehide', onHide)
      document.removeEventListener('click', onClick, true)
      clearInterval(hb)
    }
  }, [pathname])

  return null
}
