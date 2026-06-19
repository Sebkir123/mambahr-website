'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { updateContact } from '../actions'
import { stageLabel, type Contact } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

type Stage = { key: string; label: string }
type Peer = { email: string; name: string; editing: boolean }

// The editable contact form with REAL-TIME collaboration via Supabase Realtime
// presence. Everyone viewing this contact shows up as an avatar; when one person
// enters edit mode, the others' "Edit" button locks with a banner — so two people
// can't clobber each other's edits. Presence auto-clears on disconnect (closed
// tab, navigation), so a lock can never get permanently stuck.
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
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const [peers, setPeers] = useState<Peer[]>([])
  const channelRef = useRef<ReturnType<ReturnType<typeof createSupabaseBrowserClient>['channel']> | null>(null)

  const meName = meEmail.split('@')[0]

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    const channel = supabase.channel(`crm:contact:${contact.id}`, {
      config: { presence: { key: meEmail } },
    })
    channelRef.current = channel

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState() as Record<string, { email: string; name: string; editing: boolean }[]>
        const flat: Peer[] = []
        for (const entries of Object.values(state)) {
          // Multiple tabs of the same user collapse to one peer (editing if any tab is).
          const e = entries[0]
          if (!e) continue
          flat.push({ email: e.email, name: e.name, editing: entries.some((x) => x.editing) })
        }
        setPeers(flat)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ email: meEmail, name: meName, editing: false })
        }
      })

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [contact.id, meEmail, meName])

  async function setEditingFlag(flag: boolean) {
    await channelRef.current?.track({ email: meEmail, name: meName, editing: flag })
  }

  const others = peers.filter((p) => p.email !== meEmail)
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
    const r = await updateContact(fd)
    setSaving(false)
    if (!r.ok) {
      setErr(r.message)
      return
    }
    setEditing(false)
    await setEditingFlag(false)
    router.refresh()
  }

  const disabled = !editing

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Details</h2>
        <div className={styles.presence}>
          {peers.length > 0 && (
            <span className={styles.presence} title={peers.map((p) => p.name).join(', ')}>
              {peers.slice(0, 5).map((p) => (
                <span
                  key={p.email}
                  className={`${styles.avatar} ${p.editing ? styles.avatarEditing : ''}`}
                  title={`${p.name}${p.editing ? ' (editing)' : ''}${p.email === meEmail ? ' — you' : ''}`}
                >
                  {p.name.charAt(0)}
                </span>
              ))}
            </span>
          )}
          <span className={styles.livePill}><span className={styles.liveDot} /> live</span>
        </div>
      </div>

      {lockedByOther && (
        <div className={styles.lockBanner}>
          🔒 {lockedBy?.name} is editing this contact — you can’t make changes until they’re done.
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input name="name" defaultValue={contact.name} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{contact.kind === 'investor' ? 'Firm' : 'Company'}</label>
            <input name="company" defaultValue={contact.company ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input name="email" type="email" defaultValue={contact.email ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input name="title" defaultValue={contact.title ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Stage</label>
            <select name="stage" defaultValue={contact.stage} className={styles.select} disabled={disabled}>
              {stages.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{contact.kind === 'investor' ? 'Check size (USD)' : 'Deal value (USD)'}</label>
            <input name="value" inputMode="numeric" defaultValue={contact.value ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <select name="priority" defaultValue={contact.priority} className={styles.select} disabled={disabled}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Owner</label>
            <input name="owner" defaultValue={contact.owner ?? ''} className={styles.input} disabled={disabled} placeholder="owner@mambahr.com" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Location</label>
            <input name="location" defaultValue={contact.location ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tags (comma-separated)</label>
            <input name="tags" defaultValue={(contact.tags ?? []).join(', ')} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>LinkedIn URL</label>
            <input name="linkedin_url" defaultValue={contact.linkedin_url ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Website</label>
            <input name="website" defaultValue={contact.website ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label}>Next step</label>
            <input name="next_step" defaultValue={contact.next_step ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Next step due</label>
            <input name="next_step_due" type="date" defaultValue={contact.next_step_due ?? ''} className={styles.input} disabled={disabled} />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.label}>Notes</label>
            <textarea name="notes" defaultValue={contact.notes ?? ''} className={styles.textarea} disabled={disabled} />
          </div>
        </div>

        <div className={styles.formActions}>
          {editing ? (
            <>
              <button type="submit" className={ui.btnPrimary} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" className={ui.btnGhost} onClick={cancelEdit} disabled={saving}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className={ui.btnPrimary} onClick={startEdit} disabled={lockedByOther}>
              {lockedByOther ? `Locked — ${lockedBy?.name} editing` : 'Edit'}
            </button>
          )}
          {err && <span className={`${styles.feedback} ${styles.feedbackErr}`}>{err}</span>}
        </div>
      </form>

      <p className={styles.statSub} style={{ marginTop: 12 }}>
        Currently {stageLabel(contact.kind, contact.stage)} · added {new Date(contact.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  )
}
