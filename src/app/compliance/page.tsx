'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: a real compliance question, answered with the law ── */
function HeroAnswerCard() {
  return (
    <div className="hc agent-edge agent-done agent-lg">
      <div className="hc-top">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · answered</span>
      </div>

      <div className="msg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/tom.jpg" alt="" width={42} height={42} />
        <div className="m-body">
          <div className="m-who">Tom · Texas</div>
          <div className="q">&ldquo;Can we ask about salary history in interviews?&rdquo;</div>
        </div>
      </div>

      <div className="msg">
        <div className="m-logo" aria-hidden="true">M</div>
        <div className="m-body">
          <div className="m-who">MambaHR <span className="m-time">4 seconds later</span></div>
          <div className="a">
            In 8 of your states, no.
            <span className="a-sub">State-by-state guidance attached, interview kits already updated.</span>
          </div>
          <div className="chips">
            <span className="chip">Pay transparency</span>
            <span className="chip">State law</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hc {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(24px, 3vw, 34px);
          box-shadow: var(--shadow-float);
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .hc-top { display: flex; justify-content: flex-end; }
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
          font-size: 11px;
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
          font-size: 13.5px;
          font-weight: 400;
          color: var(--text-muted);
        }
        .chips { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
        .chip {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gold-dark);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.25);
          border-radius: 999px;
          padding: 4px 10px;
        }
      `}</style>
    </div>
  )
}

/* ── Dark audit-log fragment ── */
function AuditLogCard() {
  const rows = [
    { t: '09:02:14', what: 'Leave approved', note: 'within policy · FMLA cited' },
    { t: '10:31:48', what: 'Offer routed', note: 'above band · sent to you first' },
    { t: '11:07:02', what: 'Policy updated', note: 'all 50 states current' },
    { t: '13:46:55', what: 'Question answered', note: 'pay transparency · statute attached' },
    { t: '15:12:30', what: 'Termination drafted', note: 'held for human sign-off' },
  ]
  return (
    <div className="log agent-edge agent-working agent-lg">
      <div className="l-head">
        <span className="l-title"><span className="logo" aria-hidden="true">M</span>Audit trail</span>
        <span className="l-sub">append-only · exportable</span>
      </div>
      {rows.map((r) => (
        <div key={r.t} className="l-row">
          <span className="ts">{r.t}</span>
          <span className="dot" aria-hidden="true" />
          <span className="what">{r.what}</span>
          <span className="note">{r.note}</span>
        </div>
      ))}
      <div className="l-foot">Every row: who, when, and the rule it followed.</div>
      <style jsx>{`
        .log {
          background:
            radial-gradient(80% 60% at 12% 0%, rgba(185, 138, 78, 0.22), transparent 58%),
            radial-gradient(70% 55% at 95% 10%, rgba(106, 93, 166, 0.26), transparent 60%),
            var(--ink);
          border-radius: 18px;
          padding: 26px 26px 22px;
          box-shadow: var(--shadow-float);
        }
        .l-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .l-title { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; color: #fff; }
        .logo {
          width: 24px;
          height: 24px;
          border-radius: 7px;
          background: #fff;
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 15px;
        }
        .l-sub {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.5);
        }
        .l-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          font-size: 14px;
        }
        .l-row + .l-row { border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .ts { flex: none; font-family: var(--font-mono); font-size: 11px; color: #AEA2E6; }
        .dot { flex: none; width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
        .what { flex: none; color: rgba(255, 255, 255, 0.94); font-weight: 600; }
        .note {
          flex: 1;
          min-width: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .l-foot {
          margin-top: 14px;
          padding: 11px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.65);
        }
        @media (max-width: 560px) { .note { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Warm photo + floating mini-card ── */
function SleepPhoto() {
  return (
    <div className="sp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team.jpg" alt="A team at work, unbothered by the latest law change" />
      <div className="mini agent-edge agent-done">
        <span className="m-check" aria-hidden="true" />
        <div>
          <div className="m-t">3 state updates applied</div>
          <div className="m-s">this month · policies current</div>
        </div>
      </div>
      <style jsx>{`
        .sp { position: relative; }
        .ph {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          box-shadow: var(--shadow-float);
        }
        .mini {
          position: absolute;
          left: clamp(-14px, -1.5vw, -20px);
          bottom: 26px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 13px 16px;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .m-check {
          flex: none;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: var(--color-green);
          position: relative;
        }
        .m-check::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 4px;
          width: 4px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .m-t { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .m-s { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-faint); margin-top: 2px; }
        @media (max-width: 880px) { .mini { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function CompliancePage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        <PageHero
          eyebrow="Compliance"
          title={<>Always <Em>compliant.</Em></>}
          lead="Employment law changes almost every week, and one miss costs more than a year of HR salaries. MambaHR keeps up, federal plus your states, cites the law behind every answer, and sends the risky calls to a human first."
          proof="Federal plus all 50 states"
          photo="/v2-people/feat.jpg"
          photoChip="MambaHR · answered"
          photoCaption="Tom’s question · cited in 4 seconds"
        >
          <HeroAnswerCard />
        </PageHero>

        <AgentLoop
          eyebrow="The loop"
          title={<>How an answer <Em>happens.</Em></>}
          lead="From a question in Slack to a cited, logged answer, with a human in the path whenever the law isn’t crystal clear."
          steps={[
            { n: '01', label: 'A question arrives', desc: 'In Slack or the MambaHR app, anyone on the team can ask.', who: 'agent', time: '0s', img: '/avatars/tom.jpg' },
            { n: '02', label: 'The current law is checked', desc: 'Federal employment law plus the specific rules for every state you employ in, kept current.', who: 'agent', time: '2s' },
            { n: '03', label: 'The answer comes back, with the citation', desc: 'Plain English up top, the exact rule it relied on attached underneath. Every time.', who: 'agent', time: '4s' },
            { n: '04', label: 'Anything ambiguous comes to you first', desc: 'If the law is unclear or the stakes are high, a human reviews before anything happens.', who: 'you', img: '/avatars/priya.jpg' },
            { n: '05', label: 'Everything is logged', desc: 'Who asked, what was answered, and the rule it followed, written to the audit trail.', who: 'agent', time: 'always' },
          ]}
        />

        <FeatureSplit
          eyebrow="On the record"
          title={<>A record your lawyer <Em>loves.</Em></>}
          lead="Every action MambaHR takes is logged with who, when, and the rule it followed. Nothing happens off the record, so when counsel or an auditor asks for proof, it’s already written down."
          bullets={[
            'Append-only, entries can be added, never edited away',
            'Every answer linked to the law it cited',
            'Human approvals recorded alongside the agent’s work',
          ]}
        >
          <AuditLogCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Always current"
          title={<>Sleep through <Em>law changes.</Em></>}
          lead="New state rules land all year long. MambaHR tracks them, your policies update, and you find out it was handled, instead of finding out the hard way."
          bullets={[
            'Federal baseline plus state-specific rules, all 50 states',
            'Policy updates applied as the law moves',
            'You’re told what changed and why, in plain English',
          ]}
        >
          <SleepPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 50, label: 'states + federal, kept current' },
            { n: 100, suffix: '%', label: 'of answers cite the law' },
            { n: 1, label: 'human on every ambiguous call' },
          ]}
        />

        <QuoteBand
          quote="I stopped second-guessing the answers the day I saw the law attached to every single one. My counsel reads the citations; I read the plain English."
          role="People Operations Lead · AI startup, 180 people"
          img="/v2-people/marcus.jpg"
          metric="Saved 9 hrs / week"
        />

        <PageCta title={<>Compliant by default. <Em>Cited every time.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
