'use client'

import type { Scenario } from './types'

export const complianceQaScenario: Scenario = {
  id: 'compliance-qa',
  label: 'Compliance Q&A',
  durationMs: 9000,
  render: (elapsedMs) => {
    const msgVisible = elapsedMs >= 0
    const agentThinking = elapsedMs >= 1200
    const comparisonVisible = elapsedMs >= 2800
    const followupVisible = elapsedMs >= 6000

    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          #people-ops · Slack
        </div>

        {/* Emma's question */}
        <Bubble author="Emma R." time="11:04 AM" visible={msgVisible}>
          What&apos;s our PTO accrual in TX vs CA?
        </Bubble>

        {/* Agent thinking (brief) */}
        {agentThinking && !comparisonVisible && (
          <div style={{ marginLeft: 38, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', marginBottom: 10 }}>
            <strong style={{ color: 'var(--gold-dark)' }}>compliance.agent</strong> · reading state policies…
          </div>
        )}

        {/* Comparison panel */}
        {comparisonVisible && (
          <div style={{ marginLeft: 38, marginBottom: 14, animation: 'mamba-card-in 0.35s ease-out' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>
              <strong style={{ color: 'var(--gold-dark)' }}>compliance.agent</strong> · answered in 2.7s
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                maxWidth: 560,
              }}
            >
              <StateCard
                code="TX"
                label="Texas"
                rules={[
                  'No state accrual mandate',
                  'Company policy: 15 days / yr',
                  'Use-it-or-lose-it allowed',
                  'No payout on termination required',
                ]}
                citation="TX Labor §61.001"
              />
              <StateCard
                code="CA"
                label="California"
                rules={[
                  'Vested wages — cannot expire',
                  'Company policy: 15 days / yr',
                  'Accrual cap allowed (≥1.75x annual)',
                  'Payout on termination required',
                ]}
                citation="CA Labor §227.3"
              />
            </div>
          </div>
        )}

        {/* Followup prompt */}
        {followupVisible && (
          <div
            style={{
              marginLeft: 38,
              padding: '12px 14px',
              background: 'var(--bg-warm)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              maxWidth: 560,
              animation: 'mamba-card-in 0.35s ease-out',
            }}
          >
            <p style={{ margin: '0 0 10px 0', fontSize: 13, color: 'var(--text)' }}>
              Want me to update the policy doc with these citations?
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={btnPrimary}>Update doc</button>
              <button style={btnSecondary}>Not now</button>
            </div>
          </div>
        )}
      </div>
    )
  },
}

function StateCard({ code, label, rules, citation }: { code: string; label: string; rules: string[]; citation: string }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <strong style={{ fontSize: 16, color: 'var(--gold-dark)' }}>{code}</strong>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {rules.map((r, i) => (
          <li key={i} style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, padding: '3px 0' }}>
            · {r}
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
        {citation}
      </div>
    </div>
  )
}

function Bubble({ author, time, visible, children }: { author: string; time: string; visible: boolean; children: React.ReactNode }) {
  if (!visible) return null
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#E5D8C3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 11, color: '#6B5638' }}>
        {author.split(' ').map((s) => s[0]).join('').slice(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 2 }}>
          <strong style={{ fontSize: 12, color: 'var(--text)' }}>{author}</strong>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 8 }}>{time}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>{children}</p>
      </div>
    </div>
  )
}

const btnPrimary: React.CSSProperties = { background: '#1C1917', color: '#FFFFFF', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
const btnSecondary: React.CSSProperties = { background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }
