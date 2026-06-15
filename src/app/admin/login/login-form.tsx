'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import styles from './login.module.css'

export default function LoginForm() {
  const params = useSearchParams()
  const next = params.get('next') || '/admin'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    setMessage('')
    const supabase = createSupabaseBrowserClient()
    const redirectTo = `${window.location.origin}/admin/auth/callback?next=${encodeURIComponent(next)}`
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: redirectTo },
    })
    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }
    setStatus('sent')
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
            <button type="submit" className={styles.button} disabled={status === 'sending'}>
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
