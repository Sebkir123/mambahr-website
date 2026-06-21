'use client'

import { useCallback, useState } from 'react'
import TurnstileWidget from '@/components/turnstile-widget'
import styles from './landing.module.css'

const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public / Established']

// Email wall for a playbook download. Captures the lead (name, email, company,
// stage), then triggers the PDF download with the URL the API returns (the URL
// is never in the page source, so the wall can't be bypassed).
export default function ResourceGate({ slug, kicker }: { slug: string; kicker: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [stage, setStage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [dlUrl, setDlUrl] = useState('')

  const onTurnstile = useCallback((t: string) => setToken(t), [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.includes('@') || !token || status === 'loading') return
    setStatus('loading'); setErr('')
    try {
      const res = await fetch('/api/resources/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, name, email, company, companyStage: stage, turnstileToken: token }),
      })
      const data = (await res.json().catch(() => ({}))) as { downloadUrl?: string; error?: string }
      if (res.ok && data.downloadUrl) {
        setStatus('done')
        setDlUrl(data.downloadUrl)
        window.location.href = data.downloadUrl
      } else {
        setErr(data.error ?? 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErr('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successTick} aria-hidden="true">✓</span>
        <div>
          <strong>Your download is starting.</strong>
          <br />
          If it doesn’t, <a className={styles.retryLink} href={dlUrl}>click here</a>.
        </div>
      </div>
    )
  }

  return (
    <form className={styles.gate} onSubmit={submit}>
      <div className={styles.gateRow}>
        <input className={styles.gateInput} type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" aria-label="Full name" />
        <input className={styles.gateInput} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" aria-label="Work email" />
      </div>
      <div className={styles.gateRow}>
        <input className={styles.gateInput} type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" autoComplete="organization" aria-label="Company" />
        <select className={styles.gateInput} value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Company stage">
          <option value="">Company stage…</option>
          {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button className={styles.download} type="submit" data-track="download" data-track-label={slug} disabled={status === 'loading' || !token || !name.trim() || !email.includes('@')}>
        {status === 'loading' ? 'Preparing…' : `Get the ${kicker.toLowerCase()} →`}
      </button>
      <TurnstileWidget onSuccess={onTurnstile} theme="light" />
      {status === 'error' ? <span className={styles.errNote}>{err}</span> : <span className={styles.note}>Free · enter your work email to download</span>}
    </form>
  )
}
