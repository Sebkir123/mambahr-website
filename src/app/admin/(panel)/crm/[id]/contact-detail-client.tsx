'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { updateContact } from '../actions'
import { stageLabel, type Contact } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

type Stage = { key: string; label: string }
type Peer = { id: string; name: string; editing: boolean }

// The editable contact form with REAL-TIME collaboration via Supabase Realtime
// presence. Everyone viewing this contact shows up as an avatar; when one person
// enters edit mode, the others' "Edit" button locks with a banner, so two people
// can't clobber each other's edits. Presence auto-clears on disconnect (closed
// tab, navigation), so a lock can never get permanently stuck.
//
// Privacy: the presence channel is public (Realtime presence isn't RLS-gated),
// so we broadcast only a first-name display label + a random per-session id —
// never the admin's email. The session id (not email) distinguishes self vs peers.
function newSessionId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const bytes = crypto.getRandomValues(new Uint8Array(12))
  return `s_${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}`
}

export function ContactDetailClient({
  contact,
  stages,
  meEmail,
}: {
  contact: Contact
  stages: Stage[]
  meEmail: string
}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  // One presence id per mounted panel. Lazy initialiser: generated once, never
  // in a re-render.
  const [meId] = useState(newSessionId)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const [peers, setPeers] = useState<Peer[]>([])
  const [connected, setConnected] = useState(false)
  const channelRef = useRef<ReturnType<ReturnType<typeof createSupabaseBrowserClient>['channel']> | null>(null)

  const meName = meEmail.split('@')[0]

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase.channel(`crm:contact:${contact.id}`, {
      config: { presence: { key: meId } },
    })
    channelRef.current = channel

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState() as Record<string, { id: string; name: string; editing: boolean }[]>
        const flat: Peer[] = []
        for (const [key, entries] of Object.entries(state)) {
          const e = entries[0]
          if (!e) continue
          flat.push({ id: key, name: e.name, editing: entries.some((x) => x.editing) })
        }
        setPeers(flat)
      })
      .subscribe(async (status) => {
        setConnected(status === 'SUBSCRIBED')
        if (status === 'SUBSCRIBED') {
          await channel.track({ id: meId, name: meName, editing: false })
        }
      })

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [contact.id, meId, meName])

  async function setEditingFlag(flag: boolean) {
    await channelRef.current?.track({ id: meId, name: meName, editing: flag })
  }

  const others = peers.filter((p) => p.id !== meId)
  const lockedBy = others.find((p) => p.editing)
  const lockedByOther = Boolean(lockedBy) && !editing

  async function startEdit() {
    if (lockedByOther) return
    setEditing(true)
    setErr('')
    await setEditingFlag(true)
  }
  async function cancelEdit() {
    setEditing(false)
    setErr('')
    formRef.current?.reset()
    await setEditingFlag(false)
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('id', contact.id)
    setSaving(true)
    setErr('')
    let r
    try { r = await updateContact(fd) } catch { setErr('Your changes could not be saved. Try again.'); setSaving(false); return }
    setSaving(false)
    if (!r.ok) {
      setErr(r.message)
      return
    }
    setEditing(false)
    await setEditingFlag(false)
    router.refresh()
  }

  useEffect(() => { if (editing) formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus() }, [editing])
  const disabled = !editing

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>{editing ? 'Edit details' : 'Next step & notes'}</h2>
        {!editing && <button type="button" className={ui.btnGhost} onClick={startEdit} disabled={lockedByOther}>{lockedByOther ? 'Being edited' : 'Edit details'}</button>}
        <div className={styles.presence}>
          {peers.length > 0 && (
            <span className={styles.presence} title={peers.map((p) => p.name).join(', ')}>
              {peers.slice(0, 5).map((p) => (
                <span
                  key={p.id}
                  className={`${styles.avatar} ${p.editing ? styles.avatarEditing : ''}`}
                  title={`${p.name}${p.editing ? ' (editing)' : ''}${p.id === meId ? ', you' : ''}`}
                >
                  {p.name.charAt(0)}
                </span>
              ))}
            </span>
          )}
          <span className={styles.livePill} title={connected ? 'Connected, changes sync in real time' : 'Connecting…'}>
            <span className={styles.liveDot} style={connected ? undefined : { background: 'var(--text-faint)', boxShadow: 'none' }} />
            {connected ? 'live' : 'connecting…'}
          </span>
        </div>
      </div>

      {lockedByOther && (
        <div className={styles.lockBanner}>
          🔒 {lockedBy?.name} is editing this contact, you can’t make changes until they’re done.
        </div>
      )}

      {!editing ? <div className={styles.contactSummary}>
        <div><span>Next step</span><strong>{contact.next_step || 'Add a clear next step for this relationship'}</strong>{contact.next_step_due && <time dateTime={contact.next_step_due}>Due {new Date(`${contact.next_step_due}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>}</div>
        <div><span>Notes</span><p>{contact.notes || 'No notes yet. Use Edit details for background context, or log a conversation below.'}</p></div>
      </div> : <form ref={formRef} onSubmit={onSubmit}>
        <input type="hidden" name="expected_updated_at" value={contact.updated_at} />
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" defaultValue={contact.name} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-company">{contact.kind === 'investor' ? 'Firm' : 'Company'}</label>
          <input id="contact-company" name="company" defaultValue={contact.company ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" defaultValue={contact.email ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-title">Title</label>
          <input id="contact-title" name="title" defaultValue={contact.title ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-stage">Stage</label>
          <select id="contact-stage" name="stage" defaultValue={contact.stage} className={styles.select} disabled={disabled}>
              {stages.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-value">{contact.kind === 'investor' ? 'Check size (USD)' : 'Deal value (USD)'}</label>
          <input id="contact-value" name="value" inputMode="numeric" defaultValue={contact.value ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-priority">Priority</label>
          <select id="contact-priority" name="priority" defaultValue={contact.priority} className={styles.select} disabled={disabled}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-owner">Owner</label>
          <input id="contact-owner" name="owner" defaultValue={contact.owner ?? ''} className={styles.input} disabled={disabled} placeholder="owner@mambahr.com" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-location">Location</label>
          <input id="contact-location" name="location" defaultValue={contact.location ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-tags">Tags (comma-separated)</label>
          <input id="contact-tags" name="tags" defaultValue={(contact.tags ?? []).join(', ')} className={styles.input} disabled={disabled} />
          </div>
            <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" defaultValue={contact.website ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label} htmlFor="contact-next_step">Next step</label>
          <input id="contact-next_step" name="next_step" defaultValue={contact.next_step ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-next_step_due">Next step due</label>
          <input id="contact-next_step_due" name="next_step_due" type="date" defaultValue={contact.next_step_due ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label} htmlFor="contact-notes">Notes</label>
          <textarea id="contact-notes" name="notes" defaultValue={contact.notes ?? ''} className={styles.textarea} disabled={disabled} />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={ui.btnPrimary} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          <button type="button" className={ui.btnGhost} onClick={cancelEdit} disabled={saving}>Cancel</button>
          {err && <span role="alert" className={`${styles.feedback} ${styles.feedbackErr}`}>{err}</span>}
        </div>
      </form>}

      <p className={styles.statSub} style={{ marginTop: 12 }}>
        Currently {stageLabel(contact.kind, contact.stage)} · added {new Date(contact.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  )
}
