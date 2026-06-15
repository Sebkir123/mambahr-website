import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

// Cookie-backed Supabase client for Client Components (the admin login screen,
// the editor's image uploads). Shares the session with the server client.
export function createSupabaseBrowserClient() {
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey)
}
