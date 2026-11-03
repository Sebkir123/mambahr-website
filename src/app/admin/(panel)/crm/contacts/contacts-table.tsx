'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { stageLabel, formatMoney, WON_STAGES, LOST_STAGES, type Contact, type ContactKind } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import { ATTENTION_FILTERS, filterContacts, type AttentionFilter } from '@/lib/admin-contact-filters'
import Pagination, { PAGE_SIZE } from '../../_components/pagination'
import styles from '../crm.module.css'

type KindFilter = 'all' | ContactKind
type SortCol = 'name' | 'company' | 'stage' | 'value' | 'owner' | 'updated_at'

export function ContactsTable({ contacts, initialAttention = '' }: { contacts: Contact[]; initialAttention?: AttentionFilter }) {
  const [attention, setAttention] = useState<AttentionFilter>(initialAttention)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [kind, setKind] = useState<KindFilter>('all')
  const [owner, setOwner] = useState('all')
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState<{ col: SortCol; dir: 1 | -1 }>({ col: 'updated_at', dir: -1 })

  const owners = useMemo(
    () => Array.from(new Set(contacts.map((c) => c.owner).filter(Boolean) as string[])).sort(),
    [contacts],
  )

  const rows = useMemo(() => {
    const filtered = filterContacts(contacts, { kind, owner, open, q, attention })
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
  }, [contacts, q, kind, owner, open, attention, sort])

  const current = Math.min(page, Math.max(1, Math.ceil(rows.length / PAGE_SIZE)))
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  function toggleSort(col: SortCol) {
    setPage(1)
    setSort((s) => (s.col === col ? { col, dir: s.dir === 1 ? -1 : 1 } : { col, dir: col === 'value' || col === 'updated_at' ? -1 : 1 }))
  }
  const arrow = (col: SortCol) => (sort.col === col ? (sort.dir === 1 ? ' ↑' : ' ↓') : '')

  const exportHref = `/admin/crm/contacts/export?kind=${kind}${attention ? `&attention=${attention}` : ''}${owner !== 'all' ? `&owner=${encodeURIComponent(owner)}` : ''}${open ? '&open=1' : ''}${q.trim() ? `&q=${encodeURIComponent(q.trim())}` : ''}`

  return (
    <>
      <div className={styles.filters}>
        <input
          className={`${styles.input} ${styles.search}`}
          type="search"
          aria-label="Search contacts"
          placeholder="Search name, company, email, tag…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1) }}
        />
        <select aria-label="Contact type" className={styles.select} value={kind} onChange={(e) => { setKind(e.target.value as KindFilter); setPage(1) }} style={{ width: 150 }}>
          <option value="all">All types</option>
          <option value="customer">Customers</option>
          <option value="investor">Investors</option>
        </select>
        <select aria-label="Contact owner" className={styles.select} value={owner} onChange={(e) => { setOwner(e.target.value); setPage(1) }} style={{ width: 180 }}>
          <option value="all">All owners</option>
          {owners.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <select aria-label="Needs attention" className={styles.select} value={attention} onChange={(e) => { setAttention(e.target.value as AttentionFilter); setPage(1) }} style={{ width: 180 }}>
          <option value="">Any next step</option>
          {ATTENTION_FILTERS.map((filter) => <option key={filter} value={filter}>{filter === 'overdue' ? 'Overdue next step' : filter === 'unassigned' ? 'Needs an owner' : 'Missing next step'}</option>)}
        </select>
        <label className={ui.btnGhost} style={{ cursor: 'pointer' }}>
          <input type="checkbox" checked={open} onChange={(e) => { setOpen(e.target.checked); setPage(1) }} style={{ marginRight: 8 }} />
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
                {visible.map((c) => {
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
        <Pagination total={rows.length} page={current} onPage={setPage} label="contacts" />
      </div>
    </>
  )
}

function Th({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <th scope="col" aria-sort={label.endsWith(' ↑') ? 'ascending' : label.endsWith(' ↓') ? 'descending' : 'none'}><button type="button" onClick={onClick} title={`Sort by ${label}`}>{label}</button></th>
  )
}
