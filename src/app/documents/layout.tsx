import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'HR Documents & E-Signature | MambaHR',
  description:
    'Offers, agreements, and acknowledgments drafted, e-signed, filed, and kept according to your retention policy, with a record of every signature.',
  openGraph: {
    title: 'HR Documents & E-Signature | MambaHR',
    description:
      'Offers, agreements, and acknowledgments drafted, e-signed, and filed, with a record of every signature.',
    url: 'https://www.mambahr.com/documents',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HR Documents & E-Signature | MambaHR',
    description:
      'Offers, agreements, and acknowledgments drafted, e-signed, and filed, with a record of every signature.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/documents' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HR Documents & E-Signature | MambaHR',
  url: 'https://www.mambahr.com/documents',
  description:
    'MambaHR documents: offers, agreements, and acknowledgments drafted, e-signed, filed, and kept according to your retention policy, with a record of every signature.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Documents and e-signature',
    description:
      'Drafts HR documents (offers, agreements, and policy acknowledgments) and sends them for e-signature. Files every signed document to the employee record, keeps it according to your retention policy, and records who signed what and when.',
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
