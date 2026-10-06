import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// Service-role access for the early access list. The waitlist table has no
// public policies: every read and write goes through these helpers, behind
// Turnstile (join) or the secret pass token (everything after).

let client: SupabaseClient | null = null
export function earlyAccessDb(): SupabaseClient | null {
  if (client) return client
  if (!env.supabaseServiceRoleKey) return null
  client = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}

export const SITE = 'https://www.mambahr.com'
export const passUrl = (token: string) => `${SITE}/early-access/pass/${token}`
export const referralUrl = (code: string) => `${SITE}/r/${code}`

const TOKEN_RE = /^[0-9a-f]{32}$/
const CODE_RE = /^[0-9a-f]{8}$/
export const isPassToken = (t: string) => TOKEN_RE.test(t)
export const isReferralCode = (c: string) => CODE_RE.test(c)

export type Pass = {
  email: string
  company: string | null
  teamSize: string | null
  hrSystem: string | null
  handoffs: string[]
  referralCode: string
  joinedAt: string
  referrals: number
}

export async function getPass(token: string): Promise<Pass | null> {
  const db = earlyAccessDb()
  if (!db || !isPassToken(token)) return null
  const { data } = await db
    .from('waitlist')
    .select('email, company, team_size, hr_system, first_handoff, referral_code, created_at')
    .eq('pass_token', token)
    .maybeSingle()
  if (!data) return null
  const { count } = await db
    .from('waitlist')
    .select('id', { count: 'exact', head: true })
    .eq('referred_by', data.referral_code)
  return {
    email: data.email,
    company: data.company || null,
    teamSize: data.team_size,
    hrSystem: data.hr_system,
    handoffs: data.first_handoff ?? [],
    referralCode: data.referral_code,
    joinedAt: data.created_at,
    referrals: count ?? 0,
  }
}

/** The company behind a shared link, for "Acme gave you a founding spot". */
export async function getReferrer(code: string): Promise<{ company: string | null } | null> {
  const db = earlyAccessDb()
  if (!db || !isReferralCode(code)) return null
  const { data } = await db.from('waitlist').select('company').eq('referral_code', code).maybeSingle()
  return data ? { company: data.company || null } : null
}
