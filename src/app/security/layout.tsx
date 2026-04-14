import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security — MambaHR',
  description:
    'MambaHR is built for the most sensitive HR data. SOC 2 in progress, zero data retention on AI models, end-to-end encryption.',
  openGraph: {
    title: 'Security — MambaHR',
    description: 'Enterprise-grade security for HR operations. SOC 2, encryption, zero data retention.',
    url: 'https://mambahr.com/security',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security — MambaHR',
    description: 'Enterprise-grade security for HR operations.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mambahr.com/security' },
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children
}
