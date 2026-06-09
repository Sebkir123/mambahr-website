// Bold saturated gold band — the modern B2B "stat block" (cf. Gusto teal / Rippling purple),
// in our brand gold. Big serif numbers on a rich gradient. Breaks the page with real color.
const metrics = [
  { value: '30 min', label: 'Your whole HR day — the rest runs itself' },
  { value: '1 day', label: 'To migrate from your current HRIS' },
  { value: '50 + fed', label: 'States covered, every decision cited' },
  { value: '~$300K', label: "A year of HR work, done — that you don't hire for" },
]

export default function MetricBand() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 55%, var(--gold-light) 100%)',
        padding: 'clamp(72px, 9vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* soft light bloom top-left for depth */}
      <div aria-hidden style={{ position: 'absolute', top: '-30%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', margin: '0 0 12px', textAlign: 'center' }}>
          The math
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.05, textAlign: 'center', margin: '0 0 56px' }}>
          A whole HR department&rsquo;s output, <span style={{ fontStyle: 'italic' }}>without the department.</span>
        </h2>
        <div className="metric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {metrics.map((m, i) => (
            <div key={m.label} style={{ padding: '8px 28px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.25)' : 'none', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 400, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 14px' }}>
                {m.value}
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5, margin: 0, maxWidth: 220, marginLeft: 'auto', marginRight: 'auto' }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .metric-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 0 !important; }
          .metric-grid > div:nth-child(odd) { border-left: none !important; }
          .metric-grid > div:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.25); padding-top: 36px; }
          .metric-grid > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.25); padding-top: 36px; }
        }
        @media (max-width: 480px) {
          .metric-grid { grid-template-columns: 1fr !important; }
          .metric-grid > div { border-left: none !important; }
        }
      `}</style>
    </section>
  )
}
