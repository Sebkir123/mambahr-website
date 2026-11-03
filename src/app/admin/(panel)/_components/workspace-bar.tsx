'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Icon from './icon'
import { PAGES, type NavItem } from './navigation'
import styles from './workspace-bar.module.css'
import { useDialogLifecycle } from './use-dialog-lifecycle'
import { refreshAdminWorkspace } from '../actions'

const destinations: NavItem[] = PAGES
export default function WorkspaceBar() {
  const pathname = usePathname()
  const router = useRouter()
  const dialog = useRef<HTMLDialogElement>(null)
  useDialogLifecycle(dialog, pathname)
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [refreshing, startRefresh] = useTransition()
  const [refreshError, setRefreshError] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const page = PAGES.find((p) => p.exact ? pathname === p.href : pathname === p.href || pathname.startsWith(`${p.href}/`))
  const section = page?.label ?? 'Overview'
  const results = destinations.filter((p) => p.label.toLowerCase().includes(query.toLowerCase().trim()))
  function openSearch() { setQuery(''); dialog.current?.showModal(); input.current?.focus() }
  useEffect(() => {
    function keydown(e: KeyboardEvent) { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setQuery(''); dialog.current?.showModal(); input.current?.focus() } }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [])
  function refresh() { startRefresh(async () => { setRefreshError(false); try { await refreshAdminWorkspace(); router.refresh() } catch { setRefreshError(true) } }) }
  return <>
    <div className={styles.bar}>
      <div className={styles.breadcrumb}><Link href="/admin">Workspace</Link><Icon name="chevron" size={12} /><span>{section}</span>{page && pathname !== page.href && <><Icon name="chevron" size={12} /><span className={styles.detail}>Details</span></>}</div>
      <div className={styles.actions}>
        {refreshError && <span role="alert" className={styles.refreshError}>Refresh failed. Try again.</span>}
        <button type="button" className={styles.search} onClick={openSearch}><Icon name="search" size={15} /><span>Jump to a page</span><kbd>⌘ K</kbd></button>
        <button type="button" className={styles.refresh} onClick={refresh} aria-label="Refresh page data" title="Refresh page data" disabled={refreshing}><Icon name="refresh" size={16} /></button>
      </div>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-label="Jump to a page" onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close() }}>
      <div className={styles.searchHead}><Icon name="search" /><input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Find an admin page" placeholder="Where would you like to go?" onKeyDown={(e) => { if (e.key === 'Enter' && results[0]) { e.preventDefault(); e.stopPropagation(); dialog.current?.close(); router.push(results[0].href) } }} /><button type="button" aria-label="Close search" onClick={() => dialog.current?.close()}><kbd>Esc</kbd></button></div>
      <div className={styles.results}>{results.length === 0 ? <p className={styles.noResults}>No matching pages. Try “blog” or “resources”.</p> : results.map((item) => <Link key={item.href} href={item.href} className={styles.result} onClick={() => dialog.current?.close()}><Icon name={item.icon} size={17} /><span>{item.label}</span><Icon name="chevron" size={13} /></Link>)}</div>
      <div className={styles.searchFoot}>Type to filter · Enter opens the first result</div>
    </dialog>
  </>
}
