import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description:
    "The HR department is changing shape. We're building the AI HR department — the work, done end to end, with a human in the loop only when it matters. Meet the team behind the company.",
  openGraph: {
    title: 'About — MambaHR',
    description: "The HR department is changing shape. We're building the AI HR department — the work, done end to end, with a human in the loop only when it matters. Meet the team behind the company.",
    url: 'https://mambahr.com/about',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — MambaHR',
    description: "The HR department is changing shape. We're building the AI HR department — the work, done end to end, with a human in the loop only when it matters.",
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: { canonical: 'https://mambahr.com/about' },
}

// Hardcoded team schema — not user input, safe to inline as JSON-LD.
const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MambaHR',
  url: 'https://mambahr.com',
  logo: 'https://mambahr.com/MambaHR_logo.png',
  description: 'AI HR department for US companies. The agent does the operational work; the human owns the judgment calls.',
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
