import s from './mockups.module.css'
import { Icon } from './icons'
import { MambaMarkChip } from './app-frame'

export type ChatApproval = { detail: string; approve?: string; decline?: string }

/**
 * The one chat: a Fraunces greeting, the thread (gold user bubble, bubble-less
 * assistant reply beside the 30px mark chip, one approval card) and the
 * composer at the bottom wearing its gold-to-violet focus ring.
 */
export function ChatThread({
  greeting = 'Good afternoon, Sam.',
  needs = '4 things need you today',
  context = 'Discussing Jackson Bauer',
  user = 'Can Jackson take the extra week of parental leave in December? He asked in standup.',
  assistant = [
    'Yes. Jackson has 3 weeks of bonding leave left this year and December is inside the window.',
    'I have drafted the approval and the calendar block. Payroll is unchanged because the leave is paid at 100%.',
  ],
  tool = { title: 'Checked', status: 'Done', body: 'Leave balance · Parental leave policy v4 · Payroll calendar' },
  approval = { detail: 'Approve 5 days of parental leave for Jackson Bauer, Dec 15 to Dec 19. His manager and payroll are told.' },
  placeholder = 'Ask MambaHR anything. Type @ to add sources.',
  className,
}: {
  greeting?: string
  needs?: string
  context?: string | null
  user?: string
  assistant?: string[]
  tool?: { title: string; status: string; body: string } | null
  approval?: ChatApproval | null
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`${s.mk} ${s.chatCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.chat}>
      <div>
        <h1 className={s.greeting}>{greeting}</h1>
        <p className={s.greetSub}><b>{needs}</b> · To do</p>
      </div>

      <div className={s.thread}>
        <div className={s.userMsg}>{user}</div>
        <div className={s.assist}>
          <span className={s.chip}><MambaMarkChip /></span>
          <div className={s.assistBody}>
            {tool && (
              <div className={s.toolCard}>
                <div className={s.toolHead}><span>{tool.title}</span><span>{tool.status}</span></div>
                <div className={s.toolBody}>{tool.body}</div>
              </div>
            )}
            <div className={s.prose}>
              {assistant.map((p) => <p key={p}>{p}</p>)}
            </div>
            {approval && (
              <div className={s.approval}>
                <div className={s.approvalLine}><Icon name="alert-triangle" size={11} stroke={2} />Needs your approval before continuing.</div>
                <div className={s.approvalDetail}>{approval.detail}</div>
                <div className={s.approvalBtns}>
                  <span className={`${s.aBtn} ${s.ok}`}>{approval.approve ?? 'Approve'}</span>
                  <span className={`${s.aBtn} ${s.no}`}>{approval.decline ?? 'Decline'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={s.composerWrap}>
        {context && <span className={s.ctx}><Icon name="sparkles" size={12} />{context}<Icon name="x" size={11} /></span>}
        <div className={s.ring}>
          <div className={s.composer}>
            <div className={s.placeholder}>{placeholder}</div>
            <div className={s.composerRow}>
              <span className={s.composerChip}><Icon name="at-sign" size={12} />source</span>
              <span className={s.composerChip}><Icon name="paperclip" size={12} /></span>
              <span className={s.send}><Icon name="arrow-up" size={14} stroke={2.2} /></span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
