import { NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { socialDb, publishForAccount } from '@/lib/social'

export const dynamic = 'force-dynamic'

// Publishes due scheduled posts. Triggered by Vercel Cron (sends a
// x-vercel-cron header) or any caller presenting CRON_SECRET.
export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  const isVercelCron = req.headers.get('x-vercel-cron') !== null
  const ok = isVercelCron || (env.cronSecret && auth === `Bearer ${env.cronSecret}`)
  if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const db = socialDb()
  if (!db) return NextResponse.json({ error: 'service unavailable' }, { status: 503 })

  const { data: due } = await db
    .from('social_posts')
    .select('id, body, account_id')
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date().toISOString())
    .limit(50)

  let published = 0
  let failed = 0
  for (const post of due ?? []) {
    const { data: acct } = await db
      .from('social_accounts')
      .select('id, author_urn, access_token, refresh_token, expires_at')
      .eq('id', post.account_id)
      .single()
    try {
      const externalId = await publishForAccount(acct as never, post.body as string)
      await db
        .from('social_posts')
        .update({ status: 'published', published_at: new Date().toISOString(), external_post_id: externalId, error: null, updated_at: new Date().toISOString() })
        .eq('id', post.id)
      published++
    } catch (e) {
      await db
        .from('social_posts')
        .update({ status: 'failed', error: e instanceof Error ? e.message : 'publish failed', updated_at: new Date().toISOString() })
        .eq('id', post.id)
      failed++
    }
  }
  return NextResponse.json({ ok: true, published, failed })
}
