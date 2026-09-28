import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Employee records | MambaHR',
  description:
    'Your employee records in one place, kept current as the work happens: directory, pay, leave, and exits. Every change logged.',
  openGraph: {
    title: 'Employee records | MambaHR',
    description:
      'Directory, pay, leave, and exits in one set of employee records, kept current and logged.',
    url: 'https://www.mambahr.com/people',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee records | MambaHR',
    description:
      'Directory, pay, leave, and exits in one set of employee records, kept current and logged.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/people' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Employee records | MambaHR',
  url: 'https://www.mambahr.com/people',
  description:
    'MambaHR employee records: the directory, pay, leave, and exits, kept current as MambaHR does the work.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Employee records',
    description:
      'Keeps every employee record current across the directory, pay, leave, and exits. Imports from Gusto, Workday, Rippling, BambooHR, Namely, or ADP. Every change is logged with who made it and why.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
