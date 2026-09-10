import s from './mockups.module.css'
import { Icon } from './icons'

export type TodoItem = { name: string; kind: string; date: string; overdue?: boolean }
export type TodoDecision = { label: string; primary?: boolean; consequence: string }
export type TodoFocus = {
  ref: string
  due: string
  position: string
  title: string
  person: string
  facts: string
  finding: string
  read: string
  decisions: TodoDecision[]
  history: { what: string; when: string }[]
}

export const COMP_CHANGE: TodoFocus = {
  ref: 'TO-1842',
  due: 'due today',
  position: '3 of 29 · next',
  title: 'Compensation change · Jackson Bauer',
  person: 'Jackson Bauer, submitted 2 days ago. Yours.',
  facts: 'Staff Engineer, level 4, Berlin. Requested by A. Ruiz.',
  finding: '$148,000 to $165,000, an 11.5% increase',
  read: 'Above band for level 4 by 8%. Two peers at this level sit at $152k and $158k. Recommend approving at $160k or holding for the cycle.',
  decisions: [
    { label: 'Approve', primary: true, consequence: 'Applies from Nov 1, payroll updated' },
    { label: 'Decline', consequence: "Nothing is applied. Jackson's manager is told." },
  ],
  history: [
    { what: 'Came to a person', when: 'Mon 9:12' },
    { what: 'Routed to you', when: 'Mon 9:12' },
    { what: 'Escalated because it is above band', when: 'Mon 9:14' },
    { what: 'Reminded', when: 'Today 8:00' },
  ],
}

export const DEFAULT_QUEUE: TodoItem[] = [
  { name: 'Jackson Bauer', kind: 'Compensation change', date: 'Today' },
  { name: 'Leo Schulz', kind: 'Leave request', date: 'Tomorrow' },
  { name: 'Priya Nair', kind: 'Offer above band', date: 'Thu' },
  { name: 'Marcus Webb', kind: 'Separation', date: 'Fri' },
]

/**
 * The To do desk: a 320px queue where the selected row is the only elevated
 * card, and the focused item on the right (facts, MambaHR's read inside the
 * gold-to-violet ring, the decision pills with their consequences, history).
 * `show` forces one column; otherwise the pane hides below 720px of container.
 */
export function TodoDesk({
  queue = DEFAULT_QUEUE,
  activeIndex = 0,
  summary = '4 need you today',
  focus = COMP_CHANGE,
  show = 'both',
  className,
}: {
  queue?: TodoItem[]
  activeIndex?: number
  summary?: string
  focus?: TodoFocus
  show?: 'both' | 'queue' | 'pane'
  className?: string
}) {
  const mode = show === 'pane' ? s.paneOnly : show === 'queue' ? s.queueOnly : ''
  return (
    <div className={`${s.mk} ${s.deskCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={`${s.desk}${mode ? ` ${mode}` : ''}`}>
      <div className={s.queue}>
        <h1 className={s.queueH1}>To do</h1>
        <p className={s.queueSum}>{summary}</p>
        <div className={s.lane}>Yours</div>
        {queue.map((q, i) => (
          <div key={q.name} className={`${s.qRow}${i === activeIndex ? ` ${s.on}` : ''}`}>
            <div className={s.qLine}>
              <span className={s.qName}>{q.name}</span>
              <span className={`${s.qDate}${q.overdue ? ` ${s.over}` : ''}`}>{q.date}</span>
            </div>
            <span className={s.qKind}>{q.kind}</span>
          </div>
        ))}
        <div className={s.fold}>
          <div>
            <div className={s.foldT}>Waiting on others</div>
            <div className={s.foldN}>6 items, nothing for you yet</div>
          </div>
          <Icon name="chevron-right" />
        </div>
        <div className={s.fold} style={{ marginTop: 0 }}>
          <div>
            <div className={s.foldT}>Nobody has taken these</div>
            <div className={s.foldN}>2 unclaimed</div>
          </div>
          <Icon name="chevron-right" />
        </div>
      </div>

      <article className={s.pane}>
        <div>
          <div className={s.eyebrowRow}>
            <span className={s.ref}>{focus.ref}</span>
            <span>{focus.due}</span>
            <span className={s.right}>{focus.position}</span>
          </div>
          <h2 className={s.paneTitle}>{focus.title}</h2>
          <p className={s.person}>{focus.person}</p>
        </div>
        <div className={s.body}>
          <div>
            <div className={s.card}>
              <div className={s.label}>The facts</div>
              <p className={s.facts}>{focus.facts}</p>
              <p className={s.finding}>{focus.finding}</p>
            </div>
            <div className={s.readRing}>
              <div className={s.read}>
                <div className={s.label}>MambaHR&rsquo;s read</div>
                <p className={s.readText}>{focus.read}</p>
              </div>
            </div>
          </div>
          <div className={s.rail}>
            <div className={s.railCard}>
              <div className={s.label}>Your decision</div>
              <div className={s.pills}>
                {focus.decisions.map((d) => (
                  <div key={d.label}>
                    <div className={`${s.pill} ${d.primary ? s.primary : s.secondary}`}>{d.label}</div>
                    <p className={s.consequence}>{d.consequence}</p>
                  </div>
                ))}
              </div>
              <div className={s.quiet}><span>Reassign</span><span>Snooze</span></div>
            </div>
            <div className={s.railCard}>
              <div className={s.label}>History</div>
              <div className={s.history}>
                {focus.history.map((h) => (
                  <div key={h.what + h.when} className={s.hLine}><i /><span>{h.what}</span><span>{h.when}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
      </div>
    </div>
  )
}
