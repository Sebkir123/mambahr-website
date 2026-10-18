'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import TurnstileWidget from '@/components/turnstile-widget'
import { TEAM_SIZES, companyFromEmail, emailDomain } from '@/content/early-access'
import { readAttribution } from '@/lib/attribution'
import s from './ea.module.css'

// The early access form, shared by /early-access and the ad landing pages so
// every signup takes the same path: the same checks, the same security check,
// the ad that brought it, and the pass page after.

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

type Status = 'idle' | 'waiting' | 'sending' | 'exists' | 'error'
type Field = 'email' | 'name' | 'company' | 'size'

// What a missing field is called in the one-line error.
const ASK: Record<Field, string> = { email: 'your work email', name: 'your name', company: 'your company', size: 'how many people work there' }
function missingSentence(fields: Field[]): string {
  if (fields.length === 1 && fields[0] === 'email') return 'Enter your work email, like you@company.com.'
  const words = fields.map((f) => ASK[f])
  const list = words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}` : words[0]
  return `Add ${list}.`
}

/**
 * The form's state. `form` names the page in Google Analytics' generate_lead
 * event ("early_access", "ad_hourly", "ad_startups").
 */
export function useJoinForm({ refCode, form }: { refCode: string | null; form: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  // The company fills itself in from a work email's domain until it is edited.
  const [company, setCompany] = useState('')
  const [companyEdited, setCompanyEdited] = useState(false)
  const [teamSize, setTeamSize] = useState('')
  // After the first try, a field is marked while it is still empty or wrong.
  const [tried, setTried] = useState(false)
  const [focused, setFocused] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  // Already on the list: false when the pass link was resent too often today.
  const [resent, setResent] = useState(true)

  const guessed = companyFromEmail(email)
  const companyValue = companyEdited ? company : (guessed ?? company)
  const domain = emailDomain(email)
  const gaps: Field[] = [
    ...(!EMAIL_RE.test(email.trim()) ? (['email'] as const) : []),
    ...(!name.trim() ? (['name'] as const) : []),
    ...(!companyValue.trim() ? (['company'] as const) : []),
    ...(!teamSize ? (['size'] as const) : []),
  ]
  const missing = tried ? gaps : []
  const edited = () => {
    if (status === 'error' || status === 'exists') setStatus('idle')
  }

  async function send(t: string) {
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), company: companyValue.trim(), teamSize, ref: refCode, page: window.location.pathname, attribution: readAttribution(), turnstileToken: t }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'That did not go through. Try again, or email hello@mambahr.com.')
        setStatus('error')
        return
      }
      if (data.status === 'joined' && data.pass) {
        // Google Analytics, when it is loaded (never for a visitor sending GPC or
        // Do Not Track): the signup as a lead, to mark as a key event in GA.
        ;(window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'generate_lead', { form, team_size: teamSize })
        router.push(`/early-access/pass/${data.pass}?welcome=1`)
        return
      }
      setResent(data.sent !== false)
      setStatus('exists')
    } catch {
      setError('That did not go through. Check your connection and try again.')
      setStatus('error')
    }
  }

  // Submitted before the invisible security check finished: send the moment it does.
  const waiting = useRef(false)
  function onToken(t: string) {
    setToken(t)
    if (waiting.current) {
      waiting.current = false
      void send(t)
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending' || status === 'waiting') return
    setTried(true)
    if (gaps.length) {
      setError(missingSentence(gaps))
      setStatus('error')
      return
    }
    if (token) void send(token)
    else {
      waiting.current = true
      setStatus('waiting')
    }
  }

  return {
    email, setEmail, name, setName, setCompany, setCompanyEdited, teamSize, setTeamSize,
    companyValue, domain, focused, setFocused, status, error, resent, missing, edited, onSubmit, onToken,
  }
}

export type JoinFormState = ReturnType<typeof useJoinForm>

export function JoinForm({ f }: { f: JoinFormState }) {
  const field = (k: Field) => (f.missing.includes(k) ? `${s.input} ${s.bad}` : s.input)
  const busy = f.status === 'sending' || f.status === 'waiting'
  return (
    <form className={s.joinForm} onSubmit={f.onSubmit} noValidate>
      <label className={s.fieldL}>
        <span className={s.lbl}>Work email</span>
        <input
          id="ea-email"
          type="email"
          className={field('email')}
          placeholder="you@company.com"
          autoComplete="email"
          value={f.email}
          onChange={(e) => { f.setEmail(e.target.value); f.edited() }}
          onFocus={() => f.setFocused(true)}
          onBlur={() => f.setFocused(false)}
          aria-invalid={f.missing.includes('email') ? true : undefined}
          aria-describedby="ea-msg"
        />
      </label>
      <div className={s.row2}>
        <label className={s.fieldL}>
          <span className={s.lbl}>Your name</span>
          <input
            className={field('name')}
            placeholder="Dana Whitfield"
            autoComplete="name"
            value={f.name}
            maxLength={80}
            onChange={(e) => { f.setName(e.target.value); f.edited() }}
            aria-invalid={f.missing.includes('name') ? true : undefined}
            aria-describedby="ea-msg"
          />
        </label>
        <label className={s.fieldL}>
          <span className={s.lbl}>Company</span>
          <input
            className={field('company')}
            placeholder="Northwind Trading"
            autoComplete="organization"
            value={f.companyValue}
            maxLength={120}
            onChange={(e) => { f.setCompany(e.target.value); f.setCompanyEdited(true); f.edited() }}
            onFocus={() => f.setFocused(true)}
            onBlur={() => f.setFocused(false)}
            aria-invalid={f.missing.includes('company') ? true : undefined}
            aria-describedby="ea-msg"
          />
        </label>
      </div>
      <fieldset className={s.fieldset} aria-describedby="ea-msg">
        <legend className={s.lbl}>Employees</legend>
        <div className={f.missing.includes('size') ? `${s.seg} ${s.segBad}` : s.seg}>
          {TEAM_SIZES.map((o) => (
            <label key={o.value} className={f.teamSize === o.value ? `${s.segO} ${s.on}` : s.segO}>
              <input type="radio" name="ea-size" value={o.value} checked={f.teamSize === o.value} onChange={() => { f.setTeamSize(o.value); f.edited() }} />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className={`${s.join} ${s.joinWide}`} disabled={busy}>
        {busy ? 'Joining…' : <>Join the list <span className={s.arrow} aria-hidden="true">→</span></>}
      </button>
      <div className={s.captcha}>
        <TurnstileWidget onSuccess={f.onToken} theme="light" appearance="interaction-only" />
      </div>
      <div id="ea-msg" aria-live="polite">
        {f.status === 'error' && <p className={`${s.msg} ${s.msgErr}`}>{f.error}</p>}
        {f.status === 'exists' && (
          <p className={`${s.msg} ${s.msgOk}`}>
            {f.resent
              ? <>You&rsquo;re already on the list. We&rsquo;ve sent your pass link to <b>{f.email.trim()}</b>.</>
              : <>You&rsquo;re already on the list. Your pass link went to <b>{f.email.trim()}</b> earlier today. Check that inbox, including spam.</>}
          </p>
        )}
      </div>
    </form>
  )
}
