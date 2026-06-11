'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: a review draft being written, every claim sourced ── */
function ReviewDraftCard() {
  const lines = [
    { text: 'Shipped the Q2 launch ahead of plan and owned the rollout end to end.', src: 'Q2 launch · cited' },
    { text: 'Mentored two new hires through ramp; both hit full productivity early.', src: 'Onboarding plans · cited' },
    { text: 'Peer feedback highlights calm ownership under pressure.', src: '4 peer reviews · cited' },
  ]
  return (
    <div className="rd agent-edge agent-working agent-lg">
      <div className="head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/anna.jpg" alt="Anna Wilson" width={38} height={38} />
        <div className="hmain">
          <div className="hname">Anna Wilson · mid-year review</div>
          <div className="hmeta">Product Design · cycle closes Fri, Jun 26</div>
        </div>
        <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Mamba · drafting</span>
      </div>
      <div className="body">
        {lines.map((l) => (
          <div key={l.src} className="line">
            <p className="lt">&ldquo;{l.text}&rdquo;</p>
            <span className="src">{l.src}</span>
          </div>
        ))}
      </div>
      <div className="foot">
        <span className="fdot" aria-hidden="true" />
        Draft ready for her manager · nothing sent without sign-off
      </div>
      <style jsx>{`
        .rd {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-faint);
          background: var(--bg-warm);
        }
        .av { width: 38px; height: 38px; border-radius: 999px; object-fit: cover; flex: none; border: 2px solid #fff; box-shadow: var(--shadow-sm); }
        .hmain { flex: 1; min-width: 0; }
        .hname { font-size: 14.5px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
        .hmeta { font-size: 12px; color: var(--text-faint); margin-top: 2px; }
        .body { padding: 6px 20px; }
        .line { padding: 13px 0; }
        .line + .line { border-top: 1px solid var(--border-faint); }
        .lt { font-size: 13.5px; line-height: 1.55; color: var(--text-muted); margin: 0; }
        .src {
          display: inline-block;
          margin-top: 7px;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gold-dark);
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.22);
          border-radius: 999px;
          padding: 3px 9px;
        }
        .foot {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 20px;
          border-top: 1px solid var(--border-faint);
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .fdot { width: 8px; height: 8px; border-radius: 999px; background: var(--color-green); flex: none; }
      `}</style>
    </div>
  )
}

/* ── PIP fragment: structured plan awaiting human approval ── */
function PipCard() {
  return (
    <div className="pip agent-edge agent-done">
      <div className="head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="av" src="/avatars/marcus.jpg" alt="" width={34} height={34} />
        <div className="hmain">
          <div className="hname">Improvement plan · drafted for review</div>
          <div className="hmeta">60-day plan · 3 milestones · check-ins scheduled</div>
        </div>
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Mamba · done</span>
      </div>
      <div className="rows">
        {[
          { lbl: 'Milestone 1 · weeks 1–2', desc: 'Clear, written expectations agreed with the manager' },
          { lbl: 'Milestone 2 · weeks 3–6', desc: 'Weekly check-ins on the calendar — both sides prepared' },
          { lbl: 'Milestone 3 · weeks 7–8', desc: 'Outcome review with documented, fair criteria' },
        ].map((r) => (
          <div key={r.lbl} className="row">
            <span className="tick" aria-hidden="true" />
            <div>
              <div className="rl">{r.lbl}</div>
              <div className="rd2">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="approve">
        <span className="ad" aria-hidden="true" />
        <span className="at">Awaiting your approval — nothing reaches the employee until you say so</span>
        <span className="btn">Review plan</span>
      </div>
      <style jsx>{`
        .pip {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          overflow: hidden;
        }
        .head { display: flex; align-items: center; gap: 12px; padding: 15px 18px; border-bottom: 1px solid var(--border-faint); }
        .av { width: 34px; height: 34px; border-radius: 999px; object-fit: cover; flex: none; }
        .hmain { flex: 1; min-width: 0; }
        .hname { font-size: 14px; font-weight: 700; color: var(--text); }
        .hmeta { font-size: 12px; color: var(--text-faint); margin-top: 2px; }
        .rows { padding: 4px 18px; }
        .row { display: flex; gap: 11px; align-items: flex-start; padding: 11px 0; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .tick { flex: none; width: 16px; height: 16px; margin-top: 2px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
        .tick::after { content: ''; position: absolute; left: 5px; top: 2.5px; width: 3px; height: 7px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .rl { font-size: 13px; font-weight: 600; color: var(--text); }
        .rd2 { font-size: 12.5px; color: var(--text-muted); margin-top: 2px; line-height: 1.45; }
        .approve {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          background: var(--gold-tint);
          border-top: 1px solid rgba(138, 101, 53, 0.22);
        }
        .ad { width: 8px; height: 8px; border-radius: 999px; background: var(--gold); flex: none; }
        .at { flex: 1; font-size: 12.5px; color: var(--gold-dark); font-weight: 600; line-height: 1.4; }
        .btn { flex: none; font-size: 12.5px; font-weight: 600; color: #fff; background: #14110C; border-radius: 999px; padding: 7px 15px; }
        @media (max-width: 640px) { .approve { flex-wrap: wrap; } }
      `}</style>
    </div>
  )
}

/* ── Warm split: real photo + floating done-card ── */
function PhotoCard() {
  return (
    <div className="pc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team.jpg" alt="A manager and her report in a one-on-one" width={640} height={460} />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Mamba · done</span>
        <div className="ft">Calibration packets delivered</div>
        <div className="fm">14 managers · every claim sourced · 9:02 AM</div>
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
        .ft { font-size: 13.5px; font-weight: 700; color: var(--text); margin-top: 9px; }
        .fm { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
        @media (max-width: 880px) { .float { left: 12px; } }
      `}</style>
    </div>
  )
}

export default function PerformancePage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        <PageHero
          eyebrow="Performance"
          title={<>Reviews, <Em>written.</Em></>}
          lead="Review season eats three weeks of every manager's life. Mamba launches the cycle, chases the stragglers, and drafts every review from real, cited work — your managers just edit, rate, and sign."
          proof="Loved by managers at review time"
          photo="/v2-people/sofia.jpg"
          photoChip="Mamba · done"
          photoCaption="Anna’s review · delivered on time"
        >
          <ReviewDraftCard />
        </PageHero>

        <AgentLoop
          eyebrow="The loop"
          title={<>Review season, <Em>handled.</Em></>}
          lead="Mamba runs the machinery of review season. Your managers keep the judgment."
          steps={[
            { n: '01', label: 'Launches the cycle', desc: 'Schedules, reviewer pairings, and reminders go out — no spreadsheet of who owes what.', who: 'agent', time: 'day 1' },
            { n: '02', label: 'Chases reviewers so you don’t', desc: 'Polite, persistent nudges until every review is in. You never send the awkward follow-up.', who: 'agent', time: 'ongoing', img: '/avatars/maya.jpg' },
            { n: '03', label: 'Drafts from real work, with citations', desc: 'First drafts built from real work evidence — every claim cites its source, nothing invented.', who: 'agent', time: 'min' },
            { n: '04', label: 'Flags gaps and bias risks', desc: 'Thin evidence, recency bias, and inconsistent language get surfaced before calibration, not after.', who: 'agent' },
            { n: '05', label: 'Builds calibration packets', desc: 'Side-by-side summaries for every manager in the room, prepared the same way every time.', who: 'agent', time: 'hrs', img: '/avatars/priya.jpg' },
            { n: '06', label: 'Managers own the words and the rating', desc: 'They edit the draft, set the rating, and sign the final review. Every final word is theirs.', who: 'you', img: '/avatars/dave.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Improvement plans"
          title={<>PIPs without <Em>the dread.</Em></>}
          lead="When someone&rsquo;s struggling, the hardest part is starting. Mamba drafts a fair, structured plan with clear milestones and check-ins already on the calendar — and you approve it before anything reaches the employee."
          bullets={[
            'A structured, consistent plan — not a blank page at 9 PM',
            'Check-ins scheduled for both sides from day one',
            'You review and approve before the employee sees a word',
          ]}
        >
          <PipCard />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="What changes"
          title={<>Conversations, <Em>not paperwork.</Em></>}
          lead="When the chasing, drafting, and packet-building disappear, review season becomes what it was supposed to be: managers and their people, talking honestly about the work."
          bullets={[
            'Managers spend their hours on conversations, not forms',
            'Every review starts from evidence, so feedback lands fair',
            'No cycle slips because one reviewer went quiet',
          ]}
        >
          <PhotoCard />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 80, suffix: '%', label: 'less time writing first drafts' },
            { n: 100, suffix: '%', label: 'of draft claims cite real work' },
            { n: 1, label: 'owner of every final word: the manager' },
          ]}
        />

        <QuoteBand
          quote="Review season used to swallow three weeks of my life. Now the drafts are waiting, sourced, the day the cycle opens — and my managers walk into calibration actually prepared."
          name="Dana Whitfield"
          role="Head of People · Lumen Robotics"
          img="/v2-people/feat.jpg"
          metric="Saved 12 hrs / week"
        />

        <PageCta title={<>Review season, <Em>already done.</Em></>} />
      </main>
      <Footer />
    </>
  )
}
