import Link from 'next/link'
import type { ReactNode } from 'react'
import { Beat, Page } from '@/components/ui/page'
import {
  HiringIcon, OnboardingIcon, TimeOffIcon, ReportsIcon, PerformanceIcon,
  CompIcon, CultureIcon, ComplianceIcon, ChangeMgmtIcon,
} from '@/components/surfaces/agent-icons'

type Cell = { icon: ReactNode; name: string; line: string; href: string; featured?: boolean }

// Buyer-category coverage. Every line maps to a SAFE claim in features.md.
const cells: Cell[] = [
  { icon: <HiringIcon />,      name: 'Hiring & ATS',             line: 'Reqs to signed offer, with a bias-audit gate.',    href: '/hiring' },
  { icon: <OnboardingIcon />,  name: 'Onboarding & offboarding', line: 'Day-one accounts, I-9/E-Verify, clean exits.',      href: '/product#onboarding', featured: true },
  { icon: <TimeOffIcon />,     name: 'Time off & leave',         line: 'PTO, FMLA, and state paid-leave stacking.',        href: '/product#leave' },
  { icon: <ReportsIcon />,     name: 'Payroll-ready exports',    line: "Per-cycle change files in your provider's format.", href: '/pricing#exports' },
  { icon: <PerformanceIcon />, name: 'Performance management',   line: 'Cited review drafts, calibration, PIPs.',          href: '/product#performance' },
  { icon: <CompIcon />,        name: 'Compensation',             line: 'Bands, pay-equity checks, raise guardrails.',      href: '/product#comp' },
  { icon: <CultureIcon />,     name: 'Benefits',                 line: '401(k) enrollment + qualifying life events.',      href: '/product#leave' },
  { icon: <ComplianceIcon />,  name: 'Compliance',               line: 'Federal + 50-state rules, every decision cited.',  href: '/product#compliance' },
  { icon: <ChangeMgmtIcon />,  name: 'Headcount & RIF',          line: 'Planning, severance math, WARN notices.',          href: '/product#rif' },
]

export default function CoverageSection() {
  return (
    <Beat bg="cream">
      <Page>
        <div style={{ maxWidth: 660, margin: '0 auto 64px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Everything HR, covered</p>
          <h2 className="t-h2" style={{ margin: '0 0 18px' }}>One agent. <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>The whole department.</em></h2>
          <p className="t-lead" style={{ margin: 0 }}>
            Not a database with your name on it. The work itself — across every function a People team owns.
          </p>
        </div>

        <div
          className="coverage-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}
        >
          {cells.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              prefetch={false}
              className="coverage-cell card-lift"
              style={{
                display: 'block',
                background: c.featured ? 'linear-gradient(160deg, var(--gold-tint) 0%, #FFFFFF 70%)' : 'var(--bg)',
                border: c.featured ? '1px solid var(--gold-light)' : '1px solid var(--border)',
                borderRadius: 18,
                padding: '30px 28px',
                textDecoration: 'none',
                color: 'var(--text)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  width: 52, height: 52, borderRadius: 14,
                  background: c.featured
                    ? 'linear-gradient(150deg, var(--gold) 0%, var(--gold-dark) 100%)'
                    : 'linear-gradient(150deg, var(--gold-tint) 0%, #EADFC8 100%)',
                  border: c.featured ? 'none' : '1px solid rgba(176,141,87,0.28)',
                  color: c.featured ? '#FFFFFF' : 'var(--gold-dark)',
                  alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                  boxShadow: c.featured ? '0 6px 16px rgba(142,111,64,0.28)' : 'var(--sheen)',
                }}
              >
                {c.icon}
              </span>
              <p style={{ fontSize: 18, fontWeight: 600, margin: '0 0 7px', letterSpacing: '-0.01em' }}>{c.name}</p>
              <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.line}</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 44, textAlign: 'center' }}>
          <Link
            href="/product"
            prefetch={false}
            className="btn-gold"
            style={{ fontSize: 15 }}
          >
            See it in action →
          </Link>
        </div>
      </Page>

      <style>{`
        @media (max-width: 1024px) { .coverage-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .coverage-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Beat>
  )
}
