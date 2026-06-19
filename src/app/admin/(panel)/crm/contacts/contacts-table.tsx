'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { stageLabel, formatMoney, WON_STAGES, LOST_STAGES, type Contact, type ContactKind } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

type KindFilter = 'all' | ContactKind
type SortCol = 'name' | 'company' | 'stage' | 'value' | 'owner' | 'updated_at'

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<KindFilter>('all')
  const [owner, setOwner] = useState('all')
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState<{ col: SortCol; dir: 1 | -1 }>({ col: 'updated_at', dir: -1 })

  const owners = useMemo(
    () => Array.from(new Set(contacts.map((c) => c.owner).filter(Boolean) as string[])).sort(),
    [contacts],
  )

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = contacts.filter((c) => {
      if (kind !== 'all' && c.kind !== kind) return false
      if (owner !== 'all' && c.owner !== owner) return false
      if (open && (WON_STAGES.has(c.stage) || LOST_STAGES.has(c.stage))) return false
      if (!needle) return true
      return [c.name, c.company, c.email, c.title, c.location, ...(c.tags ?? [])]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(needle))
    })
    const { col, dir } = sort
    return filtered.sort((a, b) => {
      let av: string | number = ''
      let bv: string | number = ''
      if (col === 'value') {
        av = a.value ?? -1
        bv = b.value ?? -1
      } else if (col === 'updated_at') {
        av = new Date(a.updated_at).getTime()
        bv = new Date(b.updated_at).getTime()
      } else {
        av = (a[col] ?? '').toString().toLowerCase()
        bv = (b[col] ?? '').toString().toLowerCase()
      }
      if (av < bv) return -1 * dir
      if (av > bv) return 1 * dir
      return 0
    })
  }, [contacts, q, kind, owner, open, sort])

  function toggleSort(col: SortCol) {
    setSort((s) => (s.col === col ? { col, dir: s.dir === 1 ? -1 : 1 } : { col, dir: col === 'value' || col === 'updated_at' ? -1 : 1 }))
  }
  const arrow = (col: SortCol) => (sort.col === col ? (sort.dir === 1 ? ' ↑' : ' ↓') : '')

  const exportHref = `/admin/crm/contacts/export?kind=${kind}${owner !== 'all' ? `&owner=${encodeURIComponent(owner)}` : ''}${open ? '&open=1' : ''}${q.trim() ? `&q=${encodeURIComponent(q.trim())}` : ''}`

  return (
    <>
      <div className={styles.filters}>
        <input
          className={`${styles.input} ${styles.search}`}
          placeholder="Search name, company, email, tag…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className={styles.select} value={kind} onChange={(e) => setKind(e.target.value as KindFilter)} style={{ width: 150 }}>
          <option value="all">All types</option>
          <option value="customer">Customers</option>
          <option value="investor">Investors</option>
        </select>
        <select className={styles.select} value={owner} onChange={(e) => setOwner(e.target.value)} style={{ width: 180 }}>
          <option value="all">All owners</option>
          {owners.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <label className={ui.btnGhost} style={{ cursor: 'pointer' }}>
          <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} style={{ marginRight: 8 }} />
          Open only
        </label>
        <span className={styles.spacer} />
        <a href={exportHref} className={ui.btnGhost}>Export CSV</a>
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
                  <Th label={`Name${arrow('name')}`} onClick={() => toggleSort('name')} />
                  <th>Type</th>
                  <Th label={`Company${arrow('company')}`} onClick={() => toggleSort('company')} />
                  <Th label={`Stage${arrow('stage')}`} onClick={() => toggleSort('stage')} />
                  <Th label={`Value${arrow('value')}`} onClick={() => toggleSort('value')} />
                  <Th label={`Owner${arrow('owner')}`} onClick={() => toggleSort('owner')} />
                  <Th label={`Updated${arrow('updated_at')}`} onClick={() => toggleSort('updated_at')} />
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

function Th({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <th onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none' }} title="Sort">
      {label}
    </th>
  )
}
