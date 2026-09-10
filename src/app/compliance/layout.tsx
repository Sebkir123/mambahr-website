import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Multi-State HR Compliance | MambaHR',
  description:
    'Every answer cites the law. Federal baseline plus state rules for the states where you employ people, EEO data collected at apply, and edge cases routed to a human.',
  openGraph: {
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'Every answer cites the law. Federal baseline plus state rules where you employ people, EEO data collected at apply, edge cases to a human.',
    url: 'https://mambahr.com/compliance',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'Every answer cites the law. Federal baseline plus state rules where you employ people, EEO data collected at apply, edge cases to a human.',
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
    'MambaHR compliance: the federal baseline plus state rules for the states where you employ people. Every answer cites the law and its review date, EEO data is collected at apply, and edge cases route to a human.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Compliance agent',
    description:
      'Applies the federal baseline plus each state rule to every decision. Cites the governing statute or regulation on every answer with its review date, collects EEO self-identification at apply, and routes genuine edge cases to a human for sign-off.',
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
