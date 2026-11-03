import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { safeAdminNext } from '@/lib/admin-auth-redirect'
import { requireAdmin } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sanitizePostHtml, type Post } from '@/lib/blog'
import article from '@/app/blog/[slug]/post.module.css'
import ui from '../../../admin-ui.module.css'
import styles from './preview.module.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Saved preview · MambaHR Admin', robots: { index: false, follow: false } }
export default async function Preview({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ returnTo?: string | string[] }> }) {
  await requireAdmin()
  const { id } = await params
  const { returnTo: destination } = await searchParams
  const returnTo = safeAdminNext(typeof destination === 'string' ? destination : '/admin/blog')
  const db = await createSupabaseServerClient()
  const { data, error } = await db.from('posts').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error('The saved preview could not be loaded. Please try again.')
  if (!data) notFound()
  const post = data as Post
  return <>
    <div className={ui.header}><div><h1 className={ui.h1}>Saved preview</h1><p className={ui.subtitle}>Admin only · {post.status} · saved {new Date(post.updated_at).toLocaleString('en-US')}</p></div><Link className={ui.btnGhost} href={`/admin/blog/${id}?returnTo=${encodeURIComponent(returnTo)}`}>Back to editor</Link></div>
    <div className={styles.canvas}><div className={`${article.page} ${styles.page}`}>
      <header className={article.header}><h2 className={article.title}>{post.title || 'Untitled post'}</h2><div className={article.byline}><span>{post.author_name || 'MambaHR'}</span><span>·</span><span>{post.reading_time} min read</span></div><div className={article.tagRow}>{post.tags?.map(tag => <span key={tag} className={article.tag}>{tag}</span>)}</div></header>
      {post.cover_image_url && <div className={`${article.cover} ${styles.cover}`}><Image src={post.cover_image_url} alt="" className={article.coverImg} width={880} height={495} priority unoptimized /></div>}
      <article className={article.prose} dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.body_html) }} />
      {!post.body_html && <p className={ui.subtitle}>Your article content will appear here once you start writing.</p>}
    </div></div>
  </>
}
