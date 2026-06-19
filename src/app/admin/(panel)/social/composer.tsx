'use client'

import { useState } from 'react'
import { composePost } from './actions'
import styles from './social.module.css'

export type AccountOption = { id: string; name: string }

const MAX = 3000 // LinkedIn post limit

// datetime-local value for "now" in the browser's timezone, for the min attr.
function localNow(): string {
  const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  return d.toISOString().slice(0, 16)
}

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone

export function Composer({ accounts }: { accounts: AccountOption[] }) {
  const [body, setBody] = useState('')
  const [selected, setSelected] = useState<string[]>(accounts.map((a) => a.id))
  const [when, setWhen] = useState('')
  const [pending, setPending] = useState<null | 'draft' | 'schedule' | 'now'>(null)
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)
  const [showPreview, setShowPreview] = useState(false)

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
    // Convert the local wall-clock value to an absolute UTC instant so the
    // post fires at the time the manager actually meant, not in server TZ.
    if (mode === 'schedule') fd.set('scheduledAt', new Date(when).toISOString())
    selected.forEach((id) => fd.append('accountIds', id))
    setPending(mode)
    setFeedback(null)
    try {
      const res = await composePost(fd)
      setFeedback({ ok: res.ok, msg: res.message })
      if (res.ok) {
        setBody('')
        setWhen('')
        setShowPreview(false)
      }
    } catch {
      setFeedback({ ok: false, msg: 'Something went wrong. Try again.' })
    } finally {
      setPending(null)
    }
  }

  const selectedAccounts = accounts.filter((a) => selected.includes(a.id))

  return (
    <div className={styles.composer}>
      {feedback && (
        <div className={feedback.ok ? `${styles.feedback} ${styles.feedbackOk}` : `${styles.feedback} ${styles.feedbackErr}`}>
          {feedback.msg}
        </div>
      )}

      <textarea
        className={styles.textarea}
        value={body}
        maxLength={MAX}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share something — a take, a lesson, a link to the new playbook…"
        rows={6}
      />
      <div className={styles.composerFoot}>
        <button
          type="button"
          className={styles.previewToggle}
          onClick={() => setShowPreview((v) => !v)}
          disabled={!body.trim()}
        >
          {showPreview ? 'Hide preview' : 'Preview'}
        </button>
        <span className={styles.count}>
          {body.length}/{MAX}
        </span>
      </div>

      {showPreview && body.trim() && (
        <div className={styles.previews}>
          {selectedAccounts.map((a) => (
            <div key={a.id} className={styles.previewCard}>
              <div className={styles.previewHead}>
                <span className={styles.previewAvatar}>{a.name.charAt(0)}</span>
                <div>
                  <span className={styles.previewName}>{a.name}</span>
                  <span className={styles.previewSub}>now · LinkedIn</span>
                </div>
              </div>
              <p className={styles.previewBody}>{body}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.accountPick}>
        <span className={styles.pickLabel}>Post as</span>
        <div className={styles.chips}>
          {accounts.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={selected.includes(a.id)}
              className={selected.includes(a.id) ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              onClick={() => toggle(a.id)}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <label className={styles.scheduleField}>
          <span className={styles.scheduleLabel}>Schedule for <span className={styles.tz}>({TZ})</span></span>
          <input
            type="datetime-local"
            className={styles.when}
            value={when}
            min={localNow()}
            onChange={(e) => setWhen(e.target.value)}
          />
        </label>
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
