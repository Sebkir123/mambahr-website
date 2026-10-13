import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { FAQS } from './faqs'
import { TIERS } from '@/content/pricing-tiers'

export const metadata: Metadata = {
  title: 'Pricing | MambaHR',
  description:
    'Simple per-employee pricing. MambaHR takes the HR admin off your team: hiring, onboarding, time off, compliance and payroll changes. From $14 per employee a month, no minimum.',
  alternates: { canonical: 'https://www.mambahr.com/pricing' },
  openGraph: {
    title: 'Pricing | MambaHR',
    description:
      'Simple per-employee pricing for the HR admin your team does today: hiring, onboarding, time off, compliance and payroll changes. From $14 per employee a month, no minimum.',
    url: 'https://www.mambahr.com/pricing',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/og?title=Simple%20pricing%2C%20per%20employee&eyebrow=Pricing', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | MambaHR',
    description: 'HR admin, done for your team. Priced per employee, no minimum.',
    images: ['/og?title=Simple%20pricing%2C%20per%20employee&eyebrow=Pricing'],
  },
}

// Pricing structured data, lets answer engines and Google's price rich results
// read the published per-employee tiers. Numbers are the literal published rates
// on the page (no user input), read from the shared TIERS so the schema cannot
// drift from the cards. Custom/Enterprise carries no numeric price, so it is
// excluded from lowPrice/highPrice but listed as an offer.
//
// There is no `review` and no `aggregateRating` on purpose. Search Console
// lists both as missing, as a suggestion: a Product needs only one of review,
// aggregateRating or offers, and this one has offers. Google accepts ratings
// only when they come from customers, are collected on this site and are shown
// on this page. Until that exists, leave both out.
const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MambaHR',
  description:
    'HR software that does the admin for your team: hiring, onboarding, time off, pay changes, compliance and payroll changes. A person approves the decisions that matter.',
  brand: { '@type': 'Brand', name: 'MambaHR' },
  url: 'https://www.mambahr.com/pricing',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '14',
    highPrice: '30',
    offerCount: '4',
    // `description`, not `unitText`: an AggregateOffer has no unitText in the
    // schema.org vocabulary, so validators flagged it as an unknown field.
    description: 'Per employee per month, billed annually.',
    offers: TIERS.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      ...(t.price.startsWith('$') ? { price: t.price.slice(1) } : {}),
      priceCurrency: 'USD',
      description: t.price.startsWith('$')
        ? `Per employee / month · ${t.min.replace(' · billed annually', '').toLowerCase()} · ${t.size.replace('For ', '')}.`
        : `${t.min} · ${t.size.replace('For ', '')}.`,
    })),
  },
}

// FAQ rich results, mirrors the visible FAQ section on the page (same FAQS).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function PricingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pricingJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}
