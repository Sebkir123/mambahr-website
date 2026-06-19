import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getCrmDashboard, getContactsByKind, STAGES, formatMoney, type ContactKind } from '@/lib/crm'
import { ingestLeads } from './actions'
import CrmBoard from './crm-board'
import { ImportButton } from './import-button'
import ui from '../admin-ui.module.css'
import styles from './crm.module.css'

export const dynamic = 'force-dynamic'

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </div>
  )
}

export default async function CrmPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind: kindParam } = await searchParams
  const kind: ContactKind = kindParam === 'investor' ? 'investor' : 'customer'

  const [, dash, { contacts, warnings }] = await Promise.all([
    requireAdmin(),
    getCrmDashboard(),
    getContactsByKind(kind),
  ])

  const k = dash.byKind[kind]
  const isInvestor = kind === 'investor'

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>CRM</h1>
          <p className={ui.subtitle}>Pipeline for customers and investors · live &amp; collaborative</p>
        </div>
        <Link href={`/admin/crm/new?kind=${kind}`} className={ui.btnPrimary}>+ Add {kind}</Link>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          <Link href="/admin/crm?kind=customer" className={kind === 'customer' ? styles.tabActive : styles.tab}>
            Customers
          </Link>
          <Link href="/admin/crm?kind=investor" className={kind === 'investor' ? styles.tabActive : styles.tab}>
            Investors
          </Link>
        </div>
        <div className={styles.spacer} />
        <Link href="/admin/crm/contacts" className={ui.btnGhost}>List view</Link>
        <ImportButton action={ingestLeads} />
      </div>

      {warnings.length > 0 && <div className={styles.notice}>{warnings[0]}</div>}

      <div className={styles.stats}>
        <Stat label="Open" value={k.open} sub={`${k.total} total`} />
        <Stat label={isInvestor ? 'Pipeline (open)' : 'Open value'} value={formatMoney(k.openValue)} sub="weighted pipeline" />
        <Stat label={isInvestor ? 'Committed' : 'Won'} value={k.won} sub={formatMoney(k.wonValue)} />
        <Stat label="Win rate" value={`${k.winRatePct}%`} sub={`${k.won} of ${k.won + k.lost} closed`} />
        <Stat label="Open tasks" value={dash.upcomingTasks.length} sub="across all contacts" />
      </div>

      <CrmBoard kind={kind} stages={STAGES[kind]} contacts={contacts} />

      {dash.upcomingTasks.length > 0 && (
        <section className={styles.panel} style={{ marginTop: 18 }}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Upcoming follow-ups</h2>
          </div>
          <ul className={styles.tasks}>
            {dash.upcomingTasks.map((t) => (
              <li key={t.id} className={styles.task}>
                <span className={styles.taskTitle}>
                  {t.title} · <Link href={`/admin/crm/${t.contact_id}`} className={ui.rowLink}>{t.contactName}</Link>
                </span>
                <span className={styles.taskDue}>{t.due_date ? new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'no date'}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
