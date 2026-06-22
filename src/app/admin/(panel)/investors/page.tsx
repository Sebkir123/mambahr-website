import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getCrmDashboard, getContactsByKind, formatMoney, stageLabel } from '@/lib/crm'
import { getDeckAnalytics } from '@/lib/admin-deck'
import ui from '../admin-ui.module.css'
import styles from '../crm/crm.module.css'

export const dynamic = 'force-dynamic'

function dur(ms: number): string {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m`
}
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

export default async function InvestorsOverview() {
  const [, dash, { contacts }, deck] = await Promise.all([
    requireAdmin(),
    getCrmDashboard(),
    getContactsByKind('investor'),
    getDeckAnalytics(),
  ])

  const inv = dash.byKind.investor
  const diligence = inv.byStage.find((s) => s.key === 'diligence')?.count ?? 0

  // Deck engagement leaderboard, recipients who actually opened, busiest first.
  const leaderboard = [...deck.links]
    .filter((l) => l.opens > 0)
    .sort((a, b) => b.opens - a.opens || b.totalMs - a.totalMs)
    .slice(0, 6)

  // Who to follow up with: open investors with a next step, soonest due first.
  const followUps = contacts
    .filter((c) => c.next_step && c.stage !== 'committed' && c.stage !== 'passed')
    .sort((a, b) => {
      const ad = a.next_step_due ? new Date(a.next_step_due).getTime() : Infinity
      const bd = b.next_step_due ? new Date(b.next_step_due).getTime() : Infinity
      return ad - bd
    })
    .slice(0, 8)

  const investorTasks = dash.upcomingTasks.filter((t) => t.contactKind === 'investor')

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Investors</h1>
          <p className={ui.subtitle}>Raise progress, deck engagement, and who to follow up with</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/deck" className={ui.btnGhost}>Deck analytics</Link>
          <Link href="/admin/crm?kind=investor" className={ui.btnPrimary}>Open pipeline →</Link>
        </div>
      </div>

      <div className={styles.stats}>
        <Stat label="Committed" value={inv.won} sub={formatMoney(inv.wonValue)} />
        <Stat label="In diligence" value={diligence} sub="reviewing" />
        <Stat label="Open pipeline" value={formatMoney(inv.openValue)} sub={`${inv.open} live`} />
        <Stat label="Deck opens" value={deck.totals.opens.toLocaleString()} sub={`${deck.totals.recipients} reached`} />
        <Stat label="Pass rate" value={`${100 - inv.winRatePct}%`} sub={`${inv.lost} of ${inv.won + inv.lost} closed`} />
      </div>

      <div className={styles.detailGrid}>
        {/* Pipeline by stage */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Pipeline by stage</h2>
            <Link href="/admin/crm?kind=investor" className={styles.statSub} style={{ textDecoration: 'none' }}>View board →</Link>
          </div>
          {inv.total === 0 ? (
            <p className={styles.muted}>
              No investors yet. <Link href="/admin/crm/new?kind=investor" className={ui.rowLink}>Add one</Link> or import your deck recipients from the pipeline.
            </p>
          ) : (
            <div>
              {inv.byStage.map((st) => (
                <div key={st.key} className={styles.readRow}>
                  <span className={styles.readKey}>{st.label}</span>
                  <span className={styles.readVal}>
                    {st.count}
                    {st.value > 0 && <span className={styles.muted}> · {formatMoney(st.value)}</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Deck engagement leaderboard */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>Deck engagement</h2>
            <Link href="/admin/deck" className={styles.statSub} style={{ textDecoration: 'none' }}>Full analytics →</Link>
          </div>
          {leaderboard.length === 0 ? (
            <p className={styles.muted}>No deck opens yet. Send a tracked link from Deck analytics.</p>
          ) : (
            <ul className={styles.timeline}>
              {leaderboard.map((l) => (
                <li key={l.id} className={styles.tlItem}>
                  <span className={styles.tlIcon}>{(l.recipient_name || '?').charAt(0)}</span>
                  <div className={styles.tlBody}>
                    <div className={styles.tlText}>
                      {l.recipient_name || 'Anonymous'}
                      {l.recipient_org ? <span className={styles.muted}> · {l.recipient_org}</span> : ''}
                      {l.forwarded && <span className={`${styles.pill} ${styles.pillTag}`} style={{ marginLeft: 8 }}>forwarded</span>}
                    </div>
                    <div className={styles.tlMeta}>
                      {l.opens} open{l.opens === 1 ? '' : 's'} · {dur(l.totalMs)} read · last {when(l.lastViewedAt)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Follow-ups */}
      <section className={styles.panel} style={{ marginTop: 18 }}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Needs follow-up</h2>
          <span className={styles.statSub}>{followUps.length + investorTasks.length} items</span>
        </div>
        {followUps.length === 0 && investorTasks.length === 0 ? (
          <p className={styles.muted}>Nothing queued. Set a next step on an investor to see it here.</p>
        ) : (
          <ul className={styles.tasks}>
            {followUps.map((c) => (
              <li key={c.id} className={styles.task}>
                <span className={styles.taskTitle}>
                  <Link href={`/admin/crm/${c.id}`} className={ui.rowLink}>{c.name}</Link>
                  {c.company ? <span className={styles.muted}> · {c.company}</span> : ''}
                  <span className={styles.muted}>, {c.next_step}</span>
                  <span className={`${styles.pill} ${styles.pillTag}`} style={{ marginLeft: 8 }}>{stageLabel('investor', c.stage)}</span>
                </span>
                <span className={styles.taskDue}>{c.next_step_due ? when(c.next_step_due) : 'no date'}</span>
              </li>
            ))}
            {investorTasks.map((t) => (
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
