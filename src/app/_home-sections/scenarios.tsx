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
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>WATCH THE AGENT WORK</p>
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
            Pick a moment. See it handled in seconds.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Real workflows the agent runs every day. Click a tab.
          </p>
        </div>

        <LazyPlayer />
      </div>
    </section>
  )
}
