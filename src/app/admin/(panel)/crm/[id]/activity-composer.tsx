'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logActivity } from '../actions'
import type { ActivityKind } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

const KINDS: { key: ActivityKind; label: string }[] = [
  { key: 'note', label: 'Note' },
  { key: 'call', label: 'Call' },
  { key: 'email', label: 'Email' },
  { key: 'meeting', label: 'Meeting' },
]

export function ActivityComposer({ contactId }: { contactId: string }) {
  const router = useRouter()
  const [kind, setKind] = useState<ActivityKind>('note')
  const [body, setBody] = useState('')
  const [pending, start] = useTransition()
  const [err, setErr] = useState('')

  function submit() {
    if (!body.trim()) return
    const fd = new FormData()
    fd.set('contact_id', contactId)
    fd.set('kind', kind)
    fd.set('body', body.trim())
    setErr('')
    start(async () => {
      const r = await logActivity(fd)
      if (r.ok) {
        setBody('')
        router.refresh()
      } else setErr(r.message)
    })
  }

  return (
    <div>
      <div className={styles.composeKinds}>
        {KINDS.map((k) => (
          <button
            key={k.key}
            type="button"
            className={kind === k.key ? styles.kindChipActive : styles.kindChip}
            onClick={() => setKind(k.key)}
          >
            {k.label}
          </button>
        ))}
      </div>
      <textarea
        className={styles.textarea}
        placeholder={kind === 'note' ? 'Add a note…' : `Log a ${kind}…`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className={styles.formActions}>
        <button type="button" className={ui.btnPrimary} onClick={submit} disabled={pending || !body.trim()}>
          {pending ? 'Logging…' : 'Log'}
        </button>
        {err && <span className={`${styles.feedback} ${styles.feedbackErr}`}>{err}</span>}
      </div>
    </div>
  )
}
