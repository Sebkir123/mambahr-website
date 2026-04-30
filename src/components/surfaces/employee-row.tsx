type Status = 'Active' | 'On leave' | 'New hire' | 'On PIP' | 'Pending offer' | 'Maternity leave'

const statusColors: Record<Status, { bg: string; fg: string; dot: string }> = {
  'Active':         { bg: '#F0FDF4', fg: '#15803D', dot: '#22C55E' },
  'On leave':       { bg: '#FEF3C7', fg: '#A16207', dot: '#EAB308' },
  'New hire':       { bg: '#EFF6FF', fg: '#1D4ED8', dot: '#3B82F6' },
  'On PIP':         { bg: '#FEF2F2', fg: '#B91C1C', dot: '#EF4444' },
  'Pending offer':  { bg: 'var(--gold-tint)', fg: 'var(--gold-dark)', dot: 'var(--gold)' },
  'Maternity leave':{ bg: '#FCE7F3', fg: '#9D174D', dot: '#EC4899' },
}

export type Employee = Readonly<{
  name: string
  role: string
  dept?: string
  status: Status
  avatar: string
  tenure?: string
}>


export default function EmployeeRow({ e, dense }: { e: Employee; dense?: boolean }) {
  const s = statusColors[e.status]
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr auto',
        alignItems: 'center',
        gap: 12,
        padding: dense ? '8px 12px' : '10px 14px',
        borderBottom: '1px solid var(--border-faint)',
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-warm)' }}>
        <img src={e.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {e.name}
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {e.role}{e.dept ? ` · ${e.dept}` : ''}
        </p>
      </div>
      <span
        style={{
          background: s.bg,
          color: s.fg,
          fontSize: 10,
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: 999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot }} />
        {e.status}
      </span>
    </div>
  )
}
