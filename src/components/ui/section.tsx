import { ReactNode, CSSProperties } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
  bg?: 'white' | 'warm' | 'cream' | 'dark'
  style?: CSSProperties
  id?: string
}

const bgMap: Record<string, string> = {
  white: '#FFFFFF',
  warm: '#FAF7F2',
  cream: '#F0EBE1',
  dark: '#1C1917',
}

export default function Section({ children, className = '', bg = 'white', style, id }: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        backgroundColor: bgMap[bg],
        paddingTop: 120,
        paddingBottom: 120,
        ...style,
      }}
    >
      {children}
    </section>
  )
}
