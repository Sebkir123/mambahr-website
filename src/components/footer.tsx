import Link from 'next/link'
import Image from 'next/image'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'The AI agent', href: '/mamba' },
      { label: 'Approvals', href: '/today' },
      { label: 'Employee records', href: '/people' },
      { label: 'Hiring & ATS', href: '/hiring' },
      { label: 'See it run', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Security', href: '/security' },
      { label: 'Careers', href: 'mailto:jobs@mambahr.com' },
      { label: 'Contact', href: 'mailto:hello@mambahr.com' },
    ],
  },
  {
    title: 'Compare',
    twoCol: true,
    links: [
      { label: 'vs Rippling', href: '/compare/rippling' },
      { label: 'vs Gusto', href: '/compare/gusto' },
      { label: 'vs Deel', href: '/compare/deel' },
      { label: 'vs BambooHR', href: '/compare/bamboohr' },
      { label: 'vs Namely', href: '/compare/namely' },
      { label: 'vs HiBob', href: '/compare/hibob' },
      { label: 'vs ADP', href: '/compare/adp' },
      { label: 'vs Workday', href: '/compare/workday' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--bg-surface)', position: 'relative', padding: '0 24px 40px' }}>
      {/* gradient hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #B98A4E 30%, #6A5DA6 70%, transparent)',
          opacity: 0.55,
        }}
      />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Serif sign-off */}
        <div
          style={{
            padding: '56px 0 44px',
            borderBottom: '1px solid var(--border-faint)',
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text)',
              margin: 0,
            }}
          >
            HR that runs itself.{' '}
            <span
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(100deg, #B98A4E, #6A5DA6)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Yours can too.
            </span>
          </p>
        </div>

        {/* Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 40,
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" prefetch={false} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 14 }}>
              <Image src="/MambaHR_logo.png" alt="MambaHR" width={22} height={22} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
              <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 17, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em' }}>MambaHR</span>
            </Link>
            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: 210, margin: 0 }}>
              The AI HR department. One human in the loop.
            </p>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 18, fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--color-green)', display: 'inline-block' }} />
              All systems handled
            </p>
            <div>
              <a
                href="https://www.linkedin.com/company/mamba-hr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', marginTop: 16, color: 'var(--text-faint)' }}
                aria-label="MambaHR on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>
                {col.title}
              </p>
              <div
                style={
                  col.twoCol
                    ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 18px' }
                    : { display: 'flex', flexDirection: 'column', gap: 10 }
                }
              >
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    prefetch={false}
                    style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
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
            Made in San Francisco
          </p>
        </div>
      </div>
    </footer>
  )
}
