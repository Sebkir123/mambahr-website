'use client'

import { useEffect, useRef, useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import TurnstileWidget from '@/components/turnstile-widget'
import { Em } from '@/components/v2/page-kit'
import { ROLES, GENERAL_APPLICATION } from '@/content/careers'

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/
const NOTE_MAX = 2000

type Errors = { name?: string; email?: string; link?: string; note?: string; turnstile?: string }

export default function CareersPage() {
  const [role, setRole] = useState(GENERAL_APPLICATION)

  function applyFor(title: string) {
    setRole(title)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => document.getElementById('cf-name')?.focus({ preventScroll: true }), 450)
  }

  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <section className="hero">
          <div className="wrap">
            <p className="eyebrow" data-reveal="eager">Careers</p>
            <h1 className="title" data-reveal="eager">Build HR software that <Em>does the work.</Em></h1>
            <p className="lead" data-reveal="eager">
              We&rsquo;re a small team. If you&rsquo;d like to help HR teams spend less time on admin
              and more time on people, tell us about yourself.
            </p>
            <a className="btn btn-primary" href="#apply" data-reveal="eager">Apply</a>
          </div>
        </section>

        {ROLES.length > 0 && (
          <section className="roles">
            <div className="wrap">
              <h2 className="h2" data-reveal>Open roles</h2>
              <ul className="list">
                {ROLES.map((r) => (
                  <li key={r.id} className="role" data-reveal>
                    <div className="r-main">
                      <p className="r-t">{r.title}</p>
                      <p className="r-m">{r.team} · {r.location} · {r.type}</p>
                      <p className="r-s">{r.summary}</p>
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={() => applyFor(r.title)}>Apply</button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="apply" id="apply">
          <div className="stage">
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
            <div className="copy">
              <h2 className="h2">Apply</h2>
              <p className="p">
                Tell us who you are and what you&rsquo;d like to work on. A link to your LinkedIn,
                GitHub or past work helps.
              </p>
            </div>
            <div className="card">
              <CareersForm role={role} onRoleChange={setRole} />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .wrap { max-width: 1180px; margin: 0 auto; }
        .hero { padding: clamp(128px, 14vw, 176px) var(--page-pad) clamp(48px, 6vw, 72px); background: var(--bg); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 20px; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(44px, 6.4vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.045em;
          color: var(--text);
          margin: 0;
          max-width: 14ch;
          text-wrap: balance;
        }
        .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 52ch; margin: 26px 0 30px; }

        .roles { padding: 0 var(--page-pad) clamp(48px, 6vw, 72px); background: var(--bg); }
        .h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); letter-spacing: -0.03em; color: var(--text); margin: 0 0 20px; }
        .list { list-style: none; margin: 0; padding: 0; display: grid; gap: clamp(12px, 1.6vw, 16px); }
        .role { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: clamp(20px, 2.4vw, 28px); background: var(--bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .r-t { margin: 0; font-family: var(--font-serif); font-size: 24px; letter-spacing: -0.01em; color: var(--text); }
        .r-m { margin: 4px 0 0; font-size: 14px; color: var(--text-faint); }
        .r-s { margin: 10px 0 0; font-size: 15.5px; line-height: 1.55; color: var(--text-muted); max-width: 64ch; }

        .apply { padding: 0 var(--page-pad) clamp(72px, 9vw, 112px); background: var(--bg); scroll-margin-top: 80px; }
        .stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          max-width: 1320px;
          margin: 0 auto;
          border-radius: var(--radius-xl);
          padding: clamp(32px, 6vw, 72px);
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: clamp(24px, 5vw, 64px);
          align-items: start;
          background: var(--stage-field);
        }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
        .copy .p { margin: 0; font-size: 17px; line-height: 1.6; color: var(--text-muted); max-width: 34ch; }
        .card {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: clamp(20px, 3vw, 32px);
          box-shadow: var(--shadow-float);
        }
        @media (max-width: 860px) {
          .stage { grid-template-columns: 1fr; }
          .role { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  )
}

function CareersForm({ role, onRoleChange }: { role: string; onRoleChange: (r: string) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')
  const [note, setNote] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  // Turnstile loads on intent (first focus or the form scrolling near view), like the demo form.
  const [armed, setArmed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (armed) return
    const el = formRef.current
    if (!el || !('IntersectionObserver' in window)) { setArmed(true); return }
    const io = new IntersectionObserver((en) => {
      if (en.some((e) => e.isIntersecting)) { setArmed(true); io.disconnect() }
    }, { rootMargin: '0px 0px 300px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [armed])

  function validate(): Errors {
    const e: Errors = {}
    if (!name.trim()) e.name = 'Enter your name.'
    if (!email.trim()) e.email = 'Enter your email address.'
    else if (!EMAIL_RE.test(email.trim())) e.email = 'Enter an email address like you@example.com.'
    if (link.trim() && !/^https?:\/\/\S+\.\S+/i.test(link.trim())) e.link = 'Links need to start with https://'
    if (note.trim().length < 20) e.note = 'Tell us a little more: at least a couple of sentences.'
    if (!token) e.turnstile = 'Complete the verification check, then send again.'
    return e
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    if (status === 'sending') return
    const e = validate()
    setErrors(e)
    const first = (['name', 'email', 'link', 'note'] as const).find((k) => e[k])
    if (first) { document.getElementById(`cf-${first}`)?.focus(); return }
    if (e.turnstile) return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), link: link.trim(), note: note.trim(), role, turnstileToken: token }),
      })
      if (res.ok) { setStatus('sent'); return }
      const data = await res.json().catch(() => null)
      setServerError(data?.error || 'Your application did not go through. Try again, or email hello@mambahr.com.')
      setStatus('error')
    } catch {
      setServerError('Your application did not go through. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="done" role="status">
        <p className="d-t">Thanks, {name.split(' ')[0] || name}.</p>
        <p className="d-s">Your application is with the team. We sent a copy to {email}, and we will reply by email.</p>
        <style jsx>{`
          .d-t { margin: 0; font-family: var(--font-serif); font-size: 30px; letter-spacing: -0.02em; color: var(--text); }
          .d-s { margin: 10px 0 0; font-size: 16px; line-height: 1.6; color: var(--text-muted); }
        `}</style>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={submit} onFocusCapture={() => setArmed(true)} noValidate>
      <div className="row2">
        <Field id="cf-name" label="Full name" error={errors.name}>
          <input id="cf-name" className={errors.name ? 'inp bad' : 'inp'} autoComplete="name" value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })) }}
            aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        </Field>
        <Field id="cf-email" label="Email" error={errors.email}>
          <input id="cf-email" type="email" className={errors.email ? 'inp bad' : 'inp'} autoComplete="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })) }}
            aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        </Field>
      </div>
      <Field id="cf-link" label="LinkedIn, GitHub or website (optional)" error={errors.link}>
        <input id="cf-link" type="url" className={errors.link ? 'inp bad' : 'inp'} placeholder="https://" value={link}
          onChange={(e) => { setLink(e.target.value); if (errors.link) setErrors((p) => ({ ...p, link: undefined })) }}
          aria-invalid={errors.link ? true : undefined} aria-describedby={errors.link ? 'cf-link-err' : undefined} />
      </Field>
      {ROLES.length > 0 && (
        <Field id="cf-role" label="Role">
          <select id="cf-role" className="inp" value={role} onChange={(e) => onRoleChange(e.target.value)}>
            {ROLES.map((r) => <option key={r.id} value={r.title}>{r.title}</option>)}
            <option value={GENERAL_APPLICATION}>{GENERAL_APPLICATION}</option>
          </select>
        </Field>
      )}
      <Field id="cf-note" label="What would you like to work on?" error={errors.note} hint={`${note.length} / ${NOTE_MAX}`}>
        <textarea id="cf-note" className={errors.note ? 'inp ta bad' : 'inp ta'} rows={6} maxLength={NOTE_MAX} value={note}
          onChange={(e) => { setNote(e.target.value); if (errors.note) setErrors((p) => ({ ...p, note: undefined })) }}
          aria-invalid={errors.note ? true : undefined} aria-describedby={errors.note ? 'cf-note-err' : undefined} />
      </Field>
      <div className="ts">
        {armed && <TurnstileWidget onSuccess={(t) => { setToken(t); setErrors((p) => ({ ...p, turnstile: undefined })) }} theme="light" />}
        {errors.turnstile && <p className="f-err" role="alert">{errors.turnstile}</p>}
      </div>
      <button type="submit" className="send" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send application'}
      </button>
      {status === 'error' && <p className="s-err" role="alert">{serverError}</p>}

      <style jsx>{`
        .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
        .ts { min-height: 65px; margin: 4px 0 14px; }
        .f-err { font-size: 13px; color: var(--color-red); margin: 6px 0 0; }
        .send {
          width: 100%;
          height: 52px;
          border: 0;
          border-radius: var(--radius-full);
          background: var(--text);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: transform 0.15s ease;
        }
        .send:hover:not(:disabled) { transform: translateY(-1px); }
        .send:disabled { opacity: 0.55; cursor: not-allowed; }
        .send:focus-visible { outline: 2px solid var(--violet); outline-offset: 3px; }
        .s-err { font-size: 14px; color: var(--color-red); margin: 12px 0 0; text-align: center; }
        @media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  )
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="fld">
      <div className="top">
        <label htmlFor={id} className="lbl">{label}</label>
        {hint && <span className="hint">{hint}</span>}
      </div>
      {children}
      {error && <p id={`${id}-err`} className="err" role="alert">{error}</p>}
      <style jsx>{`
        .fld { margin-bottom: 16px; }
        .top { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 7px; }
        .lbl { font-size: 14px; font-weight: 600; color: var(--text); }
        .hint { font-size: 12.5px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
        .err { font-size: 13px; color: var(--color-red); margin: 6px 0 0; }
        .fld :global(.inp) {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 15px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.45);
          border-radius: var(--radius-md);
          font: inherit;
          font-size: 15px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .fld :global(.inp:focus) { border-color: var(--text); box-shadow: 0 0 0 3px var(--gold-tint); }
        .fld :global(.inp.bad) { border-color: var(--color-red); }
        .fld :global(.ta) { resize: vertical; min-height: 140px; line-height: 1.55; }
      `}</style>
    </div>
  )
}
