'use client'

import Link from 'next/link'

const ROWS = [
  { them: 'File the Form I-9, chase E-Verify', themCost: '45 min', us: 'Form I-9 and E-Verify check started', usWhen: '9:02' },
  { them: 'Find the right person to approve', themCost: '3 emails', us: 'Approved, within your policy', usWhen: '9:04' },
  { them: 'Look up the family leave (FMLA) rule', themCost: '1 hr', us: 'Answered, with the law cited', usWhen: '9:06' },
  { them: 'Build the headcount report', themCost: '2 hrs', us: 'Report ready when asked', usWhen: '9:11' },
  { them: 'Set up the new hire, click by click', themCost: 'half a day', us: 'Day one ready, accounts and all', usWhen: '9:14' },
  { them: 'Answer the same time-off question', themCost: 'every day', us: 'Answered in Slack right away', usWhen: 'always' },
]

/* The same Monday twice: by hand, and with MambaHR. Both cards share one grid
   (subgrid rows), so each task sits level with its MambaHR counterpart. */
export default function Difference() {
  return (
    <section className="df">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Why MambaHR</p>
          <h2 className="title">
            Your HR system stores the data. MambaHR also <span className="em">does the admin.</span>
          </h2>
          <p className="lead">
            Same employee records, in one place. The difference: the forms, reminders and approvals get done for you.
          </p>
        </div>

        <div className="cols" data-reveal data-delay="1">
          <div className="col them">
            <div className="c-head">
              <span className="c-t">Monday, by hand</span>
              <span className="c-s">In your current HR software</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.them} className="row">
                <span className="box" aria-hidden="true" />
                <span className="r-t">{r.them}</span>
                <span className="r-v cost">{r.themCost}</span>
              </div>
            ))}
            <div className="c-foot">
              <span>Monday alone</span>
              <b>about 9 hours</b>
            </div>
          </div>

          <div className="col us">
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /></span>
            <div className="c-head">
              <span className="c-t"><span className="agent-mark c-mark" aria-hidden="true" />Monday, with MambaHR</span>
              <span className="c-s">Done for you, and logged</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.us} className="row">
                <span className="check" aria-hidden="true" />
                <span className="r-t">{r.us}</span>
                <span className="r-v">{r.usWhen}</span>
              </div>
            ))}
            <div className="c-foot">
              <span>Left for you</span>
              <b>the judgment calls</b>
            </div>
          </div>
        </div>

        <p className="compare" data-reveal data-delay="2">
          Compare MambaHR with{' '}
          <Link href="/compare/rippling">Rippling</Link>,{' '}
          <Link href="/compare/gusto">Gusto</Link>,{' '}
          <Link href="/compare/workday">Workday</Link> or{' '}
          <Link href="/compare/bamboohr">BambooHR</Link>.
        </p>
      </div>

      <style jsx>{`
        .df { background: var(--bg); padding-block: clamp(80px, 10vw, 128px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { margin-bottom: clamp(40px, 5vw, 56px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 16px; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(34px, 4.6vw, 58px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0;
          max-width: 22ch;
          text-wrap: balance;
        }
        .em { font-style: italic; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .lead { font-size: 18px; line-height: 1.6; color: var(--text-muted); max-width: 56ch; margin: 20px 0 0; }

        .cols {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: auto repeat(6, auto) auto;
          column-gap: 20px;
        }
        .col {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          grid-row: 1 / span 8;
          display: grid;
          grid-template-rows: subgrid;
          padding: 8px 28px;
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          box-shadow: var(--shadow-md);
        }
        .us { background: linear-gradient(155deg, #f8e6cf 0%, #f3dadc 45%, #e6def6 100%); }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(50px); }
        .f1 { width: 60%; height: 60%; left: -15%; top: -25%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 60%; height: 70%; right: -20%; bottom: -30%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }

        .c-head { display: grid; gap: 4px; padding: 22px 0 18px; border-bottom: 1px solid var(--border-faint); }
        .us .c-head { border-bottom-color: rgba(26, 26, 25, 0.08); }
        .c-t { display: flex; align-items: center; gap: 10px; font-family: var(--font-serif); font-size: 22px; letter-spacing: -0.01em; color: var(--text); }
        .c-s { font-size: 14px; color: var(--text-faint); }
        .c-mark { --am-size: 28px; }

        .row { display: grid; grid-template-columns: 20px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 13px 0; font-size: 15px; color: var(--text); border-bottom: 1px solid var(--border-faint); }
        .us .row { border-bottom-color: rgba(26, 26, 25, 0.07); }
        .them .r-t { color: var(--text-muted); }
        .r-v { font-size: 13px; color: var(--text-faint); font-variant-numeric: tabular-nums; white-space: nowrap; }
        .cost { color: #984608; }
        .box { width: 18px; height: 18px; border-radius: var(--radius-xs); border: 1.5px solid var(--border-mid); background: #fff; }
        .check { width: 20px; height: 20px; border-radius: 50%; background: var(--color-green); position: relative; }
        .check::after { content: ''; position: absolute; left: 7px; top: 3.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }

        .c-foot { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 18px 0 20px; font-size: 14px; color: var(--text-faint); }
        .c-foot b { font-family: var(--font-serif); font-weight: 400; font-size: 20px; color: var(--text); }
        .them .c-foot b { color: #984608; }

        .compare { margin: 24px 0 0; font-size: 15px; color: var(--text-muted); }
        .compare :global(a) { color: var(--text); font-weight: 600; text-decoration: underline; text-decoration-color: var(--border-mid); text-underline-offset: 3px; }
        .compare :global(a:hover) { text-decoration-color: var(--text); }

        @media (max-width: 860px) {
          .cols { grid-template-columns: 1fr; grid-template-rows: none; row-gap: 16px; }
          .col { grid-row: auto; grid-template-rows: none; display: block; padding: 4px 20px; }
          .row { font-size: 14.5px; }
        }
      `}</style>
    </section>
  )
}
