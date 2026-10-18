'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Em } from '@/components/v2/page-kit'
import { PARTNER_SHARE } from '@/content/early-access'
import { PassCard, Sky, Stage, shortDate } from './pass-card'
import { JoinForm, useJoinForm } from './join-form'
import s from './ea.module.css'

const noop = () => () => {}

export function Landing({ refCode, referrer }: { refCode: string | null; referrer: string | null }) {
  const f = useJoinForm({ refCode, form: 'early_access' })
  // The visitor's own date on the client; the server render says "Today".
  const today = useSyncExternalStore(noop, () => shortDate(new Date()), () => 'Today')
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

              <JoinForm f={f} />
              {f.status !== 'error' && f.status !== 'exists' && (
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
                name={f.companyValue.trim() || null}
                sub={f.domain ?? 'Type your work email'}
                joined={today}
                code={null}
                typing={f.focused}
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
