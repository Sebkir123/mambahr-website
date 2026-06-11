'use client'

const APPROVALS = [
  { img: '/avatars/maya.jpg', title: 'Offer · Senior Engineer', meta: 'Maya Chen · $195k · above band 8%', tag: 'Urgent', tone: 'urgent' },
  { img: '/avatars/tom.jpg', title: 'Comp change · +12% merit', meta: 'Tom Harrison · within band', tag: 'Review', tone: 'warn' },
  { img: '/avatars/dave.jpg', title: 'Promotion · Marketing Lead', meta: 'Dave Buchanan · needs VP sign-off', tag: 'Review', tone: 'warn' },
]

const PEOPLE = [
  { img: '/avatars/anna.jpg', name: 'Anna Wilson', role: 'Sales Associate', status: 'Active', tone: 'ok' },
  { img: '/avatars/priya.jpg', name: 'Priya Shah', role: 'Data Engineer', status: 'Active', tone: 'ok' },
  { img: '/avatars/maya.jpg', name: 'Maya Chen', role: 'Senior Engineer', status: 'On leave', tone: 'off' },
  { img: '/avatars/dave.jpg', name: 'Dave Buchanan', role: 'Marketing', status: 'New hire', tone: 'new' },
]

const BARS = [
  { label: 'Onboarding', v: 38, w: '100%' },
  { label: 'Leave & time off', v: 27, w: '71%' },
  { label: 'Payroll', v: 24, w: '63%' },
  { label: 'Compliance', v: 23, w: '60%' },
]

const TIMELINE = [
  { t: '9:02', text: 'Offer letter countersigned', sys: 'DocuSign' },
  { t: '9:03', text: 'I-9 + E-Verify filed', sys: 'USCIS' },
  { t: '9:05', text: 'Accounts created', sys: 'Okta · Slack' },
  { t: '9:07', text: 'First-week calendar sent', sys: '11 invites' },
]

export default function Bento() {
  return (
    <section className="bn">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">One place for everything</p>
          <h2 className="title">Everything your HR team does, <span className="em">handled.</span></h2>
          <p className="lead">
            Six tools&rsquo; worth of work in one system that does it for you — hiring, onboarding,
            payroll, time off, performance, compliance. Your day shrinks to the decisions only
            you can make.
          </p>
        </div>

        <div className="grid">
          {/* Approvals inbox */}
          <article className="card light a-inbox agent-edge agent-working agent-lg" data-reveal data-delay="1">
            <div className="c-head stack">
              <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Mamba · waiting on you</span>
              <span className="c-title lg">Your whole to-do list. Three taps.</span>
            </div>
            <div className="rows">
              {APPROVALS.map((a) => (
                <div key={a.title} className="row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="av" src={a.img} alt="" width={34} height={34} />
                  <div className="r-main">
                    <div className="r-t">{a.title}<span className={`tag ${a.tone}`}>{a.tag}</span></div>
                    <div className="r-m">{a.meta}</div>
                  </div>
                  <div className="r-btns">
                    <span className="ok">Approve</span>
                    <span className="no">Decline</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="c-foot">That&rsquo;s it. That&rsquo;s the whole job now.</div>
          </article>

          {/* Hours saved chart */}
          <article className="card dark a-chart" data-reveal data-delay="2">
            <span className="c-title muted">Hours saved · this month</span>
            <div className="big"><span data-count="112">112</span><em>hrs</em></div>
            <div className="bars">
              {BARS.map((b) => (
                <div key={b.label} className="bar">
                  <div className="b-top"><span>{b.label}</span><b>{b.v}h</b></div>
                  <div className="b-track"><span className="b-fill" style={{ width: b.w }} /></div>
                </div>
              ))}
            </div>
            <div className="c-foot ondark">&asymp; three full work-weeks, back</div>
          </article>

          {/* People table */}
          <article className="card light a-people" data-reveal data-delay="1">
            <div className="c-head">
              <span className="c-title">People · 1,247</span>
              <span className="pill ok">Live</span>
            </div>
            <div className="thead"><span>Name</span><span>Role</span><span className="r">Status</span></div>
            <div className="trows">
              {PEOPLE.map((p) => (
                <div key={p.name} className="trow">
                  <span className="t-name">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="av sm" src={p.img} alt="" width={28} height={28} />
                    {p.name}
                  </span>
                  <span className="t-role">{p.role}</span>
                  <span className="r"><span className={`tag ${p.tone}`}>{p.status}</span></span>
                </div>
              ))}
            </div>
            <div className="c-foot">Always current. Never a stale spreadsheet.</div>
          </article>

          {/* Onboarding timeline */}
          <article className="card tint a-onb agent-edge agent-done agent-lg" data-reveal data-delay="2">
            <div className="c-head stack">
              <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Mamba · done in 4m 12s</span>
              <span className="c-title lg">Alex starts Monday. Everything&rsquo;s ready.</span>
            </div>
            <div className="tl">
              {TIMELINE.map((e) => (
                <div key={e.text} className="tl-row">
                  <span className="tl-node" aria-hidden="true" />
                  <span className="tl-time">{e.t}</span>
                  <span className="tl-text">{e.text}</span>
                  <span className="tl-sys">{e.sys}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .bn { background: var(--bg-warm); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: 720px; margin-bottom: clamp(40px, 5vw, 60px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(36px, 4.8vw, 58px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }
        .lead { font-size: clamp(17px, 2vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 20px 0 0; max-width: 560px; }

        .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; }
        .a-inbox { grid-column: span 4; }
        .a-chart { grid-column: span 2; }
        .a-people { grid-column: span 3; }
        .a-onb { grid-column: span 3; }

        .card { border-radius: 18px; padding: 20px; transition: transform 0.22s ease, box-shadow 0.22s ease; display: flex; flex-direction: column; }
        .card:hover { transform: translateY(-4px); }
        .light { background: var(--bg); border: 1px solid var(--border); box-shadow: var(--shadow-md); }
        .light:hover { box-shadow: var(--shadow-float); }
        .dark { background: radial-gradient(90% 80% at 80% 0%, rgba(185, 138, 78,0.18), transparent 60%), #14110C; color: #fff; }
        .tint { background: linear-gradient(160deg, #FFF2E6, #FBE6D6); border: 1px solid #E6D3BC; box-shadow: var(--shadow-sm); }

        .c-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .c-head.stack { flex-direction: column; align-items: flex-start; gap: 9px; margin-bottom: 16px; }
        .c-title { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .c-title.lg { font-size: 18px; letter-spacing: -0.01em; }
        .c-foot {
          margin-top: 16px;
          padding-top: 13px;
          border-top: 1px solid var(--border-faint);
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 15px;
          color: var(--gold-dark);
        }
        .tint .c-foot { border-color: rgba(138, 101, 53, 0.16); }
        .c-foot.ondark {
          border-color: rgba(255, 255, 255, 0.1);
          background: linear-gradient(100deg, #D4AA7C, #AEA2E6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .c-title.muted { color: rgba(255,255,255,0.66); font-weight: 600; font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; }
        .pill { font-family: var(--font-mono); font-size: 10.5px; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
        .pill.warn { color: #8A6535; background: #F2ECE0; }
        .pill.ok { color: var(--color-green); background: rgba(22, 163, 74,0.1); }

        /* approvals inbox */
        .rows { display: flex; flex-direction: column; }
        .row { display: flex; align-items: center; gap: 12px; padding: 13px 0; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .av { width: 34px; height: 34px; border-radius: 999px; object-fit: cover; flex: none; }
        .av.sm { width: 28px; height: 28px; }
        .r-main { flex: 1; min-width: 0; }
        .r-t { font-size: 13.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 8px; }
        .r-m { font-size: 12.5px; color: var(--text-muted); margin-top: 3px; }
        .tag { font-family: var(--font-mono); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 7px; border-radius: 999px; }
        .tag.urgent { color: var(--color-red); background: rgba(220, 38, 38,0.08); }
        .tag.warn { color: #8A6535; background: #F2ECE0; }
        .tag.ok { color: var(--color-green); background: rgba(22, 163, 74,0.1); }
        .tag.off { color: var(--text-faint); background: var(--bg-elevated); }
        .tag.new { color: #2563EB; background: rgba(37, 99, 235,0.12); }
        .r-btns { display: flex; gap: 7px; flex: none; }
        .ok { font-size: 12px; font-weight: 600; color: #fff; background: #1A1A19; border-radius: 999px; padding: 7px 14px; }
        .no { font-size: 12px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 7px 14px; }

        /* chart */
        .big { font-family: var(--font-serif); font-size: 46px; line-height: 1; margin: 14px 0 18px; display: flex; align-items: baseline; gap: 6px; }
        .big em { font-style: normal; font-size: 14px; color: rgba(255,255,255,0.6); }
        .bars { display: flex; flex-direction: column; gap: 12px; margin-top: auto; }
        .b-top { display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,0.8); margin-bottom: 5px; }
        .b-top b { color: #fff; }
        .b-track { height: 7px; border-radius: 999px; background: rgba(255,255,255,0.12); overflow: hidden; }
        .b-fill { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #D4AA7C, #B98A4E 70%, #6A5DA6); }

        /* people table */
        .thead { display: grid; grid-template-columns: 1.5fr 1fr auto; gap: 12px; font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); padding-bottom: 9px; border-bottom: 1px solid var(--border); }
        .thead .r, .trow .r { text-align: right; justify-self: end; }
        .trows { display: flex; flex-direction: column; }
        .trow { display: grid; grid-template-columns: 1.5fr 1fr auto; gap: 12px; align-items: center; padding: 10px 0; }
        .trow + .trow { border-top: 1px solid var(--border-faint); }
        .t-name { display: flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 600; color: var(--text); }
        .t-role { font-size: 12.5px; color: var(--text-muted); }

        /* timeline */
        .tl { position: relative; display: flex; flex-direction: column; gap: 2px; padding-left: 4px; }
        .tl::before { content: ''; position: absolute; left: 10px; top: 12px; bottom: 12px; width: 2px; background: #E2C9A8; }
        .tl-row { display: grid; grid-template-columns: 22px auto 1fr auto; align-items: center; gap: 10px; padding: 8px 0; position: relative; }
        .tl-node { width: 14px; height: 14px; border-radius: 999px; background: var(--color-green); position: relative; z-index: 1; }
        .tl-node::after { content: ''; position: absolute; left: 4px; top: 2px; width: 3px; height: 6px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .tl-time { font-family: var(--font-mono); font-size: 11px; color: #8A6535; }
        .tl-text { font-size: 13px; color: #6B4E26; font-weight: 500; }
        .tl-sys { font-family: var(--font-mono); font-size: 10.5px; color: #8A6535; background: rgba(255,255,255,0.6); border-radius: 999px; padding: 2px 8px; white-space: nowrap; }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; }
          .a-inbox, .a-chart, .a-people, .a-onb { grid-column: auto; }
          .r-btns .no { display: none; }
        }
      `}</style>
    </section>
  )
}
