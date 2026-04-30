'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

type ProductItem = { label: string; href: string; description: string }

const productItems: ProductItem[] = [
  { label: 'Today',  href: '/today',  description: 'Your daily HIL queue — 30 min, every morning' },
  { label: 'Mamba',  href: '/mamba',  description: 'The agent in Slack and Teams' },
  { label: 'People', href: '/people', description: 'Directory, comp, performance, leave' },
  { label: 'Hiring', href: '/hiring', description: 'Recruiting and onboarding' },
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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled || productOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled || productOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || productOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || productOpen ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
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
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}
            onClick={() => setProductOpen(false)}
          >
            <img src="/MambaHR_logo.png" alt="MambaHR" width={26} height={26} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
            <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              MambaHR
            </span>
          </Link>

          {/* Desktop links — 4 items: Product (dropdown), Pricing, Security, About */}
          <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
            {/* Product dropdown trigger */}
            <button
              onMouseEnter={openProduct}
              onMouseLeave={scheduleClose}
              onClick={() => setProductOpen(!productOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                fontSize: 14,
                fontWeight: 500,
                color: productOpen ? 'var(--text)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.15s',
                borderRadius: 6,
              }}
            >
              Product
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: productOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Direct links */}
            {[
              { label: 'Pricing',  href: '/pricing'  },
              { label: 'Security', href: '/security' },
              { label: 'About',    href: '/about'    },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={scheduleClose}
                style={{
                  padding: '8px 12px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  borderRadius: 6,
                  transition: 'color 0.15s',
                }}
              >
                {item.label}
              </Link>
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
              Get a demo
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

        {/* Desktop dropdown — single column, 4 product items + see all link */}
        {productOpen && (
          <div
            onMouseEnter={openProduct}
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
            <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {productItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setProductOpen(false)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      padding: '12px 16px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      background: 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.description}</span>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border-faint)' }}>
                <Link
                  href="/mamba"
                  onClick={() => setProductOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--gold-dark)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gold-tint)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  See all 14 specialist agents
                  <span style={{ fontSize: 14 }}>→</span>
                </Link>
              </div>
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
            {/* Product (collapsible) */}
            <div style={{ marginBottom: 8 }}>
              <button
                onClick={() => setMobileProductExpanded(!mobileProductExpanded)}
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: mobileProductExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileProductExpanded && (
                <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                  {productItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ display: 'block', padding: '10px 0', fontSize: 15, fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}
                    >
                      {item.label}
                      <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct links */}
            {[
              { label: 'Pricing',  href: '/pricing'  },
              { label: 'Security', href: '/security' },
              { label: 'About',    href: '/about'    },
              { label: 'Sign in',  href: 'https://app.mambahr.com' },
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
                Get a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
