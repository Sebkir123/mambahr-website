export default function ProofBar() {
  const partners = ['Meridian Health', 'Atlas Financial', 'Stackworks']

  return (
    <section style={{ padding: '40px 24px', backgroundColor: 'var(--bg-light)' }}>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center" style={{ maxWidth: 800, gap: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dark-faint)', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
          Design partners:
        </p>
        <div className="flex items-center flex-wrap justify-center" style={{ gap: 32 }}>
          {partners.map((name) => (
            <span key={name} style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.01em' }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
