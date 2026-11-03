import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getOverview } from '@/lib/admin-analytics'
import { createDraft } from './blog/actions'
import Icon from './_components/icon'
import DataNotice from './_components/data-notice'
import SubmitButton from './_components/submit-button'
import ui from './admin-ui.module.css'
import styles from './overview.module.css'

export const dynamic = 'force-dynamic'
function date(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
function Sparkline({ data }: { data: number[] }) {
  if (!data.some((count) => count > 0)) return <span className={styles.statSub}>No visits in the last 7 days</span>
  const max = Math.max(1, ...data)
  const points = data.map((count, index) => `${index / Math.max(1, data.length - 1) * 220},${30 - count / max * 26}`).join(' ')
  return <svg className={styles.spark} viewBox="0 0 220 34" role="img" aria-label="Website visits over the last seven days"><polyline points={points} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
export default async function AdminOverview() {
  await requireAdmin()
  const o = await getOverview()
  return <>
    <div className={ui.header}><div><p className={styles.eyebrow}>Your workspace</p><h1 className={ui.h1}>Overview</h1><p className={ui.subtitle}>Your website and publishing, in one place.</p></div><div className={ui.actions}><Link href="/admin/site?range=7d" className={ui.btnGhost}>Website analytics</Link><form action={createDraft}><SubmitButton pendingLabel="Creating draft…"><Icon name="plus" size={15} />Write a post</SubmitButton></form></div></div>
    <DataNotice warnings={o.warnings} />
    <div className={styles.stats}>
      <Link href="/admin/site?range=7d&view=real" className={styles.stat}><span className={styles.statLabel}>Website visits <Icon name="chart" size={15} /></span><span className={styles.statValue}>{o.website.visits.toLocaleString()}</span><span className={styles.statSub}>Last 7 days · bots excluded</span><Sparkline data={o.website.spark} /></Link>
      <Link href="/admin/blog" className={styles.stat}><span className={styles.statLabel}>Blog reads <Icon name="book" size={15} /></span><span className={styles.statValue}>{o.reads.total.toLocaleString()}</span><span className={styles.statSub}>{o.reads.last7d} this week · all-time total</span></Link>
      <Link href="/admin/blog?status=published" className={styles.stat}><span className={styles.statLabel}>Published posts <Icon name="file" size={15} /></span><span className={styles.statValue}>{o.posts.published}</span><span className={styles.statSub}>{o.posts.draft} drafts · {o.posts.scheduled} scheduled</span></Link>
      <Link href="/admin/resources" className={styles.stat}><span className={styles.statLabel}>Published resources <Icon name="book" size={15} /></span><span className={styles.statValue}>{o.resources.published}</span><span className={styles.statSub}>{o.resources.draft} drafts in your library</span></Link>
    </div>
    <section className={styles.queue} aria-label="Publishing queue">
      <div><Icon name="check" size={17} /><strong>Publishing queue</strong><span>Pick up where you left off</span></div>
      <Link href="/admin/blog?status=draft"><strong>{o.posts.draft}</strong> drafts to continue <Icon name="chevron" size={12} /></Link>
      <Link href="/admin/blog?status=scheduled"><strong>{o.posts.scheduled}</strong> scheduled posts <Icon name="chevron" size={12} /></Link>
      <Link href="/admin/seo"><strong>{o.missingDescriptions}</strong> published posts need a description <Icon name="chevron" size={12} /></Link>
    </section>
    <div className={styles.cols}>
      <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Recent updates</h2><p className={ui.cardHint}>Your latest work across the blog</p></div><Link href="/admin/blog" className={styles.cardLink}>All posts <Icon name="chevron" size={13} /></Link></div>
        {o.posts.recent.length ? <ul className={styles.articleList}>{o.posts.recent.map((post) => <li key={post.id}><Link href={`/admin/blog/${post.id}`}><span><strong>{post.title || 'Untitled post'}</strong><small>Edited {date(post.updated_at)}</small></span><span className={`${ui.badge} ${post.status === 'published' ? ui.badgePublished : post.status === 'scheduled' ? ui.badgeScheduled : ui.badgeDraft}`}>{post.status}</span><Icon name="chevron" size={14} /></Link></li>)}</ul> : <div className={ui.empty}><span className={ui.emptyIcon}><Icon name="file" size={21} /></span><h3>Start with a story</h3><p>Create a draft and publish when it’s ready.</p><form action={createDraft}><SubmitButton pendingLabel="Creating draft…">Write a post</SubmitButton></form></div>}
      </section>
      <div className={styles.right}>
        <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Continue a draft</h2><p className={ui.cardHint}>Saved work, ready when you are</p></div><Icon name="file" size={16} /></div>{o.posts.drafts.length ? <ul className={styles.articleList}>{o.posts.drafts.map((post) => <li key={post.id}><Link href={`/admin/blog/${post.id}`}><span><strong>{post.title || 'Untitled post'}</strong><small>Edited {date(post.updated_at)}</small></span><Icon name="chevron" size={14} /></Link></li>)}</ul> : <div className={styles.smallEmpty}><Icon name="check" size={18} /><div><strong>No unfinished drafts</strong><p>Your next idea starts with Write a post.</p></div></div>}</section>
        <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Most-read posts</h2><p className={ui.cardHint}>All-time reads · bots excluded</p></div><Link href="/admin/blog" className={styles.cardLink}>Blog <Icon name="chevron" size={13} /></Link></div>{o.reads.top.length ? <ol className={styles.topPosts}>{o.reads.top.map((post, index) => <li key={post.slug}><span className={styles.rank}>{index + 1}</span><a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">{post.title}</a><span className={styles.reads}>{post.views.toLocaleString()}</span></li>)}</ol> : <div className={styles.smallEmpty}><Icon name="book" /><div><strong>Your next read starts here</strong><p>Published posts appear here once people start reading.</p></div></div>}</section>
      </div>
    </div>
  </>
}
