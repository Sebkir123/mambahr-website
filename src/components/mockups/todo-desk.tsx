import s from './mockups.module.css'

export type TodoItem = { title: string; meta: string; date: string; overdue?: boolean }
export type TodoDecision = { label: string; primary?: boolean; consequence: string }
export type TodoFact = { k: string; v: string }
export type TodoFocus = {
  /** Who asked and when, above the title. */
  eyebrow: string
  /** "1 of 3"; empty to hide. */
  position: string
  /** Short enough to sit on one line: "Raise for Jackson Bauer". */
  title: string
  /** The item in one or two sentences. */
  summary: string
  facts: TodoFact[]
  /** MambaHR's recommendation, inside the gold-to-violet ring. */
  read: string
  decisions: TodoDecision[]
  history: { what: string; when: string }[]
}

export const COMP_CHANGE: TodoFocus = {
  eyebrow: 'Asked by Ana Ruiz, his manager · Today',
  position: '1 of 3',
  title: 'Raise for Jackson Bauer',
  summary: 'An 11.5% increase from Nov 1, 8% above the level 4 pay range.',
  facts: [
    { k: 'Role', v: 'Staff Engineer, level 4' },
    { k: 'Change', v: '$148,000 to $165,000 a year' },
    { k: 'From', v: 'Nov 1, with the next pay run' },
    { k: 'Peers', v: 'Two at level 4 earn $152k and $158k' },
  ],
  read: 'Approving at $160,000 keeps Jackson in line with his peers. Or hold it for the review cycle in January.',
  decisions: [
    { label: 'Approve', primary: true, consequence: 'Payroll changes on Nov 1. Ana is told.' },
    { label: 'Decline', consequence: 'Nothing changes. Ana is told.' },
  ],
  history: [
    { what: 'Ana asked in Slack', when: 'Mon 9:12' },
    { what: 'Checked against the pay range', when: 'Mon 9:12' },
    { what: 'Sent to you: above the range', when: 'Mon 9:13' },
  ],
}

export const DEFAULT_QUEUE: TodoItem[] = [
  { title: 'Jackson Bauer · raise', meta: 'Pay · Yours', date: 'Due today' },
  { title: 'Leo Schulz · 5 days off', meta: 'Time off · Yours', date: 'Tomorrow' },
  { title: 'Priya Nair · offer', meta: 'Hiring · Yours', date: 'Thu' },
  { title: 'Marcus Webb · last day', meta: 'Offboarding · Yours', date: 'Fri' },
]

const OTHER_CHIPS = [
  { label: 'Covering', n: '1', tone: 'muted' },
  { label: 'Done today', n: '11', tone: 'green' },
]

/**
 * The To do desk as redesigned in September 2026: the page title and a one-line
 * count, then the queue as a card (filter chips, one row per item) beside the
 * open item (who asked, a one-line title, the summary, the facts as label and
 * value rows, MambaHR's read, and the decision with what each choice does).
 * `show` forces one column; the open item also stacks its parts when narrow.
 */
export function TodoDesk({
  queue = DEFAULT_QUEUE,
  activeIndex = 0,
  summary = '4 need you · 1 you are covering',
  focus = COMP_CHANGE,
  show = 'both',
  simple = false,
  className,
}: {
  /** Hero-calm version: no page title (the top bar names the page), no history. */
  simple?: boolean
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
        {show === 'both' && !simple && (
          <div className={s.deskHead}>
            <div className={s.queueH1}>To do</div>
            <p className={s.queueSum}>{summary}</p>
          </div>
        )}
        <div className={s.deskBody}>
          <div className={s.queue}>
            <div className={s.qChips}>
              {[{ label: 'Yours', n: String(queue.length), tone: 'gold' }, ...OTHER_CHIPS.filter((c) => !simple || c.label !== 'Covering')].map((c) => (
                <span key={c.label} className={`${s.qChip} ${s[`qChip_${c.tone}`]}`}>{c.label} {c.n}</span>
              ))}
            </div>
            {queue.map((q, i) => (
              <div key={q.title} className={`${s.qRow}${i === activeIndex ? ` ${s.on}` : ''}`}>
                <div className={s.qLine}>
                  <span className={s.qName}>{q.title}</span>
                  <span className={`${s.qDate}${q.overdue ? ` ${s.over}` : ''}`}>{q.date}</span>
                </div>
                <span className={s.qKind}>{q.meta}</span>
              </div>
            ))}
          </div>

          <article className={s.pane}>
            <div className={s.eyebrowRow}>
              <span>{focus.eyebrow}</span>
              {focus.position && <span className={s.right}>{focus.position}</span>}
            </div>
            <h2 className={s.paneTitle}>{focus.title}</h2>
            <p className={s.paneSummary}>{focus.summary}</p>

            <div className={s.body}>
              <div className={s.factsBlock}>
                <div className={s.label}>The facts</div>
                <dl className={s.factList}>
                  {focus.facts.map((f) => (
                    <div key={f.k} className={s.factRow}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={s.readRing}>
                <div className={s.read}>
                  <div className={s.label}>MambaHR&rsquo;s read</div>
                  <p className={s.readText}>{focus.read}</p>
                </div>
              </div>

              <div className={s.decide}>
                <div className={s.label}>Your decision</div>
                <div className={s.pills}>
                  {focus.decisions.map((d) => (
                    <div key={d.label} className={s.choice}>
                      <div className={`${s.pill} ${d.primary ? s.primary : s.secondary}`}>{d.label}</div>
                      <p className={s.consequence}>{d.consequence}</p>
                    </div>
                  ))}
                </div>
              </div>

              {!simple && (
                <div className={s.history}>
                  {focus.history.map((h) => (
                    <div key={h.what + h.when} className={s.hLine}><i /><span>{h.what}</span><span>{h.when}</span></div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
