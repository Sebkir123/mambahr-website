'use client'

import { useSyncExternalStore } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * Renders Google Analytics only when the visitor has not opted out via Global
 * Privacy Control or Do Not Track. Our privacy policy says we honour GPC, so
 * the opt-out has to cover third-party analytics too, not just our own beacon.
 *
 * The opt-out signal lives on the browser, so it is read through
 * useSyncExternalStore: the server snapshot is "not allowed" (no GA tag in the
 * HTML), the client snapshot reads navigator once hydration runs. No GA script
 * tag is injected at all for an opted-out visitor. Same signal check as
 * <SiteTracker>.
 */
function subscribe() {
  // The signal never changes during a page's lifetime; nothing to subscribe to.
  return () => {}
}

function readOptOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string }
  if (nav.globalPrivacyControl === true) return true
  const dnt = nav.doNotTrack ?? nav.msDoNotTrack ?? (window as Window & { doNotTrack?: string }).doNotTrack
  return dnt === '1' || dnt === 'yes'
}

function getClientAllowed(): boolean {
  return !readOptOut()
}

function getServerAllowed(): boolean {
  return false
}

export default function AnalyticsGate({ gaId }: { gaId: string }) {
  const allowed = useSyncExternalStore(subscribe, getClientAllowed, getServerAllowed)
  if (!allowed) return null
  return <GoogleAnalytics gaId={gaId} />
}
