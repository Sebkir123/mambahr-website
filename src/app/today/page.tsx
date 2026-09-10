'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

const QUEUE = [
  { img: '/avatars/maya.jpg', title: 'Offer · Maya Chen', meta: 'Senior Engineer · $195k · above band 8%', tag: 'Urgent', tone: 'urgent' },
  { img: '/avatars/tom.jpg', title: 'Comp change · Tom Harrison', meta: '+12% merit raise · above your threshold', tag: 'Review', tone: 'warn' },
  { img: '/avatars/dave.jpg', title: 'Promotion · Dave Buchanan', meta: 'Account Executive → Senior AE · new band', tag: 'Review', tone: 'warn' },
]

const HANDLED = [
  { who: 'Emma Rodriguez', what: 'Time off approved · 3 days · within policy', time: '9:02 AM' },
  { who: 'Alex Park', what: 'Onboarding complete · Day 1 ready', time: '8:47 AM' },
]

/* ── Hero fragment: the approvals queue ── */
function QueueWindow() {
  return (
    <div className="qw agent-edge agent-working agent-lg">
      <div className="qw-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="addr">app.mambahr.com/today</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="me" src="/avatars/brian.jpg" alt="Brian Bell" width={24} height={24} />
      </div>
      <div className="qw-body">
        <div className="qw-top">
          <div>
            <h3 className="greet">Good morning, Brian</h3>
            <span className="date">Wednesday, June 10</span>
          </div>
          <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR &middot; waiting on you</span>
        </div>

        <div className="panel">
          <div className="p-head"><span>Needs your approval</span><span className="p-count">3</span></div>
          {QUEUE.map((a) => (
            <div key={a.title} className="ap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ap-av" src={a.img} alt="" width={34} height={34} />
              <div className="ap-main">
                <div className="ap-t">{a.title}<span className={`ap-tag ${a.tone}`}>{a.tag}</span></div>
                <div className="ap-m">{a.meta}</div>
              </div>
              <div className="ap-btns">
                <span className="ap-ok">Approve</span>
                <span className="ap-no">Decline</span>
              </div>
            </div>
          ))}
        </div>

        <div className="feed">
          <div className="f-head">Handled automatically &middot; 18 today</div>
          {HANDLED.map((h) => (
            <div key={h.who} className="f-row">
              <span className="f-check" aria-hidden="true" />
              <span className="f-who">{h.who}</span>
              <span className="f-what">{h.what}</span>
              <span className="f-time">{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .qw {
          border-radius: 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-float);
          overflow: hidden;
          font-size: 13px;
        }
        .qw-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          height: 40px;
          background: #F8F6F1;
          border-bottom: 1px solid var(--border);
        }
        .dots { display: flex; gap: 6px; }
        .dots i { width: 10px; height: 10px; border-radius: 999px; background: #e3ddd6; display: block; }
        .dots i:first-child { background: #f0a59a; }
        .dots i:nth-child(2) { background: #f4ce8e; }
        .dots i:nth-child(3) { background: #a9cfa6; }
        .addr {
          margin: 0 auto;
          font-size: 12px;
          color: var(--text-faint);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 3px 16px;
        }
        .me { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; }
        .qw-body { padding: 20px 22px 22px; }
        .qw-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .greet { font-family: var(--font-serif); font-weight: 400; font-size: 23px; color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .date { font-size: 13px; color: var(--text-faint); }
        .panel { margin-top: 16px; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .p-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .p-count { font-family: var(--font-mono); font-size: 12px; color: #7A5A2E; background: var(--gold-tint); border-radius: 999px; padding: 2px 8px; }
        .ap { display: flex; align-items: center; gap: 12px; padding: 12px 16px; }
        .ap + .ap { border-top: 1px solid var(--border-faint); }
        .ap-av { width: 34px; height: 34px; border-radius: 999px; object-fit: cover; flex: none; }
        .ap-main { flex: 1; min-width: 0; }
        .ap-t { font-size: 14px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 8px; }
        .ap-tag { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 7px; border-radius: 999px; }
        .ap-tag.urgent { color: var(--color-red); background: rgba(220, 38, 38, 0.08); }
        .ap-tag.warn { color: #7A5A2E; background: var(--gold-tint); }
        .ap-m { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .ap-btns { display: flex; gap: 7px; flex: none; }
        .ap-ok { font-size: 13px; font-weight: 600; color: #fff; background: #1A1A19; border-radius: 999px; padding: 7px 15px; }
        .ap-no { font-size: 13px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 7px 15px; }
        .feed { margin-top: 16px; }
        .f-head { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-faint); margin-bottom: 8px; }
        .f-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; font-size: 13px; }
        .f-row + .f-row { border-top: 1px solid var(--border-faint); }
        .f-check { flex: none; width: 16px; height: 16px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 5px; top: 3px; width: 3px; height: 7px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-who { font-weight: 600; color: var(--text); }
        .f-what { color: var(--text-muted); flex: 1; min-width: 0; }
        .f-time { color: var(--text-faint); font-size: 12px; }
        @media (max-width: 560px) {
          .ap-btns .ap-no { display: none; }
        }
      `}</style>
    </div>
  )
}

/* ── Expanded approval card: everything you need to decide, on one card ── */
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
        .g-over { color: #7A5A2E; font-weight: 600; }
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
          background: linear-gradient(90deg, #E6D3BC, #D4AA7C);
        }
        .g-dot {
          position: absolute;
          left: 84%;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: #7A5A2E;
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
        .b-ok { font-size: 13px; font-weight: 600; color: #fff; background: #1A1A19; border-radius: 999px; padding: 8px 18px; }
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
          <div className="f-t">Queue cleared</div>
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
        eyebrow="Approvals"
        title={<>Your day, <Em>three taps.</Em></>}
        lead="Everything that truly needs you, in one queue, the rest is already done and logged. Most mornings it’s three decisions and a coffee."
        photo="/v2-people/team2.jpg"
        photoChip="MambaHR · done"
        photoCaption="18 handled · 3 for you"
      >
        <QueueWindow />
      </PageHero>

      <AgentLoop
        eyebrow="The daily rhythm"
        title={<>How the queue <Em>stays short</Em></>}
        lead="MambaHR does the work all day. Only the calls that deserve a human ever reach your queue."
        steps={[
          { n: '01', label: 'Within-policy work auto-completes', desc: 'Time off, letters, record updates, day-one setup, done and logged before you look.', who: 'agent', time: 'all day' },
          { n: '02', label: 'Edge cases get a card', desc: 'Offers above band, terminations, comp above your threshold, the big calls always come to you, with full context.', who: 'agent', img: '/avatars/maya.jpg' },
          { n: '03', label: 'You decide, with the whole picture', desc: 'Read the card, weigh the call, tap once. No chasing context across five tabs before you can think.', who: 'you', img: '/avatars/anna.jpg' },
          { n: '04', label: 'Urgent floats up, with a clock', desc: 'A competing offer or a start date this week sits at the top, not page three.', who: 'agent', img: '/avatars/tom.jpg' },
          { n: '05', label: 'One tap, reasoning attached', desc: 'Your decision is logged like everything else, with the policy and numbers it was based on.', who: 'agent' },
        ]}
      />

      <FeatureSplit
        eyebrow="Built for fast calls"
        title={<>Context, <Em>not homework</Em></>}
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
        eyebrow="Your new morning"
        title={<>Your mornings, <Em>given back</Em></>}
        lead="Open the queue with your coffee, make the calls only you can make, and get back to the work that actually needs a person. MambaHR keeps going after you close the tab."
        bullets={[
          'The queue is short because the work is already done',
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

      <QuoteBand
        quote="My mornings used to be a hundred open tabs. Now it’s one queue, three decisions, and I’m done before my coffee’s cold."
        role="Head of People · Climate tech startup, 90 people"
        img="/v2-people/feat.jpg"
        metric="Mornings back"
      />

      <PageCta title={<>Run HR from <Em>one short queue.</Em></>} />
      </main>

      <Footer />
    </>
  )
}
