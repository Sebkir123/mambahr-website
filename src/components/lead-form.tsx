'use client'

import { useEffect, useRef, useState } from 'react'
import TurnstileWidget from './turnstile-widget'

export interface LeadFormFields {
  name: string
  email: string
  company: string
  companyStage: string
  turnstileToken: string
}

// local@domain.tld: one @, a dotted domain, a 2+ letter TLD.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

interface FieldErrors {
  name?: string
  email?: string
  turnstile?: string
}

interface Props {
  onSubmit: (fields: LeadFormFields) => Promise<void>
  submitLabel?: string
  pendingLabel?: string
  note?: string
  error?: string
  stageOptions?: string[]
  stageLabel?: string
}

export function LeadForm({
  onSubmit,
  submitLabel = 'Submit',
  pendingLabel = 'Sending…',
  note,
  error,
  stageOptions,
  stageLabel = 'Company size',
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [stage, setStage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  // Turnstile (about 500 KB across five requests) loads on intent: the first
  // focus on any field, or the form scrolling into view. Never on mount.
  const [armed, setArmed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (armed) return
    const el = formRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setArmed(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px 200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [armed])

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Enter your name.'
    if (!email.trim()) next.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter an email address like you@company.com.'
    if (!token) next.turnstile = 'Complete the verification check below, then submit again.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pending) return
    const next = validate()
    setErrors(next)
    if (next.name || next.email) {
      const id = next.name ? 'lf-name' : 'lf-email'
      document.getElementById(id)?.focus()
      return
    }
    if (next.turnstile || !token) return
    setPending(true)
    try {
      await onSubmit({ name: name.trim(), email: email.trim(), company, companyStage: stage, turnstileToken: token })
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={() => setArmed(true)} noValidate>
        <label htmlFor="lf-name" className="lbl">Full name</label>
        <input
          id="lf-name"
          type="text"
          required
          className={errors.name ? 'inp bad' : 'inp'}
          placeholder="Jane Doe"
          autoComplete="name"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })) }}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'lf-name-err' : undefined}
        />
        {errors.name && <p id="lf-name-err" className="f-err" role="alert">{errors.name}</p>}
        <label htmlFor="lf-email" className="lbl">Work email</label>
        <input
          id="lf-email"
          type="email"
          required
          className={errors.email ? 'inp bad' : 'inp'}
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })) }}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'lf-email-err' : undefined}
        />
        {errors.email && <p id="lf-email-err" className="f-err" role="alert">{errors.email}</p>}
        {stageOptions && stageOptions.length > 0 ? (
          <div className="grid2">
            <div>
              <label htmlFor="lf-company" className="lbl">Company</label>
              <input
                id="lf-company"
                type="text"
                className="inp"
                placeholder="Acme Inc."
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lf-stage" className="lbl">{stageLabel}</label>
              <select
                id="lf-stage"
                className="inp"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="">Select…</option>
                {stageOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <label htmlFor="lf-company" className="lbl">Company</label>
            <input
              id="lf-company"
              type="text"
              className="inp"
              placeholder="Acme Inc."
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </>
        )}
        <div className="ts">
          {armed && <TurnstileWidget onSuccess={(t) => { setToken(t); setErrors((p) => ({ ...p, turnstile: undefined })) }} theme="light" />}
          {errors.turnstile && <p id="lf-ts-err" className="f-err" role="alert">{errors.turnstile}</p>}
        </div>
        <button
          type="submit"
          className="btn"
          disabled={pending}
          aria-describedby={errors.turnstile ? 'lf-ts-err' : undefined}
        >
          {pending ? pendingLabel : submitLabel}
        </button>
        {error && <p className="err" role="alert">{error}</p>}
        {note && <p className="fine">{note}</p>}
      </form>
      <style jsx>{`
        .lbl { display: block; font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 8px; }
        .inp { width: 100%; box-sizing: border-box; padding: 14px 16px; margin-bottom: 18px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; font-size: 15px; font-family: var(--font-sans); color: var(--text); outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .inp:focus { border-color: var(--gold-dark); box-shadow: 0 0 0 3px var(--gold-tint); }
        .inp.bad { border-color: var(--color-red); margin-bottom: 6px; }
        .f-err { font-size: 13px; color: var(--color-red); margin: 0 0 14px; }
        .ts .f-err { margin: 0; }
        .inp::placeholder { color: var(--text-faint); }
        .inp:-webkit-autofill, .inp:-webkit-autofill:hover, .inp:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 1000px var(--bg) inset !important; -webkit-text-fill-color: var(--text) !important; transition: background-color 5000s ease-in-out 0s; }
        select.inp { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%237A7A75' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; cursor: pointer; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
        @media (max-width: 480px) { .grid2 { grid-template-columns: 1fr; } }
        .ts { min-height: 65px; margin-bottom: 16px; }
        .btn { width: 100%; padding: 15px 24px; background: #1A1A19; color: #fff; font-weight: 600; font-size: 16px; border: none; border-radius: 999px; cursor: pointer; box-shadow: 0 12px 26px rgba(20,18,14,0.2); transition: transform 0.15s ease, background 0.15s ease; }
        .btn:hover:not(:disabled) { transform: translateY(-2px); background: #2A2A28; }
        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.45; cursor: not-allowed; }
        @media (prefers-reduced-motion: reduce) { .btn:hover:not(:disabled) { transform: none; } }
        .err { font-size: 13px; color: var(--color-red); text-align: center; margin: 14px 0 0; }
        .fine { font-size: 12px; color: var(--text-faint); text-align: center; margin: 16px 0 0; }
      `}</style>
    </>
  )
}
