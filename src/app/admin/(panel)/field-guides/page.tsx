import { requireAdmin } from '@/lib/auth'
import { getFieldGuideAnalytics } from '@/lib/admin-field-guides'
import ui from '../admin-ui.module.css'
import styles from '../deck/deck.module.css'

export const dynamic = 'force-dynamic'

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
function ago(iso: string | null): string {
  if (!iso) return '—'
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

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

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Field guides</h1>
          <p className={ui.subtitle}>Email-gated playbook requests + who actually opened them</p>
        </div>
      </div>

      {a.warnings.length > 0 && <div className={styles.notice}>{a.warnings[0]}</div>}

      <div className={styles.totals}>
        <Stat label="Requests" value={a.totals.requests} sub="emails captured" />
        <Stat label="Opened" value={a.totals.opened} sub="opened the link" />
        <Stat label="Open rate" value={`${a.totals.openRatePct}%`} sub="of requests" />
        <Stat label="This week" value={a.totals.last7d} sub="new requests" />
        <Stat label="Total opens" value={a.totals.opens} sub="across all leads" />
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Requests</h2>
          <span className={styles.cardHint}>{a.rows.length} captured · firm resolved from the opener&rsquo;s network</span>
        </div>
        {a.rows.length === 0 ? (
          <p className={styles.empty}>No requests yet. Share the field-guide form to start capturing leads.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Who</th>
                  <th>Guide</th>
                  <th>Requested</th>
                  <th>Opens</th>
                  <th>Last open</th>
                  <th>Network · Location</th>
                </tr>
              </thead>
              <tbody>
                {a.rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.email}</strong>
                      {r.company ? ` · ${r.company}` : ''}
                    </td>
                    <td>{r.guideTitle}</td>
                    <td>{when(r.requestedAt)}</td>
                    <td>
                      {r.opens > 0 ? (
                        <span className={`${styles.score} ${styles.score_high}`}>{r.opens}</span>
                      ) : (
                        <span className={styles.muted}>0</span>
                      )}
                    </td>
                    <td>{ago(r.lastOpenedAt)}</td>
                    <td>
                      {r.network ?? <span className={styles.muted}>—</span>}
                      {r.opens > 0 && <span className={styles.network}>{r.location}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
