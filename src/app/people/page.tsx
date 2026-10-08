'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import { PeopleDirectory } from '@/components/mockups'

/* ── Hero fragment: people table inside an app window ── */
const MANAGERS = [
  { img: '/avatars/anna.jpg', name: 'Anna Wilson', team: 'Sales', n: 14 },
  { img: '/avatars/marcus.jpg', name: 'Daniel Osei', team: 'Engineering', n: 31 },
  { img: '/avatars/violet.jpg', name: 'Violet Kim', team: 'Marketing', n: 9 },
]

function OrgChartCard() {
  return (
    <div className="org">
      <div className="o-head">
        <span className="o-t">Org chart</span>
        <span className="o-sub">Always current, from your employee records</span>
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
            <span className="ui-badge ct">{m.n} reports</span>
          </div>
        ))}
      </div>
      <div className="o-foot">
        <span className="mono">Headcount: 247 · no gaps</span>
      </div>
      <style jsx>{`
        .org { background: var(--bg-card); border-radius: var(--radius-lg); padding: 22px 22px 18px; box-shadow: var(--shadow-float); }
        .o-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
        .o-t { font-family: var(--font-serif); font-size: 19px; color: var(--text); }
        .o-sub { font-size: 12px; color: var(--text-faint); }
        .ceo { align-items: center; gap: 10px; border-radius: var(--radius-full); padding: 8px 18px 8px 8px; background: var(--bg-surface); box-shadow: inset 0 0 0 1px var(--border-faint); margin: 0 auto; display: flex; width: fit-content; }
        .ceo img { width: 34px; height: 34px; border-radius: var(--radius-full); object-fit: cover; }
        .nm { font-size: 13px; font-weight: 600; color: var(--text); line-height: 1.2; }
        .rl { font-size: 12px; color: var(--text-muted); }
        .lines { position: relative; height: 24px; margin: 2px 0 0; }
        .lines::before { content: ''; position: absolute; left: calc((100% - 20px) / 6); right: calc((100% - 20px) / 6); top: 12px; height: 1px; background: var(--border-mid); }
        .lines i { position: absolute; width: 1px; background: var(--border-mid); top: 12px; bottom: 0; left: 50%; }
        .lines i:first-child { left: calc((100% - 20px) / 6); }
        .lines i:last-child { left: calc(100% - (100% - 20px) / 6); }
        .lines i:nth-child(2) { top: 0; }
        .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .mgr { border-radius: var(--radius-md); padding: 12px 10px; text-align: center; background: var(--bg-surface); box-shadow: inset 0 0 0 1px var(--border-faint); }
        .mgr img { display: block; width: 28px; height: 28px; border-radius: var(--radius-full); object-fit: cover; margin: 0 auto 6px; }
        .ct { margin-top: 7px; height: 22px; padding: 0 8px; }
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
          <div className="f-t">247 records imported</div>
          <div className="f-s">0 lost · from Gusto · <span className="mono">today, 2:14 PM</span></div>
        </div>
      </div>
      <style jsx>{`
        .imp { position: relative; }
        .photo { width: 100%; height: auto; display: block; border-radius: var(--radius-lg); box-shadow: var(--shadow-float); }
        .float { position: absolute; left: 18px; bottom: 18px; display: flex; align-items: center; gap: 11px; background: var(--bg-card); border-radius: var(--radius-lg); padding: 12px 20px 12px 14px; box-shadow: var(--shadow-md); }
        .f-check { flex: none; width: 20px; height: 20px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 7px; top: 4px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-t { font-size: 14px; font-weight: 600; color: var(--text); }
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
          title={<>One record, <Em>always current.</Em></>}
          lead="MambaHR keeps your employee records up to date as the work happens. Every person and every detail, without anyone retyping it."
        >
          <div className="mock-card"><PeopleDirectory /></div>
        </PageHero>

        <AgentLoop
          eyebrow="How records stay current"
          title="Why it doesn’t go stale"
          lead="Records usually go stale because someone has to remember to update them. Here, the record updates as the work gets done."
          steps={[
            { n: '01', label: 'Someone is hired', desc: 'The record is created from the signed offer: name, role, pay, and start date.', who: 'agent', time: 'instant', img: '/avatars/dave.jpg' },
            { n: '02', label: 'A raise is approved', desc: 'MambaHR updates the pay on the record and in the next payroll file.', who: 'agent', time: 'same minute' },
            { n: '03', label: 'An address changes in Slack', desc: 'Jordan mentions she moved. It is saved in seconds and flagged for the next payroll file.', who: 'agent', time: 'seconds', img: '/avatars/priya.jpg' },
            { n: '04', label: 'Leave is approved', desc: 'MambaHR updates the record and prepares the payroll change.', who: 'agent', time: 'same minute' },
            { n: '05', label: 'Every change is logged', desc: 'Who changed what, when, and why, kept with the record.', who: 'agent', time: 'always' },
            { n: '06', label: 'You just look things up', desc: 'Headcount, tenure, who reports to whom. It is all up to date.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Org chart"
          title={<>An org chart that stays current</>}
          lead="When your CEO asks for headcount by team, you can answer in the meeting. Reporting lines come straight from your employee records, so they stay accurate."
          bullets={[
            'Reporting lines update when a transfer happens',
            'Headcount by team, location, or manager, right away',
            'New hires appear on day one, and leavers come off the same day',
          ]}
        >
          <OrgChartCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Switching"
          title={<>Import in a day, keep it all</>}
          lead="Moving from Gusto, Workday, Rippling, BambooHR, Namely, or ADP is one import. Your data is in within a day, with history and balances carried over. Then you can retire the old system."
          bullets={[
            'Every record, history, and balance carried over',
            'We check the import line by line before you go live',
            'No running two systems side by side, no retyping, no cleanup project',
          ]}
        >
          <ImportStage />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 247, label: 'records in a sample import, none lost' },
            { n: 1, suffix: ' day', label: 'to import your data from your old system' },
            { n: 0, label: 'spreadsheets to keep in sync' },
          ]}
        />


        <PageCta title={<>Your people, on the record.</>} sub="A 30-minute demo with your own org chart. Then we import your records and switch you over." />
      </main>
      <Footer />
    </>
  )
}
