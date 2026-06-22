'use client'

import Link from 'next/link'

const ROWS = [
  { them: 'File the I-9, chase E-Verify', themCost: '45 min', us: 'I-9 filed, E-Verify cleared', usWhen: '9:02 AM' },
  { them: 'Hunt down the right approver', themCost: '3 emails', us: 'Routed and approved in policy', usWhen: '9:04 AM' },
  { them: 'Google the multi-state leave rule', themCost: '1 hr + Legal', us: 'Answered, statute attached', usWhen: '9:06 AM' },
  { them: 'Build the headcount report', themCost: '2 hrs', us: 'Report generated on ask', usWhen: '9:11 AM' },
  { them: 'Onboard the new hire, click by click', themCost: 'half a day', us: 'Day-one ready, accounts and all', usWhen: '9:14 AM' },
  { them: 'Answer the same PTO question. Again.', themCost: 'daily', us: 'Answered in Slack, instantly', usWhen: 'always' },
]

export default function Difference() {
  return (
    <section className="df">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Why MambaHR</p>
          <h2 className="title">
            Your HRIS hosts the work. MambaHR <span className="em">does it.</span>
          </h2>
          <p className="lead">
            Same employee data. Same compliance. One difference: who actually pushes the buttons.
          </p>
        </div>

        <div className="cols" data-reveal data-delay="1">
          {/* Your to-do list with any other HRIS */}
          <div className="col them">
            <div className="t-head">
              <span className="t-title">Monday, with your HRIS</span>
              <span className="t-sub">Rippling · Gusto · Workday · BambooHR</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.them} className="t-line">
                <span className="box" aria-hidden="true" />
                <span className="t-text">{r.them}</span>
                <span className="cost">{r.themCost}</span>
              </div>
            ))}
            <div className="t-foot">
              Still yours to do <b>&asymp; 9 hrs / week</b>
            </div>
          </div>

          {/* The same Monday, on MambaHR, dark agent surface */}
          <div className="col us agent-edge agent-working agent-lg">
            <div className="u-head">
              <span className="u-title"><span className="logo">M</span>MambaHR</span>
              <span className="mamba-chip working ondark"><span className="mc-i" aria-hidden="true" />Mamba · working</span>
            </div>
            <div className="u-sub">Monday, with the AI HR department</div>
            {ROWS.map((r) => (
              <div key={r.us} className="u-line">
                <span className="check" aria-hidden="true" />
                <span className="u-text">{r.us}</span>
                <span className="when">{r.usWhen}</span>
              </div>
            ))}
            <div className="u-foot">
              Still yours to do <b>one tap: Approve</b>
            </div>
          </div>
        </div>

        <div className="compare" data-reveal data-delay="2">
          <span className="cmp-l">See exactly how we compare</span>
          <Link href="/compare/rippling">vs Rippling</Link>
          <Link href="/compare/gusto">vs Gusto</Link>
          <Link href="/compare/workday">vs Workday</Link>
          <Link href="/compare/bamboohr">vs BambooHR</Link>
        </div>
      </div>

      <style jsx>{`
        .df { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: none; margin-bottom: clamp(44px, 5vw, 64px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.08; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(17px, 2vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 20px 0 0; max-width: 620px; }

        .cols {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(18px, 2.6vw, 34px);
          align-items: center;
        }
        .col { border-radius: 18px; display: flex; flex-direction: column; }

        /* ── The paper to-do list ── */
        .them {
          background:
            repeating-linear-gradient(180deg, transparent 0 47px, var(--border-faint) 47px 48px),
            #FFFEFB;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          padding: 26px 24px 22px;
          transform: rotate(-1deg);
        }
        .t-head { padding-bottom: 14px; }
        .t-title {
          display: block;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 21px;
          color: var(--text-muted);
        }
        .t-sub {
          display: block;
          margin-top: 5px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-faint);
        }
        .t-line {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 48px;
          font-size: 14.5px;
          color: var(--text-muted);
        }
        .box {
          flex: none;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--border-mid);
          border-radius: 4px;
          background: #fff;
        }
        .t-text { flex: 1; min-width: 0; }
        .cost {
          flex: none;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #A8552F;
          white-space: nowrap;
        }
        .t-foot {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px dashed var(--border-mid);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          font-size: 13px;
          color: var(--text-faint);
        }
        .t-foot b { font-family: var(--font-mono); font-size: 13px; color: #A8552F; font-weight: 600; }

        /* ── The dark agent surface ── */
        .us {
          background:
            radial-gradient(80% 60% at 12% 0%, rgba(185, 138, 78, 0.22), transparent 58%),
            radial-gradient(70% 55% at 95% 10%, rgba(106, 93, 166, 0.26), transparent 60%),
            #14110C;
          padding: 28px 26px 24px;
          box-shadow: var(--shadow-float);
        }
        .u-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .u-title { display: flex; align-items: center; gap: 10px; font-size: 16.5px; font-weight: 700; color: #fff; }
        .logo {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: #fff;
          color: #14110C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 16px;
        }
        :global(.mamba-chip.ondark) { color: #AEA2E6; }
        :global(.mamba-chip.ondark .mc-i) { background: #AEA2E6; }
        .u-sub {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.55);
          margin: 14px 0 6px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .u-line {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12.5px 0;
          font-size: 15px;
        }
        .u-line + .u-line { border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .u-text { flex: 1; min-width: 0; color: rgba(255, 255, 255, 0.94); font-weight: 500; }
        .when {
          flex: none;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #8FC9A4;
          white-space: nowrap;
        }
        .check {
          flex: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--color-green);
          position: relative;
        }
        .check::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 3.5px;
          width: 4px;
          height: 8px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .u-foot {
          margin-top: 16px;
          padding: 13px 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .u-foot b {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          background: linear-gradient(100deg, #D4AA7C, #AEA2E6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .compare { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .cmp-l { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); margin-right: 4px; }
        .compare :global(a) {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 15px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .compare :global(a:hover) { color: var(--text); border-color: var(--border-mid); }

        @media (max-width: 760px) {
          .cols { grid-template-columns: 1fr; }
          .them { transform: none; }
        }
      `}</style>
    </section>
  )
}
