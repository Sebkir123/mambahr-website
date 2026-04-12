export default function TheShift() {
  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Why now
        </p>

        <h2
          data-animate
          style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-dark)',
            marginBottom: 48,
            maxWidth: 640,
          }}
        >
          HR is broken. Your team knows it.{' '}
          <span style={{ color: 'var(--text-dark-muted)' }}>Now there&apos;s a fix.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 32 }}>
          {[
            { value: '40%', desc: 'of HR time is spent on repetitive admin — not people' },
            { value: '200hrs', desc: 'per quarter your team loses to tasks an agent handles in seconds' },
            { value: '$4,700', desc: 'average cost-per-hire that drops when onboarding is automated' },
          ].map((stat, i) => (
            <div key={stat.value} data-animate style={{ transitionDelay: `${i * 100}ms` }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {stat.value}
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6 }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
