import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import ArticleShell from '@/components/guides/article-shell'
import { allGuides, guidesBySlug } from '@/content/guides'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/content/guides/jsonld'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const g = guidesBySlug[slug]
  if (!g) return {}
  return pageMetadata({ path: `/guides/${g.slug}`, title: g.metaTitle, description: g.metaDescription })
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const g = guidesBySlug[slug]
  if (!g) notFound()
  const path = `/guides/${g.slug}`

  const jsonLd: object[] = [
    articleJsonLd({ path, headline: g.title, description: g.metaDescription }),
    breadcrumbJsonLd([
      { name: 'Guides', path: '/guides' },
      { name: g.title, path },
    ]),
  ]
  if (g.faq && g.faq.length > 0) jsonLd.push(faqJsonLd(g.faq))

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleShell
        crumbs={[{ label: 'Guides', href: '/guides' }, { label: g.category }]}
        eyebrow={`${g.category} guide`}
        title={g.title}
        answer={g.answer}
        sections={g.sections}
        faq={g.faq}
        mambahr={g.mambahr}
        sources={g.sources}
        related={g.related}
      />
    </>
  )
}
