'use client'

import type { ReactNode } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

export type LegalSection = { heading: string; body: ReactNode }

/**
 * Shared shell for /privacy and /terms. Single reading column, site type scale,
 * no aurora or product chrome, these pages are read, not sold from.
 */
export default function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: ReactNode
  /** Human-readable effective date, e.g. "29 July 2026". */
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <MegaNav />
      <main id="main" className="lg">
        <div className="wrap">
          <header className="head">
            <p className="eyebrow">Legal</p>
            <h1 className="title">{title}</h1>
            <p className="updated">Last updated {updated}</p>
            <div className="intro">{intro}</div>
          </header>

          <nav className="toc" aria-label="On this page">
            <p className="toc-l">On this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s${i + 1}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((s, i) => (
            <section key={s.heading} className="sec" id={`s${i + 1}`}>
              <h2>{s.heading}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .lg {
          background: var(--bg-warm);
          padding: clamp(112px, 12vw, 160px) var(--page-pad) clamp(72px, 9vw, 112px);
        }
        .wrap { max-width: 760px; margin: 0 auto; }
        .head { padding-bottom: 34px; border-bottom: 1px solid var(--border-faint); }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold-dark);
          margin: 0;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(38px, 5.4vw, 62px);
          line-height: 1.03;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 16px 0 0;
        }
        .updated {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-faint);
          margin: 14px 0 0;
        }
        .intro { margin-top: 22px; }
        .toc {
          margin: 36px 0 8px;
          padding: 20px 24px;
          background: var(--bg);
          border: 1px solid var(--border-faint);
          border-radius: 14px;
        }
        .toc-l {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-faint);
          margin: 0 0 12px;
        }
        .toc ol { margin: 0; padding-left: 20px; display: grid; gap: 7px; }
        .toc li { font-size: 15px; color: var(--text-muted); }
        .sec { margin-top: 44px; scroll-margin-top: 92px; }
        .sec h2 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(22px, 2.6vw, 29px);
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0 0 14px;
        }
      `}</style>
      {/* Body copy is authored as JSX per page, so these need to be global. */}
      <style jsx global>{`
        .lg p, .lg li { font-size: 16px; line-height: 1.68; color: var(--text-muted); }
        .lg .intro p { font-size: 18px; line-height: 1.62; color: var(--text); }
        .lg .sec p + p { margin-top: 14px; }
        .lg .sec ul { margin: 14px 0 0; padding-left: 20px; display: grid; gap: 9px; }
        .lg .sec strong { color: var(--text); font-weight: 600; }
        .lg a { color: var(--gold-dark); text-decoration: underline; text-underline-offset: 2px; }
        .lg a:hover { color: var(--text); }
        .lg table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 15px; }
        .lg th, .lg td {
          text-align: left;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-faint);
          vertical-align: top;
          color: var(--text-muted);
        }
        .lg th { color: var(--text); font-weight: 600; font-size: 13px; }
        .lg .scroller { overflow-x: auto; }
      `}</style>
    </>
  )
}
