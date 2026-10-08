'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import {
  PageHero, AgentLoop, FeatureSplit, PageCta, Em,
  type LoopStep,
} from '@/components/v2/page-kit'
import { PipelineBoard, TodoDesk, SlackApproval, ChatThread, type TodoFocus } from '@/components/mockups'

const STEPS: LoopStep[] = [
  { n: '01', img: '/avatars/maya.jpg',   label: 'Offer letter sent, Maya Chen',   desc: 'Senior Engineer · $165k · inside your pay range',     who: 'agent', time: '2 min' },
  { n: '02', img: '/avatars/priya.jpg',  label: 'Leave approved, Jordan Lee',    desc: 'Family leave (FMLA) eligibility checked · job protected · statute cited', who: 'agent', time: '4 min' },
  { n: '03', img: '/avatars/dave.jpg',   label: 'Leave request, Dave Buchanan',   desc: '12 weeks, federal and Colorado leave run together · calendar and payday ready', who: 'you',   time: 'Pending' },
  { n: '04', img: '/avatars/anna.jpg',  label: 'Separation docs, Sarah Lin',     desc: 'Final pay by state rule · ready for signature', who: 'you',   time: 'Review' },
]

/* The onboarding item in focus on the To do desk. */
const ONBOARDING: TodoFocus = {
  eyebrow: 'Started when Maya signed · Thursday',
  position: '1 of 4',
  title: 'Day one for Maya Chen',
  summary: 'Maya starts Monday as a Senior Engineer. Six of seven steps are done; one needs you.',
  facts: [
    { k: 'Offer', v: 'Countersigned Thursday' },
    { k: 'Form I-9', v: 'Started; E-Verify pending' },
    { k: 'Accounts', v: 'Okta and Slack requested' },
    { k: 'Laptop', v: 'Request sent to IT' },
  ],
  read: 'Everything is ready for Monday except Form I-9 Section 2: someone at the company has to review her documents by Wednesday.',
  decisions: [
    { label: 'Assign to me', primary: true, consequence: 'It goes on your To do for Monday.' },
    { label: 'Pick someone else', consequence: 'Nothing is assigned until you choose.' },
  ],
  history: [
    { what: 'Offer signed', when: 'Thu 16:20' },
    { what: 'Accounts requested', when: 'Thu 16:21' },
    { what: 'Form I-9 started', when: 'Fri 9:02' },
  ],
}

const ONBOARDING_QUEUE = [
  { title: 'Maya Chen · day one', meta: 'Onboarding · Yours', date: 'Mon' },
  { title: 'Jackson Bauer · raise', meta: 'Pay · Yours', date: 'Due today' },
  { title: 'Leo Schulz · 5 days off', meta: 'Time off · Yours', date: 'Tomorrow' },
  { title: 'Marcus Webb · last day', meta: 'Offboarding · Yours', date: 'Fri' },
]

/* The capability lists that used to be four more splits, as short chips. */
const ALSO: { label: string; href: string }[] = [
  { label: 'Pay ranges for every role', href: '/compensation' },
  { label: 'Pay-equity check before a raise is final', href: '/compensation' },
  { label: 'The law cited on every decision', href: '/compliance' },
  { label: 'A change log no one can edit', href: '/compliance' },
  { label: 'Layoff notices (WARN Act) and severance math', href: '/rif' },
  { label: 'Open internal roles shown before a layoff', href: '/rif' },
  { label: 'Offers, NDAs and policies, e-signed', href: '/documents' },
  { label: 'Documents filed and retained per policy', href: '/documents' },
  { label: 'Careers page on your domain', href: '/job-portal' },
  { label: 'Org chart, always up to date', href: '/people' },
  { label: 'Time-off balances, tracked', href: '/leave' },
  { label: 'Form I-9 collection', href: '/onboarding' },
  { label: 'Payroll change files, or Deel-managed payroll', href: '/payroll' },
  { label: 'Ask anything in Slack', href: '/mamba' },
]

export default function ProductPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="The product"
          title={<>See MambaHR <Em>do the work.</Em></>}
          lead="MambaHR does the admin in hiring, onboarding, leave, pay changes and compliance. Your team approves the sensitive calls."
        >
          <div className="mock-card"><TodoDesk show="pane" /></div>
        </PageHero>

        <AgentLoop
          eyebrow="A sample morning"
          title="Four jobs. One morning."
          lead="What MambaHR handles on a normal morning, and what it leaves for you to decide."
          steps={STEPS}
        />

        <FeatureSplit
          eyebrow="Hire"
          title="Job post to signed offer, on one board."
          lead="MambaHR posts the role, collects every application in one place, schedules interviews and orders the background check. You decide who moves forward, and the offer waits for your approval, inside your pay range."
          bullets={[
            'Careers page and job-board feeds, posted the same day',
            'Every application in one place; you decide who moves forward',
            'Offer drafted inside your pay range, e-signed after you approve',
          ]}
        >
          <div className="mock-card"><PipelineBoard /></div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Onboard"
          title="Day one, ready before they arrive."
          lead="A signed offer starts everything: the Form I-9, the account and laptop requests, the first-week plan. Anything that needs a person lands on your To do list, with a recommendation."
          bullets={[
            'Form I-9 and E-Verify started from the signed offer',
            'Login, Slack, and app accounts requested; laptop request sent to IT',
            'The one call that needs you, with the recommendation attached',
          ]}
        >
          <div className="mock-card"><TodoDesk show="pane" queue={ONBOARDING_QUEUE} focus={ONBOARDING} summary="4 need you today" /></div>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Leave"
          title="Leave requests, checked against the law."
          lead="Employees ask in plain words. MambaHR checks eligibility, cites the rule, approves what fits your policy, and sends the rest to you."
          bullets={[
            'Time-off accrual and balances, tracked automatically',
            'Family leave (FMLA) eligibility checked; state rules cited, and a person decides how they combine',
            'Anything medical or unclear goes to a person',
          ]}
        >
          <div className="mock-card slack">
            <SlackApproval
              subject="Leo Schulz"
              kind="Leave request"
              why="Leo asked for 12 weeks of bonding leave from Nov 3. He is FMLA-eligible and the dates fit the policy, but it overlaps the release."
              fields={[
                { label: 'Dates', value: 'Nov 3 to Jan 23, 12 weeks' },
                { label: 'Balance after', value: '0 weeks FMLA · 14 days off' },
              ]}
              context="Yours · due tomorrow · also on your To do"
              reference="TO-1847"
              time="8:52 AM"
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Exit"
          title="Every exit prepared, and approved by you."
          lead="Ask for a separation and the paperwork, the final-pay math for that state, and the account shutdowns are lined up. Nothing happens to anyone until you approve it."
          bullets={[
            'Separation agreement and final pay per the state rule',
            'Accounts switched off on the last day, and a device return requested',
            'You approve every exit',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Marcus Webb"
              user="Prepare a separation for Marcus Webb, last day Friday. Standard severance."
              answer="Marcus Webb's separation is ready. Nothing is sent until you approve."
              card={{
                name: 'Marcus Webb',
                note: 'Separation, Colorado',
                initials: 'MW',
                figures: [
                  { label: 'Last day', value: 'Fri', sub: 'Accounts off at 6:00 PM' },
                  { label: 'Final pay', value: 'Fri', sub: 'Colorado: immediately' },
                  { label: 'Severance', value: '$17,300', sub: '6 weeks at base' },
                ],
              }}
              action={{
                title: 'Send Marcus the separation agreement',
                body: 'It carries the age-discrimination waiver language (OWBPA) since Marcus is over 40. Okta, Slack and GitHub switch off Friday at 6:00 PM.',
                primary: 'Approve',
                secondary: 'Hold',
              }}
              sources={['Separation agreement draft', 'Colorado final-pay rule', 'Severance policy']}
            />
          </div>
        </FeatureSplit>

        <section className="also">
          <div className="wrap">
            <p className="eyebrow">Also included</p>
            <h2 className="title">Everything else MambaHR takes care of.</h2>
            <ul className="chips">
              {ALSO.map((a) => (
                <li key={a.label}><Link href={a.href}>{a.label}</Link></li>
              ))}
            </ul>
          </div>
        </section>

        <PageCta
          title={<>Less admin.<br />More time for your people.</>}
          sub="A 30-minute demo using examples from your company. Then we import your data and you are up and running."
        />
      </main>
      <Footer />
      <style jsx>{`
        .also { background: var(--bg); padding-block: clamp(64px, 8vw, 104px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(26px, 3vw, 36px); line-height: 1.1; letter-spacing: -0.02em; color: var(--text); margin: 0 0 24px; }
        .chips { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .chips :global(a) {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }
        .chips :global(a:hover) { color: var(--gold-dark); border-color: var(--gold-light); background: var(--gold-tint); }
      `}</style>
    </>
  )
}
