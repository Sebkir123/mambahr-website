export default function SocialProofSection() {
  return (
    <section style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0 }}>
          Trusted by HR teams at <strong style={{ color: 'var(--text)' }}>fast-growing</strong> companies.
        </p>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap', opacity: 0.55 }}>
          {['Series B SaaS', 'Y Combinator', 'Series A Fintech', 'Sequoia-backed', 'Health-tech', 'AI lab'].map((label) => (
            <span key={label} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
