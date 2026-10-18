'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import TurnstileWidget from '@/components/turnstile-widget'
import { Em } from '@/components/v2/page-kit'
import { PARTNER_SHARE, TEAM_SIZES, companyFromEmail, emailDomain } from '@/content/early-access'
import { readAttribution } from '@/lib/attribution'
import { PassCard, Sky, Stage, shortDate } from './pass-card'
import s from './ea.module.css'

const noop = () => () => {}

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

export function Landing({ refCode, referrer }: { refCode: string | null; referrer: string | null }) {
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
  // The visitor's own date on the client; the server render says "Today".
  const today = useSyncExternalStore(noop, () => shortDate(new Date()), () => 'Today')

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
  const field = (f: Field) => (missing.includes(f) ? `${s.input} ${s.bad}` : s.input)
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
        body: JSON.stringify({ email: email.trim(), name: name.trim(), company: companyValue.trim(), teamSize, ref: refCode, attribution: readAttribution(), turnstileToken: t }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'That did not go through. Try again, or email hello@mambahr.com.')
        setStatus('error')
        return
      }
      if (data.status === 'joined' && data.pass) {
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

  const busy = status === 'sending' || status === 'waiting'
  const gift = referrer !== null

  return (
    <>
      <MegaNav />
      <main id="main" className={s.page}>
        <section className={s.hero}>
          <Sky />
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              {gift && (
                <p className={s.gift}>
                  <span className={s.giftDot} aria-hidden="true" />
                  <span>{referrer ? <><b>{referrer}</b> gave you a founding spot</> : <>A colleague gave you a founding spot</>}</span>
                </p>
              )}
              <p className={s.eyebrow}>Early access</p>
              <h1 className={s.title}>Get in <Em>early.</Em></h1>
              <p className={s.lead}>
                {gift
                  ? 'You skip the queue and keep founding customer pricing. Join the list and we’ll bring your team in with the next group.'
                  : 'We’re opening MambaHR to companies in small groups. Join the list, and your founding pricing is held until your group opens.'}
              </p>

              <form className={s.joinForm} onSubmit={onSubmit} noValidate>
                <label className={s.fieldL}>
                  <span className={s.lbl}>Work email</span>
                  <input
                    id="ea-email"
                    type="email"
                    className={field('email')}
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); edited() }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    aria-invalid={missing.includes('email') ? true : undefined}
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
                      value={name}
                      maxLength={80}
                      onChange={(e) => { setName(e.target.value); edited() }}
                      aria-invalid={missing.includes('name') ? true : undefined}
                      aria-describedby="ea-msg"
                    />
                  </label>
                  <label className={s.fieldL}>
                    <span className={s.lbl}>Company</span>
                    <input
                      className={field('company')}
                      placeholder="Northwind Trading"
                      autoComplete="organization"
                      value={companyValue}
                      maxLength={120}
                      onChange={(e) => { setCompany(e.target.value); setCompanyEdited(true); edited() }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      aria-invalid={missing.includes('company') ? true : undefined}
                      aria-describedby="ea-msg"
                    />
                  </label>
                </div>
                <fieldset className={s.fieldset} aria-describedby="ea-msg">
                  <legend className={s.lbl}>Employees</legend>
                  <div className={missing.includes('size') ? `${s.seg} ${s.segBad}` : s.seg}>
                    {TEAM_SIZES.map((o) => (
                      <label key={o.value} className={teamSize === o.value ? `${s.segO} ${s.on}` : s.segO}>
                        <input type="radio" name="ea-size" value={o.value} checked={teamSize === o.value} onChange={() => { setTeamSize(o.value); edited() }} />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className={`${s.join} ${s.joinWide}`} disabled={busy}>
                  {busy ? 'Joining…' : <>Join the list <span className={s.arrow} aria-hidden="true">→</span></>}
                </button>
                <div className={s.captcha}>
                  <TurnstileWidget onSuccess={onToken} theme="light" appearance="interaction-only" />
                </div>
                <div id="ea-msg" aria-live="polite">
                  {status === 'error' && <p className={`${s.msg} ${s.msgErr}`}>{error}</p>}
                  {status === 'exists' && (
                    <p className={`${s.msg} ${s.msgOk}`}>
                      {resent
                        ? <>You&rsquo;re already on the list. We&rsquo;ve sent your pass link to <b>{email.trim()}</b>.</>
                        : <>You&rsquo;re already on the list. Your pass link went to <b>{email.trim()}</b> earlier today. Check that inbox, including spam.</>}
                    </p>
                  )}
                </div>
              </form>
              {status !== 'error' && status !== 'exists' && (
                <p className={`${s.below} ${s.belowForm}`}>No call needed. Rather see it first? <Link href="/how-it-works">See how it works</Link></p>
              )}
            </div>

            <Stage>
              <div className={`${s.glass} ${s.cInvite}`} aria-hidden="true">
                <div className={s.mailRow}>
                  <span className={s.mailIcon}><i /></span>
                  <span className={s.mailText}>
                    <span className={s.mailFrom}>MambaHR · when your group opens</span>
                    <span className={s.mailSub}>You&rsquo;re in. Let&rsquo;s bring your team over.</span>
                  </span>
                </div>
              </div>
              <PassCard
                name={companyValue.trim() || null}
                sub={domain ?? 'Type your work email'}
                joined={today}
                code={null}
                typing={focused}
              />
              <div className={`${s.glass} ${s.cImport}`} aria-hidden="true">
                <div className={s.impTop}>
                  <span className={s.impFrom}>Records from BambooHR</span>
                  <span className={s.impTag}>Imported</span>
                </div>
                <div className={s.bar}><i /></div>
                <div className={s.impMeta}><span>84 employees</span><span>in a day</span></div>
              </div>
            </Stage>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>What happens next</p>
            <h2 className={s.h2}>Three moments, <Em>then it runs.</Em></h2>
            <div className={s.timeline}>
              <div className={s.moment}>
                <span className={s.when}>Today</span>
                <p className={s.what}>Your spot is held.</p>
                <p className={s.how}>Founding customer pricing is locked in for your company while you wait.</p>
                <div className={s.frag} aria-hidden="true">
                  <div className={s.fragLine}><span className={s.savedDot} /><span><b>Founding pricing</b> held for your company</span></div>
                </div>
              </div>
              <div className={s.moment}>
                <span className={s.when}>When your group opens</span>
                <p className={s.what}>Your records come over.</p>
                <p className={s.how}>From Gusto, BambooHR, Rippling, ADP or a spreadsheet, in a day. Nobody re-types anything.</p>
                <div className={s.frag} aria-hidden="true">
                  <div className={s.fragRow}><span>BambooHR</span><span className={s.fragArrow}>→</span><span>MambaHR</span><span className={s.fragOk}>84 records</span></div>
                  <div className={s.bar}><i /></div>
                </div>
              </div>
              <div className={s.moment}>
                <span className={s.when}>The next morning</span>
                <p className={s.what}>The admin starts moving.</p>
                <p className={s.how}>Ask in Slack or the request form. MambaHR does the work, and you approve what matters.</p>
                <div className={s.frag} aria-hidden="true">
                  <div className={s.slack}><span className={s.av}>PN</span><span><span className={s.at}>@MambaHR</span> Maya signed. She starts Monday.</span></div>
                  <div className={s.slack}><span className={`${s.av} ${s.avM}`}>M</span><span>Done. I-9 sent, accounts requested, and she&rsquo;s on Friday&rsquo;s payroll changes.</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTight}`}>
          <div className={s.wrap}>
            <div className={s.band}>
              <span className={s.field} aria-hidden="true">
                <i className={`${s.f} ${s.f1}`} />
                <i className={`${s.f} ${s.f2}`} />
                <i className={`${s.f} ${s.f3}`} />
                <i className={s.grain} />
              </span>
              <div>
                <h2 className={s.h2}>Give a founding spot.</h2>
                <p className={s.sub}>
                  Know another company buried in HR admin? Share your link. They skip the queue and get
                  founding pricing. You get a free month on your plan for every one that becomes a customer.
                </p>
                <p className={s.fine}>Your link is on your pass as soon as you join.</p>
              </div>
              <div className={`${s.glass} ${s.glassStatic} ${s.shareCard}`} aria-hidden="true">
                <span className={s.shareLabel}>Your link</span>
                <div className={s.linkRow}>
                  <span className={s.linkBox}>mambahr.com/r/7f2a1c4e</span>
                  <span className={`${s.btn} ${s.btnInk}`}>Copy</span>
                </div>
                <div className={s.shareRows}>
                  <div className={s.joinedRow}><span className={s.av}>N</span>Northwind Trading<span className={s.joinedMeta}>joined Oct 2</span></div>
                  <div className={s.joinedRow}><span className={`${s.av} ${s.av2}`}>H</span>Halcyon Labs<span className={s.joinedMeta}>joined Oct 5</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTight}`}>
          <div className={s.wrap}>
            <div className={s.strip}>
              <div className={s.stripLead}>
                <span className={s.stripArt} aria-hidden="true">
                  <span className={s.field}><i className={`${s.f} ${s.f1}`} /><i className={`${s.f} ${s.f2}`} /><i className={s.grain} /></span>
                  {PARTNER_SHARE}
                </span>
                <div>
                <p className={s.stripT}>Advise several companies?</p>
                <p className={s.stripS}>
                  Accountants, fractional CFOs and HR leads, and VC platform teams earn {PARTNER_SHARE} of the
                  first-year revenue of every company they bring to MambaHR.
                </p>
                </div>
              </div>
              <Link href="/partners" className={`${s.btn} ${s.btnGhost}`}>Become a partner</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
