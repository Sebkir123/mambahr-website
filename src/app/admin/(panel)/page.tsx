import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getOverview, type Lead } from '@/lib/admin-analytics'
import { getDeckSummary } from '@/lib/admin-deck'
import { getCrmDashboard, formatMoney } from '@/lib/crm'
import ui from './admin-ui.module.css'
import styles from './overview.module.css'

export const dynamic = 'force-dynamic'

const SOURCE_LABEL: Record<Lead['source'], string> = {
  waitlist: 'Waitlist',
  demo: 'Demo request',
  magnet: 'Resource',
}

function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

// Pure-SVG sparkline, no client JS. Points are the 14-day lead trend.
function Sparkline({ data }: { data: { day: string; count: number }[] }) {
  const w = 280
  const h = 56
  const max = Math.max(1, ...data.map((d) => d.count))
  const step = data.length > 1 ? w / (data.length - 1) : w
  const pts = data.map((d, i) => [i * step, h - (d.count / max) * (h - 6) - 3] as const)
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={styles.spark}>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path d={line} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default async function AdminOverview() {
  // Run the auth check concurrently with the data fetch so the getUser()
  // round-trip overlaps the queries instead of blocking them.
  const [admin, o, deck, crm] = await Promise.all([
    requireAdmin(),
    getOverview(),
    getDeckSummary(),
    getCrmDashboard(),
  ])

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Overview</h1>
          <p className={ui.subtitle}>Signed in as {admin.email}</p>
        </div>
        <Link href="/admin/blog" className={ui.btnPrimary}>Write a post</Link>
      </div>

      {o.warnings.length > 0 && (
        <div className={styles.notice}>{o.warnings[0]}</div>
      )}

      {/* Stat cards */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total leads</span>
          <span className={styles.statValue}>{o.leads.total.toLocaleString()}</span>
          <span className={styles.statSub}>{o.leads.last7d} in last 7 days</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Last 30 days</span>
          <span className={styles.statValue}>{o.leads.last30d.toLocaleString()}</span>
          <Sparkline data={o.trend} />
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Post views</span>
          <span className={styles.statValue}>{o.views.total.toLocaleString()}</span>
          <span className={styles.statSub}>{o.views.last7d} in last 7 days</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Published posts</span>
          <span className={styles.statValue}>{o.posts.published}</span>
          <span className={styles.statSub}>{o.posts.draft} draft · {o.posts.scheduled} scheduled</span>
        </div>
      </div>

      {/* Section pulse, a compact launcher into each area, no detail duplicated */}
      <div className={styles.sectionGrid}>
        <SectionTile
          title="Customers"
          href="/admin/customers"
          metrics={[
            { label: 'Open', value: crm.byKind.customer.open.toLocaleString() },
            { label: 'Pipeline', value: formatMoney(crm.byKind.customer.openValue) },
          ]}
        />
        <SectionTile
          title="Investors"
          href="/admin/investors"
          metrics={[
            { label: 'Open', value: crm.byKind.investor.open.toLocaleString() },
            { label: 'Committed', value: formatMoney(crm.byKind.investor.wonValue) },
          ]}
        />
        <SectionTile
          title="Deck"
          href="/admin/deck"
          metrics={[
            { label: 'Opens', value: deck.opens.toLocaleString() },
            { label: 'Reached', value: deck.recipients.toLocaleString() },
          ]}
        />
        <SectionTile
          title="Content"
          href="/admin/blog"
          metrics={[
            { label: 'Published', value: o.posts.published.toLocaleString() },
            { label: 'Views', value: o.views.total.toLocaleString() },
          ]}
        />
      </div>

      <div className={styles.cols}>
        {/* Recent leads */}
        <section className={ui.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Recent leads</h2>
            <Link href="/admin/leads" className={styles.cardLink}>View all →</Link>
          </div>
          {o.recent.length === 0 ? (
            <div className={ui.empty}><p>No leads captured yet.</p></div>
          ) : (
            <table className={ui.table}>
              <thead>
                <tr><th>Email</th><th>Company</th><th>Source</th><th>When</th></tr>
              </thead>
              <tbody>
                {o.recent.map((l, i) => (
                  <tr key={`${l.email}-${i}`}>
                    <td className={styles.email}>{l.email}</td>
                    <td>{l.company || '—'}</td>
                    <td><span className={styles.srcTag}>{SOURCE_LABEL[l.source]}</span></td>
                    <td className={styles.when}>{fmtDateTime(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Top posts */}
        <section className={ui.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Top posts</h2>
            <Link href="/admin/blog" className={styles.cardLink}>All posts →</Link>
          </div>
          {o.views.top.length === 0 ? (
            <div className={ui.empty}><p>No post views yet.</p></div>
          ) : (
            <ul className={styles.topList}>
              {o.views.top.map((p) => (
                <li key={p.slug} className={styles.topItem}>
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className={styles.topTitle}>{p.title}</a>
                  <span className={styles.topViews}>{p.views.toLocaleString()} views</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

function SectionTile({
  title,
  href,
  metrics,
}: {
  title: string
  href: string
  metrics: { label: string; value: string }[]
}) {
  return (
    <Link href={href} className={`${ui.card} ${styles.sectionTile}`}>
      <div className={styles.sectionTileHead}>
        <span className={styles.sectionTileTitle}>{title}</span>
        <span className={styles.sectionTileArrow} aria-hidden="true">→</span>
      </div>
      <div className={styles.sectionTileMetrics}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.deckMini}>
            <span className={styles.deckMiniValue}>{m.value}</span>
            <span className={styles.deckMiniLabel}>{m.label}</span>
          </div>
        ))}
      </div>
    </Link>
  )
}
