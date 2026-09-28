import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Payroll changes | MambaHR',
  description:
    'MambaHR prepares every payroll change: new hires, exits, pay changes, and leave. It builds a change file for your current provider, or sends the changes to Deel-managed payroll. A person approves every pay run.',
  openGraph: {
    title: 'Payroll changes | MambaHR',
    description:
      'Every payroll change prepared: a change file for your provider, or changes sent to Deel-managed payroll. A person approves every pay run.',
    url: 'https://www.mambahr.com/payroll',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payroll changes | MambaHR',
    description:
      'Every payroll change prepared: a change file for your provider, or changes sent to Deel-managed payroll. A person approves every pay run.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/payroll' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Payroll changes | MambaHR',
  url: 'https://www.mambahr.com/payroll',
  description:
    'MambaHR payroll changes: prepares every payroll change (new hires, exits, pay changes, and leave) as a change file in your provider’s format, or sends the changes to Deel-managed payroll. A person approves every pay run.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Payroll changes',
    description:
      'Prepares every payroll change each pay cycle: new hires, exits, pay changes, and leave. Builds a change file in your provider’s format, or sends the changes to Deel-managed payroll (Powered by Deel). A person approves every pay run.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function PayrollLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
