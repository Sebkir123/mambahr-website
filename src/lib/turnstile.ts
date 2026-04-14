/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Returns true if the token is valid, false otherwise.
 *
 * In dev mode (no TURNSTILE_SECRET_KEY set), always returns true
 * so you can test forms without real Turnstile keys.
 */
export async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // No secret configured — skip verification (dev mode)
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('TURNSTILE_SECRET_KEY not set in production — bot protection disabled')
    }
    return true
  }

  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}
