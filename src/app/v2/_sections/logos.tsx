'use client'

const LOGOS = ['Gusto', 'Workday', 'Rippling', 'BambooHR', 'Namely', 'ADP']

export default function Logos() {
  return (
    <section className="logos">
      <p className="kicker" data-reveal>Your data imports from your current HRIS in a day</p>
      <div className="row" data-reveal data-delay="1">
        {LOGOS.map((l) => (
          <span key={l} className="logo">{l}</span>
        ))}
        <span className="arrow" aria-hidden="true">
          <svg width="26" height="14" viewBox="0 0 26 14"><path d="M1 7h22m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="mamba"><span className="m">M</span>MambaHR</span>
      </div>
      <p className="sub" data-reveal data-delay="2">
        One import: people, comp, balances, and reporting lines. We check it line by line before you go live.
      </p>

      <style jsx>{`
        .logos {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: clamp(44px, 6vw, 72px) var(--page-pad);
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
          font-size: clamp(15px, 1.6vw, 18px);
          color: var(--text-faint);
          letter-spacing: -0.01em;
          opacity: 0.92;
          filter: saturate(0);
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .logo:hover {
          opacity: 1;
          color: var(--text-muted);
        }
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
          .arrow { animation: none; }
        }
      `}</style>
    </section>
  )
}
