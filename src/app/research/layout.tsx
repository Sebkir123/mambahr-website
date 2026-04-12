import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — MambaHR',
  description:
    'MambaHR Research is a domain AI lab focused on HR decision automation and people operations. Home of HR-Bench.',
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
