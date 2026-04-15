import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — MambaHR',
  description:
    'MambaHR Research is a domain AI lab focused on HR decision automation and people operations. Home of HR-Bench.',
  openGraph: {
    title: 'Research — MambaHR',
    description: 'MambaHR Research is a domain AI lab focused on HR decision automation and people operations. Home of HR-Bench.',
    url: 'https://mambahr.com/research',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research — MambaHR',
    description: 'MambaHR Research — HR decision automation and people operations.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://mambahr.com/research' },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
