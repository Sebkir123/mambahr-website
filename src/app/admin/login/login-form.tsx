'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MambaMark } from '@/components/mamba-mark'
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
    <main id="main" className={styles.wrap}>
      <Link href="/" className={styles.homeLink}>← MambaHR website</Link>
      <div className={styles.card}>
        <div className={styles.mark}><MambaMark size={30} color="var(--accent-primary)" /><span>MambaHR</span></div>
        <h1 className={styles.title}>Welcome to your workspace</h1>
        <p className={styles.sub}>For approved MambaHR team members. Sign in with a one-time email link.</p>

        {status === 'sent' ? (
          <div className={styles.sentBox} role="status">
            <p className={styles.sentTitle}>Check your inbox</p>
            <p className={styles.sentBody}>
              We sent a sign-in link to <strong>{email}</strong>. Open the newest link in this same browser to finish signing in.
            </p>
            <button type="button" className={styles.retry} onClick={() => { setStatus('idle'); setToken(null) }}>Use another email or request a new link</button>
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
            <button type="submit" aria-busy={status === 'sending'} className={styles.button} disabled={status === 'sending' || !token}>
              {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
            </button>
            {status === 'error' && <p className={styles.error} role="alert">{message || 'Something went wrong.'}</p>}
            {['auth', 'browser'].includes(params.get('error') ?? '') && (
              <p className={styles.error} role="alert">{params.get('error') === 'browser' ? 'This link opened in a different browser, or its sign-in cookie is missing. Request a new link here and open it in this browser.' : 'The link could not complete sign-in. It may be expired or already used. Request a fresh link and open it in this browser.'}</p>
            )}
          </form>
        )}
      </div>
    </main>
  )
}
