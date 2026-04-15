'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Product', href: '/' },
  { label: 'Lab', href: '/research' },
  { label: 'Security', href: '/security' },
  { label: 'About Us', href: '/about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled || menuOpen ? 'rgba(9,9,11,0.95)' : 'rgba(9,9,11,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border-mid)' : '1px solid transparent',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1100, padding: '18px 24px' }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 24, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.01em', textDecoration: 'none' }}
        >
          MambaHR
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#request-access"
            className="transition-all duration-200"
            style={{
              backgroundColor: 'var(--gold)',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--gold-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--gold)')}
          >
            Request Access
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            gap: 5,
          }}
        >
          <span style={{ width: 20, height: 2, backgroundColor: 'var(--text)', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ width: 20, height: 2, backgroundColor: 'var(--text)', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 20, height: 2, backgroundColor: 'var(--text)', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            padding: '16px 24px 24px',
            borderTop: '1px solid var(--border-mid)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#request-access"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: 16,
              padding: '14px',
              borderRadius: 10,
              backgroundColor: 'var(--gold)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Request Access
          </Link>
        </div>
      )}
    </nav>
  )
}
