import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request access — MambaHR',
  description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
  openGraph: {
    title: 'Request access — MambaHR',
    description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
    url: 'https://mambahr.com/demo',
    images: [{ url: '/mambahr_og_sharing.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request access — MambaHR',
    description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
    images: ['/mambahr_og_sharing.png'],
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
