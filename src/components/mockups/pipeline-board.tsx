import s from './mockups.module.css'
import { InitialsAvatar } from './people-directory'

export type PipelineColumn = {
  name: string
  color: string
  cards: { name: string; sub: string; pill?: string; ai?: boolean }[]
  /** Shown as the count when the visible cards are only a sample. */
  count?: number
}

export const DEFAULT_COLUMNS: PipelineColumn[] = [
  { name: 'Applied', color: '#8FA8C4', count: 12, cards: [
    { name: 'Anna Keller', sub: 'Careers page · 2h ago' },
    { name: 'Marco Rossi', sub: 'LinkedIn · 5h ago' },
    { name: 'Yuki Tanaka', sub: 'Referral · yesterday', pill: 'Referral' },
  ] },
  { name: 'Screen', color: '#A5B98A', count: 6, cards: [
    { name: 'Sofia Lindqvist', sub: 'Ranked 1 of 6 · notes attached', pill: 'Ranked', ai: true },
    { name: 'Daniel Okafor', sub: 'Ranked 2 of 6' },
  ] },
  { name: 'Interview', color: '#C4A46A', count: 4, cards: [
    { name: 'Elena Petrova', sub: 'Panel Thu 10:00 · 3 of 4 scorecards in' },
    { name: 'Tom Harrison', sub: 'Onsite Fri · kit sent' },
  ] },
  { name: 'Offer', color: '#B08BA8', count: 1, cards: [
    { name: 'Maya Chen', sub: '$165k · in band · awaiting you', pill: 'Awaiting you' },
  ] },
  { name: 'Hired', color: '#7FA69B', count: 1, cards: [
    { name: 'Leo Schulz', sub: 'Starts Nov 3 · onboarding running' },
  ] },
]

/**
 * A req's pipeline board: the header line, the tab row with counts, and five
 * 300px columns with stage-tinted top rules. Columns keep their width and the
 * board crops at the right edge like the real one scrolls.
 */
export function PipelineBoard({
  title = 'Senior Backend Engineer',
  location = 'Berlin',
  status = 'Open',
  tabs = [
    { label: 'Pipeline', count: 24, on: true },
    { label: 'Posting' },
    { label: 'Setup' },
    { label: 'Internal', count: 3 },
  ],
  columns = DEFAULT_COLUMNS,
  className,
}: {
  title?: string
  location?: string
  status?: string
  tabs?: { label: string; count?: number; on?: boolean }[]
  columns?: PipelineColumn[]
  className?: string
}) {
  return (
    <div className={`${s.mk} ${s.pipeCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.pipe}>
      <div className={s.reqHead}>
        <h1 className={s.reqTitle}>{title} <span>· {location} · {status}</span></h1>
        <div className={s.reqActions}>
          <span className={s.btnSecondary}>Hold</span>
          <span className={s.btnSecondary}>Close req</span>
        </div>
      </div>
      <div className={s.tabs}>
        {tabs.map((t) => (
          <span key={t.label} className={`${s.tab}${t.on ? ` ${s.on}` : ''}`}>
            {t.label}
            {t.count !== undefined && <span className={s.tabCount}>{t.count}</span>}
          </span>
        ))}
      </div>
      <div className={s.board}>
        {columns.map((c, ci) => (
          <div key={c.name} className={s.col} style={{ ['--stage' as string]: c.color }}>
            <div className={s.colHead}>
              <span className={s.swatch} />
              {c.name}
              <span className={s.colCount}>· {c.count ?? c.cards.length}</span>
            </div>
            <div className={s.colBody}>
              {c.cards.map((k, ki) => (
                <div key={k.name} className={s.cand}>
                  <InitialsAvatar name={k.name} size="sm" seed={ci * 3 + ki} />
                  <div className={s.candMain}>
                    <div className={s.candName}>{k.name}</div>
                    <div className={s.candSub}>{k.sub}</div>
                  </div>
                  {k.pill && <span className={`${s.stagePill}${k.ai ? ` ${s.ai}` : ''}`}>{k.pill}</span>}
                </div>
              ))}
              {c.cards.length === 0 && <div className={s.colEmpty}>Nobody here yet</div>}
            </div>
          </div>
        ))}
        <span className={s.boardFade} />
      </div>
      </div>
    </div>
  )
}
