export default function TestimonialSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: 32 }}>FROM A DESIGN PARTNER</p>
        <p
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(26px, 3vw, 38px)',
            fontWeight: 400,
            lineHeight: 1.35,
            color: 'var(--text)',
            marginBottom: 36,
            letterSpacing: '-0.02em',
          }}
        >
          &ldquo;Most of what landed on my desk was operational — leave, exempt classifications, multi-state filings, onboarding tasks. By week two, the agent was handling that lane. I started doing the role I was actually hired for.&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            display: 'inline-block',
            width: 24,
            height: 1,
            background: 'var(--gold-dark)',
          }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0 }}>
              Head of People
            </p>
            <p style={{
              fontSize: 12,
              color: 'var(--text-faint)',
              fontFamily: 'var(--font-mono), monospace',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '4px 0 0',
              fontWeight: 600,
            }}>
              MambaHR design partner · in private beta
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
