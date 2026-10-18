'use client'

import { useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import TurnstileWidget from '@/components/turnstile-widget'
import { Em } from '@/components/v2/page-kit'
import { COMPANIES_ADVISED, PARTNER_SHARE, PARTNER_TYPES } from '@/content/early-access'
import { Sky, Stage } from '../early-access/_parts/pass-card'
import s from '../early-access/_parts/ea.module.css'

// The worked example on the stage: HR Ops Manager list price ($22 per employee
// per month, src/content/pricing-tiers.ts) for an 80-person client.
const EXAMPLE = { employees: 80, perEmployee: 22 }
const yearly = EXAMPLE.employees * EXAMPLE.perEmployee * 12
const earned = Math.round(yearly * (parseInt(PARTNER_SHARE, 10) / 100))
const usd = (n: number) => `$${n.toLocaleString('en-US')}`

const WHO = [
  {
    t: 'Accountants and bookkeepers',
    d: 'Your clients’ HR paperwork stops landing on your desk at month end, and payroll changes arrive clean.',
  },
  {
    t: 'Fractional CFOs and HR leads',
    d: 'MambaHR does the admin for each client, so you can take on more clients and spend your hours on advice.',
  },
  {
    t: 'VC and accelerator platform teams',
    d: 'Give every portfolio company founding pricing and an HR setup that holds up from the first hire.',
  },
]

export default function PartnersPage() {
  return (
    <>
      <MegaNav />
      <main id="main" className={s.page}>
        <section className={s.hero}>
          <Sky />
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>Partner program</p>
              <h1 className={`${s.title} ${s.titleSm}`}>Bring MambaHR to the companies <Em>you advise.</Em></h1>
              <p className={s.lead}>
                Your clients get their HR admin done for them, at founding customer pricing. You earn
                <b> {PARTNER_SHARE} of their first-year revenue</b>.
              </p>
              <div className={s.btnRow} style={{ marginTop: 32 }}>
                <a href="#apply" className={`${s.btn} ${s.btnInk}`} style={{ height: 52, padding: '0 26px', fontSize: 16 }}>Apply to partner</a>
              </div>
            </div>
            <Stage>
              <div className={`${s.glass} ${s.glassStatic} ${s.math}`}>
                <span className={s.mathT}>What {PARTNER_SHARE} looks like</span>
                <div className={s.mathRow}><span>A client with</span><b>{EXAMPLE.employees} employees</b></div>
                <div className={s.mathRow}><span>On HR Ops Manager</span><b>{usd(EXAMPLE.perEmployee)} / employee / month</b></div>
                <div className={s.mathRow}><span>Their first year</span><b>{usd(yearly)}</b></div>
                <div className={s.mathTotal}><span>You earn</span><b>{usd(earned)}</b></div>
              </div>
            </Stage>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTight}`}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Who it&rsquo;s for</p>
            <h2 className={s.h2}>People companies already <Em>ask about HR.</Em></h2>
            <div className={s.whoGrid}>
              {WHO.map((w) => (
                <div key={w.t} className={`${s.card} ${s.who}`}>
                  <p className={s.whoT}>{w.t}</p>
                  <p className={s.whoS}>{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTight}`} id="apply">
          <div className={`${s.wrap} ${s.applyGrid}`}>
            <div>
              <p className={s.eyebrow}>How it works</p>
              <h2 className={s.h2}>Apply once. <Em>Earn on every client.</Em></h2>
              <ol className={s.steps}>
                <li><span className={s.stepN}>1</span><div><p className={s.stepT}>Apply</p><p className={s.stepS}>Tell us about your practice. We read every application ourselves.</p></div></li>
                <li><span className={s.stepN}>2</span><div><p className={s.stepT}>Get your partner link</p><p className={s.stepS}>Within two business days, with the partner terms. Clients who join through it get founding pricing.</p></div></li>
                <li><span className={s.stepN}>3</span><div><p className={s.stepT}>Earn when they pay</p><p className={s.stepS}>{PARTNER_SHARE} of each client&rsquo;s first-year revenue, paid quarterly once the client has paid.</p></div></li>
              </ol>
            </div>
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ApplyForm() {
  const [f, setF] = useState({ name: '', email: '', firm: '', partnerType: '', companiesAdvised: '', note: '' })
  const [token, setToken] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!f.name.trim() || !f.email.trim() || !f.firm.trim() || !f.partnerType) {
      setError('Add your name, work email, firm and what you do.')
      return
    }
    if (!token) { setError('One moment, the security check is still loading. Try again in a second.'); return }
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, turnstileToken: token }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'That did not go through. Try again.'); setState('idle'); return }
      setState('done')
    } catch {
      setError('That did not go through. Check your connection and try again.')
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <div className={s.card}>
        <span className={s.saved}><span className={s.savedDot} aria-hidden="true" />Application received</span>
        <h3 className={s.cardT} style={{ marginTop: 16 }}>Thanks, {f.name.split(' ')[0]}.</h3>
        <p className={s.cardS}>We&rsquo;ll reply to {f.email} within two business days with your partner link and the terms.</p>
      </div>
    )
  }

  return (
    <form className={s.card} onSubmit={submit} noValidate>
      <h3 className={s.cardT}>Apply to partner</h3>
      <div className={s.form}>
        <div className={s.row2}>
          <label className={s.fieldL}><span className={s.lbl}>Your name</span><input className={s.input} value={f.name} onChange={set('name')} autoComplete="name" placeholder="Jane Doe" /></label>
          <label className={s.fieldL}><span className={s.lbl}>Work email</span><input className={s.input} type="email" value={f.email} onChange={set('email')} autoComplete="email" placeholder="jane@firm.com" /></label>
        </div>
        <div className={s.row2}>
          <label className={s.fieldL}><span className={s.lbl}>Firm</span><input className={s.input} value={f.firm} onChange={set('firm')} autoComplete="organization" placeholder="Doe Advisory" /></label>
          <label className={s.fieldL}>
            <span className={s.lbl}>What you do</span>
            <select className={s.input} value={f.partnerType} onChange={set('partnerType')}>
              <option value="">Choose…</option>
              {PARTNER_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>
        <fieldset className={s.fieldset}>
          <legend className={s.lbl}>Companies you advise<span className={s.opt}>Optional</span></legend>
          <div className={s.seg}>
            {COMPANIES_ADVISED.map((o) => (
              <label key={o.value} className={f.companiesAdvised === o.value ? `${s.segO} ${s.on}` : s.segO}>
                <input type="radio" name="advised" value={o.value} checked={f.companiesAdvised === o.value} onChange={set('companiesAdvised')} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className={s.fieldL}><span className={s.lbl}>Anything we should know<span className={s.opt}>Optional</span></span><textarea className={s.input} value={f.note} onChange={set('note')} placeholder="The kinds of companies you work with, and what HR work they ask you about." /></label>
        <TurnstileWidget onSuccess={setToken} theme="light" appearance="interaction-only" />
        {error && <p className={s.err} role="alert">{error}</p>}
        <div><button type="submit" className={`${s.btn} ${s.btnInk}`} disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send application'}</button></div>
      </div>
    </form>
  )
}
