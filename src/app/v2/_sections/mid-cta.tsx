'use client'

export default function MidCta() {
  return (
    <section className="mc">
      <div className="inner" data-reveal>
        <h3 className="line">Stop paying people to push buttons.</h3>
        <p className="sub">See what your team gets back in a 30-minute demo.</p>
        <a href="#access" className="btn">Request access</a>
      </div>

      <style jsx>{`
        .mc {
          background: var(--bg);
          padding-block: clamp(28px, 4vw, 48px);
        }
        .inner {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: clamp(40px, 5vw, 64px) var(--page-pad);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          text-align: center;
          background:
            radial-gradient(70% 120% at 50% 0%, rgba(185, 138, 78, 0.07), transparent 60%);
        }
        .line {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0;
        }
        .sub {
          font-size: clamp(15px, 1.8vw, 17px);
          color: var(--text-muted);
          margin: 14px 0 26px;
        }
        .btn {
          display: inline-block;
          background: #1A1A19;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 999px;
          box-shadow: 0 10px 24px rgba(20, 18, 14, 0.18);
          transition: transform 0.15s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .btn:hover { transform: none; }
        }
      `}</style>
    </section>
  )
}
