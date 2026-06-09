'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { byFunction, howItWorks, type NavItem } from '@/content/nav'

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
  performance: (<svg {...stroke}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16l3.5-4 3 2.5L20 8" /></svg>),
  comp: (<svg {...stroke}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v10M9.5 9.2c0-1.1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.8-1 1.5-2.5 1.7-2.5.6-2.5 1.7 1.1 1.8 2.5 1.8 2.5-.6 2.5-1.7" /></svg>),
  compliance: (<svg {...stroke}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  rif: (<svg {...stroke}><path d="M4 20V6M4 20h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="9" width="3" height="8" /><path d="M19 7l-2.5 2.5L15 8" /></svg>),
  payroll: (<svg {...stroke}><path d="M7 4h7l4 4v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M13 4v4h4" /><path d="M9.5 14h3M11 11.5v5" /></svg>),
  agent: (<svg {...stroke}><path d="M3 12a9 9 0 1 1 9 9H3v-9z" /><circle cx="9" cy="11" r="0.7" fill="currentColor" /><circle cx="15" cy="11" r="0.7" fill="currentColor" /></svg>),
  today: (<svg {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  people: (<svg {...stroke}><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" /><circle cx="17" cy="11" r="2.5" /><path d="M14 19c.5-2 2-3 4-3s2.5 1 3 3" /></svg>),
  documents: (<svg {...stroke}><path d="M7 3h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M13 3v4h4M9 12h6M9 16h6" /></svg>),
  security: (<svg {...stroke}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.2" /></svg>),
}

function MenuItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      style={{
        display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px',
        borderRadius: 10, textDecoration: 'none', background: 'transparent',
        transition: 'background 0.15s', color: 'var(--text)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-warm)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <span
        style={{
          width: 34, height: 34, borderRadius: 9,
          background: 'linear-gradient(135deg, var(--gold-tint) 0%, #E8DDC8 100%)',
          border: '1px solid rgba(176,141,87,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gold-dark)', flexShrink: 0,
        }}
      >
        {item.icon ? iconMap[item.icon] : null}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{item.label}</p>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.4 }}>{item.description}</p>
      </div>
    </Link>
  )
}

const colLabel = { fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase' as const, margin: '0 0 14px 12px' }

const topLinks = [
  { label: 'Pricing',  href: '/pricing'  },
  { label: 'Compare',  href: '/compare'  },
  { label: 'Security', href: '/security' },
  { label: 'About',    href: '/about'    },
]

export default function MegaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  function openProduct() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setProductOpen(true)
  }
  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setProductOpen(false), 180)
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled || productOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: scrolled || productOpen ? '1px solid var(--border)' : '1px solid rgba(0,0,0,0.04)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.03)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          {/* Logo */}
          <Link href="/" prefetch={false} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }} onClick={() => setProductOpen(false)}>
            <Image src="/MambaHR_logo.png" alt="MambaHR" width={26} height={26} priority style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
            <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>MambaHR</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
            <button
              type="button"
              aria-expanded={productOpen}
              aria-haspopup="menu"
              onMouseEnter={openProduct}
              onMouseLeave={scheduleClose}
              onClick={() => setProductOpen(!productOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500, color: productOpen ? 'var(--text)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.15s', borderRadius: 6 }}
            >
              Product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: productOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {topLinks.map((item) => (
              <Link key={item.label} href={item.href} onMouseEnter={scheduleClose} style={{ padding: '8px 12px', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none', borderRadius: 6, transition: 'color 0.15s' }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right CTA — single conversion action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/demo" className="btn-gold" style={{ fontSize: 13, padding: '9px 20px' }}>
              Request access
            </Link>
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text)' }}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop dropdown — two buyer-vocabulary columns */}
        {productOpen && (
          <div
            onMouseEnter={openProduct}
            onMouseLeave={scheduleClose}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#FFFFFF', borderBottom: '1px solid var(--border)', boxShadow: '0 16px 48px rgba(0,0,0,0.08)', zIndex: 40 }}
          >
            <div style={{ maxWidth: 940, margin: '0 auto', padding: '32px 32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <p style={colLabel}>By function</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {byFunction.map((item) => <MenuItem key={item.label} item={item} onNavigate={() => setProductOpen(false)} />)}
                </div>
              </div>
              <div>
                <p style={colLabel}>How it works</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {howItWorks.map((item) => <MenuItem key={item.label} item={item} onNavigate={() => setProductOpen(false)} />)}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#FFFFFF', overflowY: 'auto', paddingTop: 64 }}>
          <div style={{ padding: '24px 24px 40px' }}>
            <div style={{ marginBottom: 8 }}>
              <button
                type="button"
                aria-expanded={mobileProductExpanded}
                onClick={() => setMobileProductExpanded(!mobileProductExpanded)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', fontSize: 16, fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border-faint)' }}
              >
                Product
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: mobileProductExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileProductExpanded && (
                <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                  <p style={{ ...colLabel, margin: '8px 0 8px' }}>By function</p>
                  {byFunction.map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>
                      {item.label}
                      <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</span>
                    </Link>
                  ))}
                  <p style={{ ...colLabel, margin: '16px 0 8px' }}>How it works</p>
                  {howItWorks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>
                      {item.label}
                      <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {topLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', fontSize: 16, fontWeight: 500, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border-faint)' }}>
                {item.label}
              </Link>
            ))}

            <div style={{ marginTop: 32 }}>
              <Link href="/demo" className="btn-gold" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
                Request access
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
