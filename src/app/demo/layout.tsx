import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a demo — MambaHR',
  description: 'See MambaHR in action. 30-minute walkthrough with the founders. No slides, no sales team.',
  openGraph: {
    title: 'Book a demo — MambaHR',
    description: 'See MambaHR in action. 30-minute walkthrough with the founders.',
    url: 'https://mambahr.com/demo',
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
