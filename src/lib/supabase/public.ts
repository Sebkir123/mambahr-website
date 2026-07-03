import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// Cookie-free, always-anonymous client for public marketing pages (blog index,
// post, rss, sitemap, OG image). `posts` RLS has two permissive policies:
// posts_public_read (published/due-scheduled only) and posts_admin_all (every
// row, for signed-in admins). The cookie-backed server client forwards
// whatever Supabase session the browser holds, so an admin viewing the
// "public" blog in the same browser they're signed into /admin sees drafts as
// if they were live, a real anonymous visitor never would. Using a client
// that never carries auth means only posts_public_read can ever match, so
// what the founder previews always matches what visitors actually see.
let client: SupabaseClient | null = null
export function createSupabasePublicClient(): SupabaseClient {
  if (client) return client
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
