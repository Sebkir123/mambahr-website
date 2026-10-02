import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import ArticleShell from '@/components/guides/article-shell'
import { RichText } from '@/components/guides/rich-text'
import s from '@/components/guides/guide.module.css'
import { allStates, statesBySlug } from '@/content/guides'
import { STATE_KEY_FACT_LABELS, type StateKeyFacts } from '@/content/guides/types'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/content/guides/jsonld'

type Props = { params: Promise<{ state: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return allStates.map((st) => ({ state: st.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const st = statesBySlug[state]
  if (!st) return {}
  return pageMetadata({ path: `/hr-by-state/${st.slug}`, title: st.metaTitle, description: st.metaDescription })
}

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const st = statesBySlug[state]
  if (!st) notFound()
  const path = `/hr-by-state/${st.slug}`
  const title = `HR laws in ${st.name} for small employers`

  const jsonLd: object[] = [
    articleJsonLd({ path, headline: title, description: st.metaDescription }),
    breadcrumbJsonLd([
      { name: 'HR laws by state', path: '/hr-by-state' },
      { name: st.name, path },
    ]),
  ]
  if (st.faq && st.faq.length > 0) jsonLd.push(faqJsonLd(st.faq))

  const keys = Object.keys(STATE_KEY_FACT_LABELS) as (keyof StateKeyFacts)[]

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleShell
        crumbs={[{ label: 'HR laws by state', href: '/hr-by-state' }, { label: st.name }]}
        eyebrow={`${st.name} (${st.abbr})`}
        title={title}
        answer={st.answer}
        introToc={[{ id: 'at-a-glance', label: `${st.name} at a glance` }]}
        intro={
          <section id="at-a-glance" className={s.glance}>
            <h2>{st.name} at a glance</h2>
            <dl className={s.glanceGrid}>
              {keys.map((k) => (
                <div key={k} className={s.glanceItem}>
                  <dt>{STATE_KEY_FACT_LABELS[k]}</dt>
                  <dd>
                    <RichText text={st.keyFacts[k]} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        }
        sections={st.sections}
        faq={st.faq}
        mambahr={st.mambahr}
        sources={st.sources}
        related={st.related}
      />
    </>
  )
}
