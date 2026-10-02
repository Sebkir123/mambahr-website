import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { Crumbs, reviewedLabel } from '@/components/guides/article-shell'
import s from '@/components/guides/guide.module.css'
import { allGuides, guidesByCategory, THRESHOLDS_SLUG, thresholdsPage } from '@/content/guides'
import { LAST_REVIEWED } from '@/content/guides/types'
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata, plain } from '@/content/guides/jsonld'

const TITLE = 'HR Guides for Small Companies: Hiring to Offboarding | MambaHR'
const DESCRIPTION =
  'Plain-English answers to the HR questions small US companies ask most: onboarding paperwork, final pay, FMLA, COBRA, overtime and more, with official sources.'

export const metadata: Metadata = pageMetadata({ path: '/guides', title: TITLE, description: DESCRIPTION, type: 'website' })

/** First sentence of an answer, for the card teaser. */
function teaser(text: string): string {
  const p = plain(text)
  const end = p.search(/\.\s/)
  return end > 0 ? p.slice(0, end + 1) : p
}

export default function GuidesHub() {
  const groups = guidesByCategory()
  const jsonLd = [
    collectionJsonLd({
      path: '/guides',
      name: 'HR guides for small companies',
      description: DESCRIPTION,
      items: [
        ...allGuides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })),
        { name: thresholdsPage.title, path: `/guides/${THRESHOLDS_SLUG}` },
      ],
    }),
    breadcrumbJsonLd([{ name: 'Guides', path: '/guides' }]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <MegaNav />
      <main id="main" className={s.page}>
        <header className={s.head}>
          <div className={s.headInner}>
            <Crumbs items={[{ label: 'Guides' }]} />
            <p className={s.eyebrow}>HR guides</p>
            <h1 className={s.title}>HR answers for small companies, from first hire to last day</h1>
            <p className={s.lead}>
              Each guide answers one question a founder, operations lead or HR person at a small US company runs into:
              what the law requires, when it is due and what to do next. Every guide links to the official sources it
              relies on.
            </p>
            <p className={s.meta}>
              <span>
                Last reviewed <time dateTime={LAST_REVIEWED}>{reviewedLabel()}</time>
              </span>
              <span className={s.dot} aria-hidden="true">·</span>
              <span>General information, not legal advice.</span>
            </p>
          </div>
        </header>

        <div className={s.hub}>
          <div className={s.feature}>
            <Link href={`/guides/${THRESHOLDS_SLUG}`} prefetch={false} className={`${s.card} ${s.featureCard}`}>
              <p className={s.eyebrow}>Data</p>
              <h2 className={s.cardTitle}>{thresholdsPage.title}</h2>
              <p className={s.cardText}>{teaser(thresholdsPage.answer)}</p>
              <span className={s.cardMore}>See the table →</span>
            </Link>
            <Link href="/hr-by-state" prefetch={false} className={`${s.card} ${s.featureCard}`}>
              <p className={s.eyebrow}>By state</p>
              <h2 className={s.cardTitle}>HR laws by state</h2>
              <p className={s.cardText}>
                Pay ranges in job posts, sick leave, family leave and final pay deadlines for ten states, side by side.
              </p>
              <span className={s.cardMore}>Compare states →</span>
            </Link>
          </div>

          {groups.map((grp) => (
            <section key={grp.name} className={s.hubBlock} aria-labelledby={`cat-${grp.name}`}>
              <div className={s.hubHead}>
                <h2 id={`cat-${grp.name}`} className={s.hubTitle}>{grp.name}</h2>
                <p className={s.hubBlurb}>{grp.blurb}</p>
              </div>
              <ul className={s.cards}>
                {grp.guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} prefetch={false} className={s.card}>
                      <h3 className={s.cardTitle}>{g.title}</h3>
                      <p className={s.cardText}>{teaser(g.answer)}</p>
                      <span className={s.cardMore}>Read the guide →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className={s.hubNote}>
            These guides are general information, not legal advice. Laws change and exceptions apply, so check the
            sources listed on each page or an employment lawyer before you act on a specific case.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
