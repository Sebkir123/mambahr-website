'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: the pay cycle, prepped ── */
function PayCycleCard() {
  const rows = [
    { img: '/avatars/maya.jpg', name: 'Maya Chen', what: 'Merit raise +12%', note: 'priced against band' },
    { img: '/avatars/anna.jpg', name: 'Alex Park', what: 'New hire added', note: 'first check prorated' },
    { img: '/avatars/marcus.jpg', name: 'Marcus Webb', what: 'Final pay', note: 'state-correct timing' },
    { img: '/avatars/priya.jpg', name: 'Jordan Lee', what: 'Address change', note: 'flagged for the next pay file' },
  ]
  return (
    <div className="pcc agent-edge agent-working agent-lg">
      <div className="head">
        <div>
          <div className="t">Pay cycle · June 15</div>
          <div className="s">42 people · 4 changes this cycle</div>
        </div>
        <span className="fmt">Format: ADP</span>
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
        <span className="zero">0 discrepancies</span>
      </div>
      <style jsx>{`
        .pcc {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-faint);
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
        }
        .t { font-weight: 700; font-size: 15px; color: var(--text); letter-spacing: -0.01em; }
        .s { font-size: 12.5px; color: var(--text-faint); margin-top: 2px; }
        .fmt {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gold-dark);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.25);
          border-radius: 999px;
          padding: 4px 10px;
          white-space: nowrap;
        }
        .row { display: flex; align-items: center; gap: 12px; padding: 12px 20px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .av { width: 32px; height: 32px; border-radius: 999px; object-fit: cover; flex: none; }
        .main { flex: 1; min-width: 0; }
        .who { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .what { font-size: 12.5px; color: var(--text-muted); margin-top: 1px; }
        .check { flex: none; width: 17px; height: 17px; border-radius: 999px; background: var(--color-green); position: relative; }
        .check::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-faint);
          background: #FAF6EF;
        }
        .zero { font-family: var(--font-mono); font-size: 11.5px; color: var(--color-green); font-weight: 600; }
      `}</style>
    </div>
  )
}

/* ── Feature fragment: a Deel-managed run, waiting on a person ── */
function DeelRunCard() {
  return (
    <div className="ec agent-edge agent-done agent-lg">
      <div className="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/priya.jpg" alt="" width={42} height={42} />
        <div className="id">
          <div className="who">Pay run · June 15</div>
          <div className="ev">Deel-managed payroll · 42 people · 4 changes</div>
        </div>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · waiting on you</span>
      </div>
      <div className="rows">
        <div className="r"><span className="k">Changes sent to Deel</span><span className="v">4 of 4 · Tue 2:14 PM</span></div>
        <div className="r"><span className="k">Reconciled</span><span className="v">Twice · 0 discrepancies</span></div>
        <div className="r"><span className="k">Approver</span><span className="v">Anna Park · Head of People</span></div>
        <div className="r"><span className="k">Run status</span><span className="v">Held until approved</span></div>
      </div>
      <div className="foot"><span className="dot" aria-hidden="true" />Nothing pays out until a person approves the run</div>
      <style jsx>{`
        .ec {
          background: linear-gradient(165deg, #FFFFFF, #FAF6EF);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          padding: 22px 24px;
        }
        .top { display: flex; align-items: center; gap: 13px; flex-wrap: wrap; }
        .av { width: 42px; height: 42px; border-radius: 999px; object-fit: cover; flex: none; }
        .id { flex: 1; min-width: 0; }
        .who { font-size: 15px; font-weight: 700; color: var(--text); }
        .ev { font-size: 12.5px; color: var(--text-faint); margin-top: 2px; }
        .rows { margin-top: 18px; border: 1px solid var(--border-faint); border-radius: 12px; overflow: hidden; background: var(--bg); }
        .r { display: flex; justify-content: space-between; gap: 16px; padding: 10px 14px; }
        .r + .r { border-top: 1px solid var(--border-faint); }
        .k { font-size: 12.5px; color: var(--text-faint); }
        .v { font-size: 12.5px; font-weight: 600; color: var(--text); text-align: right; }
        .foot { display: flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 12px; color: var(--text-muted); }
        .dot { width: 7px; height: 7px; border-radius: 999px; background: var(--color-green); }
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
      <div className="mini">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="mini-t">Pay file reconciled twice</div>
        <div className="mini-s">0 discrepancies · ready to upload</div>
      </div>
      <style jsx>{`
        .pp { position: relative; }
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
          max-width: 240px;
        }
        .mini-t { font-size: 13.5px; font-weight: 700; color: var(--text); margin-top: 10px; }
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
      <main>
        <PageHero
          eyebrow="Payroll changes"
          pill="Deel managed payroll"
          title={<>Payday, <Em>perfect.</Em></>}
          lead={'MambaHR prepares every payroll change. You choose per company: a change file for your current provider, or Deel-managed payroll where MambaHR sends the changes to Deel and a person approves every run.'}
          proof="Built for the teams who run payday"
          photo="/v2-people/team2.jpg"
          photoChip="MambaHR · ready"
          photoCaption="42 paid right · 0 discrepancies"
        >
          <PayCycleCard />
        </PageHero>

        <AgentLoop
          eyebrow="The pay cycle"
          title={<>The pay cycle, <Em>done early.</Em></>}
          lead={'MambaHR tracks every change all month, then turns them into one clean change file in your provider’s format, or sends them to Deel for a managed run. Either way, a person approves before anyone is paid.'}
          steps={[
            { n: '01', label: 'Collects every change', desc: 'Raises, new hires, exits, address moves, gathered the moment they happen, not the night before.', who: 'agent', time: 'all month' },
            { n: '02', label: 'Prices raises against bands', desc: 'Every merit change checked against your comp bands before it touches the file.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '03', label: 'Computes final pay by state rules', desc: 'Final pay computed by state rule, held for your approval.', who: 'agent', time: 'instant', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Builds the change file, or sends it to Deel', desc: 'A change file in your provider’s format, checked against the record. Or, on Deel-managed payroll, the changes go straight to Deel. Ask us about your provider.', who: 'agent', time: '2 days early' },
            { n: '05', label: 'Reconciles twice', desc: 'Every line checked against the record, then checked again. Discrepancies get caught before you ever see the file.', who: 'agent', time: 'twice' },
            { n: '06', label: 'You approve. Done.', desc: 'Upload the file to your provider, or approve the Deel run. Payday runs without a scramble.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Deel-managed payroll"
          title={<>Two ways to run <Em>payday.</Em></>}
          lead="Keep your current provider and load the change file MambaHR builds, or switch to Deel-managed payroll and let MambaHR send every change to Deel. You choose once, per company."
          bullets={[
            'A change file in your provider’s format, checked against the record',
            'Or Deel-managed payroll, with the changes sent to Deel for you',
            'A person approves every run before anyone is paid',
            'Benefits administration is not part of MambaHR today; COBRA notices at offboarding are',
          ]}
        >
          <DeelRunCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="The feeling"
          title={<>No more Sunday-night <Em>sweeps.</Em></>}
          lead={'No more Sunday-night spreadsheet sweeps. No more “did the raise make it in?” The file is built, reconciled, and waiting for you, days before anyone gets paid.'}
          bullets={[
            'Every change accounted for, with the receipt to prove it',
            'Discrepancies caught and fixed before the file reaches you',
            'A full trail of what changed, when, and why',
          ]}
        >
          <PaydayPhoto />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 24, suffix: 'h', label: 'of payroll prep, gone each month' },
            { n: 0, label: 'pay runs released without a person approving' },
            { n: 2, suffix: '×', label: 'every file reconciled before you see it' },
          ]}
        />

        <QuoteBand
          quote="We imported on a Friday and ran payday Monday without a hiccup. Every change was already in the file, I just uploaded it."
          role="Head of People · Fintech startup, 140 people"
          img="/v2-people/sofia.jpg"
          metric="Every change in the file"
        />

        <PageCta title={<>Make payday <Em>a non-event.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
