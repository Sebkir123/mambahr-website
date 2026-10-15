'use client'

import { useEffect, useRef, useState } from 'react'
import { AppFrame, TodoDesk, COMP_CHANGE, type TodoFocus, type TodoItem } from '@/components/mockups'

const RAISE: TodoItem = { title: 'Jackson Bauer · raise', meta: 'Pay · Yours', date: 'Today' }
const LEAVE: TodoItem = { title: 'Leo Schulz · time off', meta: 'Time off · Yours', date: 'Fri' }
const DAY_ONE_ROW: TodoItem = { title: 'Maya Chen · day one', meta: 'Onboarding · Yours', date: 'Mon' }

// Three facts in the hero: the peers already sit in MambaHR's read.
const RAISE_FOCUS = { ...COMP_CHANGE, facts: COMP_CHANGE.facts.slice(0, 3) }

// The one onboarding step a person has to do: Form I-9 Section 2 is due
// within three business days of the first day, so Thursday for a Monday start.
const DAY_ONE: TodoFocus = {
  eyebrow: 'Started when Maya signed · Today 9:01',
  position: '1 of 3',
  title: 'Day one for Maya Chen',
  summary: 'Maya starts Monday as a Senior Engineer. Four of five steps are done; one needs a person.',
  facts: [
    { k: 'Form I-9', v: 'Sent to Maya; Section 2 by Thursday' },
    { k: 'Accounts', v: 'Okta and Slack requested' },
    { k: 'Laptop', v: 'Request sent to IT' },
  ],
  read: 'Everything else is ready for Monday. Form I-9 Section 2 needs someone at the company to review her documents by Thursday.',
  decisions: [
    { label: 'Assign to me', primary: true, consequence: 'It goes on your To do for Monday.' },
    { label: 'Pick someone else', consequence: 'Nothing is assigned until you choose.' },
  ],
  history: [],
}

const STEPS = [
  { t: 'Form I-9 sent to Maya', at: '9:02' },
  { t: 'Okta and Slack accounts requested', at: '9:02' },
  { t: 'Laptop request sent to IT', at: '9:03' },
  { t: 'Added to the June 15 payroll changes', at: '9:03' },
]

// One story, played once over the real app: the ask arrives in Slack (1),
// MambaHR starts (2), its four steps finish (3-6) and it rests (7), Maya's
// day one lands on To do (8) and opens there, the one step left for a
// person (9). Milliseconds from the start.
const TIMELINE = [700, 1300, 1800, 2250, 2700, 3150, 3600, 4000, 4700]
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
  const arrived = step >= 8
  const opened = step >= 9
  const queue = arrived ? [DAY_ONE_ROW, RAISE, LEAVE] : [RAISE, LEAVE]

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

        {/* The real app. The story plays inside it: Maya's day one arrives
            on To do and opens on the one step a person has to take. */}
        <div className={`app${opened ? ' focus' : ''}`}>
          <div className="app-bar">
            <span className="dots"><b /><b /><b /></span>
            <span className="addr">app.mambahr.com</span>
          </div>
          <AppFrame active="todo" org="Acme" user="AR" height={620} minimal>
            {/* Wide: the queue beside the open item. Narrow, where the desk
                would drop the open item: the open item alone. */}
            <div className="desk-full">
              <TodoDesk
                simple
                animatePane
                queue={queue}
                fresh={arrived && !opened ? 0 : undefined}
                activeIndex={opened ? 0 : arrived ? 1 : 0}
                focus={opened ? DAY_ONE : RAISE_FOCUS}
              />
            </div>
            <div className="desk-pane">
              <TodoDesk simple animatePane show="pane" queue={queue} focus={opened ? DAY_ONE : RAISE_FOCUS} />
            </div>
          </AppFrame>
        </div>

        {/* The ask, as it arrives in Slack */}
        <div className={`glass c-ask${step >= 1 ? ' in' : ''}`}>
          <div className="ask-head">
            <span className="av">PN</span>
            <span className="who">Priya Nair</span>
            <span className="where">#people-ops · 9:01</span>
          </div>
          <p className="ask-body"><span className="at">@MambaHR</span> Maya signed. She starts Monday.</p>
        </div>

        {/* MambaHR doing it: the mark carries the Dusk beam while it works,
            each step ticks as it finishes, then it rests. */}
        <div className={`glass c-run${step >= 2 ? ' in' : ''}`}>
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
          height: clamp(640px, 54vw, 740px);
          margin: clamp(40px, 3.6vw, 52px) auto 0;
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

        /* The real app, flat and sharp, cropped by the stage. It sits high and
           to the right so the To do desk is on screen from the first frame;
           the Slack ask and MambaHR's run hang over its sidebar. When the day
           one item opens, the frame leans in a little toward it. */
        .app {
          position: absolute;
          top: 44px;
          left: 16%;
          right: 3%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(40, 25, 60, 0.08),
            0 30px 70px -20px rgba(40, 25, 60, 0.45);
          transform-origin: 72% 24%;
          animation: rise 0.9s var(--ease-out) 0.1s both;
          transition: transform 1.4s var(--ease-out);
        }
        .app.focus { transform: scale(1.03); }
        .desk-pane { display: none; padding: 16px; }
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
          opacity: 0;
          transform: translateY(18px) scale(0.96);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }
        .glass.in { opacity: 1; transform: none; }

        .c-ask { left: 2.4%; top: 28px; width: 300px; padding: 14px 16px; }
        .ask-head { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .av { width: 26px; height: 26px; border-radius: var(--radius-sm); background: #e2d5e8; color: #574566; font-size: 11px; font-weight: 600; display: grid; place-items: center; flex: none; }
        .who { font-weight: 700; }
        .where { color: var(--glass-sub); font-size: 12px; white-space: nowrap; }
        .ask-body { margin: 9px 0 0; font-size: 14.5px; line-height: 1.45; }
        .at { color: var(--violet); background: var(--violet-soft); border-radius: var(--radius-xs); padding: 0 4px; font-weight: 600; }

        .c-run { left: 2.4%; top: 166px; width: 340px; padding: 14px 16px 6px; }
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

        @keyframes rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }

        /* Short laptop screens (1280x800, 1536x864): pull the stage up so more
           of the app is on screen before the scroll. */
        @media (min-width: 1240px) and (max-height: 880px) {
          .hero { padding-top: 112px; }
          .sub { margin-top: 20px; }
          .ctas { margin-top: 28px; }
          .stage { margin-top: 32px; }
        }

        /* Narrower: the app takes the full width, lower down; the ask and the
           run sit over its top corners. */
        @media (max-width: 1239px) {
          .app { top: 150px; left: 6%; right: 6%; transform-origin: 50% 20%; }
          .c-ask { left: 3%; top: 40px; }
          .c-run { left: auto; right: 3%; top: 24px; }
        }
        @media (max-width: 899px) {
          .desk-full { display: none; }
          .desk-pane { display: block; }
        }
        @media (max-width: 760px) {
          .stage { height: auto; padding: 22px 16px; display: grid; gap: 12px; border-radius: 24px; }
          .app { position: relative; inset: auto; order: 3; }
          .app.focus { transform: none; }
          .glass { position: relative; inset: auto; width: auto; }
          .c-ask { order: 1; }
          .c-run { order: 2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f, .app, .run-done { animation: none !important; }
          .app, .glass, .tick, .st, .at-t, .mark { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
