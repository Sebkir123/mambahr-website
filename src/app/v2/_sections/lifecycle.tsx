'use client'

import { useEffect, useRef, useState } from 'react'

type Stage = {
  label: string
  headline: string
  sub: string
  person: { img: string; name: string; role: string }
  log: { t: string; text: string }[]
  chips: string[]
  state: 'working' | 'done'
  stateText: string
}

const STAGES: Stage[] = [
  {
    label: 'Recruit & hire',
    headline: 'From job post to signed offer, without the chase.',
    sub: 'The role goes up, the best candidates surface, and the offer is signed before the competition even calls back.',
    person: { img: '/avatars/maya.jpg', name: 'Maya Chen', role: 'Senior Engineer · joining' },
    log: [
      { t: '9:02', text: 'Job posted, candidates screened' },
      { t: '9:38', text: 'Offer drafted at the right salary' },
      { t: '11:15', text: 'Signed, same morning' },
    ],
    chips: ['EEO-1', 'DocuSign'],
    state: 'done',
    stateText: 'Mamba · offer signed',
  },
  {
    label: 'Onboard',
    headline: 'Day one, ready before they arrive.',
    sub: 'Paperwork done, logins working, first week planned. Your new hire walks into a company that has its act together.',
    person: { img: '/avatars/dave.jpg', name: 'Alex Park', role: 'starts Monday' },
    log: [
      { t: '9:02', text: 'New-hire paperwork filed and verified' },
      { t: '9:05', text: 'Email, Slack, and laptop logins ready' },
      { t: '9:07', text: 'First week scheduled with the team' },
    ],
    chips: ['I-9 / E-Verify', 'Okta'],
    state: 'done',
    stateText: 'Mamba · done in 4m 12s',
  },
  {
    label: 'Payroll & benefits',
    headline: 'Payday runs itself.',
    sub: 'Every raise, new hire, and change is ready for payday, checked twice. Benefits enroll themselves when life happens.',
    person: { img: '/avatars/priya.jpg', name: 'Priya Shah', role: 'new 401(k) enrollment' },
    log: [
      { t: 'Mon', text: 'Every change ready for payday' },
      { t: 'Tue', text: '401(k) and benefits enrolled' },
      { t: 'Wed', text: 'Double-checked, nothing missed' },
    ],
    chips: ['Payroll-ready', 'Guideline 401(k)'],
    state: 'working',
    stateText: 'Mamba · prepping payday',
  },
  {
    label: 'Perform & grow',
    headline: 'Reviews that write themselves, with receipts.',
    sub: 'Review season starts itself and chases the stragglers. First drafts come from real work, and managers walk in prepared.',
    person: { img: '/avatars/anna.jpg', name: 'Anna Wilson', role: 'mid-year review' },
    log: [
      { t: 'Q2', text: 'Review season kicked off for everyone' },
      { t: 'Q2', text: 'First drafts written from real work' },
      { t: 'Q2', text: 'Managers walk in prepared' },
    ],
    chips: ['Calibration'],
    state: 'working',
    stateText: 'Mamba · drafting reviews',
  },
  {
    label: 'Comp & promotion',
    headline: 'Raises priced right, every time.',
    sub: 'Every raise is checked against your pay ranges before anyone sees it. The big calls always come to you first.',
    person: { img: '/avatars/tom.jpg', name: 'Tom Harrison', role: 'merit raise' },
    log: [
      { t: '2:10', text: 'Raise checked against your pay ranges' },
      { t: '2:11', text: 'A big one, flagged first' },
      { t: '2:40', text: 'Letter sent, signed, and filed' },
    ],
    chips: ['Pay transparency'],
    state: 'done',
    stateText: 'Mamba · sent to you',
  },
  {
    label: 'Time off & leave',
    headline: 'Approved before they finish asking.',
    sub: 'Normal time off approves itself in seconds. Family and medical leave is handled the legally-safe way, every time.',
    person: { img: '/avatars/violet.jpg', name: 'Violet Hayes', role: 'parental leave' },
    log: [
      { t: '9:14', text: 'Request read, answered in the same minute' },
      { t: '9:14', text: 'Family leave handled the legal-safe way' },
      { t: '9:14', text: 'Calendar and payday already updated' },
    ],
    chips: ['FMLA', 'State leave'],
    state: 'done',
    stateText: 'Mamba · done in seconds',
  },
  {
    label: 'Offboard / RIF',
    headline: 'Clean exits. Zero loose ends.',
    sub: 'Notices on time, severance done right, final paycheck correct for their state, and a human signs off on every exit.',
    person: { img: '/avatars/marcus.jpg', name: 'Marcus Webb', role: 'departing · final week' },
    log: [
      { t: 'Day 1', text: 'Notices and severance calculated' },
      { t: 'Day 2', text: 'Final paycheck right for their state' },
      { t: 'Exit', text: 'Logins switched off after your sign-off' },
    ],
    chips: ['WARN', 'COBRA'],
    state: 'working',
    stateText: 'Mamba · awaiting your sign-off',
  },
]

export default function Lifecycle() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length)
    }, 4200)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused])

  const s = STAGES[active]

  return (
    <section className="lc">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">The whole lifecycle</p>
          <h2 className="title">
            From the offer letter <span className="em">to the exit interview.</span>
          </h2>
          <p className="lead">
            One agent runs the entire employee journey. Pick a stage; everything in it is
            handled, cited, and logged.
          </p>
        </div>

        <div
          className="rail"
          data-reveal
          data-delay="1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="track" aria-hidden="true">
            <span className="fill" style={{ width: `${(active / (STAGES.length - 1)) * 100}%` }} />
          </div>
          {STAGES.map((st, i) => (
            <button
              key={st.label}
              type="button"
              className={`stop${i === active ? ' on' : ''}${i < active ? ' past' : ''}`}
              onClick={() => { setActive(i); setPaused(true) }}
              aria-current={i === active}
            >
              {i === active && <span className="halo" aria-hidden="true" />}
              <span className="dot" aria-hidden="true" />
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="lbl">{st.label}</span>
            </button>
          ))}
        </div>

        <div
          className="spot agent-edge agent-working agent-lg"
          data-reveal
          data-delay="2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="spot-copy" key={`c${active}`}>
            <span className={`mamba-chip ${s.state}`}><span className="mc-i" aria-hidden="true" />{s.stateText}</span>
            <h3 className="spot-h">{s.headline}</h3>
            <p className="spot-sub">{s.sub}</p>
            <div className="chips">
              <span className="chips-l">Compliance handled</span>
              {s.chips.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
          <div className="spot-log" key={`l${active}`}>
            <div className="log-person">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lp-av" src={s.person.img} alt="" width={38} height={38} loading="lazy" decoding="async" />
              <div>
                <div className="lp-n">{s.person.name}</div>
                <div className="lp-r">{s.person.role}</div>
              </div>
              <span className="lp-tag">Mamba&rsquo;s log</span>
            </div>
            {s.log.map((l, i) => (
              <div key={l.text} className="log-row" style={{ animationDelay: `${0.12 + i * 0.1}s` }}>
                <span className="log-check" aria-hidden="true" />
                <span className="log-text">{l.text}</span>
                <span className="log-t">{l.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lc { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: none; margin-bottom: clamp(44px, 5vw, 64px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.08; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(18px, 2vw, 20px); line-height: 1.55; color: var(--text-muted); margin: 20px 0 0; max-width: 600px; }

        /* journey rail */
        .rail {
          position: relative;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 22px;
        }
        .track {
          position: absolute;
          top: 8px;
          left: 7%;
          right: 7%;
          height: 2px;
          background: var(--border);
          border-radius: 999px;
          overflow: hidden;
        }
        .fill {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #B98A4E, #6A5DA6);
          border-radius: 999px;
          transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .stop {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          padding: 0 4px 6px;
          cursor: pointer;
          font: inherit;
        }
        .dot {
          position: relative;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg);
          box-shadow: inset 0 0 0 2px var(--border-mid);
          transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .stop.past .dot { box-shadow: inset 0 0 0 2px #B98A4E; }
        .stop.past .dot::before {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          background: #B98A4E;
        }
        .stop.on .dot { transform: scale(1.15); box-shadow: none; }
        /* gradient ring + white core, all explicitly circular */
        .stop.on .dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 220deg, #D4AA7C, #6A5DA6, #B98A4E, #D4AA7C);
        }
        .stop.on .dot::after {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 50%;
          background: var(--bg);
        }
        .stop.on { position: relative; }
        .stop.on .halo {
          position: absolute;
          top: -6px;
          left: 50%;
          width: 32px;
          height: 32px;
          margin-left: -16px;
          border-radius: 50%;
          border: 1.5px solid rgba(106, 93, 166, 0.35);
          animation: haloPulse 2.4s ease-out infinite;
          pointer-events: none;
        }
        @keyframes haloPulse {
          0% { transform: scale(0.7); opacity: 1; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .stop.on .halo { animation: none; opacity: 0.5; }
          .dot { transition: none; }
        }
        .num { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.05em; color: var(--text-faint); }
        .lbl { font-size: 13px; font-weight: 600; color: var(--text-faint); transition: color 0.2s ease; text-align: center; line-height: 1.25; }
        .stop:hover .lbl { color: var(--text-muted); }
        .stop.on .lbl { color: var(--text); }
        .stop.on .num { color: #8A6535; }

        /* spotlight card */
        .spot {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(24px, 4vw, 56px);
          background: linear-gradient(170deg, #FFF8F0, #FBE9DA);
          border-radius: 18px;
          padding: clamp(26px, 3.4vw, 44px);
          box-shadow: var(--shadow-float);
          align-items: center;
          min-height: 320px;
        }
        .spot-h {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 16px 0 0;
        }
        .spot-sub {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 14px 0 0;
          max-width: 460px;
        }
        .chips { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .chips-l { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); margin-right: 2px; }
        .chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #8A6535;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #E6D3BC;
          border-radius: 999px;
          padding: 4px 10px;
        }

        /* stage-change animation: copy slides in, log rows stagger */
        .spot-copy { animation: spotIn 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        @keyframes spotIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .spot-log {
          background: #14110C;
          border-radius: 14px;
          padding: 18px 20px 14px;
          box-shadow: var(--shadow-md);
          animation: spotIn 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) 0.06s both;
        }
        .log-person {
          display: flex;
          align-items: center;
          gap: 11px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .lp-av {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .lp-n { font-size: 14px; font-weight: 700; color: #fff; }
        .lp-r { font-size: 11.5px; color: rgba(255, 255, 255, 0.55); margin-top: 1px; }
        .lp-tag {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255, 255, 255, 0.45);
        }
        .log-row { display: flex; align-items: center; gap: 11px; padding: 13px 0; animation: rowIn 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .spot-copy, .spot-log, .log-row { animation: none; }
        }
        .log-row + .log-row { border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .log-check { flex: none; width: 16px; height: 16px; border-radius: 999px; background: var(--color-green); position: relative; }
        .log-check::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3.5px; height: 7px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .log-text { flex: 1; min-width: 0; font-size: 14px; color: rgba(255, 255, 255, 0.92); font-weight: 500; }
        .log-t { font-family: var(--font-mono); font-size: 10.5px; color: #8FC9A4; white-space: nowrap; }

        @media (max-width: 900px) {
          .rail { grid-template-columns: repeat(4, 1fr); row-gap: 18px; }
          .track { display: none; }
          .spot { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
