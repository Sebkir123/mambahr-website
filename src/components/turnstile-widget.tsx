'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Load the Turnstile lib only when a form that needs it actually mounts, as its
// own chunk, keeps it out of the homepage's initial JS (the Resources section
// renders this widget). Client-only, so ssr:false is fine.
const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then((m) => m.Turnstile), {
  ssr: false,
})

interface Props {
  onSuccess: (token: string) => void
  theme?: 'light' | 'dark' | 'auto'
}

/**
 * Cloudflare Turnstile widget wrapper.
 * Renders nothing if NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured
 * (useful for local dev before you set up Turnstile).
 */
export default function TurnstileWidget({ onSuccess, theme = 'dark' }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  // The parent passes a fresh callback each render; keep the latest one in a
  // ref so the dev-mode auto-pass below runs once, not once per render.
  const onSuccessRef = useRef(onSuccess)
  useEffect(() => { onSuccessRef.current = onSuccess }, [onSuccess])

  // Dev mode, auto-pass with a dummy token so forms work without Turnstile setup
  useEffect(() => {
    if (!siteKey) {
      onSuccessRef.current('dev-mode-bypass')
    }
  }, [siteKey])

  if (!siteKey) {
    return null
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onSuccess}
        options={{ theme, size: 'flexible' }}
      />
    </div>
  )
}
