import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'
import EmployeeDirectory from '@/components/surfaces/employee-directory'
import {
  HiringIcon, LifecycleIcon, CompIcon, TimeOffIcon,
  PerformanceIcon, OffboardingIcon,
} from '@/components/surfaces/agent-icons'

// Custom directory icon — matches the agent-icon style
const DirectoryIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="M5 17c0-2 2-3.5 4-3.5s4 1.5 4 3.5" />
    <path d="M14 9h5M14 13h5M14 17h5" />
  </svg>
)

type Capability = { title: string; desc: string; icon: ReactNode; link?: string }

const capabilities: Capability[] = [
  {
    title: 'Directory & Records',
    desc: 'Every employee, every change, every history — in one system of record. Migrate from Gusto, Workday, Rippling, BambooHR, Namely, or wherever your data lives today.',
    icon: <DirectoryIcon />,
  },
  {
    title: 'Lifecycle Changes',
    desc: 'Manager change, transfer, promotion, demotion, location change. The agent updates every system, files every form, notifies every stakeholder.',
    icon: <LifecycleIcon />,
  },
  {
    title: 'Compensation & Benefits',
    desc: 'Comp recommendations within band. Open enrollment, life events. Pay equity audits. Equity refresh modeling. Carta integrated.',
    icon: <CompIcon />,
  },
  {
    title: 'Time Off & Leave',
    desc: 'Policy-aware PTO approvals in seconds. FMLA, CFRA, PFML stacking. Bereavement, USERRA, ADA accommodations. Every edge case handled.',
    icon: <TimeOffIcon />,
  },
  {
    title: 'Performance & Growth',
    desc: 'Review cycle launch, 360 synthesis, calibration packets, PIP drafting and tracking. Promotion recommendations with EEO disparate impact analysis.',
    icon: <PerformanceIcon />,
  },
  {
    title: 'Hiring & Onboarding',
    desc: 'Reqs, screening, scheduling, references, offers, day-one ready. The full hiring loop coordinated through one agent.',
    icon: <HiringIcon />,
    link: '/hiring',
  },
  {
    title: 'Offboarding',
    desc: 'Resignation to revoked access. Final pay per state. Separation agreements drafted. Okta + downstream revoked. COBRA. Equipment recovery.',
    icon: <OffboardingIcon />,
  },
]

const complianceItems = [
  'FMLA, CFRA, state PFML (all 11 states)',
  'Multi-state employment law tracking',
  'Pay transparency (CO/NY/WA/CA)',
  'Equal pay laws and audit support',
  'ADA accommodation workflows',
  'USERRA military leave',
  'WARN Act + mini-WARN compliance',
  'I-9 reverification on work-auth expiration',
]

export default function PeoplePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero — split with employee directory mockup */}
        <section style={{ background: 'var(--bg-warm)', padding: '110px 24px 80px' }}>
          <div className="hero-split" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
            {/* Left: copy */}
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>PEOPLE</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5vw, 68px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.0,
                }}
              >
                People ops<br />without the ops.
              </h1>
              <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                Directory, comp, performance, leave, lifecycle changes — the things a People team does every day, handled by an agent. You stay strategic.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/demo" className="btn-gold">Get a demo →</a>
                <Link href="/today" className="btn-secondary">See Today queue</Link>
              </div>
            </div>

            {/* Right: employee directory mockup */}
            <div className="hero-today-panel">
              <EmployeeDirectory />
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>WHAT&apos;S COVERED</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 64,
                lineHeight: 1.15,
              }}
            >
              Everything a People team does.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="card-hover"
                  style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-faint)', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, var(--gold-tint) 0%, #E8DDC8 100%)',
                      border: '1px solid rgba(176,141,87,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-dark)',
                      marginBottom: 18,
                    }}
                  >
                    {cap.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.01em' }}>{cap.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>{cap.desc}</p>
                  {cap.link && (
                    <Link href={cap.link} style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none' }}>
                      Learn more →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In Slack */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>IN SLACK</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 48,
                lineHeight: 1.15,
              }}
            >
              Every people workflow — from a thread.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { cmd: '@mamba update Sarah\'s title to Staff Engineer and adjust comp to $210k', resp: 'Done. Title updated in HRIS, comp change filed, letter generated for e-sign, payroll notified for next cycle.' },
                { cmd: '@mamba what\'s Alex\'s current PTO balance?', resp: 'Alex has 14 days remaining (out of 20 annual). Next accrual: May 1.' },
                { cmd: '@mamba kick off Q2 performance reviews for the engineering team', resp: 'Review cycle started. 23 review packets generated. 23 invitations sent. Calibration session scheduled for June 15.' },
              ].map((ex, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>{ex.cmd}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Image src="/MambaHR_logo.png" alt="Mamba" width={20} height={20} style={{ display: 'block', objectFit: 'contain', borderRadius: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{ex.resp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>COMPLIANCE BUILT-IN</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.15,
                }}
              >
                Every people action is compliance-checked.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                The Compliance agent runs on every people workflow — checking state law, flagging edge cases, citing regulations, and escalating to legal when necessary.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {complianceItems.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 7l4 4 6-6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section style={{ background: 'var(--bg-warm)', paddingTop: 80, paddingBottom: 80, overflow: 'hidden' }}>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 4 }}>Plays nice with the rest of your stack</p>
          <IntegrationsMarquee />
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
