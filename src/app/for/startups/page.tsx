'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, AgentLoop, FeatureSplit, PageCta, Em } from '@/components/v2/page-kit'
import { ChatThread, PeopleDirectory, SlackApproval } from '@/components/mockups'

// Startups, most of them in California: the figures are the California state
// guide's (src/content/states/group-a.ts): a pay scale in job posts at 15
// employees, at least 40 hours or 5 days of paid sick leave, daily overtime
// after 8 hours, and final pay on the last day for a firing.

export default function StartupsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For startups"
          title={<>HR for startups, <Em>right in Slack.</Em></>}
          lead="Ask in Slack and MambaHR does the work: the offer inside your range, the onboarding, the California rules and the payroll change. Founders and managers make the calls."
        >
          <div className="mock-card slack">
            <SlackApproval
              channel="hiring"
              subject="Priya Shah"
              kind="Offer"
              why="Priya is your pick for Founding Engineer. The offer is drafted at $195k, inside the $180k to $210k range in the job post."
              fields={[
                { label: 'Range', value: '$180k to $210k' },
                { label: 'Start', value: 'Nov 3' },
              ]}
              context="Yours · due today · also on your To do"
              reference="TO-1907"
              time="4:12 PM"
            />
          </div>
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title="From first hire to payday"
          lead="MambaHR does the admin between the decisions. Your team decides who joins, what they earn and when."
          steps={[
            { n: '01', label: 'Ask in Slack', desc: '“We are hiring a founding engineer.” MambaHR drafts the job post with the pay range California requires.', who: 'agent', time: '4 min' },
            { n: '02', label: 'Interviews', desc: 'Times come from your interviewers’ own calendars once Google or Microsoft 365 is connected. You confirm the panel.', who: 'you', img: '/avatars/priya.jpg' },
            { n: '03', label: 'The offer', desc: 'Drafted inside your range, approved by you in Slack, then out for e-signature.', who: 'you' },
            { n: '04', label: 'Onboarding', desc: 'Form I-9, the W-4, California’s wage notice and your policies, sent before day one. The laptop and accounts are requested from IT.', who: 'agent', time: 'same day' },
            { n: '05', label: 'Payroll', desc: 'Added to payroll, powered by Deel. A person approves every run.', who: 'agent' },
            { n: '06', label: 'Questions', desc: 'Your team asks in Slack and gets the answer with your policy cited.', who: 'agent', img: '/avatars/marcus.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="California"
          title={<>California’s rules, <Em>built in.</Em></>}
          lead="California is stricter than federal law, and much of it starts at 5 employees. MambaHR applies the rules for the state each person works in, so a 12-person startup in San Francisco gets them right from the first hire."
          bullets={[
            'A pay scale in every job post once you have 15 employees',
            'At least 40 hours or 5 days of paid sick leave a year, tracked',
            'Overtime after 8 hours in a day for non-exempt people',
            'Final pay on the last day when you let someone go',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Sam Patel"
              user="Can we let Sam go on Friday and pay him out with the next payroll?"
              answer="No. Sam works in California, so his final pay, including unused vacation, is due on his last day. I have drafted it for Friday."
              card={{
                name: 'Sam Patel',
                note: 'Final pay, San Francisco',
                initials: 'SP',
                figures: [
                  { label: 'Last day', value: 'Fri', sub: 'Oct 31' },
                  { label: 'Final pay due', value: 'Fri', sub: 'Same day' },
                  { label: 'If paid late', value: '30', unit: 'days', sub: 'of wages, at most' },
                ],
              }}
              action={{
                title: 'Approve Sam’s final pay',
                body: 'Due Friday with his last day. Unused vacation included. Payroll is told when you approve.',
                primary: 'Approve',
                secondary: 'Edit',
              }}
              sources={['California Labor Code 201', 'Vacation policy', 'Payroll calendar']}
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Switching"
          title={<>Bring your people <Em>from Gusto or Rippling.</Em></>}
          lead="Moving from Gusto, Rippling, BambooHR, ADP or a spreadsheet is one import. Your people are in within a day, with their history and balances. Payroll moves to Deel, and MambaHR sends it every change."
          bullets={[
            'History and time-off balances carried over',
            'You check the import before anything goes live',
            'Then you can retire the old system',
          ]}
        >
          <div className="mock-card">
            <PeopleDirectory />
          </div>
        </FeatureSplit>

        <PageCta
          title={<>From first hire to payday, <Em>in Slack.</Em></>}
          sub="Join early access. Founding customer pricing is held for your company: from $14 per employee a month, and payroll through Deel at $10 per employee paid."
        />
      </main>
      <Footer />
    </>
  )
}
