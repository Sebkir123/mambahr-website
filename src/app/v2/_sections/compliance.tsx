'use client'

export default function Compliance() {
  return (
    <section className="cm">
      <div className="wrap">
        <div className="card agent-edge agent-done agent-lg" data-reveal>
          <span className="mamba-chip done mc-top"><span className="mc-i" aria-hidden="true" />Mamba · answered</span>
          <div className="q">
            Employee on FMLA also requests CA CFRA — stack or run sequential?
          </div>
          <div className="risk">Risk · $30K back leave + penalty</div>
          <div className="ans">
            <div className="ans-label">The agent&rsquo;s answer</div>
            <div className="ans-head">Approve up to 24 weeks combined.</div>
            <p className="ans-body">
              Eligible for both (14-month tenure, 1,400 hours). CA leave stacks on top of
              federal FMLA. Anything ambiguous routes to your legal team.
            </p>
          </div>
          <div className="cites">
            <span className="cl">Backed by</span>
            <span className="chip">FMLA</span>
            <span className="chip">CA CFRA</span>
            <span className="chip">DLSE 7-2024</span>
          </div>
        </div>

        <div className="copy" data-reveal data-delay="1">
          <p className="eyebrow">Stay compliant</p>
          <h2 className="title">
            Compliant, <span className="em">with the receipts.</span>
          </h2>
          <p className="lead">
            Federal employment law plus state-specific rules for all 50 states, kept current.
            Every decision comes with the statute attached. Anything ambiguous routes to your
            legal team.
          </p>
          <div className="kpis">
            <div><div className="kn"><span data-count="50">50</span></div><div className="kl">States + federal</div></div>
            <div><div className="kn"><span data-count="100">100</span>%</div><div className="kl">Cited to source</div></div>
            <div><div className="kn">1</div><div className="kl">Human on the calls that matter</div></div>
          </div>
          <div className="sec">
            {['SOC 2 Type II', 'Encrypted end to end', 'Role-based access', 'Full audit trail', 'US data residency', 'Never trained on your data'].map((s) => (
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
          padding: 28px;
          box-shadow: var(--shadow-float);
        }
        :global(.mc-top) { margin-bottom: 16px; }
        .q {
          font-family: var(--font-serif);
          font-size: 22px;
          line-height: 1.3;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .risk {
          display: inline-block;
          margin-top: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-red);
          background: rgba(220, 38, 38, 0.08);
          padding: 4px 10px;
          border-radius: 999px;
        }
        .ans {
          margin-top: 20px;
          padding: 18px;
          border-left: 3px solid #B98A4E;
          background: linear-gradient(160deg, #FFF2E6, #FBE6D6);
          border-radius: 0 14px 14px 0;
        }
        .ans-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #8A6535;
        }
        .ans-head {
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
          margin-top: 8px;
        }
        .ans-body {
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-muted);
          margin: 8px 0 0;
        }
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
          max-width: 460px;
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
          max-width: 120px;
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
