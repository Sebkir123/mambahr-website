import { NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { socialDb, publishForAccount } from '@/lib/social'

export const dynamic = 'force-dynamic'

// Publishes due scheduled posts. Authenticated by CRON_SECRET only — Vercel Cron
// sends `Authorization: Bearer <CRON_SECRET>` automatically when the env var is
// set. We do NOT trust the x-vercel-cron header (a client can forge it, which
// would let anyone force-publish to the founders' real feeds). Fail closed.
export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  const ok = Boolean(env.cronSecret) && auth === `Bearer ${env.cronSecret}`
  if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const db = socialDb()
  if (!db) return NextResponse.json({ error: 'service unavailable' }, { status: 503 })

  const { data: due } = await db
    .from('social_posts')
    .select('id, body, image_url, account_id')
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
      .maybeSingle()
    try {
      if (!acct) throw new Error('Connected account no longer exists')
      const externalId = await publishForAccount(acct as never, post.body as string, post.image_url as string | null)
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
