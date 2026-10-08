'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import { TodoDesk } from '@/components/mockups'

function DecisionCard() {
  return (
    <div className="dc">
      <div className="dc-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="dc-av" src="/avatars/maya.jpg" alt="Maya Chen" width={40} height={40} />
        <div className="dc-id">
          <div className="dc-t">Offer &middot; Maya Chen<span className="ui-badge warning">Urgent</span></div>
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
        Your team&rsquo;s pick after a 6-week search &middot; has a competing offer
      </div>

      <div className="ui-needs dc-read">
        <div className="ui-needs-in">
          <span className="ui-needs-label">Needs you</span>
          <p className="ui-needs-body">
            Policy: offers above the pay range always come to you. If you approve, the reason is filed with the offer.
          </p>
          <div className="dc-decide">
            <div className="choice">
              <div className="pill primary">Approve</div>
              <p className="conseq">The offer goes out for e-signature. The reason is filed with it.</p>
            </div>
            <div className="choice">
              <div className="pill secondary">Decline</div>
              <p className="conseq">Nothing goes out. Your team is told.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dc-log">Your decision is logged either way</div>

      <style jsx>{`
        .dc {
          max-width: 480px;
          margin: 0 auto;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-float);
          padding: 20px 22px 18px;
          font-size: 13px;
        }
        .dc-head { display: flex; gap: 13px; align-items: center; }
        .dc-av { width: 40px; height: 40px; border-radius: var(--radius-full); object-fit: cover; flex: none; }
        .dc-t { font-size: 15px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        .dc-m { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .gauge { margin-top: 18px; }
        .g-labels { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--text-faint); margin-bottom: 8px; flex-wrap: wrap; }
        .g-over { color: var(--gold); font-weight: 600; }
        .g-track {
          position: relative;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--bg-cream);
        }
        .g-band {
          position: absolute;
          left: 12%;
          width: 58%;
          top: 0;
          bottom: 0;
          border-radius: var(--radius-full);
          background: #E6D3BC;
        }
        .g-dot {
          position: absolute;
          left: 84%;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: var(--radius-full);
          transform: translate(-50%, -50%);
          background: var(--gold);
          border: 2.5px solid #fff;
          box-shadow: var(--shadow-sm);
        }
        .dc-note {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.45;
          color: var(--text-muted);
          background: var(--gold-tint);
          border-radius: var(--radius-md);
          padding: 10px 14px;
        }
        .dc-read { margin-top: 12px; }
        .dc-decide { margin-top: 4px; }
        .choice + .choice { margin-top: 12px; }
        .pill {
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.3;
        }
        .pill.primary { background: var(--text); color: #fff; border: 1px solid var(--text); }
        .pill.secondary { background: var(--bg-card); color: var(--text); border: 1px solid rgba(0, 0, 0, 0.3); }
        .conseq { margin: 6px 0 0; padding-left: 18px; font-size: 12.5px; line-height: 1.4; color: var(--text-faint); }
        .dc-log { margin-top: 12px; font-size: 12px; color: var(--text-faint); text-align: center; }
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
          border-radius: var(--radius-lg);
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
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 12px 20px 12px 16px;
          box-shadow: var(--shadow-float);
        }
        .f-check { flex: none; width: 22px; height: 22px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 7.5px; top: 4.5px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-t { font-size: 14px; font-weight: 600; color: var(--text); }
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
        <div className="mock-card"><TodoDesk /></div>
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
