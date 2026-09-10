import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Time Off & Leave Management | MambaHR',
  description:
    'PTO to FMLA approved in seconds. State leave cited, USERRA and bereavement handled, every request policy-aware and the statute attached.',
  openGraph: {
    title: 'Time Off & Leave Management | MambaHR',
    description:
      'PTO to FMLA approved in seconds. State leave cited, USERRA and bereavement handled, all policy-aware.',
    url: 'https://mambahr.com/leave',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Off & Leave Management | MambaHR',
    description:
      'PTO to FMLA approved in seconds. State leave cited, USERRA and bereavement handled, all policy-aware.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/leave' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Time Off & Leave Management | MambaHR',
  url: 'https://mambahr.com/leave',
  description:
    'MambaHR leave management: PTO through FMLA approved in seconds. State paid-leave programs are cited and routed to a person; USERRA and bereavement handled, every request resolved policy-aware.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Leave agent',
    description:
      'Approves time off from PTO to FMLA in seconds, applying the right policy every time. Cites state paid-leave programs and routes the stacking decision to a person; handles USERRA and bereavement. Tracks balances and FMLA eligibility.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function LeaveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
