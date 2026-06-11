'use client'

const NAV: { label: string; icon: string; active?: boolean; badge?: string }[] = [
  { label: 'Dashboard', icon: 'M2 7l6-4 6 4v7H2z', active: true },
  { label: 'People', icon: 'M5 7a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zM1 14c0-2 1.8-3 4-3s4 1 4 3m2-3c2.2 0 4 1 4 3' },
  { label: 'Hiring', icon: 'M3 5h10v8H3zM6 5V3h4v2', badge: '2' },
  { label: 'Onboarding', icon: 'M8 2v8m0 0l3-3m-3 3L5 7M3 13h10', badge: '1' },
  { label: 'Time off', icon: 'M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6c0-3 2.2-4 5-4s5 1 5 4' },
  { label: 'Payroll', icon: 'M8 1v14M11 4H6.5a2 2 0 000 4h3a2 2 0 010 4H5' },
  { label: 'Compliance', icon: 'M8 1l6 2v4c0 4-3 7-6 8-3-1-6-4-6-8V3z' },
]

const APPROVALS = [
  { img: '/avatars/maya.jpg', title: 'Offer · Maya Chen', meta: 'Senior Engineer · $195k · above band 8%', tag: 'Urgent', tagTone: 'urgent' },
  { img: '/avatars/tom.jpg', title: 'Comp change · Tom Harrison', meta: '+12% merit raise · within band', tag: 'Review', tagTone: 'warn' },
]

const HANDLED = [
  { who: 'Emma Rodriguez', what: 'Time off approved · 3 days', time: '9:02 AM' },
  { who: 'Alex Park', what: 'Onboarding complete · Day 1 ready', time: '9:07 AM' },
  { who: 'Priya Shah', what: 'Address + tax details updated', time: '8:41 AM' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <span className="v2-grain" />
      <div className="top">
        <span className="eyebrow" data-reveal>The AI HR department</span>
        <h1 className="title" data-reveal data-delay="1">HR that runs itself.</h1>
        <p className="sub" data-reveal data-delay="2">
          MambaHR onboards your hires, runs payroll, handles time off and leave, and keeps
          you compliant in all 50 states — and only brings you the calls that need a person.
        </p>
        <div className="ctas" data-reveal data-delay="3">
          <a href="#access" className="btn-primary">Request access</a>
          <a href="#run" className="btn-ghost">See it in action</a>
        </div>
        <div className="proof" data-reveal data-delay="3">
          <div className="faces">
            {['priya', 'anna', 'maya', 'dave', 'brian'].map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p} src={`/avatars/${p}.jpg`} alt="" width={36} height={36} />
            ))}
          </div>
          <span className="proof-t">Loved by lean people teams</span>
        </div>
        <div className="trust" data-reveal data-delay="3">
          <span>Every action logged</span><i />
          <span>Live in a day</span><i />
          <span>Built by people-team operators</span>
        </div>
      </div>

      <div className="stage" data-reveal data-delay="4">
        <div className="app agent-edge agent-working">
          <div className="app-bar">
            <span className="dots"><b /><b /><b /></span>
            <span className="addr">app.mambahr.com</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="me" src="/avatars/brian.jpg" alt="Brian Bell" width={24} height={24} />
          </div>
          <div className="app-body">
            <aside className="side">
              <div className="brand"><span className="logo">M</span>MambaHR</div>
              <nav>
                {NAV.map((n) => (
                  <a key={n.label} className={`nav${n.active ? ' on' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d={n.icon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {n.label}
                    {n.badge && <span className="nav-b">{n.badge}</span>}
                  </a>
                ))}
              </nav>
              <div className="agentline">
                <span className="al-dot" />
                <span className="al-t"><b>Mamba</b> is working<span className="al-ell"><i>.</i><i>.</i><i>.</i></span></span>
              </div>
              <div className="status"><span className="d" />All systems handled</div>
            </aside>

            <main className="main">
              <div className="greet">
                <div>
                  <h3>Good morning, Brian</h3>
                  <span className="date">Monday, June 10</span>
                </div>
                <span className="seg">This week</span>
              </div>

              <div className="stats">
                <div className="stat warm">
                  <span className="s-l">Needs you</span>
                  <span className="s-n"><span data-count="3">3</span><i className="warn" /></span>
                  <span className="s-sub">2 urgent · oldest 38 min</span>
                </div>
                <div className="stat vio">
                  <span className="s-l">Handled today</span>
                  <span className="s-n"><span data-count="18">18</span></span>
                  <span className="s-bars" aria-hidden="true">
                    {[34, 52, 40, 64, 48, 78, 92].map((h, i) => (
                      <b key={i} style={{ height: `${h}%` }} />
                    ))}
                  </span>
                </div>
                <div className="stat goldt">
                  <span className="s-l">Hours saved</span>
                  <span className="s-n"><span data-count="27">27</span><em>this wk</em></span>
                  <span className="s-sub up">↑ 6 vs last week</span>
                </div>
              </div>

              <div className="panel">
                <div className="p-head"><span>Needs your approval</span><span className="p-count">3</span></div>
                {APPROVALS.map((a) => (
                  <div key={a.title} className="ap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="ap-av" src={a.img} alt="" width={34} height={34} />
                    <div className="ap-main">
                      <div className="ap-t">{a.title}<span className={`ap-tag ${a.tagTone}`}>{a.tag}</span></div>
                      <div className="ap-m">{a.meta}</div>
                    </div>
                    <div className="ap-btns">
                      <span className="ap-ok">Approve</span>
                      <span className="ap-no">Decline</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="feed">
                <div className="f-head">Handled automatically · earlier today</div>
                {HANDLED.map((h) => (
                  <div key={h.who} className="f-row">
                    <span className="f-check" aria-hidden="true" />
                    <span className="f-who">{h.who}</span>
                    <span className="f-what">{h.what}</span>
                    <span className="f-time">{h.time}</span>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: clamp(116px, 13vw, 168px) var(--page-pad) 0;
          background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%);
        }
        .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .aurora::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(54% 48% at 50% 36%, rgba(254, 253, 250, 0.84), rgba(254, 253, 250, 0) 72%);
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          will-change: transform;
        }
        .b1 {
          width: 760px; height: 760px;
          background: radial-gradient(circle, rgba(196, 154, 108, 0.62), rgba(196, 154, 108, 0) 68%);
          top: -200px; left: -120px;
          animation: auroraA 24s ease-in-out infinite alternate;
        }
        .b2 {
          width: 680px; height: 680px;
          background: radial-gradient(circle, rgba(106, 93, 166, 0.5), rgba(106, 93, 166, 0) 68%);
          top: -160px; right: -120px;
          animation: auroraB 28s ease-in-out infinite alternate;
        }
        .b3 {
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(138, 101, 53, 0.42), rgba(138, 101, 53, 0) 70%);
          bottom: -260px; left: 42%;
          animation: auroraC 22s ease-in-out infinite alternate;
        }
        @keyframes auroraA {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(140px, 90px) scale(1.18); }
        }
        @keyframes auroraB {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-120px, 70px) scale(1.12); }
        }
        @keyframes auroraC {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-90px, -70px) scale(1.22); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
        .top { position: relative; max-width: 860px; margin: 0 auto; text-align: center; }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(58px, 9vw, 116px);
          line-height: 0.98;
          letter-spacing: -0.035em;
          color: var(--text);
          margin: 20px 0 0;
        }
        .sub {
          font-size: clamp(18px, 2.1vw, 21px);
          line-height: 1.55;
          color: var(--text-muted);
          max-width: 600px;
          margin: 24px auto 0;
        }
        .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 34px; flex-wrap: wrap; }
        .btn-primary {
          background: #1A1A19;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          padding: 15px 30px;
          border-radius: 999px;
          box-shadow: 0 12px 26px rgba(20, 18, 14, 0.22);
          transition: transform 0.15s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-ghost {
          color: var(--text);
          font-weight: 600;
          font-size: 16px;
          padding: 15px 24px;
          border-radius: 999px;
          border: 1px solid var(--border-mid);
          background: rgba(255, 255, 255, 0.6);
        }
        .btn-ghost:hover { background: #fff; }
        .proof {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .faces { display: flex; }
        .faces img {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid #fff;
          box-shadow: var(--shadow-sm);
          margin-left: -10px;
          background: var(--bg-elevated);
        }
        .faces img:first-child { margin-left: 0; }
        .proof-t { font-size: 14px; font-weight: 600; color: var(--text); }
        .trust {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          margin-top: 16px;
          color: var(--text-muted);
          font-size: 13.5px;
          flex-wrap: wrap;
        }
        .trust i { width: 4px; height: 4px; border-radius: 999px; background: var(--border-mid); }

        /* ---- app dashboard ---- */
        .stage {
          position: relative;
          max-width: 1080px;
          margin: clamp(56px, 7vw, 88px) auto 0;
          perspective: 1800px;
        }
        .app {
          border-radius: 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 10px rgba(20, 18, 14, 0.06), 0 30px 60px rgba(20, 18, 14, 0.18),
            0 60px 120px rgba(20, 18, 14, 0.16);
          overflow: hidden;
          transform: rotateX(2.2deg);
          transform-origin: top center;
        }
        .app-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          height: 42px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 10px; height: 10px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr {
          margin: 0 auto;
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 3px 16px;
        }
        .me { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; }
        .app-body { display: grid; grid-template-columns: 196px 1fr; }
        .side {
          background: #F8F6F1;
          border-right: 1px solid var(--border);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .brand { display: flex; align-items: center; gap: 9px; font-weight: 700; font-size: 14px; color: var(--text); padding: 2px 6px 12px; }
        .logo {
          width: 24px; height: 24px; border-radius: 7px;
          background: #1A1A19; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-serif); font-size: 15px;
        }
        .nav {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 8px;
          color: var(--text-muted); font-size: 13.5px; font-weight: 500;
        }
        .nav svg { color: var(--text-faint); }
        .nav.on { background: var(--gold-tint); color: var(--text); font-weight: 600; }
        .nav.on svg { color: var(--gold-dark); }
        .nav-b {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          color: var(--gold-dark);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.22);
          border-radius: 999px;
          padding: 1px 7px;
        }
        .agentline {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-muted);
          background: var(--violet-soft);
          border: 1px solid rgba(106, 93, 166, 0.22);
          border-radius: 9px;
          padding: 8px 10px;
        }
        .agentline b { color: var(--violet); font-weight: 700; }
        .al-dot {
          flex: none;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--violet);
          animation: alPulse 2s ease-in-out infinite;
        }
        @keyframes alPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(106, 93, 166, 0.4); }
          50% { box-shadow: 0 0 0 5px rgba(106, 93, 166, 0); }
        }
        .al-ell i {
          font-style: normal;
          animation: alDots 1.4s ease-in-out infinite;
        }
        .al-ell i:nth-child(2) { animation-delay: 0.2s; }
        .al-ell i:nth-child(3) { animation-delay: 0.4s; }
        @keyframes alDots {
          0%, 60%, 100% { opacity: 0.25; }
          30% { opacity: 1; }
        }
        .status { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-faint); padding: 10px 8px 2px; }
        .status .d { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
        @media (prefers-reduced-motion: reduce) {
          .al-dot, .al-ell i { animation: none; }
        }

        .main { padding: 22px 24px 26px; }
        .greet { display: flex; align-items: flex-start; justify-content: space-between; }
        .greet h3 { font-family: var(--font-serif); font-weight: 400; font-size: 25px; color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .date { font-size: 13px; color: var(--text-faint); }
        .seg { font-size: 12.5px; color: var(--text-muted); border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
        .stat {
          position: relative;
          border: 1px solid var(--border-faint);
          border-radius: 12px;
          padding: 14px;
          min-height: 104px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }
        .stat.warm { background: linear-gradient(165deg, #FFF6EC, #FBE9DA); border-color: #EFD9C2; }
        .stat.vio { background: linear-gradient(165deg, #F4F2FA, #ECE8F6); border-color: #DDD7EC; }
        .stat.goldt { background: linear-gradient(165deg, #FAF5EA, #F2EADA); border-color: #E6D9C0; }
        .s-l { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); display: block; }
        .s-n { font-family: var(--font-serif); font-size: 32px; color: var(--text); display: flex; align-items: baseline; gap: 6px; margin-top: 5px; line-height: 1; }
        .s-n em { font-style: normal; font-family: var(--font-sans); font-size: 11px; color: var(--text-faint); }
        .s-n .warn { width: 8px; height: 8px; border-radius: 999px; background: var(--color-red); align-self: center; animation: alPulse 2.4s ease-in-out infinite; }
        .s-sub { font-size: 11px; color: var(--text-faint); margin-top: auto; padding-top: 8px; }
        .s-sub.up { color: var(--color-green); font-weight: 600; }
        .s-bars {
          margin-top: auto;
          padding-top: 8px;
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 30px;
        }
        .s-bars b {
          flex: 1;
          border-radius: 2px 2px 0 0;
          background: linear-gradient(180deg, var(--violet), rgba(106, 93, 166, 0.45));
          opacity: 0.85;
        }
        .panel { margin-top: 18px; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .p-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--border); font-size: 13px; font-weight: 600; color: var(--text); }
        .p-count { font-family: var(--font-mono); font-size: 11px; color: #8A6535; background: #F2ECE0; border-radius: 999px; padding: 2px 8px; }
        .ap { display: flex; align-items: center; gap: 12px; padding: 13px 16px; }
        .ap + .ap { border-top: 1px solid var(--border-faint); }
        .ap-av { width: 34px; height: 34px; border-radius: 999px; object-fit: cover; flex: none; }
        .ap-main { flex: 1; min-width: 0; }
        .ap-t { font-size: 13.5px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 8px; }
        .ap-tag { font-family: var(--font-mono); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 7px; border-radius: 999px; }
        .ap-tag.urgent { color: var(--color-red); background: rgba(220, 38, 38, 0.08); }
        .ap-tag.warn { color: #8A6535; background: #F2ECE0; }
        .ap-m { font-size: 12.5px; color: var(--text-muted); margin-top: 3px; }
        .ap-btns { display: flex; gap: 7px; flex: none; }
        .ap-ok { font-size: 12.5px; font-weight: 600; color: #fff; background: #1A1A19; border-radius: 999px; padding: 7px 15px; }
        .ap-no { font-size: 12.5px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 7px 15px; }
        .feed { margin-top: 16px; }
        .f-head { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); margin-bottom: 10px; }
        .f-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; font-size: 13px; }
        .f-row + .f-row { border-top: 1px solid var(--border-faint); }
        .f-check { flex: none; width: 16px; height: 16px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 7px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-who { font-weight: 600; color: var(--text); }
        .f-what { color: var(--text-muted); flex: 1; min-width: 0; }
        .f-time { color: var(--text-faint); font-size: 11.5px; }

        @media (prefers-reduced-motion: reduce) {
          .btn-primary:hover { transform: none; }
        }
        @media (max-width: 720px) {
          .app { transform: none; }
          .app-body { grid-template-columns: 1fr; }
          .side { flex-direction: row; flex-wrap: wrap; gap: 6px; border-right: none; border-bottom: 1px solid var(--border); }
          .side nav { display: flex; flex-wrap: wrap; gap: 4px; }
          .status { display: none; }
          .ap-btns .ap-no { display: none; }
        }
      `}</style>
    </section>
  )
}
