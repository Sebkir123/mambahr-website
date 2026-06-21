import 'server-only'
import { serviceDb } from '@/lib/supabase/service'

// Secret resolution mirroring the Supabase edge functions: env var first (local
// dev / any Vercel-set vars), then Supabase Vault via the get_secret RPC — where
// the landing project's delivery secrets (RESEND_API_KEY, SLACK_WEBHOOK_URL)
// actually live. The Next.js routes can't see Vault through process.env, so
// without this fallback email + Slack silently no-op in production.
//
// Cached per-process after first read (secrets don't rotate mid-deploy).

const cache = new Map<string, string | null>()

export async function getSecret(name: string): Promise<string | null> {
  const envVal = process.env[name]
  if (envVal) return envVal
  if (cache.has(name)) return cache.get(name) ?? null

  const db = serviceDb()
  if (!db) {
    cache.set(name, null)
    return null
  }
  const { data, error } = await db.rpc('get_secret', { p_name: name })
  const val = error || !data ? null : String(data)
  cache.set(name, val)
  return val
}

// Slack incoming webhook for lead notifications. The env var (local/Vercel) is
// named SLACK_WEBHOOK_WAITLIST; the Vault secret is SLACK_WEBHOOK_URL. Try both.
export async function getLeadSlackWebhook(): Promise<string | null> {
  return (await getSecret('SLACK_WEBHOOK_WAITLIST')) ?? (await getSecret('SLACK_WEBHOOK_URL'))
}
