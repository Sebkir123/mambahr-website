import type { ReactNode } from 'react'

export type Scenario = {
  id: string
  label: string
  durationMs: number
  render: (elapsedMs: number) => ReactNode
}
