import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Time Off & Leave Management — MambaHR',
  description:
    'PTO to FMLA approved in seconds. Multi-state PFML stacking, ADA, USERRA, and bereavement — every request handled policy-aware and to the letter.',
  openGraph: {
    title: 'Time Off & Leave Management — MambaHR',
    description:
      'PTO to FMLA approved in seconds. Multi-state PFML stacking, ADA, USERRA, and bereavement — all policy-aware.',
    url: 'https://mambahr.com/leave',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Off & Leave Management — MambaHR',
    description:
      'PTO to FMLA approved in seconds. Multi-state PFML stacking, ADA, USERRA, and bereavement — all policy-aware.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/leave' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Time Off & Leave Management — MambaHR',
  url: 'https://mambahr.com/leave',
  description:
    'MambaHR leave management: PTO through FMLA approved in seconds. The agent handles multi-state PFML stacking, ADA accommodations, USERRA, and bereavement — every request resolved policy-aware.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Leave agent',
    description:
      'Approves time off from PTO to FMLA in seconds, applying the right policy every time: multi-state PFML stacking, ADA accommodation interactive process, USERRA, and bereavement. Tracks balances, eligibility, and statutory clocks across every state you operate in.',
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
