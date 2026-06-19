'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { stageLabel, formatMoney, WON_STAGES, LOST_STAGES, type Contact, type ContactKind } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

type KindFilter = 'all' | ContactKind

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<KindFilter>('all')
  const [open, setOpen] = useState(false)

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return contacts.filter((c) => {
      if (kind !== 'all' && c.kind !== kind) return false
      if (open && (WON_STAGES.has(c.stage) || LOST_STAGES.has(c.stage))) return false
      if (!needle) return true
      return [c.name, c.company, c.email, c.title, c.location, ...(c.tags ?? [])]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(needle))
    })
  }, [contacts, q, kind, open])

  return (
    <>
      <div className={styles.filters}>
        <input
          className={`${styles.input} ${styles.search}`}
          placeholder="Search name, company, email, tag…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className={styles.select} value={kind} onChange={(e) => setKind(e.target.value as KindFilter)} style={{ width: 160 }}>
          <option value="all">All types</option>
          <option value="customer">Customers</option>
          <option value="investor">Investors</option>
        </select>
        <label className={ui.btnGhost} style={{ cursor: 'pointer' }}>
          <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} style={{ marginRight: 8 }} />
          Open only
        </label>
      </div>

      <div className={ui.card}>
        {rows.length === 0 ? (
          <div className={ui.empty}>
            <h3>No contacts</h3>
            <p>Adjust your filters, or add a contact / import existing leads from the pipeline.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Value</th>
                  <th>Owner</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => {
                  const closed = WON_STAGES.has(c.stage) ? 'won' : LOST_STAGES.has(c.stage) ? 'lost' : null
                  return (
                    <tr key={c.id}>
                      <td>
                        <Link href={`/admin/crm/${c.id}`} className={ui.rowLink}>{c.name}</Link>
                        {c.title && <div className={styles.muted} style={{ fontSize: 12 }}>{c.title}</div>}
                      </td>
                      <td><span className={`${styles.pill} ${styles.pillSource}`}>{c.kind}</span></td>
                      <td>{c.company || '—'}</td>
                      <td>
                        <span className={`${styles.pill} ${closed === 'won' ? styles.pillWon : closed === 'lost' ? styles.pillLost : styles.pillTag}`}>
                          {stageLabel(c.kind, c.stage)}
                        </span>
                      </td>
                      <td className={styles.valueCell}>{formatMoney(c.value)}</td>
                      <td className={styles.muted}>{c.owner ?? '—'}</td>
                      <td className={styles.muted}>{new Date(c.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
