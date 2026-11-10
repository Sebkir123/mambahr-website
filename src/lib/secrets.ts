import 'server-only'
import { serviceDb } from '@/lib/supabase/service'

// Secret resolution mirroring the Supabase edge functions: env var first (local
// dev / any Vercel-set vars), then Supabase Vault via the get_secret RPC, where
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
  if (error) {
    // Not cached: a passing Vault/RPC failure must not disable Slack or email
    // for the life of a warm instance.
    console.error(`[secrets] Vault lookup for ${name} failed:`, error.message)
    return null
  }
  const val = data ? String(data) : null
  cache.set(name, val)
  return val
}

// Slack incoming webhook for lead notifications (#waitlist). The env var
// (local/Vercel) is SLACK_WEBHOOK_WAITLIST, read first from env, then Vault.
// SLACK_WEBHOOK_URL is the older founders' leads webhook the demo edge function
// uses; it may post to a different channel, so using it is logged.
export async function getLeadSlackWebhook(): Promise<{ url: string; source: string } | null> {
  const waitlist = await getSecret('SLACK_WEBHOOK_WAITLIST')
  if (waitlist) return { url: waitlist, source: 'SLACK_WEBHOOK_WAITLIST' }
  const fallback = await getSecret('SLACK_WEBHOOK_URL')
  if (fallback) {
    console.warn('[slack] SLACK_WEBHOOK_WAITLIST is not set; posting with SLACK_WEBHOOK_URL, which may not be the #waitlist channel')
    return { url: fallback, source: 'SLACK_WEBHOOK_URL' }
  }
  return null
}
