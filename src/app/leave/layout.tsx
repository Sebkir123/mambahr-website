import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Time Off & Leave Management | MambaHR',
  description:
    'Time off that fits your policy is approved in seconds. Family and medical leave is checked for eligibility, state leave is cited, and military and bereavement leave are covered. Every answer shows the law it used.',
  openGraph: {
    title: 'Time Off & Leave Management | MambaHR',
    description:
      'Time off approved in seconds when it fits your policy. Family leave checked, state leave cited, military and bereavement leave covered.',
    url: 'https://www.mambahr.com/leave',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Off & Leave Management | MambaHR',
    description:
      'Time off approved in seconds when it fits your policy. Family leave checked, state leave cited, military and bereavement leave covered.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/leave' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Time Off & Leave Management | MambaHR',
  url: 'https://www.mambahr.com/leave',
  description:
    'MambaHR time off and leave: every request, from vacation days to federal family and medical leave (FMLA), checked against your policy. State paid-leave programs are cited and sent to a person to decide. Military leave (USERRA) and bereavement leave are covered.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Time off and leave',
    description:
      'Approves time off that fits your policy in seconds. Checks family and medical leave (FMLA) eligibility, cites state paid-leave programs and asks a person how they combine, and covers military leave (USERRA) and bereavement. Keeps balances current.',
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
