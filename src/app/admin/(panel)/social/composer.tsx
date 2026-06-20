'use client'

import { useMemo, useRef, useState } from 'react'
import { composePost, uploadPostImage } from './actions'
import styles from './social.module.css'

export type AccountOption = { id: string; name: string }

const MAX = 3000 // LinkedIn post limit
const FOLD = 1300 // LinkedIn "see more" cutoff — keep the hook above this
type AiMode = 'draft' | 'improve' | 'shorter' | 'punchier'

// Starter angles — prefill the AI topic so a click → draft. They double as a
// blank-page cure even when AI drafting isn't configured (the label seeds intent).
const TEMPLATES: { label: string; topic: string }[] = [
  { label: 'Lesson learned', topic: 'a hard lesson we learned building MambaHR and what changed because of it' },
  { label: 'Hot take', topic: 'a contrarian take on how HR teams actually spend their time vs. what software sells them' },
  { label: 'Customer win', topic: 'a concrete outcome a customer got — work completed, hours saved — told as a short story' },
  { label: "We're hiring", topic: 'who we are looking to hire next and why this is a rare moment to join' },
  { label: 'Product update', topic: 'a new capability we shipped and the specific manual work it now removes' },
  { label: 'Industry shift', topic: 'a shift happening in HR/AI right now and what it means for operators this year' },
]

// datetime-local value for "now" in the browser's timezone, for the min attr.
function localNow(): string {
  const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  return d.toISOString().slice(0, 16)
}

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone

// Lightweight, deterministic best-practice checks computed from the draft.
function hints(body: string): { ok: boolean; label: string }[] {
  const trimmed = body.trim()
  const firstLine = trimmed.split('\n')[0] ?? ''
  const hashtags = (trimmed.match(/(^|\s)#[\w-]+/g) ?? []).length
  const hasCta = /\?|\b(comment|reply|dm|share|link in|let me know|thoughts)\b/i.test(trimmed)
  return [
    { ok: firstLine.length > 0 && firstLine.length <= 140, label: 'Sharp first line (hook before the fold)' },
    { ok: trimmed.length > 0 && trimmed.length <= FOLD, label: 'Whole post fits before “see more”' },
    { ok: /\n\s*\n/.test(trimmed), label: 'Line breaks for easy mobile skimming' },
    { ok: hasCta, label: 'Ends with a question or call to action' },
    { ok: hashtags <= 3, label: '0–3 hashtags (no hashtag walls)' },
  ]
}

export function Composer({ accounts, aiEnabled }: { accounts: AccountOption[]; aiEnabled: boolean }) {
  const [body, setBody] = useState('')
  const [selected, setSelected] = useState<string[]>(accounts.map((a) => a.id))
  const [when, setWhen] = useState('')
  const [pending, setPending] = useState<null | 'draft' | 'schedule' | 'now'>(null)
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [topic, setTopic] = useState('')
  const [aiPending, setAiPending] = useState<AiMode | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imgPending, setImgPending] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const checks = useMemo(() => hints(body), [body])

  async function aiDraft(mode: AiMode) {
    if (aiPending) return
    if (mode === 'draft' && !topic.trim()) return
    if (mode !== 'draft' && !body.trim()) return
    setAiPending(mode)
    setFeedback(null)
    try {
      const res = await fetch('/api/admin/social/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mode, topic, current: body }),
      })
      const data = (await res.json()) as { text?: string; error?: string }
      if (res.ok && data.text) {
        setBody(data.text)
        if (mode === 'draft') setTopic('')
      } else {
        setFeedback({ ok: false, msg: data.error ?? 'AI draft failed.' })
      }
    } catch {
      setFeedback({ ok: false, msg: 'AI draft failed. Try again.' })
    } finally {
      setAiPending(null)
    }
  }

  async function onPickImage(file: File) {
    setImgPending(true)
    setFeedback(null)
    try {
      const fd = new FormData()
      fd.set('file', file)
      const res = await uploadPostImage(fd)
      if (res.ok && res.url) setImageUrl(res.url)
      else setFeedback({ ok: false, msg: res.message ?? 'Image upload failed.' })
    } catch {
      setFeedback({ ok: false, msg: 'Image upload failed. Try again.' })
    } finally {
      setImgPending(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

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
    if (imageUrl) fd.set('imageUrl', imageUrl)
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
        setImageUrl(null)
        setShowPreview(false)
      }
    } catch {
      setFeedback({ ok: false, msg: 'Something went wrong. Try again.' })
    } finally {
      setPending(null)
    }
  }

  const selectedAccounts = accounts.filter((a) => selected.includes(a.id))
  const busy = pending !== null

  return (
    <div className={styles.composer}>
      {feedback && (
        <div className={feedback.ok ? `${styles.feedback} ${styles.feedbackOk}` : `${styles.feedback} ${styles.feedbackErr}`}>
          {feedback.msg}
        </div>
      )}

      {/* Starter angles */}
      <div className={styles.templates}>
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            type="button"
            className={styles.template}
            onClick={() => (aiEnabled ? (setTopic(t.topic), aiDraft('draft')) : setTopic(t.topic))}
            disabled={aiPending !== null}
            title={aiEnabled ? 'Draft this angle with AI' : 'Seed a topic for the AI field'}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* AI draft assist */}
      <div className={styles.aiBar}>
        <input
          className={styles.aiInput}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && aiEnabled && aiDraft('draft')}
          placeholder={aiEnabled ? 'Topic for AI — e.g. “why early teams shouldn’t hire HR yet”' : 'AI drafting needs ANTHROPIC_API_KEY'}
          disabled={!aiEnabled || aiPending !== null}
        />
        <button
          type="button"
          className={styles.aiBtn}
          onClick={() => aiDraft('draft')}
          disabled={!aiEnabled || aiPending !== null || !topic.trim()}
          title={aiEnabled ? 'Draft a post from this topic' : 'Add ANTHROPIC_API_KEY in Vercel to enable'}
        >
          {aiPending === 'draft' ? 'Drafting…' : '✦ Draft with AI'}
        </button>
      </div>

      <textarea
        className={styles.textarea}
        value={body}
        maxLength={MAX}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share something — a take, a lesson, a link to the new playbook…"
        rows={6}
      />
      <div className={styles.composerFoot}>
        <div className={styles.footLeft}>
          <button
            type="button"
            className={styles.previewToggle}
            onClick={() => setShowPreview((v) => !v)}
            disabled={!body.trim()}
          >
            {showPreview ? 'Hide preview' : 'Preview'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            onChange={(e) => e.target.files?.[0] && onPickImage(e.target.files[0])}
          />
          <button
            type="button"
            className={styles.previewToggle}
            onClick={() => fileRef.current?.click()}
            disabled={imgPending || Boolean(imageUrl)}
          >
            {imgPending ? 'Uploading…' : imageUrl ? 'Image added' : '+ Image'}
          </button>
          {aiEnabled && body.trim() && (
            <>
              <button type="button" className={styles.aiRewrite} onClick={() => aiDraft('improve')} disabled={aiPending !== null}>
                {aiPending === 'improve' ? '…' : '✦ Improve'}
              </button>
              <button type="button" className={styles.aiRewrite} onClick={() => aiDraft('shorter')} disabled={aiPending !== null}>
                {aiPending === 'shorter' ? '…' : 'Shorter'}
              </button>
              <button type="button" className={styles.aiRewrite} onClick={() => aiDraft('punchier')} disabled={aiPending !== null}>
                {aiPending === 'punchier' ? '…' : 'Punchier'}
              </button>
            </>
          )}
        </div>
        <span className={styles.count}>
          {body.length > FOLD && <span className={styles.fold}>past the fold · </span>}
          {body.length}/{MAX}
        </span>
      </div>

      {imageUrl && (
        <div className={styles.imageRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Attached" className={styles.imageThumb} />
          <button type="button" className={styles.imageRemove} onClick={() => setImageUrl(null)}>
            Remove image
          </button>
        </div>
      )}

      {body.trim() && (
        <ul className={styles.hints}>
          {checks.map((c) => (
            <li key={c.label} className={c.ok ? `${styles.hint} ${styles.hintOk}` : styles.hint}>
              <span className={styles.hintDot} aria-hidden="true">{c.ok ? '✓' : '○'}</span>
              {c.label}
            </li>
          ))}
        </ul>
      )}

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
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className={styles.previewImage} />
              )}
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
            disabled={busy || !body.trim() || selected.length === 0}
            onClick={() => submit('draft')}
          >
            {pending === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button
            type="button"
            className={styles.btnGhost}
            disabled={busy || !body.trim() || selected.length === 0 || !when}
            onClick={() => submit('schedule')}
          >
            {pending === 'schedule' ? 'Scheduling…' : 'Schedule'}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            disabled={busy || !body.trim() || selected.length === 0}
            onClick={() => submit('now')}
          >
            {pending === 'now' ? 'Posting…' : 'Post now'}
          </button>
        </div>
      </div>
    </div>
  )
}
