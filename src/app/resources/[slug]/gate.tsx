'use client'

import { useState } from 'react'
import { LeadForm, type LeadFormFields } from '@/components/lead-form'
import styles from './landing.module.css'

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,000+']

export default function ResourceGate({ slug, kicker }: { slug: string; kicker: string }) {
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [dlUrl, setDlUrl] = useState('')

  async function handleSubmit({ name, email, company, companyStage, turnstileToken }: LeadFormFields) {
    setErr('')
    const res = await fetch('/api/resources/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, name, email, company, companyStage, turnstileToken }),
    })
    const data = (await res.json().catch(() => ({}))) as { downloadUrl?: string; error?: string }
    if (res.ok && data.downloadUrl) {
      setDlUrl(data.downloadUrl)
      setStatus('done')
      window.location.href = data.downloadUrl
    } else {
      const msg = data.error ?? 'Something went wrong.'
      setErr(msg)
      throw new Error(msg)
    }
  }

  if (status === 'done') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successTick} aria-hidden="true">✓</span>
        <div>
          <strong>Your download is starting.</strong>
          <br />
          If it doesn&rsquo;t, <a className={styles.retryLink} href={dlUrl}>click here</a>.
        </div>
      </div>
    )
  }

  return (
    <LeadForm
      onSubmit={handleSubmit}
      submitLabel={`Get the ${kicker.toLowerCase()} →`}
      pendingLabel="Preparing…"
      stageOptions={COMPANY_SIZES.map((s) => `${s} employees`)}
      stageLabel="Company size"
      error={err || undefined}
      note="Free · enter your work email to download"
    />
  )
}
