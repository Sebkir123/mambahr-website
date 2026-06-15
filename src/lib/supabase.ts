import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Anon client for server-side route handlers (e.g. the waitlist insert, gated by RLS).
// Lazily constructed: `next build`'s "collect page data" phase evaluates route modules
// before NEXT_PUBLIC_* vars are guaranteed inlined, and createClient throws on an empty
// URL. A top-level singleton therefore crashed the entire build when the var was missing
// for a deployment. Deferring construction to first use keeps module import side-effect
// free, matching env.ts's warn-don't-throw contract for partially-configured deployments.
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client
  client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  return client
}
