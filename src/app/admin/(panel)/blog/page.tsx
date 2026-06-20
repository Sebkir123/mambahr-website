import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { PostStatus } from '@/lib/blog'
import { getBlogStatsBySlug, compact, formatReadTime } from '@/lib/blog-analytics'
import ui from '../admin-ui.module.css'
import { createDraft } from './actions'

export const dynamic = 'force-dynamic'

type Row = {
  id: string
  title: string
  slug: string
  status: PostStatus
  published_at: string | null
  updated_at: string
  tags: string[]
}

const STATUS_CLASS: Record<PostStatus, string> = {
  published: ui.badgePublished,
  draft: ui.badgeDraft,
  scheduled: ui.badgeScheduled,
}

function fmt(date: string | null): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function BlogListPage() {
  const supabase = await createSupabaseServerClient()
  const [, { data }, stats] = await Promise.all([
    requireAdmin(),
    supabase
      .from('posts')
      .select('id, title, slug, status, published_at, updated_at, tags')
      .order('updated_at', { ascending: false }),
    getBlogStatsBySlug(),
  ])
  const posts = (data || []) as Row[]
  const totalReads = Array.from(stats.values()).reduce((n, s) => n + s.views, 0)

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Blog</h1>
          <p className={ui.subtitle}>
            {posts.length} post{posts.length === 1 ? '' : 's'}
            {totalReads > 0 && ` · ${compact(totalReads)} read${totalReads === 1 ? '' : 's'} all-time`}
          </p>
        </div>
        <form action={createDraft}>
          <button type="submit" className={ui.btnPrimary}>New post</button>
        </form>
      </div>

      <div className={ui.card}>
        {posts.length === 0 ? (
          <div className={ui.empty}>
            <h3>No posts yet</h3>
            <p>Write your first post and publish it to the marketing site.</p>
            <form action={createDraft}>
              <button type="submit" className={ui.btnPrimary}>New post</button>
            </form>
          </div>
        ) : (
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Reads</th>
                <th style={{ textAlign: 'right' }}>Readers</th>
                <th style={{ textAlign: 'right' }}>Avg read</th>
                <th>Published</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => {
                const s = stats.get(p.slug)
                return (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/blog/${p.id}`} className={ui.rowLink}>
                        {p.title || 'Untitled post'}
                      </Link>
                    </td>
                    <td>
                      <span className={`${ui.badge} ${STATUS_CLASS[p.status]}`}>{p.status}</span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: s?.views ? 600 : 400 }}>
                      {s?.views ? compact(s.views) : '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>{s?.readers ? compact(s.readers) : '—'}</td>
                    <td style={{ textAlign: 'right' }}>{s?.views ? formatReadTime(s.avgReadMs) : '—'}</td>
                    <td>{fmt(p.published_at)}</td>
                    <td>{fmt(p.updated_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
