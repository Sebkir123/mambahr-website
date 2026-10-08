'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import { PipelineBoard, SlackApproval, type PipelineColumn } from '@/components/mockups'

/* ── Hero board data: applications tracked, reviewed by the hiring team ── */
const HIRING_COLUMNS: PipelineColumn[] = [
  { name: 'Applied', color: '#73879D', count: 12, cards: [
    { name: 'Anna Keller', sub: 'Careers page · 2h ago' },
    { name: 'Marco Rossi', sub: 'LinkedIn · 5h ago' },
    { name: 'Yuki Tanaka', sub: 'Referral · yesterday', pill: 'Referral' },
  ] },
  { name: 'Review', color: '#7B8A67', count: 6, cards: [
    { name: 'Sofia Lindqvist', sub: 'Hiring team reviewing · notes attached', pill: 'Your review' },
    { name: 'Daniel Okafor', sub: 'Resume and answers attached' },
  ] },
  { name: 'Interview', color: '#9A8153', count: 4, cards: [
    { name: 'Elena Petrova', sub: 'Panel Thu 10:00 · 3 of 4 feedback forms in' },
    { name: 'Tom Harrison', sub: 'Onsite Fri · invite sent' },
  ] },
  { name: 'Offer', color: '#9C7B95', count: 1, cards: [
    { name: 'Maya Chen', sub: '$165k · in range · awaiting you', pill: 'Awaiting you' },
  ] },
  { name: 'Hired', color: '#6B8B82', count: 1, cards: [
    { name: 'Noah Bennett', sub: 'Starts Nov 3 · onboarding started' },
  ] },
]

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
          background: var(--bg-card);
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
          title={<>Hiring, <Em>without the chasing.</Em></>}
          lead="MambaHR posts the job with its pay range, collects every application in one place, schedules interviews, orders the background check, and drafts the offer. Your team reviews the applicants and decides who joins."
        >
          <div className="mock-card"><PipelineBoard columns={HIRING_COLUMNS} /></div>
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title="From job post to signed offer"
          lead="MambaHR handles the follow-ups and the paperwork. Your team makes every hiring decision."
          steps={[
            { n: '01', label: 'The role opens', desc: 'Tell MambaHR the role, team, and budget in Slack or the app. It drafts the job post with the pay range for you to approve.', who: 'agent', time: '4 min' },
            { n: '02', label: 'The job is posted', desc: 'It goes live on your careers page and job boards.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Applications in one place', desc: 'Every application lands in one pipeline. Your team reviews each one and decides who moves forward.', who: 'you', img: '/avatars/tom.jpg' },
            { n: '04', label: 'Interviews scheduled', desc: 'Interview times come from your interviewers\u2019 calendars once Google or Microsoft 365 is connected. You confirm the panel.', who: 'you' },
            { n: '05', label: 'Interview feedback', desc: 'Every interviewer fills in the same feedback form, so your team decides on the same evidence.', who: 'agent' },
            { n: '06', label: 'Reference check', desc: 'Ordered through Checkr and tracked until it is done.', who: 'agent', img: '/avatars/dave.jpg' },
            { n: '07', label: 'Background check', desc: 'Ordered through Checkr when you say go, and tracked until it is done.', who: 'agent' },
            { n: '08', label: 'The offer', desc: 'Drafted inside your pay range and ready for e-signature. It goes out when you approve it.', who: 'you', img: '/avatars/maya.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="The offer"
          title={<>The offer waits <Em>for you.</Em></>}
          lead="When your team picks a candidate, MambaHR drafts the offer from your template, inside your pay range. You approve it in Slack or the app, and it goes out for e-signature."
          bullets={[
            'Role, pay, and start date filled in from your template',
            'An offer above your pay range comes to you with the reason',
            'A signed offer starts onboarding right away',
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
          eyebrow="Your decision"
          title={<>People make <Em>every hiring decision.</Em></>}
          lead="Interviews, team fit, and who gets the offer stay with your team. MambaHR takes the admin, so you have more time to meet candidates."
          bullets={[
            'MambaHR never advances or rejects an applicant',
            'Your team reviews every application',
            'No offer goes out without your approval',
          ]}
        >
          <HumanCall />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 6, suffix: ' days', label: 'from job post to offer in a sample run' },
            { n: 47, label: 'applications for one role, all in one pipeline' },
            { n: 0, label: 'applicants advanced or rejected by MambaHR. Your team decides.' },
          ]}
        />


        <PageCta title={<>Post to signed offer, <Em>in one place.</Em></>} sub="A 30-minute demo on one of your open roles. Then we import your pipeline and switch you over." />
      </main>
      <Footer />
    </>
  )
}
