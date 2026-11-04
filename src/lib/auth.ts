import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin-domain'

export type AdminUser = { id: string; email: string }

// Website admin access uses the explicit email allowlist shared with the login
// endpoint, callback and edge gate. Mailbox ownership is verified by Supabase.
export { ADMIN_EMAIL_DOMAIN, isAdminEmail } from '@/lib/admin-domain'

// Returns the signed-in admin, or null. An authenticated Supabase user is only
// an admin if their verified email is explicitly allowlisted. Database RLS
// independently enforces its is_admin() policy.
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
