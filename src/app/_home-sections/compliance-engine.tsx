import SectionCta from '@/components/section-cta'

export default function ComplianceEngineSection() {
  return (
    <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ maxWidth: 760, marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>THE COMPLIANCE ENGINE</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 24,
              lineHeight: 1.0,
            }}
          >
            The cases that<br />
            <span style={{ color: 'var(--gold-dark)' }}>cost you money.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 600 }}>
            Federal employment law, all 50 state codes, kept current and cited. Three real edge cases — and how MambaHR handles them, citation by citation.
          </p>
        </div>

        {/* Three deeper compliance scenario cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            {
              scenario: 'Employee on FMLA also requests CA CFRA — stack or sequential?',
              cost: '$30K back leave + DLSE penalty',
              analysis: 'Eligible for both: 14 mo tenure ✓ · 1,400 hrs ✓ · CA CFRA stacks with FMLA per 2 CCR §11091.4(c). Up to 24 weeks combined.',
              citations: ['29 USC §2611 (FMLA eligibility)', 'CA Gov Code §12945.2 (CFRA stacking)', 'DLSE 7-2024 opinion letter'],
              action: 'Approve 24 weeks combined · Route ambiguous overlap to legal',
            },
            {
              scenario: 'Posting a $250K role across CO + NY + WA without salary disclosure.',
              cost: '$10K per violation, per state',
              analysis: 'Three jurisdictions trigger pay transparency. CO requires range in posting. NY requires range + bona fide hiring. WA requires range + benefits summary.',
              citations: ['CO C.R.S. §8-5-201 (Equal Pay for Equal Work)', 'NY S9427A (Pay Transparency Law)', 'WA RCW 49.58.110'],
              action: 'Block post · Add required ranges and benefits per jurisdiction',
            },
            {
              scenario: 'New hire offer at $58K — exempt or non-exempt under CA + federal?',
              cost: '$50K back wages + 30% penalties',
              analysis: 'CA exempt minimum is 2× state minimum wage = $66,560 in 2026. Below threshold even before duties test. Cannot lawfully classify as exempt.',
              citations: ['29 CFR Part 541 (FLSA exempt tests)', 'CA Labor Code §515 (CA exempt threshold)', 'IWC Wage Order 4-2001'],
              action: 'Reclassify as non-exempt · Surface OT eligibility · Adjust offer letter',
            },
          ].map((row) => (
            <div
              key={row.scenario}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* Scenario header */}
              <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.4 }}>
                  {row.scenario}
                </p>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#B91C1C', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
                  EXPOSURE: {row.cost.toUpperCase()}
                </span>
              </div>
              {/* MambaHR analysis */}
              <div style={{ padding: '24px 28px' }}>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 18px' }}>
                  {row.analysis}
                </p>
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                      Citations
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {row.citations.map((c) => (
                        <li key={c} style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 3 }}>
                          · {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                      Action
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                      <span style={{ color: '#15803D', marginRight: 6, fontWeight: 700 }}>✓</span>
                      {row.action}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology footer — honest claims about how the engine works */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, paddingTop: 32, borderTop: '1px solid var(--border)' }} className="mobile-stack">
          {[
            { stat: '50', unit: 'states + federal', desc: 'Every jurisdiction your employees live in' },
            { stat: '100%', unit: 'cited', desc: 'Every compliance call cites its regulation' },
            { stat: '< 48h', unit: 'reg updates', desc: 'New rulings reach the engine within 48 hours' },
          ].map((m) => (
            <div key={m.unit}>
              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 36, fontWeight: 400, color: 'var(--gold-dark)', letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 4px' }}>
                {m.stat}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                {m.unit}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
        <SectionCta headline="Talk to the founders about your state coverage." />
      </div>
    </section>
  )
}
