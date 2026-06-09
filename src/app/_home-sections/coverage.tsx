import Link from 'next/link'
import type { ReactNode } from 'react'
import { Beat, Page } from '@/components/ui/page'
import {
  HiringIcon, OnboardingIcon, TimeOffIcon, ReportsIcon, PerformanceIcon,
  CompIcon, CultureIcon, ComplianceIcon, ChangeMgmtIcon,
} from '@/components/surfaces/agent-icons'

type Cell = { icon: ReactNode; name: string; line: string; href: string }

// Buyer-category coverage. Every line maps to a SAFE claim in features.md.
const cells: Cell[] = [
  { icon: <HiringIcon />,      name: 'Hiring & ATS',            line: 'Reqs to signed offer, with a bias-audit gate.',   href: '/hiring' },
  { icon: <OnboardingIcon />,  name: 'Onboarding & offboarding', line: 'Day-one accounts, I-9/E-Verify, clean exits.',    href: '/product#onboarding' },
  { icon: <TimeOffIcon />,     name: 'Time off & leave',         line: 'PTO, FMLA, and state paid-leave stacking.',       href: '/product#leave' },
  { icon: <ReportsIcon />,     name: 'Payroll-ready exports',    line: "Per-cycle change files in your provider's format.", href: '/pricing#exports' },
  { icon: <PerformanceIcon />, name: 'Performance management',   line: 'Cited review drafts, calibration, PIPs.',         href: '/product#performance' },
  { icon: <CompIcon />,        name: 'Compensation',             line: 'Bands, pay-equity checks, raise guardrails.',     href: '/product#comp' },
  { icon: <CultureIcon />,     name: 'Benefits',                 line: '401(k) enrollment + qualifying life events.',     href: '/product#leave' },
  { icon: <ComplianceIcon />,  name: 'Compliance',               line: 'Federal + 50-state rules, every decision cited.', href: '/product#compliance' },
  { icon: <ChangeMgmtIcon />,  name: 'Headcount & RIF',          line: 'Planning, severance math, WARN notices.',         href: '/product#rif' },
]

export default function CoverageSection() {
  return (
    <Beat bg="warm">
      <Page>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Everything HR, covered</p>
          <h2 className="t-h2" style={{ margin: '0 0 16px' }}>One agent. The whole department.</h2>
          <p className="t-lead" style={{ margin: 0 }}>
            Not a database with your name on it. The work itself — handled across every function a People team owns.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
          className="coverage-grid"
        >
          {cells.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="coverage-cell"
              style={{
                display: 'block',
                background: 'var(--bg)',
                padding: '28px 26px',
                textDecoration: 'none',
                color: 'var(--text)',
                transition: 'background 0.15s',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  width: 44, height: 44, borderRadius: 11,
                  background: 'var(--gold-tint)',
                  border: '1px solid rgba(176,141,87,0.22)',
                  color: 'var(--gold-dark)',
                  alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                {c.icon}
              </span>
              <p style={{ fontSize: 17, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{c.name}</p>
              <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{c.line}</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 36 }}>
          <Link
            href="/product"
            prefetch={false}
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            See it in action →
          </Link>
        </div>
      </Page>

      <style>{`
        .coverage-cell:hover { background: var(--bg-warm) !important; }
        @media (max-width: 1024px) { .coverage-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .coverage-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Beat>
  )
}
