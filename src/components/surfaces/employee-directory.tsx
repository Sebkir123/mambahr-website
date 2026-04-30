'use client'

import { useEffect, useRef, useState } from 'react'
import EmployeeRow, { Employee } from './employee-row'

const employees: Employee[] = [
  { name: 'Anna Wilson',     role: 'Sales Associate',      dept: 'Revenue', status: 'Active',          avatar: '/avatars/anna.jpg' },
  { name: 'Dave Buchanan',   role: 'Marketing Specialist', dept: 'GTM',     status: 'Active',          avatar: '/avatars/dave.jpg' },
  { name: 'Tom Harrison',    role: 'Senior Designer',      dept: 'Product', status: 'On PIP',          avatar: '/avatars/tom.jpg' },
  { name: 'Violet Hayes',    role: 'Product Manager',      dept: 'Product', status: 'Maternity leave', avatar: '/avatars/violet.jpg' },
  { name: 'Maya Chen',       role: 'Senior Engineer',      dept: 'Eng',     status: 'Pending offer',   avatar: '/avatars/maya.jpg' },
  { name: 'Marcus Webb',     role: 'Account Exec',         dept: 'Revenue', status: 'On leave',        avatar: '/avatars/marcus.jpg' },
  { name: 'Priya Shah',      role: 'Data Engineer',        dept: 'Eng',     status: 'New hire',        avatar: '/avatars/priya.jpg' },
]

export default function EmployeeDirectory() {
  const ref = useRef<HTMLDivElement>(null)
  // Index of the row that just got "updated" — animates with status flash
  const [flashIndex, setFlashIndex] = useState<number | null>(null)
  const [pulseDot, setPulseDot] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Wait a moment, then flash a row to imply "this just changed"
          const t1 = setTimeout(() => setFlashIndex(4), 1800)  // Maya Chen: Pending offer (about to become hired)
          const t2 = setTimeout(() => setFlashIndex(null), 1800 + 2400)
          // Real-time dot pulse always running once visible
          setPulseDot(true)
          ;(obs as IntersectionObserver & { _ts?: ReturnType<typeof setTimeout>[] })._ts = [t1, t2]
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      const ts = (obs as IntersectionObserver & { _ts?: ReturnType<typeof setTimeout>[] })._ts
      if (ts) ts.forEach(clearTimeout)
      obs.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22C55E',
              animation: pulseDot ? 'gold-ring-pulse 2.4s ease-out infinite' : 'none',
              boxShadow: '0 0 0 0 rgba(34,197,94,0.5)',
            }}
          />
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>Real-time</span>
        </div>
      </div>

      {/* Rows */}
      <div>
        {employees.map((e, i) => (
          <div
            key={e.name}
            className={flashIndex === i ? 'status-flash' : undefined}
            style={{ transition: 'background 0.4s ease' }}
          >
            <EmployeeRow e={e} dense />
          </div>
        ))}
      </div>
    </div>
  )
}
