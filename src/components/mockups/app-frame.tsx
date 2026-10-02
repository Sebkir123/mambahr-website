import type { ReactNode } from 'react'
import s from './mockups.module.css'
import { Icon } from './icons'
import { MambaMark } from '@/components/mamba-mark'

/**
 * The app shell as redesigned in September 2026: a 232px sidebar (the gold M
 * and the company name, one flat nav list, Settings pinned bottom) and a 60px
 * top bar with the page name, "Ask about this page", the to-do count and the
 * avatar.
 * Below 900px of container width the sidebar collapses and the content owns
 * the frame. Purely decorative, so nothing inside is focusable.
 */
export type NavKey = 'todo' | 'mamba' | 'brain' | 'people' | 'timeoff' | 'hiring' | 'payroll' | 'rooms' | 'workflows' | 'marketplace' | 'documents' | 'settings'

type NavItem = { key: NavKey; label: string; icon: string; badge?: string }

// The nav of the simplified app (September 2026 redesign): one flat list, no
// group headings, Settings pinned to the bottom.
const NAV: NavItem[] = [
  { key: 'mamba', label: 'MambaHR', icon: 'message-square' },
  { key: 'todo', label: 'To do', icon: 'check-square', badge: '3' },
  { key: 'people', label: 'People', icon: 'users' },
  { key: 'timeoff', label: 'Time off', icon: 'calendar' },
  { key: 'hiring', label: 'Hiring', icon: 'briefcase' },
  { key: 'payroll', label: 'Payroll', icon: 'dollar-sign' },
  { key: 'rooms', label: 'Rooms', icon: 'columns' },
  { key: 'documents', label: 'Documents', icon: 'files' },
]
// The hero shows fewer rows so the frame stays calm.
const MINIMAL: NavKey[] = ['mamba', 'todo', 'people', 'timeoff', 'hiring', 'payroll', 'documents']

function Row({ item, active }: { item: NavItem; active: NavKey }) {
  const on = item.key === active
  return (
    <span className={`${s.navRow}${on ? ` ${s.on}` : ''}`}>
      <Icon name={item.icon} />
      {item.label}
      {item.badge && <span className={s.navBadge}>{item.badge}</span>}
    </span>
  )
}

/** The brand M as an avatar: the gold mark on a soft gold tile, for chat and approval rows. */
export function MambaMarkChip({ className }: { className?: string }) {
  return (
    <span className={`${s.mark}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <MambaMark size={15} color="var(--mk-gold)" />
    </span>
  )
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
  /** Fewer nav rows (no Rooms). Calmer for a hero. */
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
  const label = pageLabel ?? [...NAV, { key: 'settings', label: 'Settings' }].find((i) => i.key === active)?.label
  return (
    <div className={`${s.mk} ${s.frameCq}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={s.frame}>
      <aside className={s.side}>
        <div className={s.brand}>
          <MambaMark size={22} color="var(--mk-gold)" />
          <span className={s.org}>{org}</span>
        </div>
        <div className={s.navBody}>
          <div className={s.navSection}>
            {NAV.filter((i) => !minimal || MINIMAL.includes(i.key)).map((i) => <Row key={i.key} item={i} active={active} />)}
          </div>
          <div className={s.navSpacer} />
          <div className={s.navSection}>
            <Row item={{ key: 'settings', label: 'Settings', icon: 'settings' }} active={active} />
          </div>
        </div>
      </aside>
      <div className={s.content}>
        <div className={s.topbar}>
          <span className={s.topLabel}>{label}</span>
          <span className={s.topRight}>
            <span className={s.askPill}><Icon name="sparkles" size={14} />Ask about this page</span>
            <span className={s.todoPill}>3 to do</span>
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
