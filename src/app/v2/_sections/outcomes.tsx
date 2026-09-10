'use client'

const SPARK = [40, 55, 48, 70, 62, 80, 72, 90, 84, 96]

/* Outcomes + compliance in one beat: the hours back, an onboarding before and
   after, and the cited answer. Three cards, one section. */
export default function Outcomes() {
  return (
    <section className="oc">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">What you get back</p>
          <h2 className="title">Give your HR team <span className="em">their week back.</span></h2>
          <p className="lead">
            We estimate MambaHR takes about 27 hours of admin a week off a lean HR team, with the
            statute cited on every answer. That is our model, not a customer average, and we will
            publish real numbers as soon as we have them.
          </p>
        </div>

        <div className="grid">
          {/* hours back, dark hero metric */}
          <article className="card dark" data-reveal data-delay="1">
            <span className="lbl muted">Hours back, every week</span>
            <div className="num big"><span data-count="27">27</span><em>hrs</em></div>
            <p className="cap ondark">Payroll prep, onboarding, leave, and compliance, handled, with you on the approvals.</p>
            <div className="spark">
              {SPARK.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </article>

          {/* onboarding before/after */}
          <article className="card light" data-reveal data-delay="2">
            <span className="lbl">Onboarding a new hire</span>
            <div className="cmp">
              <div className="cmp-row">
                <span className="cmp-l">The old way</span>
                <span className="cmp-bar old"><i style={{ width: '100%' }} /></span>
                <span className="cmp-v old-v">half a day</span>
              </div>
              <div className="cmp-row">
                <span className="cmp-l">With MambaHR</span>
                <span className="cmp-bar new"><i style={{ width: '9%' }} /></span>
                <span className="cmp-v new-v">4 min</span>
              </div>
            </div>
            <p className="cap">Paperwork, logins, and first week, ready before they arrive.</p>
          </article>

          {/* the cited answer */}
          <article className="card light agent-edge agent-done" data-reveal data-delay="3">
            <span className="lbl">Right answer, backed by law</span>
            <div className="qa">
              <p className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</p>
              <div className="a">
                <span className="a-who">MambaHR <em>6 seconds later</em></span>
                12 weeks of FMLA bonding leave, job protected.
                <span className="a-sub">California CFRA and PDL cited and routed to you to confirm the stack.</span>
              </div>
            </div>
            <p className="cap">Every answer carries the statute it relied on and a review date. A person signs off on the big calls.</p>
          </article>
        </div>

        <p className="note" data-reveal>
          Modeled from the admin hours these workflows take a lean team today, not measured
          customer averages. We will publish real numbers once our first customers are live.
        </p>
      </div>

      <style jsx>{`
        .note {
          margin: 26px auto 0;
          max-width: 640px;
          text-align: center;
          font-size: 12px;
          line-height: 1.55;
          color: var(--text-faint);
        }
        .oc { background: var(--bg); padding-block: clamp(72px, 9vw, 112px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: none; margin-bottom: clamp(40px, 5vw, 60px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7A5A2E; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(17px, 2vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 20px 0 0; max-width: 620px; }

        .grid { display: grid; grid-template-columns: 1fr 1fr 1.25fr; gap: 18px; }
        .card { border-radius: 18px; padding: 24px; min-height: 240px; display: flex; flex-direction: column; transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .card:hover { transform: translateY(-4px); }
        .light { background: var(--bg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .light:hover { box-shadow: var(--shadow-md); }
        .dark { background: radial-gradient(90% 80% at 20% 0%, rgba(185, 138, 78, 0.22), transparent 60%), radial-gradient(70% 60% at 90% 100%, rgba(106, 93, 166, 0.18), transparent 60%), #14110C; color: #fff; }

        .lbl { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .lbl.muted { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.66); font-weight: 600; }
        .num { font-family: var(--font-serif); font-size: clamp(40px, 4vw, 52px); line-height: 1; color: var(--text); margin: 10px 0; }
        .num.big { color: #fff; display: flex; align-items: baseline; gap: 6px; }
        .num.big em { font-style: normal; font-size: 15px; color: rgba(255,255,255,0.6); }
        .cap { font-size: 14px; line-height: 1.55; color: var(--text-muted); margin: 8px 0 0; }
        .cap.ondark { color: rgba(255,255,255,0.62); }
        .dark .lbl { color: #fff; }

        .spark { margin-top: auto; display: flex; align-items: flex-end; gap: 5px; height: 52px; padding-top: 16px; }
        .spark span { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, #D4AA7C, #B98A4E); opacity: 0.9; }
        .spark span:nth-child(n+8) { background: linear-gradient(180deg, #AEA2E6, #6A5DA6); }

        /* before/after comparison */
        .cmp { display: flex; flex-direction: column; gap: 13px; margin: 18px 0 4px; }
        .cmp-row { display: grid; grid-template-columns: 74px 1fr auto; align-items: center; gap: 10px; }
        .cmp-l { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-faint); }
        .cmp-bar { height: 10px; border-radius: 999px; background: var(--bg-elevated); overflow: hidden; }
        .cmp-bar i { display: block; height: 100%; border-radius: 999px; }
        .cmp-bar.old i { background: var(--border-mid); }
        .cmp-bar.new i { background: linear-gradient(90deg, #B98A4E, #6A5DA6); }
        .cmp-v { font-family: var(--font-mono); font-size: 12px; white-space: nowrap; }
        .old-v { color: var(--text-faint); text-decoration: line-through; }
        .new-v { color: var(--color-green); font-weight: 600; }

        /* the cited answer */
        .qa { margin: 14px 0 4px; display: flex; flex-direction: column; gap: 10px; }
        .q { font-family: var(--font-serif); font-size: 18px; line-height: 1.35; letter-spacing: -0.01em; color: var(--text); margin: 0; }
        .a {
          background: linear-gradient(160deg, #FFF2E6, #FBE6D6);
          border: 1px solid #E6D3BC;
          border-radius: 4px 14px 14px 14px;
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .a-who { display: block; font-family: var(--font-mono); font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); margin-bottom: 6px; }
        .a-who em { font-style: normal; text-transform: none; letter-spacing: 0; color: var(--color-green); margin-left: 6px; }
        .a-sub { display: block; margin-top: 6px; font-size: 13px; font-weight: 400; color: var(--text-muted); }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } .card.agent-edge { grid-column: 1 / -1; } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
