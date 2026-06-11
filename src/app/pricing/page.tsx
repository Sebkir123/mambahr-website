'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

const TIERS = [
  {
    name: 'HR Starter',
    size: 'For teams of 10–50',
    price: '$14',
    unit: '/employee/mo',
    min: '$10k/yr minimum',
    blurb: 'Run HR properly before you hire HR.',
    feats: ['Employee records & org chart', 'Every employee question, answered', 'Offer letters & documents, generated', 'Payroll-ready exports'],
    cta: 'Start here',
  },
  {
    name: 'HR Ops Manager',
    size: 'For teams of 50–250',
    price: '$22',
    unit: '/employee/mo',
    min: '$24k/yr minimum',
    blurb: 'A full HR ops hire — for a tenth of one.',
    feats: ['Everything in Starter', 'Onboarding & offboarding, done', 'Offers sent, approvals routed', 'Time off, leave & reviews handled'],
    cta: 'Most teams start here',
    popular: true,
  },
  {
    name: 'AI HR Department',
    size: 'For teams of 250–1,000',
    price: '$30',
    unit: '/employee/mo',
    min: '$45k/yr minimum',
    blurb: 'Your whole HR department, run for you.',
    feats: ['Everything in Ops Manager', 'Layoffs & reorgs, done right', 'Deep compliance + full audit trail', 'SSO & custom workflows'],
    cta: 'Scale up',
  },
  {
    name: 'Enterprise',
    size: 'For 1,000+ and multi-entity',
    price: 'Custom',
    unit: '',
    min: 'from $100k/yr',
    blurb: 'For complex orgs with procurement to satisfy.',
    feats: ['Everything in AI HR Dept', 'Custom implementation', 'Procurement & security review', 'Enterprise integrations'],
    cta: 'Talk to founders',
  },
]

const INCLUDED = [
  'All 50 states, kept current',
  'Slack, Teams & the MambaHR app',
  'You approve the big calls',
  'Full audit trail',
  'US data residency',
  'Your data imported in a day',
  'No implementation fee',
  'Real humans when you need us',
]

const FAQS = [
  {
    q: 'Why a per-employee price?',
    a: 'Because that’s how the work scales. Every employee brings questions, time off, reviews, and paperwork. One price per person, everything handled — no modules, no add-ons, no surprise invoices.',
  },
  {
    q: 'What does the minimum mean?',
    a: 'Each plan has an annual minimum so we can put real depth behind every account. If the per-employee math comes in under it, the minimum applies. Most teams clear it quickly as they grow.',
  },
  {
    q: 'Is there an implementation fee?',
    a: 'No. Your data is imported from your current systems in about a day, and the demo you see is the product you get. If standing it up took a six-month project, we’d be the thing we replaced.',
  },
  {
    q: 'Can we change plans as we grow?',
    a: 'Yes — plans follow your headcount. Cross 50 people and you move up with no migration, no re-setup, no renegotiation theater. Your record stays exactly where it is.',
  },
]

/* ── Hero: the salary math, made visual ── */
function MathCard() {
  return (
    <div className="mc agent-edge agent-working agent-lg">
      <div className="head">
        <span className="t">The math your CFO will do anyway</span>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Mamba · working</span>
      </div>
      <div className="rows">
        <div className="r">
          <div className="r-top">
            <span className="r-l">HR generalist, salary + benefits</span>
            <span className="r-v">~$110k<em>/yr</em></span>
          </div>
          <span className="bar gray"><i style={{ width: '100%' }} /></span>
          <span className="r-note">One person · business hours · two weeks of vacation</span>
        </div>
        <div className="r">
          <div className="r-top">
            <span className="r-l">MambaHR, 100-person team</span>
            <span className="r-v grad">$26k<em>/yr</em></span>
          </div>
          <span className="bar"><i style={{ width: '24%' }} /></span>
          <span className="r-note">The whole department · 24/7 · never calls in sick</span>
        </div>
      </div>
      <div className="foot">
        <span className="f-big">$84k</span>
        <span className="f-t">back in your budget — before counting the hours your managers get back</span>
      </div>
      <style jsx>{`
        .mc { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-float); overflow: hidden; }
        .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 15px 22px; border-bottom: 1px solid var(--border-faint); }
        .t { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .rows { padding: 18px 22px 6px; display: flex; flex-direction: column; gap: 18px; }
        .r-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .r-l { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .r-v { font-family: var(--font-serif); font-size: 22px; color: var(--text); }
        .r-v em { font-style: normal; font-family: var(--font-sans); font-size: 12px; color: var(--text-faint); }
        .r-v.grad { background: linear-gradient(110deg, #8A6535, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .bar { display: block; height: 9px; border-radius: 999px; background: var(--border-faint); overflow: hidden; margin-top: 8px; }
        .bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #B98A4E, #6A5DA6); }
        .bar.gray i { background: #C9C2B6; }
        .r-note { display: block; font-size: 11.5px; color: var(--text-faint); margin-top: 6px; }
        .foot { display: flex; align-items: baseline; gap: 12px; padding: 14px 22px 18px; margin-top: 10px; background: var(--bg-warm); border-top: 1px solid var(--border-faint); }
        .f-big { font-family: var(--font-serif); font-size: 30px; line-height: 1; background: linear-gradient(110deg, #8A6535, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .f-t { font-size: 12.5px; color: var(--text-muted); line-height: 1.45; }
      `}</style>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        {/* ── Hero ── */}
        <section className="ph">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="top">
            <p className="eyebrow" data-reveal>Pricing</p>
            <h1 className="title" data-reveal data-delay="1">One hire, <Em>every job.</Em></h1>
            <p className="lead" data-reveal data-delay="2">
              An HR generalist runs $85k&ndash;$120k a year — one person, one job, business hours.
              MambaHR runs your whole department from $10k a year. Priced per employee, the way the work actually scales.
            </p>
            <div className="ctas" data-reveal data-delay="3">
              <Link href="/demo" className="btn-p">Book a demo</Link>
              <Link href="/product" className="btn-g">See it run</Link>
            </div>
          </div>
          <div className="stage" data-reveal data-delay="4">
            <MathCard />
          </div>
          <style jsx>{`
            .ph { position: relative; overflow: hidden; padding: clamp(124px, 14vw, 172px) var(--page-pad) clamp(64px, 8vw, 96px); background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%); }
            .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
            .aurora::after { content: ''; position: absolute; inset: 0; background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%); }
            .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: prA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: prB 28s ease-in-out infinite alternate; }
            @keyframes prA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes prB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .top { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(42px, 5.8vw, 76px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 18px 0 0; white-space: nowrap; }
            .lead { font-size: clamp(17px, 2vw, 20px); line-height: 1.55; color: var(--text-muted); max-width: 660px; margin: 22px auto 0; }
            .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
            .stage { position: relative; max-width: 720px; margin: clamp(44px, 5.4vw, 64px) auto 0; }
            @media (max-width: 880px) { .title { white-space: normal; } }
          `}</style>
        </section>

        {/* ── Tier cards ── */}
        <section className="tiers">
          <div className="wrap">
            <div className="grid">
              {TIERS.map((t, i) => (
                <div key={t.name} className={`card${t.popular ? ' pop agent-edge agent-working agent-lg' : ''}`} data-reveal data-delay={String(Math.min(i + 1, 4))}>
                  {t.popular && <span className="pop-tag">Most popular</span>}
                  <div className="c-name">{t.name}</div>
                  <div className="c-size">{t.size}</div>
                  <div className="c-price">
                    <span className="c-n">{t.price}</span>
                    {t.unit && <span className="c-u">{t.unit}</span>}
                  </div>
                  <div className="c-min">{t.min}</div>
                  <p className="c-blurb">{t.blurb}</p>
                  <ul className="c-feats">
                    {t.feats.map((f) => (
                      <li key={f}><span className="tick" aria-hidden="true" />{f}</li>
                    ))}
                  </ul>
                  <Link href="/demo" className={t.popular ? 'c-cta dark' : 'c-cta'}>{t.cta}</Link>
                </div>
              ))}
            </div>
            <p className="note" data-reveal>Annual billing. Every employee on the platform counts once — contractors and board members don&rsquo;t.</p>
          </div>
          <style jsx>{`
            .tiers { background: var(--bg); padding: clamp(64px, 8vw, 104px) var(--page-pad) clamp(40px, 5vw, 64px); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px, 1.6vw, 20px); align-items: stretch; }
            .card { position: relative; display: flex; flex-direction: column; background: var(--bg); border: 1px solid var(--border); border-radius: 18px; padding: clamp(22px, 2.4vw, 30px) clamp(18px, 2vw, 26px); box-shadow: var(--shadow-sm); transition: transform 0.18s ease, box-shadow 0.18s ease; }
            .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-float); }
            @media (prefers-reduced-motion: reduce) { .card:hover { transform: none; } }
            .card.pop { background: linear-gradient(180deg, #FFFDF8, var(--bg)); box-shadow: var(--shadow-float); }
            .pop-tag { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-family: var(--font-mono); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #fff; background: linear-gradient(120deg, #B98A4E, #6A5DA6); border-radius: 999px; padding: 4px 12px; white-space: nowrap; }
            .c-name { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
            .c-size { font-family: var(--font-mono); font-size: 11px; color: var(--gold-dark); margin-top: 4px; }
            .c-price { display: flex; align-items: baseline; gap: 6px; margin-top: 18px; }
            .c-n { font-family: var(--font-serif); font-size: clamp(34px, 3vw, 42px); line-height: 1; color: var(--text); letter-spacing: -0.02em; }
            .c-u { font-size: 13px; color: var(--text-faint); }
            .c-min { font-size: 12px; color: var(--text-faint); margin-top: 6px; }
            .c-blurb { font-size: 13.5px; line-height: 1.5; color: var(--text-muted); margin: 14px 0 0; min-height: 40px; }
            .c-feats { list-style: none; padding: 0; margin: 16px 0 22px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
            .c-feats li { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; line-height: 1.45; color: var(--text-muted); }
            .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
            .tick::after { content: ''; position: absolute; left: 5px; top: 2.5px; width: 3px; height: 7px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
            :global(.tiers .c-cta) { display: block; text-align: center; font-size: 14px; font-weight: 600; color: var(--text); border: 1px solid var(--border-mid); background: var(--bg); border-radius: 999px; padding: 11px 16px; text-decoration: none; transition: background 0.15s ease; }
            :global(.tiers .c-cta:hover) { background: var(--bg-warm); }
            :global(.tiers .c-cta.dark) { color: #fff; background: #1A1A19; border-color: #1A1A19; box-shadow: 0 10px 22px rgba(20, 18, 14, 0.18); }
            :global(.tiers .c-cta.dark:hover) { background: #2A2A28; }
            .note { text-align: center; font-size: 13px; color: var(--text-faint); margin: 26px 0 0; }
            @media (max-width: 1080px) { .grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── Every plan includes ── */}
        <section className="inc">
          <div className="wrap" data-reveal>
            <p className="inc-l">Every plan includes</p>
            <div className="chips">
              {INCLUDED.map((c) => (
                <span key={c} className="chip"><span className="dot" aria-hidden="true" />{c}</span>
              ))}
            </div>
          </div>
          <style jsx>{`
            .inc { background: var(--bg); padding: 0 var(--page-pad) clamp(56px, 7vw, 88px); }
            .wrap { max-width: var(--page-max); margin: 0 auto; border-top: 1px solid var(--border-faint); padding-top: clamp(28px, 3.4vw, 40px); display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap; }
            .inc-l { font-family: var(--font-mono); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-faint); margin: 0; white-space: nowrap; }
            .chips { display: flex; flex-wrap: wrap; gap: 9px; }
            .chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 500; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-faint); border-radius: 999px; padding: 6px 13px; white-space: nowrap; }
            .dot { width: 6px; height: 6px; border-radius: 999px; background: linear-gradient(120deg, #B98A4E, #6A5DA6); }
          `}</style>
        </section>

        <StatTrio
          stats={[
            { n: 84, prefix: '$', suffix: 'k', label: 'back in the budget vs. a first HR hire, at 100 employees' },
            { n: 27, label: 'hours of HR admin handled in a typical week — nights included' },
            { n: 1, suffix: ' day', label: 'from signed to live — your data imported, no setup project' },
          ]}
        />

        {/* ── Pricing questions ── */}
        <section className="faq">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Straight answers</p>
              <h2 className="title">No fine print <Em>tricks.</Em></h2>
            </div>
            <div className="grid">
              {FAQS.map((f, i) => (
                <div key={f.q} className="item" data-reveal data-delay={String(Math.min(i + 1, 4))}>
                  <h3 className="q">{f.q}</h3>
                  <p className="a">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .faq { background: var(--bg-warm); padding: clamp(72px, 9vw, 120px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(36px, 4.4vw, 56px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2vw, 24px); }
            .item { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(20px, 2.4vw, 28px); box-shadow: var(--shadow-sm); }
            .q { font-size: 16px; font-weight: 700; color: var(--text); margin: 0; letter-spacing: -0.01em; }
            .a { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 10px 0 0; }
            @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <QuoteBand
          quote="I budgeted for an HR coordinator this year. Instead we turned on MambaHR — the admin work disappeared, and the salary went to a second engineer. Easiest line item I've ever defended."
          name="Marcus Lee"
          role="COO · 120-person company"
          img="/v2-people/marcus.jpg"
          metric="$84k redeployed"
        />

        <PageCta
          title={<>Do the math <Em>live.</Em></>}
          sub="A 30-minute demo with your real headcount. We'll quote it on the call."
        />
      </main>
      <Footer />
    </>
  )
}
