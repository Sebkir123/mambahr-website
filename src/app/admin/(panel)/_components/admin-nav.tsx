'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import styles from './admin-nav.module.css'

const COLLAPSE_KEY = 'admin-nav-collapsed'

type Item = {
  href: string
  label: string
  path: string // pathname to match (without query)
  exact?: boolean
  kind?: 'customer' | 'investor' // for the two shared /admin/crm pipeline entries
}
type Group = { title?: string; items: Item[] }

// Grouped by domain so each area of the business has a home, and the two CRM
// pipelines live under their own audiences (Investors / Customers) instead of
// one ambiguous "CRM" tab.
const GROUPS: Group[] = [
  { items: [{ href: '/admin', label: 'Overview', path: '/admin', exact: true }] },
  {
    title: 'Analytics',
    items: [{ href: '/admin/site', label: 'Site Tracking', path: '/admin/site' }],
  },
  {
    title: 'Investors',
    items: [
      { href: '/admin/investors', label: 'Overview', path: '/admin/investors' },
      { href: '/admin/crm?kind=investor', label: 'Pipeline', path: '/admin/crm', kind: 'investor' },
      { href: '/admin/deck', label: 'Deck analytics', path: '/admin/deck' },
    ],
  },
  {
    title: 'Customers',
    items: [
      { href: '/admin/customers', label: 'Overview', path: '/admin/customers' },
      { href: '/admin/crm?kind=customer', label: 'Pipeline', path: '/admin/crm', kind: 'customer' },
      { href: '/admin/leads', label: 'Leads', path: '/admin/leads' },
      { href: '/admin/field-guides', label: 'Field guides', path: '/admin/field-guides' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { href: '/admin/blog', label: 'Blog', path: '/admin/blog' },
      { href: '/admin/social', label: 'Social', path: '/admin/social' },
      { href: '/admin/resources', label: 'Resources', path: '/admin/resources' },
      { href: '/admin/seo', label: 'SEO', path: '/admin/seo' },
    ],
  },
  {
    title: 'Brand',
    items: [{ href: '/admin/design', label: 'Design', path: '/admin/design' }],
  },
]

const TITLED = GROUPS.filter((g) => g.title).map((g) => g.title as string)

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname()
  const params = useSearchParams()
  // On any /admin/crm* page, treat a missing kind as "customer" (the default).
  const crmKind = params.get('kind') === 'investor' ? 'investor' : 'customer'

  function isActive(item: Item): boolean {
    if (item.exact) return pathname === item.path
    if (item.kind) return pathname.startsWith('/admin/crm') && crmKind === item.kind
    return pathname.startsWith(item.path)
  }
  const activeGroup = GROUPS.find((g) => g.title && g.items.some(isActive))?.title

  // Collapsed by default (compact); load saved prefs after mount. Same initial
  // value on server + first client render → no hydration mismatch.
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(TITLED))
  useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY)
      if (raw) setCollapsed(new Set(JSON.parse(raw) as string[]))
    } catch {
      /* ignore */
    }
  }, [])

  const persist = (set: Set<string>) => {
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...set]))
    } catch {
      /* ignore */
    }
  }

  // Auto-expand the group of the page you navigate to, but only when the active
  // group actually changes, so a manual collapse afterward isn't re-opened.
  useEffect(() => {
    if (!activeGroup) return
    setCollapsed((prev) => {
      if (!prev.has(activeGroup)) return prev
      const next = new Set(prev)
      next.delete(activeGroup)
      persist(next)
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup])

  function toggle(title: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      persist(next)
      return next
    })
  }

  // Respect the user's choice for every group, including the active one, so any
  // section can be collapsed. Navigating to a section re-opens it (effect above).
  const isOpen = (title: string) => !collapsed.has(title)

  return (
    <>
      {GROUPS.map((g, i) => {
        if (!g.title) {
          return (
            <div key={`g${i}`} className={styles.group}>
              {g.items.map((item) => (
                <Link key={item.href} href={item.href} className={isActive(item) ? styles.linkActive : styles.link} onClick={onNavigate}>
                  {item.label}
                </Link>
              ))}
            </div>
          )
        }
        const open = isOpen(g.title)
        return (
          <div key={g.title} className={styles.group}>
            <button
              type="button"
              className={styles.groupTitle}
              onClick={() => toggle(g.title!)}
              aria-expanded={open}
            >
              <span>{g.title}</span>
              <svg className={`${styles.caret} ${open ? styles.caretOpen : ''}`} width="11" height="11" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open &&
              g.items.map((item) => (
                <Link key={item.href} href={item.href} className={isActive(item) ? styles.linkActive : styles.link} onClick={onNavigate}>
                  {item.label}
                </Link>
              ))}
          </div>
        )
      })}
    </>
  )
}

export default function AdminNav({ email }: { email: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function signOut() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <>
      <button className={styles.burger} aria-label="Open menu" onClick={() => setOpen(true)}>☰</button>
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
      <aside className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
      <div className={styles.brand}>
        <span className={styles.mark}>M</span>
        <span className={styles.brandText}>Admin</span>
      </div>
      <nav className={styles.links}>
        <Suspense fallback={null}>
          <NavLinks onNavigate={() => setOpen(false)} />
        </Suspense>
      </nav>
      <div className={styles.footer}>
        <span className={styles.email} title={email}>
          {email}
        </span>
        <button onClick={signOut} className={styles.signout}>
          Sign out
        </button>
      </div>
      </aside>
    </>
  )
}
