import s from './mockups.module.css'
import { Icon } from './icons'

export type PersonRow = {
  name: string
  sub: string
  status?: { label: string; tone: 'success' | 'warning' | 'info' | 'neutral' | 'outline' }
  /** Violet live-activity badge, the one AI moment on the list. */
  ai?: string
  manager: string
  meta: string
  selected?: boolean
}

const COLORS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const

export function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export function InitialsAvatar({ name, size = 'md', seed = 0 }: { name: string; size?: 'sm' | 'md' | 'lg'; seed?: number }) {
  const c = COLORS[(name.length + seed) % COLORS.length]
  const sz = size === 'sm' ? s.sm : size === 'lg' ? s.lg : ''
  return <span className={`${s.avatar} ${s[c]}${sz ? ` ${sz}` : ''}`}>{initials(name)}</span>
}

export const DEFAULT_PEOPLE: PersonRow[] = [
  { name: 'Jackson Bauer', sub: 'Staff Engineer · Engineering · Berlin · jb@acme.com', status: { label: 'Onboarding', tone: 'info' }, manager: 'A. Ruiz', meta: 'Full-time · Started 2019' },
  { name: 'Leo Schulz', sub: 'Backend Engineer · Engineering · Remote · ls@acme.com', ai: 'Drafting offer', manager: 'J. Bauer', meta: 'Full-time · Started 2022' },
  { name: 'Priya Nair', sub: 'Engineering Manager · Engineering · New York · pn@acme.com', status: { label: 'Active', tone: 'success' }, manager: 'A. Ruiz', meta: 'Full-time · Started 2021' },
  { name: 'Marcus Webb', sub: 'Site Reliability Engineer · Engineering · Denver · mw@acme.com', status: { label: 'On leave', tone: 'warning' }, manager: 'P. Nair', meta: 'Full-time · Started 2020' },
  { name: 'Dana Whitfield', sub: 'Frontend Engineer · Engineering · Austin · dw@acme.com', status: { label: 'Joined 3 days ago', tone: 'outline' }, manager: 'P. Nair', meta: 'Full-time · Started 2026' },
]

/**
 * The People directory: sticky toolbar (search, filters, sort, view and
 * density toggles, select-all, Export CSV), a department group header with
 * its tabular count, and 52px rows with initials avatars, status badges, and
 * the manager on the right.
 */
export function PeopleDirectory({
  rows = DEFAULT_PEOPLE,
  group = 'Engineering',
  count = 42,
  withHead = true,
  className,
}: {
  rows?: PersonRow[]
  group?: string
  count?: number
  withHead?: boolean
  className?: string
}) {
  return (
    <div className={`${s.mk} ${s.peopleCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.people}>
      {withHead && (
        <div className={s.pageHead}>
          <h1 className={s.pageTitle}>People</h1>
          <p className={s.pageDesc}>Everyone in your organization</p>
        </div>
      )}
      <div className={s.toolbar}>
        <span className={s.search}><Icon name="search" size={15} /><span>Search by name, title, department…</span></span>
        <span className={s.select}>Department<Icon name="chevron-down" size={14} /></span>
        <span className={s.select}>Status<Icon name="chevron-down" size={14} /></span>
        <span className={s.select}>Location<Icon name="chevron-down" size={14} /></span>
        <span className={s.select}>Type<Icon name="chevron-down" size={14} /></span>
        <span className={s.select}>Name (A to Z)<Icon name="chevron-down" size={14} /></span>
        <span className={s.iconBtn}>
          <span className={`${s.seg} ${s.on}`}><Icon name="list" size={14} /></span>
          <span className={s.seg}><Icon name="grid" size={14} /></span>
        </span>
        <span className={s.iconBtn}><Icon name="rows" size={14} /></span>
        <span className={s.checkbox} />
        <span className={s.btnSecondary}><Icon name="download" size={14} />Export CSV</span>
      </div>
      <div className={s.groupHead}>{group} · {count}</div>
      {rows.map((r, i) => (
        <div key={r.name} className={`${s.pRow}${r.selected ? ` ${s.sel}` : ''}`}>
          <span className={s.checkbox} />
          <InitialsAvatar name={r.name} seed={i} />
          <div className={s.pMain}>
            <div className={s.pName}>
              {r.name}
              {r.status && <span className={`${s.badge} ${s[r.status.tone]}`}>{r.status.label}</span>}
              {r.ai && <span className={`${s.badge} ${s.ai}`}><i />{r.ai}</span>}
            </div>
            <div className={s.pSub}>{r.sub}</div>
          </div>
          <div className={s.pRight}>
            <span className={s.pMgr}>Reports to <b>{r.manager}</b></span>
            <span className={s.pMeta}>{r.meta}</span>
          </div>
          <Icon name="more" size={16} className={s.pMore} />
        </div>
      ))}
      </div>
    </div>
  )
}
