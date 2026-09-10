import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Layoffs & headcount | MambaHR',
  description:
    'WARN timing checked, severance and final pay computed per state, redeployment options shown as suggestions only, and every exit approved by a person before it happens.',
  openGraph: {
    title: 'Layoffs & headcount | MambaHR',
    description:
      'WARN timing, severance math, redeployment (advisory only), every exit human-approved.',
    url: 'https://mambahr.com/rif',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layoffs & headcount | MambaHR',
    description:
      'WARN timing, severance math, redeployment (advisory only), every exit human-approved.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/rif' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Layoffs & headcount | MambaHR',
  url: 'https://mambahr.com/rif',
  description:
    'MambaHR layoff planning. MambaHR checks federal layoff-notice (WARN Act) timing, runs the severance math, shows internal roles as suggestions only, and holds every exit for a person to approve.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Layoff planning',
    description:
      'Plans a layoff (reduction in force): calculates federal and state notice timing under the WARN Act, models the severance cost range, and shows internal roles as suggestions only. A person approves every individual exit before anything happens.',
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
