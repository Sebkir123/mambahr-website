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
            MambaHR hands the average people team 27 hours back, every single week — time
            that goes to the people, not the paperwork.
          </p>
        </div>

        <div className="grid">
          {/* hours back — dark hero metric */}
          <article className="card dark" data-reveal data-delay="1">
            <span className="lbl muted">Hours back, every week</span>
            <div className="num big"><span data-count="27">27</span><em>hrs</em></div>
            <p className="cap ondark">Payroll, onboarding, leave, and compliance — running without you.</p>
            <div className="spark">
              {SPARK.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </article>

          {/* admin gone — gradient ring */}
          <article className="card light" data-reveal data-delay="2">
            <div className="ring">
              <span className="ring-n"><span data-count="70">70</span>%</span>
            </div>
            <span className="lbl">of HR admin, gone</span>
            <p className="cap">The chasing, filing, and updating that filled your week — handled.</p>
          </article>

          {/* onboarding before/after */}
          <article className="card light" data-reveal data-delay="3">
            <span className="lbl">Onboarding a new hire</span>
            <div className="cmp">
              <div className="cmp-row">
                <span className="cmp-l">The old way</span>
                <span className="cmp-bar old"><i style={{ width: '100%' }} /></span>
                <span className="cmp-v old-v">half a day</span>
              </div>
              <div className="cmp-row">
                <span className="cmp-l">With Mamba</span>
                <span className="cmp-bar new"><i style={{ width: '9%' }} /></span>
                <span className="cmp-v new-v">4 min</span>
              </div>
            </div>
            <p className="cap">Paperwork, logins, and first week — ready before they arrive.</p>
          </article>

          {/* deferred hire — money card */}
          <article className="card tint" data-reveal data-delay="4">
            <div className="num money">$<span data-count="95">95</span>k+</div>
            <span className="lbl">The HR hire you don&rsquo;t need yet</span>
            <p className="cap">A full generalist&rsquo;s workload, from $24k a year. Spend the difference on your people.</p>
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
        .lead { font-size: clamp(17px, 2vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 20px 0 0; max-width: 560px; }

        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .card { border-radius: 18px; padding: 24px; min-height: 240px; display: flex; flex-direction: column; transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .card:hover { transform: translateY(-4px); }
        .light { background: var(--bg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .light:hover { box-shadow: var(--shadow-md); }
        .tint { background: linear-gradient(160deg, #FFF2E6, #FBE6D6); border: 1px solid #E6D3BC; }
        .dark { background: radial-gradient(90% 80% at 20% 0%, rgba(185, 138, 78, 0.22), transparent 60%), radial-gradient(70% 60% at 90% 100%, rgba(106, 93, 166, 0.18), transparent 60%), #14110C; color: #fff; }

        .lbl { font-size: 14.5px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .lbl.muted { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.66); font-weight: 600; }
        .num { font-family: var(--font-serif); font-size: clamp(40px, 4vw, 52px); line-height: 1; color: var(--text); margin: 10px 0; }
        .num.big { color: #fff; display: flex; align-items: baseline; gap: 6px; }
        .num.big em { font-style: normal; font-size: 15px; color: rgba(255,255,255,0.6); }
        .num.money {
          margin: 4px 0 14px;
          background: linear-gradient(110deg, #8A6535, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .cap { font-size: 13.5px; line-height: 1.55; color: var(--text-muted); margin: 8px 0 0; }
        .cap.ondark { color: rgba(255,255,255,0.62); }
        .dark .lbl { color: #fff; }

        .spark { margin-top: auto; display: flex; align-items: flex-end; gap: 5px; height: 52px; padding-top: 16px; }
        .spark span { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, #D4AA7C, #B98A4E); opacity: 0.9; }
        .spark span:nth-child(n+8) { background: linear-gradient(180deg, #AEA2E6, #6A5DA6); }

        /* gradient progress ring */
        .ring {
          width: 104px;
          height: 104px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #D4AA7C 0%, #B98A4E 38%, #6A5DA6 70%, var(--border-faint) 70% 100%);
          display: grid;
          place-items: center;
          position: relative;
          margin: 2px 0 18px;
        }
        .ring::before { content: ''; position: absolute; width: 78px; height: 78px; border-radius: 50%; background: var(--bg); }
        .ring-n { position: relative; font-family: var(--font-serif); font-size: 26px; color: var(--text); }

        /* before/after comparison */
        .cmp { display: flex; flex-direction: column; gap: 13px; margin: 18px 0 4px; }
        .cmp-row { display: grid; grid-template-columns: 74px 1fr auto; align-items: center; gap: 10px; }
        .cmp-l { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-faint); }
        .cmp-bar { height: 10px; border-radius: 999px; background: var(--bg-elevated); overflow: hidden; }
        .cmp-bar i { display: block; height: 100%; border-radius: 999px; }
        .cmp-bar.old i { background: var(--border-mid); }
        .cmp-bar.new i { background: linear-gradient(90deg, #B98A4E, #6A5DA6); }
        .cmp-v { font-family: var(--font-mono); font-size: 11px; white-space: nowrap; }
        .old-v { color: var(--text-faint); text-decoration: line-through; }
        .new-v { color: var(--color-green); font-weight: 600; }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
