'use client'

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AppFrame, TodoDesk, COMP_CHANGE, type TodoFocus, type TodoItem } from '@/components/mockups'
import { MambaMark } from '@/components/mamba-mark'
import { useStory, useMedia, Typed, StoryReplay } from '@/components/story'

/* ─────────────────────────── The story ───────────────────────────
   A camera journey, played once (about 6.5 s), over real product:
   A  Slack, close on the composer: Priya's message types itself and sends.
   B  The camera pulls back: MambaHR answers in the thread and ticks off
      the onboarding, then says what is left for a person.
   C  The camera glides along a Dusk line into the MambaHR app: Maya's day
      one arrives on To do and opens on that one step; the camera pushes in.
   Wide screens: one wide canvas and a camera (pull back, travel, push in).
   Below 1100px: the shots stack in a fixed frame and the camera moves down.
   Reduced motion: the last frame. */

const MSG = '@MambaHR Maya signed. She starts Monday.'
const MENTION = '@MambaHR'

// 1 sent, 2 MambaHR replies (camera B), 3-7 the five steps tick, 8 what is
// left for a person, 9 camera C, 10 Maya's row arrives, 11 it opens,
// 12 push in, 13 at rest (Replay). Milliseconds from the start.
const SCRIPT = {
  phases: [1450, 1950, 2350, 2600, 2850, 3100, 3350, 3650, 4100, 5100, 5500, 5900, 6500],
  typing: [{ at: 300, text: MSG, ms: 26 }],
  rootMargin: '0px 0px -12% 0px',
} as const

const STEPS = [
  { t: 'Form I-9 sent to Maya', at: '9:02' },
  { t: 'Day-one invite sent', at: '9:02' },
  { t: 'Accounts requested from IT', at: '9:02' },
  { t: 'Laptop request sent to IT', at: '9:03' },
  { t: 'Added to the June 15 payroll changes', at: '9:03' },
]

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

/* ── The camera ──
   Wide: the canvas is laid out in a 1320 x 500 frame (--fit scales it to the
   stage). A camera is the canvas transform for one shot. */
type Cam = { x: number; y: number; s: number }
const FRAME = { w: 1320, h: 500 }
const WIDE: Record<'a' | 'b' | 'c' | 'd', Cam> = {
  a: { x: -52.8, y: -136.4, s: 1.08 }, // close on the composer
  b: { x: 0, y: 20, s: 1 }, // the whole Slack window
  c: { x: -1317.6, y: 0, s: 0.96 }, // the app (1320 wide, so To do puts the decision beside the facts)
  d: { x: -1371.7, y: -6.5, s: 0.985 }, // pushed in on the open item
}
// How each move travels: duration, and how far the camera pulls back on the
// way (1 = straight).
const MOVES: Record<string, { ms: number; pull: number }> = {
  ab: { ms: 700, pull: 0.97 },
  bc: { ms: 1150, pull: 0.8 },
  cd: { ms: 800, pull: 1 },
}
const toT = (c: Cam) => `translate(${c.x}px, ${c.y}px) scale(${c.s})`
// Halfway, pulled back around the midpoint of the two shots' centres.
function midway(a: Cam, b: Cam, pull: number): Cam {
  const cx = ((FRAME.w / 2 - a.x) / a.s + (FRAME.w / 2 - b.x) / b.s) / 2
  const cy = ((FRAME.h / 2 - a.y) / a.s + (FRAME.h / 2 - b.y) / b.s) / 2
  const s = Math.min(a.s, b.s) * pull
  return { x: FRAME.w / 2 - cx * s, y: FRAME.h / 2 - cy * s, s }
}

// Grain for the light field: fractal noise, alpha only, tiled.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Hero() {
  const { ref: stageRef, phase, typed, resetting, still, done, replay } = useStory(SCRIPT)
  const narrow = useMedia('(max-width: 1099px)')
  const canvasRef = useRef<HTMLDivElement>(null)
  const slackRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const gradId = useId().replace(/:/g, '')
  // Narrow screens: how far down the column each shot sits.
  const [stops, setStops] = useState({ a: 0, c: 0, d: 0 })

  const sent = phase >= 1
  const replied = phase >= 2
  const ticked = Math.min(Math.max(phase - 2, 0), STEPS.length)
  const leftForYou = phase >= 8
  const inApp = phase >= 9
  const arrived = phase >= 10
  const opened = phase >= 11
  const shot: 'a' | 'b' | 'c' | 'd' = phase >= 12 ? 'd' : inApp ? 'c' : replied ? 'b' : 'a'
  const queue = arrived ? [DAY_ONE_ROW, RAISE, LEAVE] : [RAISE, LEAVE]

  const cam: Cam = useMemo(
    () => (narrow ? { x: 0, y: -(shot === 'd' ? stops.d : shot === 'c' ? stops.c : stops.a), s: 1 } : WIDE[shot]),
    [narrow, shot, stops],
  )

  // Wide: scale the 1320px frame to the stage. Narrow: measure the shots.
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const measure = () => {
      stage.style.setProperty('--fit', String(Math.min(1, stage.clientWidth / FRAME.w)))
      const top = canvas.getBoundingClientRect().top
      const y = (el: Element | null | undefined) => (el ? el.getBoundingClientRect().top - top : 0)
      const yb = (el: Element | null | undefined) => (el ? el.getBoundingClientRect().bottom - top : 0)
      const h = stage.clientHeight
      const c = Math.max(0, y(appRef.current) - 16)
      // The decision buttons of the open item, from the To do mockup.
      const pills = appRef.current?.querySelector('.desk-pane [class*="pills"]')
      const d = Math.max(c, yb(pills) + 40 - h)
      setStops({ a: Math.max(0, y(slackRef.current) - 16), c, d })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [stageRef])

  // Move the camera: pull back, travel, push in.
  const prev = useRef<Cam>(cam)
  const prevShot = useRef(shot)
  useLayoutEffect(() => {
    const el = canvasRef.current
    const from = prev.current
    const key = `${prevShot.current}${shot}`
    prev.current = cam
    prevShot.current = shot
    if (!el || resetting || still || toT(from) === toT(cam)) return
    const move = MOVES[key] ?? { ms: 800, pull: 1 }
    const frames = narrow || move.pull === 1
      ? [{ transform: toT(from) }, { transform: toT(cam) }]
      : [{ transform: toT(from) }, { transform: toT(midway(from, cam, move.pull)), offset: 0.5 }, { transform: toT(cam) }]
    el.animate(frames, { duration: move.ms, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' })
  }, [cam, narrow, resetting, shot, still])

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

      <div className="stage-wrap">
      <div className="stage" ref={stageRef}>
        <p className="sr-only">
          An example of MambaHR at work: Priya asks MambaHR in Slack to onboard Maya Chen, who starts
          Monday. MambaHR sends Form I-9 to Maya, sends the day-one invite, requests her accounts and
          laptop from IT, and adds her to the June 15 payroll changes. The one step that needs a person,
          Form I-9 Section 2 by Thursday, goes on the To do list in the MambaHR app.
        </p>
        <div className="field" aria-hidden="true">
          <span className="f f1" />
          <span className="f f2" />
          <span className="f f3" />
          <span className="f f4" />
          <span className="grain" />
        </div>

        <div className="fit" aria-hidden="true">
          <div ref={canvasRef} className={`canvas${resetting ? ' reset' : ''}${inApp ? ' in-app' : ''}`} style={{ transform: toT(cam) }}>
            {/* The line the camera follows from Slack into the app. */}
            <svg className="threads" width="2800" height="500" viewBox="0 0 2800 500">
              <defs>
                <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="1040" y1="0" x2="1400" y2="0">
                  <stop offset="0" stopColor="var(--dusk-1)" />
                  <stop offset="0.5" stopColor="var(--dusk-2)" />
                  <stop offset="1" stopColor="var(--dusk-3)" />
                </linearGradient>
              </defs>
              <path className="th" pathLength={1} stroke={`url(#${gradId})`} d="M1040 300 C 1200 300, 1240 210, 1400 210" />
            </svg>

            {/* A + B: Slack */}
            <div className="sw" ref={slackRef}>
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
                        <div className="m-t"><Typed text={MSG} n={MSG.length} mention={MENTION} /></div>
                      </div>
                    </div>
                  )}
                  {phase === 1 && (
                    <div className="typing pop">
                      <span className="agent-mark is-working t-mark" />
                      <span className="agent-status is-working t-t">MambaHR is on it&hellip;</span>
                    </div>
                  )}
                  {replied && (
                    <div className="m pop">
                      <div className="av av-mark"><MambaMark size={20} color="#C9A26C" /></div>
                      <div className="m-body">
                        <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:01 AM</time></div>
                        <div className="m-t">On it. Onboarding Maya Chen.</div>
                        <div className="attach">
                          {STEPS.map((s, i) => (
                            <div key={s.t} className={`a-row${ticked > i ? ' on' : ''}`}>
                              <span className="a-ic">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                              </span>
                              <span className="a-k">{s.t}</span>
                              <span className="a-v">{s.at}</span>
                            </div>
                          ))}
                          {leftForYou && (
                            <div className="a-foot pop">
                              <b>One step needs a person:</b> Form I-9 Section 2 by Thursday. It is on your To do.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="sw-composer">
                  <span className="draft">
                    {!sent && typed[0] > 0
                      ? <Typed text={MSG} n={typed[0]} mention={MENTION} caret />
                      : <span className="ph">Message #people-ops</span>}
                  </span>
                  <span className={`send${!sent && typed[0] > 0 ? ' live' : ''}`}>
                    <svg width="15" height="15" viewBox="0 0 16 16"><path d="M2 8l12-5-5 12-2-5-5-2z" fill="currentColor" /></svg>
                  </span>
                </div>
              </div>
            </div>

            {/* C: the MambaHR app */}
            <div className="app" ref={appRef}>
              <div className="app-bar">
                <span className="dots"><b /><b /><b /></span>
                <span className="addr">app.mambahr.com</span>
              </div>
              <AppFrame active="todo" org="Acme" user="AR" height={narrow ? 780 : 600} minimal>
                {/* Wide: the queue beside the open item, the decision beside
                    its facts. Narrow, where the desk would drop the open
                    item: the open item alone. */}
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

      </div>
      {done && !still && <StoryReplay onClick={replay} className="hero-replay" />}
      </div>

      <style jsx>{`
        .hero {
          --ink-1: #1a1a19;
          --ink-2: #3d3d3a;
          --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
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

        /* ---- the stage: a 1320 x 500 frame, scaled to fit ---- */
        .stage-wrap { position: relative; max-width: 1320px; margin: 0 auto; }
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
        /* The camera moves by the Web Animations API (pull back, travel, push
           in); the inline transform is where it rests. */
        .canvas { position: absolute; left: 0; top: 0; width: 2800px; height: 500px; transform-origin: 0 0; }
        .canvas.reset :global(*) { transition: none !important; animation: none !important; }

        .threads { position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible; }
        .th { fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0.9; transition: stroke-dashoffset 1s var(--ease-out) 0.1s; }
        .in-app .th { stroke-dashoffset: 0; }

        /* ---- A + B: Slack (light, as in the Channels section) ---- */
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
        .sw-feed { height: 300px; padding: 0 18px 6px; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; overflow: hidden; }
        .m { display: flex; gap: 11px; flex: none; }
        .pop { animation: msgIn 0.4s var(--ease-out) both; }
        .av { width: 36px; height: 36px; border-radius: 9px; object-fit: cover; flex: none; }
        .av-mark { background: #0c0c0b; display: flex; align-items: center; justify-content: center; }
        .m-body { min-width: 0; flex: 1; }
        .m-h { display: flex; align-items: baseline; gap: 8px; }
        .m-h b { font-size: 14px; font-weight: 700; }
        .m-h time { font-size: 12px; color: var(--text-faint); }
        .apptag { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.04em; color: var(--text-muted); background: var(--bg-cream); border-radius: 4px; padding: 1px 5px; }
        .m-t { font-size: 14px; line-height: 1.5; margin-top: 2px; }
        .typing { display: flex; align-items: center; gap: 8px; padding-left: 47px; flex: none; }
        .t-mark { --am-size: 20px; }
        .t-t { font-size: 12.5px; }
        .attach { margin-top: 8px; border: 1px solid var(--border-faint); background: #faf7f2; border-radius: 12px; padding: 8px 14px 10px; max-width: 420px; }
        .a-row { display: grid; grid-template-columns: 16px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 4px 0; font-size: 13px; }
        .a-ic { width: 16px; height: 16px; border-radius: 999px; display: grid; place-items: center; color: #fff; box-shadow: inset 0 0 0 1.5px rgba(26, 26, 25, 0.22); transition: background 0.25s ease, box-shadow 0.25s ease; }
        .a-ic svg { opacity: 0; transform: scale(0.4); transition: opacity 0.25s ease, transform 0.3s var(--ease-out); }
        .a-k { color: var(--text-faint); transition: color 0.25s ease; }
        .a-v { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); opacity: 0; transition: opacity 0.25s ease; }
        .a-row.on .a-ic { background: var(--green); box-shadow: none; }
        .a-row.on .a-ic svg { opacity: 1; transform: none; }
        .a-row.on .a-k { color: var(--text); }
        .a-row.on .a-v { opacity: 1; }
        .a-foot { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); font-size: 13px; line-height: 1.45; color: var(--text-muted); }
        .a-foot b { color: var(--text); font-weight: 600; }
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
        .send { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 24px; border-radius: 5px; background: var(--bg-cream); color: var(--text-faint); transition: background 0.2s ease, color 0.2s ease; }
        .send.live { background: #007a5a; color: #fff; }

        /* ---- C: the app ---- */
        .app {
          position: absolute;
          left: 1400px;
          top: 24px;
          width: 1320px;
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

        /* Wide: bottom left, over the app's quiet sidebar, clear of the
           decision. Narrow: under the stage, where it covers nothing. */
        .stage-wrap :global(.hero-replay) { position: absolute; left: 18px; bottom: 18px; z-index: 3; }

        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

        /* Short laptop screens (1280x800, 1440x900, 1536x864): pull the stage up. */
        @media (min-width: 1100px) and (max-height: 920px) {
          .hero { padding-top: 112px; }
          .sub { margin-top: 20px; }
          .ctas { margin-top: 28px; }
          .stage { margin-top: 24px; }
        }

        /* Below 1100px: the shots stack in a fixed frame; the camera moves down. */
        @media (max-width: 1099px) {
          .stage { height: 640px; }
          .fit { position: absolute; inset: 0; width: auto; height: auto; transform: none; }
          .canvas { position: relative; width: auto; height: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 32px; }
          .threads { display: none; }
          .sw, .app { position: relative; left: auto; top: auto; width: 100%; max-width: 640px; margin: 0 auto; }
          .sw { grid-template-columns: 150px minmax(0, 1fr); }
          .desk-full { display: none; }
          .desk-pane { display: block; }
          .stage-wrap { display: flex; flex-direction: column; align-items: center; }
          .stage { width: 100%; }
          .stage-wrap :global(.hero-replay) { position: static; margin-top: 14px; }
        }
        @media (max-width: 760px) {
          .stage { height: min(620px, 158vw); border-radius: 24px; }
          .canvas { padding: 14px 12px; }
          .sw { grid-template-columns: minmax(0, 1fr); }
          .sw-side { display: none; }
          .sw-feed { height: 420px; }
          .typing { padding-left: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f, .pop { animation: none !important; }
          .th, .a-ic, .a-ic svg, .a-k, .a-v, .send { transition: none !important; }
        }
      `}</style>
    </section>
  )
}
