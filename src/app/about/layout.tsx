import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description:
    'MambaHR is a domain AI lab building the autonomous HR agent. Meet the team behind the company.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
