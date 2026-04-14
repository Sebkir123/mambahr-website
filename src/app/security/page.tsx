'use client'

import { useState } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ParticleField from '@/components/particle-field'

const faqItems = [
  {
    q: 'Does MambaHR train AI models on my data?',
    a: 'No. Your HR data is never used to train, fine-tune, or improve any AI model. Inputs are processed for your specific request and immediately discarded. This is a contractual guarantee.',
  },
  {
    q: 'Where is my data stored?',
    a: 'All data is stored in SOC 2 certified data centers in the United States. We use automatic daily backups with point-in-time recovery.',
  },
  {
    q: 'How do you handle PII like SSNs and salary data?',
    a: 'All PII is encrypted at rest (AES-256) and in transit (TLS 1.3). PII fields have additional column-level encryption. Access requires explicit permissions and is logged.',
  },
  {
    q: 'Can we delete employee data?',
    a: 'Yes. We support full data deletion requests per your retention policies. Data is purged from primary systems within 30 days and backups within 90 days.',
  },
  {
    q: 'How do you connect to our HRIS?',
    a: 'Via OAuth 2.0 with scopes you explicitly approve. We never store your HRIS credentials. You can revoke access at any time from your HRIS admin panel.',
  },
  {
    q: 'Can we get your security documentation?',
    a: 'Yes. We provide a security addendum, data processing agreement (DPA), and infrastructure documentation to all design partners during onboarding.',
  },
]

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {faqItems.map((item, i) => (
        <div key={item.q} style={{ borderBottom: i < faqItems.length - 1 ? '1px solid #e7e5e4' : 'none' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1a1611', paddingRight: 24 }}>{item.q}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
              <path d="M5 8l5 5 5-5" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ maxHeight: open === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
            <p style={{ fontSize: 15, color: '#57534e', lineHeight: 1.7, paddingBottom: 24 }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SecurityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ═══ HERO — emotional, not technical ═══ */}
        <section className="relative" style={{ paddingTop: 140, paddingBottom: 100, backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Large shield icon */}
            <div style={{ marginBottom: 32, display: 'inline-block' }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M32 4l24 9v16c0 14-10 26-24 30C18 55 8 43 8 29V13l24-9z" stroke="var(--gold)" strokeWidth="2" fill="rgba(176,141,87,0.06)" />
                <path d="M22 32l7 7 13-14" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 20, maxWidth: 550, margin: '0 auto 20px' }}>
              Your employees&apos; data is safe with us.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
              SSNs, salaries, health records, performance reviews — we handle it all with the care it deserves.
            </p>
          </div>
        </section>

        {/* ═══ THE BIG PROMISE — "We never train on your data" ═══ */}
        <section style={{ padding: '80px 24px', backgroundColor: '#fafaf7' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              padding: '48px 40px',
              borderRadius: 20,
              backgroundColor: '#fff',
              border: '1px solid #e7e5e4',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              maxWidth: 600,
              margin: '0 auto',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#f0fdf4',
                border: '2px solid #bbf7d0',
                marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 12 }}>
                We never train on your data.
              </h2>
              <p style={{ fontSize: 16, color: '#57534e', lineHeight: 1.6 }}>
                Your HR data is processed for your requests and immediately discarded from all AI systems. No training. No fine-tuning. No retention. Contractually guaranteed.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ HOW YOUR DATA FLOWS — visual story ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: '#fafaf7', borderTop: '1px solid #e7e5e4' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 12 }}>
                How your data flows.
              </h2>
              <p style={{ fontSize: 16, color: '#78716c', maxWidth: 440, margin: '0 auto' }}>
                Every step is encrypted, logged, and under your control.
              </p>
            </div>

            {/* 3-step flow with visual cards */}
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 0, position: 'relative' }}>
              {/* Connecting arrows — desktop only */}
              <svg className="hidden md:block" style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, transform: 'translateY(-50%)', zIndex: 0 }} viewBox="0 0 900 2" preserveAspectRatio="none">
                <line x1="200" y1="1" x2="380" y2="1" stroke="#e7e5e4" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="520" y1="1" x2="700" y2="1" stroke="#e7e5e4" strokeWidth="1.5" strokeDasharray="6 4" />
              </svg>

              {[
                {
                  step: '01',
                  title: 'Your HRIS',
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="4" y="8" width="32" height="24" rx="4" stroke="var(--gold)" strokeWidth="1.5" />
                      <path d="M4 16h32" stroke="var(--gold)" strokeWidth="1.5" />
                      <circle cx="10" cy="12" r="1.5" fill="var(--gold)" />
                      <circle cx="15" cy="12" r="1.5" fill="var(--gold)" />
                      <rect x="10" y="22" width="20" height="4" rx="1" fill="rgba(176,141,87,0.15)" />
                    </svg>
                  ),
                  lines: [
                    'Data stays in your HRIS',
                    'OAuth 2.0 — scopes you approve',
                    'Revoke access anytime',
                  ],
                },
                {
                  step: '02',
                  title: 'MambaHR Agent',
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 4l14 5v10c0 8-6 15-14 17C12 34 6 27 6 19V9l14-5z" stroke="var(--gold)" strokeWidth="1.5" fill="rgba(176,141,87,0.06)" />
                      <rect x="14" y="16" width="12" height="8" rx="2" stroke="var(--gold)" strokeWidth="1.2" />
                      <path d="M17 16v-2a3 3 0 016 0v2" stroke="var(--gold)" strokeWidth="1.2" />
                    </svg>
                  ),
                  lines: [
                    'Encrypted in transit (TLS 1.3)',
                    'Encrypted at rest (AES-256)',
                    'Zero retention on AI models',
                  ],
                },
                {
                  step: '03',
                  title: 'Audit Log',
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="8" y="4" width="24" height="32" rx="3" stroke="var(--gold)" strokeWidth="1.5" />
                      <path d="M14 14h12M14 20h8M14 26h10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="14" cy="9" r="1.5" fill="var(--gold)" />
                    </svg>
                  ),
                  lines: [
                    'Every action timestamped',
                    'Full decision trail',
                    'Exportable and immutable',
                  ],
                },
              ].map((item, i) => (
                <div key={item.step} style={{ position: 'relative', zIndex: 1, padding: '0 16px' }}>
                  <div className="card-hover" style={{
                    padding: 32,
                    borderRadius: 16,
                    backgroundColor: '#fff',
                    border: i === 1 ? '2px solid rgba(176,141,87,0.2)' : '1px solid #e7e5e4',
                    boxShadow: i === 1 ? '0 8px 32px rgba(176,141,87,0.08)' : '0 4px 16px rgba(0,0,0,0.04)',
                    textAlign: 'center',
                  }}>
                    <div style={{ marginBottom: 16 }}>{item.icon}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.06em' }}>{item.step}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1611', margin: '8px 0 16px' }}>{item.title}</h3>
                    <div style={{ textAlign: 'left' }}>
                      {item.lines.map((line) => (
                        <div key={line} className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="7" cy="7" r="6" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
                            <path d="M4 7l2 2 4-4" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: 13, color: '#57534e' }}>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHAT WE PROTECT — big visual list ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
                  What we protect
                </p>
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
                  Every type of HR data. Every layer of protection.
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  HR data isn&apos;t just names and emails. It&apos;s the most sensitive information in your company. We built our security for this reality.
                </p>
              </div>
              <div>
                {[
                  { label: 'Social Security Numbers', detail: 'Column-level encryption + access logging' },
                  { label: 'Salary & Compensation', detail: 'Role-gated access, encrypted at rest' },
                  { label: 'Health & Benefits Info', detail: 'HIPAA-informed handling practices' },
                  { label: 'Performance Reviews', detail: 'Manager-only access controls' },
                  { label: 'Termination Records', detail: 'Immutable audit trail on all actions' },
                  { label: 'Immigration Documents', detail: 'Encrypted storage, retention policies enforced' },
                ].map((item, i) => (
                  <div key={item.label} style={{ padding: '16px 0', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: '#fafaf7' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 48 }}>
              Common questions.
            </h2>
            <FAQAccordion />
          </div>
        </section>

        {/* ═══ CONTACT — simple, not "request documentation" ═══ */}
        <section className="relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
              Need more detail?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
              We&apos;ll walk you through our security posture, share our DPA, and answer any questions your team has.
            </p>
            <a href="mailto:security@mambahr.com" className="cta-glow" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Talk to us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
