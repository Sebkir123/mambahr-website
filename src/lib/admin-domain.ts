// Single source of truth for the admin email-domain allowlist. Deliberately
// PURE — no next/* imports — so it can be used from Edge middleware AND from
// server code without dragging in next/headers. Keep in lockstep with the SQL
// is_admin() function and the auth.users signup trigger; all three check the
// exact email domain.
export const ADMIN_EMAIL_DOMAIN = 'mambahr.com'

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.toLowerCase().split('@')[1] === ADMIN_EMAIL_DOMAIN
}
