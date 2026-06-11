import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'The AI HR Agent — MambaHR',
  description:
    'Not a chatbot, a coworker. Mamba works in Slack, Microsoft Teams, and the MambaHR app, does the HR work end to end, and brings the big calls to you first.',
  openGraph: {
    title: 'The AI HR Agent — MambaHR',
    description:
      'Not a chatbot, a coworker. Works in Slack, Microsoft Teams, and the MambaHR app. The big calls come to you first.',
    url: 'https://mambahr.com/mamba',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI HR Agent — MambaHR',
    description:
      'Not a chatbot, a coworker. Works in Slack, Microsoft Teams, and the MambaHR app. The big calls come to you first.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/mamba' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'The AI HR Agent — MambaHR',
  url: 'https://mambahr.com/mamba',
  description:
    'Mamba is the AI HR agent — a coworker, not a chatbot. It works in Slack, Microsoft Teams, and the MambaHR app, runs HR work end to end, and brings the big calls to you first.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Mamba HR agent',
    description:
      'A coworker that does the HR work, not a chatbot you query. Mamba takes intent from Slack, Microsoft Teams, and the MambaHR app, runs the workflow end to end — drafting, provisioning, compliance — and routes the high-stakes decisions to you for approval first.',
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
