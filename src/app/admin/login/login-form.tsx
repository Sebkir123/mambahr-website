'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TurnstileWidget from '@/components/turnstile-widget'
import styles from './login.module.css'

export default function LoginForm() {
  const params = useSearchParams()
  const next = params.get('next') || '/admin'
  const [email, setEmail] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const onTurnstile = useCallback((t: string) => setToken(t), [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !token) return
    setStatus('sending')
    setMessage('')
    try {
      // Goes through our server route so Turnstile + rate limiting are enforced
      // before any email is sent. That route uses the cookie-backed Supabase
      // client so PKCE's code_verifier survives to the callback exchange.
      const res = await fetch('/api/admin/otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), turnstileToken: token, next }),
      })
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string }
        setMessage(d.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('sent')
    } catch {
      setMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.mark}>M</div>
        <h1 className={styles.title}>MambaHR Admin</h1>
        <p className={styles.sub}>Sign in with your work email. We&rsquo;ll send a one-time link.</p>

        {status === 'sent' ? (
          <div className={styles.sentBox}>
            <p className={styles.sentTitle}>Check your inbox</p>
            <p className={styles.sentBody}>
              We sent a sign-in link to <strong>{email}</strong>. Open it on this device to continue.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mambahr.com"
              className={styles.input}
            />
            <TurnstileWidget onSuccess={onTurnstile} theme="light" />
            <button type="submit" className={styles.button} disabled={status === 'sending' || !token}>
              {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
            </button>
            {status === 'error' && <p className={styles.error}>{message || 'Something went wrong.'}</p>}
            {params.get('error') === 'auth' && (
              <p className={styles.error}>That link expired or was already used. Request a new one.</p>
            )}
          </form>
        )}
      </div>
    </main>
  )
}
