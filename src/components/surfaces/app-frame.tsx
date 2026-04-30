import { ReactNode } from 'react'

type AppFrameProps = {
  children: ReactNode
  url?: string
  shadow?: boolean
}

export default function AppFrame({ children, url = 'app.mambahr.com', shadow = true }: AppFrameProps) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: shadow ? '0 20px 60px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)' : 'none',
        background: '#FFFFFF',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '4px 12px',
            fontSize: 12,
            color: 'var(--text-muted)',
            textAlign: 'center',
            maxWidth: 280,
            margin: '0 auto',
          }}
        >
          {url}
        </div>
      </div>
      {/* Content */}
      {children}
    </div>
  )
}
