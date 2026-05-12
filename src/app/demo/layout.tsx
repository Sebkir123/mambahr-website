import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a demo — MambaHR',
  description: 'See MambaHR in action. 30-minute walkthrough with the founders. No slides, no sales team.',
  openGraph: {
    title: 'Book a demo — MambaHR',
    description: 'See MambaHR in action. 30-minute walkthrough with the founders.',
    url: 'https://mambahr.com/demo',
    images: [{ url: '/api/og?line1=See+it+work&line2=in+30&highlight=minutes.&subtitle=No+slides.+No+sales+gauntlet.+The+founders+walk+you+through+the+product+live.&bottomRight=Book+a+demo', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a demo — MambaHR',
    description: 'See MambaHR in action. 30-minute walkthrough with the founders.',
    images: ['/api/og?line1=See+it+work&line2=in+30&highlight=minutes.&subtitle=No+slides.+No+sales+gauntlet.+The+founders+walk+you+through+the+product+live.&bottomRight=Book+a+demo'],
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
