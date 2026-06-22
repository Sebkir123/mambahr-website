'use client'

import { useState } from 'react'
import styles from './landing.module.css'

// Share the playbook, native share sheet on mobile, copy-link fallback on
// desktop. One link for everywhere; the site tracker attributes the source.
export default function ShareButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: `${title} | MambaHR`, url })
        return
      } catch {
        /* user cancelled, fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" className={styles.shareBtn} onClick={share}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v13M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
