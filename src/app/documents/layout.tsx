import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'HR Documents & E-Signature | MambaHR',
  description:
    'Offers, agreements, and acknowledgments generated, e-signed, filed, and retained per policy, with a full audit trail on every document.',
  openGraph: {
    title: 'HR Documents & E-Signature | MambaHR',
    description:
      'Offers, agreements, acknowledgments generated, e-signed, filed, and retained per policy. Full audit trail.',
    url: 'https://mambahr.com/documents',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HR Documents & E-Signature | MambaHR',
    description:
      'Offers, agreements, acknowledgments generated, e-signed, filed, and retained per policy. Full audit trail.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/documents' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HR Documents & E-Signature | MambaHR',
  url: 'https://mambahr.com/documents',
  description:
    'MambaHR documents: offers, agreements, and acknowledgments generated, e-signed, filed, and retained per policy, with a full audit trail on every document.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Documents agent',
    description:
      'Generates HR documents, offers, agreements, policy acknowledgments, and routes them for e-signature. Files every signed document to the employee record and enforces retention by policy, keeping a full audit trail of who signed what and when.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
