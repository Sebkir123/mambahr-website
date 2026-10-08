'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import { ChatThread } from '@/components/mockups'
import { MambaMark } from '@/components/mamba-mark'

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
          <span className="sw-dm first"><span className="seg green" />MambaHR<span className="badge">1</span></span>
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
              <img className="av" src="/avatars/dave.jpg" alt="Dave Buchanan" width={36} height={36} />
              <div className="m-body">
                <div className="m-h"><b>Dave Buchanan</b><time>9:02 AM</time></div>
                <div className="m-t"><span className="mention">@MambaHR</span> what&rsquo;s our parental leave policy?</div>
              </div>
            </div>

            <div className="m">
              <div className="av app"><MambaMark size={22} color="#C9A26C" /></div>
              <div className="m-body">
                <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:02 AM</time></div>
                <div className="m-t">16 weeks, fully paid, for every new parent, birth, adoption, or foster.</div>
                <div className="attach">
                  <div className="a-row"><span className="a-k">Paid leave</span><span className="a-v">16 weeks at 100%</span></div>
                  <div className="a-row"><span className="a-k">Eligibility</span><span className="a-v">Day one, all employees</span></div>
                </div>
                <div className="ui-sources srcs"><b>Based on</b><span>Parental Leave Policy &sect; 2.1</span><span>Your handbook</span></div>
              </div>
            </div>

            <div className="m">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="av" src="/avatars/priya.jpg" alt="Jordan Lee" width={36} height={36} />
              <div className="m-body">
                <div className="m-h"><b>Jordan Lee</b><time>9:11 AM</time></div>
                <div className="m-t"><span className="mention">@MambaHR</span> How many unused vacation days do I have, and does our policy let me carry them over?</div>
              </div>
            </div>

            <div className="m">
              <div className="av app"><MambaMark size={22} color="#C9A26C" /></div>
              <div className="m-body">
                <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:11 AM</time></div>
                <div className="m-t">You have 9 days left, and up to 5 carry over. Policy attached.</div>
                <div className="attach">
                  <div className="a-row"><span className="a-k">Balance</span><span className="a-v">9 days &middot; up to date</span></div>
                  <div className="a-row"><span className="a-k">Carry over</span><span className="a-v">Up to 5 days</span></div>
                </div>
                <div className="ui-sources srcs"><b>Based on</b><span>Time-off policy &sect; 4.2</span><span>Leave balance</span></div>
              </div>
            </div>

            <div className="typing">
              <span className="agent-mark is-working t-mark" aria-hidden="true" />
              <span className="typing-t agent-status is-working">MambaHR is filing the letter&hellip;</span>
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

      <style jsx>{`
        .sw {
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          box-shadow: var(--shadow-float);
          overflow: hidden;
          font-size: 13px;
        }
        .sw-bar {
          height: 38px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 14px;
          background: var(--bg-surface);
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
        .sw-body { display: grid; grid-template-columns: 178px 1fr; position: relative; z-index: 0; }
        /* Slack in its light theme */
        .sw-side { background: #F7F2F8; border-right: 1px solid rgba(29, 28, 29, 0.08); padding: 14px 10px; }
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
        .sw-sec { font-size: 12px; color: rgba(29, 28, 29, 0.72); padding: 10px 8px 5px; letter-spacing: 0.02em; }
        .sw-ch,
        .sw-dm {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 8px;
          border-radius: 6px;
          color: rgba(29, 28, 29, 0.78);
          font-size: 14px;
        }
        .hash { color: rgba(29, 28, 29, 0.66); font-weight: 600; }
        .sw-ch.on { background: #E8DDF1; color: #3D2A55; font-weight: 600; }
        .sw-ch.on .hash { color: #3D2A55; }
        .sw-dm .seg { width: 9px; height: 9px; border-radius: 3px; border: 1.5px solid rgba(29, 28, 29, 0.35); }
        .sw-dm .seg.green { background: #2EB67D; border-color: transparent; }
        .sw-dm.first { color: #1D1C1D; font-weight: 600; }
        .sw-dm .badge {
          margin-left: auto;
          background: #E01E5A;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          border-radius: var(--radius-full);
          padding: 1px 7px;
        }
        .sw-main { display: flex; flex-direction: column; min-width: 0; }
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
          border-radius: var(--radius-full);
          padding: 2px 9px;
        }
        .sw-feed { padding: 16px 20px 6px; display: flex; flex-direction: column; gap: 16px; flex: 1; }
        .m { display: flex; gap: 11px; }
        .av { width: 36px; height: 36px; border-radius: 9px; object-fit: cover; flex: none; }
        /* The MambaHR app icon in Slack: the gold M on a dark square. */
        .av.app {
          background: #0C0C0B;
          border-radius: var(--radius-sm);
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
          background: var(--bg-cream);
          border-radius: var(--radius-sm);
          padding: 1px 6px;
        }
        .m-t { font-size: 14px; line-height: 1.45; color: var(--text); margin-top: 2px; }
        .mention { color: var(--violet); background: var(--violet-soft); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 9px;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          max-width: 400px;
        }
        .a-row { display: flex; justify-content: space-between; gap: 16px; padding: 3px 0; }
        .a-row + .a-row { border-top: 1px solid var(--border-faint); }
        .a-k { font-size: 13px; color: var(--text-faint); }
        .a-v { font-size: 13px; color: var(--text); font-weight: 600; text-align: right; }
        .srcs { margin-top: 9px; }
        .typing { display: flex; align-items: center; gap: 9px; padding: 2px 0 0; }
        .t-mark { --am-size: 20px; }
        .typing-t { font-size: 12.5px; }
        .sw-composer {
          margin: 8px 18px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-mid);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          color: var(--text-faint);
          font-size: 14px;
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

/* ── Big photo + floating mini-card ── */
function TeamPhoto() {
  return (
    <div className="tp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/team.jpg" alt="A team at work, no HR portal in sight" />
      <div className="float">
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR &middot; working</span>
        <div className="f-l">Questions answered in Slack, policy cited</div>
      </div>
      <style jsx>{`
        .tp { position: relative; max-width: 560px; margin: 0 auto; }
        .photo {
          width: 100%;
          display: block;
          border-radius: var(--radius-lg);
          object-fit: cover;
          aspect-ratio: 4 / 3;
          box-shadow: var(--shadow-float);
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: 26px;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 14px 20px;
          box-shadow: var(--shadow-float);
        }
        .f-l { font-size: 13px; color: var(--text-muted); margin-top: 8px; max-width: 180px; }
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

      <main id="main">

      <PageHero
        eyebrow="Ask in Slack"
        title={<>Ask in Slack. <Em>The admin gets done.</Em></>}
        lead="Your team writes @MambaHR in Slack or the app. MambaHR reads the request, checks your policy and the law, does the task, and shows you what it did."
      >
        <SlackWindow />
      </PageHero>

      <AgentLoop
        eyebrow="Behind every reply"
        title={<>What happens to every message</>}
        lead="Every request follows the same steps, from a quick policy question to a new hire’s first day."
        steps={[
          { n: '01', label: 'Reads the request and who sent it', desc: 'It knows who is asking, their role, their manager, and what was already said.', who: 'agent', time: '< 1s', img: '/avatars/dave.jpg' },
          { n: '02', label: 'Checks your policy and the law', desc: 'Your handbook first, then the rules for the state where the person works.', who: 'agent', time: '2s' },
          { n: '03', label: 'Does the task', desc: 'Books the time off, files the letter, updates the record.', who: 'agent', time: 'seconds', img: '/avatars/priya.jpg' },
          { n: '04', label: 'Replies with what it did', desc: 'Not just “done”: what changed, which rule applied, and where it is filed.', who: 'agent' },
          { n: '05', label: 'The big calls come to you first', desc: 'Offers above your pay range, terminations, and raises above your limit are always decided by a person.', who: 'you', img: '/avatars/anna.jpg' },
          { n: '06', label: 'Logs everything', desc: 'Every action is saved in one record, so you can always see what happened.', who: 'agent' },
        ]}
      />

      <FeatureSplit
        eyebrow="Slack and the app"
        title={<>One MambaHR, one record, wherever you ask</>}
        lead="Ask in Slack or in the MambaHR app. It is one system with one record. Start in Slack, approve in the app, and nothing gets lost."
        bullets={[
          'Mention it in any channel or direct message and it reads the whole thread',
          'Start in Slack, finish in the app, and the context comes with you',
          'One record of everything, wherever it was asked',
        ]}
      >
        <div className="mock-card"><ChatThread /></div>
      </FeatureSplit>

      <FeatureSplit
        flip
        warm
        eyebrow="Nothing to roll out"
        title={<>No training. No new logins.</>}
        lead="No new portal for employees to forget the password to. They send a message the way they already do, and the task gets done."
        bullets={[
          'Employees ask in Slack, with nothing new to log in to',
          'Managers approve from where they already work',
          'Your data imports in a day',
        ]}
      >
        <TeamPhoto />
      </FeatureSplit>

      <StatTrio
        stats={[
          { n: 9, suffix: 's', label: 'to an answer in a sample run, with the details attached' },
          { n: 0, label: 'new logins for your employees: they ask in Slack' },
          { n: 100, suffix: '%', label: 'of actions logged with the rule followed' },
        ]}
      />


      <PageCta title={<>See it do the work, <Em>live.</Em></>} sub="A 30-minute demo using your own Slack questions. Then we import your data and switch you over." />
      </main>

      <Footer />
    </>
  )
}
