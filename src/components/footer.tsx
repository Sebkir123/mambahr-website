'use client'

import Link from 'next/link'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Today', href: '/today' },
      { label: 'Mamba', href: '/mamba' },
      { label: 'People', href: '/people' },
      { label: 'Hiring', href: '/hiring' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/coming-soon/customers' },
      { label: 'Changelog', href: '/coming-soon/changelog' },
      { label: 'Careers', href: '/coming-soon/careers' },
      { label: 'Contact', href: 'mailto:hello@mambahr.com' },
    ],
  },
  {
    title: 'Legal & Trust',
    links: [
      { label: 'Security', href: '/security' },
      { label: 'Privacy', href: '/coming-soon/privacy' },
      { label: 'Terms', href: '/coming-soon/terms' },
      { label: 'SOC 2 (in progress)', href: '/security' },
      { label: 'Investor deck', href: 'mailto:investors@mambahr.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '64px 24px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 40,
            marginBottom: 64,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <img src="/MambaHR_logo.png" alt="MambaHR" width={22} height={22} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
              <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 16, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>MambaHR</span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 200 }}>
              The AI HR department. One human in the loop.
            </p>
            <a
              href="https://linkedin.com/company/mambahr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', marginTop: 20, color: 'var(--text-faint)' }}
              aria-label="MambaHR on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>
                {col.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} MambaHR, Inc. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
            San Francisco, CA
          </p>
        </div>
      </div>
    </footer>
  )
}
