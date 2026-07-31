'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: a realistic Slack window, policy answer + letter receipt ── */
function SlackWindow() {
  return (
    <div className="sw agent-edge agent-working agent-lg">
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
          <span className="sw-ch on"><span className="hash">#</span>people-ops</span>
          <span className="sw-ch"><span className="hash">#</span>hiring</span>
          <span className="sw-ch"><span className="hash">#</span>benefits</span>
          <div className="sw-sec">Direct messages</div>
          <span className="sw-dm first"><span className="seg green" />MambaHR<span className="badge">1</span></span>
          <span className="sw-dm"><span className="seg" />Brian Bell</span>
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
              <img className="av" src="/avatars/dave.jpg" alt="Dave Buchanan" width={36} height={36} />
              <div className="m-body">
                <div className="m-h"><b>Dave Buchanan</b><time>9:02 AM</time></div>
                <div className="m-t"><span className="mention">@MambaHR</span> what&rsquo;s our parental leave policy?</div>
              </div>
            </div>

            <div className="m">
              <div className="av app">M</div>
              <div className="m-body">
                <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:02 AM</time></div>
                <div className="m-t">16 weeks, fully paid, for every new parent, birth, adoption, or foster.</div>
                <div className="attach">
                  <div className="a-row"><span className="a-k">Paid leave</span><span className="a-v">16 weeks at 100%</span></div>
                  <div className="a-row"><span className="a-k">Eligibility</span><span className="a-v">Day one, all employees</span></div>
                  <div className="a-row"><span className="a-k">Source</span><span className="a-v">Parental Leave Policy &sect; 2.1</span></div>
                  <div className="a-foot"><span className="ok-dot" />Answered from your handbook &middot; ref <span className="mono">pol_8c21e4</span></div>
                </div>
              </div>
            </div>

            <div className="m">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="av" src="/avatars/priya.jpg" alt="Jordan Lee" width={36} height={36} />
              <div className="m-body">
                <div className="m-h"><b>Jordan Lee</b><time>9:11 AM</time></div>
                <div className="m-t"><span className="mention">@MambaHR</span> I need an employment verification letter for my mortgage</div>
              </div>
            </div>

            <div className="m">
              <div className="av app">M</div>
              <div className="m-body">
                <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:11 AM</time></div>
                <div className="m-t">Done. Sent to her email and filed.</div>
                <div className="attach">
                  <div className="a-row"><span className="a-k">Letter</span><span className="a-v">Employment verification, signed</span></div>
                  <div className="a-row"><span className="a-k">Sent to</span><span className="a-v">jordan@company.com</span></div>
                  <div className="a-foot"><span className="ok-dot" />Logged &middot; filed to her record &middot; ref <span className="mono">doc_2b94f7</span></div>
                </div>
              </div>
            </div>

            <div className="typing">
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              <span className="typing-t"><b>MambaHR</b> is filing the letter&hellip;</span>
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

      <style jsx>{`
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
          min-width: 200px;
          text-align: center;
        }
        .sw-body { display: grid; grid-template-columns: 178px 1fr; }
        .sw-side { background: #3F0E40; padding: 14px 10px; }
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
        .sw-sec { font-size: 11px; color: rgba(255, 255, 255, 0.55); padding: 10px 8px 5px; letter-spacing: 0.02em; }
        .sw-ch,
        .sw-dm {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 8px;
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 13.5px;
        }
        .hash { color: rgba(255, 255, 255, 0.5); font-weight: 600; }
        .sw-ch.on { background: #1164A3; color: #fff; font-weight: 600; }
        .sw-ch.on .hash { color: rgba(255, 255, 255, 0.85); }
        .sw-dm .seg { width: 9px; height: 9px; border-radius: 3px; border: 1.5px solid rgba(255, 255, 255, 0.45); }
        .sw-dm .seg.green { background: #2EB67D; border-color: transparent; }
        .sw-dm.first { color: #fff; font-weight: 600; }
        .sw-dm .badge {
          margin-left: auto;
          background: #E01E5A;
          color: #fff;
          font-size: 10.5px;
          font-weight: 700;
          border-radius: 999px;
          padding: 1px 7px;
        }
        .sw-main { display: flex; flex-direction: column; }
        .sw-head { display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--border); }
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
        .sw-feed { padding: 16px 20px 6px; display: flex; flex-direction: column; gap: 16px; flex: 1; }
        .m { display: flex; gap: 11px; }
        .av { width: 36px; height: 36px; border-radius: 9px; object-fit: cover; flex: none; }
        .av.app {
          background: #1A1A19;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 19px;
        }
        .m-body { min-width: 0; }
        .m-h { display: flex; align-items: baseline; gap: 8px; }
        .m-h b { font-size: 13.5px; color: var(--text); font-weight: 700; }
        .m-h time { font-size: 11px; color: var(--text-faint); }
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
        .m-t { font-size: 13.5px; line-height: 1.45; color: var(--text); margin-top: 2px; }
        .mention { color: #6A5DA6; background: rgba(106, 93, 166, 0.1); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 8px;
          border-left: 3px solid var(--gold);
          background: #FAF6EF;
          border-radius: 0 10px 10px 0;
          padding: 10px 13px;
          max-width: 440px;
        }
        .a-row { display: flex; justify-content: space-between; gap: 16px; padding: 2.5px 0; }
        .a-k { font-size: 12px; color: var(--text-faint); }
        .a-v { font-size: 12px; color: var(--text); font-weight: 600; text-align: right; }
        .a-foot {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--border);
          font-size: 11px;
          color: var(--text-faint);
        }
        .ok-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); flex: none; }
        .mono { font-family: var(--font-mono); font-size: 10.5px; }
        .typing { display: flex; align-items: center; gap: 4px; padding: 2px 0 0; }
        .typing-t { font-size: 12px; color: var(--text-faint); margin-left: 7px; }
        .typing-t b { color: var(--violet); font-weight: 600; }
        .sw-composer {
          margin: 8px 18px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-mid);
          border-radius: 10px;
          padding: 10px 14px;
          color: var(--text-faint);
          font-size: 13.5px;
        }
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
        @media (max-width: 520px) {
          .sw-side { display: none; }
          .sw-body { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

/* ── Dual-surface fragment: the same request in Slack and in the app ── */
function DualSurface() {
  return (
    <div className="tri">
      <div className="card slack agent-edge agent-done">
        <div className="c-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/slack-new-logo.svg" alt="Slack" width={14} height={14} />
          <span>Slack &middot; #people-ops</span>
        </div>
        <div className="c-msg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="c-av" src="/avatars/maya.jpg" alt="Maya Chen" width={28} height={28} />
          <div>
            <div className="c-who"><b>Maya Chen</b><time>9:14 AM</time></div>
            <div className="c-t"><span className="mention">@MambaHR</span> Maya &middot; 3 days off</div>
          </div>
        </div>
        <div className="c-foot"><span className="ok" />Approved &middot; calendar blocked</div>
      </div>

      <div className="card app">
        <div className="c-head app-h">
          <span className="dots3"><i /><i /><i /></span>
          <span className="addr">app.mambahr.com</span>
        </div>
        <div className="c-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="c-av round" src="/avatars/maya.jpg" alt="Maya Chen" width={28} height={28} />
          <div className="c-main">
            <div className="c-t"><b>Maya &middot; 3 days off</b></div>
            <div className="c-sub">Time off &middot; Apr 7&ndash;9 &middot; within policy</div>
          </div>
          <span className="pill">Approved</span>
        </div>
        <div className="c-foot"><span className="ok" />One record &middot; ref <span className="mono">leave_4f81a2</span></div>
      </div>

      <style jsx>{`
        .tri { display: flex; flex-direction: column; max-width: 480px; margin: 0 auto; }
        .card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          font-size: 13px;
        }
        .card.slack { transform: translateX(-18px); z-index: 3; position: relative; }
        .card.app { transform: translateX(18px); margin-top: -10px; z-index: 1; position: relative; box-shadow: var(--shadow-float); }
        .c-head {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .c-head.app-h { gap: 10px; }
        .dots3 { display: flex; gap: 5px; }
        .dots3 i { width: 8px; height: 8px; border-radius: 999px; background: #e3ddd6; display: block; }
        .dots3 i:first-child { background: #f0a59a; }
        .dots3 i:nth-child(2) { background: #f4ce8e; }
        .dots3 i:nth-child(3) { background: #a9cfa6; }
        .addr {
          margin: 0 auto;
          font-size: 11px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2px 12px;
        }
        .c-msg { display: flex; gap: 10px; padding: 12px 14px 4px; }
        .c-av { width: 28px; height: 28px; border-radius: 7px; object-fit: cover; flex: none; }
        .c-av.round { border-radius: 999px; }
        .c-who { display: flex; align-items: baseline; gap: 7px; }
        .c-who b { font-size: 12.5px; color: var(--text); }
        .c-who time { font-size: 10.5px; color: var(--text-faint); }
        .c-t { font-size: 13px; color: var(--text); margin-top: 2px; }
        .mention { color: #6A5DA6; background: rgba(106, 93, 166, 0.1); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .c-bubble {
          margin-top: 4px;
          display: inline-block;
          background: #F1F0FA;
          border-radius: 4px 12px 12px 12px;
          padding: 6px 11px;
          font-size: 12.5px;
          color: var(--text);
        }
        .c-row { display: flex; align-items: center; gap: 10px; padding: 12px 14px 4px; }
        .c-main { flex: 1; min-width: 0; }
        .c-sub { font-size: 11.5px; color: var(--text-faint); margin-top: 2px; }
        .pill {
          flex: none;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--color-green);
          background: rgba(22, 130, 80, 0.08);
          border-radius: 999px;
          padding: 4px 11px;
        }
        .c-foot {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px 11px;
          font-size: 11px;
          color: var(--text-faint);
        }
        .ok { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); flex: none; }
        .mono { font-family: var(--font-mono); font-size: 10.5px; }
        @media (max-width: 560px) {
          .card.slack, .card.app { transform: none; }
        }
      `}</style>
    </div>
  )
}

/* ── Big photo + floating mini-card ── */
function TeamPhoto() {
  return (
    <div className="tp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/team.jpg" alt="A team at work, no HR portal in sight" />
      <div className="float">
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR &middot; working</span>
        <div className="f-n"><span data-count="847">847</span></div>
        <div className="f-l">questions answered this quarter</div>
      </div>
      <style jsx>{`
        .tp { position: relative; max-width: 560px; margin: 0 auto; }
        .photo {
          width: 100%;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          box-shadow: var(--shadow-float);
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: 26px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: var(--shadow-float);
        }
        .f-n {
          font-family: var(--font-serif);
          font-size: 34px;
          line-height: 1;
          margin-top: 10px;
          background: linear-gradient(110deg, #8A6535, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .f-l { font-size: 12px; color: var(--text-faint); margin-top: 4px; max-width: 160px; }
        @media (max-width: 880px) {
          .float { right: 8px; }
        }
      `}</style>
    </div>
  )
}

export default function MambaPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />

      <main>

      <PageHero
        eyebrow="The AI agent"
        title={<>Not a tool. <Em>A hire.</Em></>}
        lead="Your team messages @MambaHR like a person. It reads the thread, checks your policy, does the work, and logs it, in Slack or the MambaHR app."
        photo="/v2-people/sofia.jpg"
        photoChip="MambaHR · done"
        photoCaption="Letter sent · filed · 9:11 AM"
      >
        <SlackWindow />
      </PageHero>

      <AgentLoop
        eyebrow="Behind every reply"
        title={<>What happens to <Em>every message</Em></>}
        lead="Each request runs the same loop, whether it’s a quick policy question or a new hire’s first day."
        steps={[
          { n: '01', label: 'Reads the thread, and the person', desc: 'It knows who’s asking, their role, their manager, and what was already said.', who: 'agent', time: '< 1s', img: '/avatars/dave.jpg' },
          { n: '02', label: 'Checks your policy and the law', desc: 'Your handbook first, then the rules for the state the person works in.', who: 'agent', time: '2s' },
          { n: '03', label: 'Does the work', desc: 'Books the time off, files the letter, updates the record, schedules what needs scheduling.', who: 'agent', time: 'seconds', img: '/avatars/priya.jpg' },
          { n: '04', label: 'Answers with the receipt attached', desc: 'Not just “done”, what changed, which rule applied, and where it’s filed.', who: 'agent' },
          { n: '05', label: 'The big calls come to you first', desc: 'Offers above band, terminations, comp above your threshold, always a human decision.', who: 'you', img: '/avatars/anna.jpg' },
          { n: '06', label: 'Logs it all', desc: 'Every action lands in one record, so there’s never a question about what happened.', who: 'agent' },
        ]}
      />

      <FeatureSplit
        eyebrow="Every channel"
        title={<>Same brain, <Em>every door</Em></>}
        lead="Slack and the MambaHR app, one agent, one memory, one record. Ask in Slack, approve in the app, and nothing gets lost in between."
        bullets={[
          'Mention it in any channel or DM, it picks up the whole thread',
          'Start in Slack, finish in the app, the context follows',
          'One record of everything, no matter where it was asked',
        ]}
      >
        <DualSurface />
      </FeatureSplit>

      <FeatureSplit
        flip
        warm
        eyebrow="Zero rollout"
        title={<>Zero training. <Em>Zero logins.</Em></>}
        lead="No training. No new logins. No portal your employees will forget the password to. They message the way they already message, and the work gets done."
        bullets={[
          'Employees never log into anything new',
          'Managers approve from wherever they already are',
          'Live in a day, not a quarter',
        ]}
      >
        <TeamPhoto />
      </FeatureSplit>

      <StatTrio
        stats={[
          { n: 9, suffix: 's', label: 'median answer, with receipt' },
          { n: 24, suffix: '/7', label: 'answering while your team is off the clock' },
          { n: 100, suffix: '%', label: 'of actions logged with the rule followed' },
        ]}
      />

      <QuoteBand
        quote="By week two, MambaHR had taken leave and onboarding off my desk completely."
        role="Head of People · Robotics startup, 240 people"
        img="/v2-people/feat.jpg"
        metric="Saved 12 hrs / week"
      />

      <PageCta title={<>Meet your next <Em>team member.</Em></>} />
      </main>

      <Footer />
    </>
  )
}
