const REQUIRED_SERVER_VARS = [
  'TURNSTILE_SECRET_KEY',
  'RESEND_API_KEY',
  'SLACK_WEBHOOK_WAITLIST',
] as const

const REQUIRED_PUBLIC_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

type ServerVar = typeof REQUIRED_SERVER_VARS[number]
type PublicVar = typeof REQUIRED_PUBLIC_VARS[number]

function validateEnv() {
  if (typeof window !== 'undefined') return // client-side: skip server vars
  const missing: string[] = []
  for (const key of REQUIRED_SERVER_VARS) {
    if (!process.env[key]) missing.push(key)
  }
  for (const key of REQUIRED_PUBLIC_VARS) {
    if (!process.env[key]) missing.push(key)
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  • ${k}`).join('\n')}\n\nCopy .env.example to .env.local and fill in values.`
    )
  }
}

// Validate once at module load (server only, not during next build phase)
if (
  process.env.NODE_ENV !== 'test' &&
  process.env.NEXT_PHASE !== 'phase-production-build'
) {
  validateEnv()
}

export const env = {
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY as string,
  resendKey: process.env.RESEND_API_KEY as string,
  slackWebhookWaitlist: process.env.SLACK_WEBHOOK_WAITLIST as string,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
} as const

// Suppress unused type warnings — these are intentionally exported for consumers
export type { ServerVar, PublicVar }
