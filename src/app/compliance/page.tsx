'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: a real compliance question, answered with the law ── */
function HeroAnswerCard() {
  return (
    <div className="hc agent-edge agent-done agent-lg">
      <div className="ask">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/tom.jpg" alt="" width={36} height={36} />
        <div className="bubble">
          <div className="m-who">Tom · Texas</div>
          <div className="q">&ldquo;Can we ask about salary history in interviews?&rdquo;</div>
        </div>
      </div>

      <div className="reply">
        <span className="r-who"><span className="agent-mark r-mark" aria-hidden="true" />MambaHR <em>4 seconds later</em></span>
        <p className="a">Depends on the state.</p>
        <p className="a-sub">Here is the rule for each state you hire in, cited.</p>
        <div className="ui-sources"><b>Based on</b><span>Pay transparency</span><span>State law</span></div>
      </div>

      <style jsx>{`
        .hc {
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

/* ── Audit-log fragment ── */
function AuditLogCard() {
  const rows = [
    { t: '09:02:14', what: 'Leave approved', note: 'within policy · family leave (FMLA) cited' },
    { t: '10:31:48', what: 'Offer sent to you', note: 'above pay range · your decision' },
    { t: '11:07:02', what: 'Rule reviewed', note: 'source checked · review date set' },
    { t: '13:46:55', what: 'Question answered', note: 'pay transparency · law cited' },
    { t: '15:12:30', what: 'Termination drafted', note: 'waiting for your sign-off' },
  ]
  return (
    <div className="log agent-edge agent-working agent-lg">
      <div className="l-head">
        <span className="l-title"><span className="agent-mark is-working lm" aria-hidden="true" />Audit trail</span>
        <span className="l-sub">Can’t be edited · exportable</span>
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
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 26px 26px 22px;
          box-shadow: var(--shadow-float);
        }
        .l-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-faint);
        }
        .l-title { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; color: var(--text); }
        .lm { --am-size: 26px; }
        .l-sub { font-size: 13px; color: var(--text-faint); }
        .l-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          font-size: 14px;
        }
        .l-row + .l-row { border-top: 1px solid var(--border-faint); }
        .ts { flex: none; font-family: var(--font-mono); font-size: 12px; color: var(--violet); }
        .dot { flex: none; width: 7px; height: 7px; border-radius: var(--radius-full); background: var(--green); }
        .what { flex: none; color: var(--text); font-weight: 600; }
        .note {
          flex: 1;
          min-width: 0;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          text-align: right;
        }
        .l-foot {
          margin-top: 14px;
          padding: 11px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          font-size: 13px;
          color: var(--text-muted);
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
          <div className="m-t">Every rule carries a review date</div>
          <div className="m-s">and the law it is based on</div>
        </div>
      </div>
      <style jsx>{`
        .sp { position: relative; }
        .ph {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--radius-lg);
          object-fit: cover;
          box-shadow: var(--shadow-float);
        }
        .mini {
          position: absolute;
          left: clamp(-14px, -1.5vw, -20px);
          bottom: 26px;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
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
          border-radius: var(--radius-full);
          background: var(--green);
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
        .m-t { font-size: 14px; font-weight: 700; color: var(--text); }
        .m-s { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
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
      <main id="main">
        <PageHero
          eyebrow="Compliance"
          title={<>Cited, <Em>every time.</Em></>}
          lead="Employment law changes often, and every state has its own rules. MambaHR applies federal law and the rules for your states. Every answer cites the law and the date it was last checked, and risky calls go to a person first."
          photo="/v2-people/feat.jpg"
          photoChip="MambaHR · answered"
          photoCaption="Tom’s question · cited in 4 seconds"
        >
          <HeroAnswerCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title={<>How an answer happens.</>}
          lead="From a question in Slack to an answer with the law cited and logged. A person reviews whenever the law is unclear."
          steps={[
            { n: '01', label: 'A question comes in', desc: 'Anyone on the team can ask in Slack or the MambaHR app.', who: 'agent', time: '0s', img: '/avatars/tom.jpg' },
            { n: '02', label: 'MambaHR checks the current law', desc: 'Federal employment law and the rules for each state where you employ people, each with a review date.', who: 'agent', time: '2s' },
            { n: '03', label: 'The answer, with its source', desc: 'Plain English first, with the exact rule it used underneath.', who: 'agent', time: '4s' },
            { n: '04', label: 'Anything unclear comes to you first', desc: 'If the law is unclear or the stakes are high, a person reviews it before anything happens.', who: 'you', img: '/avatars/priya.jpg' },
            { n: '05', label: 'Everything is logged', desc: 'Who asked, what was answered, and the rule it followed, saved to the audit trail.', who: 'agent', time: 'always' },
          ]}
        />

        <FeatureSplit
          eyebrow="On the record"
          title={<>A record your lawyer can use.</>}
          lead="Every action MambaHR takes is logged with who, when, and the rule it followed. When a lawyer or auditor asks for proof, it is already written down."
          bullets={[
            'Entries can be added, never edited or deleted',
            'Every answer linked to the law it cited',
            'Your approvals recorded next to MambaHR’s work',
          ]}
        >
          <AuditLogCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Dated and cited"
          title={<>Know when a rule was last checked.</>}
          lead="State rules change throughout the year. Every rule in MambaHR has a review date, and every answer shows its source and when that source was last checked."
          bullets={[
            'Federal law plus the rules for each state where you employ people',
            'Every rule has a review date and a source',
            'Changes explained in plain English',
          ]}
        >
          <SleepPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 1, label: 'review date on every rule' },
            { n: 100, suffix: '%', label: 'of answers cite the law' },
            { n: 1, label: 'person reviews every unclear call' },
          ]}
        />


        <PageCta title={<>Cited every time. Reviewed by a person when it matters.</>} sub="A 30-minute demo using your own compliance questions. Then we import your data and switch you over." />
      </main>
      <Footer />
    </>
  )
}
