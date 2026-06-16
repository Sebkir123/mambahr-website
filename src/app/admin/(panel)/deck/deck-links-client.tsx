'use client'

import { useState } from 'react'
import { revokeDeckLink } from './actions'
import type { DeckLinkRow } from '@/lib/admin-deck'
import styles from './deck.module.css'

function ago(iso: string | null): string {
  if (!iso) return 'never'
  const d = Date.now() - new Date(iso).getTime()
  const m = Math.floor(d / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function DeckLinks({ links, slug }: { links: DeckLinkRow[]; slug: string }) {
  const [copied, setCopied] = useState<string | null>(null)

  const urlFor = (token: string) =>
    `${typeof window !== 'undefined' ? window.location.origin : 'https://mambahr.com'}/${slug}?k=${encodeURIComponent(token)}`

  const copy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(urlFor(token))
      setCopied(token)
      setTimeout(() => setCopied((c) => (c === token ? null : c)), 1500)
    } catch {
      /* clipboard blocked — the URL is still visible on hover via title */
    }
  }

  if (links.length === 0) {
    return <p className={styles.empty}>No recipient links yet. Create one above to share the deck.</p>
  }

  return (
    <ul className={styles.linkList}>
      {links.map((l) => {
        const revoked = !!l.revoked_at
        return (
          <li key={l.id} className={revoked ? `${styles.linkRow} ${styles.linkRevoked}` : styles.linkRow}>
            <div className={styles.linkWho}>
              <span className={styles.linkName}>{l.recipient_name}</span>
              {l.recipient_org && <span className={styles.linkOrg}>{l.recipient_org}</span>}
              {revoked && <span className={styles.revokedTag}>Revoked</span>}
            </div>
            <div className={styles.linkStats}>
              <span title="Views">{l.views} view{l.views === 1 ? '' : 's'}</span>
              <span title="Last opened">· {ago(l.lastViewedAt)}</span>
            </div>
            <div className={styles.linkActions}>
              {!revoked && (
                <button
                  type="button"
                  className={styles.copyBtn}
                  title={urlFor(l.token)}
                  onClick={() => copy(l.token)}
                >
                  {copied === l.token ? 'Copied ✓' : 'Copy link'}
                </button>
              )}
              {!revoked && (
                <form action={revokeDeckLink}>
                  <input type="hidden" name="id" value={l.id} />
                  <button type="submit" className={styles.revokeBtn}>
                    Revoke
                  </button>
                </form>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
