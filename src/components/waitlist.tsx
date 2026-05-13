'use client'

import { useState } from 'react'
import TurnstileWidget from './turnstile-widget'

type Props = { compact?: boolean }

export function Waitlist({ compact }: Props) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!turnstileToken) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, turnstileToken }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: compact ? 'left' : 'center', padding: compact ? 0 : '24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: compact ? 'flex-start' : 'center', marginBottom: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>You&apos;re on the list.</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>We&apos;ll be in touch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="email"
          required
          aria-label="Work email"
          placeholder="work@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: compact ? '10px 14px' : '13px 16px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            fontSize: 14,
            color: 'var(--text)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {!compact && (
          <input
            type="text"
            aria-label="Company name"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{
              width: '100%',
              padding: '13px 16px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              fontSize: 14,
              color: 'var(--text)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        )}
        <TurnstileWidget onSuccess={setTurnstileToken} theme={compact ? 'light' : 'dark'} />
        <button
          type="submit"
          disabled={status === 'loading' || !turnstileToken}
          className="btn-gold"
          style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' || !turnstileToken ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Sending…' : 'Request access'}
        </button>
        {status === 'error' && (
          <p style={{ fontSize: 13, color: 'var(--color-red)', textAlign: 'center' }}>Something went wrong. Email us at hello@mambahr.com</p>
        )}
      </div>
    </form>
  )
}

export default function RequestAccessSection() {
  return (
    <section
      id="request-access"
      style={{ background: '#1C1917', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <p className="eyebrow" style={{ color: 'rgba(176,141,87,0.9)', marginBottom: 20 }}>REQUEST ACCESS</p>
        <h2
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Hire the agent. Promote the human.
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 48, lineHeight: 1.6 }}>
          Bring the AI HR department to your team.
        </p>
        <Waitlist />
        <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          <a href="/security" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Security</a>
          {' · '}
          <a href="/about" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>About</a>
          {' · '}
          <a href="mailto:hello@mambahr.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Contact</a>
        </p>
      </div>
    </section>
  )
}
