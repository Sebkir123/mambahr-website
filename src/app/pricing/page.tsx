'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'
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
      { f: 'Approvals, with your rules', from: 0 },
      { f: 'Compliance guidance', from: 0 },
      { f: 'Payroll change files', from: 0 },
      { f: 'US payroll through Deel (add-on, $10 per employee paid)', from: 0 },
      { f: 'Onboarding, start to finish', from: 0 },
      { f: 'Offboarding, start to finish', from: 0 },
      { f: 'Leave & policy handling', from: 0 },
      { f: 'Slack & the MambaHR app', from: 0 },
    ],
  },
  {
    group: 'HR Ops Manager and up',
    rows: [
      { f: 'Offer & HR document generation', from: 1 },
      { f: 'Approval routing', from: 1 },
      { f: 'Manager questions answered with the policy cited', from: 1 },
      { f: 'Payroll change reports', from: 1 },
      { f: 'Audit trails', from: 1 },
      { f: 'Integrations', from: 1 },
      { f: 'Implementation support', from: 1 },
    ],
  },
  {
    group: 'Whole department and up',
    rows: [
      { f: 'Your own approval rules per process', from: 2 },
      { f: 'Layoff planning with legal checks', from: 2 },
      { f: 'Compliance research with the citation', from: 2 },
      { f: 'Audit log export for your lawyer', from: 2 },
      { f: 'Single sign-on & security review', from: 2 },
      { f: 'Priority support', from: 2 },
    ],
  },
  {
    group: 'Enterprise only',
    rows: [
      { f: 'Custom implementation', from: 3 },
      { f: 'Advanced security & procurement support', from: 3 },
      { f: 'High-volume queues & custom approval chains', from: 3 },
      { f: 'Custom payroll file requirements', from: 3 },
      { f: 'Dedicated success support & enterprise integrations', from: 3 },
    ],
  },
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


export default function PricingPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        {/* ── Hero + the plans, on the luminous stage ── */}
        <section className="pp">
          <div className="top">
            <p className="eyebrow" data-reveal="eager">Pricing</p>
            <h1 className="title" data-reveal="eager">Simple pricing, <Em>per employee.</Em></h1>
            <p className="lead" data-reveal="eager">
              One price per employee, per month, billed annually. Pick the plan that fits your
              company&rsquo;s size.
            </p>
            <Link href="/demo" className="found" data-reveal="eager">
              <span className="f-dot" aria-hidden="true" />
              Founding customer pricing is open
            </Link>
          </div>

          <div className="stage" data-reveal>
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
            <div className="plans">
              {TIERS.map((t) => (
                <div key={t.name} className={`plan${t.popular ? ' pop' : ''}`}>
                  {t.badge && <span className="p-badge">{t.badge}</span>}
                  <span className="p-name">{t.name}</span>
                  <span className="p-size">{t.size}</span>
                  <div className="p-price">
                    <span className="p-n">{t.price}</span>
                    {t.unit && <span className="p-u">per employee / month</span>}
                  </div>
                  <span className="p-min">{t.min}</span>
                  <p className="p-blurb">{t.blurb}</p>
                  <ul className="p-feats">
                    {t.feats.map((f) => (
                      <li key={f}><span className="tick" aria-hidden="true" />{f}</li>
                    ))}
                  </ul>
                  <Link href="/demo" className={`btn btn-block ${t.popular ? 'btn-primary' : 'btn-secondary'}`}>{t.unit ? 'Book a demo' : t.cta}</Link>
                </div>
              ))}
            </div>
            <p className="s-note">Every employee counts once. Contractors and board members don&rsquo;t.</p>
          </div>

          <div className="wrap">
            <details className="matrix">
              <summary>Compare all plans in detail</summary>
              <div className="m-scroll" role="group" tabIndex={0} aria-label="Plan comparison table">
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
                                {ti >= r.from
                                  ? <span className="yes" aria-label="Included" />
                                  : <span className="no" aria-label="Not included" />}
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
            .pp { background: var(--bg); padding: clamp(128px, 13vw, 168px) var(--page-pad) clamp(40px, 5vw, 64px); }
            .top { max-width: 900px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 20px; }
            .title {
              font-family: var(--font-serif);
              font-weight: 400;
              font-size: clamp(42px, 6vw, 84px);
              line-height: 0.98;
              letter-spacing: -0.045em;
              color: var(--text);
              margin: 0;
              text-wrap: balance;
            }
            .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 50ch; margin: 22px auto 0; }
            .top :global(.found) {
              display: inline-flex;
              align-items: center;
              gap: 9px;
              margin-top: 24px;
              padding: 8px 16px;
              border-radius: 999px;
              background: #fff;
              border: 1px solid var(--border-faint);
              box-shadow: 0 8px 20px -12px rgba(60, 40, 90, 0.35);
              font-size: 14px;
              font-weight: 600;
              color: var(--text);
              text-decoration: none;
            }
            .top :global(.found:hover) { border-color: var(--border-mid); }
            .f-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); }

            .stage {
              position: relative;
              isolation: isolate;
              overflow: hidden;
              max-width: 1320px;
              margin: clamp(44px, 5vw, 64px) auto 0;
              border-radius: 32px;
              padding: clamp(20px, 3.6vw, 48px);
              background: linear-gradient(155deg, #f3c796 0%, #eab2a4 40%, #c3aee0 72%, #9d8fe0 100%);
            }
            .field { position: absolute; inset: 0; z-index: -1; }
            .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
            .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, rgba(255, 226, 184, 0.95), rgba(255, 226, 184, 0) 70%); }
            .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, rgba(139, 127, 208, 0.9), rgba(139, 127, 208, 0) 70%); }
            .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, rgba(255, 246, 234, 0.7), rgba(255, 246, 234, 0) 70%); }
            .plans { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(12px, 1.4vw, 16px); align-items: stretch; padding-top: 12px; }
            .plan {
              position: relative;
              display: flex;
              flex-direction: column;
              padding: clamp(20px, 2vw, 26px);
              border-radius: 22px;
              background: rgba(255, 255, 255, 0.62);
              -webkit-backdrop-filter: blur(18px) saturate(160%);
              backdrop-filter: blur(18px) saturate(160%);
              border: 1px solid rgba(255, 255, 255, 0.85);
              box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 24px 48px -28px rgba(60, 40, 90, 0.4);
            }
            .plan.pop { background: #fff; box-shadow: 0 0 0 2px var(--violet), 0 30px 60px -28px rgba(60, 40, 90, 0.55); }
            .p-name { font-size: 16px; font-weight: 700; color: var(--text); }
            /* On the card's top edge, so every card's rows stay level. */
            .p-badge {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 12px;
              font-weight: 600;
              color: #fff;
              background: var(--violet);
              border-radius: 999px;
              padding: 4px 12px;
              white-space: nowrap;
              box-shadow: 0 0 0 3px #fff;
            }
            .p-size { font-size: 13.5px; color: var(--text-muted); margin-top: 4px; }
            .p-price { display: flex; align-items: baseline; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
            .p-n { font-family: var(--font-serif); font-size: clamp(40px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.03em; color: var(--text); }
            .p-u { font-size: 13px; color: var(--text-muted); }
            .p-min { font-size: 13px; color: var(--text-faint); margin-top: 8px; }
            .p-blurb { font-size: 15px; line-height: 1.5; color: var(--text); margin: 16px 0 0; padding-top: 16px; border-top: 1px solid rgba(26, 26, 25, 0.08); min-height: 3em; }
            .p-feats { list-style: none; padding: 0; margin: 14px 0 22px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
            .p-feats li { display: flex; align-items: flex-start; gap: 9px; font-size: 14px; line-height: 1.45; color: var(--text-muted); }
            .tick { flex: none; width: 16px; height: 16px; margin-top: 2px; border-radius: 50%; background: var(--color-green); position: relative; }
            .tick::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3px; height: 7px; border: solid #fff; border-width: 0 1.6px 1.6px 0; transform: rotate(45deg); }
            .s-note { margin: clamp(16px, 2vw, 24px) 0 0; text-align: center; font-size: 14px; color: #4a4540; }

            .wrap { max-width: 1180px; margin: 0 auto; }
            .matrix { margin-top: clamp(28px, 3.4vw, 40px); border: 1px solid var(--border-faint); border-radius: 18px; background: #fff; overflow: hidden; }
            .matrix summary { cursor: pointer; list-style: none; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 20px; font-size: 15px; font-weight: 600; color: var(--text); }
            .matrix summary::-webkit-details-marker { display: none; }
            .matrix summary::after { content: '+'; font-size: 18px; line-height: 1; color: var(--text-faint); }
            .matrix[open] summary::after { content: '−'; }
            .matrix[open] summary { border-bottom: 1px solid var(--border-faint); }
            .matrix summary:focus-visible { outline: 2px solid var(--violet); outline-offset: -2px; }
            .m-scroll { overflow-x: auto; }
            table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 640px; }
            th { text-align: left; font-size: 13px; font-weight: 600; color: var(--text); padding: 12px 16px; border-bottom: 1px solid var(--border-faint); background: var(--bg-surface); white-space: nowrap; }
            th + th, td.c { text-align: center; }
            td { padding: 10px 16px; color: var(--text-muted); border-bottom: 1px solid var(--border-faint); }
            .g-row td { font-size: 13px; font-weight: 600; color: var(--text); background: var(--bg-surface); padding: 9px 16px; }
            /* Included: a green check. Not included: a small grey dot, no glyph to read aloud. */
            .yes { display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: var(--color-green); position: relative; vertical-align: middle; }
            .yes::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3px; height: 7px; border: solid #fff; border-width: 0 1.6px 1.6px 0; transform: rotate(45deg); }
            .no { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--border-mid); vertical-align: middle; }

            @media (max-width: 1080px) { .plans { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
            @media (max-width: 620px) { .plans { grid-template-columns: 1fr; row-gap: 28px; } }
          `}</style>
        </section>

        {/* ── Payroll: the two ways ── */}
        <section className="pb">
          <div className="wrap">
            <h2 className="h2" data-reveal>Two ways to run <Em>payday.</Em></h2>
            <p className="sub" data-reveal>MambaHR prepares every payroll change: every hire, raise, leave and exit. You choose one of two ways, per company.</p>
            <div className="ways">
              <div className="way" data-reveal>
                <p className="w-t">Keep your payroll provider</p>
                <p className="w-x">MambaHR builds a change file in your provider&rsquo;s format, checked against the record, ready for you to load.</p>
              </div>
              <div className="way" data-reveal>
                <p className="w-t">Deel-managed payroll <span className="deel">Powered by Deel</span></p>
                <p className="w-x">MambaHR sends the changes to Deel, and a person approves every run. US payroll, an add-on on every plan: $10 per employee paid per month, no minimum.</p>
              </div>
            </div>
            <div className="chips" data-reveal>
              <span className="c-l">Reports for every pay run</span>
              {EXPORTS.map((e) => <span key={e} className="chip">{e}</span>)}
            </div>
          </div>
          <style jsx>{`
            .pb { background: var(--bg); padding: clamp(40px, 6vw, 80px) var(--page-pad); }
            .wrap { max-width: 1180px; margin: 0 auto; }
            .h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.03em; color: var(--text); margin: 0; }
            .sub { font-size: 17px; line-height: 1.6; color: var(--text-muted); margin: 14px 0 0; max-width: 60ch; }
            .ways { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: clamp(24px, 3vw, 36px); }
            .way { padding: clamp(20px, 2.4vw, 28px); border-radius: 20px; background: #fff; border: 1px solid var(--border-faint); box-shadow: 0 20px 40px -32px rgba(60, 40, 90, 0.35); }
            .w-t { margin: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-family: var(--font-serif); font-size: 22px; letter-spacing: -0.01em; color: var(--text); }
            .w-x { margin: 10px 0 0; font-size: 15.5px; line-height: 1.55; color: var(--text-muted); }
            .deel { font-family: var(--font-sans); font-size: 12.5px; font-weight: 600; color: var(--gold-dark); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.22); border-radius: 999px; padding: 3px 10px; letter-spacing: 0; }
            .chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 22px; }
            .c-l { font-size: 14px; font-weight: 600; color: var(--text-faint); margin-right: 4px; }
            .chip { font-size: 13.5px; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-faint); border-radius: 999px; padding: 6px 12px; }
            @media (max-width: 720px) { .ways { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── FAQ ── */}
        <section className="faq">
          <div className="wrap">
            <h2 className="h2" data-reveal>Questions about pricing</h2>
            <div className="list">
              {FAQS.map((f) => (
                <div key={f.q} className="item" data-reveal>
                  <h3 className="q">{f.q}</h3>
                  <p className="a">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .faq { background: var(--bg); padding: clamp(32px, 5vw, 64px) var(--page-pad) clamp(48px, 6vw, 80px); }
            .wrap { max-width: 1180px; margin: 0 auto; }
            .h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.03em; color: var(--text); margin: 0 0 clamp(20px, 2.4vw, 28px); }
            .list { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(28px, 4vw, 56px); border-top: 1px solid var(--border-faint); }
            .item { padding: 22px 0; border-bottom: 1px solid var(--border-faint); }
            .q { font-family: var(--font-serif); font-size: 20px; font-weight: 400; letter-spacing: -0.01em; color: var(--text); margin: 0; }
            .a { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 8px 0 0; }
            @media (max-width: 760px) { .list { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <PageCta
          title={<>See what MambaHR takes <Em>off your plate.</Em></>}
          sub="A 30-minute demo on your real headcount and your own HR questions."
        />
      </main>
      <Footer />
    </>
  )
}
