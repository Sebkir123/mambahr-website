import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | MambaHR',
  description:
    'MambaHR keeps your employee records and does the HR admin in them, so your team can focus on people. Meet the founders.',
  openGraph: {
    title: 'About | MambaHR',
    description: 'MambaHR keeps your employee records and does the HR admin in them, so your team can focus on people. Meet the founders.',
    url: 'https://www.mambahr.com/about',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | MambaHR',
    description: "MambaHR keeps your employee records and does the HR admin in them, so your team can focus on people.",
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: { canonical: 'https://www.mambahr.com/about' },
}

// Hardcoded team schema, not user input, safe to inline as JSON-LD.
const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MambaHR',
  url: 'https://www.mambahr.com',
  logo: 'https://www.mambahr.com/MambaHR_logo.png',
  description: 'HR software for US companies. MambaHR does the admin; your team makes the decisions.',
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
