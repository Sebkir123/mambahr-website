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
  { stat: '100%', label: 'Decisions cited' },
  { stat: '500+', label: 'Rules, kept current' },
]

export default function ComplianceEngineSection() {
  return (
    <section style={{ background: '#15110D', padding: 'var(--beat-pad) 24px', position: 'relative', overflow: 'hidden' }}>
      {/* warm gold glow, right side, behind the floating card */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-10%', right: '-6%', width: 760, height: 760, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0) 66%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="scenario-split"
        style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1 }}
      >
        {/* LEFT — the claim */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 20, color: 'var(--gold-light)' }}>STAY COMPLIANT</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(36px, 4.4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#FBF7F0',
              margin: '0 0 20px',
              lineHeight: 1.04,
            }}
          >
            Federal law and all 50 states,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>kept current.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(251,247,240,0.64)', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 460 }}>
            A federal baseline everywhere, plus state-specific rules — paid leave, wage, pay transparency — where
            states differ. Every decision comes with the regulation behind it, and anything ambiguous routes to a human.
          </p>

          <div style={{ display: 'flex', gap: 40, marginBottom: 36, flexWrap: 'wrap' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 42, fontWeight: 400, color: 'var(--gold-light)', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 8px' }}>
                  {s.stat}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(251,247,240,0.45)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, fontFamily: 'var(--font-mono), monospace' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link href="/product#compliance" prefetch={false} style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-light)', textDecoration: 'none' }}>
            See how compliance works →
          </Link>
        </div>

        {/* RIGHT — one case, floating bright on the dark band */}
        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18,
            boxShadow: '0 30px 70px rgba(0,0,0,0.45), var(--sheen)',
            padding: '30px 32px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 400, color: 'var(--text)', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.25, maxWidth: 440 }}>
              {EXAMPLE.scenario}
            </p>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-red)', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
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

      <style>{`
        @media (max-width: 900px) {
          .scenario-split { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
