import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Payroll & Benefits | MambaHR',
  description:
    'Payroll-ready change files for ADP, Workday, Gusto, or Rippling, new hires, terms, comp changes, leave, plus 401(k) via Guideline and life-event benefits.',
  openGraph: {
    title: 'Payroll & Benefits | MambaHR',
    description:
      'Payroll-ready change files for ADP, Workday, Gusto, or Rippling, plus 401(k) via Guideline and life-event benefits.',
    url: 'https://mambahr.com/payroll',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payroll & Benefits | MambaHR',
    description:
      'Payroll-ready change files for ADP, Workday, Gusto, or Rippling, plus 401(k) via Guideline and life-event benefits.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/payroll' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Payroll & Benefits | MambaHR',
  url: 'https://mambahr.com/payroll',
  description:
    'MambaHR payroll and benefits: generates payroll-ready change files for your provider, ADP, Workday, Gusto, or Rippling, covering new hires, terminations, comp changes, and leave, plus 401(k) via Guideline and life-event benefits administration.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Payroll file agent',
    description:
      'Generates payroll-ready change files for your provider, ADP, Workday, Gusto, or Rippling, capturing new hires, terminations, comp changes, and leave each cycle. Administers 401(k) through Guideline and handles life-event benefit changes. You upload the file to your provider.',
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
