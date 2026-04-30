const integrations = [
  'Gusto', 'Workday', 'Rippling', 'BambooHR', 'Namely', 'Deel',
  'Personio', 'HiBob', 'Carta', 'Okta', 'DocuSign', 'Slack',
  'Microsoft Teams', 'Google Workspace', 'Greenhouse', 'Lever',
  'Lattice', 'CultureAmp', 'Checkr', 'Hofy',
]

export default function IntegrationsMarquee() {
  const doubled = [...integrations, ...integrations]

  return (
    <div style={{ overflow: 'hidden', padding: '40px 0' }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 32, width: 'max-content' }}>
        {doubled.map((name, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: 'var(--gold-tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: 'var(--gold)',
                flexShrink: 0,
              }}
            >
              ◆
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
