'use client'

const SPARK = [40, 55, 48, 70, 62, 80, 72, 90, 84, 96]

export default function Outcomes() {
  return (
    <section className="oc">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">What you get back</p>
          <h2 className="title">Give your people team <span className="em">their week back.</span></h2>
          <p className="lead">
            The admin that ate your team&rsquo;s days runs on its own. They spend their time on
            the people, not the paperwork.
          </p>
        </div>

        <div className="grid">
          <article className="card dark" data-reveal data-delay="1">
            <span className="lbl muted">Hours back, every week</span>
            <div className="num big"><span data-count="27">27</span><em>hrs</em></div>
            <p className="cap ondark">Across onboarding, leave, payroll, and compliance.</p>
            <div className="spark">
              {SPARK.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </article>

          <article className="card light" data-reveal data-delay="2">
            <div className="ring" style={{ background: 'conic-gradient(#B98A4E 0 70%, var(--border) 70% 100%)' }}>
              <span className="ring-n"><span data-count="70">70</span>%</span>
            </div>
            <span className="lbl">Less HR admin</span>
            <p className="cap">The busywork that filled your week, gone.</p>
          </article>

          <article className="card light" data-reveal data-delay="3">
            <div className="num">&lt; 5 min</div>
            <span className="lbl">To onboard a new hire</span>
            <p className="cap">Paperwork, accounts, and equipment, done before day one.</p>
          </article>

          <article className="card tint" data-reveal data-delay="4">
            <div className="num">$95k+</div>
            <span className="lbl">The hire you can defer</span>
            <p className="cap">A full HR generalist&rsquo;s work, without the headcount.</p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .oc { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: 700px; margin-bottom: clamp(40px, 5vw, 60px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(36px, 4.8vw, 58px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(17px, 2vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 20px 0 0; max-width: 540px; }

        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .card { border-radius: 18px; padding: 24px; min-height: 220px; display: flex; flex-direction: column; transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .card:hover { transform: translateY(-4px); }
        .light { background: var(--bg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .light:hover { box-shadow: var(--shadow-md); }
        .tint { background: linear-gradient(160deg, #FFF2E6, #FBE6D6); border: 1px solid #E6D3BC; }
        .dark { background: radial-gradient(90% 80% at 20% 0%, rgba(185, 138, 78,0.2), transparent 60%), #14110C; color: #fff; }

        .lbl { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .lbl.muted { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.66); font-weight: 600; }
        .num { font-family: var(--font-serif); font-size: clamp(40px, 4vw, 52px); line-height: 1; color: var(--text); margin: 10px 0; }
        .num.big { color: #fff; display: flex; align-items: baseline; gap: 6px; }
        .num.big em { font-style: normal; font-size: 15px; color: rgba(255,255,255,0.6); }
        .cap { font-size: 13px; line-height: 1.5; color: var(--text-muted); margin: 6px 0 0; }
        .cap.ondark { color: rgba(255,255,255,0.62); }
        .dark .lbl { color: #fff; }

        .spark { margin-top: auto; display: flex; align-items: flex-end; gap: 5px; height: 46px; }
        .spark span { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, #D4AA7C, #B98A4E); opacity: 0.9; }

        .ring { width: 86px; height: 86px; border-radius: 999px; display: grid; place-items: center; position: relative; margin-bottom: 16px; }
        .ring::before { content: ''; position: absolute; width: 64px; height: 64px; border-radius: 999px; background: var(--bg); }
        .ring-n { position: relative; font-family: var(--font-serif); font-size: 22px; color: var(--text); }
        .light:hover .ring::before { background: var(--bg); }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
