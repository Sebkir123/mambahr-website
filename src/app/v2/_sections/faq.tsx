'use client'

const QA = [
  {
    q: 'Do we replace our current HRIS, or run alongside it?',
    a: 'We replace it — MambaHR becomes your system of record for people, pay, time off, and compliance. We pull everything from Gusto, Workday, Rippling, BambooHR, Namely, or ADP, and most teams are fully moved in a single day. Nothing left behind.',
  },
  {
    q: 'How fast can we be up and running?',
    a: 'Live the next morning. Day one we import your people data and you set your approval rules on one screen. Your team keeps working in Slack and Teams the whole time — most employees never notice the switch, except that HR got faster.',
  },
  {
    q: 'Is our people data safe?',
    a: 'Yes. Encrypted in transit and at rest, role-based access, and a full audit trail on every change. Your data stays in the US, and we never train AI on it — that one is in your contract.',
  },
  {
    q: 'What happens if it gets something wrong?',
    a: 'The sensitive calls — offers above band, terminations, anything high-stakes — always come to you first. Everything else is logged, reversible, and shows the rule it followed. You can override anything, and nothing happens without a trail.',
  },
  {
    q: 'Are we still compliant, and who is liable?',
    a: 'You are always the employer — and MambaHR makes that easier, not riskier. Every answer cites the law behind it, federal and all 50 states, kept current. Anything ambiguous routes to a human before it happens.',
  },
  {
    q: 'Who is MambaHR built for?',
    a: 'Lean people teams at growing companies — two or three humans supporting hundreds of employees, buried in admin. If your HR team spends more time filing than talking to people, this was built for you.',
  },
]

export default function Faq() {
  return (
    <section className="faq">
      <div className="wrap">
        <div className="side" data-reveal>
          <p className="eyebrow">Before you ask</p>
          <h2 className="title">The questions every <span className="em">people leader has.</span></h2>
          <p className="lead">Straight answers. No sales-call required.</p>
          <div className="ask">
            <div className="ask-t">Still have one?</div>
            <p className="ask-b">Ask the founders directly — they answer fast.</p>
            <a className="ask-cta" href="mailto:hello@mambahr.com">hello@mambahr.com</a>
          </div>
        </div>

        <div className="list" data-reveal data-delay="1">
          {QA.map((item, i) => (
            <details key={item.q} className="item" open={i === 0}>
              <summary>
                <span className="q">{item.q}</span>
                <span className="ico" aria-hidden="true" />
              </summary>
              <p className="a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq { background: var(--bg-warm); padding-block: clamp(96px, 13vw, 168px); }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }
        .side { position: sticky; top: 110px; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3vw, 40px); line-height: 1.12; letter-spacing: -0.02em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: 16px; color: var(--text-muted); margin: 16px 0 0; }
        .ask {
          margin-top: 28px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .ask-t { font-size: 15px; font-weight: 700; color: var(--text); }
        .ask-b { font-size: 13.5px; color: var(--text-muted); margin: 6px 0 12px; }
        .ask-cta {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--gold-dark);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.22);
          border-radius: 999px;
          padding: 7px 14px;
        }
        .ask-cta:hover { border-color: var(--gold); }

        .list { display: flex; flex-direction: column; gap: 12px; }
        .item {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s ease;
        }
        .item:hover { box-shadow: var(--shadow-md); }
        .item[open] { border-color: rgba(138, 101, 53, 0.32); }
        summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
        }
        summary::-webkit-details-marker { display: none; }
        .q { font-size: clamp(15px, 1.7vw, 17px); font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
        .ico { position: relative; flex: none; width: 16px; height: 16px; }
        .ico::before, .ico::after {
          content: '';
          position: absolute;
          background: var(--gold-dark);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .ico::before { left: 0; top: 7px; width: 16px; height: 2px; }
        .ico::after { left: 7px; top: 0; width: 2px; height: 16px; }
        .item[open] .ico::after { transform: rotate(90deg); opacity: 0; }
        .a {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
          padding: 0 48px 20px 20px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ico::before, .ico::after { transition: none; }
        }
        @media (max-width: 860px) {
          .wrap { grid-template-columns: 1fr; }
          .side { position: static; }
        }
      `}</style>
    </section>
  )
}
