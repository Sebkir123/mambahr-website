'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AppFrame, TodoDesk, COMP_CHANGE, type TodoFocus, type TodoItem } from '@/components/mockups'
import { Icon } from '@/components/mockups/icons'
import { MambaMark } from '@/components/mamba-mark'

/* ─────────────────────────── The story ───────────────────────────
   A camera journey over one wide canvas, played once (about 9 s):
   A  Slack: Priya's message types itself, she sends it, MambaHR
      answers "On it".
   B  Wide: MambaHR in the middle; five lines draw out to plain stops
      and each ticks as it is done.
   C  The real app: Maya's day one arrives on To do and opens on the one
      step a person has to take. The camera tilts down onto the decision
      and rests.
   Below 1100px there is no camera: the three stops stack and play in
   place. Reduced motion shows the last frame. */

const MSG = '@MambaHR Maya signed. She starts Monday.'
const MENTION = '@MambaHR'
const TYPE_START = 350
const TYPE_MS = 34

// Phases after the typing: 1 sent, 2 MambaHR replies, 3 camera at B,
// 4 camera at C, 5 Maya's row arrives, 6 it opens, 7 the camera leans in,
// 8 at rest (Replay shows). Milliseconds from the start.
const PHASES = [1850, 2350, 2950, 6350, 7450, 7950, 8500, 9200]
const LAST = PHASES.length

// The canvas is laid out in a 1320 x 500 frame; --fit scales it to the
// stage. Each camera is the canvas transform for one shot.
const CAMERAS = [
  'translate(0px, 0px) scale(1)', // A: Slack
  'translate(-1240px, 0px) scale(1)', // B: the five stops
  'translate(-2690px, 0px) scale(1)', // C: the app
  'translate(-2795.3px, -113.9px) scale(1.03)', // C, tilted down onto the decision
]

const STOPS = [
  { icon: 'dollar-sign', label: 'Payroll', detail: 'Added to the June 15 changes', at: '9:02' },
  { icon: 'calendar', label: 'Calendar', detail: 'Day-one invite sent', at: '9:02' },
  { icon: 'files', label: 'Form I-9', detail: 'Sent to Maya', at: '9:02' },
  { icon: 'at-sign', label: 'Accounts', detail: 'Requested from IT', at: '9:03' },
  { icon: 'laptop', label: 'Laptop', detail: 'Request sent to IT', at: '9:03' },
]
// Tile row geometry on the canvas (left edge, width, gap), shared by the
// tiles and the lines that reach them.
const TILE_X = 1352
const TILE_W = 200
const TILE_GAP = 24
const HUB = { x: 1900, bottom: 140 }
const TILE_TOP = 226

const RAISE: TodoItem = { title: 'Jackson Bauer · raise', meta: 'Pay · Yours', date: 'Today' }
const LEAVE: TodoItem = { title: 'Leo Schulz · time off', meta: 'Time off · Yours', date: 'Fri' }
const DAY_ONE_ROW: TodoItem = { title: 'Maya Chen · day one', meta: 'Onboarding · Yours', date: 'Mon' }
// Three facts in the hero: the peers already sit in MambaHR's read.
const RAISE_FOCUS = { ...COMP_CHANGE, facts: COMP_CHANGE.facts.slice(0, 3) }
// The one onboarding step a person has to do: Form I-9 Section 2 is due
// within three business days of the first day, so Thursday for a Monday start.
const DAY_ONE: TodoFocus = {
  eyebrow: 'Started when Priya asked in Slack · Today 9:01',
  position: '1 of 3',
  title: 'Day one for Maya Chen',
  summary: 'Maya starts Monday as a Senior Engineer. Everything is done except one step that needs a person.',
  facts: [
    { k: 'Form I-9', v: 'Sent to Maya; Section 2 by Thursday' },
    { k: 'Accounts', v: 'Requested from IT' },
    { k: 'Laptop', v: 'Request sent to IT' },
  ],
  read: 'Everything else is ready for Monday. Form I-9 Section 2 needs someone at the company to review her documents by Thursday.',
  decisions: [
    { label: 'Assign to me', primary: true, consequence: 'It goes on your To do for Monday.' },
    { label: 'Pick someone else', consequence: 'Nothing is assigned until you choose.' },
  ],
  history: [],
}

// Grain for the light field: fractal noise, alpha only, tiled.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const gradId = useId().replace(/:/g, '')
  const [typed, setTyped] = useState(0)
  const [phase, setPhase] = useState(0)
  const [reset, setReset] = useState(false)
  const [still, setStill] = useState(false)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
  const play = () => {
    clear()
    for (let i = 1; i <= MSG.length; i++) at(TYPE_START + i * TYPE_MS, () => setTyped(i))
    PHASES.forEach((ms, i) => at(ms, () => setPhase(i + 1)))
  }
  const replay = () => {
    clear()
    // Jump back without animating backwards, then play from the top.
    setReset(true)
    setTyped(0)
    setPhase(0)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setReset(false)
      play()
    }))
  }

  useEffect(() => {
    const stage = stageRef.current
    // Scale the 1320px-wide frame to the stage.
    const fit = () => stage?.style.setProperty('--fit', String(Math.min(1, stage.clientWidth / 1320)))
    fit()
    const ro = 'ResizeObserver' in window && stage ? new ResizeObserver(fit) : null
    if (ro && stage) ro.observe(stage)

    // Reduced motion: no journey, straight to the last frame.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      at(0, () => {
        setStill(true)
        setTyped(MSG.length)
        setPhase(LAST)
      })
      return () => {
        ro?.disconnect()
        clear()
      }
    }
    let io: IntersectionObserver | null = null
    if (stage && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect()
            play()
          }
        },
        // Start once the top of the stage is on screen. A share of the
        // stage would never be reached on phones, where it stacks tall.
        { threshold: 0, rootMargin: '0px 0px -12% 0px' },
      )
      io.observe(stage)
    } else {
      play()
    }
    return () => {
      io?.disconnect()
      ro?.disconnect()
      clear()
    }
    // play/clear only touch refs and state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sent = phase >= 1
  const replied = phase >= 2
  const atB = phase >= 3
  const atC = phase >= 4
  const arrived = phase >= 5
  const opened = phase >= 6
  const camera = CAMERAS[phase >= 7 ? 3 : atC ? 2 : atB ? 1 : 0]
  const queue = arrived ? [DAY_ONE_ROW, RAISE, LEAVE] : [RAISE, LEAVE]
  const draft = sent ? '' : MSG.slice(0, typed)

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

      <div className="stage" ref={stageRef}>
        <div className="field" aria-hidden="true">
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
          <span className="f f4" />
          <span className="grain" />
        </div>

        <div className="fit" aria-hidden="true">
          <div
            className={`canvas${reset ? ' reset' : ''}${atB ? ' at-b' : ''}${atC ? ' at-c' : ''}`}
            style={{ transform: camera }}
          >
            {/* The threads the camera follows: Slack to MambaHR, MambaHR to
                each stop, the stops into the app. */}
            <svg className="threads" width="3960" height="640" viewBox="0 0 3960 640">
              <defs>
                <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="900" y1="0" x2="2800" y2="0">
                  <stop offset="0" stopColor="var(--dusk-1)" />
                  <stop offset="0.5" stopColor="var(--dusk-2)" />
                  <stop offset="1" stopColor="var(--dusk-3)" />
                </linearGradient>
              </defs>
              <path className="th t1" pathLength={1} stroke={`url(#${gradId})`} d="M1040 200 C 1350 200, 1450 100, 1740 100" />
              {STOPS.map((s, i) => {
                const cx = TILE_X + TILE_W / 2 + i * (TILE_W + TILE_GAP)
                return (
                  <path
                    key={s.label}
                    className="th fan"
                    style={{ ['--i' as string]: i }}
                    pathLength={1}
                    stroke={`url(#${gradId})`}
                    d={`M${HUB.x} ${HUB.bottom} C ${HUB.x} 186, ${cx} 180, ${cx} ${TILE_TOP}`}
                  />
                )
              })}
              <path className="th t2" pathLength={1} stroke={`url(#${gradId})`} d="M2448 276 C 2600 276, 2620 300, 2780 300" />
            </svg>

            {/* A: Slack, where the ask arrives */}
            <div className="sw">
              <div className="sw-side">
                <span className="sw-ws">Acme</span>
                <span className="sw-sec">Channels</span>
                <span className="sw-ch"><span className="hash">#</span>general</span>
                <span className="sw-ch"><span className="hash">#</span>hiring</span>
                <span className="sw-ch on"><span className="hash">#</span>people-ops</span>
                <span className="sw-sec">Apps</span>
                <span className="sw-ch"><span className="sw-app"><MambaMark size={10} color="#C9A26C" /></span>MambaHR</span>
              </div>
              <div className="sw-main">
              <div className="sw-head">
                <span className="h-ch"><span className="hash">#</span>people-ops</span>
                <span className="h-mem">12 members</span>
              </div>
              <div className="sw-feed">
                <div className="m">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="av" src="/avatars/anna-72.jpg" alt="" width={36} height={36} />
                  <div className="m-body">
                    <div className="m-h"><b>Ana Ruiz</b><time>Yesterday 11:20 AM</time></div>
                    <div className="m-t">Maya was great in the final round. Let&rsquo;s make the offer.</div>
                  </div>
                </div>
                <div className="m">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="av" src="/avatars/brian-72.jpg" alt="" width={36} height={36} />
                  <div className="m-body">
                    <div className="m-h"><b>Brian Bell</b><time>Yesterday 4:12 PM</time></div>
                    <div className="m-t">Maya&rsquo;s offer is out. She is reading it tonight.</div>
                  </div>
                </div>
                {sent && (
                  <div className="m pop">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="av" src="/avatars/priya-72.jpg" alt="" width={36} height={36} />
                    <div className="m-body">
                      <div className="m-h"><b>Priya Nair</b><time>9:01 AM</time></div>
                      <div className="m-t"><span className="mention">{MENTION}</span>{MSG.slice(MENTION.length)}</div>
                    </div>
                  </div>
                )}
                {replied && (
                  <div className="m pop">
                    <div className="av av-mark"><MambaMark size={20} color="#C9A26C" /></div>
                    <div className="m-body">
                      <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:01 AM</time></div>
                      <div className="m-t">On it. Onboarding Maya Chen now.</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sw-composer">
                <span className="draft">
                  {draft ? (
                    <>
                      {draft.length >= MENTION.length
                        ? <><span className="mention">{MENTION}</span>{draft.slice(MENTION.length)}</>
                        : draft}
                      <span className="caret" />
                    </>
                  ) : (
                    <span className="ph">Message #people-ops</span>
                  )}
                </span>
                <span className={`send${draft ? ' live' : ''}`}>
                  <svg width="15" height="15" viewBox="0 0 16 16"><path d="M2 8l12-5-5 12-2-5-5-2z" fill="currentColor" /></svg>
                </span>
              </div>
              </div>
            </div>

            {/* B: MambaHR does the admin */}
            <div className="hub">
              <span className="hub-mark">
                <span className="agent-mark is-working hm" />
                <span className="agent-mark hm rest" />
              </span>
              <span className="hub-t">
                <span className="agent-status is-working h-run">Onboarding Maya Chen</span>
                <span className="h-done">Maya is ready for Monday</span>
                <span className="hub-s">Asked in #people-ops · 9:01</span>
              </span>
            </div>
            <div className="tiles">
              {STOPS.map((s, i) => (
                <div key={s.label} className="tile" style={{ ['--i' as string]: i }}>
                  <div className="t-top">
                    <span className="t-ic"><Icon name={s.icon} size={15} /></span>
                    <b className="t-l">{s.label}</b>
                    <span className="t-st">
                      <svg className="tick" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                    </span>
                  </div>
                  <span className="t-d">{s.detail}</span>
                  <span className="t-at">{s.at}</span>
                </div>
              ))}
            </div>

            <p className="b-foot"><span>Done by 9:03. By hand, about half a day.</span></p>

            {/* C: the real app, where the one step for a person lands */}
            <div className="app">
              <div className="app-bar">
                <span className="dots"><b /><b /><b /></span>
                <span className="addr">app.mambahr.com</span>
              </div>
              <AppFrame active="todo" org="Acme" user="AR" height={600} minimal>
                {/* Wide: the queue beside the open item. Narrow, where the
                    desk would drop the open item: the open item alone. */}
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
          </div>
        </div>

        {phase >= LAST && !still && (
          <button type="button" className="replay" onClick={replay}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
            Replay
          </button>
        )}
      </div>

      <style jsx>{`
        .hero {
          --ink-1: #1a1a19;
          --ink-2: #3d3d3a;
          --glass-bg: rgba(255, 255, 255, 0.62);
          --glass-line: rgba(255, 255, 255, 0.78);
          --glass-sub: #57534c;
          --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
          --ease-cam: cubic-bezier(0.65, 0, 0.35, 1);
          position: relative;
          overflow: hidden;
          padding: clamp(112px, 11vw, 148px) var(--page-pad) clamp(40px, 5vw, 72px);
          background: var(--bg);
          isolation: isolate;
          container-type: inline-size;
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

        /* ---- the stage: a 1320 x 600 frame, scaled to fit ---- */
        .stage {
          --fit: 1;
          position: relative;
          max-width: 1320px;
          height: min(500px, 37.8788cqw);
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

        .fit { position: absolute; left: 0; top: 0; width: 1320px; height: 500px; transform: scale(var(--fit)); transform-origin: 0 0; }
        .canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 3960px;
          height: 640px;
          transform-origin: 0 0;
          transition: transform 1.05s var(--ease-cam);
        }
        .canvas.reset, .canvas.reset :global(*) { transition: none !important; animation: none !important; }

        /* ---- the threads ---- */
        .threads { position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible; }
        .th { fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0.9; }
        .t1 { transition: stroke-dashoffset 0.9s var(--ease-out) 0.1s; }
        .fan { transition: stroke-dashoffset 0.35s ease-out calc(0.9s + var(--i) * 0.4s); }
        .t2 { transition: stroke-dashoffset 1s var(--ease-out) 0.1s; }
        .at-b .t1, .at-b .fan, .at-c .t2 { stroke-dashoffset: 0; }

        /* ---- A: Slack ---- */
        .sw {
          position: absolute;
          left: 280px;
          top: 20px;
          width: 760px;
          display: grid;
          grid-template-columns: 172px minmax(0, 1fr);
          border-radius: 14px;
          background: var(--bg-card);
          box-shadow: var(--shadow-float);
          border: 1px solid var(--border);
          overflow: hidden;
          font-size: 13px;
          color: var(--text);
        }
        /* The light Slack of the Channels section, not Slack's dark sidebar. */
        .sw-side { background: #f7f2f8; border-right: 1px solid rgba(29, 28, 29, 0.08); padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; }
        .sw-ws { font-weight: 700; font-size: 14px; color: #1d1c1d; padding: 4px 8px 12px; border-bottom: 1px solid rgba(29, 28, 29, 0.1); margin-bottom: 4px; }
        .sw-sec { font-size: 12px; letter-spacing: 0.02em; padding: 10px 8px 5px; color: rgba(29, 28, 29, 0.72); }
        .sw-ch { display: flex; align-items: center; gap: 7px; padding: 5px 8px; border-radius: 6px; white-space: nowrap; font-size: 14px; color: rgba(29, 28, 29, 0.78); }
        .sw-ch .hash { color: rgba(29, 28, 29, 0.66); }
        .sw-ch.on { background: #e8ddf1; color: #3d2a55; font-weight: 600; }
        .sw-ch.on .hash { color: #3d2a55; }
        .sw-app { width: 16px; height: 16px; border-radius: 4px; background: #0c0c0b; display: grid; place-items: center; }
        .sw-main { min-width: 0; display: flex; flex-direction: column; }
        .sw-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--border); }
        .h-ch { font-weight: 700; font-size: 15px; display: flex; gap: 2px; }
        .hash { color: var(--text-faint); font-weight: 600; }
        .h-mem { font-size: 12px; color: var(--text-faint); }
        .sw-feed { height: 204px; padding: 0 18px 6px; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; overflow: hidden; }
        .m { display: flex; gap: 11px; }
        .m.pop { animation: msgIn 0.4s var(--ease-out) both; }
        .av { width: 36px; height: 36px; border-radius: 9px; object-fit: cover; flex: none; }
        .av-mark { background: #0c0c0b; display: flex; align-items: center; justify-content: center; }
        .m-body { min-width: 0; }
        .m-h { display: flex; align-items: baseline; gap: 8px; }
        .m-h b { font-size: 14px; font-weight: 700; }
        .m-h time { font-size: 12px; color: var(--text-faint); }
        .apptag { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.04em; color: var(--text-muted); background: var(--bg-cream); border-radius: 4px; padding: 1px 5px; }
        .m-t { font-size: 14px; line-height: 1.5; margin-top: 2px; }
        .mention { color: var(--violet); background: var(--violet-soft); border-radius: 4px; padding: 0 3px; font-weight: 600; }
        .sw-composer {
          margin: 10px 18px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1px solid var(--border-mid);
          border-radius: 10px;
          padding: 8px 12px 8px 14px;
          font-size: 14px;
          min-height: 42px;
        }
        .draft { min-width: 0; white-space: nowrap; overflow: hidden; }
        .ph { color: var(--text-faint); }
        .caret { display: inline-block; width: 1.5px; height: 1.1em; margin-left: 1px; vertical-align: -0.18em; background: var(--ink-1); animation: blink 1s steps(1) infinite; }
        .send { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 24px; border-radius: 5px; background: var(--bg-cream); color: var(--text-faint); transition: background 0.2s ease, color 0.2s ease; }
        .send.live { background: #007a5a; color: #fff; }

        /* ---- B: MambaHR and the five stops ---- */
        .hub {
          position: absolute;
          left: 1740px;
          top: 60px;
          width: 320px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-lg);
          background: var(--glass-bg);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          backdrop-filter: blur(22px) saturate(170%);
          border: 1px solid var(--glass-line);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 24px 48px -18px rgba(40, 25, 70, 0.45);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s var(--ease-out) 0.7s, transform 0.5s var(--ease-out) 0.7s;
        }
        .at-b .hub { opacity: 1; transform: none; }
        .hub-mark { position: relative; width: 36px; height: 36px; flex: none; }
        .hub-mark .hm { position: absolute; inset: 0; }
        .hub-mark .rest { opacity: 0; }
        .hub-t { position: relative; display: grid; min-width: 0; }
        .h-run, .h-done { grid-area: 1 / 1; font-size: 15px; white-space: nowrap; }
        .h-done { font-weight: 600; color: var(--ink-1); opacity: 0; }
        .hub-s { font-size: 12px; color: var(--glass-sub); margin-top: 2px; }
        /* Out first, then in, so the two lines never overlap. */
        .h-run, .hub-mark .hm:not(.rest) { transition: opacity 0.2s ease 3s; }
        .h-done, .hub-mark .rest { transition: opacity 0.3s ease 3.2s; }
        .at-b .h-run, .at-b .hub-mark .hm:not(.rest) { opacity: 0; }
        .at-b .h-done, .at-b .hub-mark .rest { opacity: 1; }

        .b-foot {
          position: absolute;
          left: 1700px;
          top: 368px;
          width: 400px;
          margin: 0;
          display: flex;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s ease 3.2s;
        }
        .b-foot span {
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 14px;
          color: var(--ink-1);
          background: var(--glass-bg);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          border: 1px solid var(--glass-line);
        }
        .at-b .b-foot { opacity: 1; }
        .tiles { position: absolute; left: ${TILE_X}px; top: ${TILE_TOP}px; display: flex; gap: ${TILE_GAP}px; }
        .tile {
          width: ${TILE_W}px;
          display: grid;
          gap: 6px;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          box-shadow: 0 1px 2px rgba(40, 25, 60, 0.06), 0 14px 30px -14px rgba(40, 25, 60, 0.35);
          opacity: 0.55;
          transition: opacity 0.35s ease calc(1.2s + var(--i) * 0.4s);
        }
        .at-b .tile { opacity: 1; }
        .t-top { display: flex; align-items: center; gap: 8px; }
        .t-ic { width: 26px; height: 26px; border-radius: var(--radius-sm); display: grid; place-items: center; background: var(--gold-tint); color: var(--gold); flex: none; }
        .t-l { font-size: 14px; font-weight: 600; color: var(--ink-1); }
        .t-st { margin-left: auto; width: 18px; height: 18px; border-radius: 999px; display: grid; place-items: center; box-shadow: inset 0 0 0 1.5px rgba(26, 26, 25, 0.2); transition: box-shadow 0.3s ease calc(1.2s + var(--i) * 0.4s), background 0.3s ease calc(1.2s + var(--i) * 0.4s); }
        .tick { color: #fff; opacity: 0; transform: scale(0.4); transition: opacity 0.3s ease calc(1.2s + var(--i) * 0.4s), transform 0.35s var(--ease-out) calc(1.2s + var(--i) * 0.4s); }
        .at-b .t-st { box-shadow: none; background: var(--green); }
        .at-b .tick { opacity: 1; transform: none; }
        .t-d { font-size: 13px; line-height: 1.4; color: var(--text-muted); }
        .t-at { font-family: var(--font-mono); font-size: 11.5px; color: var(--text-faint); font-variant-numeric: tabular-nums; opacity: 0; transition: opacity 0.3s ease calc(1.2s + var(--i) * 0.4s); }
        .at-b .t-at { opacity: 1; }

        /* ---- C: the app ---- */
        .app {
          position: absolute;
          left: 2780px;
          top: 24px;
          width: 1140px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(40, 25, 60, 0.08),
            0 30px 70px -20px rgba(40, 25, 60, 0.45);
        }
        .app-bar { display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 40px; background: var(--bg-surface); border-bottom: 1px solid var(--border-faint); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 10px; height: 10px; border-radius: 999px; }
        .dots b:nth-child(1) { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: var(--text-faint); background: var(--bg-card); border-radius: var(--radius-full); box-shadow: inset 0 0 0 1px var(--border-faint); padding: 3px 16px; }
        .desk-pane { display: none; padding: 16px; }

        /* ---- replay ---- */
        .replay {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid var(--glass-line);
          background: rgba(255, 255, 255, 0.72);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          color: var(--ink-1);
          font: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 10px 24px -12px rgba(40, 25, 70, 0.5);
          animation: fadein 0.5s ease both;
        }
        .replay:hover { background: #fff; }
        .replay:focus-visible { outline: 2px solid var(--ink-1); outline-offset: 3px; }

        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes blink { 50% { opacity: 0; } }

        /* Short laptop screens (1280x800, 1536x864): pull the stage up. */
        @media (min-width: 1100px) and (max-height: 920px) {
          .hero { padding-top: 112px; }
          .sub { margin-top: 20px; }
          .ctas { margin-top: 28px; }
          .stage { margin-top: 24px; }
        }

        /* Below 1100px: no camera. The three stops stack and play in place. */
        @media (max-width: 1099px) {
          .stage { height: auto; padding: 24px 20px 76px; }
          .fit { position: static; width: auto; height: auto; transform: none; }
          .canvas { position: static; width: auto; height: auto; transform: none !important; display: flex; flex-direction: column; gap: 16px; }
          .threads { display: none; }
          .sw, .hub, .tiles, .app, .b-foot { position: static; }
          .sw { width: 100%; max-width: 620px; margin: 0 auto; grid-template-columns: 150px minmax(0, 1fr); }
          .b-foot { width: auto; transition-delay: 0s; }
          .hub { width: 100%; max-width: 620px; margin: 8px auto 0; transition-delay: 0s; }
          .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); width: 100%; max-width: 620px; margin: 0 auto; gap: 10px; }
          .tile { width: auto; }
          .app { width: 100%; margin-top: 8px; }
          .replay { right: 50%; transform: translateX(50%); }
        }
        @media (max-width: 1099px) {
          .desk-full { display: none; }
          .desk-pane { display: block; }
        }
        @media (max-width: 760px) {
          .stage { padding: 16px 14px 72px; border-radius: 24px; }
          .sw { grid-template-columns: minmax(0, 1fr); }
          .sw-side { display: none; }
          .sw-feed { height: 260px; }
          .h-run, .h-done { white-space: normal; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f, .m.pop, .caret, .replay { animation: none !important; }
          .canvas, .th, .hub, .tile, .t-st, .tick, .t-at, .h-run, .h-done, .hub-mark .hm, .send, .b-foot { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
