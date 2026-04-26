import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — MambaHR',
  robots: { index: false, follow: false },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
