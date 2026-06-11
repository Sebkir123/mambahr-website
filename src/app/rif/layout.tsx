import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Layoffs & RIF Planning — MambaHR',
  description:
    'The hardest day done right: WARN timing, severance math, redeployment options (advisory only), and every exit human-approved before it happens.',
  openGraph: {
    title: 'Layoffs & RIF Planning — MambaHR',
    description:
      'The hardest day done right: WARN timing, severance math, redeployment (advisory only), every exit human-approved.',
    url: 'https://mambahr.com/rif',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layoffs & RIF Planning — MambaHR',
    description:
      'The hardest day done right: WARN timing, severance math, redeployment (advisory only), every exit human-approved.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/rif' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Layoffs & RIF Planning — MambaHR',
  url: 'https://mambahr.com/rif',
  description:
    'MambaHR RIF planning: the hardest day done right. The agent models WARN timing, runs severance math, surfaces redeployment options as advisory only, and holds every exit for human approval.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'RIF planning agent',
    description:
      'Plans a reduction in force end to end: calculates federal and state WARN notice timing, models severance cost at P10/P50/P90, and surfaces redeployment options as advisory only. Every individual exit is held for human approval before anything is executed.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function RifLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
