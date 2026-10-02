import Link from 'next/link'
import type { ReactNode } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import type { Faq, Section, Source } from '@/content/guides/types'
import { LAST_REVIEWED } from '@/content/guides/types'
import { linkLabel } from '@/content/guides'
import { Blocks, RichText, slugify } from './rich-text'
import s from './guide.module.css'

export function reviewedLabel(): string {
  return new Date(`${LAST_REVIEWED}T12:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className={s.crumbs} aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/" prefetch={false}>Home</Link>
        </li>
        {items.map((it) => (
          <li key={it.label}>
            {it.href ? (
              <Link href={it.href} prefetch={false}>{it.label}</Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

type TocItem = { id: string; label: string }

export default function ArticleShell({
  crumbs,
  eyebrow,
  title,
  answer,
  intro,
  introToc = [],
  sections,
  faq,
  mambahr,
  sources,
  related,
}: {
  crumbs: { label: string; href?: string }[]
  eyebrow: string
  title: string
  answer: string
  /** Rendered between the answer and the first section, e.g. an at-a-glance table. */
  intro?: ReactNode
  /** Table-of-contents entries for anything inside `intro` that carries an id. */
  introToc?: TocItem[]
  sections: Section[]
  faq?: Faq[]
  mambahr: string
  sources: Source[]
  related: string[]
}) {
  const toc: TocItem[] = [
    ...introToc,
    ...sections.map((sec) => ({ id: slugify(sec.heading), label: sec.heading })),
    ...(faq && faq.length > 0 ? [{ id: 'common-questions', label: 'Common questions' }] : []),
    { id: 'how-mambahr-handles-this', label: 'How MambaHR handles this' },
    { id: 'sources', label: 'Sources' },
  ]
  const reviewed = reviewedLabel()

  return (
    <>
      <MegaNav />
      <main id="main" className={s.page}>
        <header className={s.head}>
          <div className={s.headInner}>
            <Crumbs items={crumbs} />
            <p className={s.eyebrow}>{eyebrow}</p>
            <h1 className={s.title}>{title}</h1>
            <div className={`${s.answer} agent-edge agent-done`}>
              <p className={s.answerLabel}>The short answer</p>
              <p className={s.answerText}>
                <RichText text={answer} />
              </p>
            </div>
            <p className={s.meta}>
              <span>
                Last reviewed <time dateTime={LAST_REVIEWED}>{reviewed}</time>
              </span>
              <span className={s.dot} aria-hidden="true">·</span>
              <span>General information, not legal advice.</span>
            </p>
          </div>
        </header>

        <div className={s.body}>
          <article className={s.prose}>
            {intro}

            {sections.map((sec) => (
              <section key={sec.heading} id={slugify(sec.heading)} className={s.section}>
                <h2>{sec.heading}</h2>
                <Blocks blocks={sec.blocks} />
              </section>
            ))}

            {faq && faq.length > 0 && (
              <section id="common-questions" className={s.section}>
                <h2>Common questions</h2>
                <div className={s.faq}>
                  {faq.map((f) => (
                    <div key={f.q} className={s.qa}>
                      <h3>{f.q}</h3>
                      <p>
                        <RichText text={f.a} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="how-mambahr-handles-this" className={`${s.mamba} agent-edge agent-done`}>
              <p className={s.mambaKicker}>How MambaHR handles this</p>
              <p className={s.mambaText}>
                <RichText text={mambahr} />
              </p>
              <div className={s.mambaCtas}>
                <Link href="/demo" className="btn btn-primary">Book a demo</Link>
                <Link href="/pricing" className="btn btn-secondary">See pricing</Link>
              </div>
            </section>

            <section id="sources" className={s.section}>
              <h2>Sources</h2>
              <ol className={s.sources}>
                {sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a>
                  </li>
                ))}
              </ol>
              <p className={s.disclaimer}>
                Last reviewed {reviewed}. This page is general information, not legal advice. Laws change and
                exceptions apply, so check the sources above or an employment lawyer before you act on a specific
                case.
              </p>
            </section>

            {related.length > 0 && (
              <section className={s.section} aria-labelledby="related-heading">
                <h2 id="related-heading">Related</h2>
                <ul className={s.related}>
                  {related.map((href) => (
                    <li key={href}>
                      <Link href={href} prefetch={false} className={s.relatedCard}>
                        <span>{linkLabel(href)}</span>
                        <span className={s.arrow} aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className={s.aside} aria-label="On this page">
            <div className={s.toc}>
              <p className={s.tocTitle}>On this page</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
              <div className={s.tocLinks}>
                <Link href="/guides" prefetch={false}>All HR guides</Link>
                <Link href="/hr-by-state" prefetch={false}>HR laws by state</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
