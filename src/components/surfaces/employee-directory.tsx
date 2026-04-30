import EmployeeRow, { Employee } from './employee-row'

const employees: Employee[] = [
  { name: 'Anna Wilson',     role: 'Sales Associate',      dept: 'Revenue', status: 'Active',          avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Dave Buchanan',   role: 'Marketing Specialist', dept: 'GTM',     status: 'Active',          avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Tom Harrison',    role: 'Senior Designer',      dept: 'Product', status: 'On PIP',          avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Violet Hayes',    role: 'Product Manager',      dept: 'Product', status: 'Maternity leave', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Maya Chen',       role: 'Senior Engineer',      dept: 'Eng',     status: 'Pending offer',   avatar: 'https://randomuser.me/api/portraits/women/79.jpg' },
  { name: 'Marcus Webb',     role: 'Account Exec',         dept: 'Revenue', status: 'On leave',        avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { name: 'Priya Shah',      role: 'Data Engineer',        dept: 'Eng',     status: 'New hire',        avatar: 'https://randomuser.me/api/portraits/women/29.jpg' },
]

export default function EmployeeDirectory() {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5" cy="5" r="2.5" stroke="var(--text-muted)" strokeWidth="1.4" />
            <circle cx="9.5" cy="6" r="2" stroke="var(--text-muted)" strokeWidth="1.4" />
            <path d="M2 12c0-2 1.5-3 3-3s3 1 3 3M7.5 12c.5-1.5 1.5-2 3-2s2.5 1 2.5 2" stroke="var(--text-muted)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', margin: 0 }}>People · 1,247 employees</p>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>Real-time</span>
      </div>

      {/* Rows */}
      <div>
        {employees.map((e) => <EmployeeRow key={e.name} e={e} dense />)}
      </div>
    </div>
  )
}
