import type { Metadata } from 'next'

const ogImage =
  '/og?title=Hiring%20and%20ATS%2C%20from%20req%20to%20offer&eyebrow=Hiring'

export const metadata: Metadata = {
  title: 'Hiring & ATS | MambaHR',
  description:
    'From req to offer. Without the loop. The agent screens, schedules, references, and drafts the offer. You decide who joins.',
  openGraph: {
    title: 'Hiring & ATS | MambaHR',
    description:
      'From req to offer without the loop. Agent runs sourcing, screening, scheduling, references, and offer drafting.',
    url: 'https://mambahr.com/hiring',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hiring & ATS | MambaHR',
    description:
      'From req to offer without the loop. Agent runs sourcing, screening, scheduling, references, and offer drafting.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/hiring' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Hiring & ATS | MambaHR',
  url: 'https://mambahr.com/hiring',
  description:
    'MambaHR hiring surface: agent-driven req intake, sourcing, screening, scheduling, references, background check, and offer drafting. Humans approve hires and offers above band.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Hiring agent',
    description:
      'End-to-end hiring agent: drafts the JD with comp band, posts to ATS and job boards, ranks resumes, schedules panels across calendars, requests references, runs background checks via Checkr, and drafts offers. You approve the JD and any offer above band; everything else runs without you.',
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
