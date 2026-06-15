'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import styles from './admin-nav.module.css'

const LINKS = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/seo', label: 'SEO' },
]

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <aside className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.mark}>M</span>
        <span className={styles.brandText}>Admin</span>
      </div>
      <nav className={styles.links}>
        {LINKS.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href)
          return (
            <Link key={l.href} href={l.href} className={active ? styles.linkActive : styles.link}>
              {l.label}
            </Link>
          )
        })}
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
  )
}
