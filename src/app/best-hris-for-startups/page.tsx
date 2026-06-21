import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import CategoryView from '@/components/seo/category-view'
import { categories, categoryJsonLd } from '@/components/seo/category-data'

const data = categories['best-hris-for-startups']
const ogUrl = '/mambahr_og_sharing.jpg'

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `https://mambahr.com/${data.slug}`,
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: data.metaTitle, description: data.metaDescription, images: [ogUrl] },
  alternates: { canonical: `https://mambahr.com/${data.slug}` },
}

export default function Page() {
  return (
    <>
      <JsonLd data={categoryJsonLd(data)} />
      <CategoryView data={data} />
    </>
  )
}
