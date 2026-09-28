'use client'

import { AppFrame, TodoDesk, COMP_CHANGE } from '@/components/mockups'

const HERO_QUEUE = [
  { name: 'Jackson Bauer', kind: 'Compensation change', date: 'Today' },
  { name: 'Leo Schulz', kind: 'Leave request', date: 'Tomorrow' },
  { name: 'Priya Nair', kind: 'Offer above band', date: 'Thu' },
]
const HERO_FOCUS = {
  ...COMP_CHANGE,
  position: '',
  read: 'Above band for level 4 by 8%. Peers sit at $152k and $158k. Recommend $160k, or hold for the cycle.',
}

const STEPS = [
  { t: 'Form I-9 sent to Maya', at: '9:02' },
  { t: 'Okta, Slack and Google requested', at: '9:02' },
  { t: 'Laptop request sent to IT', at: '9:03' },
  { t: 'Added to the June 15 payroll changes', at: '9:03' },
]

// Grain for the light field: fractal noise, alpha only, tiled.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function HeroStage({ variant = 'day' }: { variant?: 'day' | 'night' }) {
  return (
    <section className={`hero ${variant}`}>
      <div className="sky" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="glow g3" />
        <span className="grain" />
      </div>

      <div className="top">
        <span className="eyebrow">The AI HR department</span>
        <h1 className="title">HR that runs itself.</h1>
        <p className="sub">
          MambaHR does the HR admin for you: hiring, onboarding, time off and leave, payroll
          changes, and compliance with the law cited. You make the judgment calls. Your data
          imports in a day.
        </p>
        <div className="ctas">
          <a href="/demo" className="cta-main">Book a demo</a>
          <a href="/product" className="cta-alt">See how it works</a>
        </div>
      </div>

      <div className="stage" aria-hidden="true">
        <div className="field">
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
          <span className="f f4" />
          <span className="grain" />
        </div>

        <div className="app">
          <div className="app-bar">
            <span className="dots"><b /><b /><b /></span>
            <span className="addr">app.mambahr.com</span>
          </div>
          <AppFrame active="todo" org="Acme" user="AR" height={620} minimal>
            <TodoDesk simple summary="3 need you today" queue={HERO_QUEUE} focus={HERO_FOCUS} />
          </AppFrame>
        </div>

        {/* The request, as it arrives in Slack */}
        <div className="glass c-ask">
          <div className="ask-head">
            <span className="av">PN</span>
            <span className="who">Priya Nair</span>
            <span className="where">#people-ops · 9:01</span>
          </div>
          <p className="ask-body"><span className="at">@MambaHR</span> Maya signed. She starts Monday.</p>
        </div>

        {/* The agent doing it */}
        <div className="glass c-run">
          <div className="run-head">
            <span className="pulse" />
            <span>Onboarding Maya Chen</span>
          </div>
          <ul className="steps">
            {STEPS.map((s, i) => (
              <li key={s.t} style={{ ['--i' as string]: i }}>
                <span className="tick" />
                <span className="st">{s.t}</span>
                <span className="at-t">{s.at}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The law behind an answer */}
        <div className="glass c-law">
          <div className="law-top">
            <span className="law-t">Leave approved, Jordan Lee</span>
            <span className="ok">Done</span>
          </div>
          <span className="law-s">12 weeks of bonding leave, eligibility checked</span>
          <span className="cite">29 U.S.C. § 2612</span>
        </div>

      </div>

      <style jsx>{`
        .hero {
          --ink-1: #1a1a19;
          --ink-2: #3d3d3a;
          --glass-bg: rgba(255, 255, 255, 0.62);
          --glass-line: rgba(255, 255, 255, 0.78);
          --glass-text: #1a1a19;
          --glass-sub: #5b5750;
          position: relative;
          overflow: hidden;
          padding: clamp(112px, 12vw, 156px) var(--page-pad) clamp(40px, 5vw, 72px);
          background: #fefdfa;
          isolation: isolate;
        }
        .hero.night {
          --ink-1: #f6f1e7;
          --ink-2: rgba(246, 241, 231, 0.74);
          --glass-bg: rgba(30, 25, 38, 0.56);
          --glass-line: rgba(255, 255, 255, 0.14);
          --glass-text: #f6f1e7;
          --glass-sub: rgba(246, 241, 231, 0.64);
          background: #100d14;
        }

        /* ---- sky behind the headline ---- */
        .sky { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
        .glow { position: absolute; border-radius: 50%; filter: blur(90px); }
        .day .g1 { width: 520px; height: 520px; left: -140px; top: -180px; background: rgba(233, 176, 112, 0.34); }
        .day .g2 { width: 560px; height: 560px; right: -160px; top: -200px; background: rgba(139, 127, 208, 0.26); }
        .day .g3 { display: none; }
        .night .g1 { width: 760px; height: 560px; left: -120px; top: -120px; background: rgba(214, 150, 84, 0.34); }
        .night .g2 { width: 820px; height: 620px; right: -200px; top: -60px; background: rgba(118, 98, 214, 0.42); }
        .night .g3 { width: 900px; height: 420px; left: 20%; top: 520px; background: rgba(208, 120, 150, 0.22); }
        .grain {
          position: absolute;
          inset: 0;
          background-image: ${GRAIN};
          background-size: 220px 220px;
          opacity: 0.22;
          mix-blend-mode: overlay;
        }
        .night .sky .grain { opacity: 0.35; }

        /* ---- headline ---- */
        .top { position: relative; max-width: 1100px; margin: 0 auto; text-align: center; }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #8a6535;
        }
        .night .eyebrow { color: #e0b884; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(56px, 9.6vw, 136px);
          line-height: 0.94;
          letter-spacing: -0.045em;
          color: var(--ink-1);
          margin: 22px 0 0;
          font-variation-settings: 'opsz' 144;
        }
        .sub {
          font-size: clamp(17px, 1.9vw, 20px);
          line-height: 1.6;
          color: var(--ink-2);
          max-width: 640px;
          margin: 26px auto 0;
          text-wrap: pretty;
        }
        .ctas { display: flex; gap: 12px; justify-content: center; margin-top: 34px; flex-wrap: wrap; }
        .cta-main, .cta-alt {
          display: inline-flex;
          align-items: center;
          height: 50px;
          padding: 0 26px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-main { background: #1a1a19; color: #fff; box-shadow: 0 10px 24px -8px rgba(20, 18, 14, 0.45); }
        .cta-main:hover { transform: translateY(-2px); }
        .cta-alt { color: var(--ink-1); background: rgba(255, 255, 255, 0.55); border: 1px solid rgba(26, 26, 25, 0.14); }
        .cta-alt:hover { background: #fff; }
        .night .cta-main { background: #f6f1e7; color: #100d14; box-shadow: 0 10px 30px -8px rgba(214, 150, 84, 0.45); }
        .night .cta-alt { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.18); }
        .night .cta-alt:hover { background: rgba(255, 255, 255, 0.12); }
        .cta-main:focus-visible, .cta-alt:focus-visible { outline: 2px solid #8b7fd0; outline-offset: 3px; }

        /* ---- the stage ---- */
        .stage {
          position: relative;
          max-width: 1320px;
          height: clamp(640px, 56vw, 780px);
          margin: clamp(56px, 6vw, 84px) auto 0;
          border-radius: 32px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 40px 80px -40px rgba(60, 40, 90, 0.45);
        }
        .night .stage { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 60px 120px -40px rgba(118, 98, 214, 0.55); }
        .field { position: absolute; inset: 0; z-index: -1; background: linear-gradient(155deg, #f3c796 0%, #eab2a4 38%, #b9a2d6 68%, #7f71c9 100%); }
        .night .field { background: linear-gradient(160deg, #3a2a3a 0%, #2a2140 45%, #1b1630 100%); }
        .f { position: absolute; border-radius: 50%; filter: blur(60px); }
        .f1 { width: 62%; height: 90%; left: -12%; top: -30%; background: radial-gradient(circle, rgba(255, 214, 160, 0.95), rgba(255, 214, 160, 0) 70%); animation: drift1 26s ease-in-out infinite alternate; }
        .f2 { width: 58%; height: 90%; right: -14%; top: -24%; background: radial-gradient(circle, rgba(157, 143, 224, 0.95), rgba(157, 143, 224, 0) 70%); animation: drift2 30s ease-in-out infinite alternate; }
        .f3 { width: 70%; height: 80%; left: 18%; bottom: -46%; background: radial-gradient(circle, rgba(231, 150, 160, 0.8), rgba(231, 150, 160, 0) 70%); animation: drift3 24s ease-in-out infinite alternate; }
        .f4 { width: 36%; height: 50%; left: 34%; top: 6%; background: radial-gradient(circle, rgba(255, 244, 228, 0.9), rgba(255, 244, 228, 0) 70%); }
        .night .f1 { background: radial-gradient(circle, rgba(222, 158, 92, 0.75), rgba(222, 158, 92, 0) 70%); }
        .night .f2 { background: radial-gradient(circle, rgba(128, 108, 230, 0.85), rgba(128, 108, 230, 0) 70%); }
        .night .f3 { background: radial-gradient(circle, rgba(210, 110, 150, 0.55), rgba(210, 110, 150, 0) 70%); }
        .night .f4 { background: radial-gradient(circle, rgba(255, 220, 180, 0.22), rgba(255, 220, 180, 0) 70%); }
        .field .grain { opacity: 0.4; }
        @keyframes drift1 { to { transform: translate(8%, 10%) scale(1.08); } }
        @keyframes drift2 { to { transform: translate(-8%, 8%) scale(1.1); } }
        @keyframes drift3 { to { transform: translate(-6%, -8%) scale(1.06); } }

        /* the real app, flat and sharp, cropped by the stage */
        .app {
          position: absolute;
          left: 50%;
          top: 168px;
          width: min(1140px, 88%);
          transform: translateX(-50%);
          border-radius: 16px;
          overflow: hidden;
          background: #f4f2ec;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(40, 25, 60, 0.08),
            0 30px 70px -20px rgba(40, 25, 60, 0.45);
          animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both;
        }
        .app-bar { display: flex; align-items: center; gap: 12px; padding: 0 14px; height: 40px; background: #f8f6f1; border-bottom: 1px solid rgba(0, 0, 0, 0.08); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 10px; height: 10px; border-radius: 999px; }
        .dots b:nth-child(1) { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: #66665f; background: #fefdfa; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 7px; padding: 3px 16px; }

        /* ---- glass cards ---- */
        .glass {
          position: absolute;
          z-index: 2;
          color: var(--glass-text);
          background: var(--glass-bg);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          backdrop-filter: blur(22px) saturate(170%);
          border: 1px solid var(--glass-line);
          border-radius: 18px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 24px 48px -18px rgba(40, 25, 70, 0.45);
          animation: pop 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .night .glass { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px -18px rgba(0, 0, 0, 0.7); }

        .c-ask { left: 3%; top: 44px; width: 310px; padding: 14px 16px; animation-delay: 0.7s; }
        .ask-head { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .av { width: 26px; height: 26px; border-radius: 7px; background: linear-gradient(135deg, #8b7fd0, #6a5da6); color: #fff; font-size: 11px; font-weight: 700; display: grid; place-items: center; }
        .who { font-weight: 700; }
        .where { color: var(--glass-sub); font-size: 12px; }
        .ask-body { margin: 9px 0 0; font-size: 14.5px; line-height: 1.45; }
        .at { color: #5b4a9c; background: rgba(139, 127, 208, 0.18); border-radius: 5px; padding: 0 4px; font-weight: 600; }
        .night .at { color: #c9befa; background: rgba(139, 127, 208, 0.28); }

        .c-run { right: 3%; top: 26px; width: 340px; padding: 14px 16px 6px; animation-delay: 1.1s; }
        .run-head { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 700; padding-bottom: 10px; border-bottom: 1px solid rgba(26, 26, 25, 0.08); }
        .night .run-head { border-bottom-color: rgba(255, 255, 255, 0.1); }
        .pulse { width: 8px; height: 8px; border-radius: 50%; background: #6a5da6; box-shadow: 0 0 0 0 rgba(106, 93, 166, 0.5); animation: pulse 1.8s ease-out infinite; }
        .night .pulse { background: #a99cf2; }
        .steps { list-style: none; margin: 0; padding: 4px 0 0; }
        .steps li { display: grid; grid-template-columns: 18px 1fr auto; gap: 10px; align-items: center; padding: 6px 0; font-size: 13.5px; }
        .tick { width: 18px; height: 18px; border-radius: 50%; position: relative; background: #1f7a45; animation: tick 0.4s ease both; animation-delay: calc(1.6s + var(--i) * 0.45s); }
        .tick::after { content: ''; position: absolute; left: 6px; top: 3px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .st { animation: fadein 0.4s ease both; animation-delay: calc(1.5s + var(--i) * 0.45s); }
        .at-t { font-family: var(--font-mono); font-size: 11.5px; color: var(--glass-sub); font-variant-numeric: tabular-nums; animation: fadein 0.4s ease both; animation-delay: calc(1.6s + var(--i) * 0.45s); }

        .c-law { left: 2%; bottom: 40px; width: 290px; padding: 14px 16px; display: grid; gap: 6px; animation-delay: 3.4s; }
        .law-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
        .law-t { font-size: 14px; font-weight: 700; }
        .ok { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #1f7a45; background: rgba(31, 122, 69, 0.12); border-radius: 999px; padding: 2px 8px; }
        .night .ok { color: #8fdcad; background: rgba(143, 220, 173, 0.14); }
        .law-s { font-size: 13px; color: var(--glass-sub); }
        .cite { justify-self: start; font-family: var(--font-mono); font-size: 11.5px; color: #6b4e26; background: rgba(242, 236, 224, 0.9); border: 1px solid rgba(122, 90, 46, 0.2); border-radius: 6px; padding: 2px 8px; }
        .night .cite { color: #f0cf9f; background: rgba(214, 150, 84, 0.16); border-color: rgba(214, 150, 84, 0.3); }


        @keyframes rise { from { opacity: 0; transform: translate(-50%, 40px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes pop { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes tick { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(106, 93, 166, 0.5); } 100% { box-shadow: 0 0 0 10px rgba(106, 93, 166, 0); } }

        @media (max-width: 1080px) {
          .c-law { display: none; }
          .app { width: 86%; }
        }
        @media (max-width: 760px) {
          .stage { height: auto; padding: 22px 16px; display: grid; gap: 12px; border-radius: 24px; }
          .app { display: none; }
          .glass { position: relative; inset: auto; width: auto; }
          .c-law { display: grid; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f, .app, .glass, .tick, .st, .at-t, .pulse { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
