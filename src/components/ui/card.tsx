import { ReactNode, CSSProperties } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
  gold?: boolean
  style?: CSSProperties
}

export default function Card({ children, className = '', hover, gold, style }: CardProps) {
  return (
    <div
      className={`${hover ? 'card-hover' : ''} ${className}`}
      style={{
        background: '#FFFFFF',
        border: gold ? '1px solid rgba(176, 141, 87, 0.3)' : '1px solid var(--border)',
        borderRadius: 16,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
