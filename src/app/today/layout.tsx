import type { Metadata } from 'next'

const ogImage =
  '/api/og?line1=Your+daily&line2=HR&highlight=queue.&subtitle=Sign-off+items%2C+auto-resolved+actions%2C+and+policy+decisions+%E2%80%94+in+one+screen.&bottomRight=Today'

export const metadata: Metadata = {
  title: 'Today — MambaHR',
  description:
    '30 minutes. Your whole HR day. The agents ran the night shift — this morning, a queue of decisions. Approve, decline, done.',
  openGraph: {
    title: 'Today — MambaHR',
    description:
      'The daily HR queue. Sign-off items, auto-resolved actions, and policy decisions in one screen.',
    url: 'https://mambahr.com/today',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Today — MambaHR',
    description:
      'The daily HR queue. Sign-off items, auto-resolved actions, and policy decisions in one screen.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/today' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Today — MambaHR',
  url: 'https://mambahr.com/today',
  description:
    'The daily HR queue surface for MambaHR. The agents run HR end-to-end; you sign off on the decisions that matter.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Today queue',
    description:
      'Daily sign-off queue: routine actions auto-resolve, judgment calls route to a human, high-stakes decisions are always-you. Every card shows the action, rationale, status, decision buttons, and full audit trail.',
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
