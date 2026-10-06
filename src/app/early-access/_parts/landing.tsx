'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import TurnstileWidget from '@/components/turnstile-widget'
import { Em } from '@/components/v2/page-kit'
import { DEMO_HREF } from '@/content/cta'
import { PARTNER_SHARE, companyFromEmail, emailDomain } from '@/content/early-access'
import { PassCard, Sky, Stage, shortDate } from './pass-card'
import s from './ea.module.css'

const noop = () => () => {}

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

type Status = 'idle' | 'waiting' | 'sending' | 'exists' | 'error'

export function Landing({ refCode, referrer }: { refCode: string | null; referrer: string | null }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  // The visitor's own date on the client; the server render says "Today".
  const today = useSyncExternalStore(noop, () => shortDate(new Date()), () => 'Today')

  async function send(t: string) {
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), ref: refCode, turnstileToken: t }),
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
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter your work email, like you@company.com.')
      setStatus('error')
      return
    }
    if (token) void send(token)
    else {
      waiting.current = true
      setStatus('waiting')
    }
  }

  const company = companyFromEmail(email)
  const domain = emailDomain(email)
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
                  ? 'You skip the queue and keep founding customer pricing. Join with your work email and we’ll bring your team in with the next group.'
                  : 'We’re opening MambaHR to companies in small groups. Join with your work email, and your founding pricing is held until your group opens.'}
              </p>

              <form onSubmit={onSubmit} noValidate>
                <div className={status === 'error' ? `${s.capsule} ${s.bad}` : s.capsule}>
                  <label htmlFor="ea-email" className={s.srOnly}>Work email</label>
                  <input
                    id="ea-email"
                    type="email"
                    className={s.capsuleInput}
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === 'error' || status === 'exists') setStatus('idle') }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    aria-invalid={status === 'error' ? true : undefined}
                    aria-describedby="ea-msg"
                  />
                  <button type="submit" className={s.join} disabled={busy}>
                    {busy ? 'Joining…' : <>Join the list <span className={s.arrow} aria-hidden="true">→</span></>}
                  </button>
                </div>
                <div className={s.captcha}>
                  <TurnstileWidget onSuccess={onToken} theme="light" appearance="interaction-only" />
                </div>
                <div id="ea-msg" aria-live="polite">
                  {status === 'error' && <p className={`${s.msg} ${s.msgErr}`}>{error}</p>}
                  {status === 'exists' && (
                    <p className={`${s.msg} ${s.msgOk}`}>
                      You&rsquo;re already on the list. We&rsquo;ve sent your pass link to <b>{email.trim()}</b>.
                    </p>
                  )}
                </div>
              </form>
              {status !== 'error' && status !== 'exists' && (
                <p className={s.below}>No call needed. Rather see it first? <Link href={DEMO_HREF}>Book a demo</Link></p>
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
                name={company}
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
              </div>
              <div className={s.moment}>
                <span className={s.when}>When your group opens</span>
                <p className={s.what}>Your records come over.</p>
                <p className={s.how}>From Gusto, BambooHR, Rippling, ADP or a spreadsheet, in a day. Nobody re-types anything.</p>
              </div>
              <div className={s.moment}>
                <span className={s.when}>The next morning</span>
                <p className={s.what}>The admin starts moving.</p>
                <p className={s.how}>Ask in Slack or the request form. MambaHR does the work, and you approve what matters.</p>
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
              <div>
                <p className={s.stripT}>Advise several companies?</p>
                <p className={s.stripS}>
                  Accountants, fractional CFOs and HR leads, and VC platform teams earn {PARTNER_SHARE} of the
                  first-year revenue of every company they bring to MambaHR.
                </p>
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
