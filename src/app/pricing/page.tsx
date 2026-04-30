import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export const metadata: Metadata = {
  title: 'Pricing — MambaHR',
  description: 'Simple, transparent pricing for the AI HR department. Per-employee, all agents included.',
}

const tiers = [
  {
    name: 'Starter',
    range: '2 — 25 employees',
    price: '$299',
    unit: '/month flat',
    outcome: 'Replaces your founder doing HR',
    desc: 'Your first HR hire is an AI department. Onboarding, payroll, leave, compliance — handled. No FTE, no recruiter fees.',
    features: [
      'Up to 25 employees',
      'All 14 agents enabled',
      'Slack, Teams, Web app',
      'Migrate from any HRIS',
      'Audit log on every action',
      'Email support · 24h response',
      'Cancel anytime',
    ],
    cta: 'Start Starter',
    highlight: false,
  },
  {
    name: 'Growth',
    range: '25 — 500 employees',
    price: '$14',
    unit: '/employee/month',
    outcome: 'Saves ~$300K/year on HR FTEs',
    desc: 'Full AI HR department. The CHRO replaces a 4-person HR team. Compliance, performance, payroll — autopilot.',
    features: [
      'Everything in Starter',
      'HIL approval workflows',
      'SOC 2 Type II evidence',
      'RBAC + custom roles',
      'Dedicated customer success',
      'Priority Slack support · 4h response',
      'Annual or monthly billing',
    ],
    cta: 'Start Growth',
    highlight: true,
  },
  {
    name: 'Enterprise',
    range: '500+ employees',
    price: 'Custom',
    unit: 'volume + multi-entity',
    outcome: 'Multi-entity HR on autopilot',
    desc: 'Multiple legal entities, international headcount, advanced security. Custom HIL policy, dedicated infra, SLA.',
    features: [
      'Everything in Growth',
      'Multi-entity workspaces',
      'SAML SSO + SCIM',
      'Custom data residency',
      'Dedicated success manager',
      '24/7 priority support + SLA',
      'Custom HIL policy configuration',
    ],
    cta: 'Talk to sales',
    highlight: false,
  },
]

const included = [
  'Full HRIS — system of record for every employee',
  'All 14 HR agents (Hiring, Leave, Compliance, Change Management, and 10 more)',
  'Slack, Teams, and Web app',
  'Human-in-the-Loop approval queue (Today)',
  'Immutable audit log on every agent action',
  'RBAC with 8 default roles',
  'Migration from any HRIS (Gusto, Workday, Rippling, BambooHR, Namely, Personio, HiBob)',
  'Integrations: Okta, Carta, DocuSign, Greenhouse, Lever, Lattice, Checkr',
  'Compliance engine — federal + 50 state codes, every action cited',
  'SOC 2 compliance evidence (in progress)',
]

const faqs = [
  { q: 'Why no published pricing?', a: "Pricing depends on employee count, entity structure, and which integrations you need. We respond to every inquiry personally — usually with a quote within 24 hours." },
  { q: 'How do you charge — per seat, per employee, per agent?', a: "Per employee, per month, banded by company size. All 14 agents are included. No per-feature pricing, no add-ons, no surprise overage fees." },
  { q: "What's the contract length?", a: "The pilot is 90 days, no long-term commitment. Production contracts start at annual. Month-to-month available on request." },
  { q: 'What does the pilot look like?', a: 'Day 1–3: connect your HRIS and run a data audit. Day 3–7: shadow mode (agents suggest actions, you approve everything). Day 7–14: live mode in one function (e.g., leave requests). Day 14+: expand by function as confidence grows.' },
  { q: 'Can we start in one HR function?', a: 'Yes. Most teams start with Leave and then add Hiring and Compliance. Full deployment typically happens in weeks 4–8.' },
  { q: 'What does migration look like?', a: "MambaHR is the HRIS — we replace whatever you have today. Day 1 we map your data model from Gusto/Workday/Rippling/BambooHR/Namely/Personio/HiBob. Day 2 we run a dry-import and you verify. Day 3 we cut over. Most teams are fully migrated in a week." },
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
              Three tiers.<br />Every agent in all of them.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              From $299/month flat for early-stage startups to per-employee pricing at scale. Same product, same depth, different volume.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section style={{ background: '#FFFFFF', padding: '80px 24px 100px' }}>
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="mobile-stack">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlight ? '#1C1917' : '#FFFFFF',
                    border: tier.highlight ? '1px solid rgba(176,141,87,0.3)' : '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '36px 28px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: tier.highlight ? '0 8px 32px rgba(28,25,23,0.18)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {tier.highlight && (
                    <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--gold)', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.35)', borderRadius: 999, padding: '4px 10px' }}>
                      MOST POPULAR
                    </span>
                  )}

                  {/* Header */}
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{tier.name}</p>
                    <p style={{ fontSize: 12, color: tier.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', margin: '4px 0 0' }}>{tier.range}</p>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: tier.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-faint)' }}>
                    <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 64, fontWeight: 400, color: tier.highlight ? '#FFFFFF' : 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: 14, color: tier.highlight ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', marginLeft: 6 }}>
                      {tier.unit}
                    </span>
                  </div>

                  {/* Outcome */}
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: tier.highlight ? 'rgba(176,141,87,0.85)' : 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 6px' }}>Outcome</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, lineHeight: 1.4 }}>{tier.outcome}</p>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>{tier.desc}</p>

                  {/* Features */}
                  <div style={{ flex: 1, marginBottom: 24, paddingTop: 20, borderTop: tier.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-faint)' }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                          <path d="M2 7l4 4 6-6" stroke={tier.highlight ? 'var(--gold)' : 'var(--gold-dark)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)', lineHeight: 1.5 }}>{f}</span>
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
              Talk to the founders.<br />Get a quote in 24 hours.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 48, lineHeight: 1.6 }}>
              No sales team. No demo gauntlet. Brian and Sebastian respond to every inquiry personally.
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
