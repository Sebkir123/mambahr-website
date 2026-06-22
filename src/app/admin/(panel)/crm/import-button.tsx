'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import ui from '../admin-ui.module.css'
import styles from './crm.module.css'
import type { ActionResult } from './actions'

// Pulls existing waitlist / demo / field-guide / deck contacts into the CRM.
// Idempotent, safe to click repeatedly; only new contacts are added.
export function ImportButton({ action }: { action: () => Promise<ActionResult> }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <button
        type="button"
        className={ui.btnGhost}
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await action()
            setMsg({ ok: r.ok, text: r.message })
            if (r.ok) router.refresh()
          })
        }
      >
        {pending ? 'Importing…' : 'Import leads'}
      </button>
      {msg && <span className={`${styles.feedback} ${msg.ok ? styles.feedbackOk : styles.feedbackErr}`}>{msg.text}</span>}
    </span>
  )
}
