import type { Metadata } from 'next'

const ogImage =
  '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'To do | MambaHR',
  description:
    'One list of the decisions that need you. MambaHR handles the routine HR work and logs every step.',
  openGraph: {
    title: 'To do | MambaHR',
    description:
      'To do: the decisions that need you, and the work MambaHR already finished, in one place.',
    url: 'https://www.mambahr.com/today',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'To do | MambaHR',
    description:
      'To do: the decisions that need you, and the work MambaHR already finished, in one place.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://www.mambahr.com/today' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'To do | MambaHR',
  url: 'https://www.mambahr.com/today',
  description:
    'The To do list in MambaHR. MambaHR handles the routine HR work, and you approve the decisions that matter.',
  isPartOf: { '@type': 'WebSite', name: 'MambaHR', url: 'https://www.mambahr.com' },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
    featureList: 'To do',
    description:
      'A daily list of decisions. MambaHR handles routine work, judgment calls come to a person, and high-stakes decisions are always yours. Each card shows what is proposed, the reasons, the status, approve and decline buttons, and the full history.',
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
