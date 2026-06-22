import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'

// Request-scoped Supabase client backed by the user's auth cookies.
// Use in Server Components, server actions, and route handlers that act AS the
// signed-in admin (RLS applies). For privileged writes that must bypass RLS,
// use the service-role client in ./admin.ts instead.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        // In Server Components cookie writes throw; that's expected, the
        // middleware refreshes the session, so we swallow the error here.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          /* called from a Server Component, middleware handles refresh */
        }
      },
    },
  })
}
