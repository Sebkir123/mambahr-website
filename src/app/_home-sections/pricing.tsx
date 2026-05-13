import Link from 'next/link'

export default function PricingSection() {
  return (
    <>
      <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>PRICING</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 16,
                lineHeight: 1.0,
              }}
            >
              Three tiers.<br />Every agent in all of them.
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580 }}>
              You pay monthly. You get the leverage of HR FTEs that cost <strong style={{ color: 'var(--text)' }}>$80K–$120K/year</strong> each. The math works at every stage.
            </p>
          </div>

          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                name: 'Starter',
                for: '2 — 25 employees',
                price: '$299',
                unit: '/month flat',
                outcome: 'Gets your founder out of HR work',
                features: ['All 14 agents', 'Slack + Teams + web app', 'Migrate from any HRIS', 'Audit log on every action', 'Email support'],
                highlight: false,
              },
              {
                name: 'Growth',
                for: '25 — 500 employees',
                price: '$14',
                unit: '/employee/month',
                outcome: 'Adds the leverage of ~$300K/year in HR capacity',
                features: ['Everything in Starter', 'Human sign-off workflows', 'Cryptographic audit log', 'RBAC + custom roles', 'Dedicated success manager'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                for: '500+ employees',
                price: 'Custom',
                unit: 'volume + multi-entity',
                outcome: 'Multi-entity HR on autopilot',
                features: ['Everything in Growth', 'Multi-entity workspaces', 'SAML SSO + SCIM', 'Custom data residency', '24/7 priority support + SLA'],
                highlight: false,
              },
            ].map((tier) => (
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
                  <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--gold)', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.35)', borderRadius: 999, padding: '4px 10px' }}>MOST POPULAR</span>
                )}

                {/* Tier header */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{tier.name}</p>
                  <p style={{ fontSize: 12, color: tier.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', margin: '4px 0 0' }}>{tier.for}</p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: tier.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-faint)' }}>
                  <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 56, fontWeight: 400, color: tier.highlight ? '#FFFFFF' : 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', marginLeft: 6 }}>
                    {tier.unit}
                  </span>
                </div>

                {/* Outcome */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: tier.highlight ? 'rgba(176,141,87,0.85)' : 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 6px' }}>Outcome</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, lineHeight: 1.4 }}>{tier.outcome}</p>
                </div>

                {/* Features */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                        <path d="M2 7l4 4 6-6" stroke={tier.highlight ? 'var(--gold)' : 'var(--gold-dark)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={tier.name === 'Enterprise' ? '/demo' : '/pricing'}
                  className={tier.highlight ? 'btn-gold' : 'btn-secondary'}
                  style={{ justifyContent: 'center', textAlign: 'center' }}
                >
                  {tier.name === 'Enterprise' ? 'Talk to sales' : 'Start ' + tier.name}
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
            All tiers include the full HRIS, all 14 agents, every integration, every channel. <Link href="/pricing" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>See full breakdown →</Link>
          </p>
        </div>
      </section>

    </>
  )
}
