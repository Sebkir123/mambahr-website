const patents = [
  'Decision confidence quantification for HR automation',
  'Workforce delta intelligence and anomaly detection',
  'HR decision archaeology and audit trail reconstruction',
  'Multi-jurisdictional policy conflict resolution',
  'Autonomous onboarding workflow orchestration',
  'Real-time policy update propagation without catastrophic forgetting',
  'HR agent confidence calibration with human escalation thresholds',
] as const

const frostedGlass = {
  backgroundColor: 'rgba(17,17,19,0.5)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(176,141,87,0.1)',
  borderRadius: 14,
  position: 'relative' as const,
  overflow: 'hidden' as const,
}

const goldShimmer = {
  content: '""',
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  height: 1,
  background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.4), transparent)',
}

export default function Lab() {
  return (
    <section id="research" style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--gold)',
            marginBottom: 16,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          The Lab
        </p>

        <h2
          style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: 12,
          }}
        >
          Not a wrapper. Not a chatbot. A research lab.
        </h2>

        <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 56, maxWidth: 560 }}>
          We publish our research openly. First benchmark dropping Q2 2026.
        </p>

        {/* HR-Bench card */}
        <div style={{ ...frostedGlass, padding: '40px 32px', marginBottom: 32 }}>
          <div style={{ ...goldShimmer, position: 'absolute', top: 0, left: 0, right: 0, height: 1 }} />
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: 10,
            }}
          >
            HR-Bench &middot; Launching Q2 2026
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, maxWidth: 520 }}>
            The first open benchmark for AI on HR decision-making. 500 scenarios across federal and state regulations.
          </p>
          <a
            href="#request-access"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--gold)',
              textDecoration: 'none',
            }}
          >
            Get notified &rarr;
          </a>
        </div>

        {/* Patents */}
        <div style={{ ...frostedGlass, padding: '32px 32px', marginBottom: 40 }}>
          <div style={{ ...goldShimmer, position: 'absolute', top: 0, left: 0, right: 0, height: 1 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            7 Patents Pending
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
            Novel research in HR AI.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {patents.map((title, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-mono), monospace',
                    flexShrink: 0,
                    minWidth: 22,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
          }}
        >
          7 Patents Pending&ensp;&middot;&ensp;Novel HR AI Research&ensp;&middot;&ensp;Domain-Specific Intelligence
        </p>
      </div>
    </section>
  )
}
