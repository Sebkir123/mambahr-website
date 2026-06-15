import { requireAdmin } from '@/lib/auth'
import { getAllLeads, type Lead } from '@/lib/admin-analytics'
import ui from '../admin-ui.module.css'
import styles from './leads.module.css'

export const dynamic = 'force-dynamic'

const SOURCE_LABEL: Record<Lead['source'], string> = {
  waitlist: 'Waitlist',
  demo: 'Demo request',
  magnet: 'Resource',
}
const SOURCES: (Lead['source'] | 'all')[] = ['all', 'waitlist', 'demo', 'magnet']

function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>
}) {
  await requireAdmin()
  const { source } = await searchParams
  const active = (SOURCES.includes(source as Lead['source']) ? source : 'all') as Lead['source'] | 'all'

  const { leads, warnings } = await getAllLeads()
  const filtered = active === 'all' ? leads : leads.filter((l) => l.source === active)

  const exportHref = `/admin/leads/export${active === 'all' ? '' : `?source=${active}`}`

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Leads</h1>
          <p className={ui.subtitle}>{filtered.length.toLocaleString()} {active === 'all' ? 'total' : SOURCE_LABEL[active as Lead['source']].toLowerCase()} lead{filtered.length === 1 ? '' : 's'}</p>
        </div>
        <a href={exportHref} className={ui.btnGhost}>Export CSV</a>
      </div>

      {warnings.length > 0 && (
        <div className={styles.notice}>{warnings[0]}</div>
      )}

      <div className={styles.filters}>
        {SOURCES.map((s) => (
          <a
            key={s}
            href={s === 'all' ? '/admin/leads' : `/admin/leads?source=${s}`}
            className={active === s ? styles.filterOn : styles.filterOff}
          >
            {s === 'all' ? 'All' : SOURCE_LABEL[s as Lead['source']]}
          </a>
        ))}
      </div>

      <div className={ui.card}>
        {filtered.length === 0 ? (
          <div className={ui.empty}>
            <h3>No leads</h3>
            <p>Nothing captured for this source yet.</p>
          </div>
        ) : (
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Company</th>
                <th>Source</th>
                <th>Detail</th>
                <th>Captured</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={`${l.source}-${l.email}-${i}`}>
                  <td className={styles.email}>
                    <a href={`mailto:${l.email}`} className={styles.mail}>{l.email}</a>
                  </td>
                  <td>{l.name || '—'}</td>
                  <td>{l.company || '—'}</td>
                  <td><span className={styles.srcTag}>{SOURCE_LABEL[l.source]}</span></td>
                  <td className={styles.detail}>{l.detail || '—'}</td>
                  <td className={styles.when}>{fmt(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
