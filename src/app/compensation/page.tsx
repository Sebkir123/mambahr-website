'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: comp review with band gauge + above-band routing ── */
function CompReviewCard() {
  return (
    <div className="cr agent-edge agent-working agent-lg">
      <div className="bar">
        <span className="bt">Merit cycle · comp review</span>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
      </div>

      <div className="row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/tom.jpg" alt="Tom Harrison" width={36} height={36} />
        <div className="main">
          <div className="name">Tom Harrison · merit raise <b className="up">+12%</b></div>
          <div className="meta">Senior Engineer · L4 band</div>
          <div className="gauge" aria-hidden="true">
            <span className="track" />
            <span className="seg" />
            <span className="dot" style={{ left: '58%' }} />
            <span className="mk" style={{ left: '0%' }}>low</span>
            <span className="mk" style={{ left: '50%' }}>mid</span>
            <span className="mk" style={{ left: '100%' }}>high</span>
          </div>
        </div>
        <span className="chip ok">Within band</span>
      </div>

      <div className="row hot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/maya.jpg" alt="Maya Chen" width={36} height={36} />
        <div className="main">
          <div className="name">Maya Chen · <b className="up">+18%</b> · above band 8%</div>
          <div className="meta">Staff Engineer · L5 band · 9:41 AM</div>
        </div>
        <span className="chip route">Routes to you</span>
        <div className="btns">
          <span className="ok-b">Approve</span>
          <span className="no-b">Decline</span>
        </div>
      </div>

      <div className="foot">
        <span className="fd" aria-hidden="true" />
        Every recommendation checked against your bands before anyone sees it
      </div>
      <style jsx>{`
        .cr {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-faint);
          background: var(--bg-warm);
        }
        .bt { font-size: 14px; font-weight: 700; color: var(--text); }
        .row { display: flex; align-items: center; gap: 13px; padding: 16px 20px; flex-wrap: wrap; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .row.hot { background: linear-gradient(90deg, rgba(220, 38, 38, 0.04), rgba(220, 38, 38, 0)); }
        .av { width: 36px; height: 36px; border-radius: 999px; object-fit: cover; flex: none; }
        .main { flex: 1; min-width: 200px; }
        .name { font-size: 14px; font-weight: 700; color: var(--text); }
        .name .up { color: var(--color-green); }
        .meta { font-size: 12px; color: var(--text-faint); margin-top: 2px; }
        .gauge { position: relative; margin: 14px 0 16px; height: 6px; max-width: 320px; }
        .track { position: absolute; inset: 0; border-radius: 999px; background: var(--border-faint); }
        .seg { position: absolute; top: 0; bottom: 0; left: 18%; right: 18%; border-radius: 999px; background: linear-gradient(90deg, #E6D3BC, #D4AA7C); }
        .dot {
          position: absolute;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: var(--color-green);
          border: 3px solid #fff;
          box-shadow: var(--shadow-sm);
        }
        .mk {
          position: absolute;
          top: 11px;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-faint);
        }
        .mk:first-of-type { transform: none; }
        .chip {
          flex: none;
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 999px;
          padding: 4px 11px;
        }
        .chip.ok { color: var(--color-green); background: rgba(22, 130, 70, 0.09); border: 1px solid rgba(22, 130, 70, 0.22); }
        .chip.route { color: var(--color-red); background: rgba(220, 38, 38, 0.07); border: 1px solid rgba(220, 38, 38, 0.2); }
        .btns { display: flex; gap: 7px; flex: none; }
        .ok-b { font-size: 13px; font-weight: 600; color: #fff; background: #14110C; border-radius: 999px; padding: 7px 15px; }
        .no-b { font-size: 13px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 7px 15px; }
        .foot {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-top: 1px solid var(--border-faint);
          font-size: 13px;
          color: var(--text-muted);
        }
        .fd { width: 8px; height: 8px; border-radius: 999px; background: var(--gold); flex: none; }
      `}</style>
    </div>
  )
}

/* ── Pay-equity check fragment ── */
function EquityCard() {
  const rows = [
    { t: 'Similar roles, similar pay', m: 'L4 Engineering · 11 peers compared', state: 'ok' as const },
    { t: 'No gap by gender or ethnicity', m: 'Screened on every change, not once a year', state: 'ok' as const },
    { t: '2 flags surfaced for review', m: 'Both routed to your Head of People with context', state: 'review' as const },
  ]
  return (
    <div className="eq agent-edge agent-done">
      <div className="head">
        <span className="ht">Pay-equity check · before the change lands</span>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
      </div>
      {rows.map((r) => (
        <div key={r.t} className="row">
          <span className={`mark ${r.state}`} aria-hidden="true" />
          <div className="main">
            <div className="rt">{r.t}</div>
            <div className="rm">{r.m}</div>
          </div>
          <span className={`tag ${r.state}`}>{r.state === 'ok' ? 'Clear' : 'Your review'}</span>
        </div>
      ))}
      <style jsx>{`
        .eq {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-faint);
          background: var(--bg-warm);
          flex-wrap: wrap;
        }
        .ht { font-size: 14px; font-weight: 700; color: var(--text); }
        .row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .mark { flex: none; width: 17px; height: 17px; border-radius: 999px; position: relative; }
        .mark.ok { background: var(--color-green); }
        .mark.ok::after { content: ''; position: absolute; left: 5.5px; top: 3px; width: 3.5px; height: 7.5px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .mark.review { background: linear-gradient(135deg, #D4AA7C, #7A5A2E); }
        .mark.review::after { content: ''; position: absolute; left: 7.5px; top: 4px; width: 2px; height: 6px; background: #fff; border-radius: 2px; }
        .main { flex: 1; min-width: 0; }
        .rt { font-size: 14px; font-weight: 600; color: var(--text); }
        .rm { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .tag {
          flex: none;
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 999px;
          padding: 3px 9px;
        }
        .tag.ok { color: var(--color-green); background: rgba(22, 130, 70, 0.09); }
        .tag.review { color: var(--gold-dark); background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.25); }
      `}</style>
    </div>
  )
}

/* ── Warm split: real photo + floating done-card ── */
function PhotoCard() {
  return (
    <div className="pc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/marcus.jpg" alt="A manager walking into a comp conversation prepared" width={640} height={460} />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="ft">Comp letter signed and filed</div>
        <div className="fm">Tom Harrison · payroll updated · 2:14 PM</div>
      </div>
      <style jsx>{`
        .pc { position: relative; }
        .ph {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          box-shadow: var(--shadow-float);
          border: 1px solid var(--border);
        }
        .float {
          position: absolute;
          left: -18px;
          bottom: 26px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-float);
          padding: 13px 16px;
          max-width: 290px;
        }
        .ft { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 9px; }
        .fm { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
        @media (max-width: 880px) { .float { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function CompensationPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Compensation"
          title={<>Every raise, <Em>right.</Em></>}
          lead="No more six weeks of spreadsheets and second-guessing. Every number is checked against your bands and screened for pay equity before anyone sees it, and anything above band comes to you first."
          proof="Built for the whole comp cycle"
          photo="/v2-people/team2.jpg"
          photoChip="MambaHR · done"
          photoCaption="Maya’s raise · approved, letter signed"
        >
          <CompReviewCard />
        </PageHero>

        <AgentLoop
          eyebrow="The loop"
          title={<>How a raise <Em>happens.</Em></>}
          lead="From a manager&rsquo;s Slack message to an updated payroll file, with you on every call that matters."
          steps={[
            { n: '01', label: 'A manager asks in Slack', desc: '“Can we get Tom to $185k?” That message is the whole request, no form, no ticket.', who: 'agent', time: 'sec', img: '/avatars/dave.jpg' },
            { n: '02', label: 'Checked against bands and pay equity', desc: 'The number is held up against your salary bands and screened for equity issues before it moves.', who: 'agent', time: 'min' },
            { n: '03', label: 'The big calls come to you first', desc: 'Within policy proceeds. Anything above your threshold routes to a human before it goes anywhere.', who: 'you', img: '/avatars/priya.jpg' },
            { n: '04', label: 'The letter writes and signs itself', desc: 'Comp letter generated, sent for e-signature, and filed to the employee record automatically.', who: 'agent', time: 'min', img: '/avatars/tom.jpg' },
            { n: '05', label: 'Payroll file updated', desc: 'The change lands in the next payroll file, effective-dated correctly. Nothing to re-key.', who: 'agent', time: 'same day' },
          ]}
        />

        <FeatureSplit
          eyebrow="Pay equity"
          title={<>Equity checked, <Em>every time.</Em></>}
          lead="Every comp change is screened for equity issues before it happens, not discovered in a year-end audit panic. Clear changes proceed; anything that looks off comes to a person with the context attached."
          bullets={[
            'Screened on every change, against real peers in the same band',
            'Flags arrive with context, not just a red number',
            'No annual scramble, the audit is continuous',
          ]}
        >
          <EquityCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="What changes"
          title={<>Comp talks without <Em>the fear.</Em></>}
          lead="When the number is already checked against bands and equity, the manager walks in confident the offer is fair, and spends the conversation on the person, not defending the math."
          bullets={[
            'Managers know the number is defensible before they say it',
            'Employees hear a consistent story about how pay works',
            'The paperwork after the conversation handles itself',
          ]}
        >
          <PhotoCard />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 100, suffix: '%', label: 'of raises checked against your bands' },
            { n: 0, label: 'comp letters you write by hand' },
            { n: 1, label: 'human on every above-band call' },
          ]}
        />

        <QuoteBand
          quote="Our comp cycle used to be six weeks of spreadsheets and second-guessing. Now every recommendation arrives pre-checked against our bands, the exceptions come straight to me, and the letters just go out."
          role="Head of People · Healthtech company, 320 people"
          img="/v2-people/sofia.jpg"
          metric="Comp cycle in days, not weeks"
        />

        <PageCta title={<>Pay people right. <Em>Prove it.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
