'use client'

import { useState } from 'react'
import { submitWaitlist } from '@/lib/actions'
import TurnstileWidget from '@/components/turnstile-widget'

export default function RequestAccess() {
  const [success, setSuccess] = useState(false)
  const [returning, setReturning] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    if (turnstileToken) formData.set('cf-turnstile-response', turnstileToken)
    const result = await submitWaitlist(formData)
    if (result.success) {
      setSuccess(true)
      setReturning(!!result.returning)
    } else {
      setError(result.error || 'Something went wrong.')
    }
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
          We&apos;re selectively onboarding design partners. The agent connects to your HRIS and runs autonomously from day one — see if MambaHR is right for your team.
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
              <label htmlFor="company-size" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                Company size
              </label>
              <select
                id="company-size"
                name="size"
                aria-label="Company size"
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
          <div
            style={{
              padding: '40px 32px',
              borderRadius: 16,
              backgroundColor: 'rgba(17,17,19,0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(176,141,87,0.15)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(176,141,87,0.08)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            {/* Gold top shimmer */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.4), transparent)' }} />

            {/* Animated checkmark badge */}
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'rgba(34,197,94,0.1)',
              border: '2px solid rgba(34,197,94,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'hero-scale-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both',
              position: 'relative',
            }}>
              {/* Pulsing outer ring */}
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                border: '1px solid rgba(34,197,94,0.2)',
                animation: 'pulse-dot 2.5s ease-in-out infinite',
              }} />
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                <path d="M2 11l8 8L26 3" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em', animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}>
              {returning ? 'Good to see you again.' : "You're on the list."}
            </h3>

            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24, animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}>
              {returning ? (
                <>You&apos;re already on our list — we have your application on file. We&apos;ll be in touch soon.</>
              ) : (
                <>We&apos;ll review your application and get back to you within 48 hours.</>
              )}
            </p>

            {/* Next steps timeline */}
            <div style={{
              padding: 20,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              textAlign: 'left',
              animation: 'hero-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s both',
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-mono), monospace' }}>
                What happens next
              </div>
              {[
                { num: '01', label: 'Check your inbox', detail: 'Confirmation email from team@mambahr.com' },
                { num: '02', label: 'We review your fit', detail: 'Within 48 hours, no sales pitch' },
                { num: '03', label: 'We schedule a call', detail: 'If MambaHR is right for your team' },
              ].map((step, i) => (
                <div key={step.num} className="flex" style={{ gap: 12, padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', minWidth: 22 }}>{step.num}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{step.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!success && (
          <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.6 }}>
            We respond within 48 hours. No sales pitch — just a conversation about whether MambaHR is a fit.
          </p>
        )}

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <a href="/investors" style={{ fontSize: 13, color: 'var(--text-faint)', textDecoration: 'none', borderBottom: '1px solid var(--border-mid)' }}>
            For investors
          </a>
        </div>
      </div>
    </section>
  )
}
