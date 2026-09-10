import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Payroll changes | MambaHR',
  description:
    'MambaHR prepares every payroll change: new hires, terms, comp changes, leave. A change file for your current provider, or Deel-managed payroll where a person approves every run.',
  openGraph: {
    title: 'Payroll changes | MambaHR',
    description:
      'Every payroll change prepared. A change file for your provider, or Deel-managed payroll with a person approving every run.',
    url: 'https://mambahr.com/payroll',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payroll changes | MambaHR',
    description:
      'Every payroll change prepared. A change file for your provider, or Deel-managed payroll with a person approving every run.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/payroll' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Payroll changes | MambaHR',
  url: 'https://mambahr.com/payroll',
  description:
    'MambaHR payroll changes: prepares every payroll change, new hires, terminations, comp changes, and leave, as a change file in your provider’s format or as a Deel-managed payroll run that a person approves.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Payroll file agent',
    description:
      'Prepares every payroll change each cycle, new hires, terminations, comp changes, and leave. Delivers a change file in your provider’s format, or sends the changes to Deel for a managed run. A person approves every run.',
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
