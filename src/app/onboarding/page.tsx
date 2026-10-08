'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: day-one timeline card ── */
const DAY1 = [
  { time: '9:02 AM', label: 'Offer countersigned', meta: 'E-signed' },
  { time: '9:03 AM', label: 'Form I-9 and E-Verify check started', meta: 'Federal' },
  { time: '9:05 AM', label: 'Email, Slack, and single sign-on live', meta: 'Accounts live' },
  { time: '9:07 AM', label: 'Device setup requested', meta: 'IT notified' },
]

function DayOneCard() {
  return (
    <div className="d1 agent-edge agent-done agent-lg">
      <div className="head">
        <div className="who">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatars/dave.jpg" alt="Alex Park" width={38} height={38} />
          <div>
            <div className="nm">Alex Park</div>
            <div className="meta">Product Designer · starts Monday</div>
          </div>
        </div>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · requests sent in 4 min</span>
      </div>
      {DAY1.map((r) => (
        <div key={r.label} className="row">
          <span className="time">{r.time}</span>
          <span className="mark" aria-hidden="true" />
          <span className="lbl">{r.label}</span>
          <span className="src">{r.meta}</span>
        </div>
      ))}
      <div className="foot">Everything ready before Alex arrives.</div>
      <style jsx>{`
        .d1 {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-float);
          padding: 6px 0 0;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 16px 20px 14px;
          border-bottom: 1px solid var(--border-faint);
        }
        .who { display: flex; align-items: center; gap: 11px; }
        .who img { width: 38px; height: 38px; border-radius: var(--radius-full); object-fit: cover; }
        .nm { font-size: 15px; font-weight: 700; color: var(--text); }
        .meta { font-size: 13px; color: var(--text-faint); margin-top: 1px; }
        .row { display: flex; align-items: center; gap: 13px; padding: 13px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .time { flex: none; font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); width: 56px; }
        .mark { flex: none; width: 17px; height: 17px; border-radius: var(--radius-full); background: var(--green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .lbl { flex: 1; min-width: 0; font-size: 14px; font-weight: 600; color: var(--text); }
        .src {
          flex: none;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          background: var(--bg);
          border-radius: var(--radius-full);
          padding: 3px 10px;
        }
        .foot {
          font-size: 13px;
          color: var(--text-muted);
          padding: 12px 20px 14px;
          border-top: 1px solid var(--border-faint);
          background: var(--bg-surface);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }
        @media (max-width: 640px) { .src { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Feature visual: exit checklist fragment ── */
const EXIT_DONE = [
  { label: 'Final paycheck calculated for California rules', meta: 'Due last day' },
  { label: 'COBRA health-coverage deadline tracked and flagged', meta: 'Health coverage' },
]

function ExitChecklist() {
  return (
    <div className="ex">
      <div className="head">
        <div>
          <div className="t">Exit · Jordan Mills</div>
          <div className="m">Last day Friday, June 19</div>
        </div>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
      </div>
      {EXIT_DONE.map((r) => (
        <div key={r.label} className="row">
          <span className="mark" aria-hidden="true" />
          <div className="main">
            <div className="lbl">{r.label}</div>
            <div className="meta">{r.meta}</div>
          </div>
          <span className="ui-badge success">Done</span>
        </div>
      ))}
      <div className="need">
        <div className="ui-needs">
          <div className="ui-needs-in">
            <span className="ui-needs-label">Needs you</span>
            <div className="ui-needs-title">Switch off all logins at 5:00 PM Friday</div>
            <div className="ui-needs-body">Email · Slack · laptop. Nothing is switched off until you sign off.</div>
            <div className="ui-actions">
              <span className="ui-btn primary sm">Sign off</span>
              <span className="ui-btn secondary sm">Not yet</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ex {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 6px 0 0;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 16px 20px 14px;
          border-bottom: 1px solid var(--border-faint);
        }
        .t { font-size: 15px; font-weight: 700; color: var(--text); }
        .m { font-size: 13px; color: var(--text-faint); margin-top: 2px; }
        .row { display: flex; align-items: center; gap: 13px; padding: 13px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .mark { flex: none; width: 17px; height: 17px; border-radius: var(--radius-full); background: var(--green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .main { flex: 1; min-width: 0; }
        .lbl { font-size: 14px; font-weight: 600; color: var(--text); }
        .meta { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .need { padding: 6px 16px 16px; }
        @media (max-width: 640px) { .row { flex-wrap: wrap; } }
      `}</style>
    </div>
  )
}

/* ── Feature visual: real photo + floating mini-card ── */
function FirstDay() {
  return (
    <div className="fd">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team.jpg" alt="A new hire being welcomed by the team" />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="f-t">Day 1 ready · Alex Park</div>
        <div className="f-m">Logins live · buddy assigned · week planned</div>
      </div>
      <style jsx>{`
        .fd { position: relative; }
        .ph {
          display: block;
          width: 100%;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-float);
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: -22px;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-float);
          padding: 14px 18px;
          transform: rotate(-1.5deg);
        }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
        .f-m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) {
          .float { right: 8px; bottom: -16px; }
        }
      `}</style>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Onboarding & offboarding"
          title={<>Day one, <Em>ready.</Em></>}
          lead="Before your new hire arrives, the Form I-9 is started, logins work, device setup is requested, and the first week is planned. When someone leaves, nothing is forgotten."
          photo="/v2-people/marcus.jpg"
          photoChip="MambaHR · done in 4 min"
          photoCaption="Alex set up · logins live by 9 AM"
        >
          <DayOneCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title="From yes to day one"
          lead="It starts the moment the offer is signed. By Monday, the only thing left for you is the welcome."
          steps={[
            { n: '01', label: 'Offer signed', desc: 'The accepted offer is countersigned and filed where you can find it.', who: 'agent', time: 'minutes' },
            { n: '02', label: 'Form I-9', desc: 'Work-eligibility paperwork collected, and the Form I-9 and E-Verify check started.', who: 'agent', time: 'day 1' },
            { n: '03', label: 'Logins ready', desc: 'Email, Slack, and the tools they need, working before they sit down.', who: 'agent', time: 'before 9 AM' },
            { n: '04', label: 'Equipment and buddy', desc: 'Device setup requested from your IT team. An onboarding buddy assigned.', who: 'agent', img: '/avatars/priya.jpg' },
            { n: '05', label: 'First-week plan', desc: 'Intros and team sessions planned with the manager, and added to calendars once Google or Microsoft 365 is connected.', who: 'agent' },
            { n: '06', label: 'The welcome', desc: 'The welcome is yours: the handshake, the story, why you hired them.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Offboarding"
          title={<>Exits with <Em>nothing forgotten.</Em></>}
          lead="MambaHR works out the final paycheck by state rules, tracks the COBRA health-coverage deadlines and flags them at exit, and collects the handover. Logins are switched off only after you sign off."
          bullets={[
            'Final pay timed to each state’s rules, including California’s last-day deadline',
            'COBRA deadlines tracked and flagged to you at exit',
            'Nothing is switched off until you say so',
          ]}
        >
          <ExitChecklist />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Day one"
          title={<>Working logins, <Em>a buddy at 9:05.</Em></>}
          lead="Accounts work before the new hire sits down, and their buddy is already briefed. Day one is for meeting people, not waiting for access."
          bullets={[
            'A first week that is ready for them',
            'Managers get a short list of reminders',
            'New hires fill in one short form. MambaHR handles the rest.',
          ]}
        >
          <FirstDay />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 4, suffix: ' min', label: 'from signed offer to account and paperwork requests sent' },
            { n: 1, label: 'short form for the new hire to fill in' },
            { n: 0, label: 'logins left on after an exit' },
          ]}
        />


        <PageCta title={<>Every new hire, <Em>ready on day one.</Em></>} sub="A 30-minute demo of one onboarding, from signed offer to working logins. Then we import your data and switch you over." />
      </main>
      <Footer />
    </>
  )
}
