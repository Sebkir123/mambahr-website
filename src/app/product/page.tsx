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
  { n: '01', img: '/avatars/maya.jpg',   label: 'Offer letter sent, Maya Chen',   desc: 'Senior Engineer · $195k · above band 8%',     who: 'agent', time: '2 min' },
  { n: '02', img: '/avatars/priya.jpg',  label: 'Leave approved, Jordan Lee',    desc: 'FMLA eligibility checked · job protected · statute cited', who: 'agent', time: '4 min' },
  { n: '03', img: '/avatars/marcus.jpg', label: 'Leave approved, Marcus Webb',    desc: '12 weeks, federal and Colorado stacked · calendar and payday updated', who: 'you',   time: 'Pending' },
  { n: '04', img: '/avatars/anna.jpg',  label: 'Separation docs, Sarah Lin',     desc: 'State-aware final pay · signature chain ready', who: 'you',   time: 'Review' },
]

/* The onboarding item in focus on the To do desk. */
const ONBOARDING: TodoFocus = {
  ref: 'TO-1851',
  due: 'starts Monday',
  position: '1 of 4 · next',
  title: 'Day one · Maya Chen',
  person: 'Maya Chen, Senior Engineer, signed Thursday. Yours.',
  facts: 'Offer countersigned. Form I-9 started, E-Verify pending. Okta, Slack and Google accounts requested. Laptop ordered to Berlin.',
  finding: '6 of 7 steps done, one needs you',
  read: 'Everything is in place for Monday except the buddy. Priya Nair is on the same team and has had two new starters this year. Recommend assigning Priya.',
  decisions: [
    { label: 'Assign Priya', primary: true, consequence: 'Priya is told today, day-one plan sent to Maya' },
    { label: 'Pick someone else', consequence: 'Nothing is sent until you choose' },
  ],
  history: [
    { what: 'Offer signed', when: 'Thu 16:20' },
    { what: 'Accounts requested', when: 'Thu 16:21' },
    { what: 'Form I-9 started', when: 'Fri 9:02' },
    { what: 'Came to a person', when: 'Fri 9:05' },
  ],
}

const ONBOARDING_QUEUE = [
  { name: 'Maya Chen', kind: 'Day one', date: 'Mon' },
  { name: 'Jackson Bauer', kind: 'Compensation change', date: 'Today' },
  { name: 'Leo Schulz', kind: 'Leave request', date: 'Tomorrow' },
  { name: 'Marcus Webb', kind: 'Separation', date: 'Fri' },
]

/* The capability lists that used to be four more splits, as short chips. */
const ALSO: { label: string; href: string }[] = [
  { label: 'Market bands on every role', href: '/compensation' },
  { label: 'Pay-equity check before a raise is final', href: '/compensation' },
  { label: 'Statute cited on every decision', href: '/compliance' },
  { label: 'Append-only audit log', href: '/compliance' },
  { label: 'WARN notices and severance math', href: '/rif' },
  { label: 'Internal roles surfaced before a cut', href: '/rif' },
  { label: 'Offers, NDAs and policies, e-signed', href: '/documents' },
  { label: 'Documents filed and retained per policy', href: '/documents' },
  { label: 'Careers page on your domain', href: '/job-portal' },
  { label: 'Org chart that draws itself', href: '/people' },
  { label: 'PTO balances, tracked', href: '/leave' },
  { label: 'Form I-9 collection', href: '/onboarding' },
  { label: 'Payroll change files for Deel', href: '/payroll' },
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
          title={<>See the agent <Em>run the work.</Em></>}
          lead="Hiring, onboarding, leave, compensation, compliance, handled end to end, with a human on the calls that matter."
        >
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: 'var(--shadow-float)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="mamba-chip working" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', background: 'var(--gold-tint)', borderRadius: 999, padding: '4px 10px' }}>
                MambaHR · working
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>4 workflows in flight</span>
            </div>
            {STEPS.slice(0, 3).map((s) => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border-faint)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums', width: 20 }}>{s.n}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.img && <img src={s.img} alt="" width={24} height={24} style={{ borderRadius: 999, objectFit: 'cover' }} />}
                <span style={{ flex: 1, fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 12, color: s.who === 'you' ? 'var(--gold-dark)' : 'var(--text-faint)' }}>
                  {s.who === 'you' ? 'You decide' : 'MambaHR'}
                </span>
              </div>
            ))}
          </div>
        </PageHero>

        <AgentLoop
          eyebrow="Live today"
          title="Four workflows. One morning."
          lead="A sample of what MambaHR handles while you focus on what requires you."
          steps={STEPS}
        />

        <FeatureSplit
          eyebrow="Hire"
          title="Req to signed offer, on one board."
          lead="The role is posted, every applicant is read and ranked with reasons, interviews get a scorecard, the background check runs, and the offer waits for you in band."
          bullets={[
            'Careers page and job-board feeds, posted the same day',
            'Every applicant ranked with the why, you make every advance-or-pass call',
            'Offer drafted in band, e-signed after your nod',
          ]}
        >
          <div className="mock-card"><PipelineBoard /></div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Onboard"
          title="Day one, ready before they arrive."
          lead="A signed offer starts everything: the Form I-9, the account requests, the laptop, the first-week plan. What needs a person lands on your To do with the read already done."
          bullets={[
            'Form I-9 and E-Verify started from the signed offer',
            'IdP, Slack and app accounts requested; devices ordered',
            'The one call that needs you, with the recommendation attached',
          ]}
        >
          <div className="mock-card"><TodoDesk show="pane" queue={ONBOARDING_QUEUE} focus={ONBOARDING} summary="4 need you today" /></div>
        </FeatureSplit>

        <FeatureSplit
          eyebrow="Leave"
          title="Leave that reads the statute for you."
          lead="Requests come in as plain text. MambaHR checks eligibility, cites the rule, auto-approves within policy, and sends the rest to you where you already are."
          bullets={[
            'PTO accrual and balances, tracked automatically',
            'FMLA eligibility checked; state leave cited and routed to a person for the stacking call',
            'Anything medical or ambiguous escalates',
          ]}
        >
          <div className="mock-card slack">
            <SlackApproval
              subject="Leo Schulz"
              kind="Leave request"
              why="Leo asked for 12 weeks of bonding leave from Nov 3. He is FMLA-eligible and the dates fit the policy, but it overlaps the release."
              fields={[
                { label: 'Dates', value: 'Nov 3 to Jan 23, 12 weeks' },
                { label: 'Balance after', value: '0 weeks FMLA · 14 days PTO' },
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
          title="Every exit, prepared and human-approved."
          lead="Ask for a separation and the paperwork, the final-pay math for that state, and the account shutdowns are lined up. Nothing happens to anyone until you approve it."
          bullets={[
            'Separation agreement and final pay per the state rule',
            'Accounts revoked and devices recovered on the last day, not after',
            'A person signs off on every single exit',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              greeting="Good morning, Sam."
              needs="4 things need you today"
              context="Discussing Marcus Webb"
              user="Prepare a separation for Marcus Webb, last day Friday. Standard severance."
              tool={{ title: 'Prepared', status: 'Done', body: 'Separation agreement draft · Colorado final-pay rule · Severance at 6 weeks · Okta, Slack, GitHub revocations queued for Fri 18:00' }}
              assistant={[
                'Colorado requires final pay immediately on an involuntary separation, so payroll is set to run Friday. Severance is 6 weeks at his current base, $17,300.',
                'The agreement is drafted with the OWBPA language since Marcus is over 40. Nothing is sent until you approve.',
              ]}
              approval={{ detail: 'Send the separation agreement to Marcus Webb for signature and schedule the Friday shutdowns.', approve: 'Approve', decline: 'Hold' }}
            />
          </div>
        </FeatureSplit>

        <section className="also">
          <div className="wrap">
            <p className="eyebrow">Also handled</p>
            <h2 className="title">The rest of the job, without another page each.</h2>
            <ul className="chips">
              {ALSO.map((a) => (
                <li key={a.label}><Link href={a.href}>{a.label}</Link></li>
              ))}
            </ul>
          </div>
        </section>

        <PageCta
          title={<>One AI department.<br />Every HR function.</>}
          sub="Replace the admin work, keep the humans where they matter."
        />
      </main>
      <Footer />
      <style jsx>{`
        .also { background: var(--bg); padding-block: clamp(64px, 8vw, 104px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7A5A2E; margin: 0 0 16px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(26px, 3vw, 36px); line-height: 1.1; letter-spacing: -0.02em; color: var(--text); margin: 0 0 24px; }
        .chips { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .chips :global(a) {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg);
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
