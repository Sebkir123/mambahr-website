'use client'

import { useState } from 'react'
import { composePost } from './actions'
import styles from './social.module.css'

export type AccountOption = { id: string; name: string }

const MAX = 3000 // LinkedIn post limit

export function Composer({ accounts }: { accounts: AccountOption[] }) {
  const [body, setBody] = useState('')
  const [selected, setSelected] = useState<string[]>(accounts.map((a) => a.id))
  const [when, setWhen] = useState('')
  const [pending, setPending] = useState<null | 'draft' | 'schedule' | 'now'>(null)

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  if (accounts.length === 0) {
    return (
      <p className={styles.empty}>
        Connect a LinkedIn account first — then you can compose, schedule, and post from here.
      </p>
    )
  }

  async function submit(mode: 'draft' | 'schedule' | 'now') {
    if (!body.trim() || selected.length === 0) return
    if (mode === 'schedule' && !when) return
    const fd = new FormData()
    fd.set('body', body)
    fd.set('mode', mode)
    if (mode === 'schedule') fd.set('scheduledAt', when)
    selected.forEach((id) => fd.append('accountIds', id))
    setPending(mode)
    try {
      await composePost(fd)
      setBody('')
      setWhen('')
    } finally {
      setPending(null)
    }
  }

  return (
    <div className={styles.composer}>
      <textarea
        className={styles.textarea}
        value={body}
        maxLength={MAX}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share something — a take, a lesson, a link to the new playbook…"
        rows={6}
      />
      <div className={styles.composerFoot}>
        <span className={styles.count}>
          {body.length}/{MAX}
        </span>
      </div>

      <div className={styles.accountPick}>
        <span className={styles.pickLabel}>Post as</span>
        <div className={styles.chips}>
          {accounts.map((a) => (
            <button
              key={a.id}
              type="button"
              className={selected.includes(a.id) ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => toggle(a.id)}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <input
          type="datetime-local"
          className={styles.when}
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          aria-label="Schedule time"
        />
        <div className={styles.btns}>
          <button
            type="button"
            className={styles.btnGhost}
            disabled={pending !== null || !body.trim() || selected.length === 0}
            onClick={() => submit('draft')}
          >
            {pending === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button
            type="button"
            className={styles.btnGhost}
            disabled={pending !== null || !body.trim() || selected.length === 0 || !when}
            onClick={() => submit('schedule')}
          >
            {pending === 'schedule' ? 'Scheduling…' : 'Schedule'}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            disabled={pending !== null || !body.trim() || selected.length === 0}
            onClick={() => submit('now')}
          >
            {pending === 'now' ? 'Posting…' : 'Post now'}
          </button>
        </div>
      </div>
    </div>
  )
}
