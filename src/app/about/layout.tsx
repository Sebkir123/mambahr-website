import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description:
    'MambaHR is a domain AI lab building the autonomous HR agent. Meet the team behind the company.',
  openGraph: {
    title: 'About — MambaHR',
    description: 'MambaHR is a domain AI lab building the autonomous HR agent. Meet the team behind the company.',
    url: 'https://mambahr.com/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — MambaHR',
    description: 'MambaHR is a domain AI lab building the autonomous HR agent.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mambahr.com/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
