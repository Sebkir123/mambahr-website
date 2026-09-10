import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Employee records | MambaHR',
  description:
    'People ops without the ops. Directory, comp, leave, one agent, every record, every change.',
  openGraph: {
    title: 'Employee records | MambaHR',
    description:
      'Directory, comp, leave, one agent across every record and every change.',
    url: 'https://mambahr.com/people',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee records | MambaHR',
    description:
      'Directory, comp, leave, one agent across every record and every change.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/people' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Employee records | MambaHR',
  url: 'https://mambahr.com/people',
  description:
    'MambaHR employee records: the directory, every record, pay, leave, and offboarding, kept current by the system that does the work.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'People agent',
    description:
      'A single agent that owns the employee record across directory, comp, leave, and offboarding. Migrates from Gusto, Workday, Rippling, BambooHR, Namely, or ADP; every change carries a citation and an audit trail.',
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
