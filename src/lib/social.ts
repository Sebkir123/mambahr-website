import 'server-only'
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// Server-only helpers for the in-admin LinkedIn posting tool: token encryption,
// the OAuth dance, and publishing. Tokens are AES-256-GCM encrypted before they
// touch the DB; the key is SOCIAL_TOKEN_KEY (falls back to a hash of the service
// role key in dev so local flows work without extra config).

export const LINKEDIN_SCOPES = ['openid', 'profile', 'email', 'w_member_social']
export const LINKEDIN_REDIRECT_PATH = '/api/social/linkedin/callback'

// ── token crypto ───────────────────────────────────────────────────────────
function key(): Buffer {
  const k = env.socialTokenKey
  if (k && /^[0-9a-fA-F]{64}$/.test(k)) return Buffer.from(k, 'hex')
  // Tokens at rest must be protected by a key separate from the DB credentials.
  // Refuse to fall back to a derived/constant key in production.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SOCIAL_TOKEN_KEY (64 hex chars) is required in production')
  }
  // Dev only: stable constant so local connect/publish flows work without setup.
  return createHash('sha256').update('mamba-social-dev-only').digest()
}
export function encryptToken(plain: string): string {
  const iv = randomBytes(12)
  const c = createCipheriv('aes-256-gcm', key(), iv)
  const enc = Buffer.concat([c.update(plain, 'utf8'), c.final()])
  const tag = c.getAuthTag()
  return `${iv.toString('base64')}.${tag.toString('base64')}.${enc.toString('base64')}`
}
export function decryptToken(blob: string | null): string | null {
  if (!blob) return null
  try {
    const [ivB, tagB, dataB] = blob.split('.')
    const d = createDecipheriv('aes-256-gcm', key(), Buffer.from(ivB, 'base64'))
    d.setAuthTag(Buffer.from(tagB, 'base64'))
    return Buffer.concat([d.update(Buffer.from(dataB, 'base64')), d.final()]).toString('utf8')
  } catch {
    return null
  }
}

// ── service-role client (bypasses RLS; reads tokens, writes posts/accounts) ──
let admin: SupabaseClient | null = null
export function socialDb(): SupabaseClient | null {
  if (admin) return admin
  if (!env.supabaseServiceRoleKey) return null
  admin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return admin
}

export function linkedinConfigured(): boolean {
  return Boolean(env.linkedinClientId && env.linkedinClientSecret)
}

// ── OAuth ────────────────────────────────────────────────────────────────────
export function linkedinAuthUrl(state: string): string {
  const u = new URL('https://www.linkedin.com/oauth/v2/authorization')
  u.searchParams.set('response_type', 'code')
  u.searchParams.set('client_id', env.linkedinClientId!)
  u.searchParams.set('redirect_uri', `${env.siteUrl}${LINKEDIN_REDIRECT_PATH}`)
  u.searchParams.set('state', state)
  u.searchParams.set('scope', LINKEDIN_SCOPES.join(' '))
  return u.toString()
}

type TokenResponse = { access_token: string; expires_in: number; refresh_token?: string; refresh_token_expires_in?: number }
export async function exchangeCode(code: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${env.siteUrl}${LINKEDIN_REDIRECT_PATH}`,
    client_id: env.linkedinClientId!,
    client_secret: env.linkedinClientSecret!,
  })
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`LinkedIn token exchange failed: ${res.status} ${await res.text()}`)
  return (await res.json()) as TokenResponse
}

export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: env.linkedinClientId!,
    client_secret: env.linkedinClientSecret!,
  })
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`LinkedIn token refresh failed: ${res.status}`)
  return (await res.json()) as TokenResponse
}

// OpenID userinfo → identity + the author URN we post as.
export async function fetchLinkedInProfile(accessToken: string): Promise<{ sub: string; name: string; picture?: string }> {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`LinkedIn userinfo failed: ${res.status}`)
  const j = (await res.json()) as { sub: string; name?: string; given_name?: string; family_name?: string; picture?: string }
  return { sub: j.sub, name: j.name || [j.given_name, j.family_name].filter(Boolean).join(' ') || 'LinkedIn account', picture: j.picture }
}

// ── publishing ───────────────────────────────────────────────────────────────
// Posts a text share to the member's own feed via the Posts API.
export async function publishLinkedInText(accessToken: string, authorUrn: string, text: string): Promise<string> {
  const res = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202401',
    },
    body: JSON.stringify({
      author: authorUrn,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  })
  if (!res.ok) throw new Error(`LinkedIn publish failed: ${res.status} ${await res.text()}`)
  // The created post URN comes back in the x-restli-id header.
  return res.headers.get('x-restli-id') || res.headers.get('x-linkedin-id') || 'published'
}

// Resolve a usable (refreshed if needed) access token for an account row, and
// publish. Persists refreshed tokens. Returns the post URN.
export async function publishForAccount(account: {
  id: string
  author_urn: string | null
  access_token: string | null
  refresh_token: string | null
  expires_at: string | null
}, text: string): Promise<string> {
  const db = socialDb()
  if (!db) throw new Error('Service role not configured')
  let token = decryptToken(account.access_token)
  if (!token) throw new Error('No access token on account')
  const expired = account.expires_at ? new Date(account.expires_at).getTime() < Date.now() + 60_000 : false
  if (expired) {
    const refresh = decryptToken(account.refresh_token)
    if (!refresh) {
      throw new Error('This LinkedIn connection has expired — reconnect the account to keep posting')
    }
    {
      const r = await refreshAccessToken(refresh)
      token = r.access_token
      await db
        .from('social_accounts')
        .update({
          access_token: encryptToken(r.access_token),
          refresh_token: r.refresh_token ? encryptToken(r.refresh_token) : account.refresh_token,
          expires_at: new Date(Date.now() + r.expires_in * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', account.id)
    }
  }
  if (!account.author_urn) throw new Error('Account has no author URN')
  return publishLinkedInText(token, account.author_urn, text)
}
