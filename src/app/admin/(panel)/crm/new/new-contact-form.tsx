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
      try {
      const r = await createContact(fd)
      if (r.ok && r.id) router.push(`/admin/crm/${r.id}`)
      else setErr(r.message)
      } catch { setErr('The contact could not be created. Try again.') }
    })
  }

  const isInvestor = kind === 'investor'

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">Name *</label>
          <input id="contact-name" name="name" required className={styles.input} placeholder={isInvestor ? 'Jane Partner' : 'Sarah Chen'} autoFocus />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-company">{isInvestor ? 'Firm' : 'Company'}</label>
          <input id="contact-company" name="company" className={styles.input} placeholder={isInvestor ? 'Sequoia' : 'Acme Inc'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" className={styles.input} placeholder="name@company.com" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-title">Title</label>
          <input id="contact-title" name="title" className={styles.input} placeholder={isInvestor ? 'Partner' : 'Head of People'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-stage">Stage</label>
          <select id="contact-stage" name="stage" className={styles.select} defaultValue={stages[0].key}>
            {stages.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-value">{isInvestor ? 'Check size (USD)' : 'Deal value (USD)'}</label>
          <input id="contact-value" name="value" inputMode="numeric" className={styles.input} placeholder="50000" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-priority">Priority</label>
          <select id="contact-priority" name="priority" className={styles.select} defaultValue="medium">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label} htmlFor="contact-next_step">Next step</label>
          <input id="contact-next_step" name="next_step" className={styles.input} placeholder="Schedule an intro call" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-next_step_due">Next step due</label>
          <input id="contact-next_step_due" name="next_step_due" type="date" className={styles.input} />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label} htmlFor="contact-notes">Notes</label>
          <textarea id="contact-notes" name="notes" className={styles.textarea} placeholder="Context, intro source, what they care about…" />
        </div>
      </div>

      <details className={styles.optionalFields}><summary>Additional details</summary><div className={styles.formGrid}>        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-location">Location</label>
          <input id="contact-location" name="location" className={styles.input} placeholder="San Francisco, CA" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" className={styles.input} placeholder="https://…" />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label} htmlFor="contact-tags">Tags (comma-separated)</label>
          <input id="contact-tags" name="tags" className={styles.input} placeholder={isInvestor ? 'seed, lead, warm-intro' : 'enterprise, inbound, champion'} />
        </div>
</div></details>

      <div className={styles.formActions}>
        <button type="submit" className={ui.btnPrimary} disabled={pending}>
          {pending ? 'Creating…' : `Create ${kind}`}
        </button>
        {err && <span role="alert" className={`${styles.feedback} ${styles.feedbackErr}`}>{err}</span>}
      </div>
    </form>
  )
}
