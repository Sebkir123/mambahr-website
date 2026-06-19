import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getContact, STAGES, stageLabel, formatMoney, type ActivityKind } from '@/lib/crm'
import { ContactDetailClient } from './contact-detail-client'
import { ActivityComposer } from './activity-composer'
import { TaskPanel } from './task-panel'
import { RealtimeRefresh } from './realtime-refresh'
import { DeleteContact } from './delete-contact'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

export const dynamic = 'force-dynamic'

const ACTIVITY_ICON: Record<ActivityKind, string> = {
  note: '📝', call: '📞', email: '✉️', meeting: '🤝', stage_change: '↗', created: '✦', task: '☑',
}

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [admin, { id }] = await Promise.all([requireAdmin(), params])
  const detail = await getContact(id)
  if (!detail) notFound()
  const { contact, activities, tasks } = detail
  const closed = contact.stage === 'won' || contact.stage === 'committed' ? 'won' : contact.stage === 'lost' || contact.stage === 'passed' ? 'lost' : null

  return (
    <>
      <RealtimeRefresh contactId={contact.id} />
      <div className={ui.header}>
        <div>
          <Link href={`/admin/crm?kind=${contact.kind}`} className={styles.backLink}>← {contact.kind === 'investor' ? 'Investors' : 'Customers'}</Link>
          <h1 className={ui.h1}>{contact.name}</h1>
          <p className={ui.subtitle}>
            {[contact.title, contact.company].filter(Boolean).join(' · ') || contact.kind}
            {' · '}
            <span className={`${styles.pill} ${closed === 'won' ? styles.pillWon : closed === 'lost' ? styles.pillLost : styles.pillTag}`}>
              {stageLabel(contact.kind, contact.stage)}
            </span>
            {contact.value ? ` · ${formatMoney(contact.value)}` : ''}
          </p>
        </div>
        <DeleteContact id={contact.id} name={contact.name} />
      </div>

      <div className={styles.detailGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <ContactDetailClient contact={contact} stages={STAGES[contact.kind]} meEmail={admin.email} />

          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Log activity</h2>
            </div>
            <ActivityComposer contactId={contact.id} />
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Timeline</h2>
              <span className={styles.statSub}>{activities.length} events</span>
            </div>
            {activities.length === 0 ? (
              <p className={styles.muted}>Nothing logged yet. Add a note, call, or email above.</p>
            ) : (
              <ul className={styles.timeline}>
                {activities.map((a) => (
                  <li key={a.id} className={styles.tlItem}>
                    <span className={styles.tlIcon}>{ACTIVITY_ICON[a.kind] ?? '•'}</span>
                    <div className={styles.tlBody}>
                      <div className={styles.tlText}>{a.body || a.kind}</div>
                      <div className={styles.tlMeta}>
                        {a.kind !== 'note' && <span style={{ textTransform: 'capitalize' }}>{a.kind.replace('_', ' ')} · </span>}
                        {a.author ?? 'system'} · {when(a.created_at)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Tasks</h2>
            </div>
            <TaskPanel contactId={contact.id} tasks={tasks} />
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Key facts</h2>
            </div>
            <Fact k="Type" v={<span style={{ textTransform: 'capitalize' }}>{contact.kind}</span>} />
            <Fact k="Owner" v={contact.owner ?? '—'} />
            <Fact k="Source" v={contact.source ? <span style={{ textTransform: 'capitalize' }}>{contact.source.replace(/_/g, ' ')}</span> : '—'} />
            <Fact k="Email" v={contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : '—'} />
            <Fact k="LinkedIn" v={contact.linkedin_url ? <a href={contact.linkedin_url} target="_blank" rel="noreferrer">Profile ↗</a> : '—'} />
            <Fact k="Website" v={contact.website ? <a href={contact.website} target="_blank" rel="noreferrer">Site ↗</a> : '—'} />
            <Fact k="Location" v={contact.location ?? '—'} />
            <Fact k="Next step" v={contact.next_step ? `${contact.next_step}${contact.next_step_due ? ` (by ${new Date(contact.next_step_due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})` : ''}` : '—'} />
            <Fact k="Last contacted" v={contact.last_contacted_at ? when(contact.last_contacted_at) : '—'} />
            {contact.tags.length > 0 && (
              <div className={styles.readRow}>
                <span className={styles.readKey}>Tags</span>
                <span className={styles.kcardTags}>
                  {contact.tags.map((t) => <span key={t} className={`${styles.pill} ${styles.pillTag}`}>{t}</span>)}
                </span>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

function Fact({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className={styles.readRow}>
      <span className={styles.readKey}>{k}</span>
      <span className={styles.readVal}>{v}</span>
    </div>
  )
}
