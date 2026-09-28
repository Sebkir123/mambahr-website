import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Onboarding Software | MambaHR',
  description:
    'New hires ready before day one: Form I-9 started, accounts set up, device setup requested, first week planned. Exits handled with nothing forgotten. You approve anything that costs money.',
  openGraph: {
    title: 'Onboarding Software | MambaHR',
    description:
      'New hires ready before day one: Form I-9 started, accounts set up, device requested, first week planned. You approve anything that costs money.',
    url: 'https://www.mambahr.com/onboarding',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboarding Software | MambaHR',
    description:
      'New hires ready before day one: Form I-9 started, accounts set up, device requested, first week planned. You approve anything that costs money.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/onboarding' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Onboarding Software | MambaHR',
  url: 'https://www.mambahr.com/onboarding',
  description:
    'MambaHR onboarding: new hires are ready before day one. MambaHR starts the Form I-9 and E-Verify check, sets up accounts, requests device setup from IT, and plans the first week. You approve anything that costs money.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Onboarding and offboarding',
    description:
      'Gets new hires ready before they walk in: starts the Form I-9 and E-Verify check, sets up accounts, requests device setup from IT, and plans the first week. At exit, works out final pay by state rules, tracks COBRA deadlines, and switches off logins after your sign-off. You approve anything that costs money.',
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
