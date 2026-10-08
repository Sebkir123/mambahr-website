'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: the pay cycle, prepped ── */
function PayCycleCard() {
  const rows = [
    { img: '/avatars/maya.jpg', name: 'Maya Chen', what: 'Merit raise +12%', note: 'checked against pay range' },
    { img: '/avatars/anna.jpg', name: 'Alex Park', what: 'New hire added', note: 'first check prorated' },
    { img: '/avatars/marcus.jpg', name: 'Marcus Webb', what: 'Final pay', note: 'timed to state rules' },
    { img: '/avatars/priya.jpg', name: 'Jordan Lee', what: 'Address change', note: 'flagged for the next pay file' },
  ]
  return (
    <div className="pcc agent-edge agent-done agent-lg">
      <div className="head">
        <div>
          <div className="t">Pay cycle · June 15</div>
          <div className="s">42 people · 4 changes this cycle</div>
        </div>
        <span className="ui-badge">Format: ADP</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src={r.img} alt="" width={32} height={32} />
          <div className="main">
            <div className="who">{r.name}</div>
            <div className="what">{r.what} · {r.note}</div>
          </div>
          <span className="check" aria-hidden="true" />
        </div>
      ))}
      <div className="foot">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · ready for upload</span>
        <span className="ui-badge success">0 discrepancies</span>
      </div>
      <style jsx>{`
        .pcc {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-float);
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-faint);
        }
        .t { font-weight: 700; font-size: 15px; color: var(--text); letter-spacing: -0.01em; }
        .s { font-size: 13px; color: var(--text-faint); margin-top: 2px; }
        .row { display: flex; align-items: center; gap: 12px; padding: 12px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .av { width: 32px; height: 32px; border-radius: var(--radius-full); object-fit: cover; flex: none; }
        .main { flex: 1; min-width: 0; }
        .who { font-size: 14px; font-weight: 600; color: var(--text); }
        .what { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
        .check { flex: none; width: 17px; height: 17px; border-radius: var(--radius-full); background: var(--green); position: relative; }
        .check::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-faint);
          background: var(--bg-surface);
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: a Deel-managed run, waiting on a person ── */
function DeelRunCard() {
  return (
    <div className="ec">
      <div className="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/priya.jpg" alt="" width={42} height={42} />
        <div className="id">
          <div className="who">Pay run · June 15</div>
          <div className="ev">Deel-managed payroll · 42 people · 4 changes</div>
        </div>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · waiting on you</span>
      </div>
      <div className="rows">
        <div className="r"><span className="k">Changes sent to Deel</span><span className="v">4 of 4 · Tue 2:14 PM</span></div>
        <div className="r"><span className="k">Checked</span><span className="v">Twice · 0 discrepancies</span></div>
        <div className="r"><span className="k">Approver</span><span className="v">Anna Park · Head of People</span></div>
        <div className="r"><span className="k">Run status</span><span className="v">Held until approved</span></div>
      </div>
      <div className="ui-needs">
        <div className="ui-needs-in">
          <span className="ui-needs-label">Needs you</span>
          <div className="ui-needs-title">Approve the June 15 pay run</div>
          <div className="ui-needs-body">Nothing pays out until a person approves the run.</div>
          <div className="ui-actions">
            <span className="ui-btn primary sm">Approve pay run</span>
            <span className="ui-btn secondary sm">Review changes</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ec {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .top { display: flex; align-items: center; gap: 13px; flex-wrap: wrap; }
        .av { width: 42px; height: 42px; border-radius: var(--radius-full); object-fit: cover; flex: none; }
        .id { flex: 1 1 180px; min-width: 0; }
        .who { font-size: 15px; font-weight: 700; color: var(--text); }
        .ev { font-size: 13px; color: var(--text-faint); margin-top: 2px; }
        .rows { border-radius: var(--radius-md); overflow: hidden; background: var(--bg-surface); }
        .r { display: flex; justify-content: space-between; gap: 16px; padding: 10px 14px; }
        .r + .r { border-top: 1px solid var(--border-faint); }
        .k { font-size: 13px; color: var(--text-faint); }
        .v { font-size: 13px; font-weight: 600; color: var(--text); text-align: right; }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: photo + floating mini-card ── */
function PaydayPhoto() {
  return (
    <div className="pp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/team.jpg" alt="An HR team on payday, relaxed" />
      <div className="mini agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="mini-t">Pay file checked twice</div>
        <div className="mini-s">0 discrepancies · ready to upload</div>
      </div>
      <style jsx>{`
        .pp { position: relative; }
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
          max-width: 240px;
        }
        .mini-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
        .mini-s { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) { .mini { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function PayrollPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Payroll changes"
          pill="Powered by Deel"
          title={<>Payday, <Em>prepared.</Em></>}
          lead={'MambaHR prepares every payroll change. It builds a change file for your current payroll provider, or sends the changes to Deel-managed payroll. You choose. A person approves every pay run.'}
          photo="/v2-people/team.jpg"
          photoChip="MambaHR · ready"
          photoCaption="42 people · 0 discrepancies"
        >
          <PayCycleCard />
        </PageHero>

        <AgentLoop
          eyebrow="The pay cycle"
          title={<>Payroll changes, ready early.</>}
          lead={'MambaHR collects changes all month. Before payday it builds one change file in your provider’s format, or sends the changes to Deel. A person approves before anyone is paid.'}
          steps={[
            { n: '01', label: 'Collects every change', desc: 'Raises, new hires, exits, and address changes, recorded when they happen.', who: 'agent', time: 'all month' },
            { n: '02', label: 'Checks raises against your pay ranges', desc: 'Every raise is checked against your pay ranges before it goes into the file.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '03', label: 'Works out final pay by state rules', desc: 'Final pay follows each state’s rules and waits for your approval.', who: 'agent', time: 'instant', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Builds the change file, or sends it to Deel', desc: 'A change file in your provider’s format, checked against your records. Or, with Deel-managed payroll, the changes go to Deel. Ask us about your provider.', who: 'agent', time: '2 days early' },
            { n: '05', label: 'Checks it twice', desc: 'Every line is checked against your records, then checked again, so mistakes are caught before you see the file.', who: 'agent', time: 'twice' },
            { n: '06', label: 'You approve', desc: 'Upload the file to your provider, or approve the pay run in Deel.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Deel-managed payroll"
          title={<>Two ways to handle payday.</>}
          lead="Keep your current payroll provider and upload the change file MambaHR builds. Or switch to Deel-managed payroll, and MambaHR sends each change to Deel. You choose once for your company."
          bullets={[
            'A change file in your provider’s format, checked against your records',
            'Or Deel-managed payroll, with the changes sent to Deel for you',
            'A person approves every pay run before anyone is paid',
            'Benefits administration is not included today. MambaHR tracks COBRA health-coverage deadlines at exit and flags them to you.',
          ]}
        >
          <DeelRunCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Before payday"
          title={<>The file is ready days early.</>}
          lead={'Changes are collected as they happen, checked twice against your records, and ready for you days before payday.'}
          bullets={[
            'Every change accounted for, with a record of where it came from',
            'Mistakes caught and fixed before the file reaches you',
            'A full history of what changed, when, and why',
          ]}
        >
          <PaydayPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 24, suffix: 'h', label: 'of payroll prep saved each month, by our estimate' },
            { n: 0, label: 'pay runs released without a person approving' },
            { n: 2, suffix: '×', label: 'checks on every file before you see it' },
          ]}
        />


        <PageCta title={<>Make payday <Em>calm.</Em></>} sub="A 30-minute demo using one of your real pay cycles. Then we import your data and switch you over." />
      </main>
      <Footer />
    </>
  )
}
