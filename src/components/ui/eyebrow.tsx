import { ReactNode } from 'react'

type EyebrowProps = {
  children: ReactNode
  className?: string
  light?: boolean
}

export default function Eyebrow({ children, className = '', light }: EyebrowProps) {
  return (
    <p
      className={`eyebrow ${className}`}
      style={{ color: light ? 'rgba(176, 141, 87, 0.9)' : 'var(--gold)', marginBottom: 16 }}
    >
      {children}
    </p>
  )
}
