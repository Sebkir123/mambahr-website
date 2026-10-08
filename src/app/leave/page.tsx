'use client'

import { MambaMark } from '@/components/mamba-mark'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: the Slack exchange, done in seconds ── */
function SlackApprovalCard() {
  return (
    <div className="sac">
      <div className="bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="chn"><span className="hash">#</span>people-ops</span>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done in seconds</span>
      </div>
      <div className="feed">
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
          {/* The MambaHR app icon in Slack: the gold M on a dark square. */}
          <div className="av app" aria-hidden="true"><MambaMark size={22} color="#C9A26C" /></div>
          <div className="m-body">
            <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:14 AM</time></div>
            <div className="m-t">Approved. Enjoy the wedding.</div>
            <div className="attach">
              <div className="a-row"><span className="a-k">Balance</span><span className="a-v">12 &rarr; 9 days</span></div>
              <div className="a-row"><span className="a-k">Record</span><span className="a-v">Mon&ndash;Wed booked, pay record updated</span></div>
              <div className="a-row"><span className="a-k">Manager</span><span className="a-v">B. Bell notified</span></div>
              <div className="a-foot"><span className="ok-dot" aria-hidden="true" />Within policy &middot; logged</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sac {
          background: var(--bg-card);
          border-radius: 14px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots i { width: 10px; height: 10px; border-radius: var(--radius-full); background: #e3ddd6; display: block; }
        .dots i:first-child { background: #f0a59a; }
        .dots i:nth-child(2) { background: #f4ce8e; }
        .dots i:nth-child(3) { background: #a9cfa6; }
        .chn { font-weight: 700; font-size: 14px; color: var(--text); }
        .hash { color: var(--text-faint); margin-right: 1px; }
        .bar :global(.mamba-chip) { margin-left: auto; }
        .feed { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 20px; }
        .m { display: flex; gap: 11px; }
        .av { width: 38px; height: 38px; border-radius: 9px; object-fit: cover; flex: none; }
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
          background: var(--bg-surface);
          border-radius: var(--radius-xs);
          padding: 1px 5px;
        }
        .m-t { font-size: 14px; line-height: 1.5; color: var(--text); margin-top: 3px; }
        .mention { color: var(--violet); background: var(--violet-soft); border-radius: var(--radius-xs); padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 9px;
          border: 1px solid var(--border-faint);
          background: var(--bg-surface);
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
        .ok-dot { width: 7px; height: 7px; border-radius: var(--radius-full); background: var(--green); }
        @media (max-width: 520px) { .bar :global(.mamba-chip) { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: the hard leave, answered with the law ── */
function ParentalLeaveCard() {
  return (
    <div className="plc agent-edge agent-done agent-lg">
      <div className="ask">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/violet.jpg" alt="" width={36} height={36} />
        <div className="bubble">
          <div className="m-who">Violet Hayes · California</div>
          <div className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</div>
        </div>
      </div>
      <div className="reply">
        <span className="r-who"><span className="agent-mark r-mark" aria-hidden="true" />MambaHR <em>6 seconds later</em></span>
        <p className="a">Up to 12 weeks of job-protected family leave (FMLA).</p>
        <p className="a-sub">California&rsquo;s own leave rules (CFRA and PDL) cited and sent to your HR lead to confirm how they combine.</p>
        <div className="ui-sources"><b>Based on</b><span>CA PDL</span><span>CA CFRA</span><span>FMLA</span></div>
      </div>
      <style jsx>{`
        .plc {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: clamp(22px, 3vw, 30px);
          box-shadow: var(--shadow-float);
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .ask { display: flex; gap: 12px; align-items: flex-end; justify-content: flex-end; }
        .av { width: 36px; height: 36px; border-radius: var(--radius-full); object-fit: cover; flex: none; order: 2; }
        .bubble {
          background: #EFEAE1;
          border-radius: 20px 20px 6px 20px;
          padding: 12px 16px;
          max-width: 86%;
        }
        .m-who { font-size: 12px; font-weight: 500; color: var(--text-muted); }
        .q {
          font-family: var(--font-serif);
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-top: 4px;
        }
        .reply { display: grid; gap: 8px; }
        .r-who { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text); }
        .r-mark { --am-size: 24px; }
        .r-who em { font-style: normal; font-weight: 400; color: var(--text-faint); }
        .a { margin: 0; font-size: 17px; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; color: var(--text); }
        .a-sub { margin: 0; font-size: 14px; line-height: 1.5; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: team photo + coverage mini-card ── */
function VacationPhoto() {
  return (
    <div className="vp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/team2.jpg" alt="A team that takes its vacations" />
      <div className="mini agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="mini-t">3 out next week · covered</div>
        <div className="mini-s">Balances updated · managers told</div>
      </div>
      <style jsx>{`
        .vp { position: relative; }
        .photo {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--radius-lg);
          object-fit: cover;
          aspect-ratio: 5 / 4;
          box-shadow: var(--shadow-float);
        }
        .mini {
          position: absolute;
          left: -18px;
          bottom: 26px;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 14px 16px;
          box-shadow: var(--shadow-float);
          max-width: 250px;
        }
        .mini-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
        .mini-s { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) { .mini { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function LeavePage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Time off & leave"
          title={<>Time off, <Em>approved.</Em></>}
          lead={'Time-off requests that fit your policy are approved in seconds. For family and medical leave, MambaHR checks eligibility, cites the law, and prepares the payroll change.'}
          photo="/v2-people/sofia.jpg"
          photoChip="MambaHR · done"
          photoCaption="Maya approved · booked in 9s"
        >
          <SlackApprovalCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title={<>When someone <Em>asks.</Em></>}
          lead={'Every request follows the same steps. Simple ones finish in seconds. Leave covered by law gets a legal check. Only the unclear ones come to you.'}
          steps={[
            { n: '01', label: 'Reads the request', desc: 'In Slack or the MambaHR app. MambaHR picks up the dates, the reason, and who is asking.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '02', label: 'Checks balance and policy', desc: 'Days available, blackout dates, and notice rules, checked against your actual policy.', who: 'agent', time: 'seconds' },
            { n: '03', label: 'Checks federal family leave when it applies', desc: 'For parental or medical leave, MambaHR checks eligibility for federal family and medical leave (FMLA). It cites any state paid-leave program and asks a person to decide how they combine.', who: 'agent', time: 'seconds' },
            { n: '04', label: 'Updates the record and payroll', desc: 'The time off is recorded and the payroll change prepared, so pay is right.', who: 'agent', time: 'same minute' },
            { n: '05', label: 'Tells the manager', desc: 'A short note with the dates and coverage. No back-and-forth for requests within policy.', who: 'agent', time: 'same minute', img: '/avatars/anna.jpg' },
            { n: '06', label: 'The unclear cases', desc: 'Anything unclear comes to you, with the balance, the policy, and the relevant law laid out.', who: 'you', img: '/avatars/tom.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Family & medical leave"
          title={<>Family leave, <Em>checked.</Em></>}
          lead={'Parental and medical leave is where mistakes cost the most. MambaHR checks FMLA eligibility, cites the state program that applies, and shows the law behind every answer. The hard calls come to you with the research done.'}
          bullets={[
            'FMLA eligibility checked before anything is promised',
            'State paid leave cited, and a person decides how it combines with federal leave',
            'Every answer names the law it followed',
            'The risky calls go to a person, with the research done',
          ]}
        >
          <ParentalLeaveCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Balances and coverage"
          title={<>Vacations, <Em>taken.</Em></>}
          lead={'Balances are always up to date, requests within your policy can be approved in seconds, and the team can see who is away.'}
          bullets={[
            'Balances always current, no spreadsheet to check',
            'Team coverage visible before anyone says yes',
            'Quick approvals, so people can book the trip',
          ]}
        >
          <VacationPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 9, suffix: 's', label: 'to approve a time-off request in a sample run' },
            { n: 1, label: 'law cited on every leave answer' },
            { n: 0, label: 'leave letters to write from scratch. Drafts arrive ready for review.' },
          ]}
        />


        <PageCta title={<>Time off that takes <Em>none of your time.</Em></>} sub="A 30-minute demo using your own leave policy. Then we import your balances and switch you over." />
      </main>
      <Footer />
    </>
  )
}
