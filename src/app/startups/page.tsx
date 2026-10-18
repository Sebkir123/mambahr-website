'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, FeatureSplit, Em } from '@/components/v2/page-kit'
import { AppFrame, TodoDesk, ChatThread, SlackApproval, type TodoFocus, type TodoItem } from '@/components/mockups'
import { useStory, useMedia, Typed, StoryReplay } from '@/components/story'
import { MambaMark } from '@/components/mamba-mark'
import { JoinSection } from '@/components/ad-landing/join-section'
import s from './founder-stage.module.css'

// Startup side of the ad test: AI and software startups, most of them in
// California. They know agents; the guardrail answer comes from /security. California facts
// from the state guide (src/content/states/group-a.ts): pay ranges in job posts
// at 15 employees, paid sick leave, final pay on the last day for a firing.

/* ── Hero: the founder's To do and the Slack thread that started it, one
   moving thing at a time. Sam's message types itself, MambaHR replies, the
   offer opens line by line, then a time-off request arrives from Slack. ── */
const ASK = '@MambaHR Priya said yes. $195k, starting Nov 3.'
const HERO_SCRIPT = {
  phases: [300, 2100, 2700, 3000, 3300, 3600, 3900, 4200, 5000],
  typing: [{ at: 400, text: ASK, ms: 26 }],
  rootMargin: '0px 0px -5% 0px',
} as const

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

function FounderStage() {
  const { ref, phase, typed, done, still, replay } = useStory(HERO_SCRIPT)
  // 1 Sam asks · 2 MambaHR replies · 3 to 8 the offer opens · 9 Leo's request arrives
  const arrived = phase >= 9
  // Narrow screens show the queue only: the window ends with it, no empty space.
  const narrow = useMedia('(max-width: 900px)')
  return (
    <div className={s.stage} ref={ref}>
      <div className={`${s.slack} ${phase >= 1 ? s.on : s.off}`} aria-hidden="true">
        <div className={s.head}><b>#hiring</b>· Slack</div>
        <div className={s.msg}>
          <span className={s.av}>SL</span>
          <div>
            <div className={s.who}>Sam Lee<span>4:10 PM</span></div>
            <p className={s.text}><Typed text={ASK} n={typed[0]} mention="@MambaHR" caret={phase < 2} /></p>
          </div>
        </div>
        <div className={`${s.msg} ${phase >= 2 ? s.reply : s.off}`}>
          <span className={s.avM}><MambaMark size={14} /></span>
          <div>
            <div className={s.who}>MambaHR<span className={s.tag}>APP</span><span>4:10 PM</span></div>
            <p className={s.text}>Drafted at $195k, inside the range you posted. It is on your To do to send.</p>
          </div>
        </div>
      </div>
      <div className="mock-card">
        <AppFrame active="todo" org="Acme" user="SL" height={narrow ? undefined : 640} minimal todoCount={arrived ? 4 : 3}>
          <TodoDesk
            simple
            queue={arrived ? [QUEUE[0], ARRIVING, ...QUEUE.slice(1)] : QUEUE}
            fresh={arrived ? 1 : undefined}
            summary={arrived ? '4 need you · 6 done today' : '3 need you · 6 done today'}
            focus={{ ...OFFER, position: `1 of ${arrived ? QUEUE.length + 1 : QUEUE.length}` }}
            build={Math.max(0, Math.min(6, phase - 2))}
            doneToday={6}
          />
        </AppFrame>
      </div>
      {done && !still && <StoryReplay className={s.replay} onClick={replay} />}
    </div>
  )
}

export default function StartupsPage() {
  return (
    <>
      <MegaNav ctaHref="#join" />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For AI and software startups"
          title={<>Your HR runs on agents. <Em>You approve in Slack.</Em></>}
          lead="Offers, onboarding, California’s rules and every payroll change: MambaHR’s agents do the work. Anything that needs a person comes to you in Slack, with the reason."
          cta={{ href: '#join', label: 'Get early access' }}
          secondary={null}
        >
          <FounderStage />
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
            { q: 'Does it decide anything on its own?', a: 'No. Offers above your range, terminations and big pay changes always wait for a named person. Every action is logged.' },
            { q: 'How is this different from Rippling or Gusto?', a: 'They give you software to click through. MambaHR’s agents do the work and ask you only for the decisions.' },
            { q: 'How long does it take to switch?', a: 'Within a day. Your people come over from Gusto, Rippling or a spreadsheet, with their history.' },
            { q: 'Is our data safe?', a: 'Yes. It is encrypted, each person sees only what their role allows, and it never trains any AI.' },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
