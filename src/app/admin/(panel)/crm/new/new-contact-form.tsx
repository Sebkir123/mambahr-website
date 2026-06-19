'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createContact } from '../actions'
import type { ContactKind } from '@/lib/crm-types'
import ui from '../../admin-ui.module.css'
import styles from '../crm.module.css'

type Stage = { key: string; label: string }

export function NewContactForm({ kind, stages }: { kind: ContactKind; stages: Stage[] }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [err, setErr] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('kind', kind)
    setErr('')
    start(async () => {
      const r = await createContact(fd)
      if (r.ok && r.id) router.push(`/admin/crm/${r.id}`)
      else setErr(r.message)
    })
  }

  const isInvestor = kind === 'investor'

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label}>Name *</label>
          <input name="name" required className={styles.input} placeholder={isInvestor ? 'Jane Partner' : 'Sarah Chen'} autoFocus />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{isInvestor ? 'Firm' : 'Company'}</label>
          <input name="company" className={styles.input} placeholder={isInvestor ? 'Sequoia' : 'Acme Inc'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input name="email" type="email" className={styles.input} placeholder="name@company.com" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input name="title" className={styles.input} placeholder={isInvestor ? 'Partner' : 'Head of People'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Stage</label>
          <select name="stage" className={styles.select} defaultValue={stages[0].key}>
            {stages.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{isInvestor ? 'Check size (USD)' : 'Deal value (USD)'}</label>
          <input name="value" inputMode="numeric" className={styles.input} placeholder="50000" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Priority</label>
          <select name="priority" className={styles.select} defaultValue="medium">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Location</label>
          <input name="location" className={styles.input} placeholder="San Francisco, CA" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>LinkedIn URL</label>
          <input name="linkedin_url" className={styles.input} placeholder="https://linkedin.com/in/…" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Website</label>
          <input name="website" className={styles.input} placeholder="https://…" />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>Next step</label>
          <input name="next_step" className={styles.input} placeholder="Send follow-up deck / schedule intro call" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Next step due</label>
          <input name="next_step_due" type="date" className={styles.input} />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label}>Notes</label>
          <textarea name="notes" className={styles.textarea} placeholder="Context, intro source, what they care about…" />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={ui.btnPrimary} disabled={pending}>
          {pending ? 'Creating…' : `Create ${kind}`}
        </button>
        {err && <span className={`${styles.feedback} ${styles.feedbackErr}`}>{err}</span>}
      </div>
    </form>
  )
}
