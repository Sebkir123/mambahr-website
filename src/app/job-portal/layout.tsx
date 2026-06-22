import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Job Portal & Careers Page | MambaHR',
  description:
    'A branded careers page on your domain, hosted job board, and applicant tracking. Applications land in your pipeline already read, ranked, with EEO data collected.',
  openGraph: {
    title: 'Job Portal & Careers Page | MambaHR',
    description:
      'Branded careers page on your domain. Applications land read, ranked, and EEO-tracked in your pipeline.',
    url: 'https://mambahr.com/job-portal',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Portal & Careers Page | MambaHR',
    description:
      'Branded careers page on your domain. Applications land read, ranked, and EEO-tracked in your pipeline.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/job-portal' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Job Portal & Careers Page | MambaHR',
  url: 'https://mambahr.com/job-portal',
  description:
    'MambaHR job portal: a branded careers page hosted on your domain, a hosted job board, and applicant tracking. Applications arrive pre-read, ranked, and with EEO data collected.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Careers page agent',
    description:
      'Hosts your branded careers page on your own domain, publishes a hosted job board, and runs applicant tracking. Every application lands in your pipeline already read and ranked against the role, with voluntary EEO data collected and segregated for compliance.',
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
