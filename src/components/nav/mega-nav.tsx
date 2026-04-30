'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { productSections, platformItems, companyItems } from '@/content/nav'

type Panel = 'product' | 'platform' | 'company' | null

export default function MegaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [openPanel, setOpenPanel] = useState<Panel>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
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

  function openWith(panel: Panel) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenPanel(panel)
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setOpenPanel(null), 180)
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled || openPanel ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled || openPanel ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || openPanel ? 'blur(12px)' : 'none',
          borderBottom: scrolled || openPanel ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              flexShrink: 0,
            }}
            onClick={() => setOpenPanel(null)}
          >
            <span style={{ color: 'var(--gold)', fontSize: 20, lineHeight: 1 }}>◆</span>
            <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              MambaHR
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}
          >
            {(
              [
                { label: 'Product', panel: 'product' as Panel },
                { label: 'Platform', panel: 'platform' as Panel },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Security', href: '/security' },
                { label: 'Company', panel: 'company' as Panel },
              ] as Array<{ label: string; panel?: Panel; href?: string }>
            ).map((item) => (
              item.panel ? (
                <button
                  key={item.label}
                  onMouseEnter={() => openWith(item.panel!)}
                  onMouseLeave={scheduleClose}
                  onClick={() => setOpenPanel(openPanel === item.panel ? null : (item.panel ?? null))}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: openPanel === item.panel ? 'var(--text)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'color 0.15s',
                    borderRadius: 6,
                  }}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: openPanel === item.panel ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  style={{
                    padding: '8px 12px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    borderRadius: 6,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={scheduleClose}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link
              href="https://app.mambahr.com"
              className="hidden md:inline-flex"
              style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none' }}
            >
              Sign in
            </Link>
            <Link href="#request-access" className="btn-gold" style={{ fontSize: 13, padding: '9px 20px' }}>
              Request access
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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

        {/* Desktop mega panel */}
        {openPanel && (
          <div
            onMouseEnter={() => openWith(openPanel)}
            onMouseLeave={scheduleClose}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#FFFFFF',
              borderBottom: '1px solid var(--border)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
              zIndex: 40,
            }}
          >
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 40px' }}>
              {openPanel === 'product' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
                  {productSections.map((section) => (
                    <div key={section.title}>
                      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>
                        {section.title}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpenPanel(null)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                              padding: '10px 12px',
                              borderRadius: 10,
                              textDecoration: 'none',
                              background: 'transparent',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
                              {!item.live && (
                                <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--gold-tint)', color: 'var(--gold-dark)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 4, padding: '1px 6px' }}>Soon</span>
                              )}
                            </span>
                            <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {openPanel === 'platform' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {platformItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenPanel(null)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        padding: '14px 16px',
                        borderRadius: 10,
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
                        {!item.live && (
                          <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--gold-tint)', color: 'var(--gold-dark)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 4, padding: '1px 6px' }}>Soon</span>
                        )}
                      </span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}

              {openPanel === 'company' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {companyItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenPanel(null)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        padding: '14px 16px',
                        borderRadius: 10,
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: '#FFFFFF',
            overflowY: 'auto',
            paddingTop: 64,
          }}
        >
          <div style={{ padding: '24px 24px 40px' }}>
            {/* Product */}
            <div style={{ marginBottom: 8 }}>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'product' ? null : 'product')}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text)',
                  borderBottom: '1px solid var(--border-faint)',
                }}
              >
                Product
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: mobileExpanded === 'product' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileExpanded === 'product' && (
                <div style={{ paddingTop: 8 }}>
                  {productSections.map((section) => (
                    <div key={section.title} style={{ marginBottom: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '8px 0 4px' }}>{section.title}</p>
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}
                        >
                          {item.label} {!item.live && <span style={{ fontSize: 11, color: 'var(--gold)', marginLeft: 4 }}>Soon</span>}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simple links */}
            {[
              { label: 'Pricing', href: '/pricing' },
              { label: 'Security', href: '/security' },
              { label: 'About', href: '/about' },
              { label: 'Sign in', href: 'https://app.mambahr.com' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ display: 'block', padding: '14px 0', fontSize: 16, fontWeight: 500, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border-faint)' }}
              >
                {item.label}
              </Link>
            ))}

            <div style={{ marginTop: 32 }}>
              <Link href="#request-access" className="btn-gold" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
                Request access
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
