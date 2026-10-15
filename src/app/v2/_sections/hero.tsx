'use client'

import { useEffect, useRef, useState } from 'react'
import s from '@/components/mockups/mockups.module.css'

const STEPS = [
  { t: 'Form I-9 sent to Maya', at: '9:02' },
  { t: 'Okta and Slack accounts requested', at: '9:02' },
  { t: 'Laptop request sent to IT', at: '9:03' },
  { t: 'Added to the June 15 payroll changes', at: '9:03' },
]

// One story, played once: the ask arrives (1), the work starts (2), the four
// steps finish (3-6), the run settles (7), the one call left for a person
// lands (8) and its first choice lights (9). Milliseconds from the start.
const TIMELINE = [150, 900, 1450, 1900, 2350, 2800, 3300, 3800, 4600]
const LAST = TIMELINE.length

// Grain for the light field: fractal noise, alpha only, tiled.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    const play = () => TIMELINE.forEach((ms, i) => timers.push(window.setTimeout(() => setStep(i + 1), ms)))
    // Reduced motion: no story to watch, go straight to the last frame.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.push(window.setTimeout(() => setStep(LAST), 0))
      return () => timers.forEach(clearTimeout)
    }
    const el = stageRef.current
    if (!el || !('IntersectionObserver' in window)) {
      play()
      return () => timers.forEach(clearTimeout)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          play()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const done = Math.min(Math.max(step - 2, 0), STEPS.length)
  const settled = step >= 7

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

      <div className="stage" aria-hidden="true" ref={stageRef}>
        <div className="field">
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
          <span className="f f4" />
          <span className="grain" />
        </div>

        <div className="story">
          {/* 1. The ask, as it arrives in Slack */}
          <div className={`beat${step >= 1 ? ' in' : ''}`}>
            <span className="cap"><b>1</b>The ask</span>
            <div className="glass c-ask">
              <div className="ask-head">
                <span className="av">PN</span>
                <span className="who">Priya Nair</span>
                <span className="where">#people-ops · 9:01</span>
              </div>
              <p className="ask-body"><span className="at">@MambaHR</span> Maya signed. She starts Monday.</p>
            </div>
          </div>

          <span className={`link${step >= 2 ? ' in' : ''}`} />

          {/* 2. The admin, done: the mark carries the Dusk beam while it
              works, each step ticks as it finishes, then it rests. */}
          <div className={`beat${step >= 2 ? ' in' : ''}`}>
            <span className="cap"><b>2</b>Done for you</span>
            <div className="glass c-run">
              <div className="run-head">
                <span className={`agent-mark run-mark${settled ? '' : ' is-working'}`} />
                {settled
                  ? <span className="run-done">Maya is ready for Monday</span>
                  : <span className="agent-status is-working">Onboarding Maya Chen</span>}
              </div>
              <ul className="steps">
                {STEPS.map((st, i) => (
                  <li key={st.t} className={done > i ? 'on' : ''}>
                    <span className="mark">
                      <svg className="tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                    </span>
                    <span className="st">{st.t}</span>
                    <span className="at-t">{st.at}</span>
                  </li>
                ))}
              </ul>
              <p className={`run-foot${settled ? ' in' : ''}`}>Done by 9:03. By hand, about half a day.</p>
            </div>
          </div>

          <span className={`link${step >= 8 ? ' in' : ''}`} />

          {/* 3. The one call left for a person, as it lands in To do: the
              app's open-item vocabulary (who, title, MambaHR's read in the
              Dusk ring, each choice with what it does). */}
          <div className={`beat${step >= 8 ? ' in' : ''}`}>
            <span className="cap"><b>3</b>Your call</span>
            <div className={`${s.mk} you`}>
              <div className={s.eyebrowRow}>
                <span>Maya&rsquo;s onboarding · 9:03</span>
                <span className={s.right}>1 left for you</span>
              </div>
              <h3 className={`${s.paneTitle} you-title`}>First-week buddy for Maya</h3>
              <div className={`${s.readRing} you-read`}>
                <div className={s.read}>
                  <div className={s.label}>MambaHR&rsquo;s read</div>
                  <p className={s.readText}>Sam Ortiz: same team, not a buddy in six months.</p>
                </div>
              </div>
              <div className="you-pills">
                <div className={s.choice}>
                  <div className={`${s.pill} ${s.primary} approve${step >= 9 ? ' lit' : ''}`}>Approve Sam</div>
                  <p className={s.consequence}>Intro sent for Monday.</p>
                </div>
                <div className={s.choice}>
                  <div className={`${s.pill} ${s.secondary}`}>Pick someone else</div>
                  <p className={s.consequence}>You choose from her team.</p>
                </div>
              </div>
            </div>
          </div>
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
          --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          overflow: hidden;
          padding: clamp(112px, 11vw, 148px) var(--page-pad) clamp(40px, 5vw, 72px);
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
          margin: clamp(40px, 3.6vw, 52px) auto 0;
          padding: 52px clamp(24px, 3.4vw, 48px) 40px;
          border-radius: 32px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 40px 80px -40px rgba(90, 60, 110, 0.4);
        }
        .field { position: absolute; inset: 0; z-index: -1; background: var(--stage-field); }
        .f { position: absolute; border-radius: 50%; filter: blur(60px); }
        .f1 { width: 62%; height: 120%; left: -12%; top: -40%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); animation: drift1 26s ease-in-out infinite alternate; }
        .f2 { width: 58%; height: 120%; right: -14%; top: -34%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); animation: drift2 30s ease-in-out infinite alternate; }
        .f3 { width: 70%; height: 100%; left: 18%; bottom: -60%; background: radial-gradient(circle, var(--stage-glow-3), transparent 70%); animation: drift3 24s ease-in-out infinite alternate; }
        .f4 { width: 36%; height: 70%; left: 34%; top: 0; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
        .field .grain { opacity: 0.4; }
        @keyframes drift1 { to { transform: translate(8%, 10%) scale(1.08); } }
        @keyframes drift2 { to { transform: translate(-8%, 8%) scale(1.1); } }
        @keyframes drift3 { to { transform: translate(-6%, -8%) scale(1.06); } }

        /* ---- the story: three beats joined by Dusk lines ---- */
        .story {
          display: grid;
          grid-template-columns:
            minmax(0, 300px) minmax(28px, 1fr) minmax(0, 372px) minmax(28px, 1fr) minmax(0, 404px);
          align-items: center;
          max-width: 1220px;
          margin: 0 auto;
        }
        .beat {
          position: relative;
          min-width: 0;
          opacity: 0;
          transform: translateY(14px) scale(0.97);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .beat.in { opacity: 1; transform: none; }
        .cap {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-1);
          white-space: nowrap;
        }
        .cap b {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9);
        }
        .link {
          height: 2px;
          margin: 0 10px;
          border-radius: 999px;
          background: var(--grad);
          opacity: 0.85;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s var(--ease-out);
          position: relative;
        }
        .link::after {
          content: '';
          position: absolute;
          right: -1px;
          top: 50%;
          width: 7px;
          height: 7px;
          border-top: 2px solid var(--dusk-3);
          border-right: 2px solid var(--dusk-3);
          transform: translateY(-50%) rotate(45deg);
          border-radius: 1px;
        }
        .link.in { transform: scaleX(1); }

        /* ---- glass cards (the ask, the run) ---- */
        .glass {
          color: var(--glass-text);
          background: var(--glass-bg);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          backdrop-filter: blur(22px) saturate(170%);
          border: 1px solid var(--glass-line);
          border-radius: var(--radius-lg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 24px 48px -18px rgba(40, 25, 70, 0.45);
        }

        .c-ask { padding: 14px 16px; }
        .ask-head { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .av { width: 26px; height: 26px; border-radius: var(--radius-sm); background: #e2d5e8; color: #574566; font-size: 11px; font-weight: 600; display: grid; place-items: center; flex: none; }
        .who { font-weight: 700; }
        .where { color: var(--glass-sub); font-size: 12px; white-space: nowrap; }
        .ask-body { margin: 9px 0 0; font-size: 14.5px; line-height: 1.45; }
        .at { color: var(--violet); background: var(--violet-soft); border-radius: var(--radius-xs); padding: 0 4px; font-weight: 600; }

        .c-run { padding: 14px 16px 12px; }
        .run-head { display: flex; align-items: center; gap: 12px; font-size: 14.5px; min-height: 30px; padding-bottom: 10px; border-bottom: 1px solid rgba(26, 26, 25, 0.08); }
        .run-head .run-mark { --am-size: 30px; }
        .run-done { font-weight: 600; color: var(--ink-1); animation: fadein 0.4s ease both; }
        .steps { list-style: none; margin: 0; padding: 4px 0 0; }
        .steps li { display: grid; grid-template-columns: 18px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 6px 0; font-size: 13.5px; }
        .mark {
          width: 16px;
          height: 16px;
          justify-self: center;
          border-radius: 999px;
          display: grid;
          place-items: center;
          box-shadow: inset 0 0 0 1.5px rgba(26, 26, 25, 0.22);
          transition: box-shadow 0.3s ease;
        }
        .tick { color: var(--green); opacity: 0; transform: scale(0.4); transition: opacity 0.3s ease, transform 0.35s var(--ease-out); }
        .st { color: var(--glass-sub); transition: color 0.3s ease; }
        .at-t { font-family: var(--font-mono); font-size: 12px; color: var(--glass-sub); font-variant-numeric: tabular-nums; opacity: 0; transition: opacity 0.3s ease; }
        .steps li.on .mark { box-shadow: none; }
        .steps li.on .tick { opacity: 1; transform: scale(1); }
        .steps li.on .st { color: var(--ink-1); }
        .steps li.on .at-t { opacity: 1; }
        .run-foot {
          margin: 6px 0 0;
          padding-top: 10px;
          border-top: 1px solid rgba(26, 26, 25, 0.08);
          font-size: 13px;
          color: var(--glass-sub);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .run-foot.in { opacity: 1; }

        /* ---- your call: solid, the app's own card ---- */
        .you {
          background: #fff;
          border-radius: var(--radius-lg);
          padding: 18px 20px 20px;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6), 0 2px 6px rgba(40, 25, 60, 0.08),
            0 30px 60px -22px rgba(40, 25, 60, 0.5);
        }
        .you .you-title { font-size: 24px; margin-top: 6px; }
        .you .you-read { margin-top: 14px; }
        .you-pills { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; margin-top: 16px; }
        .approve { transition: box-shadow 0.6s ease; }
        .approve.lit { box-shadow: 0 0 0 4px rgba(106, 91, 196, 0.2), 0 8px 18px -6px rgba(20, 18, 14, 0.45); }

        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }

        /* Short laptop screens (1280x800, 1536x864): pull the stage up so the
           decision and its two choices sit above the fold. */
        @media (min-width: 1100px) and (max-height: 880px) {
          .hero { padding-top: 112px; }
          .sub { margin-top: 20px; }
          .ctas { margin-top: 28px; }
          .stage { margin-top: 32px; padding-top: 44px; }
        }

        /* Narrower than the three-across row: the beats stack, the lines turn down. */
        @media (max-width: 1099px) {
          .stage { padding: 32px 24px; }
          .story { grid-template-columns: minmax(0, 520px); justify-content: center; }
          .cap { position: static; margin: 0 0 10px 6px; }
          .link { width: 2px; height: 36px; margin: 6px auto 16px; transform: scaleY(0); transform-origin: center top; }
          .link.in { transform: scaleY(1); }
          .link::after { right: auto; top: auto; left: 50%; bottom: -1px; transform: translateX(-50%) rotate(135deg); }
        }
        @media (max-width: 760px) {
          .stage { padding: 24px 16px; border-radius: 24px; }
        }
        @media (max-width: 420px) {
          .you-pills { grid-template-columns: minmax(0, 1fr); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f { animation: none !important; }
          .beat, .link, .tick, .st, .at-t, .mark, .run-foot, .approve { transition: none !important; }
          .run-done { animation: none; }
        }
      `}</style>
    </section>
  )
}
