'use client'

import { useState } from 'react'
import EmailCaptureModal from '@/components/email-capture-modal'
import { Beat, Page } from '@/components/ui/page'

type Magnet = {
  id: string
  title: string
  blurb: string
  whatsInside: string[]
  theme: {
    bg: string
    border: string
    text: string
    line: string
    boxBg: string
    boxText: string
  }
}

const MAGNETS: Magnet[] = [
  {
    id: 'rif-playbook',
    title: 'The Defensible Layoff Playbook',
    blurb: 'A step-by-step field guide for teams running a RIF that has to hold up in court. Covers state-by-state notice, severance, WARN Act thresholds, and scripts.',
    whatsInside: [
      'State-by-state notice & severance rules',
      'WARN Act thresholds and timing',
      'Defensible selection criteria',
      'Manager, employee, and team scripts',
      'Day-of execution checklist',
      'Post-RIF: COBRA, unemployment, references',
    ],
    theme: {
      bg: '#1C1917',
      border: 'rgba(255,255,255,0.1)',
      text: '#FFFFFF',
      line: 'var(--gold)',
      boxBg: 'var(--gold-tint)',
      boxText: 'var(--gold-dark)',
    }
  },
  {
    id: 'leave-checklist',
    title: 'Multi-State Leave Compliance Checklist',
    blurb: 'A state-by-state reference guide for FMLA/CFRA leave stacking, paid family leaves, and ADA accommodations across all 50 states.',
    whatsInside: [
      'FMLA & state leave stacking logic',
      'Paid family leaves (CA, NY, MA, CO)',
      'ADA accommodation triggers',
      'Required compliance timelines',
      'Statute citations & references',
      'Return-to-work protocols',
    ],
    theme: {
      bg: 'var(--bg-cream)',
      border: 'var(--border-mid)',
      text: 'var(--text)',
      line: 'var(--gold-dark)',
      boxBg: '#1C1917',
      boxText: '#FFFFFF',
    }
  },
  {
    id: 'onboarding-kit',
    title: 'First-90-Days Onboarding Kit',
    blurb: 'The complete checklist for setting up new hires: IT provisioning, I-9/E-Verify compliance, and buddy program structures.',
    whatsInside: [
      'IT provisioning checklist (Okta, Jamf)',
      'I-9 & E-Verify compliance timeline',
      'Buddy program structure templates',
      '30-60-90 day feedback framework',
      'New-hire announcement templates',
      'Required training assignment trackers',
    ],
    theme: {
      bg: 'var(--bg-warm)',
      border: 'var(--border-mid)',
      text: 'var(--text)',
      line: 'var(--gold-dark)',
      boxBg: '#1C1917',
      boxText: '#FFFFFF',
    }
  }
]

export default function ResourcesSection() {
  const [selectedMagnet, setSelectedMagnet] = useState<Magnet | null>(null)

  return (
    <>
      <Beat bg="cream">
        <Page>
          {/* Header */}
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>RESOURCES</p>
            <h2 className="t-h2" style={{ margin: '0 0 14px' }}>
              Field guides for HR teams.
            </h2>
            <p className="t-lead" style={{ margin: 0 }}>
              Practical PDFs on the hard parts of running HR. Free to download.
            </p>
          </div>

          {/* Library Grid */}
          <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {MAGNETS.map((m) => (
              <article
                key={m.id}
                className="card-lift"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 22,
                  padding: 24,
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  height: '100%',
                }}
              >
                {/* PDF Cover Mockup */}
                <div
                  aria-hidden="true"
                  style={{
                    background: m.theme.bg,
                    border: `1px solid ${m.theme.border}`,
                    borderRadius: 14,
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 220,
                    position: 'relative',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: m.theme.boxBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: m.theme.boxText,
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      M
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        color: m.id === 'rif-playbook' ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      MambaHR
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 22,
                        fontWeight: 400,
                        color: m.theme.text,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                        margin: 0,
                      }}
                    >
                      {m.title}
                    </p>
                    <div
                      style={{
                        width: 32,
                        height: 2,
                        background: m.theme.line,
                        margin: '14px 0 0',
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: 20,
                      fontWeight: 400,
                      letterSpacing: '-0.015em',
                      color: 'var(--text)',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {m.title}
                  </h3>

                  <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {m.blurb}
                  </p>

                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: '1px solid var(--border-faint)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedMagnet(m)}
                      className="btn-gold"
                      style={{ padding: '8px 18px', fontSize: 12.5 }}
                    >
                      Get the PDF
                    </button>
                    <span style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>
                      Free download
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Page>
      </Beat>

      {selectedMagnet && (
        <EmailCaptureModal
          key={selectedMagnet.id}
          open={!!selectedMagnet}
          onClose={() => setSelectedMagnet(null)}
          magnetId={selectedMagnet.id}
          magnetTitle={selectedMagnet.title}
          magnetBlurb={selectedMagnet.blurb}
          whatsInside={[...selectedMagnet.whatsInside]}
        />
      )}

      <style>{`
        @media (max-width: 1024px) {
          .resources-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 680px) {
          .resources-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
