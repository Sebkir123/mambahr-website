import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import ArticleShell from '@/components/guides/article-shell'
import { Blocks } from '@/components/guides/rich-text'
import s from '@/components/guides/guide.module.css'
import { THRESHOLDS_SLUG, thresholdsPage as t } from '@/content/guides'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/content/guides/jsonld'

const PATH = `/guides/${THRESHOLDS_SLUG}`

export const metadata: Metadata = pageMetadata({ path: PATH, title: t.metaTitle, description: t.metaDescription })

export default function CompanySizePage() {
  const federal = [...t.federal].sort((a, b) => a.sortKey - b.sortKey)
  // Every row cites its own source; the Sources list is the union, once each.
  const sources = [...t.sources, ...t.federal.map((r) => r.source), ...t.state.map((r) => r.source)].filter(
    (src, i, all) => all.findIndex((o) => o.url === src.url) === i,
  )

  const jsonLd: object[] = [
    articleJsonLd({ path: PATH, headline: t.title, description: t.metaDescription }),
    breadcrumbJsonLd([
      { name: 'Guides', path: '/guides' },
      { name: t.title, path: PATH },
    ]),
  ]
  if (t.faq && t.faq.length > 0) jsonLd.push(faqJsonLd(t.faq))

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleShell
        crumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Company size' }]}
        eyebrow="Compliance data"
        title={t.title}
        answer={t.answer}
        introToc={[
          { id: 'federal-thresholds', label: 'Federal thresholds' },
          { id: 'state-thresholds', label: 'State thresholds' },
        ]}
        intro={
          <>
            <section id="federal-thresholds" className={s.glance}>
              <h2>Federal thresholds by headcount</h2>
              <Blocks
                blocks={[
                  {
                    type: 'table',
                    caption: 'Federal employment laws by number of employees',
                    columns: ['Employees', 'Law', 'What applies', 'How employees are counted', 'Source'],
                    rows: federal.map((r) => [
                      `${r.employees}+`,
                      r.law,
                      r.whatChanges,
                      r.howCounted,
                      `[${r.source.label}](${r.source.url})`,
                    ]),
                  },
                ]}
              />
            </section>
            <section id="state-thresholds" className={s.glance}>
              <h2>State thresholds that differ</h2>
              <Blocks
                blocks={[
                  {
                    type: 'table',
                    caption: 'State laws that start at a different size than federal law',
                    columns: ['State', 'Employees', 'Law', 'What applies', 'Source'],
                    rows: t.state.map((r) => [r.state, r.employees, r.law, r.whatChanges, `[${r.source.label}](${r.source.url})`]),
                  },
                ]}
              />
            </section>
          </>
        }
        sections={t.sections}
        faq={t.faq}
        mambahr={t.mambahr}
        sources={sources}
        related={t.related}
      />
    </>
  )
}
