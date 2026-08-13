'use client'

// ── v2 page kit ───────────────────────────────────────────────────────────
// Shared primitives for the function pages (/hiring, /leave, /payroll, …)
// so every page matches the v2 landing bar: Fraunces + gold→violet system,
// real-UI fragments, real people, mamba chips, scroll reveals, ONE-line
// headlines. Pages compose: <PageHero> → <AgentLoop> → feature splits →
// <StatTrio> → <QuoteBand> → <PageCta>. Global classes used: agent-edge/
// agent-working/agent-done/agent-lg, mamba-chip, v2-grain (from globals.css).
//
// NOTE: button classes use :global(), styled-jsx does NOT scope classNames
// passed to <Link/> components, only native elements in the same file.

import { type ReactNode } from 'react'
import Link from 'next/link'

/* Gradient italic accent for headlines. */
export function Em({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: 'linear-gradient(100deg, #B98A4E, #6A5DA6)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        fontStyle: 'italic',
      }}
    >
      {children}
    </span>
  )
}

const FACES = ['priya', 'anna', 'maya', 'dave', 'brian']

/* ── Page hero: centered copy (one-line title) + fragment stage below,
      aurora blobs + grain + face cluster + optional human photo card ── */
export function PageHero({
  eyebrow,
  title,
  lead,
  proof = 'Built for lean HR teams',
  photo,
  photoChip,
  photoCaption,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead: string
  proof?: string
  /** Local people photo (e.g. /v2-people/team.jpg) shown as a tilted card overlapping the stage. */
  photo?: string
  /** MambaHR-chip text on the photo card, e.g. 'MambaHR · done'. */
  photoChip?: string
  /** Small caption under the chip, e.g. 'Offer signed · starts June 22'. */
  photoCaption?: string
  children: ReactNode
}) {
  return (
    <section className="ph">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
      </div>
      <span className="v2-grain" />
      <div className="top">
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h1 className="title" data-reveal data-delay="1">{title}</h1>
        <p className="lead" data-reveal data-delay="2">{lead}</p>
        <div className="ctas" data-reveal data-delay="3">
          <Link href="/demo" className="btn-p">Book a demo</Link>
          <Link href="/product" className="btn-g">See it run</Link>
        </div>
        <div className="proof" data-reveal data-delay="3">
          <div className="faces">
            {FACES.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p} src={`/avatars/${p}.jpg`} alt="" width={34} height={34} loading="lazy" decoding="async" />
            ))}
          </div>
          <span className="proof-t">{proof}</span>
        </div>
      </div>
      <div className="stage" data-reveal data-delay="4">
        <div className={`duo${photo ? ' has-photo' : ''}`}>
          <div className="frag">{children}</div>
          {photo && (
            <figure className="person">
              <div className="p-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="" />
                <span className="p-scrim" aria-hidden="true" />
                {photoCaption && <span className="p-name">{photoCaption}</span>}
              </div>
              {photoChip && (
                <figcaption className="p-foot">
                  <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />{photoChip}</span>
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
      <style jsx>{`
        .ph {
          position: relative;
          overflow: hidden;
          padding: clamp(124px, 14vw, 172px) var(--page-pad) clamp(72px, 9vw, 108px);
          background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%);
        }
        .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%);
        }
        .blob { position: absolute; border-radius: 50%; filter: blur(72px); will-change: transform; }
        .b1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%);
          top: -220px; left: -140px;
          animation: phA 24s ease-in-out infinite alternate;
        }
        .b2 {
          width: 640px; height: 640px;
          background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%);
          top: -170px; right: -130px;
          animation: phB 28s ease-in-out infinite alternate;
        }
        @keyframes phA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
        @keyframes phB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
        @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
        .top { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
          margin: 0;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(42px, 5.8vw, 76px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 18px 0 0;
          /* Short headlines still land on one line; long ones (the SEO category
             pages) wrap into balanced lines instead of running off the page. */
          text-wrap: balance;
        }
        .lead {
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.55;
          color: var(--text-muted);
          max-width: 600px;
          margin: 22px auto 0;
        }
        .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
        :global(.btn-p) {
          display: inline-block;
          background: #1A1A19;
          color: #fff;
          font-weight: 600;
          font-size: 15.5px;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 12px 26px rgba(20, 18, 14, 0.22);
          transition: transform 0.15s ease;
        }
        :global(.btn-p:hover) { transform: translateY(-2px); }
        :global(.btn-g) {
          display: inline-block;
          color: var(--text);
          font-weight: 600;
          font-size: 15.5px;
          padding: 14px 24px;
          border-radius: 999px;
          border: 1px solid var(--border-mid);
          background: rgba(255, 255, 255, 0.6);
          text-decoration: none;
        }
        :global(.btn-g:hover) { background: #fff; }
        @media (prefers-reduced-motion: reduce) { :global(.btn-p:hover) { transform: none; } }
        .proof { display: flex; align-items: center; gap: 13px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }
        .faces { display: flex; }
        .faces img {
          width: 34px; height: 34px; border-radius: 999px; object-fit: cover;
          border: 2px solid #fff; box-shadow: var(--shadow-sm);
          margin-left: -9px; background: var(--bg-elevated);
        }
        .faces img:first-child { margin-left: 0; }
        .proof-t { font-size: 14px; font-weight: 600; color: var(--text); }

        .stage {
          position: relative;
          max-width: 1020px;
          margin: clamp(48px, 6vw, 72px) auto 0;
        }
        .duo { display: grid; grid-template-columns: 1fr; gap: 20px; align-items: stretch; }
        .duo.has-photo { grid-template-columns: 1fr clamp(220px, 25vw, 282px); }
        .frag { position: relative; min-width: 0; }
        .person {
          margin: 0;
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-float);
        }
        .p-img { position: relative; flex: 1; min-height: 260px; }
        .p-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .p-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(20, 17, 12, 0) 52%, rgba(20, 17, 12, 0.62) 100%);
        }
        .p-name {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          color: #fff;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 8px rgba(20, 17, 12, 0.4);
        }
        .p-foot {
          display: flex;
          align-items: center;
          padding: 12px 14px;
          background: var(--bg);
          border-top: 1px solid var(--border-faint);
        }
        @media (max-width: 880px) {
          .duo.has-photo { grid-template-columns: 1fr; }
          .p-img { min-height: 220px; }
        }
      `}</style>
    </section>
  )
}

/* ── The agent loop: who-does-what, premium rows with people ── */
export type LoopStep = {
  n: string
  label: string
  desc: string
  who: 'agent' | 'you'
  time?: string
  /** Optional avatar (e.g. /avatars/maya.jpg) to put a face on the step. */
  img?: string
}

export function AgentLoop({
  eyebrow,
  title,
  lead,
  steps,
}: {
  eyebrow: string
  title: ReactNode
  lead?: string
  steps: LoopStep[]
}) {
  return (
    <section className="al">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="title">{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="card agent-edge agent-working agent-lg" data-reveal data-delay="1">
          <div className="card-top">
            <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
            <span className="card-top-t">Live run · today</span>
          </div>
          {steps.map((s) => (
            <div key={s.n} className={`row${s.who === 'you' ? ' yours' : ''}`}>
              <span className="num">{s.n}</span>
              {s.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="rowav" src={s.img} alt="" width={26} height={26} loading="lazy" decoding="async" />
              ) : (
                <span className={`mark${s.who === 'you' ? ' gold' : ''}`} aria-hidden="true" />
              )}
              <div className="main">
                <div className="lbl">{s.label}</div>
                <div className="desc">{s.desc}</div>
              </div>
              {s.time && <span className="time">{s.time}</span>}
              <span className={`who${s.who === 'you' ? ' you' : ''}`}>
                {s.who === 'you' ? 'You decide' : 'MambaHR handles'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .al { background: var(--bg); padding-block: clamp(88px, 11vw, 144px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { margin-bottom: clamp(36px, 4vw, 52px); text-align: center; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .lead { font-size: clamp(16px, 1.9vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 620px; }
        .card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 0 0 8px;
          box-shadow: var(--shadow-float);
          max-width: 920px;
          margin: 0 auto;
          overflow: hidden;
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px clamp(18px, 2.4vw, 28px);
          background: linear-gradient(90deg, #FBF7EE, #F4F1F9);
          border-bottom: 1px solid var(--border-faint);
        }
        .card-top-t { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
        .row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px clamp(18px, 2.4vw, 28px);
        }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .row.yours { background: linear-gradient(90deg, #FFF6EC, rgba(255, 246, 236, 0)); }
        .num { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); width: 22px; flex: none; }
        .rowav { flex: none; width: 26px; height: 26px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); }
        .mark { flex: none; width: 18px; height: 18px; border-radius: 999px; background: var(--color-green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 6px; top: 3.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .mark.gold { background: linear-gradient(135deg, #D4AA7C, #8A6535); }
        .main { flex: 1; min-width: 0; }
        .lbl { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .desc { font-size: 13.5px; color: var(--text-muted); margin-top: 2px; line-height: 1.45; }
        .time { flex: none; font-family: var(--font-mono); font-size: 11px; color: var(--color-green); white-space: nowrap; }
        .who {
          flex: none;
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6A5DA6;
          background: rgba(106, 93, 166, 0.1);
          border-radius: 999px;
          padding: 4px 10px;
          white-space: nowrap;
        }
        .who.you { color: #8A6535; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.25); }
        @media (max-width: 640px) {
          .time { display: none; }
          .row { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  )
}

/* ── Split feature: copy + visual (alternate with `flip`) ── */
export function FeatureSplit({
  eyebrow,
  title,
  lead,
  bullets,
  flip = false,
  warm = false,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead: string
  bullets?: string[]
  flip?: boolean
  warm?: boolean
  children: ReactNode
}) {
  return (
    <section className={`fs${warm ? ' warm' : ''}`}>
      <div className={`wrap${flip ? ' flip' : ''}`}>
        <div className="copy" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="title">{title}</h2>
          <p className="lead">{lead}</p>
          {bullets && (
            <ul className="points">
              {bullets.map((b) => (
                <li key={b}><span className="tick" aria-hidden="true" />{b}</li>
              ))}
            </ul>
          )}
          <Link href="/demo" className="more">See it on a live demo →</Link>
        </div>
        <div className="stage" data-reveal data-delay="1">{children}</div>
      </div>
      <style jsx>{`
        .fs { background: var(--bg); padding-block: clamp(88px, 11vw, 144px); }
        .fs.warm { background: var(--bg-warm); }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: clamp(36px, 5vw, 80px);
          align-items: center;
        }
        .wrap.flip { grid-template-columns: 1.05fr 0.95fr; }
        .wrap.flip .copy { order: 2; }
        .wrap.flip .stage { order: 1; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(27px, 3vw, 38px); line-height: 1.08; letter-spacing: -0.02em; color: var(--text); margin: 0; }
        .lead { font-size: clamp(16px, 1.9vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 18px 0 0; max-width: 460px; }
        .points { list-style: none; padding: 0; margin: 22px 0 0; display: flex; flex-direction: column; gap: 12px; }
        .points li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; line-height: 1.5; color: var(--text-muted); }
        .tick { flex: none; width: 17px; height: 17px; margin-top: 2px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3px; height: 7px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        :global(.fs .more) {
          display: inline-block;
          margin-top: 24px;
          font-size: 14.5px;
          font-weight: 700;
          color: var(--gold-dark);
          text-decoration: none;
        }
        :global(.fs .more:hover) { text-decoration: underline; }
        @media (max-width: 880px) {
          .wrap, .wrap.flip { grid-template-columns: 1fr; }
          .wrap.flip .copy { order: 1; }
          .wrap.flip .stage { order: 2; }
        }
      `}</style>
    </section>
  )
}

/* ── Stat trio: tinted gradient cards with count-ups ── */
export function StatTrio({
  stats,
  note = 'Modeled from the workflows MambaHR runs, not measured customer averages.',
}: {
  stats: { n: number; prefix?: string; suffix?: string; label: string }[]
  /** Provenance line under the stats. Pass null only if the stats are cited in-place. */
  note?: string | null
}) {
  const tones = ['warm', 'vio', 'goldt']
  return (
    <section className="st3">
      <div className="wrap" data-reveal>
        {stats.map((s, i) => (
          <div key={s.label} className={`stat ${tones[i % 3]}`}>
            <div className="num">{s.prefix}<span data-count={String(s.n)}>{s.n.toLocaleString('en-US')}</span>{s.suffix}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
      {note && <p className="note">{note}</p>}
      <style jsx>{`
        .note {
          max-width: var(--page-max);
          margin: 18px auto 0;
          padding: 0 var(--page-pad);
          font-size: 12px;
          line-height: 1.5;
          color: var(--text-faint);
          text-align: center;
        }
        .st3 { background: var(--bg); padding-block: clamp(48px, 6vw, 80px); }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 1.8vw, 22px);
        }
        .stat {
          border-radius: 16px;
          padding: clamp(24px, 3vw, 36px) clamp(20px, 2.4vw, 30px);
          border: 1px solid var(--border-faint);
          box-shadow: var(--shadow-sm);
        }
        .stat.warm { background: linear-gradient(165deg, #FFF6EC, #FBE9DA); border-color: #EFD9C2; }
        .stat.vio { background: linear-gradient(165deg, #F4F2FA, #ECE8F6); border-color: #DDD7EC; }
        .stat.goldt { background: linear-gradient(165deg, #FAF5EA, #F2EADA); border-color: #E6D9C0; }
        .num {
          font-family: var(--font-serif);
          font-size: clamp(38px, 4.2vw, 56px);
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(110deg, #8A6535, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .lbl { font-size: 13.5px; color: var(--text-muted); margin-top: 12px; line-height: 1.45; font-weight: 500; }
        @media (max-width: 640px) { .wrap { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ── Scenario band: designed card, big photo left, scenario right ──
   MambaHR is pre-launch. These are written illustrations of the workflow, NOT
   customer testimonials, so they carry an explicit "Illustrative" label and no
   personal name. Do not reintroduce named quotes until there are real customers
   who have agreed to be quoted. */
export function QuoteBand({
  quote,
  role,
  img,
  metric,
}: {
  quote: string
  /** Role archetype the scenario is written from, e.g. "Head of People · Robotics startup, 240 people". */
  role: string
  img: string
  metric?: string
}) {
  return (
    <section className="qb">
      <div className="card agent-edge agent-done" data-reveal>
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" loading="lazy" decoding="async" />
          {metric && <span className="badge">{metric}</span>}
        </div>
        <div className="body">
          <span className="tag">Illustrative scenario</span>
          <span className="qmark" aria-hidden="true">&ldquo;</span>
          <blockquote className="q">{quote}</blockquote>
          <div className="who"><span>{role}</span></div>
        </div>
      </div>
      <style jsx>{`
        .qb { background: var(--bg-warm); padding: clamp(72px, 9vw, 120px) var(--page-pad); }
        .card {
          max-width: 920px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-float);
        }
        .photo { position: relative; min-height: 280px; }
        .photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .badge {
          position: absolute;
          left: 14px;
          bottom: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #fff;
          background: linear-gradient(120deg, #B98A4E, #6A5DA6);
          border-radius: 999px;
          padding: 6px 13px;
          box-shadow: 0 8px 18px rgba(20, 18, 14, 0.25);
        }
        .body { position: relative; padding: clamp(30px, 4vw, 48px) clamp(28px, 4vw, 52px); }
        .qmark {
          position: absolute;
          top: 6px;
          left: clamp(20px, 3vw, 38px);
          font-family: var(--font-serif);
          font-size: 110px;
          line-height: 1;
          background: linear-gradient(120deg, #B98A4E, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: 0.3;
          pointer-events: none;
        }
        .q {
          font-family: var(--font-serif);
          font-size: clamp(19px, 2.2vw, 25px);
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: var(--text);
          margin: 0;
          position: relative;
        }
        .who { margin-top: 22px; font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 2px; }
        .tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-faint);
          border: 1px solid var(--border-faint);
          border-radius: 999px;
          padding: 3px 10px;
          margin-bottom: 16px;
        }
        @media (max-width: 720px) {
          .card { grid-template-columns: 1fr; }
          .photo { min-height: 220px; }
        }
      `}</style>
    </section>
  )
}

/* ── Page CTA: gradient panel with grain, faces, real buttons ── */
export function PageCta({
  title,
  sub = 'A live demo in 30 minutes. Live the next morning.',
}: {
  title: ReactNode
  sub?: string
}) {
  return (
    <section className="pc">
      <div className="panel" data-reveal>
        <span className="v2-grain" />
        <h2 className="t">{title}</h2>
        <p className="s">{sub}</p>
        <div className="btns">
          <Link href="/demo" className="b">Book a demo</Link>
          <Link href="/product" className="b2">See it run</Link>
        </div>
        <div className="proofline">
          <div className="faces" aria-hidden="true">
            {FACES.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p} src={`/avatars/${p}.jpg`} alt="" width={30} height={30} loading="lazy" decoding="async" />
            ))}
          </div>
          <p className="trust">No setup project · Your data imported in a day · You approve the big calls</p>
        </div>
      </div>
      <style jsx>{`
        .pc { padding: clamp(32px, 5vw, 64px) var(--page-pad) clamp(72px, 9vw, 104px); background: var(--bg); }
        .panel {
          position: relative;
          overflow: hidden;
          max-width: var(--page-max);
          margin: 0 auto;
          border-radius: 18px;
          padding: clamp(52px, 7vw, 88px) var(--page-pad);
          text-align: center;
          background:
            radial-gradient(90% 80% at 18% 0%, rgba(244, 200, 138, 0.85), transparent 58%),
            radial-gradient(85% 75% at 88% 100%, rgba(94, 80, 158, 0.9), transparent 62%),
            linear-gradient(160deg, #C99655 0%, #B07A78 48%, #7A6AB0 100%);
        }
        .t {
          position: relative;
          font-family: var(--font-serif);
          font-weight: 400;
          color: #fff;
          font-size: clamp(30px, 4vw, 50px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0;
          text-shadow: 0 2px 18px rgba(20, 18, 14, 0.18);
        }
        /* The shared <Em> gradient is unreadable on the gradient panel, force white. */
        .t :global(span) {
          background: none !important;
          color: #fff !important;
          -webkit-text-fill-color: #fff;
        }
        .s { position: relative; color: rgba(255, 255, 255, 0.92); font-size: 16.5px; margin: 16px 0 28px; }
        .btns { position: relative; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        :global(.pc .b) {
          display: inline-block;
          background: #1A1A19;
          color: #fff;
          font-weight: 600;
          font-size: 15.5px;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.28);
          transition: transform 0.15s ease;
        }
        :global(.pc .b:hover) { transform: translateY(-2px); }
        :global(.pc .b2) {
          display: inline-block;
          background: rgba(255, 255, 255, 0.92);
          color: #1A1A19;
          font-weight: 600;
          font-size: 15.5px;
          padding: 14px 24px;
          border-radius: 999px;
          text-decoration: none;
        }
        :global(.pc .b2:hover) { background: #fff; }
        @media (prefers-reduced-motion: reduce) { :global(.pc .b:hover) { transform: none; } }
        .proofline { position: relative; display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 26px; flex-wrap: wrap; }
        .faces { display: flex; }
        .faces img {
          width: 30px; height: 30px; border-radius: 999px; object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.85);
          margin-left: -9px;
          box-shadow: 0 6px 14px rgba(20, 18, 14, 0.25);
          background: var(--bg-elevated);
        }
        .faces img:first-child { margin-left: 0; }
        .trust { color: rgba(255, 255, 255, 0.82); font-size: 13px; margin: 0; }
      `}</style>
    </section>
  )
}
