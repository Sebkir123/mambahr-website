'use client'

const SOURCES = ['Onboarding', 'Time off', 'Approvals', 'Payroll changes', 'Employee questions']

const DAY_ONE = [
  { t: 'Offer signed', when: 'Thu', done: true },
  { t: 'Form I-9 sent to Maya', when: 'Thu', done: true },
  { t: 'Okta, Slack and Google requested', when: 'Thu', done: true },
  { t: 'Laptop request sent to IT', when: 'Fri', done: true },
  { t: 'Pick her first-week buddy', when: 'Your call', done: false },
]

/* What the team gets back: three matching light cards. The hours, a new hire
   ready before day one, and an answer with the law behind it. */
export default function Outcomes() {
  return (
    <section className="oc" id="outcomes">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">What you get back</p>
          <h2 className="title">Give your HR team <span className="em">their week back.</span></h2>
          <p className="lead">
            By our estimate, MambaHR takes about 27 hours of admin a week off a small HR team.
            That time goes back to your people.
          </p>
        </div>

        <div className="grid">
          <article className="card hours" data-reveal data-delay="1">
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /></span>
            <div className="top">
              <span className="lbl">Hours back, every week</span>
              <div className="big">27<span>hrs</span></div>
              <p className="cap">of admin taken off a small HR team, by our estimate.</p>
            </div>
            <div className="glass">
              <span className="g-l">Where the time comes from</span>
              <div className="pills">
                {SOURCES.map((s) => <span key={s} className="pill">{s}</span>)}
              </div>
            </div>
          </article>

          <article className="card" data-reveal data-delay="2">
            <div className="top">
              <span className="lbl">A new hire, ready before day one</span>
              <p className="cap">Your part takes about 4 minutes. By hand it is closer to half a day.</p>
            </div>
            <ul className="list">
              {DAY_ONE.map((d) => (
                <li key={d.t} className={d.done ? '' : 'open'}>
                  <span className={d.done ? 'tick' : 'ring'} aria-hidden="true" />
                  <span className="li-t">{d.t}</span>
                  <span className="li-w">{d.when}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card" data-reveal data-delay="3">
            <div className="top">
              <span className="lbl">Clear answers, with the law cited</span>
              <p className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</p>
            </div>
            {/* The app's answer shape: the mark, the answer in one line, the
                sources as "Based on" chips. */}
            <div className="ans">
              <span className="a-who"><span className="agent-mark a-mark" aria-hidden="true" />MambaHR <em>6 seconds later</em></span>
              <p className="a-t">Up to 12 weeks of job-protected federal family leave (FMLA) for bonding, once eligibility is confirmed.</p>
              <p className="a-s">California has its own leave rules too. I have asked HR to confirm how they combine.</p>
              <div className="ui-sources cites"><b>Based on</b><span>29 U.S.C. § 2612</span><span>Cal. Gov. Code § 12945.2</span></div>
            </div>
          </article>
        </div>

        <p className="foot">Hours are our estimate of how long these tasks take a small HR team today.</p>
      </div>

      <style jsx>{`
        .oc { background: var(--bg); padding-block: clamp(80px, 10vw, 128px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
          margin: 0 0 16px;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(34px, 4.6vw, 58px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0;
          text-wrap: balance;
        }
        .em { font-style: italic; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .lead { font-size: 18px; line-height: 1.6; color: var(--text-muted); max-width: 56ch; margin: 20px 0 0; }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: clamp(40px, 5vw, 56px);
          align-items: stretch;
        }
        .card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
          padding: 28px;
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          box-shadow: var(--shadow-md);
        }
        .top { display: grid; gap: 10px; }
        .lbl { font-size: 15px; font-weight: 600; color: var(--text); }
        .cap { margin: 0; font-size: 15px; line-height: 1.55; color: var(--text-muted); }

        /* card 1: the luminous field */
        .hours { background: linear-gradient(155deg, #f4d6b0 0%, #eec2c4 45%, #d6c9f0 100%); }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(50px); }
        .f1 { width: 80%; height: 70%; left: -20%; top: -30%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 70%; height: 70%; right: -20%; bottom: -30%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }
        .big {
          font-family: var(--font-serif);
          font-size: clamp(72px, 8vw, 104px);
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: var(--text);
          margin-top: 6px;
        }
        .big span { font-size: 0.26em; letter-spacing: 0; margin-left: 8px; color: var(--text-muted); }
        .hours .cap { color: #4a4540; }
        .glass {
          display: grid;
          gap: 10px;
          padding: 14px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.55);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        .g-l { font-size: 12.5px; font-weight: 600; color: #4f4b45; }
        .pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .pill { font-size: 13px; padding: 5px 10px; border-radius: 999px; background: rgba(255, 255, 255, 0.85); color: var(--text); border: 1px solid rgba(26, 26, 25, 0.06); }

        /* card 2: the day-one checklist */
        .list { list-style: none; margin: 0; padding: 6px 16px; border-radius: var(--radius-md); background: var(--bg-surface); }
        .list li { display: grid; grid-template-columns: 20px 1fr auto; gap: 10px; align-items: center; padding: 10px 0; font-size: 14px; color: var(--text); }
        .list li + li { border-top: 1px solid var(--border-faint); }
        .tick { width: 20px; height: 20px; border-radius: 50%; background: var(--color-green); position: relative; }
        .tick::after { content: ''; position: absolute; left: 7px; top: 3.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .ring { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--gold); background: #fff; }
        .li-w { font-size: 12.5px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
        .open .li-t { font-weight: 600; }
        .open .li-w { color: var(--gold); font-weight: 600; }

        /* card 3: the cited answer */
        .q { margin: 4px 0 0; font-family: var(--font-serif); font-size: 21px; line-height: 1.3; color: var(--text); }
        .ans { display: grid; gap: 8px; padding: 16px; border-radius: var(--radius-md); background: var(--bg-surface); }
        .a-who { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; color: var(--text); }
        .a-mark { --am-size: 22px; }
        .a-who em { font-style: normal; font-weight: 400; color: var(--text-faint); }
        .a-t { margin: 0; font-size: 15px; font-weight: 600; line-height: 1.45; color: var(--text); }
        .a-s { margin: 0; font-size: 13.5px; line-height: 1.5; color: var(--text-muted); }
        .cites { margin-top: 2px; }
        .cites span { background: var(--bg-card); box-shadow: inset 0 0 0 1px var(--border-faint); }

        .foot { margin: 22px 0 0; font-size: 13px; color: var(--text-faint); }

        @media (max-width: 1000px) {
          .grid { grid-template-columns: 1fr; max-width: 560px; }
        }
      `}</style>
    </section>
  )
}
