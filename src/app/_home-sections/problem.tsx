const problemStats = [
  { stat: '67%', label: 'of HR teams miss compliance deadlines',           source: 'SHRM 2025 State of HR' },
  { stat: '$4,700', label: 'avg cost per new hire — most of it admin',     source: 'SHRM Talent Acquisition Benchmark' },
  { stat: '40%', label: 'of HR time spent on admin instead of strategy',   source: 'Gartner HR Productivity Report' },
]

export default function ProblemSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>THE PROBLEM</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            HR is drowning. We did the math.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
            For every 100 employees, an HR department handles 47 leaves, 18 hires, hundreds of comp and policy decisions, and a regulatory landscape that updates every 90 days. The work doesn&apos;t end. The team can&apos;t scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }} className="mobile-stack">
          {problemStats.map((s, i) => (
            <div
              key={i}
              style={{ background: i === 1 ? 'var(--bg-cream)' : 'var(--bg-warm)', padding: '40px 32px', borderRight: i < problemStats.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <p
                style={{
                  fontSize: 64,
                  fontWeight: 400,
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  color: 'var(--gold-dark)',
                  lineHeight: 1,
                  marginBottom: 16,
                  letterSpacing: '-0.03em',
                }}
              >
                {s.stat}
              </p>
              <p style={{ fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45, marginBottom: 12 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
