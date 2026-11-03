'use client'
import { useDeferredValue, useMemo, useState } from 'react'
import type { Lead } from '@/lib/admin-analytics'
import { filterLeads, LEAD_SOURCES, LEAD_LABEL, type LeadFilter } from '@/lib/admin-lead-filters'
import Icon from '../_components/icon'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import ui from '../admin-ui.module.css'
import styles from './leads.module.css'
export default function LeadsTable({ leads, initialSource }: { leads: Lead[]; initialSource: LeadFilter }) {
  const [source, setSource] = useState<LeadFilter>(initialSource)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const needle = useDeferredValue(query)
  const filtered = useMemo(() => filterLeads(leads, source, needle), [leads, source, needle])
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const exportParams = new URLSearchParams({ ...(source !== 'all' ? { source } : {}), ...(query.trim() ? { q: query.trim() } : {}) })
  return <div className={ui.card}>
    <div className={ui.toolbar}><div className={ui.tabs} aria-label="Lead source">{LEAD_SOURCES.map((value) => <button type="button" key={value} aria-pressed={source === value} className={source === value ? ui.tabActive : ui.tab} onClick={() => { setSource(value); setPage(1) }}>{LEAD_LABEL[value]}<span className={ui.count}>{value === 'all' ? leads.length : leads.filter((lead) => lead.source === value).length}</span></button>)}</div></div>
    <div className={ui.toolbar}><label className={ui.search}><Icon name="search" size={15} /><input type="search" aria-label="Search leads" placeholder="Name, email, company…" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} /></label><a href={`/admin/leads/export?${exportParams}`} className={ui.btnGhost}><Icon name="download" size={14} />Export {source !== 'all' || query ? 'filtered ' : ''}CSV</a></div>
    {!rows.length ? <div className={ui.empty}><span className={ui.emptyIcon}><Icon name="inbox" size={21} /></span><h3>{leads.length ? 'No matching leads' : 'Your next customer starts here'}</h3><p>{leads.length ? 'Try another source or search term.' : 'New requests from your website will appear here automatically.'}</p>{leads.length > 0 && <button type="button" className={ui.btnGhost} onClick={() => { setSource('all'); setQuery(''); setPage(1) }}>Clear filters</button>}</div> : <div className={ui.tableWrap}><table className={ui.table}><thead><tr><th scope="col">Contact</th><th scope="col">Company</th><th scope="col">Source</th><th scope="col">Details</th><th scope="col">Received</th></tr></thead><tbody>{rows.map((lead, index) => <tr key={`${lead.source}-${lead.email}-${index}`}><td><a href={`mailto:${lead.email}`} className={ui.rowLink}>{lead.name || lead.email}</a>{lead.name && <div className={styles.email}>{lead.email}</div>}</td><td>{lead.company || '—'}</td><td><span className={styles.source}>{LEAD_LABEL[lead.source]}</span></td><td className={styles.detail}>{lead.detail || '—'}</td><td className={styles.when}>{new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td></tr>)}</tbody></table></div>}
    <Pagination total={filtered.length} page={current} onPage={setPage} label="leads" />
  </div>
}
