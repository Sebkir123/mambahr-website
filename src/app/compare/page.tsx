import type { Metadata } from 'next'
import CompareHub from './compare-hub'

export const metadata: Metadata = {
  title: 'Compare MambaHR, vs Rippling, Gusto, BambooHR, Workday',
  description: 'See how MambaHR compares to Rippling, Gusto, BambooHR, Workday, and to hiring, more software, or spreadsheets. MambaHR is the AI HR department that does the work.',
}

export default function ComparePage() {
  return <CompareHub />
}
