import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  narrow?: boolean
  wide?: boolean
}

export default function Container({ children, className = '', narrow, wide }: ContainerProps) {
  const maxWidth = narrow ? '720px' : wide ? '1200px' : '1100px'
  return (
    <div
      className={className}
      style={{ maxWidth, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 }}
    >
      {children}
    </div>
  )
}
