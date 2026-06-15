import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type AdminUser = { id: string; email: string }

// The single source of truth for who is an admin: the @mambahr.com email
// domain. We own the mambahr.com Google Workspace, so only people we issue a
// mailbox to can receive a magic link — the domain is the allowlist. This must
// stay in lockstep with the SQL is_admin() function (RLS) and the auth.users
// signup trigger; all three check the exact email domain.
export const ADMIN_EMAIL_DOMAIN = 'mambahr.com'

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.toLowerCase().split('@')[1] === ADMIN_EMAIL_DOMAIN
}

// Returns the signed-in admin, or null. An authenticated Supabase user is only
// an admin if their email domain is mambahr.com — enforced here (defense in
// depth) and by RLS via the is_admin() SQL function.
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!isAdminEmail(user?.email)) return null
  return { id: user!.id, email: user!.email! }
}

// Use at the top of every /admin Server Component / action that needs auth.
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser()
  if (!admin) redirect('/admin/login')
  return admin
}
