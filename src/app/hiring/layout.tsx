import type { Metadata } from 'next'

const ogImage =
  '/og?title=Hiring%2C%20from%20job%20post%20to%20offer&eyebrow=Hiring'

export const metadata: Metadata = {
  title: 'Hiring | MambaHR',
  description:
    'Job posts with pay ranges, one pipeline for applications, interview scheduling, Checkr background checks and offers in your pay range. You decide who joins.',
  openGraph: {
    title: 'Hiring | MambaHR',
    description:
      'Job posts, applications in one place, background checks, and offer drafts. Your team makes every hiring decision.',
    url: 'https://www.mambahr.com/hiring',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hiring | MambaHR',
    description:
      'Job posts, applications in one place, background checks, and offer drafts. Your team makes every hiring decision.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/hiring' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hiring | MambaHR',
  url: 'https://www.mambahr.com/hiring',
  description:
    'MambaHR hiring: job posts with pay ranges, your careers page, one pipeline for every application, interview scheduling, background checks through Checkr, and offers drafted inside your pay range. People make every hiring decision and approve every offer.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
    featureList: 'Hiring',
    description:
      'Drafts the job post with the pay range, posts it to your careers page and job boards, and collects every application in one pipeline for your team to review. Schedules interviews, orders background checks through Checkr, and drafts offers inside your pay range. You approve the job post, decide who moves forward, and approve every offer.',
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
