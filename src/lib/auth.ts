import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin-domain'

export type AdminUser = { id: string; email: string }

// Who is an admin: the @mambahr.com email domain. We own the mambahr.com Google
// Workspace, so only people we issue a mailbox to can receive a magic link — the
// domain is the allowlist. The check itself lives in the pure ./admin-domain
// module so Edge middleware can share it; re-exported here for existing callers.
// Stays in lockstep with the SQL is_admin() function (RLS) and the signup trigger.
export { ADMIN_EMAIL_DOMAIN, isAdminEmail } from '@/lib/admin-domain'

// Returns the signed-in admin, or null. An authenticated Supabase user is only
// an admin if their email domain is mambahr.com — enforced here (defense in
// depth) and by RLS via the is_admin() SQL function.
// Wrapped in React cache() so the layout + page (which both call requireAdmin
// in the same request) share ONE getUser() round-trip instead of two.
export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!isAdminEmail(user?.email)) return null
  return { id: user!.id, email: user!.email! }
})

// Use at the top of every /admin Server Component / action that needs auth.
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser()
  if (!admin) redirect('/admin/login')
  return admin
}
