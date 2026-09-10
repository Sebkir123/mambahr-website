'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: a RIF plan awaiting human sign-off ── */
function HeroPlanCard() {
  const rows = [
    { what: 'Notices', note: 'WARN timing checked' },
    { what: 'Severance', note: 'calculated per policy' },
    { what: 'Final pay', note: '4 states, each correct' },
    { what: 'Redeployment', note: '3 internal roles suggested' },
  ]
  return (
    <div className="pc agent-edge agent-working agent-lg">
      <div className="pc-top">
        <span className="pc-title">Reduction plan · Q3</span>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · awaiting your sign-off</span>
      </div>
      {rows.map((r) => (
        <div key={r.what} className="row">
          <span className="check" aria-hidden="true" />
          <span className="what">{r.what}</span>
          <span className="note">{r.note}</span>
        </div>
      ))}
      <div className="row gold">
        <span className="g-mark" aria-hidden="true" />
        <span className="what">Your sign-off</span>
        <span className="note g-note">required on every exit</span>
      </div>
      <style jsx>{`
        .pc {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(22px, 2.8vw, 30px);
          box-shadow: var(--shadow-float);
        }
        .pc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-faint);
        }
        .pc-title {
          font-family: var(--font-serif);
          font-size: 19px;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          font-size: 15px;
        }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .check {
          flex: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--color-green);
          position: relative;
        }
        .check::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 3.5px;
          width: 4px;
          height: 8px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .what { flex: none; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .note { flex: 1; min-width: 0; text-align: right; color: var(--text-muted); font-size: 14px; }
        .row.gold {
          margin-top: 6px;
          background: linear-gradient(90deg, var(--gold-tint), rgba(255, 246, 236, 0));
          border-top: 1px solid rgba(138, 101, 53, 0.25);
          border-radius: 10px;
          padding-left: 12px;
          padding-right: 12px;
        }
        .g-mark {
          flex: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--gold-pale), var(--gold));
        }
        .g-note {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gold-dark);
        }
      `}</style>
    </div>
  )
}

/* ── Redeployment card: roles a person could move into ── */
function RedeployCard() {
  const roles = [
    { role: 'Solutions Engineer', team: 'Customer team', note: 'strong skills match' },
    { role: 'Technical Account Mgr', team: 'Success team', note: 'same comp band' },
    { role: 'Sales Engineer', team: 'Revenue team', note: 'open since May' },
  ]
  return (
    <div className="rd agent-edge agent-done agent-lg">
      <div className="rd-top">
        <div className="person">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src="/avatars/marcus.jpg" alt="" width={42} height={42} />
          <div>
            <div className="p-name">Marcus Webb</div>
            <div className="p-sub">Support Engineer · role affected</div>
          </div>
        </div>
        <span className="match">3 open roles match</span>
      </div>
      {roles.map((r) => (
        <div key={r.role} className="r-row">
          <div className="r-main">
            <span className="r-role">{r.role}</span>
            <span className="r-team">{r.team}</span>
          </div>
          <span className="r-note">{r.note}</span>
        </div>
      ))}
      <div className="rd-foot">
        <span className="f-chip">for your review</span>
        <span className="f-txt">Suggestions only, people decide.</span>
      </div>
      <style jsx>{`
        .rd {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(22px, 2.8vw, 30px);
          box-shadow: var(--shadow-float);
        }
        .rd-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-faint);
        }
        .person { display: flex; align-items: center; gap: 12px; }
        .av { width: 42px; height: 42px; border-radius: 999px; object-fit: cover; flex: none; }
        .p-name { font-size: 15px; font-weight: 700; color: var(--text); }
        .p-sub { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); margin-top: 2px; }
        .match {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--violet);
          background: rgba(106, 93, 166, 0.1);
          border-radius: 999px;
          padding: 5px 11px;
        }
        .r-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 0;
        }
        .r-row + .r-row { border-top: 1px solid var(--border-faint); }
        .r-main { min-width: 0; }
        .r-role { display: block; font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .r-team { display: block; font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .r-note { flex: none; font-family: var(--font-mono); font-size: 12px; color: var(--color-green); white-space: nowrap; }
        .rd-foot {
          margin-top: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.25);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .f-chip {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fff;
          background: linear-gradient(135deg, var(--gold-pale), var(--gold));
          border-radius: 999px;
          padding: 4px 10px;
        }
        .f-txt { font-size: 13px; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

/* ── Warm photo + floating mini-card ── */
function DignityPhoto() {
  return (
    <div className="dp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team2.jpg" alt="" />
      <div className="mini agent-edge agent-done">
        <span className="g-mark" aria-hidden="true" />
        <div>
          <div className="m-t">Every exit</div>
          <div className="m-s">human-approved</div>
        </div>
      </div>
      <style jsx>{`
        .dp { position: relative; }
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
        .g-mark {
          flex: none;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--gold-pale), var(--gold));
        }
        .m-t { font-size: 14px; font-weight: 700; color: var(--text); }
        .m-s { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); margin-top: 2px; }
        @media (max-width: 880px) { .mini { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function RIFPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Headcount & layoffs"
          title={<>Notices, severance, <Em>final pay.</Em></>}
          lead="When a layoff has to happen, MambaHR gets every notice out on time and computes severance and final pay by each state’s rules. A person signs off on every single exit."
          photo="/v2-people/team2.jpg"
          photoCaption="Every exit · human-approved"
        >
          <HeroPlanCard />
        </PageHero>

        <AgentLoop
          eyebrow="The process"
          title={<>When it&rsquo;s unavoidable</>}
          lead="MambaHR prepares everything, the math, the timing, the paperwork. Nothing happens to anyone until you approve it."
          steps={[
            { n: '01', label: 'MambaHR models the plan', desc: 'Headcount scenarios with full cost, severance, and final pay, before anyone is named.', who: 'agent' },
            { n: '02', label: 'Notice timing checked per state', desc: 'The federal layoff-notice law (WARN Act) and state notice windows, verified before the plan can move.', who: 'agent' },
            { n: '03', label: 'Severance and final pay computed', desc: 'Per your policy, with each state’s final-pay deadline and rules applied to each person.', who: 'agent' },
            { n: '04', label: 'Internal moves suggested', desc: 'Open roles a person could move into, shown before the exit list is final. Suggestions only, people decide.', who: 'agent', img: '/avatars/tom.jpg' },
            { n: '05', label: 'Every letter and script drafted', desc: 'Notices, separation paperwork, and manager talking points, ready for review. You send them.', who: 'agent', img: '/avatars/priya.jpg' },
            { n: '06', label: 'You approve every single exit', desc: 'A person signs off on every termination before anything happens. Non-negotiable.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Before the list is final"
          title={<>MambaHR finds open roles before the list is final</>}
          lead="Before anyone is let go, MambaHR shows you open internal roles a person could move into, with the team and why it fits. The suggestions are advisory. People decide."
          bullets={[
            'Open roles matched to each affected person',
            'Shown before the exit list is final, not after',
            'Always a human decision, never an automatic move',
          ]}
        >
          <RedeployCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="The details"
          title={<>The documents, the timing, the final paycheck</>}
          lead="Final pay lands on each state's deadline, the health-coverage continuation notices go out at exit, and every manager has a script drafted before the conversation."
          bullets={[
            'Final pay on each state’s deadline, to the day',
            'Health-coverage continuation notices (COBRA) ready at exit',
            'Manager scripts drafted so no one improvises the hardest conversation',
          ]}
        >
          <DignityPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 100, suffix: '%', label: 'of exits signed off by a person' },
            { n: 1, label: 'final-pay computation per state rule, held for your approval' },
            { n: 100, suffix: '%', label: 'of notices drafted with WARN timing checked' },
          ]}
        />


        <PageCta title={<>A layoff plan, <Em>ready before you need it.</Em></>} sub="A 30-minute demo of a layoff plan, with the notices and the math. Then we import your data and keep it ready." />
      </main>
      <Footer />
    </>
  )
}
