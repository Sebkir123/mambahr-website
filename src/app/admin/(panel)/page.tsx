import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getOverview, type Lead } from '@/lib/admin-analytics'
import { getCrmDashboard, formatMoney } from '@/lib/crm'
import { createDraft } from './blog/actions'
import Icon from './_components/icon'
import DataNotice from './_components/data-notice'
import ui from './admin-ui.module.css'
import styles from './overview.module.css'

export const dynamic = 'force-dynamic'
const SOURCE_LABEL: Record<Lead['source'], string> = { waitlist: 'Early access', demo: 'Demo request', magnet: 'Resource', partner: 'Partner' }
function date(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
function Sparkline({ data }: { data: { day: string; count: number }[] }) {
  if (!data.some((point) => point.count > 0)) return <span className={styles.quiet}>No new leads in the last 14 days</span>
  const max = Math.max(1, ...data.map((point) => point.count))
  const points = data.map((point, index) => `${index / Math.max(1, data.length - 1) * 220},${30 - point.count / max * 26}`).join(' ')
  return <svg className={styles.spark} viewBox="0 0 220 34" role="img" aria-label={`New leads in the last 14 days: ${data.reduce((sum, point) => sum + point.count, 0)}`}><polyline points={points} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
export default async function AdminOverview() {
  await requireAdmin()
  const [overview, crm] = await Promise.all([getOverview(), getCrmDashboard()])
  const o = overview
  return <>
    <div className={ui.header}><div><p className={styles.eyebrow}>Your workspace</p><h1 className={ui.h1}>Overview</h1><p className={ui.subtitle}>A clear view of your relationships, website, and content.</p></div><div className={ui.actions}><Link href="/admin/leads" className={ui.btnGhost}>View leads</Link><form action={createDraft}><button type="submit" className={ui.btnPrimary}><Icon name="plus" size={15} />Write a post</button></form></div></div>
    <DataNotice warnings={[...o.warnings, ...crm.warnings]} />
    <div className={styles.stats}>
      <div className={styles.stat}><span className={styles.statLabel}>Incoming leads <Icon name="inbox" size={15} /></span><span className={styles.statValue}>{o.leads.total.toLocaleString()}</span><span className={styles.statSub}>{o.leads.last7d} new this week</span></div>
      <div className={styles.stat}><span className={styles.statLabel}>Last 30 days <Icon name="chart" size={15} /></span><span className={styles.statValue}>{o.leads.last30d.toLocaleString()}</span><Sparkline data={o.trend} /></div>
      <div className={styles.stat}><span className={styles.statLabel}>Blog reads <Icon name="book" size={15} /></span><span className={styles.statValue}>{o.views.total.toLocaleString()}</span><span className={styles.statSub}>{o.views.last7d} reads this week · bots excluded</span></div>
      <div className={styles.stat}><span className={styles.statLabel}>Published posts <Icon name="file" size={15} /></span><span className={styles.statValue}>{o.posts.published}</span><span className={styles.statSub}>{o.posts.draft} drafts · {o.posts.scheduled} scheduled</span></div>
    </div>
    <div className={styles.shortcuts}>
      <Link href="/admin/customers"><Icon name="briefcase" /><span><strong>Customers</strong><small>{crm.byKind.customer.open} open · {formatMoney(crm.byKind.customer.openValue)} pipeline</small></span><Icon name="chevron" size={14} /></Link>
      <Link href="/admin/investors"><Icon name="people" /><span><strong>Investors</strong><small>{crm.byKind.investor.open} open · {formatMoney(crm.byKind.investor.wonValue)} committed</small></span><Icon name="chevron" size={14} /></Link>
      <Link href="/admin/blog"><Icon name="file" /><span><strong>Content</strong><small>{o.posts.draft} drafts · {o.posts.scheduled} scheduled</small></span><Icon name="chevron" size={14} /></Link>
    </div>
    <section className={styles.attention} aria-label="Needs attention">
      <div><Icon name="check" size={17} /><strong>Needs attention</strong><span>Keep the next step moving</span></div>
      <Link href="/admin/crm/contacts?attention=overdue"><strong>{crm.attention.overdue}</strong> overdue next steps <Icon name="chevron" size={12} /></Link>
      <Link href="/admin/crm/contacts?attention=unassigned"><strong>{crm.attention.unassigned}</strong> need an owner <Icon name="chevron" size={12} /></Link>
      <Link href="/admin/crm/contacts?attention=next-step"><strong>{crm.attention.missingNextStep}</strong> missing a next step <Icon name="chevron" size={12} /></Link>
      <Link href="/admin/blog?status=draft"><strong>{o.posts.draft}</strong> drafts to continue <Icon name="chevron" size={12} /></Link>
    </section>
    <div className={styles.cols}>
      <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Recent leads</h2><p className={ui.cardHint}>New people interested in MambaHR</p></div><Link href="/admin/leads" className={styles.cardLink}>View all <Icon name="chevron" size={13} /></Link></div>
        {o.recent.length === 0 ? <div className={ui.empty}><span className={ui.emptyIcon}><Icon name="inbox" size={21} /></span><h3>You’re ready for new leads</h3><p>Early access requests, referrals, and resource signups will appear here.</p></div> : <div className={ui.tableWrap}><table className={`${ui.table} ${styles.leadsTable}`}><thead><tr><th>Contact</th><th>Source</th><th>Received</th></tr></thead><tbody>{o.recent.map((lead, index) => <tr key={`${lead.source}-${lead.email}-${index}`}><td><a className={ui.rowLink} href={`mailto:${lead.email}`}>{lead.name || lead.email}</a><div className={styles.secondary}>{lead.company || (lead.name ? lead.email : 'Company not provided')}</div></td><td><span className={styles.source}>{SOURCE_LABEL[lead.source]}</span></td><td className={styles.when}>{date(lead.created_at)}</td></tr>)}</tbody></table></div>}
      </section>
      <div className={styles.right}>
        <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Follow-ups</h2><p className={ui.cardHint}>{crm.openTaskCount} open {crm.openTaskCount === 1 ? 'task' : 'tasks'} across your contacts</p></div><Icon name="check" size={16} /></div>{crm.upcomingTasks.length ? <ul className={styles.tasks}>{crm.upcomingTasks.slice(0, 4).map((task) => <li key={task.id}><Link href={`/admin/crm/${task.contact_id}`}><strong>{task.title}</strong><span>{task.contactName}</span></Link><time dateTime={task.due_date ?? undefined}>{task.due_date ? date(task.due_date) : 'No date'}</time></li>)}</ul> : <div className={styles.smallEmpty}><Icon name="check" size={18} /><div><strong>No follow-ups waiting</strong><p>Add a task from any contact to keep the next step in view.</p></div></div>}</section>
        <section className={ui.card}><div className={ui.cardHeader}><div><h2 className={ui.cardTitle}>Most-read posts</h2><p className={ui.cardHint}>All-time reads · the same metric as Blog</p></div><Link href="/admin/blog" className={styles.cardLink}>Blog <Icon name="chevron" size={13} /></Link></div>{o.views.top.length ? <ol className={styles.posts}>{o.views.top.map((post, index) => <li key={post.slug}><span className={styles.rank}>{index + 1}</span><a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">{post.title}</a><span className={styles.reads}>{post.views.toLocaleString()}</span></li>)}</ol> : <div className={styles.smallEmpty}><Icon name="book" /><div><strong>Your next read starts here</strong><p>Published posts appear here once people start reading.</p></div></div>}</section>
      </div>
    </div>
  </>
}
