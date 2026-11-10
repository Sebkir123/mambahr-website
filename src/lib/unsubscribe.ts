import 'server-only'
import { createHmac } from 'node:crypto'
import { getSecret } from '@/lib/secrets'
import { earlyAccessDb, SITE } from '@/lib/early-access'
import { normalizeEmail, unsubscribeQuery, verifyUnsubscribe } from '@/lib/unsubscribe-token'

// Unsubscribes for the emails the site sends to lists (the early access list).
// The store is public.email_unsubscribes in the same Supabase project as the
// waitlist (migration 20261110000000), read and written with the service role.

// The signing key: UNSUBSCRIBE_SECRET when it is set (env or Vault), otherwise
// a key derived one-way from the service-role key, so links work without a new
// variable. Rotating either key retires the links already sent.
async function signingKey(): Promise<string | null> {
  const own = await getSecret('UNSUBSCRIBE_SECRET')
  if (own) return own
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!service) return null
  return createHmac('sha256', service).update('mambahr-unsubscribe-key-v1').digest('hex')
}

export type UnsubscribeLinks = { pageUrl: string; oneClickUrl: string; headers: Record<string, string> }

/** The footer link and the RFC 8058 headers for one recipient, or null when no key is configured. */
export async function unsubscribeLinks(email: string): Promise<UnsubscribeLinks | null> {
  const key = await signingKey()
  if (!key) {
    console.error('[unsubscribe] no signing key: set UNSUBSCRIBE_SECRET or SUPABASE_SERVICE_ROLE_KEY')
    return null
  }
  const q = unsubscribeQuery(email, key)
  const pageUrl = `${SITE}/unsubscribe?${q}`
  const oneClickUrl = `${SITE}/api/unsubscribe?${q}`
  return {
    pageUrl,
    oneClickUrl,
    headers: {
      'List-Unsubscribe': `<${oneClickUrl}>, <mailto:hello@mambahr.com?subject=Unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  }
}

/** The address a link names when its signature checks out. */
export async function addressFromLink(e: unknown, t: unknown): Promise<string | null> {
  const key = await signingKey()
  return key ? verifyUnsubscribe(e, t, key) : null
}

/**
 * Whether list mail to this address must be skipped. A failed lookup is logged
 * and treated as "not unsubscribed", so a database hiccup never stops the
 * welcome email for someone who just joined.
 */
export async function isUnsubscribed(email: string): Promise<boolean> {
  const db = earlyAccessDb()
  if (!db) return false
  const { data, error } = await db
    .from('email_unsubscribes')
    .select('email')
    .eq('email', normalizeEmail(email))
    .maybeSingle()
  if (error) {
    console.error('[unsubscribe] lookup failed, sending anyway:', error.message)
    return false
  }
  return Boolean(data)
}

/** Records the unsubscribe. Repeating it is harmless. */
export async function markUnsubscribed(email: string, source: 'link' | 'one-click'): Promise<boolean> {
  const db = earlyAccessDb()
  if (!db) {
    console.error('[unsubscribe] no database client: SUPABASE_SERVICE_ROLE_KEY is not set')
    return false
  }
  const { error } = await db
    .from('email_unsubscribes')
    .upsert({ email: normalizeEmail(email), source }, { onConflict: 'email', ignoreDuplicates: true })
  if (error) {
    console.error('[unsubscribe] could not record the unsubscribe:', error.message)
    return false
  }
  return true
}
