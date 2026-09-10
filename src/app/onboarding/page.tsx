'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: day-one timeline card ── */
const DAY1 = [
  { time: '9:02 AM', label: 'Offer countersigned', meta: 'E-signed' },
  { time: '9:03 AM', label: 'Form I-9 and E-Verify check started', meta: 'Federal' },
  { time: '9:05 AM', label: 'Email, Slack, and SSO logins live', meta: 'Accounts live' },
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
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · requests out in 4m</span>
      </div>
      {DAY1.map((r) => (
        <div key={r.label} className="row">
          <span className="time">{r.time}</span>
          <span className="mark" aria-hidden="true" />
          <span className="lbl">{r.label}</span>
          <span className="src">{r.meta}</span>
        </div>
      ))}
      <div className="foot">Everything ready before Alex&rsquo;s first coffee.</div>
      <style jsx>{`
        .d1 {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
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
        .who img { width: 38px; height: 38px; border-radius: 999px; object-fit: cover; }
        .nm { font-size: 15px; font-weight: 700; color: var(--text); }
        .meta { font-size: 13px; color: var(--text-faint); margin-top: 1px; }
        .row { display: flex; align-items: center; gap: 13px; padding: 13px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .time { flex: none; font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); width: 56px; }
        .mark { flex: none; width: 17px; height: 17px; border-radius: 999px; background: var(--color-green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .lbl { flex: 1; min-width: 0; font-size: 14px; font-weight: 600; color: var(--text); }
        .src { flex: none; font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .foot {
          font-size: 12px;
          color: var(--text-muted);
          padding: 12px 20px 14px;
          border-top: 1px solid var(--border-faint);
          background: linear-gradient(90deg, #FFF6EC, rgba(255, 246, 236, 0));
          border-radius: 0 0 16px 16px;
        }
        @media (max-width: 640px) { .src { display: none; } }
      `}</style>
    </div>
  )
}

/* ── Feature visual: exit checklist fragment ── */
const EXIT = [
  { label: 'Final paycheck calculated for California rules', meta: 'Due last day', state: 'done' },
  { label: 'COBRA notice prepared and queued', meta: 'Exit', state: 'done' },
  { label: 'Handover doc collected from manager', meta: 'Knowledge', state: 'done' },
  { label: 'Switch off all logins at 5:00 PM Friday', meta: 'Email · Slack · laptop', state: 'you' },
]

function ExitChecklist() {
  return (
    <div className="ex agent-edge agent-working">
      <div className="head">
        <div>
          <div className="t">Exit · Jordan Mills</div>
          <div className="m">Last day Friday, June 19</div>
        </div>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
      </div>
      {EXIT.map((r) => (
        <div key={r.label} className={`row${r.state === 'you' ? ' yours' : ''}`}>
          <span className={`mark${r.state === 'you' ? ' gold' : ''}`} aria-hidden="true" />
          <div className="main">
            <div className="lbl">{r.label}</div>
            <div className="meta">{r.meta}</div>
          </div>
          <span className={`tag${r.state === 'you' ? ' gold' : ''}`}>
            {r.state === 'you' ? 'Awaiting your sign-off' : 'Done'}
          </span>
        </div>
      ))}
      <style jsx>{`
        .ex {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          padding: 6px 0 8px;
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
        .row.yours { background: linear-gradient(90deg, #FFF6EC, rgba(255, 246, 236, 0)); }
        .mark { flex: none; width: 17px; height: 17px; border-radius: 999px; background: var(--color-green); position: relative; }
        .mark::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .mark.gold { background: linear-gradient(135deg, var(--gold-pale), var(--gold)); }
        .main { flex: 1; min-width: 0; }
        .lbl { font-size: 14px; font-weight: 600; color: var(--text); }
        .meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .tag {
          flex: none;
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-green);
          background: rgba(22, 130, 70, 0.08);
          border-radius: 999px;
          padding: 3px 9px;
        }
        .tag.gold { color: var(--gold); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.25); }
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
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: -22px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
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
          lead="Form I-9 started, logins working, device setup requested, first week planned, before your new hire walks in. And when someone leaves, a clean exit with nothing forgotten."
          proof="Built for new hires and HR alike"
          photo="/v2-people/marcus.jpg"
          photoChip="MambaHR · done in 4m"
          photoCaption="Alex set up · logins live by 9 AM"
        >
          <DayOneCard />
        </PageHero>

        <AgentLoop
          eyebrow="How it runs"
          title="From yes to day one"
          lead="The moment the offer is accepted, everything starts moving. By Monday morning there&rsquo;s nothing left on your list but the welcome."
          steps={[
            { n: '01', label: 'Offer signature', desc: 'The accepted offer is countersigned and filed where you can always find it.', who: 'agent', time: 'minutes' },
            { n: '02', label: 'Form I-9', desc: 'Work-eligibility paperwork collected and filed, and the Form I-9 and E-Verify check started.', who: 'agent', time: 'day 1' },
            { n: '03', label: 'Logins ready', desc: 'Email, Slack, and every tool they need, live before they sit down.', who: 'agent', time: 'before 9 AM' },
            { n: '04', label: 'Equipment & buddy', desc: 'Device setup requested from your IT team, and an onboarding buddy picked and briefed.', who: 'agent', img: '/avatars/priya.jpg' },
            { n: '05', label: 'First-week plan', desc: 'Intros, team lunches, and sessions planned for the manager, and on the calendar once Google or Microsoft 365 is connected.', who: 'agent' },
            { n: '06', label: 'The welcome', desc: 'You give the welcome. The handshake, the story, the why-we-hired-you, that&rsquo;s yours.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Offboarding"
          title={<>Exits with <Em>zero loose ends.</Em></>}
          lead="Exits are where details get expensive. MambaHR gets the final paycheck right for their state, prepares the COBRA notices, collects the handover, and switches off every login only after your sign-off."
          bullets={[
            'Final pay timed to each state&rsquo;s rules, California&rsquo;s last-day deadline included',
            'COBRA notices prepared on schedule, ready to send',
            'Nothing gets switched off until you say so',
          ]}
        >
          <ExitChecklist />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="The first impression"
          title={<>Day one, like <Em>the brochure.</Em></>}
          lead="Nobody remembers a smooth start, they remember a broken one. When the logins work, the first week is planned, and the buddy says hi at 9:05, your new hire spends day one meeting people instead of waiting on access."
          bullets={[
            'A first week that says we were ready for you',
            'Managers get a nudge list, not a to-do list',
            'New hires answer one short form, MambaHR does the rest',
          ]}
        >
          <FirstDay />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 4, suffix: ' min', label: 'from signed offer to accounts and paperwork requests out' },
            { n: 1, label: 'form the new hire fills in; MambaHR does the rest' },
            { n: 0, label: 'forgotten logins on exit, every account accounted for' },
          ]}
        />

        <QuoteBand
          quote="We imported on a Thursday and onboarded two people the following Monday. Offer signed, paperwork filed, logins live, first week planned, and I never opened a checklist. I just showed up to say welcome."
          role="Head of People · Fintech startup, 140 people"
          img="/v2-people/sofia.jpg"
          metric="Imported in a day"
        />

        <PageCta title={<>Day one, done. <Em>Day 4,000, too.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
