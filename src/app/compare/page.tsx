import type { Metadata } from 'next'
import CompareHub from './compare-hub'
import { competitors } from './[slug]/data'
import { JsonLd } from '@/components/json-ld'

const description =
  'See how MambaHR compares with Rippling, Gusto, BambooHR, Workday, Lattice, Ashby and more, side by side. MambaHR does the HR admin, and you approve what matters.'
const ogImage = '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
  description,
  alternates: { canonical: 'https://www.mambahr.com/compare' },
  openGraph: {
    title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
    description,
    url: 'https://www.mambahr.com/compare',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare MambaHR with Rippling, Gusto, BambooHR and Workday',
    description,
    images: [ogImage],
  },
}

// Every comparison page as an ItemList, plus the breadcrumb, so search and
// answer engines can find each one from the hub. Built from the same record
// the pages and the sitemap use.
const hubJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Compare MambaHR',
    description,
    url: 'https://www.mambahr.com/compare',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: Object.values(competitors).map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `MambaHR vs ${c.name}`,
        url: `https://www.mambahr.com/compare/${c.slug}`,
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mambahr.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://www.mambahr.com/compare' },
    ],
  },
]

export default function ComparePage() {
  return (
    <>
      <JsonLd data={hubJsonLd} />
      <CompareHub />
    </>
  )
}
