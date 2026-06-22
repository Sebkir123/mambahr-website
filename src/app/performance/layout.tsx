import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Performance Reviews Software | MambaHR',
  description:
    'Reviews that write themselves from cited evidence. Managers own the final words and the rating. PIPs and calibration handled end to end.',
  openGraph: {
    title: 'Performance Reviews Software | MambaHR',
    description:
      'Reviews that write themselves from cited evidence. Managers own the final words and the rating. PIPs and calibration handled.',
    url: 'https://mambahr.com/performance',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Reviews Software | MambaHR',
    description:
      'Reviews that write themselves from cited evidence. Managers own the final words and the rating. PIPs and calibration handled.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/performance' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Performance Reviews Software | MambaHR',
  url: 'https://mambahr.com/performance',
  description:
    'MambaHR performance reviews: drafts every review from cited evidence so managers own the final words and the rating. The agent runs PIPs and calibration end to end.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareFeature',
    name: 'Performance review agent',
    description:
      'Drafts each performance review from cited evidence, goals, projects, peer signal, so the manager edits the words and owns the final rating. Runs PIPs with documented milestones and supports calibration across teams to keep ratings fair and defensible.',
  },
}

const jsonLdString = JSON.stringify(jsonLd)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function PerformanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      {children}
    </>
  )
}
