import SectionCta from '@/components/section-cta'

export default function BuiltForEveryStageSection() {
  return (
    <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>BUILT FOR EVERY STAGE</p>
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
            From two employees<br />to the enterprise.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 580, lineHeight: 1.6 }}>
            The agents scale with you. Same product, same depth — different policy thresholds, different volumes, different price.
          </p>
        </div>

        {/* Three stage cards — typography-driven, no photos */}
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF' }}>
          {[
            {
              range: '2 — 25',
              stage: 'STARTUP',
              title: "Founders running HR off Notion docs and Sheets.",
              copy: 'Your first HR hire is an AI department. Onboarding, payroll, leave, compliance — handled. Spend your time hiring engineers, not chasing W-4s.',
              outcome: 'Outcome: an HR department before your first HR hire',
            },
            {
              range: '25 — 500',
              stage: 'GROWTH',
              title: 'One CHRO doing the work of a 4-person HR team.',
              copy: 'The agents clear the backlog. The CHRO sets policy and approves the calls that matter. Compliance, performance cycles, multi-state payroll — running on autopilot.',
              outcome: 'Outcome: ~$300K/year of HR work, done by the agent',
              highlight: true,
            },
            {
              range: '500 +',
              stage: 'ENTERPRISE',
              title: 'Multi-entity HR running with one human in the loop.',
              copy: 'Multiple legal entities, international headcount, advanced security. Same agents, customized sign-off policy, dedicated success manager, SCIM + custom data residency.',
              outcome: 'Outcome: enterprise HR ops at startup speed',
            },
          ].map((card, i) => (
            <div
              key={card.range}
              style={{
                padding: '40px 32px 36px',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                background: card.highlight ? 'var(--bg-warm)' : '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Range — big serif number */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: card.highlight ? 'var(--gold-dark)' : 'var(--text-faint)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  {card.stage}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 400,
                    color: 'var(--text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {card.range}
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-faint)', margin: '6px 0 0', fontStyle: 'italic' }}>employees</p>
              </div>

              {/* Description */}
              <div style={{ flex: 1, paddingTop: 8, borderTop: card.highlight ? '1px solid rgba(176,141,87,0.25)' : '1px solid var(--border-faint)' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '16px 0 12px', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {card.copy}
                </p>
              </div>

              {/* Outcome */}
              <p style={{ fontSize: 12, fontWeight: 600, color: card.highlight ? 'var(--gold-dark)' : 'var(--text-muted)', margin: 0, paddingTop: 16, borderTop: '1px solid var(--border-faint)' }}>
                {card.outcome}
              </p>
            </div>
          ))}
        </div>
        <SectionCta headline="Tell us your headcount. We'll size the agent." />
      </div>
    </section>
  )
}
