import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getCrmDashboard, getContactsByKind, formatMoney, stageLabel } from '@/lib/crm'
import { getOverview } from '@/lib/admin-analytics'
import { getFieldGuideAnalytics } from '@/lib/admin-field-guides'
import ui from '../admin-ui.module.css'
import styles from '../crm/crm.module.css'

export const dynamic = 'force-dynamic'

function when(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  )
}

export default async function CustomersOverview() {
  const [, dash, { contacts }, overview, guides] = await Promise.all([
    requireAdmin(),
    getCrmDashboard(),
    getContactsByKind('customer'),
    getOverview(),
    getFieldGuideAnalytics(),
  ])

  const cust = dash.byKind.customer

  // Top-of-funnel sources feeding the customer pipeline.
  const sources = [
    { label: 'Waitlist', value: overview.leads.waitlist, href: '/admin/leads' },
    { label: 'Demo requests', value: overview.leads.demo, href: '/admin/leads' },
    { label: 'Resource downloads', value: overview.leads.magnet, href: '/admin/leads' },
    { label: 'Field guides', value: guides.totals.requests, href: '/admin/field-guides' },
  ]
  const totalLeads = sources.reduce((s, x) => s + x.value, 0)

  const followUps = contacts
    .filter((c) => c.next_step && c.stage !== 'won' && c.stage !== 'lost')
    .sort((a, b) => {
      const ad = a.next_step_due ? new Date(a.next_step_due).getTime() : Infinity
      const bd = b.next_step_due ? new Date(b.next_step_due).getTime() : Infinity
      return ad - bd
    })
    .slice(0, 8)

  const customerTasks = dash.upcomingTasks.filter((t) => t.contactKind === 'customer')

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Customers</h1>
          <p className={ui.subtitle}>Sales pipeline, lead sources, and who to follow up with</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/leads" className={ui.btnGhost}>Leads</Link>
          <Link href="/admin/crm?kind=customer" className={ui.btnPrimary}>Open pipeline →</Link>
        </div>
      </div>

      <div className={styles.stats}>
        <Stat label="Open" value={cust.open} sub={`${cust.total} total`} />
        <Stat label="Open value" value={formatMoney(cust.openValue)} sub="weighted pipeline" />
        <Stat label="Won" value={cust.won} sub={formatMoney(cust.wonValue)} />
        <Stat label="Win rate" value={`${cust.winRatePct}%`} sub={`${cust.won} of ${cust.won + cust.lost} closed`} />
        <Stat label="New leads" value={overview.leads.last7d} sub="last 7 days" />
      </div>

      <div className={styles.detailGrid}>
        {/* Pipeline by stage */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Pipeline by stage</h2>
            <Link href="/admin/crm?kind=customer" className={styles.statSub} style={{ textDecoration: 'none' }}>View board →</Link>
          </div>
          {cust.total === 0 ? (
            <p className={styles.muted}>
              No customers yet. <Link href="/admin/crm/new?kind=customer" className={ui.rowLink}>Add one</Link> or import your waitlist, demo &amp; field-guide signups from the pipeline.
            </p>
          ) : (
            <div>
              {cust.byStage.map((st) => (
                <div key={st.key} className={styles.readRow}>
                  <span className={styles.readKey}>{stageLabel('customer', st.key)}</span>
                  <span className={styles.readVal}>
                    {st.count}
                    {st.value > 0 && <span className={styles.muted}> · {formatMoney(st.value)}</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Lead sources */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Lead sources</h2>
            <span className={styles.statSub}>{totalLeads.toLocaleString()} captured</span>
          </div>
          {sources.map((s) => (
            <div key={s.label} className={styles.readRow}>
              <span className={styles.readKey}>
                <Link href={s.href} className={ui.rowLink}>{s.label}</Link>
              </span>
              <span className={styles.readVal}>{s.value.toLocaleString()}</span>
            </div>
          ))}
          <p className={styles.statSub} style={{ marginTop: 10 }}>
            <Link href="/admin/crm?kind=customer" className={ui.rowLink}>Import leads</Link> on the pipeline to pull these in as contacts.
          </p>
        </section>
      </div>

      {/* Follow-ups */}
      <section className={styles.panel} style={{ marginTop: 18 }}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Needs follow-up</h2>
          <span className={styles.statSub}>{followUps.length + customerTasks.length} items</span>
        </div>
        {followUps.length === 0 && customerTasks.length === 0 ? (
          <p className={styles.muted}>Nothing queued. Set a next step on a customer to see it here.</p>
        ) : (
          <ul className={styles.tasks}>
            {followUps.map((c) => (
              <li key={c.id} className={styles.task}>
                <span className={styles.taskTitle}>
                  <Link href={`/admin/crm/${c.id}`} className={ui.rowLink}>{c.name}</Link>
                  {c.company ? <span className={styles.muted}> · {c.company}</span> : ''}
                  <span className={styles.muted}> — {c.next_step}</span>
                  <span className={`${styles.pill} ${styles.pillTag}`} style={{ marginLeft: 8 }}>{stageLabel('customer', c.stage)}</span>
                </span>
                <span className={styles.taskDue}>{c.next_step_due ? when(c.next_step_due) : 'no date'}</span>
              </li>
            ))}
            {customerTasks.map((t) => (
              <li key={t.id} className={styles.task}>
                <span className={styles.taskTitle}>
                  ☐ {t.title} · <Link href={`/admin/crm/${t.contact_id}`} className={ui.rowLink}>{t.contactName}</Link>
                </span>
                <span className={styles.taskDue}>{t.due_date ? when(t.due_date) : 'no date'}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
