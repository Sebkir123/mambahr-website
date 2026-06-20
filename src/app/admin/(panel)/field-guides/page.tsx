import { requireAdmin } from '@/lib/auth'
import { getFieldGuideAnalytics, GUIDES } from '@/lib/admin-field-guides'
import { FieldGuideManager } from './manager'
import ui from '../admin-ui.module.css'
import styles from '../deck/deck.module.css'

export const dynamic = 'force-dynamic'

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.total}>
      <span className={styles.totalValue}>{value}</span>
      <span className={styles.totalLabel}>{label}</span>
      {sub && <span className={styles.totalSub}>{sub}</span>}
    </div>
  )
}

export default async function FieldGuidesPage() {
  const [, a] = await Promise.all([requireAdmin(), getFieldGuideAnalytics()])
  const guides = Object.entries(GUIDES).map(([slug, g]) => ({ slug, title: g.title }))

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Field guides</h1>
          <p className={ui.subtitle}>Create tracked share links + see who actually opened each guide</p>
        </div>
      </div>

      {a.warnings.length > 0 && <div className={styles.notice}>{a.warnings[0]}</div>}

      <div className={styles.totals}>
        <Stat label="Leads" value={a.totals.requests} sub="links + form captures" />
        <Stat label="Opened" value={a.totals.opened} sub="opened the link" />
        <Stat label="Open rate" value={`${a.totals.openRatePct}%`} sub="of leads" />
        <Stat label="This week" value={a.totals.last7d} sub="new leads" />
        <Stat label="Total opens" value={a.totals.opens} sub="across all leads" />
      </div>

      <FieldGuideManager rows={a.rows} guides={guides} />
    </>
  )
}
