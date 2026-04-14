'use client'

import { Turnstile } from '@marsidev/react-turnstile'

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

  if (!siteKey) {
    // Dev mode — auto-pass with a dummy token so forms work without Turnstile setup
    if (typeof window !== 'undefined') {
      setTimeout(() => onSuccess('dev-mode-bypass'), 0)
    }
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
