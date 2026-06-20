'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { createFieldGuideLink, revokeFieldGuideLink } from './actions'
import type { FieldGuideRow } from '@/lib/admin-field-guides'
import ui from '../admin-ui.module.css'
import styles from '../deck/deck.module.css'

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
  return typeof window !== 'undefined' ? window.location.origin : 'https://mambahr.com'
}

export function FieldGuideManager({
  rows,
  guides,
}: {
  rows: FieldGuideRow[]
  guides: { slug: string; title: string }[]
}) {
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
      const r = await createFieldGuideLink(fd)
      if (r.ok && r.path && r.token) {
        setFresh({ url: `${origin()}${r.path}?k=${encodeURIComponent(r.token)}`, name })
        form.reset()
      } else {
        setErr(r.message)
      }
    })
  }

  async function copy(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500)
    } catch {
      /* clipboard blocked */
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
          <input name="recipient_name" placeholder="Recipient name (e.g. Jane Doe)" className={styles.input} required maxLength={120} />
          <input name="company" placeholder="Company (optional)" className={styles.input} maxLength={120} />
          <button type="submit" className={styles.createBtn} disabled={pending}>
            {pending ? 'Creating…' : 'Create link'}
          </button>
        </form>
        {err && <p className={styles.notice}>{err}</p>}
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
        {rows.length === 0 ? (
          <p className={styles.empty}>Nothing yet. Create a tracked link above, or share the field-guide form to capture leads.</p>
        ) : (
          <ul className={styles.linkList}>
            {rows.map((r) => {
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
                      <form action={revokeFieldGuideLink}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className={styles.revokeBtn}>Revoke</button>
                      </form>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
