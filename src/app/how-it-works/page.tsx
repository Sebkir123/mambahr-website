import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, PageCta, Em } from '@/components/v2/page-kit'
import { DEMO_HREF, DEMO_LABEL } from '@/content/cta'
import { FLOW, WALKS, DECIDE, START, FAQS, type Walk } from './content'
import s from './how-it-works.module.css'

const whoLabel = { mamba: 'MambaHR', person: 'A person' } as const

/* The four stages as one card: the hero fragment. Built from the site's own
   styles, not a product screenshot. */
function FlowCard() {
  return (
    <div className={`${s.flowCard} agent-edge agent-working agent-lg`}>
      <div className={s.flowTop}>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
        <span className={s.flowTopT}>Every request, the same four steps</span>
      </div>
      <ol className={s.flowGrid}>
        {FLOW.map((f, i) => (
          <li key={f.title} className={`${s.flowCell}${f.who === 'person' ? ` ${s.person}` : ''}`}>
            <span className={s.flowN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <p className={s.flowT}>{f.title}</p>
            <span className={s.flowWho}>{whoLabel[f.who]}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Request({ r }: { r: Walk['request'] }) {
  return (
    <div className={s.ask} aria-label={`The request, from ${r.name}`}>
      <div className={s.askTop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/slack-new-logo.svg" alt="" width={14} height={14} />
        <b>{r.where}</b>
      </div>
      <div className={s.askBody}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.askAv} src={r.avatar} alt="" width={34} height={34} loading="lazy" decoding="async" />
        <div>
          <div className={s.askWho}>{r.name}<time>{r.time}</time></div>
          <p className={s.askText}><span className={s.mention}>@MambaHR</span> {r.text}</p>
        </div>
      </div>
    </div>
  )
}

function WalkSection({ w, warm }: { w: Walk; warm: boolean }) {
  return (
    <section id={w.id} className={`${s.walk} ${warm ? s.warm : s.plain}`} aria-labelledby={`${w.id}-title`}>
      <div className={`${s.wrap} ${s.walkGrid}`}>
        <div className={s.walkCopy} data-reveal>
          <p className={s.eyebrow}>{w.eyebrow}</p>
          <h2 id={`${w.id}-title`} className={s.h2}>{w.title}</h2>
          <p className={s.lead}>{w.summary}</p>
          <Request r={w.request} />
          <Link href={w.more.href} className={s.walkMore}>{w.more.label}</Link>
        </div>
        <div data-reveal data-delay="1">
          <ol className={s.list}>
            {w.steps.map((st, i) => (
              <li key={st.title} className={`${s.item}${st.who === 'person' ? ` ${s.person}` : ''}`}>
                <span className={s.dot} aria-hidden="true">{i + 1}</span>
                <div>
                  <div className={s.itemHead}>
                    <h3 className={s.itemT}>{st.title}</h3>
                    <span className={s.who}>{whoLabel[st.who]}</span>
                  </div>
                  <p className={s.itemB}>{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={s.pair}>
            <div className={`${s.note} ${s.noteWhy}`}>
              <p className={s.noteL}>Why a person decides</p>
              <p className={s.noteB}>{w.why}</p>
            </div>
            <div className={`${s.note} ${s.noteDone}`}>
              <p className={s.noteL}>When it is done</p>
              <p className={s.noteB}>{w.done}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DecideCol({ kind }: { kind: 'always' | 'yours' | 'mamba' }) {
  const c = DECIDE[kind]
  return (
    <div className={`${s.col} ${s[kind]}`} data-reveal>
      <h3 className={s.colT}>{c.title}</h3>
      <p className={s.colS}>{c.sub}</p>
      <ul className={s.colList}>
        {c.items.map((it) => (
          <li key={it}><span className={s.tick} aria-hidden="true" />{it}</li>
        ))}
      </ul>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="How it works"
          title={<>From request to done, <Em>step by step.</Em></>}
          lead="A request comes in through Slack or your web request form. MambaHR does the admin, a person approves the decisions that matter, and everyone sees what happened. Here is exactly what that looks like."
        >
          <FlowCard />
        </PageHero>

        {/* ── The four steps ── */}
        <section className={s.steps} aria-labelledby="flow-title">
          <div className={s.wrap}>
            <div className={s.center} data-reveal>
              <p className={s.eyebrow}>The same four steps</p>
              <h2 id="flow-title" className={s.h2}>What happens to every request</h2>
              <p className={s.lead}>A one-day leave request and a new hire’s first week follow the same path. Only the work in the middle changes.</p>
            </div>
            <ol className={s.stepGrid}>
              {FLOW.map((f, i) => (
                <li key={f.title} className={s.stepCard} data-reveal data-delay={String((i % 2) + 1)}>
                  <span className={s.stepNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={s.stepT}>{f.title}</h3>
                  <p className={s.stepB}>{f.body}</p>
                </li>
              ))}
            </ol>
            <nav aria-label="Walk-throughs">
              <ul className={s.jump}>
                {WALKS.map((w) => (
                  <li key={w.id}><a href={`#${w.id}`}>{w.short}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {WALKS.map((w, i) => (
          <WalkSection key={w.id} w={w} warm={i % 2 === 0} />
        ))}

        {/* ── Who decides what ── */}
        <section className={s.decide} aria-labelledby="decide-title">
          <div className={s.wrap}>
            <div className={s.center} data-reveal>
              <p className={s.eyebrow}>Who decides</p>
              <h2 id="decide-title" className={s.h2}>Which steps need a person, <Em>and why.</Em></h2>
              <p className={s.lead}>MambaHR takes the admin off your plate. The judgment calls stay with your team.</p>
            </div>
            <div className={s.cols}>
              <DecideCol kind="always" />
              <DecideCol kind="yours" />
              <DecideCol kind="mamba" />
            </div>
            <p className={s.why} data-reveal>{DECIDE.why}</p>
          </div>
        </section>

        {/* ── Start on your own ── */}
        <section className={s.start} aria-labelledby="start-title">
          <div className={`${s.wrap} ${s.startGrid}`}>
            <div data-reveal>
              <p className={s.eyebrow}>Getting started</p>
              <h2 id="start-title" className={s.h2}>Up and running <Em>in a day.</Em></h2>
              <p className={s.lead}>Book a 30-minute demo and we walk you through MambaHR on examples from your company, then set it up with you. Your data imports in a day.</p>
              <div className={s.startBtns}>
                <Link href={DEMO_HREF} className="btn btn-primary" data-track="cta_click" data-track-label="demo:how-it-works">{DEMO_LABEL}</Link>
              </div>
            </div>
            <div className={s.startCard} data-reveal data-delay="1">
              <ol className={s.startList}>
                {START.map((st, i) => (
                  <li key={st.title} className={s.startItem}>
                    <span className={s.startN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className={s.startT}>{st.title}</h3>
                      <p className={s.startB}>{st.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Questions ── */}
        <section className={s.faq} aria-labelledby="faq-title">
          <div className={s.wrap}>
            <h2 id="faq-title" className={s.h2} data-reveal>Questions about how it works</h2>
            <div className={s.faqList}>
              {FAQS.map((f) => (
                <div key={f.q} className={s.faqItem} data-reveal>
                  <h3 className={s.faqQ}>{f.q}</h3>
                  <p className={s.faqA}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PageCta
          title={<>Less admin. <Em>Same judgment.</Em></>}
          sub="Book a 30-minute demo using examples from your company. Your data imports in a day."
        />
      </main>
      <Footer />
    </>
  )
}
