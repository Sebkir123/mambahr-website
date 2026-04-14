'use client'

import { useState } from 'react'
import { submitWaitlist } from '@/lib/actions'
import TurnstileWidget from '@/components/turnstile-widget'

export default function RequestAccess() {
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    if (turnstileToken) formData.set('cf-turnstile-response', turnstileToken)
    const result = await submitWaitlist(formData)
    if (result.success) setSuccess(true)
    else setError(result.error || 'Something went wrong.')
    setPending(false)
  }

  return (
    <section id="request-access" style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}
        >
          Get in.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.6 }}>
          We&apos;re onboarding 10 design partners. The agent connects to your HRIS and runs autonomously from day one.
        </p>

        {!success ? (
          <form action={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: 12 }}>
              <input
                name="email"
                type="email"
                placeholder="Work email"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--border-mid)',
                  backgroundColor: 'var(--bg)',
                  fontSize: 15,
                  color: 'var(--text)',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                name="company"
                type="text"
                placeholder="Company name"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--border-mid)',
                  backgroundColor: 'var(--bg)',
                  fontSize: 15,
                  color: 'var(--text)',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <select
                name="size"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: '1px solid var(--border-mid)',
                  backgroundColor: 'var(--bg)',
                  fontSize: 15,
                  color: 'var(--text)',
                  outline: 'none',
                  appearance: 'none',
                }}
              >
                <option value="">Company size (optional)</option>
                <option value="50-200">50–200 employees</option>
                <option value="200-500">200–500 employees</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <TurnstileWidget onSuccess={setTurnstileToken} theme="dark" />

            <button
              type="submit"
              disabled={pending}
              className="transition-all duration-200"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 10,
                backgroundColor: 'var(--gold)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                border: 'none',
                cursor: pending ? 'wait' : 'pointer',
                opacity: pending ? 0.7 : 1,
              }}
            >
              {pending ? 'Submitting...' : 'Request Access'}
            </button>

            {error && (
              <p style={{ marginTop: 12, fontSize: 13, color: '#ef4444', textAlign: 'center' }}>
                {error}
              </p>
            )}
          </form>
        ) : (
          <div style={{ padding: '32px 0' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              You&apos;re in.
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              We&apos;ll reach out within 48 hours to get you started.
            </p>
          </div>
        )}

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.6 }}>
          We respond within 48 hours. No sales pitch — just a conversation about whether MambaHR is a fit.
        </p>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <a href="/investors" style={{ fontSize: 13, color: 'var(--text-faint)', textDecoration: 'none', borderBottom: '1px solid var(--border-mid)' }}>
            For investors
          </a>
        </div>
      </div>
    </section>
  )
}
