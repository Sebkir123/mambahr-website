'use client'

const TAKES = [
  'Onboarding paperwork',
  'Leave and time off',
  'Chasing approvals',
  'Payroll changes',
  'Compliance checks',
  'Repeat questions',
]

const KEEPS = ['Hiring decisions', 'Conversations with employees', 'Anything sensitive']

export default function Statement() {
  return (
    <section className="st">
      <div className="inner">
        <div className="copy" data-reveal>
          <p className="eyebrow">Where the week goes</p>
          <h2 className="line">
            Less admin. More time for <span className="em">your people.</span>
          </h2>
          <p className="body">
            Most HR weeks disappear into paperwork, approvals and the same questions. MambaHR
            takes that work on and keeps every record up to date. Your team keeps the
            conversations and the decisions.
          </p>
          <p className="stat">
            <span className="num">57%</span>
            <span>of HR time goes to admin, not people. Source: Eddy HR operations report.</span>
          </p>
        </div>

        <figure className="board" data-reveal data-delay="1">
          <figcaption className="sr">
            MambaHR takes on onboarding paperwork, leave and time off, chasing approvals, payroll
            changes, compliance checks and repeat questions. Your team keeps hiring decisions,
            conversations with employees, and anything sensitive.
          </figcaption>

          <div className="group">
            <span className="g-label"><span className="agent-mark g-mark" aria-hidden="true" />MambaHR takes on</span>
            <div className="blocks">
              {TAKES.map((t, i) => (
                <span key={t} className="blk take" style={{ ['--i' as string]: i }}>
                  <span className="chk" aria-hidden="true" />
                  <span className="blk-t">{t}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="group">
            <span className="g-label"><span className="you" aria-hidden="true" />Your team keeps</span>
            <div className="blocks">
              {KEEPS.map((t) => (
                <span key={t} className="blk keep">
                  <span className="blk-t">{t}</span>
                </span>
              ))}
            </div>
          </div>

          <p className="rule">Nothing sensitive happens without your OK.</p>
        </figure>
      </div>

      <style jsx>{`
        .st {
          background: var(--bg-warm);
          padding: clamp(80px, 10vw, 128px) var(--page-pad);
        }
        .inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
          gap: clamp(36px, 6vw, 80px);
          align-items: center;
        }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
          margin: 0 0 16px;
        }
        .line {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(34px, 4.4vw, 56px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0;
          text-wrap: balance;
        }
        .em {
          font-style: italic;
          background: var(--grad);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .body { margin: 22px 0 0; font-size: 17px; line-height: 1.65; color: var(--text-muted); max-width: 46ch; }
        .stat {
          margin: 28px 0 0;
          padding-top: 20px;
          border-top: 1px solid var(--border-faint);
          display: flex;
          align-items: baseline;
          gap: 14px;
          font-size: 14px;
          color: var(--text-faint);
          max-width: 46ch;
        }
        .num { font-family: var(--font-serif); font-size: 34px; letter-spacing: -0.02em; color: var(--gold); line-height: 1; flex: none; }

        .board {
          margin: 0;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: clamp(20px, 3vw, 32px);
          display: grid;
          gap: 26px;
          box-shadow: var(--shadow-md);
        }
        .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .group { display: grid; gap: 12px; }
        .g-label { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: var(--text); }
        .g-mark { --am-size: 26px; }
        .you { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(140deg, #f3c796, #d4aa7c); box-shadow: inset 0 0 0 5px #fbf2e6; }
        .blocks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .blk {
          position: relative;
          min-height: 84px;
          border-radius: var(--radius-md);
          padding: 42px 14px 12px;
          display: flex;
          align-items: flex-end;
          font-size: 14px;
          line-height: 1.3;
          color: var(--text);
        }
        .blk.take {
          background: #f7f5fd;
          border: 1px dashed #cfc7ee;
          transition: background 0.5s ease, border-color 0.5s ease;
          transition-delay: calc(0.3s + var(--i) * 0.12s);
        }
        .blk.keep {
          padding-top: 12px;
          min-height: 64px;
          background: linear-gradient(160deg, #fbf2e6, #f6e7d3);
          border: 1px solid #ecd9bf;
          font-weight: 500;
        }
        .chk {
          position: absolute;
          top: 12px;
          left: 14px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid #cfc7ee;
          background: #fff;
          transition: background 0.4s ease, border-color 0.4s ease;
          transition-delay: calc(0.4s + var(--i) * 0.12s);
        }
        .chk::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2.5px;
          width: 4px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
          transition: opacity 0.3s ease;
          transition-delay: calc(0.5s + var(--i) * 0.12s);
        }
        /* Before the section scrolls in, the six read as open admin; once it does, MambaHR has done them. */
        :global(html:not(.js-reveal)) .blk.take,
        .board:global(.in) .blk.take { background: linear-gradient(160deg, #f1eefd, #e7e2fa); border: 1px solid #d9d2f5; }
        :global(html:not(.js-reveal)) .chk,
        .board:global(.in) .chk { background: var(--violet); border-color: var(--violet); }
        :global(html:not(.js-reveal)) .chk::after,
        .board:global(.in) .chk::after { opacity: 1; }
        .rule { margin: 0; padding-top: 18px; border-top: 1px solid var(--border-faint); font-size: 15px; color: var(--text-muted); }

        @media (max-width: 960px) {
          .inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .blocks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blk.take, .chk, .chk::after { transition: none; }
        }
      `}</style>
    </section>
  )
}
