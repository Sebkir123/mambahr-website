'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import { TodoDesk } from '@/components/mockups'

function DecisionCard() {
  return (
    <div className="dc agent-edge agent-done">
      <div className="dc-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="dc-av" src="/avatars/maya.jpg" alt="Maya Chen" width={40} height={40} />
        <div className="dc-id">
          <div className="dc-t">Offer &middot; Maya Chen<span className="dc-tag">Urgent</span></div>
          <div className="dc-m">Senior Engineer &middot; $195k base &middot; starts in 3 weeks</div>
        </div>
      </div>

      <div className="gauge">
        <div className="g-labels">
          <span>Range: $160k&ndash;$180k</span>
          <span className="g-over">Offer: $195k &middot; 8% above range</span>
        </div>
        <div className="g-track">
          <span className="g-band" />
          <span className="g-dot" />
        </div>
      </div>

      <div className="dc-note">
        <span className="n-dot" aria-hidden="true" />
        Your team&rsquo;s pick after a 6-week search &middot; has a competing offer
      </div>
      <div className="dc-policy">
        Policy: offers above the pay range always come to you. If you approve, the reason is filed with the offer.
      </div>

      <div className="dc-acts">
        <span className="b-ok">Approve</span>
        <span className="b-no">Decline</span>
        <span className="dc-log">Your decision is logged either way</span>
      </div>

      <style jsx>{`
        .dc {
          max-width: 460px;
          margin: 0 auto;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-float);
          padding: 18px 20px;
          font-size: 13px;
        }
        .dc-head { display: flex; gap: 13px; align-items: center; }
        .dc-av { width: 40px; height: 40px; border-radius: 999px; object-fit: cover; flex: none; }
        .dc-t { font-size: 15px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 9px; }
        .dc-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-red);
          background: rgba(220, 38, 38, 0.08);
          border-radius: 999px;
          padding: 2px 8px;
        }
        .dc-m { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .gauge { margin-top: 18px; }
        .g-labels { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--text-faint); margin-bottom: 7px; }
        .g-over { color: var(--gold); font-weight: 600; }
        .g-track {
          position: relative;
          height: 8px;
          border-radius: 999px;
          background: var(--bg-elevated, #F2EEE6);
          border: 1px solid var(--border-faint);
        }
        .g-band {
          position: absolute;
          left: 12%;
          width: 58%;
          top: 0;
          bottom: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #E6D3BC, var(--gold-pale));
        }
        .g-dot {
          position: absolute;
          left: 84%;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: var(--gold);
          border: 2.5px solid #fff;
          box-shadow: var(--shadow-sm);
        }
        .dc-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-muted);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.18);
          border-radius: 10px;
          padding: 9px 12px;
        }
        .n-dot { flex: none; width: 7px; height: 7px; border-radius: 999px; background: var(--gold); }
        .dc-policy {
          margin-top: 10px;
          font-size: 12px;
          line-height: 1.5;
          color: var(--text-faint);
          border-left: 3px solid var(--gold);
          padding: 2px 0 2px 11px;
        }
        .dc-acts { display: flex; align-items: center; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
        .b-ok { font-size: 13px; font-weight: 600; color: #fff; background: var(--text); border-radius: 999px; padding: 8px 18px; }
        .b-no { font-size: 13px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 8px 18px; }
        .dc-log { font-size: 12px; color: var(--text-faint); margin-left: auto; }
      `}</style>
    </div>
  )
}

/* ── Big photo + floating mini-card ── */
function MorningPhoto() {
  return (
    <div className="mp">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/sofia.jpg" alt="A people leader with a clear morning" />
      <div className="float">
        <span className="f-check" aria-hidden="true" />
        <div>
          <div className="f-t">To do cleared</div>
          <div className="f-s">9:21 AM</div>
        </div>
      </div>
      <style jsx>{`
        .mp { position: relative; max-width: 560px; margin: 0 auto; }
        .photo {
          width: 100%;
          display: block;
          border-radius: 18px;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          box-shadow: var(--shadow-float);
        }
        .float {
          position: absolute;
          left: -14px;
          bottom: 28px;
          display: flex;
          align-items: center;
          gap: 11px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 18px;
          box-shadow: var(--shadow-float);
        }
        .f-check { flex: none; width: 22px; height: 22px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 7.5px; top: 4.5px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); }
        .f-s { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); margin-top: 1px; }
        @media (max-width: 880px) {
          .float { left: 8px; }
        }
      `}</style>
    </div>
  )
}

export default function TodayPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />

      <main id="main">

      <PageHero
        eyebrow="To do"
        title={<>Only the calls <Em>that need you.</Em></>}
        lead="Everything that needs your decision is on one list called To do. The rest is done and logged."
      >
        <div className="mock-card agent-edge agent-working"><TodoDesk /></div>
      </PageHero>

      <AgentLoop
        eyebrow="Your day"
        title={<>How To do stays short</>}
        lead="MambaHR handles the routine work during the day. Only decisions that need a person reach your To do."
        steps={[
          { n: '01', label: 'Routine work gets done', desc: 'Time off, letters, record updates, and day-one setup, done and logged.', who: 'agent', time: 'all day' },
          { n: '02', label: 'Bigger decisions get a card', desc: 'Offers above your pay range, terminations, and raises above your limit come to you with the details.', who: 'agent', img: '/avatars/maya.jpg' },
          { n: '03', label: 'You decide with the full picture', desc: 'Read the card, make the call, tap once. No hunting for context across five tabs.', who: 'you', img: '/avatars/anna.jpg' },
          { n: '04', label: 'Urgent items go to the top', desc: 'A competing offer or a start date this week sits at the top, with the deadline shown.', who: 'agent', img: '/avatars/tom.jpg' },
          { n: '05', label: 'Logged with the reasons', desc: 'Your decision is saved with the policy and the numbers it was based on.', who: 'agent' },
        ]}
      />

      <FeatureSplit
        eyebrow="Quick decisions"
        title={<>The context is on the card</>}
        lead="Each card has what you need to decide: the numbers, the policy, and the history. No switching tabs or digging through old threads."
        bullets={[
          'The offer next to the pay range, on one line',
          'The policy that applies, quoted on the card',
          'The history: how long the search ran and what else is going on',
        ]}
      >
        <DecisionCard />
      </FeatureSplit>

      <FeatureSplit
        flip
        warm
        eyebrow="After you close the tab"
        title={<>MambaHR keeps working when you are done</>}
        lead="Make the calls only you can make, then close the tab. MambaHR carries on with the routine work and logs every step."
        bullets={[
          'The list is short because the routine work is already done',
          'Decisions, not data entry',
          'What you approved and what MambaHR did, in one record',
        ]}
      >
        <MorningPhoto />
      </FeatureSplit>

      <StatTrio
        stats={[
          { n: 3, label: 'decisions on a sample morning' },
          { n: 18, label: 'routine tasks finished overnight' },
          { n: 30, suffix: ' min', label: 'a day on the decisions that need you' },
        ]}
      />


      <PageCta title={<>Run HR from one short <Em>To do list.</Em></>} sub="A 30-minute demo of To do with your own approvals. Then we import your data and switch you over." />
      </main>

      <Footer />
    </>
  )
}
