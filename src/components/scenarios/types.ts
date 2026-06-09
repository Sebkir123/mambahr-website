import type { ReactNode } from 'react'

export type Scenario = {
  id: string
  label: string
  durationMs: number
  render: (elapsedMs: number) => ReactNode
  // Benefit copy shown above the mockup (shapes.co-style outcome line).
  headline?: string
  blurb?: string
}
