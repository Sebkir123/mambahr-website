type RiskLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
type Decision = 'auto' | 'hil'

type TodayCardProps = {
  title: string
  subtitle: string
  rationale: string
  riskLevel: RiskLevel
  cuq: number
  decision: Decision
  time: string
  agent: string
  urgent?: boolean
}

const riskColors: Record<RiskLevel, { bg: string; text: string }> = {
  L1: { bg: '#F0FDF4', text: '#15803D' },
  L2: { bg: '#F0FDF4', text: '#15803D' },
  L3: { bg: '#FFF7ED', text: '#C2410C' },
  L4: { bg: '#FFF7ED', text: '#C2410C' },
  L5: { bg: '#FEF2F2', text: '#B91C1C' },
}

export default function TodayCard({ title, subtitle, rationale, riskLevel, cuq, decision, time, agent, urgent }: TodayCardProps) {
  const risk = riskColors[riskLevel]

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: urgent ? '1.5px solid rgba(176,141,87,0.5)' : '1px solid var(--border)',
        borderRadius: 12,
        padding: '16px 20px',
        boxShadow: urgent ? '0 0 0 4px rgba(176,141,87,0.07)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2, lineHeight: 1.4 }}>{title}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
        {urgent && (
          <span
            style={{
              background: 'var(--gold-tint)',
              color: 'var(--gold-dark)',
              border: '1px solid rgba(176,141,87,0.2)',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            URGENT
          </span>
        )}
      </div>

      {/* Rationale */}
      <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 12 }}>{rationale}</p>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <span
          style={{
            background: risk.bg,
            color: risk.text,
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          {riskLevel}
        </span>
        <span
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-muted)',
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          CUQ {cuq.toFixed(2)}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>{time}</span>
      </div>

      {/* Actions */}
      {decision === 'hil' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: '7px 0',
              borderRadius: 7,
              border: 'none',
              background: '#1C1917',
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Approve
          </button>
          <button
            style={{
              flex: 1,
              padding: '7px 0',
              borderRadius: 7,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
        </div>
      )}
      {decision === 'auto' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: '#15803D', fontWeight: 500 }}>Auto-resolved by {agent}</span>
        </div>
      )}
    </div>
  )
}
