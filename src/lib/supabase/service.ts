import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// Service-role client for READS that are already gated by requireAdmin() at the
// page level. Unlike the cookie-backed client it has no per-request dependency,
// so its results can be wrapped in unstable_cache (cookies() is forbidden inside
// a cached scope). Use ONLY behind an admin auth check.
let client: SupabaseClient | null = null
export function serviceConfigured(): boolean {
  return Boolean(env.supabaseServiceRoleKey)
}
export function serviceDb(): SupabaseClient | null {
  if (client) return client
  if (!env.supabaseServiceRoleKey) return null
  client = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
