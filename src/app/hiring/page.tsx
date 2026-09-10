'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'
import { PipelineBoard, SlackApproval } from '@/components/mockups'

/* ── Feature visual: real photo + floating done card ── */
function HumanCall() {
  return (
    <div className="hc">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ph" src="/v2-people/team2.jpg" alt="A hiring panel meeting a candidate" />
      <div className="float agent-edge agent-done">
        <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · done</span>
        <div className="f-t">Offer signed · Maya Chen</div>
        <div className="f-m">Senior Engineer · starts June 22</div>
      </div>
      <style jsx>{`
        .hc { position: relative; }
        .ph {
          display: block;
          width: 100%;
          border-radius: 18px;
          box-shadow: var(--shadow-float);
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .float {
          position: absolute;
          right: -14px;
          bottom: -22px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-float);
          padding: 14px 18px;
          transform: rotate(1.5deg);
        }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
        .f-m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        @media (max-width: 880px) {
          .float { right: 8px; bottom: -16px; }
        }
      `}</style>
    </div>
  )
}

export default function HiringPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Hiring"
          title={<>Hiring, <Em>handled.</Em></>}
          lead="MambaHR posts the role, screens and ranks every applicant, orders the background check, and drafts the offer inside your pay range. You make the calls: who advances, and who joins."
        >
          <div className="mock-card agent-edge agent-working"><PipelineBoard /></div>
        </PageHero>

        <AgentLoop
          eyebrow="How it runs"
          title="The hiring loop"
          lead="MambaHR runs every step that used to mean chasing inboxes. The judgment calls stay with you, clearly marked."
          steps={[
            { n: '01', label: 'The role opens', desc: 'Tell MambaHR the role, the team, and the budget, in Slack or the app. The job post is ready in minutes.', who: 'agent', time: '4 min' },
            { n: '02', label: 'Posted everywhere', desc: 'The role goes live on your careers page and your job-board feeds, written in your voice.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Screening & ranking', desc: 'MambaHR reads and ranks every applicant, with reasons. You make every advance-or-pass call.', who: 'you', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Interview scheduling (coming)', desc: 'Interview slots proposed from the interviewers\u2019 calendars once you connect Google or Microsoft 365. You confirm the panel.', who: 'you', time: 'coming' },
            { n: '05', label: 'Interview feedback', desc: 'Every interviewer records feedback on one scorecard, so the decision is made on the same evidence.', who: 'agent' },
            { n: '06', label: 'Reference check', desc: 'Ordered through Checkr, status tracked to the finish.', who: 'agent', img: '/avatars/dave.jpg' },
            { n: '07', label: 'Background check', desc: 'Ordered the moment you give the nod, with status tracked to the finish.', who: 'agent' },
            { n: '08', label: 'Offer out the door', desc: 'Offer drafted inside your pay range and prepared for e-signature. You approve and the offer goes out.', who: 'you', img: '/avatars/maya.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="The offer"
          title={<>The offer waits <Em>for you.</Em></>}
          lead="When you pick the candidate, MambaHR drafts the offer from your template, inside your pay range, and holds it. You approve in Slack or the app, and it goes out for e-signature."
          bullets={[
            'Drafted from your template with the role, the pay, and the start date filled in',
            'Anything above your pay range comes to you with the reasoning attached',
            'Signed offer starts onboarding the same minute',
          ]}
        >
          <div className="mock-card slack">
            <SlackApproval
              channel="hiring"
              subject="Maya Chen"
              kind="Offer"
              why="Maya is your pick for Senior Engineer. The offer is drafted at $195k, which is 8% above the range, because she holds a competing offer."
              fields={[
                { label: 'Range', value: '$160k to $180k' },
                { label: 'Start', value: 'June 22' },
              ]}
              context="Yours · due Thursday · also on your To do"
              reference="TO-1839"
              time="10:31 AM"
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Human sign-off"
          title={<>The final call stays human.</>}
          lead="Interviews, culture, and who gets the offer stay yours. MambaHR clears the admin, so the people you meet are worth meeting and the week you save goes into meeting them."
          bullets={[
            'MambaHR recommends; it never advances or rejects anyone on its own',
            'Every shortlist comes with the why, in plain English',
            'The offer waits for your signature, every single time',
          ]}
        >
          <HumanCall />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 6, suffix: ' days', label: 'days from job post to offer in the modeled run, with MambaHR running the loop' },
            { n: 47, label: 'candidates sourced for one role, screened overnight' },
            { n: 1, label: 'decision that stays yours: who joins' },
          ]}
        />

        <QuoteBand
          quote="The chase is gone. No more resume piles on a Sunday night. I open the pipeline, read three ranked candidates, and make the call. Hiring finally feels like judgment, not admin."
          role="People Operations Lead · AI startup, 180 people"
          img="/v2-people/marcus.jpg"
          metric="Saved 9 hrs / week"
        />

        <PageCta title={<>Hire faster. Decide better.</>} sub="A 30-minute demo on one of your open roles. Then we import your pipeline and switch you over." />
      </main>
      <Footer />
    </>
  )
}
