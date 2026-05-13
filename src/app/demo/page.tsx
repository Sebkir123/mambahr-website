'use client'

import { useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import TurnstileWidget from '@/components/turnstile-widget'

const EDGE_FN_URL =
  'https://dqoqnlecylqlwsahudjn.supabase.co/functions/v1/handle-waitlist'

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
      const res = await fetch(EDGE_FN_URL, {
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
        .access-label {
          display: block;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .access-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 15px;
          font-family: var(--font-sans);
          color: var(--text);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .access-input:focus {
          border-color: var(--gold-dark);
          box-shadow: 0 0 0 3px var(--gold-tint);
        }
        .access-input::placeholder { color: var(--text-faint); }

        /* Fix Chrome autofill background */
        .access-input:-webkit-autofill,
        .access-input:-webkit-autofill:hover,
        .access-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px var(--bg) inset !important;
          -webkit-text-fill-color: var(--text) !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .access-btn {
          width: 100%;
          padding: 16px 24px;
          background: var(--gold-dark);
          color: var(--bg);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .access-btn:hover:not(:disabled) {
          background: var(--gold);
        }
        .access-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .access-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>

      <MegaNav />
      <main>
        <section style={{
          background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg) 100%)',
          paddingTop: 120,
          paddingBottom: 120,
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 480,
            margin: '0 auto',
            padding: '0 24px',
          }}>

            {status === 'success' ? (
              /* ── Success ── */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56,
                  borderRadius: '50%',
                  background: 'var(--gold-tint)',
                  border: '1px solid var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="var(--gold-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}>
                  Application received.
                </h1>
                <p style={{
                  fontSize: 17,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: 360,
                  margin: '0 auto',
                }}>
                  We&apos;ll review and reach out from a real founder email — not a no-reply.
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <p className="eyebrow" style={{ marginBottom: 20 }}>REQUEST ACCESS</p>

                  <h1 style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(42px, 6vw, 64px)',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    color: 'var(--text)',
                    lineHeight: 1.0,
                    marginBottom: 18,
                  }}>
                    Apply for access.
                  </h1>

                  <p style={{
                    fontSize: 17,
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    maxWidth: 380,
                    margin: '0 auto',
                  }}>
                    MambaHR is in private beta. Tell us about your team.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="email" className="access-label">Work email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="access-input"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label htmlFor="company" className="access-label">Company</label>
                    <input
                      id="company"
                      type="text"
                      className="access-input"
                      placeholder="Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <TurnstileWidget onSuccess={setToken} theme="light" />
                  </div>

                  <button
                    type="submit"
                    className="access-btn"
                    disabled={status === 'loading' || !token}
                  >
                    {status === 'loading' ? 'Sending…' : 'Apply for access →'}
                  </button>

                  {status === 'error' && (
                    <p style={{
                      fontSize: 13,
                      color: 'var(--color-red)',
                      textAlign: 'center',
                      marginTop: 14,
                    }}>
                      Something went wrong.{' '}
                      <a href="mailto:hello@mambahr.com" style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>
                        Email us
                      </a>
                    </p>
                  )}
                </form>
              </>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
