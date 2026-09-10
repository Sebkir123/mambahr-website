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
import { FoundersProof } from '@/components/v2/page-kit'

export default function Hero() {
  return (
    <section className="hero">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <span className="v2-grain" />
      <div className="top">
        <span className="eyebrow" data-reveal="eager">The AI HR department</span>
        <h1 className="title" data-reveal="eager">HR that runs itself.</h1>
        <p className="sub" data-reveal="eager">
          MambaHR does the HR admin for you: onboarding, time off and leave, payroll changes,
          and compliance with the law cited. You make the judgment calls. Most teams are live
          within a day of importing.
        </p>
        <div className="ctas" data-reveal="eager">
          <a href="/demo" className="btn btn-primary">Book a demo</a>
        </div>
        <div data-reveal="eager">
          <FoundersProof />
        </div>
        <div className="trust" data-reveal="eager">
          <span>Works 24/7</span><i />
          <span>Your data imports in a day</span><i />
          <span>Built by HR operators</span>
        </div>
      </div>

      <div className="stage stage-load">
        <div className="app agent-edge agent-working">
          <div className="app-bar">
            <span className="dots"><b /><b /><b /></span>
            <span className="addr">app.mambahr.com</span>
          </div>
          <AppFrame active="todo" org="Acme" user="AR" height={520} minimal>
            <TodoDesk simple summary="3 need you today" queue={HERO_QUEUE} focus={HERO_FOCUS} />
          </AppFrame>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: clamp(116px, 13vw, 168px) var(--page-pad) 0;
          background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%);
        }
        .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(54% 48% at 50% 36%, rgba(254, 253, 250, 0.84), rgba(254, 253, 250, 0) 72%);
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          will-change: transform;
        }
        .b1 {
          width: 760px; height: 760px;
          background: radial-gradient(circle, rgba(196, 154, 108, 0.62), rgba(196, 154, 108, 0) 68%);
          top: -200px; left: -120px;
          animation: auroraA 24s ease-in-out infinite alternate;
        }
        .b2 {
          width: 680px; height: 680px;
          background: radial-gradient(circle, rgba(106, 93, 166, 0.5), rgba(106, 93, 166, 0) 68%);
          top: -160px; right: -120px;
          animation: auroraB 28s ease-in-out infinite alternate;
        }
        .b3 {
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(138, 101, 53, 0.42), rgba(138, 101, 53, 0) 70%);
          bottom: -260px; left: 42%;
          animation: auroraC 22s ease-in-out infinite alternate;
        }
        @keyframes auroraA {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(140px, 90px) scale(1.18); }
        }
        @keyframes auroraB {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-120px, 70px) scale(1.12); }
        }
        @keyframes auroraC {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-90px, -70px) scale(1.22); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
        .top { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(50px, 7.4vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.035em;
          color: var(--text);
          margin: 20px 0 0;
        }
        .sub {
          font-size: clamp(18px, 2.1vw, 21px);
          line-height: 1.55;
          color: var(--text-muted);
          max-width: 600px;
          margin: 24px auto 0;
        }
        .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 34px; flex-wrap: wrap; }
        .trust {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          margin-top: 16px;
          color: var(--text-muted);
          font-size: 14px;
          flex-wrap: wrap;
        }
        .trust i { width: 4px; height: 4px; border-radius: 999px; background: var(--border-mid); }

        /* ---- the app window ---- */
        .stage-load {
          animation: stageIn 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) 0.32s both;
        }
        @keyframes stageIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .stage-load { animation: none; }
        }
        .stage {
          position: relative;
          max-width: 1180px;
          margin: clamp(56px, 7vw, 88px) auto 0;
          perspective: 1800px;
        }
        .app {
          border-radius: 14px;
          background: var(--bg-warm);
          border: 1px solid var(--border);
          box-shadow: 0 4px 10px rgba(20, 18, 14, 0.06), 0 30px 60px rgba(20, 18, 14, 0.18),
            0 60px 120px rgba(20, 18, 14, 0.16);
          overflow: hidden;
          transform: rotateX(2.2deg);
          transform-origin: top center;
        }
        .app-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          height: 42px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 10px; height: 10px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr {
          margin: 0 auto;
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 3px 16px;
        }

        @media (max-width: 720px) {
          .stage { perspective: none; }
          .app { transform: none; border-radius: 16px; }
        }
      `}</style>
    </section>
  )
}
