const items = [
  { label: 'Employees', value: '1,247', done: true },
  { label: 'Comp records', value: '1,247', done: true },
  { label: 'Org chart + reporting lines', value: '1,247', done: true },
  { label: 'Leave balances', value: '1,247', done: true },
  { label: 'Performance reviews', value: '8,932', done: true },
  { label: 'Documents (offers, agreements)', value: '14,201', done: false, progress: 0.78 },
  { label: 'Compliance filings', value: '—', done: false, progress: 0.32 },
]

export default function MigrationCard() {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '20px 22px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border-faint)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: '#FF8A4C', color: '#FFFFFF', borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>
            WORKDAY
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 3l3 4-3 4" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 6, padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>
            MAMBAHR
          </span>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22C55E', marginRight: 6 }} />
          Migrating · 6m left
        </span>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '20px 1fr auto', gap: 10, alignItems: 'center' }}>
            {item.done ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#22C55E" />
                <path d="M5 9l3 3 5-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border-mid)', borderTopColor: 'var(--gold)', animation: 'spin 1.2s linear infinite' }} />
            )}
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, margin: 0 }}>{item.label}</p>
              {!item.done && item.progress !== undefined && (
                <div style={{ marginTop: 5, height: 3, background: 'var(--border-faint)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress * 100}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
              )}
            </div>
            <span className="mono" style={{ fontSize: 11, color: item.done ? 'var(--text-muted)' : 'var(--gold-dark)', fontWeight: 600 }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
