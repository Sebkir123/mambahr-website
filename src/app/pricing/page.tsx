'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'
import { FAQS } from './faqs'
import { TIERS } from '@/content/pricing-tiers'

/* Plan matrix: tier index = first column where the feature is included. */
const MATRIX: { group: string; rows: { f: string; from: number }[] }[] = [
  {
    group: 'Core, every plan',
    rows: [
      { f: 'Employee records', from: 0 },
      { f: 'Org chart & team visibility', from: 0 },
      { f: 'Every employee question answered in Slack', from: 0 },
      { f: 'Headcount and org answers on demand', from: 0 },
      { f: 'HR document storage', from: 0 },
      { f: 'Workflows & approvals', from: 0 },
      { f: 'Compliance guidance', from: 0 },
      { f: 'Payroll change files', from: 0 },
      { f: 'Slack & the MambaHR app', from: 0 },
    ],
  },
  {
    group: 'HR Ops Manager and up',
    rows: [
      { f: 'Onboarding, run end to end', from: 1 },
      { f: 'Offboarding, run end to end', from: 1 },
      { f: 'Offer & HR document generation', from: 1 },
      { f: 'Approval routing', from: 1 },
      { f: 'Manager questions answered with the policy cited', from: 1 },
      { f: 'Leave & policy handling', from: 1 },
      { f: 'Payroll change reports', from: 1 },
      { f: 'Audit trails', from: 1 },
      { f: 'Integrations', from: 1 },
      { f: 'Implementation support', from: 1 },
    ],
  },
  {
    group: 'AI HR Department and up',
    rows: [
      { f: 'Advanced workflow automation', from: 2 },
      { f: 'RIF & change planning', from: 2 },
      { f: 'Advanced compliance workflows', from: 2 },
      { f: 'Advanced audit trails', from: 2 },
      { f: 'Custom workflows', from: 2 },
      { f: 'SSO & security review', from: 2 },
      { f: 'Deel-managed payroll, person-approved', from: 2 },
      { f: 'Priority support', from: 2 },
    ],
  },
  {
    group: 'Enterprise only',
    rows: [
      { f: 'Custom implementation', from: 3 },
      { f: 'Advanced security & procurement support', from: 3 },
      { f: 'High-volume workflows & custom approval logic', from: 3 },
      { f: 'Custom payroll file requirements', from: 3 },
      { f: 'Dedicated success support & enterprise integrations', from: 3 },
    ],
  },
]

const COST_ROWS = [
  { hire: 'Records, onboarding & document admin', cost: '$70k–$95k', alt: 'HR Starter or Ops Manager' },
  { hire: 'Plus leave, policy & the question queue', cost: '$85k–$120k', alt: 'HR Ops Manager' },
  { hire: 'Plus hiring ops & payroll changes', cost: '$110k–$150k', alt: 'Ops Manager or AI HR Dept' },
  { hire: 'Plus compensation cycles & compliance', cost: '$100k–$140k', alt: 'AI HR Department' },
]

const EXPORTS = [
  'New-hire payroll reports',
  'Termination reports',
  'Compensation changes',
  'Job, manager & location changes',
  'Leave & time-away reports',
  'COBRA triggers',
  'Audit-ready change history',
]

/* ── Hero: the cost of the admin workload, made visual ── */
function MathCard() {
  return (
    <div className="mc agent-edge agent-working agent-lg">
      <div className="head">
        <span className="t">What the admin costs to run</span>
        <span className="at">at 100 employees</span>
      </div>
      <div className="rows">
        <div className="r">
          <div className="r-top">
            <span className="r-l">Staffed by hand, fully loaded</span>
            <span className="r-v">~$110k<em>/yr</em></span>
          </div>
          <span className="bar gray"><i style={{ width: '100%' }} /></span>
          <span className="r-note">A full-time role&rsquo;s worth of filing, chasing, and re-keying</span>
        </div>
        <div className="r">
          <div className="r-top">
            <span className="r-l">Run by MambaHR</span>
            <span className="r-v grad">$26k<em>/yr</em></span>
          </div>
          <span className="bar"><i style={{ width: '24%' }} /></span>
          <span className="r-note">The same workload · handled overnight · logged end to end</span>
        </div>
      </div>
      <div className="foot">
        <span className="f-big">$84k</span>
        <span className="f-t">back in your people budget, before counting the hours your team gets back</span>
      </div>
      <p className="disclosure">
        Illustrative at 100 employees, using published US salary ranges for the same admin
        workload. Your numbers will differ; we will price yours on the call.
      </p>
      <style jsx>{`
        .disclosure {
          margin: 0;
          padding: 0 22px 16px;
          font-size: 11.5px;
          line-height: 1.5;
          color: var(--text-faint);
        }
        .mc { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-float); overflow: hidden; }
        .head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 15px 22px; border-bottom: 1px solid var(--border-faint); }
        .t { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .at { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); white-space: nowrap; }
        .rows { padding: 18px 22px 6px; display: flex; flex-direction: column; gap: 18px; }
        .r-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .r-l { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .r-v { font-family: var(--font-serif); font-size: 22px; color: var(--text); }
        .r-v em { font-style: normal; font-family: var(--font-sans); font-size: 12px; color: var(--text-faint); }
        .r-v.grad { background: linear-gradient(110deg, var(--gold), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .bar { display: block; height: 9px; border-radius: 999px; background: var(--border-faint); overflow: hidden; margin-top: 8px; }
        .bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--gold-mid), var(--violet)); }
        .bar.gray i { background: #C9C2B6; }
        .r-note { display: block; font-size: 11.5px; color: var(--text-faint); margin-top: 6px; }
        .foot { display: flex; align-items: baseline; gap: 12px; padding: 14px 22px 18px; margin-top: 10px; background: var(--bg-warm); border-top: 1px solid var(--border-faint); }
        .f-big { font-family: var(--font-serif); font-size: 30px; line-height: 1; background: linear-gradient(110deg, var(--gold), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
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
            <h1 className="title" data-reveal data-delay="1">Before you hire HR, <Em>hire MambaHR.</Em></h1>
            <p className="lead" data-reveal data-delay="2">
              Most HR software stores your people data. MambaHR does the work: onboarding, leave and
              compliance, approvals, and offboarding, run end to end, with every payroll change prepared,
              for a fraction of what running it by hand costs. Priced per employee, the way the work actually scales.
            </p>
            <div className="ctas" data-reveal data-delay="3">
              <Link href="/demo" className="btn-p">Book a demo</Link>
              <Link href="/product" className="btn-g">See it run</Link>
            </div>
            <div className="proof" data-reveal data-delay="3">
              <div className="faces">
                {['priya', 'anna', 'maya', 'dave', 'brian'].map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p} src={`/avatars/${p}.jpg`} alt="" width={34} height={34} />
                ))}
              </div>
              <span className="proof-t">Built for lean HR teams</span>
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
            .top { position: relative; max-width: 1040px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 4vw, 54px); line-height: 1.04; letter-spacing: -0.028em; color: var(--text); margin: 18px 0 0; text-wrap: balance; }
            .lead { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.58; color: var(--text-muted); max-width: 690px; margin: 22px auto 0; }
            .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
            :global(.ph .btn-p) {
              display: inline-block; background: var(--text); color: #fff; font-weight: 600; font-size: 15.5px;
              padding: 14px 28px; border-radius: 999px; text-decoration: none;
              box-shadow: 0 12px 26px rgba(20, 18, 14, 0.22); transition: transform 0.15s ease;
            }
            :global(.ph .btn-p:hover) { transform: translateY(-2px); }
            :global(.ph .btn-g) {
              display: inline-block; color: var(--text); font-weight: 600; font-size: 15.5px;
              padding: 14px 24px; border-radius: 999px; border: 1px solid var(--border-mid);
              background: rgba(255, 255, 255, 0.6); text-decoration: none;
            }
            :global(.ph .btn-g:hover) { background: #fff; }
            @media (prefers-reduced-motion: reduce) { :global(.ph .btn-p:hover) { transform: none; } }
            .proof { display: flex; align-items: center; gap: 13px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }
            .faces { display: flex; }
            .faces img {
              width: 34px; height: 34px; border-radius: 999px; object-fit: cover;
              border: 2px solid #fff; box-shadow: var(--shadow-sm);
              margin-left: -9px; background: var(--bg-elevated);
            }
            .faces img:first-child { margin-left: 0; }
            .proof-t { font-size: 14px; font-weight: 600; color: var(--text); }
            .stage { position: relative; max-width: 720px; margin: clamp(44px, 5.4vw, 64px) auto 0; }
          `}</style>
        </section>

        {/* ── Founding customers ── */}
        <section className="found">
          <div className="band" data-reveal>
            <div className="f-copy">
              <span className="f-tag">Founding cohort</span>
              <p className="f-t">Founding customer pricing is open for our first cohort.</p>
              <p className="f-s">Discounted annual pricing, onboarding directly with the founders, and priority say in the roadmap.</p>
            </div>
            <Link href="/demo" className="f-cta">Get founding pricing</Link>
          </div>
          <style jsx>{`
            .found { background: var(--bg); padding: clamp(40px, 5vw, 64px) var(--page-pad) 0; }
            .band {
              max-width: var(--page-max);
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 20px;
              flex-wrap: wrap;
              border: 1px solid var(--border);
              border-radius: 18px;
              padding: clamp(20px, 2.6vw, 30px) clamp(22px, 3vw, 36px);
              background:
                radial-gradient(70% 100% at 4% 0%, rgba(196, 154, 108, 0.18), transparent 55%),
                radial-gradient(60% 100% at 100% 100%, rgba(106, 93, 166, 0.14), transparent 55%),
                var(--bg);
              box-shadow: var(--shadow-sm);
            }
            .f-tag { font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #fff; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); border-radius: 999px; padding: 4px 11px; }
            .f-t { font-family: var(--font-serif); font-size: clamp(19px, 2.2vw, 24px); color: var(--text); margin: 10px 0 0; letter-spacing: -0.01em; }
            .f-s { font-size: 14px; color: var(--text-muted); margin: 6px 0 0; line-height: 1.5; }
            :global(.found .f-cta) {
              flex: none; display: inline-block; background: var(--text); color: #fff; font-weight: 600; font-size: 14.5px;
              padding: 13px 24px; border-radius: 999px; text-decoration: none;
              box-shadow: 0 10px 22px rgba(20, 18, 14, 0.18);
            }
            :global(.found .f-cta:hover) { background: #2A2A28; }
          `}</style>
        </section>

        {/* ── Tier cards ── */}
        <section className="tiers">
          <div className="wrap">
            <div className="grid">
              {TIERS.map((t, i) => (
                <div key={t.name} className={`card${t.popular ? ' pop agent-edge agent-working agent-lg' : ''}`} data-reveal data-delay={String(Math.min(i + 1, 4))}>
                  {t.badge && <span className="pop-tag">{t.badge}</span>}
                  <div className="c-name">{t.name}</div>
                  <div className="c-size">{t.size}</div>
                  <div className="c-price">
                    <span className="c-n">{t.price}</span>
                    {t.unit && <span className="c-u">{t.unit}</span>}
                  </div>
                  <div className="c-min">{t.min}</div>
                  <p className="c-blurb">{t.blurb}</p>
                  <div className="c-rep">
                    <span className="c-rep-l">Takes off your plate</span>
                    <ul>
                      {t.replaces.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  </div>
                  <ul className="c-feats">
                    {t.feats.map((f) => (
                      <li key={f}><span className="tick" aria-hidden="true" />{f}</li>
                    ))}
                  </ul>
                  <Link href="/demo" className={t.popular ? 'c-cta dark' : 'c-cta'}>{t.cta}</Link>
                </div>
              ))}
            </div>
            <p className="note" data-reveal>Annual billing. Every employee on the platform counts once, contractors and board members don&rsquo;t.</p>

            {/* Collapsible full matrix */}
            <details className="matrix" data-reveal>
              <summary>Compare all plans in detail</summary>
              <div className="m-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {TIERS.map((t) => <th key={t.name}>{t.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {MATRIX.map((g) => (
                      <Fragment key={g.group}>
                        <tr className="g-row"><td colSpan={5}>{g.group}</td></tr>
                        {g.rows.map((r) => (
                          <tr key={r.f}>
                            <td>{r.f}</td>
                            {TIERS.map((t, ti) => (
                              <td key={t.name} className="c">
                                {ti >= r.from ? <span className="yes" aria-label="Included">✓</span> : <span className="no" aria-label="Not included">—</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
          <style jsx>{`
            .tiers { background: var(--bg); padding: clamp(48px, 6vw, 72px) var(--page-pad) clamp(40px, 5vw, 64px); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px, 1.6vw, 20px); align-items: stretch; }
            .card { position: relative; display: flex; flex-direction: column; background: var(--bg); border: 1px solid var(--border); border-radius: 18px; padding: clamp(22px, 2.4vw, 30px) clamp(18px, 2vw, 26px); box-shadow: var(--shadow-sm); transition: transform 0.18s ease, box-shadow 0.18s ease; }
            .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-float); }
            @media (prefers-reduced-motion: reduce) { .card:hover { transform: none; } }
            .card.pop { background: linear-gradient(180deg, #FFFDF8, var(--bg)); box-shadow: var(--shadow-float); }
            .pop-tag { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); z-index: 3; font-family: var(--font-mono); font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); border-radius: 999px; padding: 5px 12px; white-space: nowrap; box-shadow: 0 0 0 4px var(--bg), 0 6px 14px rgba(20, 18, 14, 0.16); }
            .c-name { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
            .c-size { font-family: var(--font-mono); font-size: 11px; color: var(--gold-dark); margin-top: 4px; }
            .c-price { display: flex; align-items: baseline; gap: 6px; margin-top: 18px; }
            .c-n { font-family: var(--font-serif); font-size: clamp(32px, 2.8vw, 40px); line-height: 1; color: var(--text); letter-spacing: -0.02em; }
            .c-u { font-size: 13px; color: var(--text-faint); }
            .c-min { font-size: 11.5px; color: var(--text-faint); margin-top: 6px; }
            .c-blurb { font-size: 13.5px; line-height: 1.5; color: var(--text-muted); margin: 13px 0 0; min-height: 40px; }
            .c-rep { margin-top: 13px; border: 1px solid var(--border-faint); background: var(--bg-warm); border-radius: 12px; padding: 11px 13px; }
            .c-rep-l { font-family: var(--font-mono); font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gold-dark); }
            .c-rep ul { list-style: none; margin: 7px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
            .c-rep li { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; padding-left: 14px; position: relative; }
            .c-rep li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 999px; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); }
            .c-feats { list-style: none; padding: 0; margin: 14px 0 20px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
            .c-feats li { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; line-height: 1.45; color: var(--text-muted); }
            .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
            .tick::after { content: ''; position: absolute; left: 5px; top: 2.5px; width: 3px; height: 7px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
            :global(.tiers .c-cta) { display: block; text-align: center; font-size: 14px; font-weight: 600; color: var(--text); border: 1px solid var(--border-mid); background: var(--bg); border-radius: 999px; padding: 11px 16px; text-decoration: none; transition: background 0.15s ease; }
            :global(.tiers .c-cta:hover) { background: var(--bg-warm); }
            :global(.tiers .c-cta.dark) { color: #fff; background: var(--text); border-color: var(--text); box-shadow: 0 10px 22px rgba(20, 18, 14, 0.18); }
            :global(.tiers .c-cta.dark:hover) { background: #2A2A28; }
            .note { text-align: center; font-size: 13px; color: var(--text-faint); margin: 26px 0 0; }
            .matrix { margin-top: clamp(28px, 3.4vw, 40px); border: 1px solid var(--border); border-radius: 16px; background: var(--bg); overflow: hidden; }
            .matrix summary { cursor: pointer; list-style: none; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 20px; font-size: 14.5px; font-weight: 700; color: var(--text); }
            .matrix summary::-webkit-details-marker { display: none; }
            .matrix summary::after { content: '+'; font-family: var(--font-mono); font-size: 16px; color: var(--gold-dark); }
            .matrix[open] summary::after { content: '–'; }
            .matrix[open] summary { border-bottom: 1px solid var(--border-faint); }
            .m-scroll { overflow-x: auto; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { text-align: left; font-size: 12px; font-weight: 700; color: var(--text); padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--bg-surface); white-space: nowrap; }
            th + th, td.c { text-align: center; }
            td { padding: 9px 16px; color: var(--text-muted); border-bottom: 1px solid var(--border-faint); }
            .g-row td { font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gold-dark); background: var(--bg-warm); padding: 8px 16px; }
            .yes { color: var(--color-green); font-weight: 700; }
            .no { color: var(--border-mid); }
            @media (max-width: 1080px) { .grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── Cost comparison ── */}
        <section className="cost">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Compare the cost</p>
              <h2 className="title">Cheaper than doing it <Em>by hand.</Em></h2>
              <p className="lead">Real HR execution for a fraction of what it costs to staff the same work. And when you do hire, they inherit a running department instead of a backlog.</p>
            </div>
            <div className="cost-table" data-reveal data-delay="1">
              <div className="row hd">
                <span>The workload</span>
                <span>Cost to staff it</span>
                <span>The MambaHR plan</span>
              </div>
              {COST_ROWS.map((r) => (
                <div key={r.hire} className="row">
                  <span className="h">{r.hire}</span>
                  <span className="c">{r.cost}</span>
                  <span className="a">{r.alt}</span>
                </div>
              ))}
            </div>
            <p className="compare-line" data-reveal data-delay="2">
              Simpler than Rippling. Faster than Workday. More execution than BambooHR. Cheaper than doing it by hand.{' '}
              <Link href="/compare">See the comparisons →</Link>
            </p>
          </div>
          <style jsx>{`
            .cost { background: var(--bg-warm); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: 920px; margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(30px, 3.6vw, 44px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15.5px, 1.8vw, 17.5px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 600px; }
            .cost-table { display: block; background: var(--bg); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-float); }
            .row { display: grid; grid-template-columns: 1.1fr 1fr 1.3fr; gap: 12px; padding: 14px 22px; align-items: baseline; }
            .row + .row { border-top: 1px solid var(--border-faint); }
            .row.hd { background: var(--bg-surface); border-bottom: 1px solid var(--border); font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
            .h { font-size: 14.5px; font-weight: 700; color: var(--text); }
            .c { font-family: var(--font-serif); font-size: 17px; color: var(--text); }
            .a { font-size: 13.5px; font-weight: 600; background: linear-gradient(110deg, var(--gold), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
            .compare-line { text-align: center; font-size: 14px; color: var(--text-muted); margin: 24px 0 0; }
            :global(.cost .compare-line a) { color: var(--gold-dark); font-weight: 700; text-decoration: none; }
            :global(.cost .compare-line a:hover) { text-decoration: underline; }
            @media (max-width: 640px) { .row { grid-template-columns: 1fr; gap: 4px; } }
          `}</style>
        </section>

        {/* ── Payroll ── */}
        <section className="pb">
          <div className="wrap">
            <div className="copy" data-reveal>
              <p className="eyebrow">Payday</p>
              <h2 className="title">Two ways to run <Em>payday.</Em></h2>
              <p className="lead">
                MambaHR prepares every payroll change: every hire, raise, leave, and exit. You choose per company
                between a change file for your current payroll provider and Deel-managed payroll, where MambaHR sends
                the changes to Deel and a person approves every run. Benefits administration is not part of MambaHR today;
                COBRA notices at offboarding are.
              </p>
            </div>
            <div className="chips" data-reveal data-delay="1">
              {EXPORTS.map((e) => (
                <span key={e} className="chip"><span className="dot" aria-hidden="true" />{e}</span>
              ))}
            </div>
          </div>
          <style jsx>{`
            .pb { background: var(--bg); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: 920px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15.5px, 1.8vw, 17.5px); line-height: 1.65; color: var(--text-muted); margin: 18px auto 0; max-width: 640px; }
            .chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 9px; margin-top: 28px; }
            .chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 500; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-faint); border-radius: 999px; padding: 6px 13px; white-space: nowrap; }
            .dot { width: 6px; height: 6px; border-radius: 999px; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); }
          `}</style>
        </section>

        <StatTrio
          stats={[
            { n: 84, prefix: '$', suffix: 'k', label: 'back in the budget vs. staffing the same admin, at 100 employees' },
            { n: 27, label: 'hours of HR admin a week, we estimate, taken off a lean team. Our model, not a customer average' },
            { n: 100, suffix: '%', label: 'of terminations and offers above band wait for a person to approve' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="faq">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Straight answers</p>
              <h2 className="title">No fine print <Em>tricks.</Em></h2>
            </div>
            <div className="grid">
              {FAQS.map((f, i) => (
                <div key={f.q} className="item" data-reveal data-delay={String(Math.min((i % 4) + 1, 4))}>
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
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2vw, 24px); }
            .item { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(20px, 2.4vw, 28px); box-shadow: var(--shadow-sm); }
            .q { font-size: 16px; font-weight: 700; color: var(--text); margin: 0; letter-spacing: -0.01em; }
            .a { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 10px 0 0; }
            @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <QuoteBand
          quote="My whole budget was about to go on admin coverage. MambaHR took the admin instead, and I finally got to build the programs I was hired to build. Easiest line item I've ever defended."
          role="Head of People · Robotics startup, 240 people"
          img="/v2-people/feat.jpg"
          metric="12 hrs back / week"
        />

        <PageCta
          title={<>Before you hire HR, <Em>hire MambaHR.</Em></>}
          sub="Built to do the work. A 30-minute demo with your real headcount, we'll quote it on the call."
        />
      </main>
      <Footer />
    </>
  )
}
