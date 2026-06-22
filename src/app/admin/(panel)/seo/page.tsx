import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getSeoOverview, type PostSeo } from '@/lib/admin-seo'
import ui from '../admin-ui.module.css'
import styles from './seo.module.css'

export const dynamic = 'force-dynamic'

const SITE = 'https://mambahr.com'

const SITEMAPS = [
  { label: 'Sitemap', href: `${SITE}/sitemap.xml`, note: 'All static + published blog URLs' },
  { label: 'Robots', href: `${SITE}/robots.txt`, note: 'Crawl rules, AI crawlers welcomed, archives blocked' },
  { label: 'RSS feed', href: `${SITE}/blog/rss.xml`, note: 'Latest 30 published posts' },
  { label: 'Blog index', href: `${SITE}/blog`, note: 'Public blog landing page' },
]

function scoreClass(score: number): string {
  if (score >= 85) return styles.scoreGood
  if (score >= 60) return styles.scoreOk
  return styles.scoreBad
}

export default async function SeoPage() {
  await requireAdmin()
  const o = await getSeoOverview()

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>SEO</h1>
          <p className={ui.subtitle}>Indexing surfaces and per-post on-page health</p>
        </div>
        <Link href="/admin/blog" className={ui.btnGhost}>Manage posts</Link>
      </div>

      {o.warnings.length > 0 && (
        <div className={styles.notice}>{o.warnings[0]}</div>
      )}

      {/* Indexing surfaces */}
      <div className={styles.surfaces}>
        {SITEMAPS.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className={styles.surface}>
            <div className={styles.surfaceHead}>
              <span className={styles.surfaceLabel}>{s.label}</span>
              <span className={styles.surfaceArrow}>↗</span>
            </div>
            <span className={styles.surfaceNote}>{s.note}</span>
            <span className={styles.surfaceUrl}>{s.href.replace('https://', '')}</span>
          </a>
        ))}
      </div>

      {/* Totals */}
      <div className={styles.totals}>
        <Totals label="Posts" value={o.totals.posts} />
        <Totals label="Published" value={o.totals.published} />
        <Totals label="Indexable" value={o.totals.indexable} sub="published, not noindex" />
        <Totals label="Noindex" value={o.totals.noindex} sub="hidden from search" />
        <Totals label="Avg score" value={`${o.totals.avgScore}`} sub="published posts" />
      </div>

      {/* Per-post health */}
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Per-post SEO health</h2>
          <span className={styles.cardHint}>Worst-scoring published posts first</span>
        </div>
        {o.posts.length === 0 ? (
          <div className={ui.empty}>
            <h3>No posts to score</h3>
            <p>Write your first post to see its SEO health.</p>
          </div>
        ) : (
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Status</th>
                <th>Score</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              {o.posts.map((p) => (
                <PostRow key={p.id} p={p} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

function Totals({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.total}>
      <span className={styles.totalValue}>{value}</span>
      <span className={styles.totalLabel}>{label}</span>
      {sub && <span className={styles.totalSub}>{sub}</span>}
    </div>
  )
}

const STATUS_CLASS: Record<PostSeo['status'], string> = {
  published: ui.badgePublished,
  draft: ui.badgeDraft,
  scheduled: ui.badgeScheduled,
}

function PostRow({ p }: { p: PostSeo }) {
  return (
    <tr>
      <td>
        <Link href={`/admin/blog/${p.id}`} className={styles.postTitle}>{p.title}</Link>
        <span className={styles.postSlug}>/blog/{p.slug}</span>
      </td>
      <td>
        <span className={`${ui.badge} ${STATUS_CLASS[p.status]}`}>{p.status}</span>
        {p.noindex && <span className={styles.noindexTag}>noindex</span>}
      </td>
      <td>
        <span className={`${styles.score} ${scoreClass(p.score)}`}>{p.score}</span>
      </td>
      <td className={styles.issues}>
        {p.issues.length === 0 ? (
          <span className={styles.allGood}>All set</span>
        ) : (
          <ul className={styles.issueList}>
            {p.issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  )
}
