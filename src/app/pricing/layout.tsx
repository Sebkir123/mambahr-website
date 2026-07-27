import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { FAQS } from './faqs'

export const metadata: Metadata = {
  title: 'Pricing | MambaHR | Your first AI HR department',
  description:
    'Simple per-employee pricing for hiring, onboarding, time off, performance, compliance, and payroll-ready exports. Your whole HR department from $10k a year.',
  alternates: { canonical: 'https://mambahr.com/pricing' },
  openGraph: {
    title: 'Pricing | MambaHR',
    description:
      'Simple per-employee pricing for your whole AI HR department, hiring, onboarding, time off, performance, compliance, and payroll-ready exports. From $10k a year.',
    url: 'https://mambahr.com/pricing',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/og?title=Pricing%20for%20your%20AI%20HR%20department&eyebrow=Pricing', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | MambaHR',
    description: 'Your whole AI HR department, priced per employee. From $10k a year.',
    images: ['/og?title=Pricing%20for%20your%20AI%20HR%20department&eyebrow=Pricing'],
  },
}

// Pricing structured data, lets answer engines and Google's price rich results
// read the published per-employee tiers. Numbers are the literal published rates
// on the page (no user input). Custom/Enterprise carries no numeric price, so it
// is excluded from lowPrice/highPrice but listed as an offer.
const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'MambaHR, AI HR Department',
  description:
    'The AI HR department, hiring, onboarding, time off, performance, compensation, compliance, and payroll-ready exports, run end to end. A human approves the calls that matter.',
  brand: { '@type': 'Brand', name: 'MambaHR' },
  url: 'https://mambahr.com/pricing',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '14',
    highPrice: '30',
    offerCount: '4',
    unitText: 'per employee per month, billed annually',
    offers: [
      { '@type': 'Offer', name: 'HR Starter', price: '14', priceCurrency: 'USD', description: 'Per employee / month · $9k/yr minimum · teams of 50–150.' },
      { '@type': 'Offer', name: 'HR Ops Manager', price: '22', priceCurrency: 'USD', description: 'Per employee / month · $24k/yr minimum · teams of 75–400.' },
      { '@type': 'Offer', name: 'AI HR Department', price: '30', priceCurrency: 'USD', description: 'Per employee / month · $48k/yr minimum · teams of 150+.' },
      { '@type': 'Offer', name: 'Enterprise', priceCurrency: 'USD', description: 'Custom pricing from $100k/yr · 1,000+ and multi-entity.' },
    ],
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
