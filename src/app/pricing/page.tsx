import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export const metadata: Metadata = {
  title: 'Pricing — MambaHR',
  description: 'Design partner pricing. Four spots open this quarter. Custom pricing — we respond personally within 48 hours.',
}

const tiers = [
  {
    name: 'Pilot',
    sub: 'First 90 days',
    desc: 'Start in one department or function. Validate the ROI before full rollout.',
    features: [
      'Up to 100 employees',
      'All 13 agents enabled',
      'Slack + Teams + Email + Web',
      'HIL approval queue',
      'Audit log',
      'Business-hour support',
      'Weekly sync with founding team',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
  {
    name: 'Production',
    sub: 'After pilot, volume-based',
    desc: 'Full deployment across all HR functions. Priced on employee count.',
    features: [
      'Unlimited employees',
      'All 13 agents enabled',
      'Slack + Teams + Email + Web',
      'HIL approval queue',
      'Audit log + SOC 2 evidence',
      'RBAC and custom roles',
      'Dedicated customer success',
      'Priority support',
    ],
    cta: 'Talk to us',
    highlight: true,
  },
  {
    name: 'Enterprise',
    sub: 'Multi-entity, custom security',
    desc: 'For companies with multiple entities, international headcount, or advanced security requirements.',
    features: [
      'Everything in Production',
      'Multi-entity workspaces',
      'SAML SSO + SCIM',
      'Custom data residency',
      'Dedicated success manager',
      'Legal counsel handoff integrations',
      'Custom HIL policy configuration',
      'SLA guarantees',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
]

const included = [
  'All 13 HR agents (Hiring, Leave, Compliance, Offboarding, and 9 more)',
  'Slack, Teams, Email, and Web app',
  'Human-in-the-Loop approval queue (Today)',
  'Immutable audit log on every agent action',
  'RBAC with 8 default roles',
  'Gusto, Workday, Rippling, BambooHR, Okta, Carta, DocuSign integrations',
  'HR-Bench compliance engine (94.2% accuracy)',
  'SOC 2 compliance evidence (in progress)',
]

const faqs = [
  { q: 'Why no published pricing?', a: "We're in private beta onboarding our first design-partner companies. Pricing depends on employee count, entity structure, and which integrations you need. We respond to every inquiry personally." },
  { q: 'How do you charge — per seat, per employee, per agent?', a: "We're finalizing the production pricing model. The pilot is a fixed fee for 90 days. Production will be per-employee-per-month, banded by company size. All agents are included." },
  { q: "What's the contract length?", a: "The pilot is 90 days, no commitment. Production contracts start at annual. Month-to-month available on request for early customers." },
  { q: 'What does the pilot look like?', a: 'Day 1–3: connect your HRIS and run a data audit. Day 3–7: shadow mode (agents suggest actions, you approve everything). Day 7–14: live mode in one function (e.g., leave requests). Day 14+: expand by function as confidence grows.' },
  { q: 'Can we start in one department?', a: 'Yes. The pilot is designed for that. Most customers start with Leave and then add Hiring and Compliance. Full deployment typically happens in weeks 4–8.' },
  { q: 'What does migration look like?', a: "We connect to your existing HRIS — we don't replace it. Data stays where it is. We add the agent layer on top. The transition is additive, not destructive." },
  { q: "What's the security and compliance posture?", a: 'SOC 2 Type II audit starting month 7. ISO 27001 in parallel. GDPR DPIA for EU customers. HIPAA segregation for FMLA-medical scope. Full detail at /security.' },
  { q: 'Who owns the data?', a: 'You do. Full stop. We are a processor, not a controller. Data can be exported or deleted on request. Bedrock prompt logging disabled at the AWS account level — we cannot see your prompts.' },
]

export default function PricingPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 80px', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>PRICING</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Pricing for design partners.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              We&apos;re onboarding our first four customers this quarter. Pricing is custom. The framework is below. We respond personally within 48 hours.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section style={{ background: '#FFFFFF', padding: '80px 24px 100px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlight ? '#1C1917' : '#FFFFFF',
                    border: tier.highlight ? 'none' : '1px solid var(--border)',
                    borderRadius: 20,
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 20, fontWeight: 700, color: tier.highlight ? '#FFFFFF' : 'var(--text)', marginBottom: 4 }}>{tier.name}</p>
                    <p style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', marginBottom: 16 }}>{tier.sub}</p>
                    <p style={{ fontSize: 14, color: tier.highlight ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', lineHeight: 1.6 }}>{tier.desc}</p>
                  </div>

                  <div style={{ flex: 1, marginBottom: 32 }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                          <path d="M2 7l4 4 6-6" stroke={tier.highlight ? 'var(--gold)' : 'var(--gold)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className={tier.highlight ? 'btn-gold' : 'btn-secondary'}
                    style={{ textAlign: 'center', justifyContent: 'center' }}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>INCLUDED IN ALL TIERS</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(26px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 48,
                lineHeight: 1.15,
              }}
            >
              Everything. No add-ons.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {included.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" stroke="var(--gold)" strokeWidth="1.5" />
                    <path d="M5 8l2.5 2.5 3.5-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>FAQ</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(26px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 56,
              }}
            >
              The questions we get on every call.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    padding: '24px 0',
                    borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{faq.q}</p>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          id="contact"
          style={{ background: '#1C1917', padding: '100px 24px', textAlign: 'center' }}
        >
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'rgba(176,141,87,0.9)', marginBottom: 20 }}>GET IN TOUCH</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              4 design-partner spots.<br />This quarter.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 48, lineHeight: 1.6 }}>
              We respond personally within 48 hours. No sales team. No demo calls before a conversation.
            </p>
            <Waitlist />
            <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              Or email us at{' '}
              <a href="mailto:hello@mambahr.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                hello@mambahr.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
