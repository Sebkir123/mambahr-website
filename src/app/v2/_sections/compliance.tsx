'use client'

export default function Compliance() {
  return (
    <section className="cm">
      <div className="wrap">
        <div className="card agent-edge agent-done agent-lg" data-reveal>
          <div className="msg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="av" src="/avatars/violet.jpg" alt="" width={42} height={42} loading="lazy" decoding="async" />
            <div className="m-body">
              <div className="m-who">Violet · California</div>
              <div className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</div>
            </div>
          </div>

          <div className="msg reply">
            <div className="m-logo" aria-hidden="true">M</div>
            <div className="m-body">
              <div className="m-who">MambaHR <span className="m-time">6 seconds later</span></div>
              <div className="a">
                12 weeks of FMLA bonding leave, job protected.
                <span className="a-sub">California CFRA and PDL cited and routed to you to confirm the stack.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="copy" data-reveal data-delay="1">
          <p className="eyebrow">Stay compliant</p>
          <h2 className="title">
            Right answer. <span className="em">Backed by law.</span>
          </h2>
          <p className="lead">
            Employment law changes almost every week. Every MambaHR answer carries the statute
            it relied on and a review date. A human signs off on the big calls.
          </p>
          <div className="trust">
            <span>Statute cited on every answer</span><i /><span>Ambiguous calls go to a person</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cm {
          background: var(--bg);
          padding-block: clamp(96px, 13vw, 168px);
        }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 88px);
          align-items: center;
        }
        .card {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(26px, 3vw, 38px);
          box-shadow: var(--shadow-float);
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .msg { display: flex; gap: 14px; align-items: flex-start; }
        .av { width: 42px; height: 42px; border-radius: 999px; object-fit: cover; flex: none; }
        .m-logo {
          flex: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #1A1A19;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 22px;
        }
        .m-body { min-width: 0; }
        .m-who {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
        }
        .m-time { text-transform: none; letter-spacing: 0; color: var(--color-green); margin-left: 6px; }
        .q {
          font-family: var(--font-serif);
          font-size: clamp(21px, 2.3vw, 27px);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-top: 8px;
        }
        .a {
          margin-top: 10px;
          background: linear-gradient(160deg, #FFF2E6, #FBE6D6);
          border: 1px solid #E6D3BC;
          border-radius: 4px 16px 16px 16px;
          padding: 16px 18px;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .a-sub {
          display: block;
          margin-top: 6px;
          font-size: 13.5px;
          font-weight: 400;
          color: var(--text-muted);
        }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8A6535;
          margin: 0 0 18px;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(26px, 2.8vw, 37px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text);
          margin: 0;
        }
        .em {
          background: linear-gradient(100deg, #B98A4E, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
        }
        .lead {
          font-size: clamp(17px, 2vw, 19px);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 22px 0 0;
          max-width: 440px;
        }
        .trust {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          font-size: 13.5px;
          color: var(--text-muted);
        }
        .trust i { width: 4px; height: 4px; border-radius: 999px; background: var(--border-mid); }
        @media (max-width: 880px) {
          .wrap { grid-template-columns: 1fr; }
          .card { order: 2; }
        }
      `}</style>
    </section>
  )
}
