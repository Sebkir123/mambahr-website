import type { Metadata } from 'next'
import { OG_HOME } from '@/lib/og'

export const metadata: Metadata = {
  title: 'Book a demo | MambaHR',
  description: 'A 30-minute live demo. See MambaHR do real HR tasks with examples from your company, and get your price on the call.',
  openGraph: {
    title: 'Book a demo | MambaHR',
    description: 'A 30-minute live demo. See MambaHR do real HR tasks with examples from your company, and get your price on the call.',
    url: 'https://www.mambahr.com/demo',
    images: [{ url: OG_HOME, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a demo | MambaHR',
    description: 'A 30-minute live demo. See MambaHR do real HR tasks with examples from your company, and get your price on the call.',
    images: [OG_HOME],
  },
  alternates: { canonical: 'https://www.mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
