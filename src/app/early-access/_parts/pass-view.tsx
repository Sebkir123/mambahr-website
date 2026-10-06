'use client'

import { useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Em } from '@/components/v2/page-kit'
import type { Pass } from '@/lib/early-access'
import { HANDOFFS, HR_SYSTEMS, REFERRAL_GIFT, TEAM_SIZES, companyFromEmail, labelFor } from '@/content/early-access'
import { PassCard, Sky, Stage, passCode, shortDate } from './pass-card'
import s from './ea.module.css'

type Props = { token: string; pass: Pass; link: string; welcome: boolean }

// The pass page: the pass is the hero, then one slim step to get the import
// ready, then the two ways to share it.
export function PassView({ token, pass, link, welcome }: Props) {
  const domain = pass.email.split('@')[1] ?? ''
  // A personal inbox (gmail.com, …) is not the company; never print it as one.
  const personal = !companyFromEmail(pass.email)
  const [company, setCompany] = useState(pass.company ?? companyFromEmail(pass.email) ?? '')
  const [savedSystem, setSavedSystem] = useState(pass.hrSystem)
  const name = company.trim() || null
  // A small joke for people leaving one particular enterprise suite: their
  // stamp reads "Escape plan". It never names the product, uses no marks and
  // makes no claim about it; only the person who chose it ever sees it.
  const stampRing = savedSystem === 'workday' ? 'ESCAPE PLAN' : 'FOUNDING PRICING'

  return (
    <>
      <MegaNav />
      <main id="main" className={s.page}>
        <section className={`${s.hero} ${s.passHero}`}>
          <Sky />
          <div className={s.passHead}>
            <p className={s.eyebrow}>Your pass</p>
            <h1 className={`${s.title} ${s.titleSm}`}>{welcome ? <>You&rsquo;re <Em>in.</Em></> : <>Welcome <Em>back.</Em></>}</h1>
            <p className={s.lead}>
              Your founding pricing is held. We&rsquo;ll email <b>{pass.email}</b> when your group opens.
            </p>
          </div>
          <Stage className={s.passStage}>
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
              name={name}
              sub={name ? (personal ? 'Founding member' : domain) : 'Add your company below'}
              joined={shortDate(pass.joinedAt)}
              code={passCode(pass.referralCode)}
              link={link}
              stamp={welcome ? 'land' : 'still'}
              stampRing={stampRing}
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
        </section>

        <section className={`${s.section} ${s.afterStage}`}>
          <ol className={s.steps3}>
            <li><ImportStep token={token} pass={pass} company={company} setCompany={setCompany} askCompany={personal} onSaved={setSavedSystem} /></li>
            <li><GiftCard link={link} referrals={pass.referrals} /></li>
            <li><SignOffCard company={name} /></li>
          </ol>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ImportStep({
  token, pass, company, setCompany, askCompany, onSaved,
}: {
  token: string
  pass: Pass
  company: string
  setCompany: (v: string) => void
  askCompany: boolean
  onSaved: (hrSystem: string) => void
}) {
  const [teamSize, setTeamSize] = useState(pass.teamSize ?? '')
  const [hrSystem, setHrSystem] = useState(pass.hrSystem ?? '')
  const [handoffs, setHandoffs] = useState<string[]>(pass.handoffs)
  const [saved, setSaved] = useState(Boolean(pass.teamSize && pass.hrSystem))
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!company.trim() || !teamSize || !hrSystem) {
      setError(askCompany && !company.trim() ? 'Add your company, team size and where your records live.' : 'Choose your team size and where your records live.')
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
      onSaved(hrSystem)
    } catch {
      setError('That did not save. Check your connection and try again.')
    } finally {
      setPending(false)
    }
  }

  if (saved) {
    return (
      <div className={`${s.card} ${s.stepCard} ${s.stepDone}`}>
        <span className={`${s.stepNo} ${s.stepNoDone}`} aria-hidden="true" />
        <span className={s.stepDoneText}>
          <span className={s.cardT}>Your import will be ready</span>
          <span className={s.stepFacts}>
          {[company, `${labelFor(TEAM_SIZES, teamSize)} employees`, labelFor(HR_SYSTEMS, hrSystem), ...handoffs.map((h) => labelFor(HANDOFFS, h))]
            .filter(Boolean)
            .join(' · ')}
          </span>
        </span>
        <button type="button" className={s.textLinkBtn} onClick={() => setSaved(false)}>Edit</button>
      </div>
    )
  }

  return (
    <form className={`${s.card} ${s.stepCard}`} onSubmit={save} noValidate aria-labelledby="ea-step1">
      <div className={s.stepHead}>
        <span className={s.stepNo} aria-hidden="true">1</span>
        <div>
          <h2 className={s.cardT} id="ea-step1">Get your import ready</h2>
          <p className={s.cardS}>Two answers, and your records come over the day your group opens.</p>
        </div>
      </div>
      <div className={s.form}>
        {askCompany && (
          <label className={s.fieldL}>
            <span className={s.lbl}>Company</span>
            <input className={s.input} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Acme Inc." />
          </label>
        )}
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
        <label className={s.fieldL}>
          <span className={s.lbl}>Where your HR records live</span>
          <select className={s.input} value={hrSystem} onChange={(e) => setHrSystem(e.target.value)}>
            <option value="">Choose…</option>
            {HR_SYSTEMS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
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
    <div className={`${s.card} ${s.stepCard}`}>
      <div className={s.stepHead}>
        <span className={s.stepNo} aria-hidden="true">2</span>
        <div>
          <h2 className={s.cardT}>Give a founding spot</h2>
          <p className={s.cardS}>Know another company buried in HR admin? {REFERRAL_GIFT} You get a free month on your plan for every one that becomes a customer.</p>
        </div>
      </div>
      <div className={s.linkRow}>
        <span className={s.linkBox}>{link.replace('https://www.', '')}</span>
        <button type="button" className={`${s.btn} ${s.btnInk}`} onClick={async () => { if (await copy(link)) { setCopied(true); setTimeout(() => setCopied(false), 1800) } }}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className={s.btnRow}>
        <a className={`${s.btn} ${s.btnGhost}`} href={mailto}>Email a peer</a>
        <a className={`${s.btn} ${s.btnGhost}`} href={linkedIn} target="_blank" rel="noopener noreferrer">Post on LinkedIn</a>
      </div>
      <p className={s.fine}>
        {referrals > 0 ? `${referrals} ${referrals === 1 ? 'company has' : 'companies have'} joined with your link. ` : ''}
        Credited once a company you referred pays its first invoice. Your own company doesn&rsquo;t count.
      </p>
    </div>
  )
}

const signOffNote = (company: string | null) =>
  `Hi,\n\nI put ${company ?? 'us'} on the early access list for MambaHR. It does the HR admin for us: hiring, onboarding, time off and leave, payroll changes, and compliance, with the law cited. We make the judgment calls, and our records import in a day.\n\nWhile we're on the list, founding customer pricing is held for us. Worth a look: https://www.mambahr.com\n`

// The note opens in the reader's own mail app, where they change what they
// like; on the page it is a preview, not an editor.
function SignOffCard({ company }: { company: string | null }) {
  const [copied, setCopied] = useState(false)
  const note = signOffNote(company)
  const mailto = `mailto:?subject=${encodeURIComponent('MambaHR: worth a look')}&body=${encodeURIComponent(note)}`

  return (
    <div className={`${s.card} ${s.stepCard}`}>
      <div className={s.stepHead}>
        <span className={s.stepNo} aria-hidden="true">3</span>
        <div>
          <h2 className={s.cardT}>Send it to whoever signs off</h2>
          <p className={s.cardS}>The person who approves new tools often isn&rsquo;t on this list. Here&rsquo;s a short note, ready to send.</p>
        </div>
      </div>
      <blockquote className={s.letter}>
        {note.trim().split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
      </blockquote>
      <div className={s.btnRow}>
        <a className={`${s.btn} ${s.btnInk}`} href={mailto}>Email it</a>
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={async () => { if (await copy(note)) { setCopied(true); setTimeout(() => setCopied(false), 1800) } }}>
          {copied ? 'Copied' : 'Copy note'}
        </button>
      </div>
    </div>
  )
}
