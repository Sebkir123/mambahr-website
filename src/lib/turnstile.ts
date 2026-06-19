import 'server-only'

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

// True only when BOTH Turnstile keys are present. Callers use this to decide
// whether to enforce verification — so a path that hasn't had Turnstile set up
// yet degrades to its other defenses (rate limiting) instead of bricking.
export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
}

// Verify a Cloudflare Turnstile token server-side. In production with the keys
// unset we fail CLOSED — never let a misconfig open an unauthenticated path.
// Outside production we accept the widget's dev-bypass token so local dev works
// without Turnstile configured.
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!secret || !siteKey) return process.env.NODE_ENV !== 'production' && token === 'dev-mode-bypass'
  if (!token) return false
  try {
    const form = new URLSearchParams({ secret, response: token, remoteip: ip })
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
    if (!res.ok) return false
    const data = (await res.json()) as { success: boolean }
    return data.success === true
  } catch {
    return false
  }
}
