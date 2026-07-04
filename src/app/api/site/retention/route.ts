import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'
import { postImagePaths } from '@/lib/blog-images'

export const dynamic = 'force-dynamic'

// Daily retention sweep (Vercel cron). Keeps the analytics tables lean + cheap:
//   - bot sessions older than 30 days
//   - any session older than 180 days
// Pageviews/events cascade-delete with their session. Bearer-auth'd to the
// CRON_SECRET so only the scheduler (or an admin with the secret) can run it.
// Also garbage-collects blog-media images no post references (see below).
const BOT_DAYS = 30
const ALL_DAYS = 180
// Grace window before an unreferenced image is swept, covers in-progress edits
// and editor undo (a removed <img> can be restored) before the file is gone.
const IMG_GRACE_MS = 24 * 60 * 60 * 1000

type StoredFile = { path: string; createdAt: string | null }

// Recursively list every file in the blog-media bucket (files live under
// year-folders like 2026/ab.png). Folder entries come back with id === null.
async function listBlogMedia(db: SupabaseClient, prefix: string): Promise<StoredFile[]> {
  const out: StoredFile[] = []
  const pageSize = 100
  let offset = 0
  for (;;) {
    const { data, error } = await db.storage
      .from('blog-media')
      .list(prefix, { limit: pageSize, offset, sortBy: { column: 'name', order: 'asc' } })
    if (error || !data || data.length === 0) break
    for (const entry of data) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.id === null) {
        out.push(...(await listBlogMedia(db, full))) // folder → recurse
      } else {
        out.push({ path: full, createdAt: entry.created_at ?? entry.updated_at ?? null })
      }
    }
    if (data.length < pageSize) break
    offset += pageSize
  }
  return out
}

// Delete blog-media objects no post references and older than the grace window.
async function sweepBlogMedia(db: SupabaseClient): Promise<number | string> {
  try {
    const { data: posts } = await db.from('posts').select('cover_image_url, og_image_url, body_html')
    const referenced = new Set<string>()
    for (const p of posts ?? []) postImagePaths(p).forEach((x) => referenced.add(x))

    const files = await listBlogMedia(db, '')
    const now = Date.now()
    const orphans = files
      .filter((f) => !referenced.has(f.path))
      .filter((f) => !f.createdAt || now - new Date(f.createdAt).getTime() > IMG_GRACE_MS)
      .map((f) => f.path)

    let deleted = 0
    for (let i = 0; i < orphans.length; i += 100) {
      const chunk = orphans.slice(i, i + 100)
      const { error } = await db.storage.from('blog-media').remove(chunk)
      if (!error) deleted += chunk.length
    }
    return deleted
  } catch (e) {
    return `error: ${e instanceof Error ? e.message : String(e)}`
  }
}

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
  const deletedImages = await sweepBlogMedia(db)

  return NextResponse.json({
    ok: true,
    deletedBotSessions: bots.error ? `error: ${bots.error.message}` : (bots.data?.length ?? 0),
    deletedOldSessions: old.error ? `error: ${old.error.message}` : (old.data?.length ?? 0),
    deletedImages,
  })
}
