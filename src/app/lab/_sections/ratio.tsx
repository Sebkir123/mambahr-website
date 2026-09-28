'use client'

const SIX = [
  'Onboarding paperwork',
  'Leave and time off',
  'Chasing approvals',
  'Payroll changes',
  'Compliance lookups',
  'Employee questions',
]

const STATS = [
  { n: '53%', l: 'of companies penalized for payroll noncompliance in five years' },
  { n: '$4,700', l: 'average cost to hire one employee' },
  { n: '57%', l: 'of HR time goes to admin duties, not strategy' },
]

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Ratio() {
  return (
    <section className="ratio">
      <span className="glow" aria-hidden="true" />
      <span className="grain" aria-hidden="true" />
      <div className="inner">
        <div className="copy" data-reveal>
          <h2 className="line">
            You bought the software. You still <span className="em">do the work.</span>
          </h2>
          <p className="body">
            Every HR system needs people clicking the buttons. For every dollar spent on the
            system, companies spend six on the humans operating it. MambaHR does the clicking,
            so your people get that six back.
          </p>
        </div>

        <figure className="graph" data-reveal data-delay="1">
          <figcaption className="sr">
            One dollar goes to HR software. Six dollars go to people doing the work inside it:
            onboarding paperwork, leave and time off, chasing approvals, payroll changes,
            compliance lookups and employee questions. MambaHR does those six.
          </figcaption>

          <div className="row">
            <div className="lab">
              <span className="amt">$1</span>
              <span className="what">on the HR system</span>
            </div>
            <div className="blocks one">
              <span className="blk sw">
                <span className="blk-t">Gusto, BambooHR, Rippling</span>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="lab">
              <span className="amt">$6</span>
              <span className="what">on people clicking its buttons</span>
            </div>
            <div className="blocks six">
              {SIX.map((t, i) => (
                <span key={t} className="blk job" style={{ ['--i' as string]: i }}>
                  <span className="chk" aria-hidden="true" />
                  <span className="blk-t">{t}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="verdict">
            <span className="mark" aria-hidden="true">M</span>
            <span>MambaHR does all six. You approve the judgment calls.</span>
          </div>
        </figure>

        <div className="stats" data-reveal data-delay="2">
          {STATS.map((s) => (
            <div key={s.l} className="stat">
              <span className="num">{s.n}</span>
              <span className="lbl">{s.l}</span>
            </div>
          ))}
        </div>
        <p className="cite">
          Sources: Alight payroll compliance study, SHRM cost-per-hire benchmark, and Eddy HR operations report.
        </p>
      </div>

      <style jsx>{`
        .ratio {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: #14110c;
          color: #f6f1e7;
          padding: clamp(80px, 10vw, 136px) var(--page-pad);
        }
        .glow {
          position: absolute;
          z-index: -1;
          width: 900px;
          height: 700px;
          right: -240px;
          top: -200px;
          border-radius: 50%;
          filter: blur(110px);
          background: radial-gradient(circle, rgba(118, 98, 214, 0.45), rgba(118, 98, 214, 0) 70%);
        }
        .grain { position: absolute; inset: 0; z-index: -1; background-image: ${GRAIN}; background-size: 220px; opacity: 0.3; mix-blend-mode: overlay; }
        .inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.25fr);
          gap: clamp(36px, 6vw, 88px);
          align-items: center;
        }
        .line {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(34px, 4.4vw, 58px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin: 0;
          color: #f6f1e7;
          text-wrap: balance;
        }
        .em {
          font-style: italic;
          background: linear-gradient(100deg, #e0b884, #b7a8f5);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .body { margin: 24px 0 0; font-size: 17px; line-height: 1.65; color: rgba(246, 241, 231, 0.72); max-width: 46ch; }

        .graph { margin: 0; display: grid; gap: 22px; }
        .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .row { display: grid; grid-template-columns: 130px 1fr; gap: 18px; align-items: start; }
        .lab { padding-top: 14px; }
        .lab { display: grid; gap: 2px; }
        .amt { font-family: var(--font-serif); font-size: 44px; line-height: 1; letter-spacing: -0.03em; }
        .what { font-size: 13px; color: rgba(246, 241, 231, 0.6); line-height: 1.35; }
        .blocks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .blk {
          position: relative;
          min-height: 88px;
          border-radius: 14px;
          padding: 44px 14px 12px;
          display: flex;
          align-items: flex-end;
          font-size: 14px;
          line-height: 1.3;
        }
        .blk.sw {
          grid-column: span 1;
          background: linear-gradient(160deg, #e0b884, #9a7340);
          color: #1d160c;
          font-weight: 600;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        .blk.job {
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(246, 241, 231, 0.22);
          color: rgba(246, 241, 231, 0.78);
          transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
          transition-delay: calc(0.35s + var(--i) * 0.12s);
        }
        .chk {
          position: absolute;
          top: 12px;
          left: 14px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(246, 241, 231, 0.28);
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
          transition-delay: calc(0.45s + var(--i) * 0.12s);
        }
        .chk::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2.5px;
          width: 4px;
          height: 9px;
          border: solid #14110c;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
          transition: opacity 0.3s ease;
          transition-delay: calc(0.55s + var(--i) * 0.12s);
        }
        /* Before the section is in view the six read as open work; once it is, MambaHR takes them. */
        :global(html:not(.js-reveal)) .blk.job,
        .graph:global(.in) .blk.job {
          background: linear-gradient(165deg, rgba(139, 127, 208, 0.34), rgba(106, 93, 166, 0.16));
          border: 1px solid rgba(183, 168, 245, 0.45);
          color: #f6f1e7;
        }
        :global(html:not(.js-reveal)) .chk,
        .graph:global(.in) .chk { background: #b7a8f5; border-color: #b7a8f5; }
        :global(html:not(.js-reveal)) .chk::after,
        .graph:global(.in) .chk::after { opacity: 1; }

        .verdict {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 148px;
          font-size: 15px;
          color: rgba(246, 241, 231, 0.86);
        }
        .mark {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #f6f1e7;
          color: #14110c;
          display: grid;
          place-items: center;
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 16px;
          flex: none;
        }

        .stats {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid rgba(246, 241, 231, 0.12);
          margin-top: clamp(8px, 2vw, 24px);
        }
        .stat { padding: 26px 24px 0 0; display: grid; gap: 6px; }
        .stat + .stat { padding-left: 24px; border-left: 1px solid rgba(246, 241, 231, 0.12); }
        .num { font-family: var(--font-serif); font-size: clamp(30px, 3.2vw, 40px); letter-spacing: -0.02em; color: #e0b884; line-height: 1; }
        .lbl { font-size: 14px; color: rgba(246, 241, 231, 0.64); line-height: 1.45; max-width: 30ch; }
        .cite { grid-column: 1 / -1; margin: 0; font-size: 12px; color: rgba(246, 241, 231, 0.42); }

        @media (max-width: 960px) {
          .inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .row { grid-template-columns: 1fr; gap: 10px; }
          .blocks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lab { padding-top: 0; }
          .verdict { margin-left: 0; }
          .stats { grid-template-columns: 1fr; }
          .stat + .stat { padding-left: 0; border-left: 0; border-top: 1px solid rgba(246, 241, 231, 0.12); padding-top: 18px; margin-top: 18px; }
          .blk { min-height: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .blk.job, .chk, .chk::after { transition: none; }
        }
      `}</style>
    </section>
  )
}
