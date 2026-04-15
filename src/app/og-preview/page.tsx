/**
 * OG image preview page — 1200×630 for social sharing.
 * Screenshot this at exactly 1200×630 viewport and save as og-image.png.
 *
 * Tools like Arc/Chrome → Cmd+Shift+P → "Capture full size screenshot"
 * Or: resize window to 1200px wide, take screenshot of the card area.
 */

export default function OGPreview() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: '#09090B',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        boxSizing: 'border-box',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(176,141,87,0.25) 0%, transparent 60%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(176,141,87,0.12) 0%, transparent 60%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative particles */}
      {[
        { top: 120, left: 200, size: 4, opacity: 0.6 },
        { top: 80, left: 450, size: 3, opacity: 0.4 },
        { top: 200, left: 850, size: 5, opacity: 0.5 },
        { top: 350, left: 1000, size: 3, opacity: 0.3 },
        { top: 480, left: 150, size: 4, opacity: 0.4 },
        { top: 520, left: 700, size: 3, opacity: 0.35 },
        { top: 90, left: 950, size: 2, opacity: 0.5 },
        { top: 420, left: 400, size: 2, opacity: 0.3 },
        { top: 250, left: 600, size: 3, opacity: 0.25 },
        { top: 170, left: 1080, size: 3, opacity: 0.4 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: '#B08D57',
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Top row — logo */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 44, fontWeight: 400, color: '#FAFAF9', letterSpacing: '-0.01em' }}>
          MambaHR
        </div>
      </div>

      {/* Middle — headline */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#FAFAF9',
            margin: 0,
            marginBottom: 24,
          }}
        >
          The HR agent<br />
          that never{' '}
          <span style={{ color: '#B08D57' }}>calls in sick.</span>
        </h1>
        <p
          style={{
            fontSize: 24,
            lineHeight: 1.5,
            color: '#A1A1AA',
            margin: 0,
            maxWidth: 820,
            fontWeight: 400,
          }}
        >
          The autonomous AI agent for people operations. Leave, onboarding, change management — handled in seconds.
        </p>
      </div>

      {/* Bottom row — domain */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#71717A',
            fontFamily: 'var(--font-mono), monospace',
            letterSpacing: '0.02em',
          }}
        >
          mambahr.com
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {['Leave', 'Onboarding', 'Offboarding', 'Change Mgmt'].map((item, i, arr) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#A1A1AA' }}>{item}</span>
              {i < arr.length - 1 && (
                <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#B08D57', opacity: 0.5 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
