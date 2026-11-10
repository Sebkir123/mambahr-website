import { createHmac, timingSafeEqual } from 'node:crypto'

// Signed unsubscribe links. No login: the link itself is the credential, so
// the address travels in the URL next to an HMAC of it. Only the server holds
// the key, so nobody can unsubscribe an address they did not receive mail at.
// Kept free of Next.js imports so `node --test` can load it directly.

const PREFIX = 'mambahr-unsubscribe:v1:'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const b64url = (b: Buffer) => b.toString('base64url')

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function mac(email: string, key: string): Buffer {
  return createHmac('sha256', key).update(PREFIX + email).digest()
}

/** The two query parameters for an address: `e` (the address) and `t` (its signature). */
export function signUnsubscribe(email: string, key: string): { e: string; t: string } {
  const addr = normalizeEmail(email)
  return { e: b64url(Buffer.from(addr, 'utf8')), t: b64url(mac(addr, key)) }
}

/** The address a valid link names, or null for a missing, altered or forged one. */
export function verifyUnsubscribe(e: unknown, t: unknown, key: string): string | null {
  if (typeof e !== 'string' || typeof t !== 'string' || !e || !t || e.length > 400 || t.length > 100) return null
  if (!/^[A-Za-z0-9_-]+$/.test(e) || !/^[A-Za-z0-9_-]+$/.test(t)) return null
  const addr = Buffer.from(e, 'base64url').toString('utf8')
  if (addr !== normalizeEmail(addr) || !EMAIL_RE.test(addr)) return null
  const want = mac(addr, key)
  const got = Buffer.from(t, 'base64url')
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null
  return addr
}

export function unsubscribeQuery(email: string, key: string): string {
  const { e, t } = signUnsubscribe(email, key)
  return `e=${e}&t=${t}`
}
