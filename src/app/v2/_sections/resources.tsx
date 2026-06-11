'use client'

const BULLETS = [
  'State-by-state notice & severance rules',
  'WARN Act thresholds and timing',
  'Defensible selection criteria',
  'Manager, employee, and team scripts',
]

const MORE = ['Multi-State Leave Compliance Checklist', 'The First-90-Days Onboarding Kit']

export default function Resources() {
  return (
    <section className="rs">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Field guides</p>
          <h2 className="title">Hard-won HR playbooks. <span className="em">Free.</span></h2>
          <p className="lead">Practical guides for the parts of the job no one warns you about.</p>
        </div>

        <div className="feature" data-reveal data-delay="1">
          <div className="cover">
            <div className="cover-brand"><span className="m">M</span>MambaHR</div>
            <div className="cover-kicker">Field guide</div>
            <div className="cover-title">The Defensible Layoff Playbook</div>
            <div className="cover-foot">A people leader&rsquo;s field guide</div>
          </div>

          <div className="content">
            <h3>The Defensible Layoff Playbook</h3>
            <p className="desc">
              A step-by-step guide for running a reduction in force that holds up in court —
              notice and severance by state, WARN thresholds, selection criteria, and the
              scripts for every conversation.
            </p>
            <ul className="bullets">
              {BULLETS.map((b) => (
                <li key={b}><span className="tick" aria-hidden="true" />{b}</li>
              ))}
            </ul>
            <form className="grab" onSubmit={(e) => e.preventDefault()}>
              <input className="email" type="email" placeholder="you@company.com" aria-label="Work email" />
              <button className="btn" type="submit">Get the PDF</button>
            </form>
            <span className="note">Free · no sales call · unsubscribe anytime</span>
          </div>
        </div>

        <div className="more" data-reveal data-delay="2">
          <span className="more-l">More guides</span>
          {MORE.map((m) => (
            <a key={m} className="more-item">{m}<span className="arr" aria-hidden="true">→</span></a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rs { background: var(--bg); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: 680px; margin-bottom: clamp(36px, 4vw, 52px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(34px, 4.4vw, 54px); line-height: 1.06; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(16px, 1.9vw, 18px); line-height: 1.6; color: var(--text-muted); margin: 18px 0 0; }

        .feature {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: clamp(20px, 3vw, 36px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(20px, 2.4vw, 28px);
          box-shadow: var(--shadow-md);
        }
        .cover {
          background: linear-gradient(165deg, #1A1A19, #241B12);
          border-radius: 14px;
          padding: 26px 24px;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .cover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 50% at 20% 0%, rgba(185, 138, 78, 0.28), transparent 60%);
        }
        .cover-brand { position: relative; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
        .cover-brand .m { width: 22px; height: 22px; border-radius: 6px; background: #fff; color: #1A1A19; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 14px; }
        .cover-kicker { position: relative; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255, 255, 255, 0.55); margin-top: auto; }
        .cover-title { position: relative; font-family: var(--font-serif); font-size: 30px; line-height: 1.1; margin-top: 10px; letter-spacing: -0.01em; }
        .cover-foot { position: relative; font-size: 12.5px; color: rgba(255, 255, 255, 0.5); margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.14); }

        .content { display: flex; flex-direction: column; padding: 6px 4px; }
        .content h3 { font-family: var(--font-serif); font-weight: 400; font-size: clamp(24px, 2.6vw, 30px); color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .desc { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 14px 0 18px; max-width: 460px; }
        .bullets { list-style: none; padding: 0; margin: 0 0 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 11px 18px; }
        .bullets li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: var(--text-muted); line-height: 1.4; }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid var(--gold-light); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 6px; border: solid var(--gold-dark); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .grab { display: flex; gap: 9px; margin-top: auto; flex-wrap: wrap; }
        .email { flex: 1; min-width: 200px; border: 1px solid var(--border-mid); border-radius: 999px; padding: 13px 18px; font-size: 14.5px; color: var(--text); background: var(--bg); outline: none; }
        .email:focus { border-color: var(--gold); }
        .btn { background: #1A1A19; color: #fff; font-weight: 600; font-size: 14.5px; border: none; border-radius: 999px; padding: 13px 24px; cursor: pointer; }
        .note { font-size: 12px; color: var(--text-faint); margin-top: 12px; }

        .more { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
        .more-l { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); }
        .more-item { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 8px 15px; cursor: pointer; }
        .more-item:hover { color: var(--text); border-color: var(--border-mid); }
        .arr { color: var(--gold-dark); }

        @media (max-width: 820px) {
          .feature { grid-template-columns: 1fr; }
          .cover { min-height: 200px; }
          .bullets { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
