'use client'

import { useDeferredValue, useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { useListQuery } from '../_components/use-list-query'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import { ConfirmButton } from '../_components/confirm-button'
import { createFieldGuideLink, revokeFieldGuideLink } from './actions'
import type { FieldGuideRow } from '@/lib/admin-field-guides'
import ui from '../admin-ui.module.css'
import styles from '../_components/engagement.module.css'

function ago(iso: string | null): string {
  if (!iso) return 'never'
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
function origin(): string {
  return typeof window !== 'undefined' ? window.location.origin : 'https://www.mambahr.com'
}

export function FieldGuideManager({
  rows,
  guides,
}: {
  rows: FieldGuideRow[]
  guides: { slug: string; title: string }[]
}) {
  const { query, status, sort, page, setQuery, setStatus, setSort, setPage, clear } = useListQuery(['all', 'active', 'revoked'], ['recent', 'opens', 'name'])
  const needle = useDeferredValue(query.trim().toLowerCase())
  const filtered = useMemo(() => rows.filter(row => (status === 'all' || (status === 'revoked' ? !!row.revokedAt : !row.revokedAt)) && [row.who, row.company, row.email, row.guideTitle].some(value => value?.toLowerCase().includes(needle))).sort((a, b) => sort === 'opens' ? b.opens - a.opens : sort === 'name' ? a.who.localeCompare(b.who) : b.requestedAt.localeCompare(a.requestedAt)), [rows, status, sort, needle])
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const [actionNotice, setActionNotice] = useState<{ ok: boolean; message: string } | null>(null)
  const [pending, start] = useTransition()
  const [fresh, setFresh] = useState<{ url: string; name: string } | null>(null)
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('recipient_name') || '')
    setErr('')
    start(async () => {
      try {
      const r = await createFieldGuideLink(fd)
      if (r.ok && r.path && r.token) {
        setFresh({ url: `${origin()}${r.path}?k=${encodeURIComponent(r.token)}`, name })
        form.reset()
      } else {
        setErr(r.message)
      }
      } catch { setErr('The link could not be created. Please try again.') }
    })
  }

  async function copy(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500)
    } catch {
      setErr('Could not copy the link. Please try again.')
    }
  }

  const urlFor = (r: FieldGuideRow) => `${origin()}${r.path}?k=${encodeURIComponent(r.token)}`

  return (
    <>
      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Create a tracked link</h2>
          <span className={styles.cardHint}>Send a guide to a named prospect and measure who opens it</span>
        </div>
        <form onSubmit={onCreate} className={styles.createForm}>
          <select name="guide" className={styles.input} defaultValue={guides[0]?.slug} aria-label="Guide">
            {guides.map((g) => (
              <option key={g.slug} value={g.slug}>{g.title}</option>
            ))}
          </select>
          <input name="recipient_name" aria-label="Recipient name" placeholder="Recipient name (e.g. Jane Doe)" className={styles.input} required maxLength={120} />
          <input name="company" aria-label="Company (optional)" placeholder="Company (optional)" className={styles.input} maxLength={120} />
          <button type="submit" className={styles.createBtn} disabled={pending}>
            {pending ? 'Creating…' : 'Create link'}
          </button>
        </form>
        {err && <p className={styles.notice} role="alert">{err}</p>}
        {fresh && (
          <div className={styles.freshLink}>
            <div>
              <strong>Link for {fresh.name}</strong>
              <code className={styles.freshUrl}>{fresh.url}</code>
            </div>
            <button type="button" className={styles.copyBtn} onClick={() => copy(fresh.url, 'fresh')}>
              {copied === 'fresh' ? 'Copied ✓' : 'Copy link'}
            </button>
          </div>
        )}
      </div>

      <div className={ui.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Requests &amp; links</h2>
          <span className={styles.cardHint}>{rows.length} total · firm resolved from the opener&rsquo;s network</span>
        </div>
        <div className={ui.toolbar}>
          <label className={ui.search}><input type="search" aria-label="Search guide links" placeholder="Search recipient, company or guide…" value={query} onChange={e => setQuery(e.target.value)} /></label>
          <label className={styles.listFilter}>Status<select aria-label="Filter guide links" value={status} onChange={e => setStatus(e.target.value)}><option value="all">All links</option><option value="active">Active</option><option value="revoked">Revoked</option></select></label>
          <label className={styles.listFilter}>Sort<select aria-label="Sort guide links" value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Most recent</option><option value="opens">Most opened</option><option value="name">Recipient name</option></select></label>
        </div>
        {actionNotice && <p className={styles.notice} role={actionNotice.ok ? 'status' : 'alert'}>{actionNotice.message}</p>}
        {filtered.length === 0 ? (
          <div className={ui.empty}><h3>{rows.length ? 'No matching links' : 'No guide links yet'}</h3><p>{rows.length ? 'Try another search or status filter.' : 'Create a tracked link above, or share the guide’s request form.'}</p>{rows.length > 0 && <button className={ui.btnGhost} onClick={clear}>Clear filters</button>}</div>
        ) : (
          <ul className={styles.linkList}>
            {visible.map((r) => {
              const revoked = !!r.revokedAt
              return (
                <li key={r.id} className={revoked ? `${styles.linkRow} ${styles.linkRevoked}` : styles.linkRow}>
                  <div className={styles.linkWho}>
                    <Link href={`/admin/field-guides/${r.id}`} className={styles.linkName}>{r.who}</Link>
                    {r.company && <span className={styles.linkOrg}>{r.company}</span>}
                    <span className={styles.forwardedTag}>{r.source === 'manual' ? 'Link' : 'Form'}</span>
                    {revoked && <span className={styles.revokedTag}>Revoked</span>}
                  </div>
                  <div className={styles.linkStats}>
                    <span>{r.opens} open{r.opens === 1 ? '' : 's'}</span>
                    <span>· {ago(r.lastOpenedAt)}</span>
                    {r.opens > 0 && r.network && <span>· {r.network}</span>}
                    {r.opens > 0 && r.location !== 'Unknown' && <span>· {r.location}</span>}
                  </div>
                  <div className={styles.linkActions}>
                    {!revoked && (
                      <a href={urlFor(r)} target="_blank" rel="noopener noreferrer" className={styles.copyBtn} title="Open the recipient's view (admin preview)">Open ↗</a>
                    )}
                    {!revoked && (
                      <button type="button" className={styles.copyBtn} title={urlFor(r)} onClick={() => copy(urlFor(r), r.id)}>
                        {copied === r.id ? 'Copied ✓' : 'Copy link'}
                      </button>
                    )}
                    {!revoked && (
                      <RevokeLink id={r.id} onResult={setActionNotice} />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <Pagination total={filtered.length} page={current} onPage={setPage} label="links" />
      </div>
    </>
  )
}

function RevokeLink({ id, onResult }: { id: string; onResult: (result: { ok: boolean; message: string }) => void }) {
  const [pending, start] = useTransition()
  return <ConfirmButton className={styles.revokeBtn} pending={pending} pendingLabel="Revoking…" confirmLabel="Revoke link" onConfirm={() => start(async () => {
    const fd = new FormData(); fd.set('id', id)
    try { onResult(await revokeFieldGuideLink(fd)) }
    catch { onResult({ ok: false, message: 'Could not revoke this link. Please retry.' }) }
  })}>Revoke</ConfirmButton>
}
