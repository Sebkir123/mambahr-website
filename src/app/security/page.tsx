'use client'

import { useState } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ParticleField from '@/components/particle-field'

const principles = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3l11 4v8c0 6.5-4.5 12-11 14C9.5 27 5 21.5 5 15V7l11-4z" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M12 16l3 3 5-6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'PII Protection',
    desc: 'Employee personally identifiable information is encrypted at rest and in transit. We treat every piece of HR data as sensitive by default — names, SSNs, salaries, health info.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="14" width="24" height="14" rx="3" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M10 14V10a6 6 0 1112 0v4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="21" r="2" fill="var(--gold)" />
      </svg>
    ),
    title: 'Encryption Everywhere',
    desc: 'AES-256 encryption at rest. TLS 1.3 in transit. Your data is encrypted before it touches our systems and stays encrypted in storage. No exceptions.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M16 10v6l4 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Zero Data Retention on AI',
    desc: 'Your HR data is never used to train AI models. Inputs are processed and discarded. We contractually guarantee zero data retention on all AI inference.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 8h20M6 16h20M6 24h20" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="2" fill="var(--gold)" />
        <circle cx="20" cy="16" r="2" fill="var(--gold)" />
        <circle cx="14" cy="24" r="2" fill="var(--gold)" />
      </svg>
    ),
    title: 'Full Audit Trail',
    desc: 'Every decision the agent makes is logged with a timestamp, the data it used, and the policy it applied. You can audit any action at any time.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="6" width="26" height="20" rx="3" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M3 12h26" stroke="var(--gold)" strokeWidth="1.5" />
        <circle cx="8" cy="9" r="1" fill="var(--gold)" />
        <circle cx="12" cy="9" r="1" fill="var(--gold)" />
      </svg>
    ),
    title: 'Access Controls',
    desc: 'Role-based access control with SSO integration. Admin, HR Manager, and Read-Only roles with granular permissions. Every access event is logged.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 16a8 8 0 1116 0 8 8 0 01-16 0z" stroke="var(--gold)" strokeWidth="1.5" />
        <path d="M16 12v4l3 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 4l4 4M28 4l-4 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Incident Response',
    desc: 'Documented incident response plan with defined SLAs. We notify affected customers within 72 hours of any confirmed breach, per our security addendum.',
  },
]

const faqItems = [
  {
    q: 'Does MambaHR train AI models on my data?',
    a: 'No. Your HR data is never used to train, fine-tune, or improve any AI model. Inputs are processed for your specific request and immediately discarded from AI systems. This is a contractual guarantee in our security addendum.',
  },
  {
    q: 'Where is my data stored?',
    a: 'All data is stored in SOC 2 certified data centers in the United States. We use Supabase (backed by AWS) for our primary database with automatic daily backups and point-in-time recovery.',
  },
  {
    q: 'How do you handle PII like SSNs and salary data?',
    a: 'All PII is encrypted at rest using AES-256 and in transit using TLS 1.3. Within our application, PII fields are additionally encrypted at the column level. Access to raw PII requires explicit role-based permissions and is logged.',
  },
  {
    q: 'What happens if an employee leaves and we need to delete their data?',
    a: 'We support full data deletion requests per your retention policies. When you request deletion, the data is purged from all primary systems within 30 days and from backups within 90 days.',
  },
  {
    q: 'Do you have SOC 2 certification?',
    a: 'We are currently pursuing SOC 2 Type I certification, targeted for completion in Q3 2026. In the meantime, we follow SOC 2 Trust Service Criteria as our baseline for all security controls and can share our current security posture documentation on request.',
  },
  {
    q: 'How do you connect to our HRIS?',
    a: 'We integrate via OAuth 2.0 with read/write scopes that you explicitly approve. We never store your HRIS credentials. You can revoke MambaHR\'s access at any time from your HRIS admin panel.',
  },
  {
    q: 'Can I get a copy of your security documentation?',
    a: 'Yes. We provide a security addendum, data processing agreement (DPA), and infrastructure documentation to all design partners during onboarding. Contact security@mambahr.com for access.',
  },
]

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {faqItems.map((item, i) => (
        <div
          key={item.q}
          style={{
            borderBottom: i < faqItems.length - 1 ? '1px solid var(--border-light)' : 'none',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-dark)', paddingRight: 24 }}>{item.q}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                flexShrink: 0,
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <path d="M5 8l5 5 5-5" stroke="var(--text-dark-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            style={{
              maxHeight: open === i ? 300 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.7, paddingBottom: 20 }}>
              {item.a}
            </p>
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
        {/* ═══ HERO ═══ */}
        <section className="relative" style={{ paddingTop: 140, paddingBottom: 96, backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
              Security
            </p>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 20, maxWidth: 600, margin: '0 auto 20px' }}>
              Built for the most <span style={{ color: 'var(--gold)' }}>sensitive data.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 36px' }}>
              HR data includes SSNs, salaries, health information, and performance reviews. We treat every byte as if it were our own.
            </p>
            <a href="mailto:security@mambahr.com" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Request security documentation
            </a>
          </div>
        </section>

        {/* ═══ SECURITY PRINCIPLES — 6 cards ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
              How we protect your data
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 56 }}>
              Enterprise-grade from day one.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="card-hover"
                  style={{
                    padding: 28,
                    borderRadius: 14,
                    backgroundColor: '#fff',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ACCORDION ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 48 }}>
              Common questions.
            </h2>

            <FAQAccordion />
          </div>
        </section>

        {/* ═══ DATA HANDLING VISUAL ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}>
                How your data flows.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
                Your data never leaves your control. Here&apos;s exactly what happens at each step.
              </p>
            </div>

            {/* Data flow diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
              {[
                {
                  step: '01',
                  title: 'Your HRIS',
                  desc: 'Data stays in your HRIS (Gusto, BambooHR, Rippling). MambaHR connects via OAuth with scopes you approve.',
                  detail: 'You control access. Revoke anytime.',
                },
                {
                  step: '02',
                  title: 'MambaHR Agent',
                  desc: 'The agent processes requests using your data. PII is encrypted in transit (TLS 1.3) and at rest (AES-256).',
                  detail: 'Zero data retention on AI models.',
                },
                {
                  step: '03',
                  title: 'Audit Log',
                  desc: 'Every action is logged — what was accessed, what decision was made, what policy was applied, and when.',
                  detail: 'Full trail. Exportable. Immutable.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    padding: 24,
                    borderRadius: 14,
                    backgroundColor: 'rgba(17,17,19,0.4)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border-mid)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.2), transparent)' }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>{item.step}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '12px 0 8px' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{item.desc}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative" style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}>
          <ParticleField />
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 16 }}>
              Questions about security?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
              We&apos;re happy to share our full security documentation, DPA, and infrastructure details.
            </p>
            <a href="mailto:security@mambahr.com" className="cta-glow" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 999, backgroundColor: 'var(--gold)', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Contact security@mambahr.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
