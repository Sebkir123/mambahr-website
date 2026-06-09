import Link from 'next/link'

// Marketing-facing pricing. Mirrors pricing.md. Tiers are named by the scope
// of work they cover — NOT by the hire they "replace." MambaHR supports the
// team and does the work; the human keeps the judgment. Annual minimums are
// shown as a qualifier line, not the headline, so the per-employee price reads
// first and smaller teams aren't bounced before they understand the value.
const BOOK_A_CALL_HREF = '/demo'

type Tier = {
  name: string
  pepm: string
  minimum: string
  who: string
  includes: string[]
  cta: string
  popular?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'HR Starter',
    pepm: '$14',
    minimum: '$10k/yr minimum',
    who: 'HR structure before you hire your first HR person.',
    includes: ['Employee records & org chart', 'AI HR helpdesk', 'Documents & basic workflows', 'Payroll-ready exports'],
    cta: 'Start here',
  },
  {
    name: 'HR Ops Manager',
    pepm: '$22',
    minimum: '$24k/yr minimum',
    who: 'A full HR ops team’s worth of work, for a growing company.',
    includes: ['Everything in HR Starter', 'Onboarding & offboarding', 'Offers & approval routing', 'Performance & leave workflows'],
    cta: 'Most teams start here',
    popular: true,
  },
  {
    name: 'AI HR Department',
    pepm: '$30',
    minimum: '$45k/yr minimum',
    who: 'Ops plus HRBP-level support across compliance and change.',
    includes: ['Everything in HR Ops Manager', 'RIF & change planning', 'Advanced compliance & audit', 'SSO, custom workflows'],
    cta: 'Scale up',
  },
  {
    name: 'Enterprise',
    pepm: 'Custom',
    minimum: 'from $100k/yr',
    who: 'Complex workflows, multi-entity, security review.',
    includes: ['Everything in AI HR Department', 'Custom implementation', 'Procurement & security support', 'Enterprise integrations'],
    cta: 'Talk to founders',
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* Header */}
        <div data-animate style={{ marginBottom: 18, maxWidth: 720 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>PRICING</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(34px, 4.2vw, 54px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: '0 0 14px',
              lineHeight: 1.05,
            }}
          >
            A fraction of a full HR team.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Priced per employee, billed annually. <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Founding pricing
            for the first 20 companies</strong> — locked for the life of the contract.
          </p>
        </div>

        {/* Cost-vs-hire strip — cost math framed as work done, not headcount replaced */}
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 36px', lineHeight: 1.6, maxWidth: 720 }}>
          An HR generalist runs <strong style={{ color: 'var(--text)', fontWeight: 600 }}>$85k–$120k a year</strong>.
          MambaHR gives your lean team that firepower from <strong style={{ color: 'var(--text)', fontWeight: 600 }}>$24k</strong> —
          so the people you do have spend their time on judgment, not paperwork.
        </p>

        {/* Tier cards */}
        <div
          className="pricing-tiers"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
        >
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="card-lift"
              style={{
                position: 'relative',
                background: 'var(--bg)',
                border: t.popular ? '1.5px solid var(--gold-dark)' : '1px solid var(--border)',
                borderRadius: 18,
                padding: '26px 22px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxShadow: t.popular ? '0 6px 24px rgba(142,111,64,0.12)' : '0 1px 2px rgba(0,0,0,0.02)',
              }}
            >
              {t.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 22,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: 'var(--gold-dark)',
                    background: 'var(--gold-tint)',
                    border: '1px solid var(--gold-light)',
                    borderRadius: 999,
                    padding: '3px 9px',
                  }}
                >
                  MOST POPULAR
                </span>
              )}

              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                  {t.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 38, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {t.pepm}
                  </span>
                  {t.pepm !== 'Custom' && (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/employee/mo</span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: '6px 0 0' }}>{t.minimum}</p>
              </div>

              <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0, paddingTop: 14, borderTop: '1px solid var(--border-faint)' }}>
                {t.who}
              </p>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                {t.includes.map((f) => (
                  <li key={f} style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.4, display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={BOOK_A_CALL_HREF}
                className={t.popular ? 'btn-gold' : 'btn-secondary'}
                style={{ justifyContent: 'center', width: '100%', fontSize: 13 }}
              >
                {t.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* Footer link to full pricing */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link href="/pricing" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none' }}>
            See full plans, feature comparison & FAQ →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 940px) {
          .pricing-tiers { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .pricing-tiers { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
