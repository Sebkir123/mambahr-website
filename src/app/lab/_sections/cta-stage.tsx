'use client'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function CtaStage({ variant = 'day' }: { variant?: 'day' | 'night' }) {
  return (
    <section className={`cta ${variant}`} id="access">
      <div className="panel" data-reveal>
        <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /><i className="grain" /></span>
        <h2 className="title">See MambaHR do a week of HR work in 30 minutes.</h2>
        <p className="sub">Book a demo this week. We import your data the day you sign, and the work starts the next morning.</p>
        <div className="ctas">
          <a className="main" href="/demo" data-track="cta_click" data-track-label="access-band">Book a demo</a>
          <a className="alt" href="/pricing">See pricing</a>
        </div>
        <p className="trust">Your data imports in a day. A person signs off on every termination.</p>
      </div>

      <style jsx>{`
        .cta { padding: clamp(40px, 6vw, 72px) var(--page-pad) clamp(72px, 9vw, 110px); background: var(--bg); }
        .cta.night { background: #100d14; }
        .panel {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          max-width: 1320px;
          margin: 0 auto;
          border-radius: 32px;
          padding: clamp(72px, 10vw, 132px) var(--page-pad);
          text-align: center;
          color: #1a1a19;
        }
        .night .panel { color: #f6f1e7; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08); }
        .field { position: absolute; inset: 0; z-index: -1; background: linear-gradient(155deg, #f3c796 0%, #eab2a4 40%, #c3aee0 72%, #9d8fe0 100%); }
        .night .field { background: linear-gradient(160deg, #3a2a3a 0%, #2a2140 50%, #1b1630 100%); }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, rgba(255, 226, 184, 0.95), rgba(255, 226, 184, 0) 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, rgba(139, 127, 208, 0.9), rgba(139, 127, 208, 0) 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, rgba(255, 246, 234, 0.8), rgba(255, 246, 234, 0) 70%); }
        .night .f1 { background: radial-gradient(circle, rgba(222, 158, 92, 0.6), rgba(222, 158, 92, 0) 70%); }
        .night .f2 { background: radial-gradient(circle, rgba(128, 108, 230, 0.75), rgba(128, 108, 230, 0) 70%); }
        .night .f3 { background: radial-gradient(circle, rgba(255, 220, 180, 0.12), rgba(255, 220, 180, 0) 70%); }
        .field .grain { inset: 0; border-radius: 0; filter: none; background-image: ${GRAIN}; background-size: 220px; opacity: 0.35; mix-blend-mode: overlay; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(38px, 5.6vw, 76px);
          line-height: 1;
          letter-spacing: -0.04em;
          max-width: 15ch;
          margin: 0 auto;
          color: inherit;
          text-wrap: balance;
        }
        .sub { font-size: clamp(16px, 1.7vw, 19px); line-height: 1.6; max-width: 52ch; margin: 22px auto 0; opacity: 0.78; }
        .ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 34px; }
        .main, .alt { display: inline-flex; align-items: center; height: 50px; padding: 0 26px; border-radius: 999px; font-weight: 600; font-size: 16px; text-decoration: none; transition: transform 0.2s ease, background 0.2s ease; }
        .main { background: #1a1a19; color: #fff; box-shadow: 0 10px 24px -8px rgba(20, 18, 14, 0.45); }
        .main:hover { transform: translateY(-2px); }
        .alt { background: rgba(255, 255, 255, 0.5); color: #1a1a19; border: 1px solid rgba(26, 26, 25, 0.14); }
        .alt:hover { background: #fff; }
        .night .main { background: #f6f1e7; color: #100d14; }
        .night .alt { background: rgba(255, 255, 255, 0.06); color: #f6f1e7; border-color: rgba(255, 255, 255, 0.18); }
        .main:focus-visible, .alt:focus-visible { outline: 2px solid #6a5da6; outline-offset: 3px; }
        .trust { margin: 26px 0 0; font-size: 13.5px; opacity: 0.66; }
      `}</style>
    </section>
  )
}
