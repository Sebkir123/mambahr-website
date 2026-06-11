import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Onboarding Software — MambaHR',
  description:
    'Day-one ready before they arrive: I-9 & E-Verify, accounts provisioned, devices shipped, first-week plan set. Humans stay in the loop for the budget calls.',
  openGraph: {
    title: 'Onboarding Software — MambaHR',
    description:
      'Day-one ready before they arrive: I-9 & E-Verify, accounts, devices, first-week plan. Humans approve the budget calls.',
    url: 'https://mambahr.com/onboarding',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboarding Software — MambaHR',
    description:
      'Day-one ready before they arrive: I-9 & E-Verify, accounts, devices, first-week plan. Humans approve the budget calls.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/onboarding' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Onboarding Software — MambaHR',
  url: 'https://mambahr.com/onboarding',
  description:
    'MambaHR onboarding: new hires are day-one ready before they arrive. The agent runs I-9 and E-Verify, provisions accounts, ships devices, and builds the first-week plan. Humans approve the budget calls.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Onboarding agent',
    description:
      'Gets new hires day-one ready before they walk in: completes I-9 and E-Verify, provisions Okta and app accounts, orders and ships devices, and assembles the first-week plan. Humans stay in the loop on the budget calls; everything else runs without you.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
