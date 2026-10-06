'use client'

import { useEffect, useRef, useState } from 'react'
import TurnstileWidget from './turnstile-widget'
import { HANDOFFS, HR_SYSTEMS, TEAM_SIZES } from '@/content/early-access'

export interface EarlyAccessFields {
  email: string
  company: string
  teamSize: string
  hrSystem: string
  handoffs: string[]
  turnstileToken: string
}

// local@domain.tld: one @, a dotted domain, a 2+ letter TLD. Same as LeadForm.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

type Errors = Partial<Record<'email' | 'company' | 'teamSize' | 'hrSystem' | 'turnstile', string>>

interface Props {
  onSubmit: (fields: EarlyAccessFields) => Promise<void>
  error?: string
}

export function EarlyAccessForm({ onSubmit, error }: Props) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [hrSystem, setHrSystem] = useState('')
  const [handoffs, setHandoffs] = useState<string[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  // Turnstile loads on intent (first focus, or the form scrolling into view),
  // never on mount. Same rule as LeadForm.
  const [armed, setArmed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (armed) return
    const el = formRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      const t = setTimeout(() => setArmed(true), 0)
      return () => clearTimeout(t)
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

  function clear(key: keyof Errors) {
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  function toggleHandoff(v: string) {
    setHandoffs((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pending) return
    const next: Errors = {}
    if (!email.trim()) next.email = 'Enter your work email.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter an email address like you@company.com.'
    if (!company.trim()) next.company = 'Enter your company name.'
    if (!teamSize) next.teamSize = 'Choose your team size.'
    if (!hrSystem) next.hrSystem = 'Choose where your HR records live today.'
    if (!token) next.turnstile = 'Complete the verification check below, then submit again.'
    setErrors(next)
    const first = (['email', 'company', 'teamSize', 'hrSystem'] as const).find((k) => next[k])
    if (first) {
      document.getElementById(`ea-${first}`)?.focus()
      return
    }
    if (next.turnstile || !token) return
    setPending(true)
    try {
      await onSubmit({ email: email.trim(), company: company.trim(), teamSize, hrSystem, handoffs, turnstileToken: token })
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={() => setArmed(true)} noValidate>
        <div className="grid2">
          <div>
            <label htmlFor="ea-email" className="lbl">Work email</label>
            <input
              id="ea-email"
              type="email"
              className={errors.email ? 'inp bad' : 'inp'}
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clear('email') }}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'ea-email-err' : undefined}
            />
            {errors.email && <p id="ea-email-err" className="f-err" role="alert">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="ea-company" className="lbl">Company</label>
            <input
              id="ea-company"
              type="text"
              className={errors.company ? 'inp bad' : 'inp'}
              placeholder="Acme Inc."
              autoComplete="organization"
              value={company}
              onChange={(e) => { setCompany(e.target.value); clear('company') }}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? 'ea-company-err' : undefined}
            />
            {errors.company && <p id="ea-company-err" className="f-err" role="alert">{errors.company}</p>}
          </div>
        </div>

        <fieldset className="set" aria-describedby={errors.teamSize ? 'ea-teamSize-err' : undefined}>
          <legend className="lbl">Employees</legend>
          <div className="seg" id="ea-teamSize" tabIndex={-1}>
            {TEAM_SIZES.map((o) => (
              <label key={o.value} className={teamSize === o.value ? 'seg-o on' : 'seg-o'}>
                <input
                  type="radio"
                  name="teamSize"
                  value={o.value}
                  checked={teamSize === o.value}
                  onChange={() => { setTeamSize(o.value); clear('teamSize') }}
                />
                {o.label}
              </label>
            ))}
          </div>
          {errors.teamSize && <p id="ea-teamSize-err" className="f-err" role="alert">{errors.teamSize}</p>}
        </fieldset>

        <label htmlFor="ea-hrSystem" className="lbl">Where your HR records live today</label>
        <select
          id="ea-hrSystem"
          className={errors.hrSystem ? 'inp bad' : 'inp'}
          value={hrSystem}
          onChange={(e) => { setHrSystem(e.target.value); clear('hrSystem') }}
          aria-invalid={errors.hrSystem ? true : undefined}
          aria-describedby={errors.hrSystem ? 'ea-hrSystem-err' : undefined}
        >
          <option value="">Select…</option>
          {HR_SYSTEMS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.hrSystem && <p id="ea-hrSystem-err" className="f-err" role="alert">{errors.hrSystem}</p>}

        <fieldset className="set">
          <legend className="lbl lbl-row"><span>What would you hand off first?</span><span className="opt">Optional</span></legend>
          <div className="chips">
            {HANDOFFS.map((o) => {
              const on = handoffs.includes(o.value)
              return (
                <label key={o.value} className={on ? 'chip on' : 'chip'}>
                  <input type="checkbox" checked={on} onChange={() => toggleHandoff(o.value)} />
                  <span className="c-box" aria-hidden="true" />
                  {o.label}
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="ts">
          {armed && <TurnstileWidget onSuccess={(t) => { setToken(t); clear('turnstile') }} theme="light" />}
          {errors.turnstile && <p id="ea-ts-err" className="f-err" role="alert">{errors.turnstile}</p>}
        </div>
        <button type="submit" className="btn" disabled={pending} aria-describedby={errors.turnstile ? 'ea-ts-err' : undefined}>
          {pending ? 'Joining…' : 'Get early access'}
        </button>
        {error && <p className="err" role="alert">{error}</p>}
        <p className="fine">No call needed. We email you when your group opens.</p>
      </form>
      <style jsx>{`
        .lbl { display: block; font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 8px; padding: 0; }
        .lbl-row { display: flex; flex-wrap: wrap; column-gap: 8px; }
        .opt { font-weight: 500; letter-spacing: 0.08em; color: var(--text-faint); }
        .inp { width: 100%; box-sizing: border-box; padding: 14px 16px; margin-bottom: 18px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; font-size: 15px; font-family: var(--font-sans); color: var(--text); outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .inp:focus { border-color: var(--gold-dark); box-shadow: 0 0 0 3px var(--gold-tint); }
        .inp.bad { border-color: var(--color-red); margin-bottom: 6px; }
        .inp::placeholder { color: var(--text-faint); }
        .inp:-webkit-autofill, .inp:-webkit-autofill:hover, .inp:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 1000px var(--bg) inset !important; -webkit-text-fill-color: var(--text) !important; transition: background-color 5000s ease-in-out 0s; }
        select.inp { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%237A7A75' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; cursor: pointer; }
        .f-err { font-size: 13px; color: var(--color-red); margin: 0 0 14px; }
        .ts .f-err { margin: 0; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
        @media (max-width: 480px) { .grid2 { grid-template-columns: 1fr; } }

        .set { border: 0; margin: 0 0 18px; padding: 0; min-width: 0; }
        .set .f-err { margin: 6px 0 0; }

        .seg { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 4px; background: var(--bg-warm); border: 1px solid var(--border); border-radius: 12px; outline: none; }
        .seg:focus-visible { box-shadow: 0 0 0 3px var(--gold-tint); }
        .seg-o { position: relative; display: flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 6px; border-radius: 9px; font-size: 14px; color: var(--text-muted); cursor: pointer; text-align: center; transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease; }
        .seg-o:hover { color: var(--text); }
        .seg-o.on { background: var(--bg); color: var(--text); font-weight: 600; box-shadow: 0 1px 2px rgba(20, 18, 14, 0.08), 0 4px 12px -4px rgba(20, 18, 14, 0.12); }
        .seg-o input, .chip input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; pointer-events: none; }
        .seg-o:has(input:focus-visible), .chip:has(input:focus-visible) { outline: 2px solid var(--gold-dark); outline-offset: 2px; }
        @media (max-width: 480px) { .seg { grid-template-columns: repeat(2, 1fr); } }

        .chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip { position: relative; display: inline-flex; align-items: center; gap: 8px; min-height: 38px; padding: 0 14px 0 11px; border: 1px solid var(--border); border-radius: 999px; background: var(--bg); font-size: 14px; color: var(--text-muted); cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease; }
        .chip:hover { border-color: var(--border-mid); color: var(--text); }
        .chip.on { border-color: rgba(138, 101, 53, 0.45); background: var(--gold-tint); color: var(--text); }
        .c-box { position: relative; flex: none; width: 15px; height: 15px; border-radius: 5px; border: 1.5px solid var(--border-mid); background: var(--bg); transition: background 0.15s ease, border-color 0.15s ease; }
        .chip.on .c-box { background: var(--gold-dark); border-color: var(--gold-dark); }
        .chip.on .c-box::after { content: ''; position: absolute; left: 4px; top: 1px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }

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
