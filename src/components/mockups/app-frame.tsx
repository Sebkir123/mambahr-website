import { Fragment, type ReactNode } from 'react'
import s from './mockups.module.css'
import { Icon } from './icons'

/**
 * The real app shell: 240px sidebar (brand block, nav in the exact HR-admin
 * order, Settings pinned bottom) and the 60px top bar with the search pill.
 * Below 900px of container width the sidebar collapses and the content owns
 * the frame. Purely decorative, so nothing inside is focusable.
 */
export type NavKey = 'todo' | 'mamba' | 'brain' | 'people' | 'hiring' | 'payroll' | 'rooms' | 'workflows' | 'marketplace' | 'documents' | 'settings'

const TOP: { key: NavKey; label: string; icon: string; badge?: string }[] = [
  { key: 'todo', label: 'To do', icon: 'sun', badge: '4' },
  { key: 'mamba', label: 'MambaHR', icon: 'message-square' },
  { key: 'brain', label: 'Brain', icon: 'brain' },
]
const WORKFORCE: { key: NavKey; label: string; icon: string }[] = [
  { key: 'people', label: 'People', icon: 'users' },
  { key: 'hiring', label: 'Hiring', icon: 'briefcase' },
  { key: 'payroll', label: 'Payroll', icon: 'dollar-sign' },
]
const OPERATIONS: { key: NavKey; label: string; icon: string }[] = [
  { key: 'rooms', label: 'Rooms', icon: 'columns' },
  { key: 'workflows', label: 'Workflows', icon: 'workflow' },
  { key: 'marketplace', label: 'Marketplace', icon: 'store' },
  { key: 'documents', label: 'Documents', icon: 'files' },
]

function Row({ item, active }: { item: { key: NavKey; label: string; icon: string; badge?: string }; active: NavKey }) {
  const on = item.key === active
  return (
    <span className={`${s.navRow}${on ? ` ${s.on}` : ''}`}>
      <Icon name={item.icon} />
      {item.label}
      {item.badge && <span className={s.navBadge}>{item.badge}</span>}
      {item.key === 'people' && !item.badge && <Icon name="chevron-down" size={14} className={s.navChev} />}
    </span>
  )
}

export function MambaMarkChip({ className }: { className?: string }) {
  return <span className={`${s.mark}${className ? ` ${className}` : ''}`} aria-hidden="true">M</span>
}

export function AppFrame({
  active = 'todo',
  org = 'Acme',
  pageLabel,
  user = 'AR',
  height,
  minimal = false,
  children,
  className,
}: {
  active?: NavKey
  /** Fewer nav rows: no Brain, no Org chart child, no Operations block. Calmer for a hero. */
  minimal?: boolean
  org?: string
  /** Left slot of the top bar, e.g. "To do". Defaults to the active nav label. */
  pageLabel?: string
  /** Initials in the top-right avatar. */
  user?: string
  /** Clip the content at this height like a viewport; the bottom fades out. */
  height?: number
  children: ReactNode
  className?: string
}) {
  const label = pageLabel ?? [...TOP, ...WORKFORCE, ...OPERATIONS, { key: 'settings', label: 'Settings' }].find((i) => i.key === active)?.label
  return (
    <div className={`${s.mk} ${s.frameCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.frame}>
      <aside className={s.side}>
        <div className={s.brand}>
          <MambaMarkChip />
          <span className={s.org}>{org}</span>
        </div>
        <div className={s.navBody}>
          <div className={s.navSection}>
            {TOP.filter((i) => !minimal || i.key !== 'brain').map((i) => <Row key={i.key} item={i} active={active} />)}
          </div>
          <div className={s.navHead}>Workforce</div>
          <div className={s.navSection}>
            {WORKFORCE.map((i) => (
              <Fragment key={i.key}>
                <Row item={i} active={active} />
                {i.key === 'people' && !minimal && (
                  <span className={s.navChild}><Icon name="git-branch" size={13} />Org chart</span>
                )}
              </Fragment>
            ))}
          </div>
          {!minimal && (
            <>
              <div className={s.navHead}>Operations</div>
              <div className={s.navSection}>
                {OPERATIONS.map((i) => <Row key={i.key} item={i} active={active} />)}
              </div>
            </>
          )}
          {minimal && (
            <div className={s.navSection}>
              <Row item={{ key: 'documents', label: 'Documents', icon: 'files' }} active={active} />
            </div>
          )}
          <div className={s.navSpacer} />
          <div className={s.navSection}>
            <Row item={{ key: 'settings', label: 'Settings', icon: 'settings' }} active={active} />
          </div>
        </div>
      </aside>
      <div className={s.content}>
        <div className={s.topbar}>
          <span className={s.topLabel}>{label}</span>
          <span className={s.searchPill}>
            <Icon name="search" size={15} />
            <span>Search everything</span>
            <span className={s.kbd}>⌘K</span>
          </span>
          <span className={s.topRight}>
            <span className={s.bellWrap}><Icon name="bell" size={18} stroke={1.6} /><i className={s.bellDot} /></span>
            <span className={`${s.avatar} ${s.c6}`}>{user}</span>
          </span>
        </div>
        <div className={s.viewport} style={height ? { height } : undefined}>
          {children}
        </div>
      </div>
      </div>
    </div>
  )
}
