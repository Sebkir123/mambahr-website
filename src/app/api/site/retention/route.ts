import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

// Daily retention sweep (Vercel cron). Keeps the analytics tables lean + cheap:
//   - bot sessions older than 30 days
//   - any session older than 180 days
// Pageviews/events cascade-delete with their session. Bearer-auth'd to the
// CRON_SECRET so only the scheduler (or an admin with the secret) can run it.
const BOT_DAYS = 30
const ALL_DAYS = 180

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const ok = Boolean(env.cronSecret) && auth === `Bearer ${env.cronSecret}`
  // Vercel Cron also sends its own header; accept either the secret or the cron header.
  const isCron = req.headers.get('x-vercel-cron') === '1'
  if (!ok && !isCron) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  if (!env.supabaseServiceRoleKey) return NextResponse.json({ error: 'not configured' }, { status: 503 })
  const db = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const botCutoff = new Date(Date.now() - BOT_DAYS * 86_400_000).toISOString()
  const allCutoff = new Date(Date.now() - ALL_DAYS * 86_400_000).toISOString()

  const bots = await db.from('site_sessions').delete().eq('is_bot', true).lt('started_at', botCutoff).select('id')
  const old = await db.from('site_sessions').delete().lt('started_at', allCutoff).select('id')

  return NextResponse.json({
    ok: true,
    deletedBotSessions: bots.error ? `error: ${bots.error.message}` : (bots.data?.length ?? 0),
    deletedOldSessions: old.error ? `error: ${old.error.message}` : (old.data?.length ?? 0),
  })
}
