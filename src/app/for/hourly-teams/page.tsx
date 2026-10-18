'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, FeatureSplit, Em } from '@/components/v2/page-kit'
import { AppFrame, TodoDesk, ChatThread, type TodoFocus, type TodoItem } from '@/components/mockups'
import { useStory } from '@/components/story'
import { JoinSection } from '@/components/ad-landing/join-section'

// Blue-collar side of the ad test: crews, shops, kitchens and job sites. Plain
// words for owners, no form names. Behind the plain words: "checking his ID
// and work documents" is Form I-9 Section 2 (by the third business day after
// the start), "new-hire papers" are the I-9, W-4 and state notices.

/* ── Hero: the owner's To do. Marco's first day opens, line by line; then a
   second new hire arrives in the queue. ── */
const HERO_SCRIPT = { phases: [700, 1200, 1700, 2200, 2800, 3400, 4600], rootMargin: '0px 0px -5% 0px' } as const

const MARCO: TodoFocus = {
  eyebrow: 'Asked by Dave Ruiz, crew lead · Today',
  position: '1 of 4',
  title: 'Marco Silva starts Monday',
  summary: 'His offer is signed and his new-hire papers are done. One thing needs a person: checking his ID and work documents on his first day.',
  facts: [
    { k: 'Job', v: 'Crew member, Dallas' },
    { k: 'Pay', v: '$22 an hour' },
    { k: 'Papers', v: 'All signed' },
    { k: 'Payroll', v: 'On Friday’s run' },
  ],
  read: 'Dave is on site with Marco on Monday, so he can check the documents. It has to be done by Thursday.',
  decisions: [
    { label: 'Ask Dave', primary: true, consequence: 'Dave gets a short checklist for Monday morning.' },
    { label: 'I will do it', consequence: 'It goes on your list for Monday.' },
  ],
  history: [],
}

const QUEUE: TodoItem[] = [
  { title: 'Marco Silva · starts Monday', meta: 'New hire · Yours', date: 'Mon' },
  { title: 'Ana Lopez · raise to $24', meta: 'Pay · Yours', date: 'Today' },
  { title: 'Kim Tran · 3 days off', meta: 'Time off · Yours', date: 'Tomorrow' },
  { title: 'Joe Park · last day', meta: 'Leaving · Yours', date: 'Fri' },
]
const ARRIVING: TodoItem = { title: 'Luis Ortega · new hire', meta: 'New hire · Yours', date: 'Tue' }

function CrewDesk() {
  const { ref, phase } = useStory(HERO_SCRIPT)
  const arrived = phase >= 7
  return (
    <div className="mock-card" ref={ref}>
      <AppFrame active="todo" org="Acme" user="DR" height={640} minimal todoCount={arrived ? 5 : 4}>
        <TodoDesk
          simple
          queue={arrived ? [QUEUE[0], ARRIVING, ...QUEUE.slice(1)] : QUEUE}
          fresh={arrived ? 1 : undefined}
          summary={arrived ? '5 need you · 9 done today' : '4 need you · 9 done today'}
          focus={{ ...MARCO, position: `1 of ${arrived ? QUEUE.length + 1 : QUEUE.length}` }}
          build={Math.min(phase, 6)}
          doneToday={9}
        />
      </AppFrame>
    </div>
  )
}

const PAY_RUN: TodoFocus = {
  eyebrow: 'Payroll · This week',
  position: '',
  title: 'Pay run for Friday',
  summary: '24 people, two of them new and one leaving. Everything follows your pay rates and your state’s rules.',
  facts: [
    { k: 'People', v: '24' },
    { k: 'New', v: 'Marco Silva, Luis Ortega' },
    { k: 'Leaving', v: 'Joe Park, last check included' },
    { k: 'Payday', v: 'Friday' },
  ],
  read: 'Approve by Thursday so pay goes out on Friday.',
  decisions: [
    { label: 'Approve', primary: true, consequence: 'Sent to payroll for Friday.' },
    { label: 'Hold', consequence: 'Nothing is paid until you approve.' },
  ],
  history: [],
}

export default function HourlyTeamsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For crews, shops, kitchens and job sites"
          title={<>Less paperwork. <Em>More time on the job.</Em></>}
          lead="New people every week, pay changes, someone leaving on Friday. MambaHR does the HR paperwork and asks you only about the few things that need a person."
          cta={{ href: '#join', label: 'Get early access' }}
          secondary={null}
        >
          <CrewDesk />
        </PageHero>

        <FeatureSplit
          eyebrow="New people"
          title={<>New hires, <Em>ready on day one.</Em></>}
          lead="Tell MambaHR who you hired and what you pay. It sends the offer and every new-hire paper, follows up until they are signed, and tells you the one thing you do in person."
          bullets={[
            'Offer and new-hire papers sent the same day',
            'Reminders until everything is signed',
            'The rules for your state, kept for you',
          ]}
        >
          <div className="mock-card">
            <ChatThread
              context="Discussing Marco Silva"
              user="Marco said yes. $22 an hour, starts Monday on the Dallas crew."
              answer="Great. His offer is out to sign, with his new-hire papers. I will remind him until everything is signed."
              card={{
                name: 'Marco Silva',
                note: 'Crew member, Dallas',
                initials: 'MS',
                figures: [
                  { label: 'Pay', value: '$22', unit: '/hr' },
                  { label: 'Starts', value: 'Mon', sub: 'Oct 26' },
                  { label: 'Papers', value: 'Sent', sub: 'Today' },
                ],
              }}
              action={null}
              sources={['Your offer template', 'Texas hiring rules']}
            />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Payday"
          title={<>Every pay change, <Em>ready for payday.</Em></>}
          lead="Raises, new people and people leaving all go into the next pay run, by the rules of your state. You look it over and approve it. Payroll is powered by Deel."
          bullets={[
            'A last paycheck on time when someone leaves',
            'Tipped jobs paid by your state’s rules',
            'Nothing is paid until you approve',
          ]}
        >
          <div className="mock-card">
            <TodoDesk show="pane" simple focus={PAY_RUN} />
          </div>
        </FeatureSplit>

        <JoinSection
          form="ad_hourly"
          title={<>Spend less time <Em>on paperwork.</Em></>}
          answers={[
            { q: 'Do we need Slack?', a: 'No. You ask and approve in the MambaHR app, and your team can send requests from a simple web form.' },
            { q: 'How long does it take to switch?', a: 'Within a day. Your people come over from ADP, Gusto or a spreadsheet, with their history.' },
            { q: 'Is our data safe?', a: 'Yes. It is encrypted, each person sees only what their role allows, and it never trains any AI.' },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
