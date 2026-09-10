import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a demo | MambaHR',
  description: 'A 30-minute live demo. See the AI HR department run on your scenarios, and get your headcount priced on the call.',
  openGraph: {
    title: 'Book a demo | MambaHR',
    description: 'A 30-minute live demo. See the AI HR department run on your scenarios, and get your headcount priced on the call.',
    url: 'https://mambahr.com/demo',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a demo | MambaHR',
    description: 'A 30-minute live demo. See the AI HR department run on your scenarios, and get your headcount priced on the call.',
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
