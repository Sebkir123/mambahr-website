import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Multi-State HR Compliance | MambaHR',
  description:
    'All 50 states kept current. Every answer cites the law. Federal baseline plus state overlays, EEO-1, and edge cases routed to a human.',
  openGraph: {
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'All 50 states kept current. Every answer cites the law. Federal baseline plus state overlays, EEO-1, edge cases to a human.',
    url: 'https://mambahr.com/compliance',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'All 50 states kept current. Every answer cites the law. Federal baseline plus state overlays, EEO-1, edge cases to a human.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/compliance' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Multi-State HR Compliance | MambaHR',
  url: 'https://mambahr.com/compliance',
  description:
    'MambaHR compliance: all 50 states kept current with the federal baseline plus state overlays. Every answer cites the law, EEO-1 is handled, and edge cases route to a human.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Compliance agent',
    description:
      'Keeps all 50 states current and applies the federal baseline plus each state overlay to every decision. Cites the governing statute or regulation on every answer, prepares EEO-1 reporting, and routes genuine edge cases to a human for sign-off.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
