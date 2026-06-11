'use client'

const QA = [
  {
    q: 'Do we replace our current HRIS, or run alongside it?',
    a: 'We become your HRIS — your system of record for people, pay, time off, and compliance. We migrate your data from Gusto, Workday, Rippling, BambooHR, Namely, or ADP, and most teams are fully moved over in a single day.',
  },
  {
    q: 'How fast can we be up and running?',
    a: 'Most teams are live the next morning. We pull your people data and set your approval rules on day one. Nothing is left behind, and your team keeps working in Slack and Teams the whole time.',
  },
  {
    q: 'Is our people data safe?',
    a: 'Yes. SOC 2 Type II, encryption in transit and at rest, role-based access, and a full audit trail on every change. Your data stays in the US, and we never train AI on it — guaranteed in your contract.',
  },
  {
    q: 'What happens if it gets something wrong?',
    a: 'The sensitive calls — offers above band, terminations, anything high-stakes — always come to you first. Everything else is logged, reversible, and shows the rule it followed, so nothing happens without a trail.',
  },
  {
    q: 'Are we still compliant, and who is liable?',
    a: 'You are always the employer of record. MambaHR keeps you current with federal law and all 50 states, and every decision cites the regulation behind it. Anything ambiguous routes straight to your legal team.',
  },
  {
    q: 'Who is MambaHR built for?',
    a: 'Lean people teams at growing companies — the ones supporting hundreds of employees with two or three humans, buried in admin, who want their time back for real people work.',
  },
]

export default function Faq() {
  return (
    <section className="faq">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Before you ask</p>
          <h2 className="title">The questions every <span className="em">people leader has.</span></h2>
        </div>

        <div className="list" data-reveal data-delay="1">
          {QA.map((item) => (
            <details key={item.q} className="item">
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
        .faq { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: 860px; margin: 0 auto; padding: 0 var(--page-pad); }
        .head { margin-bottom: clamp(32px, 4vw, 48px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(34px, 4.4vw, 54px); line-height: 1.06; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }

        .list { border-top: 1px solid var(--border); }
        .item { border-bottom: 1px solid var(--border); }
        summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 22px 4px;
        }
        summary::-webkit-details-marker { display: none; }
        .q { font-size: clamp(16px, 1.9vw, 19px); font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
        .ico { position: relative; flex: none; width: 18px; height: 18px; }
        .ico::before, .ico::after {
          content: '';
          position: absolute;
          background: var(--gold-dark);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .ico::before { left: 0; top: 8px; width: 18px; height: 2px; }
        .ico::after { left: 8px; top: 0; width: 2px; height: 18px; }
        .item[open] .ico::after { transform: rotate(90deg); opacity: 0; }
        .a {
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
          padding: 0 60px 24px 4px;
          max-width: 660px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ico::before, .ico::after { transition: none; }
        }
      `}</style>
    </section>
  )
}
