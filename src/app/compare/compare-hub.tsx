'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

type Entry = { slug: string; name: string; what: string }

/* Every comparison page, grouped by what kind of product it is, so a reader
   finds the system they use today at a glance. */
const GROUPS: { title: string; items: Entry[] }[] = [
  {
    title: 'HR software',
    items: [
      { slug: 'rippling', name: 'Rippling', what: 'HR, payroll and IT in one platform' },
      { slug: 'bamboohr', name: 'BambooHR', what: 'HR records for small teams' },
      { slug: 'hibob', name: 'HiBob', what: 'An HR app employees like' },
      { slug: 'namely', name: 'Namely', what: 'HR software for mid-size teams' },
      { slug: 'lattice', name: 'Lattice', what: 'Reviews, goals and surveys' },
      { slug: 'workday', name: 'Workday', what: 'A large HR suite you configure' },
      { slug: 'ukg', name: 'UKG', what: 'Built for shift-based teams' },
      { slug: 'paylocity', name: 'Paylocity', what: 'Payroll and HR in one suite' },
      { slug: 'zenefits', name: 'Zenefits', what: 'HR in one dashboard' },
    ],
  },
  {
    title: 'Payroll',
    items: [
      { slug: 'gusto', name: 'Gusto', what: 'Payroll for small businesses' },
      { slug: 'adp', name: 'ADP', what: 'Payroll and benefits' },
      { slug: 'paychex', name: 'Paychex', what: 'Payroll and HR services' },
      { slug: 'paycor', name: 'Paycor', what: 'Payroll and HR suite' },
      { slug: 'paycom', name: 'Paycom', what: 'Payroll and HR in one system' },
      { slug: 'onpay', name: 'OnPay', what: 'Small business payroll' },
      { slug: 'quickbooks-payroll', name: 'QuickBooks Payroll', what: 'Payroll inside your books' },
    ],
  },
  {
    title: 'Co-employers',
    items: [
      { slug: 'justworks', name: 'Justworks', what: 'Co-employs your team' },
      { slug: 'trinet', name: 'TriNet', what: 'Co-employer with a rep' },
      { slug: 'insperity', name: 'Insperity', what: 'Co-employer with HR specialists' },
    ],
  },
  {
    title: 'Hiring abroad',
    items: [
      { slug: 'deel', name: 'Deel', what: 'Pays people abroad' },
      { slug: 'remote', name: 'Remote', what: 'Employs people abroad' },
      { slug: 'oyster', name: 'Oyster', what: 'Hires in other countries' },
    ],
  },
  {
    title: 'Hiring tools',
    items: [
      { slug: 'greenhouse', name: 'Greenhouse', what: 'Hiring pipeline' },
      { slug: 'lever', name: 'Lever', what: 'Recruiting and sourcing' },
      { slug: 'ashby', name: 'Ashby', what: 'Recruiting for growing teams' },
      { slug: 'workable', name: 'Workable', what: 'Job posting and sourcing' },
      { slug: 'jazzhr', name: 'JazzHR', what: 'Hiring for small teams' },
      { slug: 'breezyhr', name: 'Breezy HR', what: 'A visual hiring pipeline' },
    ],
  },
]

/* For teams without a system yet. */
const OPTIONS = [
  {
    title: 'Doing it by hand',
    breaks: 'Filing, chasing forms and answering the same questions crowd out the work that needs a person.',
    mamba: 'MambaHR does the repeat admin, so your team spends its time on people.',
  },
  {
    title: 'Adding more software',
    breaks: 'Software stores the work. Someone on your team still does each task, in every tool.',
    mamba: 'MambaHR keeps your records and also does the admin. You approve what matters.',
  },
  {
    title: 'Spreadsheets and Slack',
    breaks: 'No record of who changed what, and a missed payroll change becomes a real problem.',
    mamba: 'MambaHR adds approvals and a log of every change, and still works in Slack.',
  },
]

function Group({ title, items }: { title: string; items: Entry[] }) {
  return (
    <div className="grp">
      <p className="g-t">{title}</p>
      <ul className="g-l">
        {items.map((e) => (
          <li key={e.slug}>
            <Link href={`/compare/${e.slug}`} className="row">
              <span className="r-n">{e.name}</span>
              <span className="r-w">{e.what}</span>
              <svg className="r-a" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .grp { display: grid; gap: 8px; align-content: start; }
        .g-t { margin: 0 0 2px 12px; font-size: 13px; font-weight: 600; color: var(--text-faint); }
        .g-l { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
        .grp :global(.row) {
          display: grid;
          grid-template-columns: minmax(0, auto) minmax(0, 1fr) 16px;
          align-items: baseline;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          transition: background 0.15s ease;
        }
        .grp :global(.row:hover) { background: rgba(255, 255, 255, 0.9); }
        .grp :global(.row:focus-visible) { outline: 2px solid var(--violet); outline-offset: 1px; }
        .r-n { font-family: var(--font-serif); font-size: 19px; letter-spacing: -0.01em; white-space: nowrap; }
        .r-w { font-size: 14px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .r-a { color: var(--text-faint); align-self: center; }
      `}</style>
    </div>
  )
}

export default function CompareHub() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <section className="hub">
          <div className="top">
            <p className="eyebrow" data-reveal="eager">Compare</p>
            <h1 className="title" data-reveal="eager">How MambaHR <Em>compares.</Em></h1>
            <p className="lead" data-reveal="eager">
              Pick the system you use today. Each page puts it side by side with MambaHR,
              including where the other product does more.
            </p>
          </div>

          <div className="stage" data-reveal>
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
            <div className="panel">
              <div className="col wide"><Group {...GROUPS[0]} /></div>
              <div className="col"><Group {...GROUPS[1]} /><Group {...GROUPS[2]} /></div>
              <div className="col"><Group {...GROUPS[3]} /><Group {...GROUPS[4]} /></div>
            </div>
          </div>
        </section>

        <section className="none">
          <div className="wrap">
            <h2 className="h2" data-reveal>No HR system yet?</h2>
            <div className="opts">
              {OPTIONS.map((o) => (
                <div key={o.title} className="opt" data-reveal>
                  <p className="o-t">{o.title}</p>
                  <p className="o-b">{o.breaks}</p>
                  <p className="o-m"><b>With MambaHR:</b> {o.mamba}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PageCta
          title={<>See it on <Em>your own requests.</Em></>}
          sub="A 30-minute demo using examples from your company."
        />
      </main>
      <Footer />

      <style jsx>{`
        .hub { background: var(--bg); padding: clamp(128px, 13vw, 168px) var(--page-pad) clamp(48px, 6vw, 80px); }
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
        .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 52ch; margin: 24px auto 0; text-wrap: pretty; }

        .stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          max-width: 1320px;
          margin: clamp(48px, 6vw, 72px) auto 0;
          border-radius: 32px;
          padding: clamp(20px, 4vw, 56px);
          background: var(--stage-field);
        }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
        .panel {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(16px, 2.4vw, 32px);
          padding: clamp(16px, 2.4vw, 28px);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.7);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 30px 60px -30px rgba(60, 40, 90, 0.45);
        }
        .col { display: grid; gap: 20px; align-content: start; }
        .col + .col { border-left: 1px solid rgba(26, 26, 25, 0.07); padding-left: clamp(12px, 2vw, 24px); }

        .none { background: var(--bg); padding: clamp(24px, 4vw, 48px) var(--page-pad) clamp(40px, 5vw, 64px); }
        .wrap { max-width: 1180px; margin: 0 auto; }
        .h2 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.4vw, 40px); letter-spacing: -0.03em; color: var(--text); margin: 0 0 24px; }
        .opts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--border-faint); }
        .opt { display: grid; gap: 10px; align-content: start; padding: 24px 28px 8px 0; }
        .opt + .opt { padding-left: 28px; border-left: 1px solid var(--border-faint); }
        .o-t { margin: 0; font-family: var(--font-serif); font-size: 22px; letter-spacing: -0.01em; color: var(--text); }
        .o-b { margin: 0; font-size: 15px; line-height: 1.55; color: var(--text-muted); }
        .o-m { margin: 0; font-size: 15px; line-height: 1.55; color: var(--text); }
        .o-m b { font-weight: 600; }

        @media (max-width: 1000px) {
          .panel { grid-template-columns: 1fr 1fr; }
          .col.wide { grid-column: 1 / -1; }
          .col + .col { border-left: 0; padding-left: 0; }
        }
        @media (max-width: 700px) {
          .panel { grid-template-columns: 1fr; }
          .opts { grid-template-columns: 1fr; }
          .opt, .opt + .opt { padding: 20px 0 8px; border-left: 0; }
          .opt + .opt { border-top: 1px solid var(--border-faint); }
        }
      `}</style>
    </>
  )
}
