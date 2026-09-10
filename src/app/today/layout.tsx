import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'To do | MambaHR',
  description:
    'Your To do list. MambaHR did the work overnight; this morning, three decisions. Approve, decline, done.',
  openGraph: {
    title: 'To do | MambaHR',
    description:
      'To do: the calls that need you, and the work MambaHR already did, on one screen.',
    url: 'https://mambahr.com/today',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'To do | MambaHR',
    description:
      'To do: the calls that need you, and the work MambaHR already did, on one screen.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/today' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'To do | MambaHR',
  url: 'https://mambahr.com/today',
  description:
    'The To do screen in MambaHR. MambaHR does the HR work; you sign off on the decisions that matter.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'To do',
    description:
      'The daily decision list: MambaHR does routine work itself, judgment calls come to a person, and high-stakes decisions are always yours. Every card shows the action, the reasoning, the status, the decision buttons, and the full audit trail.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function TodayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
