import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Pricing — MambaHR | Your first AI HR department',
  description:
    'Simple per-employee pricing for hiring, onboarding, time off, performance, compliance, and payroll-ready exports. Your whole HR department from $10k a year.',
}

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children
}
