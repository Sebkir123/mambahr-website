'use client'

import { useState } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Em } from '@/components/v2/page-kit'
import type { Pass } from '@/lib/early-access'
import { HANDOFFS, HR_SYSTEMS, PARTNER_SHARE, REFERRAL_GIFT, TEAM_SIZES, companyFromEmail, labelFor } from '@/content/early-access'
import { PassCard, Sky, Stage, passCode, shortDate } from './pass-card'
import s from './ea.module.css'

type Props = { token: string; pass: Pass; link: string; welcome: boolean }

export function PassView({ token, pass, link, welcome }: Props) {
  const domain = pass.email.split('@')[1] ?? ''
  const [company, setCompany] = useState(pass.company ?? companyFromEmail(pass.email) ?? '')
  const [saved, setSaved] = useState(Boolean(pass.teamSize && pass.hrSystem))
  const name = company.trim() || null

  return (
    <>
      <MegaNav />
      <main id="main" className={s.page}>
        <section className={s.hero}>
          <Sky />
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <p className={s.eyebrow}>Your pass</p>
              <h1 className={`${s.title} ${s.titleSm}`}>{welcome ? <>You&rsquo;re <Em>in.</Em></> : <>Your founding <Em>spot.</Em></>}</h1>
              <p className={s.lead}>
                Your founding pricing is held. We&rsquo;ll email <b>{pass.email}</b> when your group opens.
              </p>
              <div style={{ marginTop: 32 }}>
                <TeamCard
                  token={token}
                  pass={pass}
                  company={company}
                  setCompany={setCompany}
                  saved={saved}
                  setSaved={setSaved}
                />
              </div>
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
                name={name ?? domain}
                sub={name ? domain : 'Your company'}
                joined={shortDate(pass.joinedAt)}
                code={passCode(pass.referralCode)}
                link={link}
                stamp={welcome ? 'land' : 'still'}
              />
              {pass.referrals > 0 && (
                <div className={`${s.glass} ${s.cJoined}`}>
                  <div className={s.joinedRow}>
                    <span className={s.av}>{pass.referrals}</span>
                    {pass.referrals === 1 ? 'company joined' : 'companies joined'} with your link
                  </div>
                </div>
              )}
            </Stage>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionTight}`}>
          <div className={`${s.wrap} ${s.twoUp}`}>
            <GiftCard link={link} referrals={pass.referrals} />
            <SignOffCard company={name} />
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
                  Partners earn {PARTNER_SHARE} of the first-year revenue of every company they bring to MambaHR.
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

function TeamCard({
  token, pass, company, setCompany, saved, setSaved,
}: {
  token: string
  pass: Pass
  company: string
  setCompany: (v: string) => void
  saved: boolean
  setSaved: (v: boolean) => void
}) {
  const [teamSize, setTeamSize] = useState(pass.teamSize ?? '')
  const [hrSystem, setHrSystem] = useState(pass.hrSystem ?? '')
  const [handoffs, setHandoffs] = useState<string[]>(pass.handoffs)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!company.trim() || !teamSize || !hrSystem) {
      setError('Add your company, team size and where your records live.')
      return
    }
    setPending(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass: token, company: company.trim(), teamSize, hrSystem, handoffs }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'That did not save. Try again.'); return }
      setSaved(true)
    } catch {
      setError('That did not save. Check your connection and try again.')
    } finally {
      setPending(false)
    }
  }

  if (saved) {
    return (
      <div className={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span className={s.saved}><span className={s.savedDot} aria-hidden="true" />Your import will be ready</span>
          <button type="button" className={`${s.btn} ${s.btnGhost}`} style={{ height: 38 }} onClick={() => setSaved(false)}>Edit</button>
        </div>
        <div className={s.summary}>
          <span className={s.pill}>{company}</span>
          <span className={s.pill}>{labelFor(TEAM_SIZES, teamSize)} employees</span>
          <span className={s.pill}>{labelFor(HR_SYSTEMS, hrSystem)}</span>
          {handoffs.map((h) => <span key={h} className={s.pill}>{labelFor(HANDOFFS, h)}</span>)}
        </div>
      </div>
    )
  }

  return (
    <form className={s.card} onSubmit={save} noValidate>
      <h2 className={s.cardT}>Tell us about your team</h2>
      <p className={s.cardS}>So the import is ready the day you&rsquo;re in. Takes ten seconds.</p>
      <div className={s.form}>
        <div className={s.row2}>
          <label className={s.fieldL}>
            <span className={s.lbl}>Company</span>
            <input className={s.input} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Acme Inc." />
          </label>
          <label className={s.fieldL}>
            <span className={s.lbl}>Where your HR records live</span>
            <select className={s.input} value={hrSystem} onChange={(e) => setHrSystem(e.target.value)}>
              <option value="">Choose…</option>
              {HR_SYSTEMS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>
        <fieldset className={s.fieldset}>
          <legend className={s.lbl}>Employees</legend>
          <div className={s.seg}>
            {TEAM_SIZES.map((o) => (
              <label key={o.value} className={teamSize === o.value ? `${s.segO} ${s.on}` : s.segO}>
                <input type="radio" name="teamSize" value={o.value} checked={teamSize === o.value} onChange={() => setTeamSize(o.value)} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fieldset}>
          <legend className={s.lbl}>What should we take off your plate first?<span className={s.opt}>Optional</span></legend>
          <div className={s.chips}>
            {HANDOFFS.map((o) => {
              const on = handoffs.includes(o.value)
              return (
                <label key={o.value} className={on ? `${s.chip} ${s.on}` : s.chip}>
                  <input type="checkbox" checked={on} onChange={() => setHandoffs((p) => (on ? p.filter((x) => x !== o.value) : [...p, o.value]))} />
                  {o.label}
                </label>
              )
            })}
          </div>
        </fieldset>
        {error && <p className={s.err} role="alert">{error}</p>}
        <div><button type="submit" className={`${s.btn} ${s.btnInk}`} disabled={pending}>{pending ? 'Saving…' : 'Save'}</button></div>
      </div>
    </form>
  )
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

function GiftCard({ link, referrals }: { link: string; referrals: number }) {
  const [copied, setCopied] = useState(false)
  const subject = 'A founding spot at MambaHR'
  const body = `Hi,\n\nI'm on the early access list for MambaHR. It does the HR admin for you: hiring, onboarding, time off and leave, payroll changes, and compliance. With my link you skip the queue and get founding customer pricing:\n\n${link}\n`
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`

  return (
    <div className={`${s.card} ${s.cardGift}`}>
      <span className={s.field} aria-hidden="true"><i className={`${s.f} ${s.f1}`} /><i className={`${s.f} ${s.f2}`} /><i className={`${s.f} ${s.f3}`} /><i className={s.grain} /></span>
      <h2 className={s.cardT}>Give a founding spot</h2>
      <p className={s.cardS}>Know another company buried in HR admin? {REFERRAL_GIFT} You get a free month on your plan for every one that becomes a customer.</p>
      <div className={s.linkRow} style={{ marginTop: 20 }}>
        <span className={s.linkBox}>{link.replace('https://www.', '')}</span>
        <button type="button" className={`${s.btn} ${s.btnInk}`} onClick={async () => { if (await copy(link)) { setCopied(true); setTimeout(() => setCopied(false), 1800) } }}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className={s.btnRow}>
        <a className={`${s.btn} ${s.btnGhost}`} href={mailto}>Email a peer</a>
        <a className={`${s.btn} ${s.btnGhost}`} href={linkedIn} target="_blank" rel="noopener noreferrer">Post on LinkedIn</a>
      </div>
      {referrals > 0 && (
        <p className={s.count}><span className={s.countN}>{referrals}</span>{referrals === 1 ? 'company has' : 'companies have'} joined with your link</p>
      )}
      <p className={s.fine}>Credited once a company you referred pays its first invoice. Your own company doesn&rsquo;t count.</p>
    </div>
  )
}

const signOffNote = (company: string | null) =>
  `Hi,\n\nI put ${company ?? 'us'} on the early access list for MambaHR. It does the HR admin for us: hiring, onboarding, time off and leave, payroll changes, and compliance, with the law cited. We make the judgment calls, and our records import in a day.\n\nWhile we're on the list, founding customer pricing is held for us. Worth a look: https://www.mambahr.com\n`

function SignOffCard({ company }: { company: string | null }) {
  // Follows the company name until the person edits the note themselves.
  const [edited, setEdited] = useState<string | null>(null)
  const note = edited ?? signOffNote(company)
  const setNote = setEdited
  const [copied, setCopied] = useState(false)
  const mailto = `mailto:?subject=${encodeURIComponent('MambaHR: worth a look')}&body=${encodeURIComponent(note)}`

  return (
    <div className={s.card}>
      <h2 className={s.cardT}>Send it to whoever signs off</h2>
      <p className={s.cardS}>The person who approves new tools often isn&rsquo;t on this list. Here&rsquo;s a short note, ready to send. Change anything you like.</p>
      <label className={s.srOnly} htmlFor="ea-note">Note</label>
      <textarea id="ea-note" className={s.input} style={{ marginTop: 20, minHeight: 168 }} value={note} onChange={(e) => setNote(e.target.value)} />
      <div className={s.btnRow}>
        <a className={`${s.btn} ${s.btnInk}`} href={mailto}>Email it</a>
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={async () => { if (await copy(note)) { setCopied(true); setTimeout(() => setCopied(false), 1800) } }}>
          {copied ? 'Copied' : 'Copy note'}
        </button>
      </div>
    </div>
  )
}
