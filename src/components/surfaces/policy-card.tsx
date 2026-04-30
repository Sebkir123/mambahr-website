const policies = [
  { label: 'Auto-approve PTO within company policy',     on: true,  detail: 'Up to 10 consecutive days' },
  { label: 'Auto-process new hires under $150k base',     on: true,  detail: 'Above threshold needs approval' },
  { label: 'Auto-handle FMLA + state PFML stacking',      on: true,  detail: 'Edge cases route to legal' },
  { label: 'Auto-file EEO-1 reports',                     on: true,  detail: 'You sign before submission' },
  { label: 'Auto-execute terminations',                   on: false, detail: 'Always requires human approval' },
]

export default function PolicyCard() {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border-faint)' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0 }}>HIL Policy</p>
          <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '2px 0 0' }}>Edited just now</p>
        </div>
        <button
          style={{
            background: 'var(--text)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>

      {/* Policies */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {policies.map((p) => (
          <div key={p.label} style={{ display: 'grid', gridTemplateColumns: '1fr 36px', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>{p.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>{p.detail}</p>
            </div>
            {/* Toggle */}
            <div
              style={{
                width: 36,
                height: 20,
                background: p.on ? 'var(--gold)' : 'var(--border-mid)',
                borderRadius: 999,
                position: 'relative',
                marginTop: 2,
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: '#FFFFFF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: 2,
                  left: p.on ? 18 : 2,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
