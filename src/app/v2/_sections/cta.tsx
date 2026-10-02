'use client'

import { SIGNUP_URL, TRIAL_LABEL, DEMO_HREF, DEMO_LABEL } from '@/content/cta'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Cta() {
  return (
    <section className="cta" id="access">
      <div className="panel" data-reveal>
        <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /><i className="grain" /></span>
        <h2 className="title">Try it on your own HR work.</h2>
        <p className="sub">Start a free trial and set up your company yourself, or book a 30-minute demo and we walk you through it. Your data imports in a day.</p>
        <div className="ctas">
          <a className="main" href={SIGNUP_URL} data-track="cta_click" data-track-label="trial:access-band">{TRIAL_LABEL}</a>
          <a className="alt" href={DEMO_HREF} data-track="cta_click" data-track-label="access-band">{DEMO_LABEL}</a>
        </div>
        <p className="trust">Your data imports in a day. Nothing sensitive happens without your OK.</p>
      </div>

      <style jsx>{`
        .cta { padding: clamp(40px, 6vw, 72px) var(--page-pad) clamp(72px, 9vw, 110px); background: var(--bg); }
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
        .field { position: absolute; inset: 0; z-index: -1; background: linear-gradient(155deg, #f3c796 0%, #eab2a4 40%, #c3aee0 72%, #9d8fe0 100%); }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, rgba(255, 226, 184, 0.95), rgba(255, 226, 184, 0) 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, rgba(139, 127, 208, 0.9), rgba(139, 127, 208, 0) 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, rgba(255, 246, 234, 0.8), rgba(255, 246, 234, 0) 70%); }
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
        .main:focus-visible, .alt:focus-visible { outline: 2px solid #6a5da6; outline-offset: 3px; }
        .trust { margin: 26px 0 0; font-size: 13.5px; opacity: 0.66; }
      `}</style>
    </section>
  )
}
