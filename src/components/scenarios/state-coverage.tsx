'use client'

import type { Scenario } from './types'

const STATE_CODES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const CAVEAT_STATES = ['NY', 'MA', 'CA'] as const

const CAVEATS: { code: string; text: string }[] = [
  { code: 'NY', text: 'NY · paid leave overlap (Labor §196-b)' },
  { code: 'MA', text: 'MA · earned sick time stack (M.G.L. c.149 §148C)' },
  { code: 'CA', text: 'CA · accrual cap exceeded (Labor §246)' },
]

const TICK_START = 800
const TICK_DURATION = 5800
const CAVEATS_AT = 7400
const FOOTER_AT = 9400

export const stateCoverageScenario: Scenario = {
  id: 'state-coverage',
  label: 'Multi-state',
  durationMs: 12000,
  render: (elapsedMs) => {
    const tickProgress = Math.max(0, Math.min(1, (elapsedMs - TICK_START) / TICK_DURATION))
    const filledCount = Math.floor(tickProgress * STATE_CODES.length)
    const caveatsVisible = elapsedMs >= CAVEATS_AT
    const footerVisible = elapsedMs >= FOOTER_AT

    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        {/* Trigger */}
        <div
          style={{
            background: 'var(--bg-warm)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--gold-dark)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--gold-dark)', fontWeight: 700 }}>
            New PTO policy
          </span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>multi-state rollout</span>
        </div>

        {/* Agent header */}
        {elapsedMs >= 500 && (
          <div style={{ marginBottom: 10, fontSize: 11, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold-dark)' }}>compliance.agent</strong> · checking 50 state rules…
          </div>
        )}

        {/* Grid */}
        {elapsedMs >= 500 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: 4,
              maxWidth: 320,
              marginBottom: 16,
            }}
          >
            {STATE_CODES.map((code, i) => {
              const filled = i < filledCount
              const isCaveat = (CAVEAT_STATES as readonly string[]).includes(code)
              const bg = !filled ? '#E7E5E4' : isCaveat ? '#F97316' : '#15803D'
              const color = filled ? '#FFFFFF' : '#A8A29E'
              return (
                <div
                  key={code}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    minHeight: 24,
                    background: bg,
                    color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono), monospace',
                    borderRadius: 3,
                    transition: 'background-color 0.25s ease, color 0.25s ease',
                  }}
                >
                  {code}
                </div>
              )
            })}
          </div>
        )}

        {/* Caveats */}
        {caveatsVisible && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 12,
              maxWidth: 520,
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              animation: 'mamba-card-in 0.35s ease-out',
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>
              3 caveats need your review
            </div>
            {CAVEATS.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  padding: '6px 0',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                  fontSize: 12,
                  color: 'var(--text)',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', marginTop: 6, flexShrink: 0 }} />
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {footerVisible && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
            47 ✓ · 3 with caveats · ready for your review.
          </p>
        )}
      </div>
    )
  },
}
