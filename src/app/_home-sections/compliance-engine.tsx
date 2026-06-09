import Link from 'next/link'

// One representative case carries the section — the strongest (multi-state leave
// stacking). The rest live in the product; the homepage shows the pattern, not a wall.
const EXAMPLE = {
  scenario: 'Employee on FMLA also requests CA CFRA — stack or run sequential?',
  risk: 'Risk · $30K back leave + penalty',
  answer: 'Approve up to 24 weeks combined.',
  detail:
    'Eligible for both (14-month tenure, 1,400 hours). The CA leave stacks on top of federal FMLA. Anything ambiguous routes to your legal team.',
  receipts: ['FMLA', 'CA CFRA', 'DLSE 7-2024'],
}

const STATS = [
  { stat: '50', label: 'States + federal' },
  { stat: '100%', label: 'Always cited' },
  { stat: '< 48h', label: 'New rulings live' },
]

export default function ComplianceEngineSection() {
  return (
    <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
      <div
        className="scenario-split"
        style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'center' }}
      >
        {/* LEFT — the claim */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 20 }}>STAY COMPLIANT</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(34px, 4.2vw, 54px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Compliant in every state,<br />
            <span style={{ color: 'var(--gold-dark)' }}>automatically.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 32px', maxWidth: 440 }}>
            Federal law and all 50 state codes, kept current. Every decision comes with the regulation behind it —
            and anything ambiguous routes to your legal team.
          </p>

          <div style={{ display: 'flex', gap: 36, marginBottom: 32, flexWrap: 'wrap' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 36, fontWeight: 400, color: 'var(--gold-dark)', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 6px' }}>
                  {s.stat}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, fontFamily: 'var(--font-mono), monospace' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link href="/demo" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none' }}>
            Talk to us about your state coverage →
          </Link>
        </div>

        {/* RIGHT — one case, floating */}
        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            boxShadow: 'var(--shadow-float), var(--sheen)',
            padding: '30px 32px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 400, color: 'var(--text)', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.25, maxWidth: 440 }}>
              {EXAMPLE.scenario}
            </p>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-red)', background: 'var(--bg-warm)', border: '1px solid var(--border)', borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
              {EXAMPLE.risk}
            </span>
          </div>

          <div style={{ background: 'var(--gold-tint)', borderLeft: '3px solid var(--gold-dark)', borderRadius: '0 10px 10px 0', padding: '18px 22px', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: 'var(--font-mono), monospace' }}>
              The agent&rsquo;s answer
            </p>
            <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
              {EXAMPLE.answer}
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
              {EXAMPLE.detail}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
              Backed by
            </span>
            {EXAMPLE.receipts.map((r) => (
              <span key={r} style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-faint)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono), monospace' }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
