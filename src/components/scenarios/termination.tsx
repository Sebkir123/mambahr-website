import type { Scenario } from './types'
import { Bubble, AgentBlock, btnPrimary, btnSecondary } from './_helpers'

const STEPS = [
  { at: 0,    state: 'msg-typing'     as const },
  { at: 1600, state: 'msg-sent'       as const },
  { at: 2400, state: 'agent-thinking' as const },
  { at: 4200, state: 'agent-drafting' as const },
  { at: 6000, state: 'card-shown'     as const },
  { at: 9200, state: 'approved'       as const },
  { at: 10200, state: 'done'          as const },
]

function getStep(elapsedMs: number) {
  let current = STEPS[0].state
  for (const s of STEPS) {
    if (elapsedMs >= s.at) current = s.state
  }
  return current
}

export const terminationScenario: Scenario = {
  id: 'termination',
  label: 'Termination',
  durationMs: 11000,
  render: (elapsedMs) => {
    const step = getStep(elapsedMs)
    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          Private message · confidential
        </div>

        {/* Sarah's message */}
        <Bubble author="Sarah B." time="2:14 PM" visible={elapsedMs >= 0}>
          {step === 'msg-typing' ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>typing…</span>
          ) : (
            <>Need to let go of Jamie W. after PIP — what next?</>
          )}
        </Bubble>

        {/* Agent thinking */}
        {elapsedMs >= 2400 && (
          <AgentBlock>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--gold-dark)' }}>Offboarding agent</strong> is working with care…
            </div>
            <Thinking step={step} />
          </AgentBlock>
        )}

        {/* Decision card */}
        {elapsedMs >= 6000 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              marginTop: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              maxWidth: 480,
              animation: 'mamba-card-in 0.4s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Separation packet — Jamie W.</strong>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>2:15 PM</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>
              <div>· Final pay calculated: <strong style={{ color: 'var(--text)' }}>$8,420.18</strong> (PTO payout + prorated salary)</div>
              <div>· State-compliant notice drafted</div>
              <div>· <span style={{ color: '#B45309', fontWeight: 600 }}>CA: final pay due same day of termination (Labor §201)</span></div>
              <div>· Severance: 4 weeks per company policy</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: '#FEF2F2', color: '#991B1B', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                Always you
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>This decision never auto-resolves.</span>
            </div>
            {step !== 'approved' && step !== 'done' ? (
              <>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontStyle: 'italic' }}>
                  [Awaiting your sign-off]
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={btnPrimary}>Approve & send</button>
                  <button style={btnSecondary}>Edit packet</button>
                </div>
              </>
            ) : (
              <p style={{ fontSize: 12, color: '#15803D', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                ✓ Approved by Sarah B. — separation packet sent to HR + legal. Final pay queued. Effective Friday.
              </p>
            )}
          </div>
        )}
      </div>
    )
  },
}

function Thinking({ step }: { step: string }) {
  const lines = [
    { label: 'reviewing PIP documentation + tenure…', done: step !== 'agent-thinking' },
    { label: 'calculating final pay (PTO, prorated salary)…', done: ['agent-drafting', 'card-shown', 'approved', 'done'].includes(step) },
    { label: 'drafting state-compliant separation notice', done: ['card-shown', 'approved', 'done'].includes(step) },
  ]
  return (
    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
      {lines.map((l, i) => (
        <div key={i}>
          <span style={{ color: l.done ? '#15803D' : 'var(--text-faint)' }}>{l.done ? '✓ ' : '· '}</span>
          {l.label}
        </div>
      ))}
    </div>
  )
}
