import s from './mockups.module.css'
import { Icon } from './icons'
import { MambaMark } from '@/components/mamba-mark'

export type ChatFigure = { label: string; value: string; unit?: string; sub?: string }
export type ChatCard = { name: string; note?: string; initials?: string; figures: ChatFigure[] }
export type ChatAction = { title: string; body?: string; primary: string; secondary?: string; ghost?: string }

/**
 * The one chat, in the app's answer shape (2026-10-08): the person's bubble,
 * then the agent's M in its Dusk ring beside the answer in one line, at most
 * one card built from real data, at most one action in the Dusk ring
 * ("Needs you"), then the sources as "Based on" chips. The chat box below
 * wears the Dusk ring. Purely decorative, so nothing inside is focusable.
 */
export function ChatThread({
  context = 'Discussing Jackson Bauer',
  user = 'Can Jackson take the extra week of parental leave in December? He asked in standup.',
  answer = 'Yes. Jackson has 3 weeks of bonding leave left this year and December is inside the window.',
  card = {
    name: 'Jackson Bauer',
    note: 'Parental leave, 2026',
    initials: 'JB',
    figures: [
      { label: 'Bonding leave left', value: '3', unit: 'weeks' },
      { label: 'This request', value: '5', unit: 'days', sub: 'Dec 15 to Dec 19' },
      { label: 'Pay', value: '100%', sub: 'Payroll unchanged' },
    ],
  },
  action = {
    title: 'Approve Jackson’s parental leave',
    body: 'Five days, Dec 15 to Dec 19. I have drafted the approval and the calendar block. His manager and payroll are told.',
    primary: 'Approve',
    secondary: 'Decline',
  },
  sources = ['Leave balance', 'Parental leave policy v4', 'Payroll calendar'],
  placeholder = 'Reply',
  className,
}: {
  context?: string | null
  user?: string
  /** The answer in one line. */
  answer?: string
  card?: ChatCard | null
  action?: ChatAction | null
  sources?: string[]
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`${s.mk} ${s.chatCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.chat}>
        <div className={s.thread}>
          <div className={s.userMsg}>{user}</div>
          <div className={s.assist}>
            <span className={s.agentMark}><span><MambaMark size={16} /></span></span>
            <div className={s.assistBody}>
              <p className={s.answer}>{answer}</p>

              {card && (
                <div className={s.dataCard}>
                  <div className={s.dataHead}>
                    {card.initials && <span className={`${s.avatar} ${s.c1}`}>{card.initials}</span>}
                    <span className={s.dataName}>{card.name}</span>
                    {card.note && <span className={s.dataNote}>{card.note}</span>}
                  </div>
                  <div className={s.figures}>
                    {card.figures.map((f) => (
                      <div key={f.label} className={s.figure}>
                        <span className={s.figLabel}>{f.label}</span>
                        <span className={s.figValue}>{f.value}{f.unit && <small> {f.unit}</small>}</span>
                        {f.sub && <span className={s.figSub}>{f.sub}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {action && (
                <div className={s.needsRing}>
                  <div className={s.needs}>
                    <span className={s.needsLabel}>Needs you</span>
                    <span className={s.needsTitle}>{action.title}</span>
                    {action.body && <p className={s.needsBody}>{action.body}</p>}
                    <div className={s.btnRow}>
                      <span className={`${s.btn} ${s.primary}`}>{action.primary}</span>
                      {action.secondary && <span className={`${s.btn} ${s.secondary}`}>{action.secondary}</span>}
                      {action.ghost && <span className={`${s.btn} ${s.ghost}`}>{action.ghost}</span>}
                    </div>
                  </div>
                </div>
              )}

              {sources.length > 0 && (
                <div className={s.sources}>
                  <span className={s.sourcesLead}>Based on</span>
                  {sources.map((x) => <span key={x} className={s.source}>{x}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={s.composerWrap}>
          {context && <span className={s.ctx}><Icon name="sparkles" size={12} />{context}<Icon name="x" size={11} /></span>}
          <div className={s.ring}>
            <div className={s.composer}>
              <span className={s.placeholder}>{placeholder}</span>
              <span className={s.send}><Icon name="arrow-up" size={16} stroke={2} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
