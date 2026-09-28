import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Multi-State HR Compliance | MambaHR',
  description:
    'Every answer cites the law. Federal law plus the rules for each state where you employ people, equal-opportunity data collected at apply, and unclear cases sent to a person.',
  openGraph: {
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'Every answer cites the law. Federal law plus the rules for your states, and unclear cases sent to a person.',
    url: 'https://www.mambahr.com/compliance',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-State HR Compliance | MambaHR',
    description:
      'Every answer cites the law. Federal law plus the rules for your states, and unclear cases sent to a person.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/compliance' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Multi-State HR Compliance | MambaHR',
  url: 'https://www.mambahr.com/compliance',
  description:
    'MambaHR compliance: federal law plus the rules for each state where you employ people. Every answer cites the law and its review date, equal-opportunity data is collected at apply, and unclear cases go to a person.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Compliance',
    description:
      'Applies federal law and each state’s rules to every decision. Cites the law behind every answer with its review date, collects voluntary equal-opportunity (EEO) answers at apply, and sends unclear cases to a person for sign-off.',
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
