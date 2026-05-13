'use client'

import { useState } from 'react'
import Link from 'next/link'
import TurnstileWidget from '@/components/turnstile-widget'

export default function DemoPage() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, turnstileToken: token }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .demo-page {
          min-height: 100vh;
          min-height: 100dvh;
          background: #100E0C;
          background-image:
            radial-gradient(ellipse 120% 55% at 50% 105%, rgba(176,141,87,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 10%, rgba(176,141,87,0.05) 0%, transparent 55%);
          display: flex;
          flex-direction: column;
          font-family: var(--font-inter), system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid lines */
        .demo-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(176,141,87,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176,141,87,0.035) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        /* Fade-up entrance */
        @keyframes demoFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu   { animation: demoFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .d1   { animation-delay: 0.05s; }
        .d2   { animation-delay: 0.18s; }
        .d3   { animation-delay: 0.30s; }
        .d4   { animation-delay: 0.42s; }
        .d5   { animation-delay: 0.55s; }
        .d6   { animation-delay: 0.68s; }

        /* Form inputs */
        .demo-input {
          width: 100%;
          padding: 15px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(176,141,87,0.16);
          border-radius: 12px;
          color: #F0EBE1;
          font-size: 15px;
          font-family: var(--font-inter), system-ui, sans-serif;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .demo-input:focus {
          border-color: rgba(176,141,87,0.5);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(176,141,87,0.08);
        }
        .demo-input::placeholder { color: rgba(240,235,225,0.22); }

        /* Submit button */
        .demo-btn {
          width: 100%;
          padding: 16px 24px;
          background: #B08D57;
          color: #100E0C;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .demo-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }
        .demo-btn:hover:not(:disabled) {
          background: #C4A06A;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(176,141,87,0.3);
        }
        .demo-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .demo-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        /* Stat divider dots */
        .stat-dot::before {
          content: '·';
          margin-right: 12px;
          opacity: 0.3;
        }
        .stat-dot:first-child::before { display: none; }

        @media (max-width: 640px) {
          .demo-stats { flex-direction: column; gap: 8px !important; align-items: center; }
          .stat-dot::before { display: none; }
        }
      `}</style>

      <div className="demo-page">
        {/* ── Top bar ── */}
        <header className="fu d1" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 36px',
          position: 'relative',
          zIndex: 1,
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 19,
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: '#F0EBE1',
            }}>MambaHR</span>
          </Link>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(176,141,87,0.75)',
            background: 'rgba(176,141,87,0.08)',
            border: '1px solid rgba(176,141,87,0.18)',
            padding: '5px 12px',
            borderRadius: 99,
          }}>Private Beta</span>
        </header>

        {/* ── Main ── */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px 32px',
          position: 'relative',
          zIndex: 1,
        }}>
          {status === 'success' ? (
            /* ── Success state ── */
            <div className="fu" style={{ textAlign: 'center', maxWidth: 400 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(176,141,87,0.1)',
                border: '1px solid rgba(176,141,87,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#B08D57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 6vw, 60px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: '#F0EBE1',
                lineHeight: 1.05,
                marginBottom: 16,
              }}>You&apos;re in.</h2>
              <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: 16, lineHeight: 1.65 }}>
                We&apos;ll be in touch.
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <div style={{ width: '100%', maxWidth: 420 }}>

              {/* Eyebrow */}
              <p className="fu d2" style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(176,141,87,0.65)',
                marginBottom: 22,
                textAlign: 'center',
              }}>Early Access</p>

              {/* Headline */}
              <h1 className="fu d3" style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(44px, 9vw, 76px)',
                fontWeight: 400,
                letterSpacing: '-0.035em',
                color: '#F0EBE1',
                lineHeight: 0.97,
                marginBottom: 22,
                textAlign: 'center',
              }}>
                The HR team<br />
                <em style={{ color: '#B08D57', fontStyle: 'italic' }}>that runs itself.</em>
              </h1>

              {/* Subhead */}
              <p className="fu d4" style={{
                color: 'rgba(240,235,225,0.38)',
                fontSize: 15,
                lineHeight: 1.65,
                marginBottom: 32,
                textAlign: 'center',
              }}>
                Leave your email. We&apos;ll reach out to schedule time.
              </p>

              {/* Form card */}
              <div className="fu d5" style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(176,141,87,0.12)',
                borderRadius: 18,
                padding: '28px 24px',
                backdropFilter: 'blur(8px)',
              }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input
                      className="demo-input"
                      type="email"
                      required
                      aria-label="Work email"
                      placeholder="work@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="demo-input"
                      type="text"
                      aria-label="Company name"
                      placeholder="Company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <div style={{ marginTop: 2 }}>
                      <TurnstileWidget onSuccess={setToken} theme="dark" />
                    </div>
                    <button
                      type="submit"
                      className="demo-btn"
                      disabled={status === 'loading' || !token}
                    >
                      {status === 'loading' ? 'Sending…' : 'Request access →'}
                    </button>
                    {status === 'error' && (
                      <p style={{ fontSize: 13, color: '#F87171', textAlign: 'center', marginTop: 4 }}>
                        Something went wrong.{' '}
                        <a href="mailto:hello@mambahr.com" style={{ color: '#F87171', textDecoration: 'underline' }}>
                          Email us
                        </a>
                      </p>
                    )}
                  </div>
                </form>
              </div>

            </div>
          )}
        </main>

        {/* ── Footer stats ── */}
        <footer className="fu d6" style={{
          padding: '18px 36px 24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}>
          {[
            '10 design partners',
            '3,200+ employees managed',
            'Live in 1–2 days',
          ].map((s) => (
            <span key={s} className="stat-dot" style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              color: 'rgba(240,235,225,0.25)',
              letterSpacing: '0.04em',
            }}>
              {s}
            </span>
          ))}
        </footer>
      </div>
    </>
  )
}
