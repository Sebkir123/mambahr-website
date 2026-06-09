'use client'

import { useState } from 'react'
import EmailCaptureModal from '@/components/email-capture-modal'

// Catalog mirrors the MAGNETS map in the handle-magnet-request edge function.
// Add a new entry here AND in the edge function to ship a new magnet.
const RIF_MAGNET = {
  id: 'rif-playbook',
  title: 'The Defensible Layoff Playbook',
  blurb:
    'A step-by-step field guide for teams running a RIF that has to hold up in court. State-by-state notice and severance, WARN Act thresholds, selection criteria, communication scripts, and a day-of execution checklist.',
  whatsInside: [
    'State-by-state notice & severance rules',
    'WARN Act thresholds and timing',
    'Defensible selection criteria',
    'Manager, employee, and team scripts',
    'Day-of execution checklist',
    'Post-RIF: COBRA, unemployment, references',
  ],
} as const

export default function ResourcesSection() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section style={{ background: 'var(--bg-cream)', padding: '112px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {/* Header */}
          <div data-animate style={{ marginBottom: 40, maxWidth: 720 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>RESOURCES</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(34px, 4.2vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                margin: '0 0 14px',
                lineHeight: 1.05,
              }}
            >
              Field guides for HR teams.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              Practical PDFs on the hard parts of running HR. Free to download.
            </p>
          </div>

          {/* Single feature card — PDF preview on the left, content on the right */}
          <article
            className="resource-card mobile-stack"
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 36,
              alignItems: 'stretch',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 22,
              padding: 28,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* PDF preview */}
            <div
              aria-hidden="true"
              style={{
                background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-cream) 100%)',
                border: '1px solid var(--border-mid)',
                borderRadius: 14,
                padding: '28px 22px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 260,
                position: 'relative',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(28,25,23,0.05)',
              }}
            >
              {/* Top corner mark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg-warm)',
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 11,
                    fontWeight: 400,
                  }}
                >
                  M
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  MambaHR
                </span>
              </div>

              {/* Title typeset on the paper */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 28,
                    fontWeight: 400,
                    color: 'var(--text)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                >
                  The Defensible<br />Layoff<br />Playbook
                </p>
                <div
                  style={{
                    width: 36,
                    height: 2,
                    background: 'var(--gold-dark)',
                    margin: '16px 0 0',
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(26px, 2.8vw, 32px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {RIF_MAGNET.title}
              </h3>

              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                {RIF_MAGNET.blurb}
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '4px 0 0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px 18px',
                }}
              >
                {RIF_MAGNET.whatsInside.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.45 }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: 3 }}
                    >
                      <path
                        d="M2 7l4 4 6-6"
                        stroke="var(--gold-dark)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 16,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="btn-gold"
                  style={{ justifyContent: 'center' }}
                >
                  Get the PDF →
                </button>
                <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                  Free download
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {open && (
        <EmailCaptureModal
          key={RIF_MAGNET.id}
          open
          onClose={() => setOpen(false)}
          magnetId={RIF_MAGNET.id}
          magnetTitle={RIF_MAGNET.title}
          magnetBlurb={RIF_MAGNET.blurb}
          whatsInside={[...RIF_MAGNET.whatsInside]}
        />
      )}
    </>
  )
}
