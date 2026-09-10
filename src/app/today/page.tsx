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
          <span>Band: $160k&ndash;$180k</span>
          <span className="g-over">Offer: $195k &middot; +8% above band</span>
        </div>
        <div className="g-track">
          <span className="g-band" />
          <span className="g-dot" />
        </div>
      </div>

      <div className="dc-note">
        <span className="n-dot" aria-hidden="true" />
        Top candidate from a 6-week search &middot; holding a competing offer
      </div>
      <div className="dc-policy">
        Policy: offers above band always come to you. Approving files the justification with the offer.
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
        lead="Everything that needs you is on one list called To do. The rest is already done and logged."
      >
        <div className="mock-card agent-edge agent-working"><TodoDesk /></div>
      </PageHero>

      <AgentLoop
        eyebrow="The daily rhythm"
        title={<>How To do stays short</>}
        lead="MambaHR does the work all day. Only the calls that deserve a person ever reach your To do."
        steps={[
          { n: '01', label: 'Within-policy work gets done', desc: 'Time off, letters, record updates, day-one setup, done and logged before you look.', who: 'agent', time: 'all day' },
          { n: '02', label: 'Edge cases get a card', desc: 'Offers above your pay range, terminations, and raises above your threshold come to you with the full context.', who: 'agent', img: '/avatars/maya.jpg' },
          { n: '03', label: 'You decide, with the whole picture', desc: 'Read the card, weigh the call, tap once. No chasing context across five tabs before you can think.', who: 'you', img: '/avatars/anna.jpg' },
          { n: '04', label: 'Urgent floats up, with a clock', desc: 'A competing offer or a start date this week sits at the top, not page three.', who: 'agent', img: '/avatars/tom.jpg' },
          { n: '05', label: 'One tap, reasoning attached', desc: 'Your decision is logged like everything else, with the policy and numbers it was based on.', who: 'agent' },
        ]}
      />

      <FeatureSplit
        eyebrow="Built for fast calls"
        title={<>The context is on the card</>}
        lead="Every card carries everything you need to decide: the numbers, the policy, the history. No tab-hopping, no asking around, no digging through old threads."
        bullets={[
          'The offer next to the band, on one line',
          'The policy that applies, quoted on the card',
          'The history, how long the search ran, what else is in play',
        ]}
      >
        <DecisionCard />
      </FeatureSplit>

      <FeatureSplit
        flip
        warm
        eyebrow="After you close the tab"
        title={<>MambaHR keeps working when you are done</>}
        lead="You make the calls only you can make and close the tab. MambaHR carries on with the within-policy work and logs every action it takes."
        bullets={[
          'The list is short because the work is already done',
          'Decisions, not data entry',
          'Everything you approved, and everything MambaHR did, in one record',
        ]}
      >
        <MorningPhoto />
      </FeatureSplit>

      <StatTrio
        stats={[
          { n: 3, label: 'decisions in a typical morning' },
          { n: 18, label: 'handled automatically while you slept' },
          { n: 30, suffix: ' min', label: 'a day on the calls only you can make' },
        ]}
      />


      <PageCta title={<>Run HR from one short <Em>To do list.</Em></>} sub="A 30-minute demo of To do on your own approvals. Then we import your data and switch you over." />
      </main>

      <Footer />
    </>
  )
}
