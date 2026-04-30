import { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  variant?: 'gold' | 'neutral' | 'green'
}

const styles = {
  gold: {
    background: 'var(--gold-tint)',
    color: 'var(--gold-dark)',
    border: '1px solid rgba(176, 141, 87, 0.2)',
  },
  neutral: {
    background: 'var(--bg-surface)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
  },
  green: {
    background: '#F0FDF4',
    color: '#15803D',
    border: '1px solid #BBF7D0',
  },
}

export default function Pill({ children, variant = 'neutral' }: PillProps) {
  return (
    <span
      style={{
        ...styles[variant],
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  )
}
