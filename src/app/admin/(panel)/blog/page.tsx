import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { PostStatus } from '@/lib/blog'
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
  const [, { data }] = await Promise.all([
    requireAdmin(),
    supabase
      .from('posts')
      .select('id, title, slug, status, published_at, updated_at, tags')
      .order('updated_at', { ascending: false }),
  ])
  const posts = (data || []) as Row[]

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Blog</h1>
          <p className={ui.subtitle}>{posts.length} post{posts.length === 1 ? '' : 's'}</p>
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
                <th>Tags</th>
                <th>Published</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/blog/${p.id}`} className={ui.rowLink}>
                      {p.title || 'Untitled post'}
                    </Link>
                  </td>
                  <td>
                    <span className={`${ui.badge} ${STATUS_CLASS[p.status]}`}>{p.status}</span>
                  </td>
                  <td>{p.tags?.length ? p.tags.join(', ') : '—'}</td>
                  <td>{fmt(p.published_at)}</td>
                  <td>{fmt(p.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
