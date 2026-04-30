type AgentCardProps = {
  letter: string
  name: string
  role: string
  status: 'active' | 'idle' | 'working'
  activity?: string
  resolved?: number
}

const statusMap = {
  active:  { dot: '#22C55E', label: 'On call'  },
  working: { dot: '#EAB308', label: 'Working'  },
  idle:    { dot: '#A8A29E', label: 'Idle'     },
}

export default function AgentCard({ letter, name, role, status, activity, resolved }: AgentCardProps) {
  const s = statusMap[status]
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="card-hover"
    >
      {/* Top row: avatar + status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'linear-gradient(135deg, var(--gold-tint) 0%, #E8DDC8 100%)',
            border: '1px solid rgba(176,141,87,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 26,
            fontWeight: 400,
            color: 'var(--gold-dark)',
            letterSpacing: '-0.02em',
          }}
        >
          {letter}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
          {s.label}
        </div>
      </div>

      {/* Name + role */}
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{name}</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0', lineHeight: 1.4 }}>{role}</p>
      </div>

      {/* Activity / stat */}
      {(activity || resolved !== undefined) && (
        <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 12 }}>
          {activity && (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.4, fontStyle: 'italic' }}>
              {activity}
            </p>
          )}
          {resolved !== undefined && (
            <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '6px 0 0', fontFamily: 'var(--font-mono), monospace' }}>
              {resolved} resolved today
            </p>
          )}
        </div>
      )}
    </div>
  )
}
