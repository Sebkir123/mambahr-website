import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { FLOW, WALKS, FAQS } from './content'

const URL = 'https://www.mambahr.com/how-it-works'
const TITLE = 'How MambaHR works, step by step | MambaHR'
const DESCRIPTION =
  'What happens when a request reaches MambaHR in Slack or the web request form: the admin it does, the steps a person approves and why, and what you see when it is done.'
const OG = '/og?title=How%20MambaHR%20works%2C%20step%20by%20step&eyebrow=How%20it%20works'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'MambaHR',
    images: [{ url: OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'A request comes in, MambaHR does the admin, a person approves what matters. Four walk-throughs.',
    images: [OG],
  },
}

// Structured data, built from the same content module the page renders, so the
// schema can never say something the page does not.
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mambahr.com' },
    { '@type': 'ListItem', position: 2, name: 'How MambaHR works', item: URL },
  ],
}

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How MambaHR works, step by step',
  description: DESCRIPTION,
  url: URL,
  mainEntityOfPage: URL,
  inLanguage: 'en-US',
  dateModified: '2026-10-02',
  author: { '@type': 'Organization', name: 'MambaHR', url: 'https://www.mambahr.com' },
  publisher: { '@type': 'Organization', name: 'MambaHR', url: 'https://www.mambahr.com' },
  about: {
    '@type': 'SoftwareApplication',
    name: 'MambaHR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.mambahr.com',
  },
  hasPart: WALKS.map((w) => ({
    '@type': 'HowTo',
    name: w.howToName,
    description: w.summary,
    url: `${URL}#${w.id}`,
    step: w.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  })),
}

const flow = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How a request is handled in MambaHR',
  description: 'The four steps every HR request follows in MambaHR, from the request to the record.',
  url: URL,
  step: FLOW.map((f, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: f.title,
    text: f.body,
  })),
}

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumb, article, flow, faq]} />
      {children}
    </>
  )
}
