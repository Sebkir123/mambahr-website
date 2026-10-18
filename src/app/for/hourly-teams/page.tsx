'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, AgentLoop, FeatureSplit, PageCta, Em } from '@/components/v2/page-kit'
import { ChatThread, SlackApproval } from '@/components/mockups'

// Restaurants, trades and other hourly teams: the figures are the state guides'
// (src/content/states): Texas follows the federal $7.25 minimum and the $2.13
// tipped cash wage, California allows no tip credit and pays a fired employee
// in full on the last day, Texas by the sixth day.

export default function HourlyTeamsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For restaurants, trades and hourly teams"
          title={<>HR for hourly teams, <Em>done for you.</Em></>}
          lead="New people every week, rules that change at every state line, and a Form I-9 due by day three. MambaHR does the hiring paperwork, the onboarding and the pay changes for your crews, kitchens and shops. You make the calls."
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Jordan Reyes"
              user="Can I hire Jordan as a server at $2.13 an hour? We are in Austin."
              answer="Yes. Texas allows a tip credit, so a server can be paid $2.13 an hour as long as tips bring Jordan to $7.25 for every hour worked."
              card={{
                name: 'Jordan Reyes',
                note: 'Server, Austin TX',
                initials: 'JR',
                figures: [
                  { label: 'Cash wage', value: '$2.13', unit: '/hr' },
                  { label: 'Minimum with tips', value: '$7.25', unit: '/hr' },
                  { label: 'Tip credit', value: '$5.12', unit: '/hr', sub: 'Explained in the tip notice' },
                ],
              }}
              action={{
                title: 'Send Jordan’s offer',
                body: 'Server, $2.13 an hour plus tips, starting Monday. The tip notice goes out with the joining paperwork.',
                primary: 'Send offer',
                secondary: 'Edit',
              }}
              sources={['Texas Minimum Wage Act', 'Fair Labor Standards Act', 'Your offer template']}
            />
          </div>
        </PageHero>

        <AgentLoop
          eyebrow="How it works"
          title="A new hire, start to finish"
          lead="MambaHR does the paperwork and keeps the deadlines. You pick the people and approve what matters."
          steps={[
            { n: '01', label: 'The offer', desc: 'The hourly rate, tipped or not, the start date and the location. Drafted from your template and sent when you approve it.', who: 'you', img: '/avatars/maya.jpg' },
            { n: '02', label: 'Joining paperwork', desc: 'Form I-9, the W-4, your state’s forms and notices, and the tip notice for a tipped job. Sent to the new hire before day one.', who: 'agent', time: 'same day' },
            { n: '03', label: 'Day one', desc: 'You check the I-9 documents in person. MambaHR keeps the Section 2 deadline: the third business day after the start.', who: 'you' },
            { n: '04', label: 'On payroll', desc: 'The new hire is added to payroll, powered by Deel. A person approves every run.', who: 'agent' },
            { n: '05', label: 'Questions', desc: 'How many sick hours are left, when payday is, how overtime is paid: answered from your policy and the state’s rules.', who: 'agent' },
            { n: '06', label: 'Leaving', desc: 'Final pay by your state’s deadline, the notices it requires, and the record closed. You approve the final pay.', who: 'you', img: '/avatars/tom.jpg' },
          ]}
        />

        <FeatureSplit
          eyebrow="Tipped pay"
          title={<>Tip credits, <Em>by the state’s rules.</Em></>}
          lead="Where your state allows a tip credit, a tipped job can start at the state’s cash wage, and the new hire’s tip notice explains the credit. California allows none, and MambaHR says so before an offer goes out."
          bullets={[
            'The cash wage and the credit come from the state’s rules, never typed in by hand',
            'Each pay run asks you to confirm tips brought everyone to the minimum',
            'A shortfall MambaHR can see is added to the run as its own line before you approve',
            'Tips are reported to your payroll provider, and MambaHR reminds you to set that up',
          ]}
        >
          <div className="mock-card slack">
            <SlackApproval
              channel="payroll"
              subject="Week of Oct 20"
              kind="Pay run"
              why="Three servers are paid the tipped cash wage this week. Confirm their tips brought each of them to $7.25 an hour, or I add the difference to the run."
              fields={[
                { label: 'Tipped', value: '3 people' },
                { label: 'Payday', value: 'Friday' },
              ]}
              context="Yours · due Thursday · also on your To do"
              reference="TO-2214"
              time="9:05 AM"
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="When someone leaves"
          title={<>Final pay, <Em>on the state’s clock.</Em></>}
          lead="In California a fired employee is paid in full on the last day. In Texas it is the sixth day. MambaHR knows the deadline for the state each person works in, prepares the final pay and the notices, and puts them in front of you."
          bullets={[
            'The deadline for the work state, counted from the last day',
            'Unused vacation paid out where the state requires it',
            'Every step kept in the person’s history',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Luis Ortega"
              user="Luis quit today without notice. When does his last check have to go out?"
              answer="By Tuesday. Luis works in California, so a quit without notice is paid within 72 hours. I have drafted his final pay with his unused vacation."
              card={{
                name: 'Luis Ortega',
                note: 'Line cook, San Jose CA',
                initials: 'LO',
                figures: [
                  { label: 'Last day', value: 'Sat', sub: 'Quit without notice' },
                  { label: 'Final pay due', value: 'Tue', sub: 'Within 72 hours' },
                  { label: 'Vacation paid out', value: '18', unit: 'hours' },
                ],
              }}
              action={{
                title: 'Approve Luis’s final pay',
                body: 'Due Tuesday, with 18 hours of vacation. Payroll is told when you approve.',
                primary: 'Approve',
                secondary: 'Edit',
              }}
              sources={['California Labor Code 202', 'Vacation policy', 'Payroll calendar']}
            />
          </div>
        </FeatureSplit>

        <PageCta
          title={<>Your crew’s paperwork, <Em>handled.</Em></>}
          sub="Join early access. Founding customer pricing is held for your company: from $14 per employee a month, and payroll through Deel at $10 per employee paid."
        />
      </main>
      <Footer />
    </>
  )
}
