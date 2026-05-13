'use client'

import { useState } from 'react'

type FeatureId = 'action' | 'rationale' | 'status' | 'time' | 'decision'

const FEATURES: { id: FeatureId; title: string; desc: string }[] = [
  {
    id: 'action',
    title: 'The action',
    desc: 'What the agent did, or wants to do. One scannable line — never a wall of context.',
  },
  {
    id: 'rationale',
    title: 'The rationale',
    desc: "Three lines max with the agent's reasoning and source citations. Click to expand the full trail.",
  },
  {
    id: 'status',
    title: 'Status label',
    desc: 'Auto-approved, Needs your sign-off, or Always you — color-coded by who decides.',
  },
  {
    id: 'time',
    title: 'Timestamp',
    desc: 'Every decision is timestamped. Audit log is automatic, exportable, immutable.',
  },
  {
    id: 'decision',
    title: 'One-click decision',
    desc: 'Approve, decline, request changes, or escalate. Average approval takes 12 seconds.',
  },
]

export default function DecisionCardAnatomy() {
  const [active, setActive] = useState<FeatureId | null>(null)
  const ring = (id: FeatureId) =>
    active === id ? '0 0 0 2px var(--gold-dark), 0 8px 24px rgba(0,0,0,0.10)' : 'none'

  return (
    <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 80, maxWidth: 720 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>THE DECISION CARD</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              marginBottom: 24,
              lineHeight: 1.0,
            }}
          >
            Anatomy of a<br />decision-ready card.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 580 }}>
            No &ldquo;go investigate.&rdquo; The agent already did. Every card surfaces
            what you need to decide in 12 seconds.
          </p>
        </div>

        {/* Two-column: card + features */}
        <div
          className="anatomy-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >

          {/* ── Left: annotated card ── */}
          <div
            style={{
              position: 'sticky',
              top: 100,
              display: 'flex',
              justifyContent: 'center',
              padding: '40px 20px',
            }}
          >
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '20px 22px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                maxWidth: 420,
                width: '100%',
                position: 'relative',
              }}
            >
              {/* Top row: action + urgent */}
              <div
                onMouseEnter={() => setActive('action')}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginBottom: 10,
                  padding: '4px 6px',
                  margin: '-4px -6px 6px',
                  borderRadius: 8,
                  boxShadow: ring('action'),
                  transition: 'box-shadow 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2, lineHeight: 1.4 }}>
                    Offer for Maya Chen — Senior Engineer
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    $195k base · 0.18% equity · above band by 8%
                  </p>
                </div>
                <span
                  style={{
                    background: 'var(--gold-tint)',
                    color: 'var(--gold-dark)',
                    border: '1px solid var(--gold-light)',
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontSize: 10,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  URGENT
                </span>
              </div>

              {/* Rationale */}
              <p
                onMouseEnter={() => setActive('rationale')}
                onMouseLeave={() => setActive(null)}
                style={{
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                  marginBottom: 14,
                  padding: '6px 8px',
                  margin: '0 -8px 14px',
                  borderRadius: 8,
                  boxShadow: ring('rationale'),
                  transition: 'box-shadow 0.2s ease',
                  cursor: 'default',
                }}
              >
                Top candidate from 6-week search. Competing offer from Scale AI.
                Recommended: approve with justification filed to comp committee.
              </p>

              {/* Status + time row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                <span
                  onMouseEnter={() => setActive('status')}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    background: '#FEF2F2',
                    color: 'var(--color-red)',
                    borderRadius: 4,
                    padding: '2px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    boxShadow: ring('status'),
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  Always you
                </span>
                <span
                  onMouseEnter={() => setActive('time')}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    fontSize: 11,
                    color: 'var(--text-faint)',
                    marginLeft: 'auto',
                    padding: '2px 6px',
                    borderRadius: 4,
                    boxShadow: ring('time'),
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  8:14 AM
                </span>
              </div>

              {/* Action buttons */}
              <div
                onMouseEnter={() => setActive('decision')}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: '6px 8px',
                  margin: '0 -8px',
                  borderRadius: 10,
                  boxShadow: ring('decision'),
                  transition: 'box-shadow 0.2s ease',
                  cursor: 'default',
                }}
              >
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: 7,
                    border: 'none',
                    background: 'var(--text)',
                    color: 'var(--bg)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: 7,
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: feature list ── */}
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {FEATURES.map((f, i) => {
              const isActive = active === f.id
              return (
                <li
                  key={f.id}
                  onMouseEnter={() => setActive(f.id)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    padding: '22px 20px',
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === FEATURES.length - 1 ? '1px solid var(--border)' : 'none',
                    borderLeft: '2px solid',
                    borderLeftColor: isActive ? 'var(--gold-dark)' : 'transparent',
                    background: isActive ? 'var(--gold-tint)' : 'transparent',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? 'var(--gold-dark)' : 'var(--text-faint)',
                        letterSpacing: '0.08em',
                        flexShrink: 0,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                          fontSize: 22,
                          fontWeight: 500,
                          color: 'var(--text)',
                          margin: '0 0 6px',
                          letterSpacing: '-0.015em',
                          lineHeight: 1.2,
                        }}
                      >
                        {f.title}
                      </h3>
                      <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 880px) {
            .anatomy-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
