import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'How MambaHR works | MambaHR',
  description:
    'Message MambaHR in Slack or the app. It handles the HR admin, cites your policy and the law, and brings the big decisions to you first.',
  openGraph: {
    title: 'How MambaHR works | MambaHR',
    description:
      'Message MambaHR in Slack or the app. It handles the admin and brings the big decisions to you.',
    url: 'https://www.mambahr.com/mamba',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How MambaHR works | MambaHR',
    description:
      'Message MambaHR in Slack or the app. It handles the admin and brings the big decisions to you.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/mamba' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How MambaHR works | MambaHR',
  url: 'https://www.mambahr.com/mamba',
  description:
    'How MambaHR works: your team messages it in Slack or the app. It handles the HR admin and brings the big decisions to you first.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
    featureList: 'MambaHR in Slack and the app',
    description:
      'Takes requests from Slack and the MambaHR app and handles the HR admin: drafting documents, setting up logins, and checking your policy and the law. High-stakes decisions come to you for approval first.',
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
