import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { competitors, compareFaqs, compareTitle, importFrom } from './data'
import { JsonLd } from '@/components/json-ld'
import CompareView from './compare-view'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = competitors[slug]
  if (!c) return {}
  const ogUrl = '/mambahr_og_sharing.jpg'
  const title = compareTitle(c)
  const url = `https://www.mambahr.com/compare/${slug}`
  return {
    title,
    description: c.description,
    openGraph: {
      title,
      description: c.description,
      url,
      siteName: 'MambaHR',
      type: 'article',
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: c.description,
      images: [ogUrl],
    },
    alternates: { canonical: url },
  }
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const c = competitors[slug]
  if (!c) notFound()
  const faqs = compareFaqs(c)

  // Comparison-aware structured data: helps search engines surface this page for
  // "MambaHR vs <competitor>" queries. Content is drawn entirely from the hardcoded
  // competitor record, no user input.
  const comparisonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `MambaHR vs ${c.name}`,
    description: c.heroSub,
    url: `https://www.mambahr.com/compare/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.mambahr.com/compare/${slug}` },
    author: { '@type': 'Organization', name: 'MambaHR', url: 'https://www.mambahr.com' },
    publisher: {
      '@type': 'Organization',
      name: 'MambaHR',
      url: 'https://www.mambahr.com',
      logo: { '@type': 'ImageObject', url: 'https://www.mambahr.com/MambaHR_logo.png' },
    },
    about: [
      { '@type': 'SoftwareApplication', name: 'MambaHR', url: 'https://www.mambahr.com', applicationCategory: 'BusinessApplication' },
      { '@type': 'SoftwareApplication', name: c.name, applicationCategory: 'BusinessApplication' },
    ],
  }

  // Breadcrumb trail (Home › Compare › MambaHR vs <competitor>) so search and
  // answer engines understand this page's place in the site hierarchy.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mambahr.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.mambahr.com/compare' },
      { '@type': 'ListItem', position: 3, name: `MambaHR vs ${c.name}`, item: `https://www.mambahr.com/compare/${slug}` },
    ],
  }

  // The same questions the page renders in its FAQ section, so the markup only
  // ever describes content a reader can see.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <JsonLd data={[comparisonJsonLd, breadcrumbJsonLd, faqJsonLd]} />
      <CompareView data={c} faqs={faqs} importFrom={importFrom(slug)} />
    </>
  )
}
