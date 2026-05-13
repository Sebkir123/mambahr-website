import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security — MambaHR',
  description:
    'MambaHR is built for the most sensitive HR data. Zero data retention on AI models, end-to-end encryption, full audit trail.',
  openGraph: {
    title: 'Security — MambaHR',
    description: 'Enterprise-grade security for HR operations. Encryption, zero data retention, full audit trail.',
    url: 'https://mambahr.com/security',
    images: [{ url: '/mambahr_og_sharing.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security — MambaHR',
    description: 'Enterprise-grade security for HR operations.',
    images: ['/mambahr_og_sharing.png'],
  },
  alternates: { canonical: 'https://mambahr.com/security' },
}

// Hardcoded FAQ content — not user input, safe to inline as JSON-LD.
const faqItems = [
  { q: 'How does MambaHR define customer data?', a: 'Customer data is any information your organization shares with or through MambaHR — employee records, compensation data, policies, documents, conversations with the agent, and the results of its work. All of it is yours, always.' },
  { q: 'How does MambaHR keep our data private and secure?', a: 'Your data is encrypted in storage and in transit, isolated to your organization, and protected by strict access controls. Every agent action is logged, every approval is recorded, and nothing executes in your HR system without your explicit authorization.' },
  { q: 'Where is our data hosted?', a: 'MambaHR runs on enterprise-grade cloud infrastructure in the United States, with regional isolation, redundancy, and industry-standard protections built into every layer.' },
  { q: 'How do you respect access controls for our data?', a: 'Access is governed by your identity provider and the roles you define. MambaHR enforces least-privilege access — the agent, your team, and our systems only see what\'s required for a given task. All access is recorded in an immutable audit log.' },
  { q: 'How does MambaHR ensure no one is training on our data?', a: 'Your workforce data is never used to train AI models — ours or anyone else\'s. MambaHR uses AI to execute your workflows, not to learn from your data.' },
  { q: 'Can we use our data to train our own models?', a: 'Your data is yours. If you want to use it for your own analytics or training purposes, you own it fully and can export it at any time.' },
  { q: 'How often do you perform security reviews?', a: 'MambaHR\'s security practices are continuously reviewed and hardened. We conduct regular internal reviews, threat modeling on every new feature, and work with external experts to test our defenses.' },
]

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
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
