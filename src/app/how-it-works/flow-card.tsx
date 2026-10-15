'use client'

import { useStory } from '@/components/story'
import { FLOW } from './content'
import s from './how-it-works.module.css'

const whoLabel = { mamba: 'MambaHR', person: 'A person' } as const

// Played once on load: the four steps light up in turn (1-4), then the
// request is done (5).
const FLOW_SCRIPT = { phases: [500, 1150, 1800, 2450, 3100], rootMargin: '0px 0px -5% 0px' } as const

/* The four stages as one card: the hero fragment. Built from the site's own
   styles, not a product screenshot. */
export default function FlowCard() {
  const { ref, phase } = useStory(FLOW_SCRIPT)
  const done = phase >= 5
  return (
    <div className={`${s.flowCard} agent-edge ${done ? 'agent-done' : 'agent-working'} agent-lg`} ref={ref}>
      <div className={s.flowTop}>
        <span className={`mamba-chip ${done ? 'done' : 'working'}`}>
          <span className="mc-i" aria-hidden="true" />
          {done ? 'MambaHR · done' : 'MambaHR · working'}
        </span>
        <span className={s.flowTopT}>Every request, the same four steps</span>
      </div>
      <ol className={s.flowGrid}>
        {FLOW.map((f, i) => (
          <li
            key={f.title}
            className={`${s.flowCell}${f.who === 'person' ? ` ${s.person}` : ''}${phase > i ? ` ${s.lit}` : ''}${phase === i + 1 && !done ? ` ${s.now}` : ''}`}
          >
            <span className={s.flowN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <p className={s.flowT}>{f.title}</p>
            <span className={s.flowWho}>{whoLabel[f.who]}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
