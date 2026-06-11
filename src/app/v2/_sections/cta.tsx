'use client'

export default function Cta() {
  return (
    <section className="cta" id="access">
      <div className="panel" data-reveal>
        <span className="v2-grain" />
        <p className="eyebrow">Request access</p>
        <h2 className="title">
          Hire the agent. <span className="em">Promote the human.</span>
        </h2>
        <p className="sub">
          A live demo in 30 minutes. Live the next morning.
        </p>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input className="input" type="email" placeholder="you@company.com" aria-label="Work email" />
          <button className="btn" type="submit">Request access</button>
        </form>
      </div>

      <style jsx>{`
        .cta {
          padding: clamp(40px, 6vw, 72px) var(--page-pad) clamp(72px, 9vw, 110px);
          background: var(--bg);
        }
        .panel {
          max-width: var(--page-max);
          margin: 0 auto;
          border-radius: 18px;
          padding: clamp(56px, 8vw, 100px) var(--page-pad);
          text-align: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(120% 140% at 50% -20%, #D4AA7C 0%, #B98A4E 46%, #6A5DA6 100%);
          background-size: 150% 150%;
          animation: ctaGlow 20s ease-in-out infinite;
        }
        @keyframes ctaGlow {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 60%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .panel { animation: none; }
        }
        .panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 60% at 50% 120%, rgba(255, 255, 255, 0.25), transparent 60%);
          pointer-events: none;
        }
        .eyebrow {
          position: relative;
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 18px;
        }
        .title {
          position: relative;
          font-family: var(--font-serif);
          font-weight: 400;
          color: #fff;
          font-size: clamp(32px, 4.4vw, 56px);
          line-height: 1;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .em { color: #ECD7B0; font-style: italic; }
        .sub {
          position: relative;
          color: rgba(255, 255, 255, 0.9);
          font-size: 17px;
          margin: 24px 0 0;
        }
        .form {
          position: relative;
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 34px;
          flex-wrap: wrap;
        }
        .input {
          background: rgba(255, 255, 255, 0.96);
          border: none;
          border-radius: 999px;
          padding: 15px 22px;
          font-size: 15px;
          width: min(320px, 100%);
          color: var(--text);
          outline: none;
        }
        .btn {
          background: #1A1A19;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          padding: 15px 28px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
