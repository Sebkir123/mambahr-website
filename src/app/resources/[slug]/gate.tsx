'use client'

import { useCallback, useState } from 'react'
import TurnstileWidget from '@/components/turnstile-widget'
import styles from './landing.module.css'

// Email wall for a playbook download. Captures the lead, then triggers the PDF
// download with the URL the API returns (the URL is never in the page source,
// so the wall can't be bypassed). data-track on the button records the
// conversion in the site tracker too.
export default function ResourceGate({ slug, kicker }: { slug: string; kicker: string }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  const onTurnstile = useCallback((t: string) => setToken(t), [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !token || status === 'loading') return
    setStatus('loading'); setErr('')
    try {
      const res = await fetch('/api/resources/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, email, company, turnstileToken: token }),
      })
      const data = (await res.json().catch(() => ({}))) as { downloadUrl?: string; error?: string }
      if (res.ok && data.downloadUrl) {
        setStatus('done')
        // Trigger the download.
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
      <p className={styles.success} role="status">
        Your download is starting. If it doesn’t, <button type="button" className={styles.retryLink} onClick={() => submit(new Event('submit') as unknown as React.FormEvent)}>click here</button>.
      </p>
    )
  }

  return (
    <form className={styles.gate} onSubmit={submit}>
      <div className={styles.gateRow}>
        <input
          className={styles.gateInput}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
        />
        <input
          className={styles.gateInput}
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          aria-label="Company"
        />
      </div>
      <button
        className={styles.download}
        type="submit"
        data-track="download"
        data-track-label={slug}
        disabled={status === 'loading' || !token || !email.includes('@')}
      >
        {status === 'loading' ? 'Preparing…' : `Get the ${kicker.toLowerCase()} →`}
      </button>
      <TurnstileWidget onSuccess={onTurnstile} theme="light" />
      {status === 'error' ? <span className={styles.errNote}>{err}</span> : <span className={styles.note}>Free · enter your work email to download</span>}
    </form>
  )
}
