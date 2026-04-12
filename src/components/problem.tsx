export default function TheShift() {
  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Why now
        </p>

        <h2

          style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-dark)',
            marginBottom: 16,
            maxWidth: 560,
          }}
        >
          HR is broken. Your team knows it.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', marginBottom: 48, maxWidth: 480 }}>
          Every HR tool on the market organizes busywork into prettier dashboards. None of them actually do the work. That changes now.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 0 }}>
          {[
            { value: '40%', desc: 'of HR time is spent on repetitive admin — not people work' },
            { value: '200hrs', desc: 'per quarter your team loses to tasks an agent handles in seconds' },
            { value: '$4,700', desc: 'average cost-per-hire that drops when onboarding is automated' },
          ].map((stat, i) => (
            <div
              key={stat.value}
              className={i > 0 ? 'md:border-l md:border-[var(--border-light)]' : ''}
              style={{
                padding: '16px 32px',
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1 }}>
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
