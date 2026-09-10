'use client'

/**
 * Draft banner for legal pages that are published for review but are NOT in
 * force. These pages are noindex and unlinked from the site; the banner is what
 * stops a reader who has the URL from treating the text as binding terms.
 *
 * Full border rather than a left accent bar, per the house rule against
 * left-accent callouts.
 */
export default function DraftNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="draft" role="note">
      <p className="d-l">Draft, not in force</p>
      <p className="d-b">
        This document is published for counsel and technical review only. It is{' '}
        <strong>not effective</strong> and does not apply to any customer until it has been
        approved, dated, and published as final. Nothing here creates an agreement.
        {children ? ' ' : null}
        {children}
      </p>
      <style jsx>{`
        .draft {
          margin-top: 24px;
          padding: 18px 22px;
          background: var(--bg);
          border: 1px solid var(--gold-dark);
          border-radius: 14px;
        }
        .d-l {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gold-dark);
          margin: 0 0 10px;
        }
      `}</style>
      <style jsx global>{`
        .draft .d-b { font-size: 15px !important; line-height: 1.6 !important; margin: 0; }
      `}</style>
    </div>
  )
}
