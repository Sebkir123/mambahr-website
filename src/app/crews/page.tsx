'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageHero, FeatureSplit, Em } from '@/components/v2/page-kit'
import { AppFrame, TodoDesk, PhoneOnboarding, TextMessage, PHONE_EN, type TodoFocus } from '@/components/mockups'
import { useStory, StoryReplay } from '@/components/story'
import { JoinSection } from '@/components/ad-landing/join-section'
import s from './crew-stage.module.css'

// Blue-collar side of the ad test: crews, shops, kitchens and job sites. The
// words an owner or office manager uses: papers, new hires, payday. New hires
// sign on their phone, in English or Spanish, from a text message: shown here
// ahead of the app (founder, 2026-10-18). Behind "checking his ID and work
// documents": Form I-9 Section 2, by the third business day after the start.

/* ── Hero: Marco's phone and the owner's To do, one moving thing at a time.
   The text with the link lands on his lock screen; his papers open in
   Spanish and tick off one by one; then "Todo listo"; then the owner's item
   shows them all signed. ── */
const HERO_SCRIPT = { phases: [500, 1700, 2250, 2800, 3350, 3900, 4700, 5500], rootMargin: '0px 0px -5% 0px' } as const

function marco(signed: boolean): TodoFocus {
  return {
    eyebrow: signed ? 'Papers signed on his phone · Just now' : 'Asked by Dave Ruiz, crew lead · Today',
    position: '1 of 4',
    title: 'Marco Silva starts Monday',
    summary: signed
      ? 'Marco signed all his papers on his phone, in Spanish. One thing needs a person: checking his ID and work documents on his first day.'
      : 'His offer is signed. His new-hire papers went to his phone by text.',
    facts: [
      { k: 'Job', v: 'Crew member, Dallas' },
      { k: 'Pay', v: '$22 an hour, paid weekly' },
      { k: 'Papers', v: signed ? 'All signed, in Spanish' : 'Sent by text' },
      { k: 'Payroll', v: 'On Friday’s run' },
    ],
    read: 'Dave is on site with Marco on Monday, so he can check the documents. It has to be done by Thursday.',
    decisions: [
      { label: 'Ask Dave', primary: true, consequence: 'Dave gets a short checklist for Monday morning.' },
      { label: 'I will do it', consequence: 'It goes on your list for Monday.' },
    ],
    history: [],
  }
}

function CrewStage() {
  const { ref, phase, done, still, replay } = useStory(HERO_SCRIPT)
  // 1 the text arrives · 2 to 6 papers signed, one per step · 7 all set · 8 the owner sees it
  const screen = phase >= 7 ? 'done' : phase >= 2 ? 'list' : 'lock'
  const signed = Math.max(0, Math.min(5, phase - 1))
  return (
    <div className={s.stage} ref={ref}>
      <div className={`mock-card ${s.app}`}>
        <AppFrame active="todo" org="Acme" user="DR" minimal todoCount={4}>
          <TodoDesk show="pane" simple focus={marco(phase >= 8)} />
        </AppFrame>
      </div>
      <div className={s.phoneSlot}>
        <PhoneOnboarding screen={screen} signed={signed} />
      </div>
      {done && !still && <StoryReplay className={s.replay} onClick={replay} />}
    </div>
  )
}

const PAY_RUN: TodoFocus = {
  eyebrow: 'Payroll · This week',
  position: '',
  title: 'Payday is Friday',
  summary: '24 people, two of them new and one leaving. Everything follows your pay rates and your state’s rules.',
  facts: [
    { k: 'People', v: '24' },
    { k: 'New', v: 'Marco Silva, Luis Ortega' },
    { k: 'Leaving', v: 'Joe Park, last check included' },
    { k: 'Payday', v: 'Friday' },
  ],
  read: 'Approve by Thursday so everyone is paid on Friday.',
  decisions: [
    { label: 'Approve', primary: true, consequence: 'Sent to payroll for Friday.' },
    { label: 'Hold', consequence: 'Nothing is paid until you approve.' },
  ],
  history: [],
}

export default function CrewsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <PageHero
          eyebrow="For crews, shops, kitchens and job sites"
          title={<>Less paperwork. <Em>More time on the job.</Em></>}
          lead="Hire someone on Friday and they are ready on Monday. New hires sign everything on their phone, in English or Spanish. MambaHR keeps the papers, the deadlines and the pay changes straight, and asks you only about what needs you."
          cta={{ href: '#join', label: 'Get early access' }}
          secondary={null}
        >
          <CrewStage />
        </PageHero>

        <FeatureSplit
          eyebrow="New hires"
          title={<>Signed on their phone, <Em>in English or Spanish.</Em></>}
          lead="No printing and no chasing. New hires get a text, tap the link and sign everything before their first shift. You see who is done and who still needs a nudge."
          bullets={[
            'A text with the link, nothing to download',
            'Every paper in English or Spanish',
            'Reminders until it is all signed',
          ]}
        >
          <div className={s.duo}>
            <TextMessage from="Acme" body={PHONE_EN.text} />
            <PhoneOnboarding copy={PHONE_EN} lang="en" signed={3} />
          </div>
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Payday"
          title={<>Pay right, <Em>every week.</Em></>}
          lead="Raises, new people, tips and last checks all go into the next payroll, by the rules of your state. You look it over and approve it. Payroll is powered by Deel."
          bullets={[
            'Last checks on time when someone leaves',
            'Tipped jobs paid by your state’s rules',
            'Nothing goes out until you approve',
          ]}
        >
          <div className="mock-card">
            <TodoDesk show="pane" simple focus={PAY_RUN} />
          </div>
        </FeatureSplit>

        <JoinSection
          form="ad_crews"
          title={<>Get your evenings <Em>back.</Em></>}
          answers={[
            { q: 'Do my people need a computer?', a: 'No. They get a text and sign everything on their phone, in English or Spanish.' },
            { q: 'How long does it take to switch?', a: 'Within a day. Your people come over from ADP, Gusto or a spreadsheet.' },
            { q: 'Is our information safe?', a: 'Yes. It is encrypted, each person sees only what their role allows, and it is never used to train AI.' },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
