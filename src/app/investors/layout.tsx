import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investors — MambaHR',
  description:
    'MambaHR is building the AI infrastructure layer for HR. Learn about the opportunity and get in touch.',
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
