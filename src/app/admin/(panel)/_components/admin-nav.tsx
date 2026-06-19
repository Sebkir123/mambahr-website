'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import styles from './admin-nav.module.css'

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
      { href: '/admin/seo', label: 'SEO', path: '/admin/seo' },
    ],
  },
  {
    title: 'Brand',
    items: [{ href: '/admin/design', label: 'Design', path: '/admin/design' }],
  },
]

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

  return (
    <>
      {GROUPS.map((g, i) => (
        <div key={g.title ?? `g${i}`} className={styles.group}>
          {g.title && <span className={styles.groupTitle}>{g.title}</span>}
          {g.items.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item) ? styles.linkActive : styles.link} onClick={onNavigate}>
              {item.label}
            </Link>
          ))}
        </div>
      ))}
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
