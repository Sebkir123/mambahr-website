'use client'

const HRIS = ['Gusto', 'BambooHR', 'Rippling', 'Workday', 'ADP', 'Namely']
const ATS = ['Greenhouse', 'Lever']

export default function Logos() {
  return (
    <section className="logos">
      <p className="kicker" data-reveal>Imports from</p>
      <div className="row" data-reveal data-delay="1">
        {HRIS.map((l) => (
          <span key={l} className="logo">{l}</span>
        ))}
        <span className="sep" aria-hidden="true" />
        {ATS.map((l) => (
          <span key={l} className="logo">{l}</span>
        ))}
        <span className="arrow" aria-hidden="true">
          <svg width="26" height="14" viewBox="0 0 26 14"><path d="M1 7h22m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="mamba"><span className="m">M</span>MambaHR</span>
      </div>
      <p className="sub" data-reveal data-delay="2">
        One-time import of people, comp, balances, reporting lines, and open pipelines. Not a customer list: these are the systems we read on day one.
      </p>

      <style jsx>{`
        .logos {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: clamp(32px, 4vw, 52px) var(--page-pad);
          text-align: center;
        }
        .kicker {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-faint);
          margin: 0 0 26px;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(20px, 3.4vw, 44px);
          padding-top: 26px;
          border-top: 1px solid var(--border-faint);
        }
        .logo {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(14px, 1.4vw, 16px);
          color: var(--text-faint);
          letter-spacing: -0.01em;
          opacity: 0.92;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .logo:hover {
          opacity: 1;
          color: var(--text-muted);
        }
        .sep { width: 1px; height: 18px; background: var(--border-mid); }
        .arrow {
          color: var(--gold);
          display: inline-flex;
          animation: nudge 2.6s ease-in-out infinite;
        }
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .mamba {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: clamp(15px, 1.6vw, 18px);
          color: var(--text);
        }
        .mamba .m {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: #1A1A19;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 16px;
        }
        .sub {
          font-size: 14px;
          color: var(--text-faint);
          margin: 22px 0 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .sep { width: 1px; height: 18px; background: var(--border-mid); }
        .arrow { animation: none; }
        }
      `}</style>
    </section>
  )
}
