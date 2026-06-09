import type { CSSProperties, ReactNode } from 'react'

type Bg = 'white' | 'warm' | 'cream' | 'dark'

const bgMap: Record<Bg, string> = {
  white: 'var(--bg)',
  warm: 'var(--bg-warm)',
  cream: 'var(--bg-cream)',
  dark: '#1C1917',
}

/**
 * One vertical beat: full-bleed background + consistent top/bottom rhythm.
 * Use `tight` for connective beats (proof strip), default for major ones.
 */
export function Beat({
  children,
  bg = 'white',
  tight = false,
  id,
  style,
}: {
  children: ReactNode
  bg?: Bg
  tight?: boolean
  id?: string
  style?: CSSProperties
}) {
  return (
    <section
      id={id}
      style={{
        background: bgMap[bg],
        color: bg === 'dark' ? '#FFFFFF' : 'var(--text)',
        paddingTop: tight ? 'var(--beat-pad-tight)' : 'var(--beat-pad)',
        paddingBottom: tight ? 'var(--beat-pad-tight)' : 'var(--beat-pad)',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

/**
 * Centered, max-width content column. `narrow` for prose-width blocks.
 * The `.page` class widens the horizontal gutter to 40px at ≥768px.
 */
export function Page({
  children,
  narrow = false,
  className,
  style,
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={['page', className].filter(Boolean).join(' ')}
      style={{
        maxWidth: narrow ? 720 : 'var(--page-max)',
        margin: '0 auto',
        paddingLeft: 'var(--page-pad)',
        paddingRight: 'var(--page-pad)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
