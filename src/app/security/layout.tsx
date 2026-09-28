import type { Metadata } from 'next'
import { REVIEW } from './review'

export const metadata: Metadata = {
  title: 'Security | MambaHR',
  description:
    'Built for sensitive HR data. Encrypted in transit and at rest, access by role, every change logged, and never used to train AI.',
  openGraph: {
    title: 'Security | MambaHR',
    description: 'Encrypted, access by role, every change logged, and never used to train AI.',
    url: 'https://www.mambahr.com/security',
    images: [{ url: '/og?title=Built%20for%20the%20most%20sensitive%20HR%20data&eyebrow=Security', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security | MambaHR',
    description: 'Encrypted, logged, and never used to train AI.',
    images: ['/og?title=Built%20for%20the%20most%20sensitive%20HR%20data&eyebrow=Security'],
  },
  alternates: { canonical: 'https://www.mambahr.com/security' },
}

// Mirrors the visible review list on the page (same REVIEW), as Google requires.
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: REVIEW.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      {children}
    </>
  )
}
