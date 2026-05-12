'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Inline single-stroke icons sized for the dropdown rail
const Icon = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {d.split('|').map((path, i) => <path key={i} d={path} />)}
  </svg>
)

const TodayDot = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

const MambaIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M3 12a9 9 0 1 1 9 9H3v-9z" />
    <circle cx="9" cy="11" r="0.7" fill="currentColor" />
    <circle cx="15" cy="11" r="0.7" fill="currentColor" />
  </svg>
)

const PeopleIconSm = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" />
    <circle cx="17" cy="11" r="2.5" />
    <path d="M14 19c.5-2 2-3 4-3s2.5 1 3 3" />
  </svg>
)

const HiringIconSm = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" />
    <path d="M16 9h6m-3 -3v6" />
  </svg>
)

type ProductItem = { label: string; href: string; description: string; icon: ReactNode }

const productItems: ProductItem[] = [
  { label: 'Today',  href: '/today',  description: 'Your daily sign-off queue — 30 min, every morning', icon: TodayDot },
  { label: 'Mamba',  href: '/mamba',  description: 'The agent in Slack and Teams',                  icon: MambaIcon },
  { label: 'People', href: '/people', description: 'Directory, comp, performance, leave',           icon: PeopleIconSm },
  { label: 'Hiring', href: '/hiring', description: 'Recruiting and onboarding',                      icon: HiringIconSm },
]

void Icon

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
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled || productOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: scrolled || productOpen ? '1px solid var(--border)' : '1px solid rgba(0,0,0,0.04)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.03)' : 'none',
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
            <Image src="/MambaHR_logo.png" alt="MambaHR" width={26} height={26} priority style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
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
            <Link href="/demo" className="btn-gold" style={{ fontSize: 13, padding: '9px 20px' }}>
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

        {/* Desktop dropdown — 2-column editorial: items left, product preview right */}
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
              boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
              zIndex: 40,
            }}
          >
            <div style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

              {/* Left: items + footer link */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase', margin: '0 0 18px 12px' }}>
                  The product
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {productItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setProductOpen(false)}
                      style={{
                        display: 'flex',
                        gap: 14,
                        alignItems: 'flex-start',
                        padding: '12px 12px',
                        borderRadius: 10,
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'background 0.15s',
                        color: 'var(--text)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-warm)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'linear-gradient(135deg, var(--gold-tint) 0%, #E8DDC8 100%)',
                          border: '1px solid rgba(176,141,87,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-dark)',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{item.label}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.45 }}>{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer link */}
                <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                  <Link
                    href="/mamba"
                    onClick={() => setProductOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--gold-dark)',
                      background: 'transparent',
                      border: '1px solid rgba(176,141,87,0.2)',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--gold-tint)'
                      e.currentTarget.style.borderColor = 'rgba(176,141,87,0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(176,141,87,0.2)'
                    }}
                  >
                    Explore all 14 specialist agents
                    <span style={{ fontSize: 14 }}>→</span>
                  </Link>
                </div>
              </div>

              {/* Right: product preview — Today decision card mockup */}
              <div style={{ background: 'var(--bg-warm)', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
                {/* Decorative gold corner glow */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 140, height: 140, background: 'radial-gradient(circle, rgba(176,141,87,0.18), transparent 70%)' }} />

                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase', margin: '0 0 18px', position: 'relative' }}>
                  Live · 9:14 AM
                </p>

                {/* Mini Today queue header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Today queue · 3 items</span>
                </div>

                {/* Decision card mockup */}
                <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(176,141,87,0.4)', borderRadius: 12, padding: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.04)', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.35 }}>
                      Offer for Maya Chen — Senior Engineer
                    </p>
                    <span style={{ background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 4, padding: '2px 8px', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>URGENT</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 10px' }}>$195k base · 0.18% equity · above band 8%</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 12px' }}>
                    Top candidate from 6-week search. Competing offer from Scale AI.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <span style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 600 }}>Needs sign-off</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', background: '#1C1917', color: '#FFFFFF', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                    <button style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>Decline</button>
                  </div>
                </div>

                {/* Caption */}
                <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '14px 0 0', fontFamily: 'var(--font-mono), monospace', position: 'relative' }}>
                  routing 47 actions/min
                </p>
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
              <Link href="/demo" className="btn-gold" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
                Get a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
