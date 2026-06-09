'use client'

import { useEffect, useState, Suspense, lazy } from 'react'

const TurnstileWidget = lazy(() => import('./turnstile-widget'))

const MAGNET_ENDPOINT =
  'https://dqoqnlecylqlwsahudjn.supabase.co/functions/v1/handle-magnet-request'

export type EmailCaptureModalProps = {
  open: boolean
  onClose: () => void
  magnetId: string
  magnetTitle: string
  magnetBlurb: string
  whatsInside: string[]
}

export default function EmailCaptureModal({
  open,
  onClose,
  magnetId,
  magnetTitle,
  magnetBlurb,
  whatsInside,
}: EmailCaptureModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [showTurnstile, setShowTurnstile] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch(MAGNET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(anonKey ? { Authorization: `Bearer ${anonKey}` } : {}),
        },
        body: JSON.stringify({
          name,
          email,
          company,
          magnetId,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          turnstileToken: token,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .magnet-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(28, 25, 23, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .magnet-modal {
          width: 100%;
          max-width: 540px;
          max-height: calc(100dvh - 48px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 22px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.22);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: var(--font-sans);
        }
        .magnet-header {
          padding: 28px 32px 24px;
          background: linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-cream) 100%);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .magnet-body {
          padding: 24px 32px 28px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          flex: 1;
        }
        .magnet-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(255,255,255,0.7);
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          z-index: 2;
          backdrop-filter: blur(4px);
        }
        .magnet-inside-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        @media (max-width: 540px) {
          .magnet-backdrop {
            padding: 0;
            align-items: stretch;
          }
          .magnet-modal {
            max-width: 100%;
            max-height: 100dvh;
            border-radius: 0;
            border: none;
          }
          .magnet-header {
            padding: 22px 22px 18px;
          }
          .magnet-body {
            padding: 20px 22px 24px;
          }
          .magnet-inside-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        className="magnet-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={`Get ${magnetTitle}`}
        onClick={onClose}
      >
        <div className="magnet-modal" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="magnet-close"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {status === 'success' ? (
            /* ── SUCCESS ── */
            <div className="magnet-body" style={{ padding: '36px 32px 32px' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'var(--gold-tint)',
                  border: '1px solid var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="var(--gold-dark)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="eyebrow" style={{ marginBottom: 12, color: 'var(--gold-dark)' }}>
                EMAIL SENT
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(26px, 5vw, 30px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  margin: '0 0 14px',
                  lineHeight: 1.1,
                }}
              >
                Check your inbox.
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 14px' }}>
                We sent <strong style={{ color: 'var(--text)' }}>{magnetTitle}</strong> to{' '}
                <strong style={{ color: 'var(--text)' }}>{email}</strong>. If it&rsquo;s not there in
                a few minutes, check spam &mdash; it&rsquo;s from team@mambahr.com.
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-faint)', lineHeight: 1.6, margin: 0 }}>
                Reply to that email if you want to talk to a founder.
              </p>
            </div>
          ) : (
            <>
              {/* PDF preview header — pinned */}
              <div className="magnet-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: 'var(--text)',
                      color: 'var(--bg-warm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: 12,
                    }}
                    aria-hidden="true"
                  >
                    M
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    MambaHR
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(24px, 5.5vw, 32px)',
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                    color: 'var(--text)',
                    margin: '0 0 12px',
                    lineHeight: 1.05,
                  }}
                >
                  {magnetTitle}
                </h3>
                <div style={{ width: 36, height: 2, background: 'var(--gold-dark)' }} />
              </div>

              {/* Body — scrolls if it overflows */}
              <div className="magnet-body">
                <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {magnetBlurb}
                </p>

                {whatsInside.length > 0 && (
                  <div style={{ marginBottom: 22 }}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: 'var(--text-faint)',
                        textTransform: 'uppercase',
                        margin: '0 0 10px',
                      }}
                    >
                      What&rsquo;s inside
                    </p>
                    <ul className="magnet-inside-grid">
                      {whatsInside.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            fontSize: 13,
                            color: 'var(--text)',
                            lineHeight: 1.45,
                          }}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 14 14"
                            fill="none"
                            style={{ flexShrink: 0, marginTop: 3 }}
                            aria-hidden="true"
                          >
                            <path
                              d="M2 7l4 4 6-6"
                              stroke="var(--gold-dark)"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <label htmlFor="magnet-name" style={labelStyle}>Your name</label>
                    <input
                      id="magnet-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Daisy Chen"
                      value={name}
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setShowTurnstile(true)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="magnet-email" style={labelStyle}>Work email</label>
                    <input
                      id="magnet-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="work@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setShowTurnstile(true)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="magnet-company" style={labelStyle}>Company</label>
                    <input
                      id="magnet-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  {showTurnstile && (
                    <div style={{ marginTop: 4 }}>
                      <Suspense fallback={null}>
                        <TurnstileWidget onSuccess={setToken} theme="light" />
                      </Suspense>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !token}
                    className="btn-gold"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      marginTop: 6,
                      opacity: status === 'loading' || !token ? 0.7 : 1,
                    }}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send me the PDF →'}
                  </button>

                  {status === 'error' && (
                    <p style={{ fontSize: 13, color: 'var(--color-red)', textAlign: 'center', margin: '4px 0 0' }}>
                      Something went wrong.{' '}
                      <a
                        href="mailto:hello@mambahr.com"
                        style={{ color: 'var(--color-red)', textDecoration: 'underline' }}
                      >
                        Email hello@mambahr.com
                      </a>
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: 11.5,
                      color: 'var(--text-faint)',
                      textAlign: 'center',
                      margin: '8px 0 0',
                      lineHeight: 1.55,
                    }}
                  >
                    We&rsquo;ll only email you the PDF and the occasional update. Unsubscribe any time.
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-faint)',
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--bg-surface)',
  fontSize: 14.5,
  color: 'var(--text)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-sans)',
}
