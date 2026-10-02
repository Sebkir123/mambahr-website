import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Compensation Management | MambaHR',
  description:
    'Every raise checked against your pay ranges and for pay equity before it happens. Raises above the range come to you, and approved changes are filed.',
  openGraph: {
    title: 'Compensation Management | MambaHR',
    description:
      'Every raise checked against your pay ranges and for pay equity. Anything above the range comes to you.',
    url: 'https://www.mambahr.com/compensation',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compensation Management | MambaHR',
    description:
      'Every raise checked against your pay ranges and for pay equity. Anything above the range comes to you.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/compensation' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Compensation Management | MambaHR',
  url: 'https://www.mambahr.com/compensation',
  description:
    'MambaHR compensation: every raise checked against your pay ranges, and anything above the range sent to a person to approve. Every change is checked for pay equity, and the approved change is filed to the employee record.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
    featureList: 'Compensation',
    description:
      'Checks every raise against your pay ranges and sends anything above the range to a person for approval. Checks every change for pay equity, then files the approved, dated change to the employee record.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function CompensationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
