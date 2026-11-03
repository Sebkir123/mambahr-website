import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getCrmDashboard, getContactsByKind, formatMoney } from '@/lib/crm'
import DataNotice from '../_components/data-notice'
import Icon from '../_components/icon'
import ui from '../admin-ui.module.css'
import styles from '../crm/crm.module.css'
export const dynamic = 'force-dynamic'
function date(value: string) { return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
export default async function InvestorsOverview() {
  await requireAdmin()
  const [dash, { contacts, warnings }] = await Promise.all([getCrmDashboard(), getContactsByKind('investor')])
  const summary = dash.byKind.investor
  const open = contacts.filter((contact) => !['committed','passed'].includes(contact.stage))
  const followUps = open.filter((contact) => contact.next_step).sort((a, b) => (a.next_step_due ?? '9999').localeCompare(b.next_step_due ?? '9999')).slice(0, 8)
  const tasks = dash.upcomingTasks.filter((task) => task.contactKind === 'investor')
  return <>
    <div className={ui.header}><div><h1 className={ui.h1}>Investors</h1><p className={ui.subtitle}>Keep introductions, conversations, and commitments moving.</p></div><div className={ui.actions}><Link href="/admin/crm/new?kind=investor" className={ui.btnGhost}><Icon name="plus" size={14} />Add investor</Link><Link href="/admin/crm?kind=investor" className={ui.btnPrimary}>Open pipeline</Link></div></div>
    <DataNotice warnings={[...dash.warnings,...warnings]} />
    <div className={styles.stats}>{[{label:'Open conversations',value:summary.open,sub:`${summary.total} total contacts`},{label:'Open value',value:formatMoney(summary.openValue),sub:'total potential commitments'},{label:'Committed',value:formatMoney(summary.wonValue),sub:`${summary.won} investors`},{label:'Without an owner',value:open.filter((contact) => !contact.owner).length,sub:'open contacts to assign'}].map((metric) => <div key={metric.label} className={styles.stat}><span className={styles.statValue}>{metric.value}</span><span className={styles.statLabel}>{metric.label}</span><span className={styles.statSub}>{metric.sub}</span></div>)}</div>
    <div className={styles.detailGrid}>
      <section className={styles.panel}><div className={styles.panelHead}><h2 className={styles.panelTitle}>Pipeline by stage</h2><Link href="/admin/crm?kind=investor" className={ui.rowLink}>View board →</Link></div>{summary.total ? summary.byStage.map((stage) => <div className={styles.readRow} key={stage.key}><span className={styles.readKey}>{stage.label}</span><span className={styles.readVal}>{stage.count}{stage.value > 0 && <span className={styles.muted}> · {formatMoney(stage.value)}</span>}</span></div>) : <p className={styles.muted}>Add your first investor to start tracking the conversation.</p>}</section>
      <section className={styles.panel}><div className={styles.panelHead}><h2 className={styles.panelTitle}>Next steps</h2><span className={styles.statSub}>{followUps.length + tasks.length} follow-ups</span></div>{!followUps.length && !tasks.length ? <p className={styles.muted}>No follow-ups waiting. Add a next step or task to an investor to keep it in view.</p> : <ul className={styles.tasks}>{followUps.map((contact) => <li key={contact.id} className={styles.task}><span className={styles.taskTitle}><Link href={`/admin/crm/${contact.id}`} className={ui.rowLink}>{contact.name}</Link><span className={styles.muted}> · {contact.next_step}</span></span><span className={styles.taskDue}>{contact.next_step_due ? date(contact.next_step_due) : 'No date'}</span></li>)}{tasks.map((task) => <li key={task.id} className={styles.task}><span className={styles.taskTitle}>{task.title} · <Link href={`/admin/crm/${task.contact_id}`} className={ui.rowLink}>{task.contactName}</Link></span><span className={styles.taskDue}>{task.due_date ? date(task.due_date) : 'No date'}</span></li>)}</ul>}</section>
    </div>
  </>
}
