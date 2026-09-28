import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Careers page | MambaHR',
  description:
    'A careers page with your brand, on your own web address. Candidates apply in two minutes, every application is tracked in one pipeline, and equal-opportunity answers are stored separately.',
  openGraph: {
    title: 'Careers page | MambaHR',
    description:
      'A careers page with your brand, on your own web address. Every application tracked in one pipeline for your team to review.',
    url: 'https://www.mambahr.com/job-portal',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers page | MambaHR',
    description:
      'A careers page with your brand, on your own web address. Every application tracked in one pipeline for your team to review.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/job-portal' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Careers page | MambaHR',
  url: 'https://www.mambahr.com/job-portal',
  description:
    'MambaHR careers page: hosted on your own web address, with a two-minute apply form. Every application lands in one pipeline for your hiring team to review, with the equal-opportunity questions asked for you.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Careers page',
    description:
      'Hosts your branded careers page on your own web address, posts your open roles, and tracks every application in one pipeline for your hiring team to review. Voluntary equal-opportunity (EEO) answers are collected at apply and stored separately.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function JobPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
