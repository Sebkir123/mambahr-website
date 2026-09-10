'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: the Slack exchange, done in seconds ── */
function SlackApprovalCard() {
  return (
    <div className="sac agent-edge agent-done agent-lg">
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
          <div className="av app" aria-hidden="true">M</div>
          <div className="m-body">
            <div className="m-h"><b>MambaHR</b><span className="apptag">APP</span><time>9:14 AM</time></div>
            <div className="m-t">Approved. Enjoy the wedding.</div>
            <div className="attach">
              <div className="a-row"><span className="a-k">Balance</span><span className="a-v">12 &rarr; 9 days</span></div>
              <div className="a-row"><span className="a-k">Record</span><span className="a-v">Mon&ndash;Wed booked, payday updated</span></div>
              <div className="a-row"><span className="a-k">Manager</span><span className="a-v">B. Bell notified</span></div>
              <div className="a-foot"><span className="ok-dot" aria-hidden="true" />Within policy &middot; logged &middot; ref <span className="mono">leave_4f81a2</span></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sac {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots i { width: 10px; height: 10px; border-radius: 999px; background: #e3ddd6; display: block; }
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
          background: var(--ink);
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
        .m-h time { font-size: 12px; color: var(--text-faint); }
        .apptag {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: var(--bg-surface);
          border-radius: 4px;
          padding: 1px 5px;
        }
        .m-t { font-size: 14px; line-height: 1.5; color: var(--text); margin-top: 3px; }
        .mention { color: var(--violet); background: rgba(106, 93, 166, 0.1); border-radius: 4px; padding: 0 4px; font-weight: 600; }
        .attach {
          margin-top: 9px;
          border-left: 3px solid var(--gold);
          background: #FAF6EF;
          border-radius: 0 10px 10px 0;
          padding: 12px 14px;
          max-width: 360px;
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
        @media (max-width: 520px) { .bar :global(.mamba-chip) { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: the hard leave, answered with the law ── */
function ParentalLeaveCard() {
  return (
    <div className="plc agent-edge agent-done agent-lg">
      <div className="msg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/violet.jpg" alt="" width={42} height={42} />
        <div className="m-body">
          <div className="m-who">Violet Hayes · California</div>
          <div className="q">&ldquo;I&rsquo;m having a baby in June. How much leave can I take?&rdquo;</div>
        </div>
      </div>
      <div className="msg reply">
        <div className="m-logo" aria-hidden="true">M</div>
        <div className="m-body">
          <div className="m-who">MambaHR <span className="m-time">6 seconds later</span></div>
          <div className="a">
            12 weeks of FMLA bonding leave, job protected.
            <span className="a-sub">California&rsquo;s own leave rules (CFRA and PDL) cited and sent to your HR lead to confirm how they combine.</span>
            <span className="laws">
              <span className="law">CA PDL</span>
              <span className="law">CA CFRA</span>
              <span className="law">FMLA</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .plc {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 34px);
          box-shadow: var(--shadow-float);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .msg { display: flex; gap: 14px; align-items: flex-start; }
        .av { width: 42px; height: 42px; border-radius: 999px; object-fit: cover; flex: none; }
        .m-logo {
          flex: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--ink);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 22px;
        }
        .m-body { min-width: 0; }
        .m-who {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
        }
        .m-time { text-transform: none; letter-spacing: 0; color: var(--color-green); margin-left: 6px; }
        .q {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2.2vw, 25px);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-top: 8px;
        }
        .a {
          margin-top: 10px;
          background: linear-gradient(160deg, #FFF2E6, #FBE6D6);
          border: 1px solid #E6D3BC;
          border-radius: 4px 16px 16px 16px;
          padding: 16px 18px;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .a-sub {
          display: block;
          margin-top: 6px;
          font-size: 14px;
          font-weight: 400;
          color: var(--text-muted);
        }
        .laws { display: flex; gap: 8px; margin-top: 12px; }
        .law {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--gold-dark);
          background: var(--bg);
          border: 1px solid rgba(138, 101, 53, 0.3);
          border-radius: 999px;
          padding: 4px 11px;
        }
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
      <div className="mini">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="mini-t">3 out next week · covered</div>
        <div className="mini-s">Calendars blocked · handoffs noted</div>
      </div>
      <style jsx>{`
        .vp { position: relative; }
        .photo {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          aspect-ratio: 5 / 4;
          box-shadow: var(--shadow-float);
        }
        .mini {
          position: absolute;
          left: -18px;
          bottom: 26px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
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
          lead={'Normal time off approves itself in seconds. Family and medical leave gets the eligibility check and the statute attached, with payday updated.'}
          photo="/v2-people/sofia.jpg"
          photoChip="MambaHR · done"
          photoCaption="Maya approved · booked in 9s"
        >
          <SlackApprovalCard />
        </PageHero>

        <AgentLoop
          eyebrow="The leave loop"
          title={<>When someone <Em>asks.</Em></>}
          lead={'Every request runs the same path. The easy ones finish in seconds, the regulated ones get the statute check, and only the ambiguous ones reach you.'}
          steps={[
            { n: '01', label: 'Reads the request', desc: 'Slack or the MambaHR app, MambaHR understands the dates, the reason, and who is asking.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '02', label: 'Checks balance and policy', desc: 'Accrued days, blackout dates, notice rules, checked against your actual policy, not a guess.', who: 'agent', time: 'seconds' },
            { n: '03', label: 'Checks federal family leave when it applies', desc: 'Parental or medical leave triggers the federal family and medical leave (FMLA) eligibility check. MambaHR cites the state paid-leave programs and sends them to a person to decide how they combine.', who: 'agent', time: 'seconds' },
            { n: '04', label: 'Updates the record and payday', desc: 'Coverage visible, and the pay record adjusted so payday is right without anyone touching it. Calendar blocked when Google or Microsoft 365 is connected.', who: 'agent', time: 'same minute' },
            { n: '05', label: 'Notifies the manager', desc: 'A clean note with dates and coverage, no approval ping-pong for in-policy requests.', who: 'agent', time: 'same minute', img: '/avatars/anna.jpg' },
            { n: '06', label: 'The edge cases', desc: 'Anything ambiguous comes to you, with the balance, the policy, and the relevant law already laid out.', who: 'you', img: '/avatars/tom.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Family & medical leave"
          title={<>The hard leave, <Em>handled.</Em></>}
          lead={'Parental and medical leave is where mistakes get expensive. MambaHR checks FMLA eligibility, cites the state program that applies, and attaches the statute to every answer. Legal gets the homework instead of a panicked call.'}
          bullets={[
            'FMLA eligibility checked before anything is promised',
            'State paid leave cited and sent to a person to decide how it combines with federal leave',
            'Every answer cites the law it followed',
            'The risky calls go to a person, with the homework done',
          ]}
        >
          <ParentalLeaveCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Balances and coverage"
          title={<>Vacations, <Em>taken.</Em></>}
          lead={'Balances are always current, in-policy requests approve in seconds, and who is away when is visible to the whole team.'}
          bullets={[
            'Balances always current, no “let me check the spreadsheet”',
            'Team coverage visible before anyone says yes',
            'Approvals in seconds, so people book the trip',
          ]}
        >
          <VacationPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 9, suffix: 's', label: 'to a time-off approval in the modeled run' },
            { n: 1, label: 'statute cited on every leave answer' },
            { n: 0, label: 'leave letters you had to draft from scratch, ready for review' },
          ]}
        />


        <PageCta title={<>Time off that takes <Em>none of yours.</Em></>} sub="A 30-minute demo on your own leave policy. Then we import your balances and switch you over." />
      </main>
      <Footer />
    </>
  )
}
