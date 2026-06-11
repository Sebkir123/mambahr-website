'use client'

export default function Compliance() {
  return (
    <section className="cm">
      <div className="wrap">
        <div className="card agent-edge agent-done agent-lg" data-reveal>
          <div className="who">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="who-av" src="/avatars/violet.jpg" alt="" width={40} height={40} />
            <div>
              <div className="who-n">Violet Hayes</div>
              <div className="who-r">Product Manager · California</div>
            </div>
            <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Mamba · answered</span>
          </div>

          <div className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</div>

          <div className="ans">
            <div className="ans-head">Up to 24 weeks, job protected.</div>
            <p className="ans-body">
              Answered in seconds — calendar blocked, paperwork filed, nothing for you to chase.
            </p>
          </div>

          <div className="cites">
            <span className="cl">The law behind it</span>
            <span className="chip">FMLA</span>
            <span className="chip">CA CFRA</span>
          </div>
        </div>

        <div className="copy" data-reveal data-delay="1">
          <p className="eyebrow">Stay compliant</p>
          <h2 className="title">
            The right answer, <span className="em">with the law attached.</span>
          </h2>
          <p className="lead">
            Employment law changes almost every week. Mamba keeps up, shows the law behind every
            answer, and sends the risky calls to a human first.
          </p>
          <div className="kpis">
            <div><div className="kn"><span data-count="50">50</span></div><div className="kl">states, kept current</div></div>
            <div><div className="kn"><span data-count="100">100</span>%</div><div className="kl">of answers cite the law</div></div>
            <div><div className="kn">1</div><div className="kl">human on the big calls</div></div>
          </div>
          <div className="sec">
            {['Encrypted end to end', 'Your data stays in the US', 'Never trained on your data'].map((s) => (
              <span key={s} className="sec-b"><span className="sec-i" aria-hidden="true" />{s}</span>
            ))}
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
          padding: 26px;
          box-shadow: var(--shadow-float);
        }
        .who {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-faint);
        }
        .who-av { width: 40px; height: 40px; border-radius: 999px; object-fit: cover; }
        .who-n { font-size: 14.5px; font-weight: 700; color: var(--text); }
        .who-r { font-size: 12px; color: var(--text-faint); margin-top: 1px; }
        .who :global(.mamba-chip) { margin-left: auto; }
        .q {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2.2vw, 25px);
          line-height: 1.3;
          color: var(--text);
          letter-spacing: -0.01em;
          margin: 18px 0;
        }
        .ans {
          padding: 18px;
          border-left: 3px solid #B98A4E;
          background: linear-gradient(160deg, #FFF2E6, #FBE6D6);
          border-radius: 0 14px 14px 0;
        }
        .ans-head {
          font-size: 17.5px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .ans-body {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 8px 0 0;
        }
        .done-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 13px;
          padding-top: 13px;
          border-top: 1px solid rgba(138, 101, 53, 0.16);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-green);
          font-weight: 600;
        }
        .d-check { flex: none; width: 15px; height: 15px; border-radius: 999px; background: var(--color-green); position: relative; }
        .d-check::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 6px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .cites {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }
        .cl {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
        }
        .chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 4px 9px;
          border-radius: 999px;
        }
        .risk {
          margin-top: 16px;
          font-size: 12.5px;
          font-style: italic;
          font-family: var(--font-serif);
          color: #A8552F;
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
          font-size: clamp(36px, 4.6vw, 56px);
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
          max-width: 480px;
        }
        .kpis {
          display: flex;
          gap: 32px;
          margin-top: 32px;
        }
        .kn {
          font-family: var(--font-serif);
          font-size: 40px;
          line-height: 1;
          color: var(--text);
        }
        .kl {
          font-size: 12.5px;
          color: var(--text-faint);
          margin-top: 8px;
          max-width: 130px;
          line-height: 1.4;
        }
        .sec {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 30px;
          padding-top: 26px;
          border-top: 1px solid var(--border);
        }
        .sec-b {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          color: var(--text-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 6px 12px 6px 10px;
        }
        .sec-i {
          flex: none;
          width: 15px;
          height: 15px;
          border-radius: 999px;
          background: var(--color-green);
          position: relative;
        }
        .sec-i::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 3px;
          width: 3px;
          height: 6px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        @media (max-width: 880px) {
          .wrap { grid-template-columns: 1fr; }
          .card { order: 2; }
        }
      `}</style>
    </section>
  )
}
