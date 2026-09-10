'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'
import { PeopleDirectory } from '@/components/mockups'

/* ── Hero fragment: people table inside an app window ── */
const MANAGERS = [
  { img: '/avatars/anna.jpg', name: 'Anna Wilson', team: 'Sales', n: 14 },
  { img: '/avatars/marcus.jpg', name: 'Daniel Osei', team: 'Engineering', n: 31 },
  { img: '/avatars/violet.jpg', name: 'Violet Kim', team: 'Marketing', n: 9 },
]

function OrgChartCard() {
  return (
    <div className="org agent-edge agent-done">
      <div className="o-head">
        <span className="o-t">Org chart</span>
        <span className="o-sub">Always current, drawn from the record</span>
      </div>
      <div className="ceo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatars/brian.jpg" alt="" width={34} height={34} />
        <div>
          <div className="nm">Brian Bell</div>
          <div className="rl">CEO</div>
        </div>
      </div>
      <div className="lines" aria-hidden="true"><i /><i /><i /></div>
      <div className="row">
        {MANAGERS.map((m) => (
          <div className="mgr" key={m.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.img} alt="" width={28} height={28} />
            <div className="nm">{m.name}</div>
            <div className="rl">{m.team}</div>
            <span className="ct">{m.n} reports</span>
          </div>
        ))}
      </div>
      <div className="o-foot">
        <span className="mono">Headcount: 1,247 · 0 unknowns</span>
      </div>
      <style jsx>{`
        .org { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 22px 22px 18px; box-shadow: var(--shadow-float); }
        .o-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
        .o-t { font-family: var(--font-serif); font-size: 19px; color: var(--text); }
        .o-sub { font-size: 12px; color: var(--text-faint); }
        .ceo { display: inline-flex; align-items: center; gap: 10px; border: 1px solid var(--border); border-radius: 12px; padding: 9px 16px 9px 10px; background: var(--bg-warm); box-shadow: var(--shadow-sm); margin: 0 auto; display: flex; width: fit-content; }
        .ceo img { width: 34px; height: 34px; border-radius: 999px; object-fit: cover; }
        .nm { font-size: 13px; font-weight: 700; color: var(--text); line-height: 1.2; }
        .rl { font-size: 12px; color: var(--text-muted); }
        .lines { display: flex; justify-content: center; gap: 26%; height: 22px; margin: 4px 0; }
        .lines i { width: 1px; background: var(--border); transform: skewX(0deg); }
        .lines i:first-child { transform: rotate(28deg); }
        .lines i:last-child { transform: rotate(-28deg); }
        .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .mgr { border: 1px solid var(--border-faint); border-radius: 12px; padding: 12px 10px; text-align: center; background: var(--bg); box-shadow: var(--shadow-sm); }
        .mgr img { width: 28px; height: 28px; border-radius: 999px; object-fit: cover; margin-bottom: 6px; }
        .ct { display: inline-block; margin-top: 7px; font-family: var(--font-mono); font-size: 12px; color: var(--gold-dark); background: var(--gold-tint); border-radius: 999px; padding: 2px 8px; }
        .o-foot { margin-top: 16px; border-top: 1px solid var(--border-faint); padding-top: 11px; text-align: center; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
      `}</style>
    </div>
  )
}

/* ── Import photo with floating card ── */
function ImportStage() {
  return (
    <div className="imp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/team.jpg" alt="A people team working together" />
      <div className="float agent-edge agent-done">
        <span className="f-check" aria-hidden="true" />
        <div>
          <div className="f-t">1,247 records imported</div>
          <div className="f-s">0 lost · from Gusto · <span className="mono">today, 2:14 PM</span></div>
        </div>
      </div>
      <style jsx>{`
        .imp { position: relative; }
        .photo { width: 100%; height: auto; display: block; border-radius: 16px; box-shadow: var(--shadow-float); }
        .float { position: absolute; left: 18px; bottom: 18px; display: flex; align-items: center; gap: 11px; background: var(--bg); border: 1px solid var(--border); border-radius: 13px; padding: 12px 18px 12px 14px; box-shadow: var(--shadow-md); }
        .f-check { flex: none; width: 20px; height: 20px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 7px; top: 4px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); }
        .f-s { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
      `}</style>
    </div>
  )
}

export default function PeoplePage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Employee records"
          title={<>One record, <Em>current.</Em></>}
          lead="Nobody should spend their week retyping what already happened. MambaHR does the work and keeps the record: every person, every detail, right without anyone touching it."
        >
          <div className="mock-card agent-edge agent-done"><PeopleDirectory /></div>
        </PageHero>

        <AgentLoop
          eyebrow="The record keeps itself"
          title="Why it never goes stale"
          lead="Old systems go stale because a person has to remember to type. Here, the work and the record are the same thing."
          steps={[
            { n: '01', label: 'Someone’s hired', desc: 'The record creates itself from the signed offer, name, role, comp, start date.', who: 'agent', time: 'instant', img: '/avatars/dave.jpg' },
            { n: '02', label: 'A raise goes through', desc: 'MambaHR updates the pay everywhere it lives: the record, the band, the payroll file.', who: 'agent', time: 'same minute' },
            { n: '03', label: 'An address changes in Slack', desc: 'Jordan mentions she moved; it’s filed in seconds and flagged for the next pay file.', who: 'agent', time: 'seconds', img: '/avatars/priya.jpg' },
            { n: '04', label: 'Leave goes through', desc: 'MambaHR updates the record and payday before anyone has to ask.', who: 'agent', time: 'same minute' },
            { n: '05', label: 'MambaHR logs every change', desc: 'Who changed what, when, and why, kept with the record forever.', who: 'agent', time: 'always' },
            { n: '06', label: 'You just look things up', desc: 'Headcount, tenure, who reports to whom, they’re right, every time.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Org chart"
          title={<>The org chart draws itself</>}
          lead="Your CEO asks for headcount by team and you answer in the meeting, not after a weekend of spreadsheet archaeology. Reporting lines are always true because they come straight from the record."
          bullets={[
            'Reporting lines update the moment a transfer happens',
            'Headcount by team, location, or manager, instantly',
            'New hires appear on day one, leavers come off the same day',
          ]}
        >
          <OrgChartCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Switching"
          title={<>Import in a day, keep it all</>}
          lead="The migration project you’ve been dreading is one import from Gusto, Workday, Rippling, BambooHR, Namely, or ADP. Your data is in within a day, every history and balance carried over. Then your old system retires."
          bullets={[
            'Every record, every history, every balance carried over',
            'We check the import line by line before you go live',
            'No parallel running, no re-keying, no cleanup project',
          ]}
        >
          <ImportStage />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 1247, label: 'records, current to the minute' },
            { n: 1, suffix: ' day', label: 'to import your data from your old system' },
            { n: 0, label: 'stale spreadsheets' },
          ]}
        />

        <QuoteBand
          quote="We imported on a Tuesday. By Wednesday morning every record was in, every balance was right, and I deleted the spreadsheet I’d been babysitting for three years."
          role="Head of People · Fintech startup, 140 people"
          img="/v2-people/sofia.jpg"
          metric="Imported in a day"
        />

        <PageCta title={<>Your people, on the record.</>} sub="A 30-minute demo with your own org chart. Then we import your records and switch you over." />
      </main>
      <Footer />
    </>
  )
}
