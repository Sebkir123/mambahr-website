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
    // Warn rather than throw so preview deployments without all vars still work.
    // The individual routes handle missing vars gracefully (skip Slack/email, etc).
    console.warn(
      `[env] Missing environment variables — some features will be disabled:\n${missing.map((k) => `  • ${k}`).join('\n')}`
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
  // Optional: enables durable per-IP rate-limiting via the check_signup_rate_limit RPC.
  // Without it, the route falls back to the in-memory limiter (per-lambda-instance only).
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  // Social posting (LinkedIn) — all optional; the Posts admin degrades to
  // "connect not configured" until these are set.
  linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  socialTokenKey: process.env.SOCIAL_TOKEN_KEY, // 64 hex chars (32 bytes) → AES-256-GCM
  cronSecret: process.env.CRON_SECRET,
  anthropicKey: process.env.ANTHROPIC_API_KEY, // AI post drafting (Claude)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mambahr.com',
} as const

// Suppress unused type warnings — these are intentionally exported for consumers
export type { ServerVar, PublicVar }
