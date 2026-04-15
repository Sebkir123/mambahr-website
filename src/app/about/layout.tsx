import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description:
    'MambaHR is a domain AI lab building the autonomous HR agent. Meet the team behind the company.',
  openGraph: {
    title: 'About — MambaHR',
    description: 'MambaHR is a domain AI lab building the autonomous HR agent. Meet the team behind the company.',
    url: 'https://mambahr.com/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — MambaHR',
    description: 'MambaHR is a domain AI lab building the autonomous HR agent.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://mambahr.com/about' },
}

// Hardcoded team schema — not user input, safe to inline as JSON-LD.
const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MambaHR',
  url: 'https://mambahr.com',
  logo: 'https://mambahr.com/og-image.jpg',
  description: 'Domain AI lab building the autonomous HR agent.',
  founders: [
    {
      '@type': 'Person',
      name: 'Brian Bell',
      jobTitle: 'CEO & Co-Founder',
      sameAs: 'https://www.linkedin.com/in/brianjosephbell/',
    },
    {
      '@type': 'Person',
      name: 'Sebastian Kirsch',
      jobTitle: 'CTO & Co-Founder',
      sameAs: 'https://www.linkedin.com/in/sebastiankirsch-/',
    },
  ],
  sameAs: ['https://www.linkedin.com/company/mamba-hr'],
}

const teamJsonLd = JSON.stringify(teamSchema)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: teamJsonLd }} />
      {children}
    </>
  )
}
