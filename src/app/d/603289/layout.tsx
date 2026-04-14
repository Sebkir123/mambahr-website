import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MambaHR — Confidential',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: undefined,
  twitter: undefined,
}

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
