import type { Metadata } from 'next'

const ogImage =
  '/og?title=Hiring%2C%20from%20job%20post%20to%20offer&eyebrow=Hiring'

export const metadata: Metadata = {
  title: 'Hiring | MambaHR',
  description:
    'From job post to offer, without the loop. MambaHR screens, ranks, orders the background check, and drafts the offer. You decide who joins.',
  openGraph: {
    title: 'Hiring | MambaHR',
    description:
      'From job post to offer, without the loop. MambaHR runs posting, screening, background checks, and offer drafting.',
    url: 'https://mambahr.com/hiring',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hiring | MambaHR',
    description:
      'From job post to offer, without the loop. MambaHR runs posting, screening, background checks, and offer drafting.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/hiring' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hiring | MambaHR',
  url: 'https://mambahr.com/hiring',
  description:
    'MambaHR hiring: the job post, careers-page posting, screening and ranking, the background check, and the offer. People approve every hire and every offer above the pay range.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Hiring agent',
    description:
      'Hiring, done by MambaHR: drafts the job post with the pay range, posts to your careers page and job boards, ranks resumes (advisory), runs background checks through Checkr, and drafts offers. You approve the job post, every advance-or-pass call, and any offer above the pay range. Interview scheduling is coming.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function HiringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
