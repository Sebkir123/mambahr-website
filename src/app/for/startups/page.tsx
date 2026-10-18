'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, FeatureSplit, Em } from '@/components/v2/page-kit'
import { AppFrame, TodoDesk, ChatThread, SlackApproval, type TodoFocus, type TodoItem } from '@/components/mockups'
import { useStory } from '@/components/story'
import { JoinSection } from '@/components/ad-landing/join-section'

// Startup side of the ad test, most of them in California. California facts
// from the state guide (src/content/states/group-a.ts): pay ranges in job posts
// at 15 employees, paid sick leave, final pay on the last day for a firing.

/* ── Hero: the founder's To do. Priya's offer opens, line by line; then a
   new time-off request arrives from Slack. ── */
const HERO_SCRIPT = { phases: [700, 1200, 1700, 2200, 2800, 3400, 4600], rootMargin: '0px 0px -5% 0px' } as const

const OFFER: TodoFocus = {
  eyebrow: 'Asked by Sam Lee in #hiring · Today',
  position: '1 of 3',
  title: 'Offer for Priya Shah',
  summary: 'Founding Engineer at $195,000, inside the range you posted. Ready to send.',
  facts: [
    { k: 'Role', v: 'Founding Engineer' },
    { k: 'Pay', v: '$195,000 a year' },
    { k: 'Range', v: '$180k to $210k, as posted' },
    { k: 'Start', v: 'Nov 3' },
  ],
  read: 'Inside the range you posted, so it can go out today. Onboarding starts as soon as Priya signs.',
  decisions: [
    { label: 'Send the offer', primary: true, consequence: 'Out for e-signature now. Sam is told.' },
    { label: 'Change it', consequence: 'Opens the draft for you.' },
  ],
  history: [],
}

const QUEUE: TodoItem[] = [
  { title: 'Priya Shah · offer', meta: 'Hiring · Yours', date: 'Today' },
  { title: 'Noah Bennett · starts Monday', meta: 'Onboarding · Ready', date: 'Mon' },
  { title: 'Marcus Webb · last day', meta: 'Leaving · Yours', date: 'Fri' },
]
const ARRIVING: TodoItem = { title: 'Leo Schulz · 5 days off', meta: 'Time off · Asked in Slack', date: 'Tomorrow' }

function FounderDesk() {
  const { ref, phase } = useStory(HERO_SCRIPT)
  const arrived = phase >= 7
  return (
    <div className="mock-card" ref={ref}>
      <AppFrame active="todo" org="Acme" user="SL" height={640} minimal todoCount={arrived ? 4 : 3}>
        <TodoDesk
          simple
          queue={arrived ? [QUEUE[0], ARRIVING, ...QUEUE.slice(1)] : QUEUE}
          fresh={arrived ? 1 : undefined}
          summary={arrived ? '4 need you · 6 done today' : '3 need you · 6 done today'}
          focus={{ ...OFFER, position: `1 of ${arrived ? QUEUE.length + 1 : QUEUE.length}` }}
          build={Math.min(phase, 6)}
          doneToday={6}
        />
      </AppFrame>
    </div>
  )
}

export default function StartupsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For startups"
          title={<>Gusto gives you software. <Em>MambaHR does the work.</Em></>}
          lead="Ask in Slack and MambaHR handles the offer, the onboarding and the payroll change, with California’s rules built in. Founders and managers make the calls."
          cta={{ href: '#join', label: 'Get early access' }}
          secondary={null}
        >
          <FounderDesk />
        </PageHero>

        <FeatureSplit
          eyebrow="Slack"
          title={<>Your team asks <Em>in Slack.</Em></>}
          lead="Time off, payday, policies: your team asks in Slack and gets the answer with your policy cited. Anything that needs you comes to you there, with the reason."
          bullets={[
            'Answers with your policy cited',
            'Approvals in one tap',
            'Everything also on your To do',
          ]}
        >
          <div className="mock-card slack">
            <SlackApproval
              channel="people"
              subject="Leo Schulz"
              kind="Time off"
              why="Leo asked for 5 days off, Dec 15 to Dec 19. He has 9 days left this year and nobody else on his team is out that week."
              fields={[
                { label: 'Days', value: '5' },
                { label: 'Left after', value: '4 days' },
              ]}
              context="Yours · due tomorrow · also on your To do"
              reference="TO-1912"
              time="9:41 AM"
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="California"
          title={<>California’s rules, <Em>handled.</Em></>}
          lead="California asks more of employers, and much of it starts at 5 people. MambaHR follows the rules for wherever each person works, from your first hire."
          bullets={[
            'The pay range in every job post',
            'Paid sick days tracked',
            'A last paycheck on the last day',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Sam Patel"
              user="Can we let Sam go on Friday and pay him with the next payroll?"
              answer="No. Sam works in California, so his last paycheck, with his unused vacation, is due on his last day. I have it ready for Friday."
              card={{
                name: 'Sam Patel',
                note: 'Last paycheck, San Francisco',
                initials: 'SP',
                figures: [
                  { label: 'Last day', value: 'Fri', sub: 'Oct 30' },
                  { label: 'Paycheck due', value: 'Fri', sub: 'Same day' },
                  { label: 'Vacation paid', value: '18', unit: 'hours' },
                ],
              }}
              action={{
                title: 'Approve Sam’s last paycheck',
                body: 'Due Friday with his last day. Payroll is told when you approve.',
                primary: 'Approve',
                secondary: 'Edit',
              }}
              sources={['California final pay rules', 'Vacation policy']}
            />
          </div>
        </FeatureSplit>

        <JoinSection
          form="ad_startups"
          title={<>First hire to payday, <Em>handled.</Em></>}
          answers={[
            { q: 'How is this different from Gusto?', a: 'Gusto gives you software to click through. MambaHR does the work and asks you only for the decisions.' },
            { q: 'How long does it take to switch?', a: 'Within a day. Your people come over from Gusto, Rippling or a spreadsheet, with their history.' },
            { q: 'Is our data safe?', a: 'Yes. It is encrypted, each person sees only what their role allows, and it never trains any AI.' },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
