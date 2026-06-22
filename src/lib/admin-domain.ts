// Single source of truth for the admin email allowlist. Deliberately
// PURE, no next/* imports, so it can be used from Edge middleware AND from
// server code without dragging in next/headers.
const ADMIN_EMAILS = new Set([
  'seb.kirsch@mambahr.com',
  'brian.bell@mambahr.com',
  'jaz.cisneros@mambahr.com',
])

// Exported for callers that need the domain string (e.g. login page hint).
export const ADMIN_EMAIL_DOMAIN = 'mambahr.com'

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.has(email.toLowerCase())
}
