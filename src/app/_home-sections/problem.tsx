const STATS: { value: string; label: string }[] = [
  { value: '67%', label: 'of HR teams miss compliance deadlines' },
  { value: '$4,700', label: 'average cost per new hire — most of it admin' },
  { value: '40%', label: 'of HR time spent on admin instead of strategy' },
]

export default function ProblemSection() {
  return (
    <section style={{ background: '#15110D', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* warm gold glow, top-center */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 520,
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.16) 0%, rgba(201,169,110,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* fine grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 0%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div data-animate style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: 'var(--gold-light)' }}>THE PROBLEM</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(34px, 4.6vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#FBF7F0',
              marginBottom: 18,
              lineHeight: 1.05,
            }}
          >
            HR is drowning. We did the math.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(251,247,240,0.62)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            For every 100 employees: 47 leaves, 18 hires, hundreds of comp and policy calls, and a rulebook that
            changes every 90 days. The work never ends. The team can&apos;t scale.
          </p>
        </div>

        <div
          data-animate
          data-animate-delay="100"
          className="mobile-stack"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '20px 36px',
                borderLeft: i > 0 ? '1px solid rgba(251,247,240,0.1)' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(56px, 7vw, 84px)',
                  fontWeight: 400,
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  color: 'var(--gold-light)',
                  lineHeight: 1,
                  marginBottom: 18,
                  letterSpacing: '-0.03em',
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: 16, color: '#FBF7F0', fontWeight: 500, lineHeight: 1.45, marginBottom: 0, maxWidth: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
