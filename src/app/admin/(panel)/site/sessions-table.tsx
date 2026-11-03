'use client'

import { Fragment, useState } from 'react'
import { loadSiteSession } from './actions'
import { fmtDur, type SiteSessionRow, type SiteSessionDetail } from '@/lib/site-analytics-types'
import styles from './site.module.css'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import ui from '../admin-ui.module.css'

function flag(cc: string | null): string {
  if (!cc || cc.length !== 2) return '🌐'
  const A = 0x1f1e6
  return String.fromCodePoint(A + (cc.toUpperCase().charCodeAt(0) - 65), A + (cc.toUpperCase().charCodeAt(1) - 65))
}
function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function klass(cls: string, isBot: boolean) {
  if (isBot) return { label: 'BOT', cn: styles.klassBot }
  if (cls === 'engaged') return { label: 'ENGAGED', cn: styles.klassEngaged }
  if (cls === 'bounce') return { label: 'BOUNCE', cn: styles.klassBounce }
  return { label: 'VISIT', cn: styles.klassVisit }
}

export function SessionsTable({ sessions }: { sessions: SiteSessionRow[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const current = Math.min(page, Math.max(1, Math.ceil(sessions.length / PAGE_SIZE)))
  const visible = sessions.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const [detail, setDetail] = useState<Record<string, SiteSessionDetail | null>>({})
  const [loading, setLoading] = useState<string | null>(null)

  async function toggle(id: string) {
    if (open === id) {
      setOpen(null)
      return
    }
    setOpen(id)
    if (!(id in detail)) {
      setLoading(id)
      setError('')
      try { const d = await loadSiteSession(id); setDetail((prev) => ({ ...prev, [id]: d })) } catch { setError('Session details could not be loaded. Collapse and reopen the row to retry.') } finally { setLoading(null) }
    }
  }

  if (sessions.length === 0) {
    return <div className={styles.empty}>No sessions in this range.</div>
  }

  return (
    <>
    {error && <p role="alert" className={ui.error}>{error}</p>}
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: 28 }} />
            <th>Time</th>
            <th>Location</th>
            <th>Device</th>
            <th>Browser</th>
            <th>Source</th>
            <th>Duration</th>
            <th>Scroll</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((s) => {
            const k = klass(s.cls, s.isBot)
            const isOpen = open === s.id
            const durCn = `${styles.dur} ${s.cls === 'bounce' && !s.isBot ? styles.durBounce : s.cls === 'engaged' ? styles.durEngaged : ''}`
            return (
              <Fragment key={s.id}>
                <tr
                  className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}
                  onClick={() => toggle(s.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(s.id)
                    }
                  }}
                >
                  <td><span className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`}>›</span></td>
                  <td className={styles.mono}>{when(s.startedAt)}</td>
                  <td>
                    <span className={styles.flag}>{flag(s.country)}</span>
                    <span className={styles.loc}>{s.city || s.country || 'Unknown'}</span>
                    {s.city && s.country && <div className={styles.locSub}>{s.country}</div>}
                  </td>
                  <td>{s.device ?? '—'}</td>
                  <td>{s.browser ?? '—'}</td>
                  <td><span className={styles.srcPill}>{s.source ?? 'direct'}</span></td>
                  <td className={durCn}>{s.dwellMs > 0 ? fmtDur(s.dwellMs) : '0s'}</td>
                  <td className={styles.mono}>{s.maxScroll > 0 ? `${s.maxScroll}%` : '—'}</td>
                  <td><span className={`${styles.klass} ${k.cn}`}>{k.label}</span></td>
                </tr>
                {isOpen && (
                  <tr>
                    <td colSpan={9} style={{ padding: 0 }}>
                      <Detail row={s} detail={detail[s.id]} loading={loading === s.id} />
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
    <Pagination total={sessions.length} page={current} onPage={(page) => { setPage(page); setOpen(null) }} label="sessions" />
    </>
  )
}

function Detail({
  row,
  detail,
  loading,
}: {
  row: SiteSessionRow
  detail: SiteSessionDetail | null | undefined
  loading: boolean
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  if (loading) return <div className={styles.detail}><div className={styles.loading}>Loading session…</div></div>
  if (detail === undefined) return <div className={styles.detail}><div className={styles.loading}>Session details unavailable. Collapse and reopen the row to retry.</div></div>
  if (detail === null) return <div className={styles.detail}><div className={styles.loading}>Session not found.</div></div>

  const s = detail.session
  const pages = detail.pageviews
  async function copy() { try { await navigator.clipboard.writeText(s.id); setCopyState('copied') } catch { setCopyState('error') } }

  return (
    <div className={styles.detail}>
      <div className={styles.detailMeta}>
        <span className={styles.srcPill}>{s.source ?? 'direct'}</span>
        {s.isReturning && <strong>returning</strong>}
        <button className={styles.copyId} onClick={copy} title="Copy session id">{copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed; retry' : `${s.id.slice(0, 8)}…`}</button>
        {s.referrer && <span>via <strong>{(() => { try { return new URL(s.referrer!).hostname } catch { return s.referrer } })()}</strong></span>}
        {s.screen && <span>{s.screen}</span>}
        {s.locale && <span>{s.locale}</span>}
        {s.network && <span>{s.network}</span>}
        {s.os && <span>{s.os}</span>}
      </div>

      <div className={styles.summary}>
        <strong style={{ textTransform: 'capitalize' }}>{s.source ?? 'direct'}</strong>
        <span className={styles.arrow}> → </span>
        {pages.length} page{pages.length === 1 ? '' : 's'} · {row.pageviews} view{row.pageviews === 1 ? '' : 's'} · {fmtDur(s.dwellMs)} active · max {s.maxScroll}% scroll
        {s.landingPath && <> <span className={styles.arrow}>· landed on</span> <strong>{s.landingPath}</strong></>}
      </div>

      {row.botReason && (
        <div className={styles.suspect}>⚠ Bot / automated suspected, {row.botReason}</div>
      )}

      {pages.length > 0 && (
        <ul className={styles.pvList}>
          {pages.map((p, i) => (
            <li key={i} className={styles.pvItem}>
              <span className={styles.pvPath} title={p.path}>{p.path}</span>
              <span className={styles.pvMeta}>{new Date(p.viewedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              <span className={styles.pvMeta}>{p.dwellMs > 0 ? fmtDur(p.dwellMs) : '—'}</span>
              <span className={styles.pvMeta}>{p.maxScroll > 0 ? `${p.maxScroll}%` : '—'}</span>
            </li>
          ))}
        </ul>
      )}
      {detail.events.length > 0 && (
        <div className={styles.summary}>
          Events: {detail.events.map((e) => e.kind).join(' · ')}
        </div>
      )}
    </div>
  )
}
