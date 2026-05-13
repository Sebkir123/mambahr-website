import type { ReactNode } from 'react'

export function Bubble({
  author,
  time,
  visible,
  children,
}: {
  author: string
  time: string
  visible: boolean
  children: ReactNode
}) {
  if (!visible) return null
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#E5D8C3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 11, color: '#6B5638' }}>
        {author.split(' ').map((s) => s[0]).join('').slice(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 2 }}>
          <strong style={{ fontSize: 12, color: 'var(--text)' }}>{author}</strong>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 8 }}>{time}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>{children}</p>
      </div>
    </div>
  )
}

export function AgentBlock({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginLeft: 38, padding: '10px 12px', background: 'var(--bg-warm)', borderLeft: '2px solid var(--gold-dark)', borderRadius: '0 6px 6px 0', marginBottom: 10 }}>
      {children}
    </div>
  )
}

export const btnPrimary: React.CSSProperties = {
  background: '#1C1917',
  color: '#FFFFFF',
  border: 'none',
  padding: '6px 14px',
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
}

export const btnSecondary: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--text-muted)',
  border: '1px solid var(--border)',
  padding: '6px 14px',
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
}
