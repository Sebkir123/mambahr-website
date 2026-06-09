import dynamic from 'next/dynamic'

const LazyPlayer = dynamic(() => import('@/components/scenarios/scenarios-section'), {
  loading: () => (
    <div style={{ minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
        Loading scenarios…
      </span>
    </div>
  ),
})

export default function ScenariosSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>EVERYTHING HR, HANDLED</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            Everything an HR team does.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Recruiting, onboarding, performance, compliance — and the long tail nobody has time for.
          </p>
        </div>

        <LazyPlayer />
      </div>
    </section>
  )
}
