'use client'

import { AppFrame, TodoDesk, COMP_CHANGE } from '@/components/mockups'

const HERO_QUEUE = [
  { title: 'Jackson Bauer · raise', meta: 'Pay · Yours', date: 'Today' },
  { title: 'Leo Schulz · time off', meta: 'Time off · Yours', date: 'Fri' },
  { title: 'Priya Nair · offer', meta: 'Hiring · Yours', date: 'Thu' },
]
// Three facts in the hero: the peers already sit in MambaHR's read.
const HERO_FOCUS = { ...COMP_CHANGE, facts: COMP_CHANGE.facts.slice(0, 3) }

const STEPS = [
  { t: 'Form I-9 sent to Maya', at: '9:02' },
  { t: 'Okta and Slack accounts requested', at: '9:02' },
  { t: 'Laptop request sent to IT', at: '9:03' },
  { t: 'Added to the June 15 payroll changes', at: '9:03' },
]

// Grain for the light field: fractal noise, alpha only, tiled.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Hero() {
  return (
    <section className="hero">
      <div className="sky" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grain" />
      </div>

      <div className="top">
        <span className="eyebrow">For busy HR teams</span>
        <h1 className="title" data-reveal="eager">HR that runs itself.</h1>
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

        {/* The agent doing it: its mark carries the Dusk beam while it works,
            the status line shimmers, finished steps get a tick. */}
        <div className="glass c-run">
          <div className="run-head">
            <span className="agent-mark is-working run-mark" />
            <span className="agent-status is-working">Onboarding Maya Chen</span>
          </div>
          <ul className="steps">
            {STEPS.map((s, i) => (
              <li key={s.t} style={{ ['--i' as string]: i }}>
                <svg className="tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                <span className="st">{s.t}</span>
                <span className="at-t">{s.at}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The law behind an answer */}
        <div className="glass c-law">
          <div className="law-top">
            <span className="law-t">Leave for Jordan Lee</span>
            <span className="ui-badge success ok">Checked</span>
          </div>
          <span className="law-s">12 weeks, eligibility checked, sent to you to approve</span>
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
          --glass-sub: #57534c;
          position: relative;
          overflow: hidden;
          padding: clamp(112px, 12vw, 156px) var(--page-pad) clamp(40px, 5vw, 72px);
          background: var(--bg);
          isolation: isolate;
        }

        /* ---- sky behind the headline ---- */
        .sky { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
        .glow { position: absolute; border-radius: 50%; filter: blur(90px); }
        .g1 { width: 520px; height: 520px; left: -140px; top: -180px; background: rgba(226, 186, 130, 0.36); }
        .g2 { width: 560px; height: 560px; right: -160px; top: -200px; background: rgba(150, 136, 222, 0.26); }
        .grain {
          position: absolute;
          inset: 0;
          background-image: ${GRAIN};
          background-size: 220px 220px;
          opacity: 0.22;
          mix-blend-mode: overlay;
        }

        /* ---- headline ---- */
        .top { position: relative; max-width: 1100px; margin: 0 auto; text-align: center; }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold);
        }
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
          font-weight: 500;
          font-size: 16px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-main { background: #1a1a19; color: #fff; box-shadow: 0 1px 2px rgba(20, 18, 14, 0.12), 0 10px 24px -8px rgba(20, 18, 14, 0.4); }
        .cta-main:hover { transform: translateY(-1px); background: #2a2a28; }
        .cta-alt { color: var(--ink-1); background: var(--bg-card); border: 1px solid var(--border-mid); box-shadow: var(--shadow-xs); }
        .cta-alt:hover { border-color: var(--ink-1); }
        .cta-main:focus-visible, .cta-alt:focus-visible { outline: 2px solid var(--ink-1); outline-offset: 3px; }

        /* ---- the stage ---- */
        .stage {
          position: relative;
          max-width: 1320px;
          height: clamp(640px, 56vw, 780px);
          margin: clamp(56px, 6vw, 84px) auto 0;
          border-radius: 32px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 40px 80px -40px rgba(90, 60, 110, 0.4);
        }
        .field { position: absolute; inset: 0; z-index: -1; background: var(--stage-field); }
        .f { position: absolute; border-radius: 50%; filter: blur(60px); }
        .f1 { width: 62%; height: 90%; left: -12%; top: -30%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); animation: drift1 26s ease-in-out infinite alternate; }
        .f2 { width: 58%; height: 90%; right: -14%; top: -24%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); animation: drift2 30s ease-in-out infinite alternate; }
        .f3 { width: 70%; height: 80%; left: 18%; bottom: -46%; background: radial-gradient(circle, var(--stage-glow-3), transparent 70%); animation: drift3 24s ease-in-out infinite alternate; }
        .f4 { width: 36%; height: 50%; left: 34%; top: 6%; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
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
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(40, 25, 60, 0.08),
            0 30px 70px -20px rgba(40, 25, 60, 0.45);
          animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both;
        }
        .app-bar { display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-faint); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 10px; height: 10px; border-radius: 999px; }
        .dots b:nth-child(1) { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: var(--text-faint); background: var(--bg-card); border-radius: var(--radius-full); box-shadow: inset 0 0 0 1px var(--border-faint); padding: 3px 16px; }

        /* ---- glass cards ---- */
        .glass {
          position: absolute;
          z-index: 2;
          color: var(--glass-text);
          background: var(--glass-bg);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          backdrop-filter: blur(22px) saturate(170%);
          border: 1px solid var(--glass-line);
          border-radius: var(--radius-lg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 24px 48px -18px rgba(40, 25, 70, 0.45);
          animation: pop 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .c-ask { left: 3%; top: 44px; width: 310px; padding: 14px 16px; animation-delay: 0.7s; }
        .ask-head { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .av { width: 26px; height: 26px; border-radius: var(--radius-sm); background: #e2d5e8; color: #574566; font-size: 11px; font-weight: 600; display: grid; place-items: center; }
        .who { font-weight: 700; }
        .where { color: var(--glass-sub); font-size: 12px; }
        .ask-body { margin: 9px 0 0; font-size: 14.5px; line-height: 1.45; }
        .at { color: var(--violet); background: var(--violet-soft); border-radius: var(--radius-xs); padding: 0 4px; font-weight: 600; }

        .c-run { right: 3%; top: 26px; width: 340px; padding: 14px 16px 6px; animation-delay: 1.1s; }
        .run-head { display: flex; align-items: center; gap: 12px; font-size: 14.5px; padding-bottom: 10px; border-bottom: 1px solid rgba(26, 26, 25, 0.08); }
        .run-head .run-mark { --am-size: 30px; }
        .steps { list-style: none; margin: 0; padding: 4px 0 0; }
        .steps li { display: grid; grid-template-columns: 18px 1fr auto; gap: 10px; align-items: center; padding: 6px 0; font-size: 13.5px; }
        .tick { justify-self: center; color: var(--green); animation: tick 0.4s ease both; animation-delay: calc(1.6s + var(--i) * 0.45s); }
        .st { animation: fadein 0.4s ease both; animation-delay: calc(1.5s + var(--i) * 0.45s); }
        .at-t { font-family: var(--font-mono); font-size: 12px; color: var(--glass-sub); font-variant-numeric: tabular-nums; animation: fadein 0.4s ease both; animation-delay: calc(1.6s + var(--i) * 0.45s); }

        .c-law { left: 2%; bottom: 40px; width: 290px; padding: 14px 16px; display: grid; gap: 6px; animation-delay: 3.4s; }
        .law-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
        .law-t { font-size: 14px; font-weight: 700; }
        .ok { height: 22px; padding: 0 9px; }
        .law-s { font-size: 13px; color: var(--glass-sub); }
        .cite { justify-self: start; font-family: var(--font-mono); font-size: 12px; color: var(--gold-dark); background: rgba(243, 235, 221, 0.92); border-radius: var(--radius-sm); padding: 2px 8px; }


        @keyframes rise { from { opacity: 0; transform: translate(-50%, 40px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes pop { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes tick { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }

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
          .f, .app, .glass, .tick, .st, .at-t { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
