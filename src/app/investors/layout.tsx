import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investors — MambaHR',
  description:
    'MambaHR is building the AI infrastructure layer for HR. Learn about the opportunity and get in touch.',
  openGraph: {
    title: 'Investors — MambaHR',
    description: 'MambaHR is building the AI infrastructure layer for HR. Learn about the opportunity and get in touch.',
    url: 'https://mambahr.com/investors',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investors — MambaHR',
    description: 'MambaHR is building the AI infrastructure layer for HR.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mambahr.com/investors' },
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
