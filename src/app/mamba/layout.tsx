import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'The AI HR Agent | MambaHR',
  description:
    'Not a chatbot, a coworker. Message MambaHR in Slack or the app. It does the HR work and brings the big calls to you first.',
  openGraph: {
    title: 'The AI HR Agent | MambaHR',
    description:
      'Not a chatbot, a coworker. Message it in Slack or the app. It does the work.',
    url: 'https://mambahr.com/mamba',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI HR Agent | MambaHR',
    description:
      'Not a chatbot, a coworker. Message it in Slack or the app. It does the work.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/mamba' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'The AI HR Agent | MambaHR',
  url: 'https://mambahr.com/mamba',
  description:
    'MambaHR is the AI HR department, a coworker, not a chatbot. Message it in Slack or the app. It does the HR work and brings the big calls to you first.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'MambaHR agent',
    description:
      'A coworker that does the HR work, not a chatbot you query. MambaHR takes requests from Slack and the MambaHR app and does the work: drafting, logins, compliance. High-stakes decisions come to you for approval first.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function MambaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
