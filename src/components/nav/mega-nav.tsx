'use client'

import { ReactNode, useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { byFunction, howItWorks, forWhom, type NavItem } from '@/content/nav'
import { MambaMark } from '@/components/mamba-mark'
import s from './mega-nav.module.css'

// Single-stroke icons, keyed to NavItem.icon. Icons are JSX so they live here,
// not in nav.ts. 20×20, currentColor, gold inside the dropdown chip.
const stroke = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
}
const iconMap: Record<string, ReactNode> = {
  hiring: (<svg {...stroke}><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" /><path d="M16 9h6m-3 -3v6" /></svg>),
  onboarding: (<svg {...stroke}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5h6V7H9z" /><path d="M8.5 12.5l2 2 4-4" /></svg>),
  timeoff: (<svg {...stroke}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /><path d="M9.5 14.5l1.5 1.5 3-3" /></svg>),
  comp: (<svg {...stroke}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v10M9.5 9.2c0-1.1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.8-1 1.5-2.5 1.7-2.5.6-2.5 1.7 1.1 1.8 2.5 1.8 2.5-.6 2.5-1.7" /></svg>),
  compliance: (<svg {...stroke}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  rif: (<svg {...stroke}><path d="M4 20V6M4 20h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="9" width="3" height="8" /><path d="M19 7l-2.5 2.5L15 8" /></svg>),
  payroll: (<svg {...stroke}><path d="M7 4h7l4 4v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M13 4v4h4" /><path d="M9.5 14h3M11 11.5v5" /></svg>),
  agent: (<svg {...stroke}><path d="M3 12a9 9 0 1 1 9 9H3v-9z" /><circle cx="9" cy="11" r="0.7" fill="currentColor" /><circle cx="15" cy="11" r="0.7" fill="currentColor" /></svg>),
  today: (<svg {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  people: (<svg {...stroke}><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" /><circle cx="17" cy="11" r="2.5" /><path d="M14 19c.5-2 2-3 4-3s2.5 1 3 3" /></svg>),
  documents: (<svg {...stroke}><path d="M7 3h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M13 3v4h4M9 12h6M9 16h6" /></svg>),
}

function MenuItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <Link href={item.href} onClick={onNavigate} className={s.item}>
      <span className={s.itemIcon}>{item.icon ? iconMap[item.icon] : null}</span>
      <div className={s.itemBody}>
        <p className={s.itemLabel}>
          {item.label}
          {item.pill && <span className={s.pill}>{item.pill}</span>}
        </p>
        <p className={s.itemDesc}>{item.description}</p>
      </div>
    </Link>
  )
}

const topLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/compare' },
  { label: 'About',   href: '/about'   },
]

export default function MegaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const productBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const wasMobileOpen = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Mobile menu: focus moves into the panel on open and back to the
  // hamburger on close, so keyboard and screen-reader users never lose
  // their place behind a full-screen overlay.
  useEffect(() => {
    if (mobileOpen) {
      wasMobileOpen.current = true
      const first = mobilePanelRef.current?.querySelector<HTMLElement>('a, button')
      first?.focus()
    } else if (wasMobileOpen.current) {
      wasMobileOpen.current = false
      burgerRef.current?.focus()
    }
  }, [mobileOpen])

  const closeProduct = useCallback((returnFocus: boolean) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setProductOpen(false)
    if (returnFocus) productBtnRef.current?.focus()
  }, [])

  // Escape closes whichever disclosure is open and returns focus to its
  // trigger; a click outside the nav closes the Product panel.
  useEffect(() => {
    if (!productOpen && !mobileOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (mobileOpen) { setMobileOpen(false); return }
      const inside = panelRef.current?.contains(document.activeElement) || document.activeElement === productBtnRef.current
      closeProduct(!!inside)
    }
    function onPointer(e: MouseEvent) {
      if (productOpen && navRef.current && !navRef.current.contains(e.target as Node)) closeProduct(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [productOpen, mobileOpen, closeProduct])

  // Focus leaving the panel (Tab past its last link) closes it without
  // moving focus, so the tab order continues into the top links.
  function onPanelBlur(e: React.FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget as Node | null
    if (next && (panelRef.current?.contains(next) || next === productBtnRef.current)) return
    if (next) setProductOpen(false)
  }

  function openProduct() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setProductOpen(true)
  }
  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setProductOpen(false), 180)
  }
  const closeAll = () => setProductOpen(false)
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`${s.nav}${scrolled ? ` ${s.scrolled}` : ''}${scrolled || productOpen ? ` ${s.raised}` : ''}`}
      >
        {/* gradient hairline, fades in on scroll */}
        <div aria-hidden="true" className={s.hairline} />
        <div className={s.bar}>
          {/* Logo */}
          <Link href="/" prefetch={false} className={s.logo} onClick={closeAll}>
            <MambaMark size={22} color="var(--gold)" title="MambaHR" />
            <span className={s.wordmark}>MambaHR</span>
          </Link>

          {/* Desktop links */}
          <div className={s.links}>
            <button
              ref={productBtnRef}
              type="button"
              aria-expanded={productOpen}
              aria-controls="product-menu"
              onMouseEnter={openProduct}
              onMouseLeave={scheduleClose}
              onClick={() => setProductOpen(!productOpen)}
              className={`${s.trigger}${productOpen ? ` ${s.open}` : ''}`}
            >
              Product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={s.chev}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Desktop dropdown: seven function cards, the four "how it works" rows, the three "for" pages */}
            {productOpen && (
              <div
                id="product-menu"
                ref={panelRef}
                onMouseEnter={openProduct}
                onMouseLeave={scheduleClose}
                onBlur={onPanelBlur}
                className={s.panelWrap}
              >
                <div className={`nav-dropdown ${s.panel}`}>
                  <div aria-hidden="true" className={s.panelRule} />
                  <div className={s.panelGrid}>
                    <div>
                      <p className={s.colLabel}>By function</p>
                      <div className={s.cards}>
                        {byFunction.map((item) => <MenuItem key={item.label} item={item} onNavigate={closeAll} />)}
                      </div>
                    </div>

                    <div className={s.rail}>
                      <p className={s.colLabel}>How it works</p>
                      <div className={s.railList}>
                        {howItWorks.map((item) => (
                          <Link key={item.label} href={item.href} onClick={closeAll} className={s.railLink}>
                            <span className={s.railLabel}>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className={s.forRow}>
                        <p className={s.colLabel}>For</p>
                        <div className={s.forLinks}>
                          {forWhom.map((item) => (
                            <Link key={item.label} href={item.href} onClick={closeAll} className={s.forLink}>{item.label}</Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {topLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={scheduleClose}
                className={`nav-top-link ${s.topLink}${pathname?.startsWith(item.href) ? ' nav-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right CTA, single conversion action */}
          <div className={s.right}>
            <Link href="/demo" className="btn btn-dark">
              Book a demo
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className={`nav-burger ${s.burger}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div id="mobile-menu" ref={mobilePanelRef} className={s.mobile}>
          <div className={s.mobileInner}>
            <div>
              <button
                type="button"
                aria-expanded={mobileProductExpanded}
                onClick={() => setMobileProductExpanded(!mobileProductExpanded)}
                className={`${s.mobileTrigger}${mobileProductExpanded ? ` ${s.open}` : ''}`}
              >
                Product
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileProductExpanded && (
                <div className={s.mobileGroup}>
                  <p className={s.colLabel}>By function</p>
                  {byFunction.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobile} className={s.mobileItem}>
                      {item.label}
                      {item.pill && <span className={s.pill}>{item.pill}</span>}
                      <span className={s.mobileDesc}>{item.description}</span>
                    </Link>
                  ))}
                  <p className={s.colLabel} style={{ marginTop: 16 }}>How it works</p>
                  {howItWorks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobile} className={s.mobileItem}>
                      {item.label}
                      <span className={s.mobileDesc}>{item.description}</span>
                    </Link>
                  ))}
                  <p className={s.colLabel} style={{ marginTop: 16 }}>For</p>
                  {forWhom.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobile} className={s.mobileItem}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {topLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMobile} className={s.mobileLink}>
                {item.label}
              </Link>
            ))}

            <div className={s.mobileCta}>
              <Link href="/demo" className="btn btn-dark btn-block" onClick={closeMobile}>
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
