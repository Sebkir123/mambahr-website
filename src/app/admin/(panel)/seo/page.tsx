import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getSeoOverview } from '@/lib/admin-seo'
import ui from '../admin-ui.module.css'
import DataNotice from '../_components/data-notice'
import styles from './seo.module.css'
import SeoTable from './seo-table'

export const dynamic = 'force-dynamic'

const SITE = 'https://www.mambahr.com'

const SITEMAPS = [
  { label: 'Sitemap', href: `${SITE}/sitemap.xml`, note: 'All static + published blog URLs' },
  { label: 'Robots', href: `${SITE}/robots.txt`, note: 'Crawl rules, AI crawlers welcomed, archives blocked' },
  { label: 'RSS feed', href: `${SITE}/blog/rss.xml`, note: 'Latest 30 published posts' },
  { label: 'Blog index', href: `${SITE}/blog`, note: 'Public blog landing page' },
]

export default async function SeoPage() {
  await requireAdmin()
  const o = await getSeoOverview()

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>SEO</h1>
          <p className={ui.subtitle}>Find and fix the details that help people discover your content.</p>
        </div>
        <Link href="/admin/blog" className={ui.btnGhost}>Manage posts</Link>
      </div>

      <DataNotice warnings={o.warnings} />

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

      <SeoTable posts={o.posts} />
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
