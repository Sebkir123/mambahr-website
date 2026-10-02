import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { Crumbs, reviewedLabel } from '@/components/guides/article-shell'
import { Blocks } from '@/components/guides/rich-text'
import s from '@/components/guides/guide.module.css'
import { allStates } from '@/content/guides'
import { LAST_REVIEWED, STATE_KEY_FACT_LABELS } from '@/content/guides/types'
import { breadcrumbJsonLd, collectionJsonLd, pageMetadata, plain } from '@/content/guides/jsonld'

const TITLE = 'HR Laws by State: Final Pay, Sick Leave, Pay Ranges | MambaHR'
const DESCRIPTION =
  'State HR rules for small employers in California, New York, Texas, Washington, Massachusetts, Colorado, Illinois, Florida, New Jersey and Georgia, side by side.'

export const metadata: Metadata = pageMetadata({ path: '/hr-by-state', title: TITLE, description: DESCRIPTION, type: 'website' })

function teaser(text: string): string {
  const p = plain(text)
  const end = p.search(/\.\s/)
  return end > 0 ? p.slice(0, end + 1) : p
}

export default function StatesHub() {
  const jsonLd = [
    collectionJsonLd({
      path: '/hr-by-state',
      name: 'HR laws by state',
      description: DESCRIPTION,
      items: allStates.map((st) => ({ name: `HR laws in ${st.name}`, path: `/hr-by-state/${st.slug}` })),
    }),
    breadcrumbJsonLd([{ name: 'HR laws by state', path: '/hr-by-state' }]),
  ]

  const link = (slug: string, name: string) => `[${name}](/hr-by-state/${slug})`

  return (
    <>
      <JsonLd data={jsonLd} />
      <MegaNav />
      <main id="main" className={s.page}>
        <header className={s.head}>
          <div className={s.headInner}>
            <Crumbs items={[{ label: 'HR laws by state' }]} />
            <p className={s.eyebrow}>HR laws by state</p>
            <h1 className={s.title}>HR laws by state for small employers</h1>
            <p className={s.lead}>
              Federal law sets the floor, and the state where each employee works adds its own rules on top: when the
              final paycheck is due, how much paid sick leave people earn, whether job posts need a pay range and which
              notices you hand out. Here are ten states side by side, each with its own page and official sources.
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
          <section className={s.hubBlock} aria-labelledby="states-heading">
            <div className={s.hubHead}>
              <h2 id="states-heading" className={s.hubTitle}>Pick a state</h2>
              <p className={s.hubBlurb}>The rules follow where the employee works, not where the company is based.</p>
            </div>
            <ul className={s.cards}>
              {allStates.map((st) => (
                <li key={st.slug}>
                  <Link href={`/hr-by-state/${st.slug}`} prefetch={false} className={s.card}>
                    <h3 className={s.cardTitle}>{st.name}</h3>
                    <p className={s.cardText}>{teaser(st.answer)}</p>
                    <span className={s.cardMore}>See {st.name} rules →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${s.hubBlock} ${s.hubProse}`} aria-labelledby="final-pay-heading">
            <div className={s.hubHead}>
              <h2 id="final-pay-heading" className={s.hubTitle}>Final pay deadlines</h2>
            </div>
            <Blocks
              blocks={[
                {
                  type: 'table',
                  caption: 'When the final paycheck is due, by state',
                  columns: ['State', STATE_KEY_FACT_LABELS.finalPayFired, STATE_KEY_FACT_LABELS.finalPayQuit, STATE_KEY_FACT_LABELS.vacationPayout],
                  rows: allStates.map((st) => [link(st.slug, st.name), st.keyFacts.finalPayFired, st.keyFacts.finalPayQuit, st.keyFacts.vacationPayout]),
                },
              ]}
            />
          </section>

          <section className={`${s.hubBlock} ${s.hubProse}`} aria-labelledby="leave-heading">
            <div className={s.hubHead}>
              <h2 id="leave-heading" className={s.hubTitle}>Paid sick leave and family leave</h2>
            </div>
            <Blocks
              blocks={[
                {
                  type: 'table',
                  caption: 'State paid leave rules, by state',
                  columns: ['State', STATE_KEY_FACT_LABELS.paidSickLeave, STATE_KEY_FACT_LABELS.familyLeave],
                  rows: allStates.map((st) => [link(st.slug, st.name), st.keyFacts.paidSickLeave, st.keyFacts.familyLeave]),
                },
              ]}
            />
          </section>

          <section className={`${s.hubBlock} ${s.hubProse}`} aria-labelledby="hiring-heading">
            <div className={s.hubHead}>
              <h2 id="hiring-heading" className={s.hubTitle}>Job posts and new hires</h2>
            </div>
            <Blocks
              blocks={[
                {
                  type: 'table',
                  caption: 'Pay transparency and new-hire reporting, by state',
                  columns: ['State', STATE_KEY_FACT_LABELS.payTransparency, STATE_KEY_FACT_LABELS.newHireReporting],
                  rows: allStates.map((st) => [link(st.slug, st.name), st.keyFacts.payTransparency, st.keyFacts.newHireReporting]),
                },
              ]}
            />
          </section>

          <p className={s.hubNote}>
            Each state page lists the official sources behind these summaries. Cities can add their own rules on top of
            state law. For the federal rules that apply at each company size, see{' '}
            <Link href="/guides/hr-laws-by-company-size" prefetch={false}>HR laws by company size</Link>, and for
            step-by-step answers see <Link href="/guides" prefetch={false}>all HR guides</Link>. General information,
            not legal advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
