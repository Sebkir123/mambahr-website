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
    { img: '/avatars/priya.jpg', name: 'Jordan Lee', what: '401(k) enrolled', note: 'deduction set' },
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

/* ── Feature fragment: a life event, enrolled ── */
function EnrollCard() {
  return (
    <div className="ec agent-edge agent-done agent-lg">
      <div className="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/priya.jpg" alt="" width={42} height={42} />
        <div className="id">
          <div className="who">Jordan Lee</div>
          <div className="ev">Life event · Marriage · reported Tue 2:14 PM</div>
        </div>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
      </div>
      <div className="rows">
        <div className="r"><span className="k">Enrollment window</span><span className="v">Opened same day · 30 days</span></div>
        <div className="r"><span className="k">401(k)</span><span className="v">Enrolled · 6%</span></div>
        <div className="r"><span className="k">Dependents</span><span className="v">+1 added · verified</span></div>
        <div className="r"><span className="k">Next paycheck</span><span className="v">Deductions updated · June 15</span></div>
      </div>
      <div className="foot"><span className="dot" aria-hidden="true" />Confirmation sent to Jordan · Wed 9:02 AM</div>
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
          eyebrow="Payroll & benefits"
          pill="Powered by Deel"
          title={<>Payday, <Em>perfect.</Em></>}
          lead={'Every raise, new hire, exit, and life event lands in your provider’s file before payday, double-checked, reconciled, and ready to upload.'}
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
          lead={'MambaHR tracks every change all month, then turns them into one clean, payroll-ready file in your provider’s format. You upload it. That’s the whole job.'}
          steps={[
            { n: '01', label: 'Collects every change', desc: 'Raises, new hires, exits, address moves, deduction updates, gathered the moment they happen, not the night before.', who: 'agent', time: 'all month' },
            { n: '02', label: 'Prices raises against bands', desc: 'Every merit change checked against your comp bands before it touches the file.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '03', label: 'Computes final pay by state rules', desc: 'Exits get state-correct final pay, timing, accrued PTO payout, the lot.', who: 'agent', time: 'instant', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Builds the file in your provider format', desc: 'ADP, Workday, Gusto, Rippling, the change file arrives in the exact format your provider expects.', who: 'agent', time: '2 days early' },
            { n: '05', label: 'Reconciles twice', desc: 'Every line checked against the record, then checked again. Discrepancies get caught before you ever see the file.', who: 'agent', time: 'twice' },
            { n: '06', label: 'You upload. Done.', desc: 'One clean file, ready for your payroll provider. Payday runs without a scramble.', who: 'you', img: '/avatars/anna.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Benefits"
          title={<>Life events, <Em>enrolled.</Em></>}
          lead="A birth, a marriage, a move, MambaHR spots the qualifying life event, opens the window, and walks the enrollment through, end to end."
          bullets={[
            'Qualifying life events caught the day they happen',
            '401(k) enrollment and deduction changes',
            'Enrollment windows tracked, never missed, never expired',
            'Every change lands in the next pay file automatically',
          ]}
        >
          <EnrollCard />
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
            { n: 0, label: 'missed enrollment windows' },
            { n: 2, suffix: '×', label: 'every file reconciled before you see it' },
          ]}
        />

        <QuoteBand
          quote="We switched on a Friday and ran payday Monday without a hiccup. Every change was already in the file, I just uploaded it."
          role="Head of People · Fintech startup, 140 people"
          img="/v2-people/sofia.jpg"
          metric="Live in a day"
        />

        <PageCta title={<>Make payday <Em>a non-event.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
