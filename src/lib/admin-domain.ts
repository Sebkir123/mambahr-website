// Single source of truth for the admin email allowlist. Deliberately
// PURE — no next/* imports — so it can be used from Edge middleware AND from
// server code without dragging in next/headers.
//
// Allowlist is driven by ADMIN_EMAILS env var (comma-separated). In dev,
// falls back to the hard-coded set so local testing works without env config.
const FALLBACK_ADMIN_EMAILS = [
  'seb.kirsch@mambahr.com',
  'brian.bell@mambahr.com',
  'jaz.cisneros@mambahr.com',
]

function resolveAllowlist(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? ''
  const parsed = raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  const list = parsed.length > 0 ? parsed : FALLBACK_ADMIN_EMAILS.map((e) => e.toLowerCase())
  return new Set(list)
}

// Exported for callers that need the domain string (e.g. login page hint).
export const ADMIN_EMAIL_DOMAIN = 'mambahr.com'

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return resolveAllowlist().has(email.toLowerCase())
}
