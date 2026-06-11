'use client'

export default function Channels() {
  return (
    <section className="ch" id="run">
      <div className="wrap">
        <div className="copy" data-reveal>
          <p className="eyebrow">Where your team already works</p>
          <h2 className="title">
            Your AI hire works in <span className="em">Slack and Teams.</span>
          </h2>
          <p className="lead">
            No new tool to learn. No portal to log into. Your team messages
            <b> @MambaHR</b> like a coworker — it reads the thread, checks your policy,
            does the work, and logs it.
          </p>
          <div className="chans">
            <div className="chan">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ch-logo" src="/slack-new-logo.svg" alt="" width={22} height={22} />
              <div>
                <div className="ch-n">Slack</div>
                <div className="ch-d">Mention it in any channel or DM</div>
              </div>
            </div>
            <div className="chan">
              <span className="ch-logo teams" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="#fff"><path d="M2 4.5h7v2.3H6.7V12H4.3V6.8H2zM10 6h4v4.6a2.4 2.4 0 01-2.4 2.4H10z" /><circle cx="12" cy="3.6" r="1.7" /></svg>
              </span>
              <div>
                <div className="ch-n">Microsoft Teams</div>
                <div className="ch-d">Same agent, same memory</div>
              </div>
            </div>
            <div className="chan">
              <span className="ch-logo mamba" aria-hidden="true">M</span>
              <div>
                <div className="ch-n">The MambaHR app</div>
                <div className="ch-d">Approvals, records, and the full trail</div>
              </div>
            </div>
          </div>
          <p className="audit"><span className="a-dot" aria-hidden="true" />Every action logged. One record of everything, everywhere.</p>
        </div>

        <div className="stage" data-reveal data-delay="1">
          <div className="sw agent-edge agent-working">
            <div className="sw-bar">
              <span className="dots"><i /><i /><i /></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="sw-logo" src="/slack-new-logo.svg" alt="Slack" width={16} height={16} />
              <span className="sw-find">Search MambaHR</span>
            </div>
            <div className="sw-body">
              <aside className="sw-side">
                <div className="sw-ws">
                  MambaHR
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
                </div>
                <div className="sw-sec">Channels</div>
                <a className="sw-ch on"><span className="hash">#</span>people-ops</a>
                <a className="sw-ch"><span className="hash">#</span>hiring</a>
                <a className="sw-ch"><span className="hash">#</span>onboarding</a>
                <div className="sw-sec">Direct messages</div>
                <a className="sw-dm"><span className="seg green" />MambaHR<span className="badge">2</span></a>
                <a className="sw-dm"><span className="seg" />Brian Bell</a>
              </aside>

              <main className="sw-main">
                <div className="sw-head">
                  <span className="h-ch"><span className="hash">#</span>people-ops</span>
                  <span className="h-mem">
                    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="5" r="3" fill="currentColor" /><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" fill="currentColor" /></svg>
                    12
                  </span>
                </div>

                <div className="sw-feed">
                  <div className="m">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="av" src="/avatars/maya.jpg" alt="Maya Chen" width={38} height={38} />
                    <div className="m-body">
                      <div className="m-h"><b>Maya Chen</b><time>9:14 AM</time></div>
                      <div className="m-t">
                        <span className="mention">@MambaHR</span> I need 3 days off next week, Mon&ndash;Wed for a wedding
                      </div>
                    </div>
                  </div>

                  <div className="m">
                    <div className="av app">M</div>
                    <div className="m-body">
                      <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:14 AM</time></div>
                      <div className="m-t">Approved &mdash; enjoy the wedding.</div>
                      <div className="attach">
                        <div className="a-row"><span className="a-k">Balance</span><span className="a-v">12 &rarr; 9 days</span></div>
                        <div className="a-row"><span className="a-k">Calendar</span><span className="a-v">Apr 7&ndash;9 blocked, OOO set</span></div>
                        <div className="a-row"><span className="a-k">Manager</span><span className="a-v">B. Bell notified</span></div>
                        <div className="a-foot"><span className="ok-dot" />Logged &middot; within policy &middot; ref <span className="mono">leave_4f81a2</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="typing">
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                    <span className="typing-t"><b>Mamba</b> is updating the payroll record&hellip;</span>
                  </div>
                </div>

                <div className="sw-composer">
                  <span>Message #people-ops</span>
                  <span className="send" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8l12-5-5 12-2-5-5-2z" fill="currentColor" /></svg>
                  </span>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ch {
          background: var(--bg-warm);
          padding-block: clamp(96px, 13vw, 168px);
        }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
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
          font-size: clamp(34px, 4.4vw, 54px);
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
          font-size: clamp(16px, 1.9vw, 18px);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 20px 0 0;
          max-width: 420px;
        }
        .lead b { color: var(--violet); font-weight: 700; }
        .chans { display: flex; flex-direction: column; gap: 4px; margin-top: 26px; }
        .chan {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .chan:hover { background: var(--bg); border-color: var(--border); }
        .ch-logo {
          flex: none;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 4px;
          box-sizing: border-box;
        }
        .ch-logo.teams { background: #464EB8; border-color: #464EB8; }
        .ch-logo.mamba {
          background: #1A1A19;
          border-color: #1A1A19;
          color: #fff;
          font-family: var(--font-serif);
          font-size: 17px;
        }
        .ch-n { font-size: 14.5px; font-weight: 700; color: var(--text); }
        .ch-d { font-size: 12.5px; color: var(--text-faint); margin-top: 1px; }
        .audit {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 22px 0 0;
          padding: 11px 14px;
          font-size: 12.5px;
          color: var(--text-muted);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.18);
          border-radius: 10px;
          max-width: 420px;
        }
        .a-dot { flex: none; width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }

        /* ---- Slack window ---- */
        .sw {
          border-radius: 14px;
          background: var(--bg);
          box-shadow: var(--shadow-float);
          border: 1px solid var(--border);
          overflow: hidden;
          font-size: 13px;
        }
        .sw-bar {
          height: 38px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 14px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots i { width: 10px; height: 10px; border-radius: 999px; background: #e3ddd6; display: block; }
        .dots i:first-child { background: #f0a59a; }
        .dots i:nth-child(2) { background: #f4ce8e; }
        .dots i:nth-child(3) { background: #a9cfa6; }
        .sw-logo { flex: none; }
        .sw-find {
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 3px 12px;
          margin: 0 auto;
          min-width: 220px;
          text-align: center;
        }
        .sw-body { display: grid; grid-template-columns: 188px 1fr; min-height: 384px; }
        /* Slack's actual aubergine rail */
        .sw-side {
          background: #3F0E40;
          padding: 14px 10px;
        }
        .sw-ws {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          padding: 4px 8px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          margin-bottom: 10px;
        }
        .sw-ws svg { color: rgba(255, 255, 255, 0.6); }
        .sw-sec {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
          padding: 10px 8px 5px;
          letter-spacing: 0.02em;
        }
        .sw-ch,
        .sw-dm {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 8px;
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 13.5px;
          cursor: pointer;
        }
        .hash { color: rgba(255, 255, 255, 0.5); font-weight: 600; }
        /* Slack's active-channel blue */
        .sw-ch.on {
          background: #1164A3;
          color: #fff;
          font-weight: 600;
        }
        .sw-ch.on .hash { color: rgba(255, 255, 255, 0.85); }
        .sw-dm .seg {
          width: 9px;
          height: 9px;
          border-radius: 3px;
          border: 1.5px solid rgba(255, 255, 255, 0.45);
        }
        .sw-dm .seg.green { background: #2EB67D; border-color: transparent; }
        .sw-dm:first-of-type { color: #fff; }
        .sw-dm .badge {
          margin-left: auto;
          background: #E01E5A;
          color: #fff;
          font-size: 10.5px;
          font-weight: 700;
          border-radius: 999px;
          padding: 1px 7px;
        }
        .sw-dm:first-of-type { font-weight: 600; }

        .sw-main { display: flex; flex-direction: column; }
        .sw-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 18px;
          border-bottom: 1px solid var(--border);
        }
        .h-ch { font-weight: 700; font-size: 15px; color: var(--text); display: flex; gap: 2px; }
        .h-ch .hash { color: var(--text-faint); }
        .h-mem {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-faint);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 2px 8px;
        }
        .sw-feed { padding: 20px 22px 8px; display: flex; flex-direction: column; gap: 22px; flex: 1; }
        .m { display: flex; gap: 11px; padding: 6px 8px; margin: -6px -8px; border-radius: 8px; }
        .m.hover { background: #F6F2EB; }
        .av {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          object-fit: cover;
          flex: none;
        }
        .av.app {
          background: #1A1A19;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 20px;
        }
        .m-body { min-width: 0; }
        .m-h { display: flex; align-items: baseline; gap: 8px; }
        .m-h b { font-size: 14px; color: var(--text); font-weight: 700; }
        .m-h time { font-size: 11.5px; color: var(--text-faint); }
        .apptag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: var(--bg-elevated);
          border-radius: 4px;
          padding: 1px 5px;
        }
        .m-t { font-size: 14px; line-height: 1.5; color: var(--text); margin-top: 3px; }
        .mention { color: #6A5DA6; background: rgba(106, 93, 166, 0.1); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 9px;
          border-left: 3px solid var(--gold);
          background: #FAF6EF;
          border-radius: 0 10px 10px 0;
          padding: 12px 14px;
          max-width: 380px;
        }
        .a-row { display: flex; justify-content: space-between; gap: 16px; padding: 3px 0; }
        .a-k { font-size: 12.5px; color: var(--text-faint); }
        .a-v { font-size: 12.5px; color: var(--text); font-weight: 600; }
        .a-foot {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 9px;
          padding-top: 9px;
          border-top: 1px solid var(--border);
          font-size: 11.5px;
          color: var(--text-faint);
        }
        .ok-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
        .mono { font-family: var(--font-mono); font-size: 11px; }
        .acts { display: flex; align-items: center; gap: 9px; margin-top: 11px; }
        .btn-a {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: var(--color-green);
          border: none;
          border-radius: 7px;
          padding: 7px 16px;
          cursor: pointer;
        }
        .btn-g {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          background: var(--bg);
          border: 1px solid var(--border-mid);
          border-radius: 7px;
          padding: 7px 16px;
          cursor: pointer;
        }
        .acts-ctx { font-size: 11.5px; color: var(--text-faint); margin-left: 4px; }
        .typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px 0;
        }
        .typing-t { font-size: 12px; color: var(--text-faint); margin-left: 7px; }
        .typing-t b { color: var(--violet); font-weight: 600; }
        .reacts { margin-left: auto; align-self: flex-start; }
        .re {
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 2px 9px;
        }
        .sw-composer {
          margin: 8px 18px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-mid);
          border-radius: 10px;
          padding: 11px 14px;
          color: var(--text-faint);
          font-size: 13.5px;
        }
        /* Slack's green send button */
        .send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 24px;
          border-radius: 5px;
          background: #007A5A;
          color: #fff;
        }

        @media (max-width: 900px) {
          .wrap { grid-template-columns: 1fr; }
          .sw-body { grid-template-columns: 150px 1fr; }
        }
        @media (max-width: 520px) {
          .sw-side { display: none; }
          .sw-body { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
