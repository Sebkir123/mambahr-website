'use client'

import { MambaMark } from '@/components/mamba-mark'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Channels() {
  return (
    <section className="ch" id="run">
      <div className="wrap">
        <div className="copy" data-reveal>
          <p className="eyebrow">No new tool to learn</p>
          <h2 className="title">
            Ask in Slack. <span className="em">The admin gets done.</span>
          </h2>
          <p className="lead">
            Your team asks <b>@MambaHR</b> in Slack, the way they would ask a colleague.
            It checks your policy, does the task, and keeps a record of it.
          </p>
          <ul className="points">
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pt-i" src="/slack-new-logo.svg" alt="" width={20} height={20} />
              <div><b>In Slack</b><span>Mention @MambaHR in any channel or direct message.</span></div>
            </li>
            <li>
              <span className="pt-i pt-m" aria-hidden="true"><MambaMark size={20} color="var(--gold)" /></span>
              <div><b>In the MambaHR app</b><span>Approvals, employee records and the full history.</span></div>
            </li>
            <li>
              <span className="pt-i pt-ok" aria-hidden="true" />
              <div><b>Every action logged</b><span>You can always see what happened and why.</span></div>
            </li>
          </ul>
        </div>

        <div className="stage" data-reveal data-delay="1">
          <span className="field" aria-hidden="true"><i className="fa" /><i className="fb" /><i className="fg" /></span>
          <div className="sw">
            <div className="sw-bar">
              <span className="dots"><i /><i /><i /></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="sw-logo" src="/slack-new-logo.svg" alt="Slack" width={16} height={16} />
              <span className="sw-find">Search MambaHR</span>
            </div>
            <div className="sw-body">
              <div className="sw-side" role="presentation">
                <div className="sw-ws" aria-hidden="true">
                  MambaHR
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
                </div>
                <div className="sw-sec">Channels</div>
                <span className="sw-ch on"><span className="hash">#</span>people-ops</span>
                <span className="sw-ch"><span className="hash">#</span>hiring</span>
                <span className="sw-ch"><span className="hash">#</span>onboarding</span>
                <div className="sw-sec">Direct messages</div>
                <span className="sw-dm"><span className="seg green" />MambaHR<span className="badge">2</span></span>
                <span className="sw-dm"><span className="seg" />Brian Bell</span>
              </div>

              <div className="sw-main" role="presentation">
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
                    <img className="av" src="/avatars/maya.jpg" alt="Maya Chen" width={38} height={38} loading="lazy" decoding="async" />
                    <div className="m-body">
                      <div className="m-h"><b>Maya Chen</b><time>9:14 AM</time></div>
                      <div className="m-t">
                        <span className="mention">@MambaHR</span> I need 3 days off next week, Mon&ndash;Wed for a wedding
                      </div>
                    </div>
                  </div>

                  <div className="m">
                    <div className="av app"><MambaMark size={22} color="#C9A26C" /></div>
                    <div className="m-body">
                      <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:14 AM</time></div>
                      <div className="m-t">Approved. Enjoy the wedding.</div>
                      <div className="attach">
                        <div className="a-row"><span className="a-k">Balance</span><span className="a-v">12 &rarr; 9 days</span></div>
                        <div className="a-row"><span className="a-k">Record</span><span className="a-v">Apr 7&ndash;9 booked, payday updated</span></div>
                        <div className="a-row"><span className="a-k">Manager</span><span className="a-v">B. Bell notified</span></div>
                        <div className="a-foot"><span className="ok-dot" />Logged &middot; within policy</div>
                      </div>
                    </div>
                  </div>

                  <div className="typing">
                    <span className="agent-mark is-working t-mark" />
                    <span className="typing-t agent-status is-working">MambaHR is updating the payroll record&hellip;</span>
                  </div>
                </div>

                <div className="sw-composer">
                  <span>Message #people-ops</span>
                  <span className="send" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8l12-5-5 12-2-5-5-2z" fill="currentColor" /></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ch {
          background: var(--bg-warm);
          padding-block: clamp(80px, 10vw, 128px);
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
          color: var(--gold);
          margin: 0 0 18px;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(26px, 2.6vw, 34px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text);
          margin: 0;
        }
        .em {
          background: var(--grad);
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

        /* ---- Slack window ---- */
        .points { list-style: none; margin: 30px 0 0; padding: 0; display: grid; }
        .points li { display: grid; grid-template-columns: 28px 1fr; gap: 14px; align-items: start; padding: 16px 0; border-top: 1px solid var(--border-faint); }
        .points li:last-child { border-bottom: 1px solid var(--border-faint); }
        .points b { display: block; font-size: 15px; font-weight: 600; color: var(--text); }
        .points div span { font-size: 14.5px; color: var(--text-muted); line-height: 1.5; }
        .pt-i { width: 24px; height: 24px; margin-top: 1px; }
        .pt-m { display: grid; place-items: center; }
        .pt-ok { position: relative; border-radius: 50%; background: var(--color-green); }
        .pt-ok::after { content: ''; position: absolute; left: 9px; top: 5px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .stage {
          position: relative;
          isolation: isolate;
          padding: clamp(28px, 4vw, 56px);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 40px 80px -40px rgba(90, 60, 120, 0.45);
        }
        .field { position: absolute; inset: 0; z-index: -1; background: linear-gradient(150deg, #efcfae 0%, #e0aab6 34%, #ae9de6 68%, #7364cc 100%); }
        .field i { position: absolute; border-radius: 50%; filter: blur(50px); }
        .fa { width: 70%; height: 70%; left: -20%; top: -25%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .fb { width: 60%; height: 70%; right: -20%; bottom: -30%; background: radial-gradient(circle, rgba(106, 91, 196, 0.85), transparent 70%); }
        .fg { inset: 0; border-radius: 0; filter: none; background-image: ${GRAIN}; background-size: 220px; opacity: 0.35; mix-blend-mode: overlay; }
        .sw {
          position: relative;
          border-radius: 14px;
          background: var(--bg-card);
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
          background: var(--bg-card);
          border-radius: var(--radius-full);
          box-shadow: inset 0 0 0 1px var(--border);
          padding: 3px 12px;
          margin: 0 auto;
          flex: 0 1 240px;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
        .sw-body { display: grid; grid-template-columns: 188px 1fr; min-height: 384px; }
        /* Slack in its light theme */
        .sw-side {
          background: #F7F2F8;
          border-right: 1px solid rgba(29, 28, 29, 0.08);
          padding: 14px 10px;
        }
        .sw-ws {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 14px;
          color: #1D1C1D;
          padding: 4px 8px 12px;
          border-bottom: 1px solid rgba(29, 28, 29, 0.1);
          margin-bottom: 10px;
        }
        .sw-ws svg { color: rgba(29, 28, 29, 0.45); }
        .sw-sec {
          font-size: 12px;
          color: rgba(29, 28, 29, 0.72);
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
          color: rgba(29, 28, 29, 0.78);
          font-size: 14px;
          cursor: pointer;
        }
        .hash { color: rgba(29, 28, 29, 0.66); font-weight: 600; }
        .sw-ch.on {
          background: #E8DDF1;
          color: #3D2A55;
          font-weight: 600;
        }
        .sw-ch.on .hash { color: #3D2A55; }
        .sw-dm .seg {
          width: 9px;
          height: 9px;
          border-radius: 3px;
          border: 1.5px solid rgba(29, 28, 29, 0.35);
        }
        .sw-dm .seg.green { background: #2EB67D; border-color: transparent; }
        .sw-dm:first-of-type { color: #1D1C1D; }
        .sw-dm .badge {
          margin-left: auto;
          background: #E01E5A;
          color: #fff;
          font-size: 12px;
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
        /* The MambaHR app icon: the gold M on a dark square. */
        .av.app {
          background: #0c0c0b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m-body { min-width: 0; }
        .m-h { display: flex; align-items: baseline; gap: 8px; }
        .m-h b { font-size: 14px; color: var(--text); font-weight: 700; }
        .m-h time { font-size: 12px; color: var(--text-faint); }
        .apptag {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: var(--bg-elevated);
          border-radius: 4px;
          padding: 1px 5px;
        }
        .m-t { font-size: 14px; line-height: 1.5; color: var(--text); margin-top: 3px; }
        .mention { color: var(--violet); background: var(--violet-soft); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 9px;
          border: 1px solid var(--border-faint);
          background: #FAF7F2;
          border-radius: 12px;
          padding: 12px 14px;
          max-width: 380px;
        }
        .a-row { display: flex; justify-content: space-between; gap: 16px; padding: 3px 0; }
        .a-k { font-size: 13px; color: var(--text-faint); }
        .a-v { font-size: 13px; color: var(--text); font-weight: 600; }
        .a-foot {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 9px;
          padding-top: 9px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-faint);
        }
        .ok-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
        .mono { font-family: var(--font-mono); font-size: 12px; }
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
          background: var(--bg-card);
          border: 1px solid var(--border-mid);
          border-radius: 7px;
          padding: 7px 16px;
          cursor: pointer;
        }
        .acts-ctx { font-size: 12px; color: var(--text-faint); margin-left: 4px; }
        .typing {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px 0;
        }
        .t-mark { --am-size: 20px; }
        .typing-t { font-size: 12.5px; }
        .reacts { margin-left: auto; align-self: flex-start; }
        .re {
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg-card);
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
          font-size: 14px;
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
