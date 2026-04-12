export default function ProductPreview() {
  return (
    <section style={{ padding: '64px 24px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <p
          data-animate
          style={{
            fontSize: 15,
            color: 'var(--text-muted)',
            marginBottom: 24,
          }}
        >
          This is what your Monday morning looks like with MambaHR.
        </p>

        {/* Compact dashboard preview */}
        <div
          data-animate
          style={{
            backgroundColor: '#14110D',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'left',
          }}
        >
          {/* Mini topbar */}
          <div
            className="flex items-center"
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              MambaHR
            </span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: 'var(--green)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
              Agent active
            </span>
          </div>

          {/* Compact stat row */}
          <div
            className="flex items-center justify-between"
            style={{ padding: '16px 20px' }}
          >
            {[
              { n: '31', label: 'Handled', color: 'var(--green)' },
              { n: '2', label: 'Pending', color: '#D97706' },
              { n: '0', label: 'Escalated', color: 'var(--green)' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center', flex: 1 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
