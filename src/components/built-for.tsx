export default function BuiltFor() {
  const partners = [
    { icon: '🏥', label: 'Healthcare' },
    { icon: '💰', label: 'Financial Services' },
    { icon: '⚡', label: 'Technology' },
    { icon: '🏗️', label: 'Construction' },
    { icon: '🎓', label: 'Education' },
  ]

  const features = [
    {
      num: '01',
      title: 'HR teams that are stretched thin',
      desc: 'Whether you have 2 people ops people or 200 — the agent handles the repetitive work so your team can focus on people.',
    },
    {
      num: '02',
      title: 'Companies scaling fast',
      desc: 'Hiring fast means onboarding and admin pile up faster than your team can keep up. MambaHR absorbs that load automatically.',
    },
    {
      num: '03',
      title: 'Works with any HRIS',
      desc: 'Gusto, BambooHR, Rippling, Workday, ADP, and more. MambaHR integrates with your existing stack.',
    },
  ]

  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Built with people leaders
          </p>
          <h2
            data-animate
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text-dark)',
              marginBottom: 16,
              maxWidth: 600,
              margin: '0 auto 16px',
            }}
          >
            Built with people leaders, not for them.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            MambaHR is in private beta with design partners across industries.
            From startups to enterprise — the agent scales with your organization.
          </p>
        </div>

        {/* Industry tags */}
        <div
          data-animate
          className="flex flex-wrap justify-center"
          style={{ gap: 12, marginBottom: 56 }}
        >
          {partners.map((p) => (
            <span
              key={p.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 999,
                backgroundColor: 'var(--bg-light-surface)',
                border: '1px solid var(--border-light)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-dark-muted)',
              }}
            >
              <span style={{ fontSize: 14 }}>{p.icon}</span>
              {p.label}
            </span>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20, marginBottom: 56 }}>
          {features.map((item, i) => (
            <div
              key={item.num}
              data-animate
              className="card-hover"
              style={{
                padding: 28,
                borderRadius: 12,
                backgroundColor: 'var(--bg-light-surface)',
                border: '1px solid var(--border-light)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-mono), monospace',
                }}
              >
                {item.num}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dark)', margin: '12px 0 8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stat + CTA */}
        <div
          data-animate
          style={{
            textAlign: 'center',
            padding: '40px 0 0',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            3,200+
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-dark-muted)', marginTop: 8, marginBottom: 20 }}>
            employees managed across beta partners
          </p>
          <a
            href="#request-access"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 999,
              backgroundColor: 'var(--gold)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Request Early Access
          </a>
        </div>
      </div>
    </section>
  )
}
