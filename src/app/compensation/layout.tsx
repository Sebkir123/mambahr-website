import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Compensation Management — MambaHR',
  description:
    'Every raise priced against your bands. Above-band routes to a human. Pay equity watched continuously, comp letters e-signed and filed.',
  openGraph: {
    title: 'Compensation Management — MambaHR',
    description:
      'Every raise priced against your bands. Above-band routes to a human. Pay equity watched, comp letters e-signed and filed.',
    url: 'https://mambahr.com/compensation',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compensation Management — MambaHR',
    description:
      'Every raise priced against your bands. Above-band routes to a human. Pay equity watched, comp letters e-signed and filed.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/compensation' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Compensation Management — MambaHR',
  url: 'https://mambahr.com/compensation',
  description:
    'MambaHR compensation: every raise priced against your bands, with above-band requests routed to a human. The agent monitors pay equity and generates comp letters that are e-signed and filed.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Compensation agent',
    description:
      'Prices every raise against your comp bands and routes anything above band to a human for approval. Continuously checks pay equity to surface drift, then drafts comp change letters that are e-signed and filed to the employee record.',
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
