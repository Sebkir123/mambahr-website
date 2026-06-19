import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getFieldGuideLead } from '@/lib/admin-field-guides'
import ui from '../../admin-ui.module.css'
import styles from '../../deck/deck.module.css'

export const dynamic = 'force-dynamic'

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
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

export default async function FieldGuideLeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const lead = await getFieldGuideLead(id)
  if (!lead) notFound()

  const first = lead.opens.length ? lead.opens[lead.opens.length - 1] : null

  return (
    <>
      <div className={ui.header}>
        <div>
          <Link href="/admin/field-guides" className={styles.backLink}>
            ← Field guides
          </Link>
          <h1 className={ui.h1}>{lead.email}</h1>
          <p className={ui.subtitle}>
            {[lead.company, lead.guideTitle].filter(Boolean).join(' · ')}
          </p>
        </div>
        <span
          className={`${styles.scoreLg} ${lead.opens.length ? styles.score_high : styles.score_low}`}
          title="Total opens"
        >
          {lead.opens.length}
        </span>
      </div>

      <div className={styles.totals}>
        <Stat label="Requested" value={when(lead.requestedAt)} sub="email captured" />
        <Stat label="Delivered" value={lead.sentAt ? when(lead.sentAt) : 'Pending'} sub="link emailed" />
        <Stat label="Opens" value={lead.opens.length} sub="times the link was opened" />
        <Stat
          label="First open"
          value={first ? when(first.viewedAt) : 'Never'}
          sub={first?.network ?? 'no opens yet'}
        />
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Open timeline</h2>
          <span className={styles.cardHint}>Every open of the gated guide · newest first · firm resolved from network</span>
        </div>
        {lead.opens.length === 0 ? (
          <p className={styles.empty}>
            Emailed, but not opened yet. The link is unguessable and noindexed, so opens only come from the recipient.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>When</th>
                  <th>Network</th>
                  <th>Location</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                {lead.opens.map((o, i) => (
                  <tr key={i}>
                    <td>{when(o.viewedAt)}</td>
                    <td>{o.network ?? <span className={styles.muted}>—</span>}</td>
                    <td>{o.location}</td>
                    <td>{[o.device, o.browser, o.os].filter(Boolean).join(' · ') || <span className={styles.muted}>—</span>}</td>
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
