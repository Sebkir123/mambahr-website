export default function ProofBar() {
  return (
    <section style={{ padding: '32px 24px', backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center" style={{ maxWidth: 900, gap: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-faint)', whiteSpace: 'nowrap', letterSpacing: '0.04em', fontFamily: 'var(--font-mono), monospace', textTransform: 'uppercase' }}>
          Trusted by design partners in
        </p>
        <div className="flex items-center flex-wrap justify-center" style={{ gap: 16 }}>
          {['Healthcare', 'Financial Services', 'Technology', 'Education'].map((name) => (
            <span
              key={name}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-muted)',
                padding: '4px 12px',
                borderRadius: 999,
                backgroundColor: 'rgba(176,141,87,0.06)',
                border: '1px solid rgba(176,141,87,0.1)',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
