import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Layoff planning | MambaHR',
  description:
    'Layoff notice timing (WARN) checked, severance and final pay worked out by state, open internal roles suggested, and every exit approved by a person first.',
  openGraph: {
    title: 'Layoff planning | MambaHR',
    description:
      'Notice timing, severance, final pay, and internal roles as suggestions. A person approves every exit.',
    url: 'https://www.mambahr.com/rif',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layoff planning | MambaHR',
    description:
      'Notice timing, severance, final pay, and internal roles as suggestions. A person approves every exit.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/rif' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Layoff planning | MambaHR',
  url: 'https://www.mambahr.com/rif',
  description:
    'MambaHR layoff planning: checks federal layoff-notice (WARN Act) timing, works out severance and final pay, shows open internal roles as suggestions only, and holds every exit for a person to approve.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
    featureList: 'Layoff planning',
    description:
      'Plans a layoff (reduction in force): works out federal and state notice timing under the WARN Act, estimates the severance cost range, and shows open internal roles as suggestions only. A person approves every exit before anything happens.',
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
