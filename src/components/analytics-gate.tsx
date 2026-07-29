'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

/**
 * Renders Google Analytics only when the visitor has not opted out via Global
 * Privacy Control or Do Not Track. Our privacy policy says we honour GPC, so
 * the opt-out has to cover third-party analytics too, not just our own beacon.
 *
 * Mounted client-side after the check so no GA script tag is injected at all
 * for an opted-out visitor. Same signal check as <SiteTracker>.
 */
export default function AnalyticsGate({ gaId }: { gaId: string }) {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string }
    if (nav.globalPrivacyControl === true) return
    const dnt = nav.doNotTrack ?? nav.msDoNotTrack ?? (window as Window & { doNotTrack?: string }).doNotTrack
    if (dnt === '1' || dnt === 'yes') return
    setAllowed(true)
  }, [])

  if (!allowed) return null
  return <GoogleAnalytics gaId={gaId} />
}
