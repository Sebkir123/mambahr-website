'use client'

import { Suspense, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { useAdminTheme } from '../../admin-theme'
import Icon from './icon'
import { MambaMark } from '@/components/mamba-mark'
import { useDialogLifecycle } from './use-dialog-lifecycle'
import { NAVIGATION, activeNav } from './navigation'
import styles from './admin-nav.module.css'

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const active = activeNav(pathname)
  return <>{NAVIGATION.map((group) => <div key={group.label} className={styles.group}>
    <div className={styles.groupTitle}>{group.label}</div>
    {group.items.map((item) => <Link key={item.href} href={item.href} prefetch={false}
      className={active === item.href ? styles.linkActive : styles.link}
      aria-current={active === item.href ? 'page' : undefined} onClick={onNavigate}>
      <Icon name={item.icon} size={17} /><span>{item.label}</span>
    </Link>)}
  </div>)}</>
}

export default function AdminNav({ email }: { email: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const drawer = useRef<HTMLDialogElement>(null)
  useDialogLifecycle(drawer, pathname, '(min-width: 881px)')
  const { theme, toggle } = useAdminTheme()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const name = email.split('@')[0].split('.').map((part) => part[0]?.toUpperCase()).join('')
  async function signOut() {
    setPending(true); setError('')
    try {
      const { error } = await createSupabaseBrowserClient().auth.signOut()
      if (error) throw error
      router.replace('/admin/login'); router.refresh()
    } catch { setError('Could not sign out. Try again.'); setPending(false) }
  }
  function content(mobile = false) {
    return <>
      <Link href="/admin" className={styles.brand} onClick={() => drawer.current?.close()}>
        <span className={styles.mark}><MambaMark size={26} color="var(--accent-primary)" /></span><span><strong>MambaHR</strong><small>Workspace admin</small></span>
      </Link>
      {mobile && <button type="button" className={styles.close} aria-label="Close navigation" onClick={() => drawer.current?.close()}><Icon name="close" /></button>}
      <nav className={styles.links} aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}>
        <Suspense fallback={<div className={styles.groupTitle}>Loading navigation…</div>}><NavLinks onNavigate={() => drawer.current?.close()} /></Suspense>
      </nav>
      <div className={styles.footer}>
        <a href="/" target="_blank" rel="noreferrer" className={styles.website}>View website <Icon name="arrow" size={14} /></a>
        <div className={styles.user}><span className={styles.avatar}>{name}</span><span className={styles.userInfo}><strong>{email.split('@')[0].replaceAll('.', ' ')}</strong><span title={email}>{email}</span></span>
          <button type="button" onClick={toggle} className={styles.iconButton} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><Icon name={theme === 'light' ? 'moon' : 'sun'} size={16} /></button>
        </div>
        <button type="button" disabled={pending} onClick={signOut} className={styles.signout}><Icon name="logout" size={15} />{pending ? 'Signing out…' : 'Sign out'}</button>
        {error && <p role="alert" className={styles.error}>{error}</p>}
      </div>
    </>
  }
  return <>
    <button type="button" className={styles.burger} aria-label="Open navigation" onClick={() => drawer.current?.showModal()}><Icon name="menu" /></button>
    <aside className={styles.nav}>{content()}</aside>
    <dialog ref={drawer} className={styles.drawer} aria-label="Navigation" onClick={(e) => { if (e.target === e.currentTarget) drawer.current?.close() }}><div className={styles.drawerInner}>{content(true)}</div></dialog>
  </>
}
