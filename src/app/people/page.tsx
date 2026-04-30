import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'

export const metadata: Metadata = {
  title: 'People — MambaHR',
  description: 'People ops without the ops. Directory, comp, performance, leave — one agent, every record, every change.',
}

const capabilities = [
  {
    title: 'Directory & Records',
    desc: 'Every employee, every change, every history. Synced across Gusto, Workday, Rippling, BambooHR, or whatever you have. One source of truth.',
    icon: '👤',
  },
  {
    title: 'Lifecycle Changes',
    desc: 'Manager change, transfer, promotion, demotion, location change. The agent updates every system, files every form, notifies every stakeholder.',
    icon: '🔄',
  },
  {
    title: 'Compensation & Benefits',
    desc: 'Comp recommendations within band. Open enrollment, life events. Pay equity audits. Equity refresh modeling. Carta integrated.',
    icon: '$',
  },
  {
    title: 'Time Off & Leave',
    desc: 'Policy-aware PTO approvals in seconds. FMLA, CFRA, PFML stacking. Bereavement, USERRA, ADA accommodations. Every edge case handled.',
    icon: '🗓',
  },
  {
    title: 'Performance & Growth',
    desc: 'Review cycle launch, 360 synthesis, calibration packets, PIP drafting and tracking. Promotion recommendations with EEO disparate impact analysis.',
    icon: '📈',
  },
  {
    title: 'Offboarding',
    desc: 'Resignation to revoked access. Final pay per state. Separation agreements drafted. Okta + downstream revoked. COBRA. Equipment recovery.',
    icon: '🚪',
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

        {/* Hero */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>PEOPLE</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              People ops<br />without the ops.
            </h1>
            <p style={{ fontSize: 20, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36 }}>
              Directory, comp, performance, leave, lifecycle changes — the things a People team does every day, handled by an agent. You stay strategic.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#request-access" className="btn-gold">Request access →</a>
              <Link href="/today" className="btn-secondary">See Today queue</Link>
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
                  style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-faint)', borderRadius: 16, padding: '28px 24px' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{cap.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10, letterSpacing: 0 }}>{cap.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{cap.desc}</p>
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
                    <span style={{ width: 20, height: 20, borderRadius: 5, background: '#1C1917', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--gold)', flexShrink: 0 }}>◆</span>
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
                The Compliance agent runs on every people workflow — checking state law, flagging edge cases, citing regulations, and escalating to legal when necessary. 94.2% accuracy on HR-Bench.
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
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 4 }}>Bring what you have. The agent connects to it.</p>
          <IntegrationsMarquee />
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
