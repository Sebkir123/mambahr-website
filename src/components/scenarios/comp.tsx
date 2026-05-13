import type { Scenario } from './types'
import { Bubble, AgentBlock, btnPrimary, btnSecondary } from './_helpers'

const STEPS = [
  { at: 0,    state: 'msg-typing'      as const },
  { at: 1500, state: 'msg-sent'        as const },
  { at: 2300, state: 'agent-thinking'  as const },
  { at: 4200, state: 'agent-market'    as const },
  { at: 5800, state: 'agent-stacking'  as const },
  { at: 7200, state: 'card-shown'      as const },
]

function getStep(elapsedMs: number) {
  let current = STEPS[0].state
  for (const s of STEPS) {
    if (elapsedMs >= s.at) current = s.state
  }
  return current
}

export const compScenario: Scenario = {
  id: 'comp',
  label: 'Comp adjustment',
  durationMs: 10000,
  render: (elapsedMs) => {
    const step = getStep(elapsedMs)
    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          Private message · #people-ops
        </div>

        {/* Priya's message */}
        <Bubble author="Priya S." time="3:42 PM" visible={elapsedMs >= 0}>
          {step === 'msg-typing' ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>typing…</span>
          ) : (
            <>Can we promote Alex to senior, $145K?</>
          )}
        </Bubble>

        {/* Agent thinking */}
        {elapsedMs >= 2300 && (
          <AgentBlock>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--gold-dark)' }}>Comp agent</strong> is working…
            </div>
            <Thinking step={step} />
          </AgentBlock>
        )}

        {/* Decision card */}
        {elapsedMs >= 7200 && (
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
              <strong style={{ fontSize: 14 }}>Promote Alex to Senior · $145K</strong>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>3:43 PM</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>
              <div>· Market: <strong style={{ color: 'var(--text)' }}>$138K–$152K median</strong> (Levels.fyi · Radford 2025 Q2)</div>
              <div>· Salary band: <strong style={{ color: '#15803D' }}>within range</strong> (Senior: $135K–$165K)</div>
              <div>· <span style={{ color: '#B45309', fontWeight: 600 }}>Stacks with $8K merit increase 3 mos ago — total 16% YoY</span></div>
              <div>· Last review: <strong style={{ color: 'var(--text)' }}>Exceeds expectations</strong></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: '#FFF7ED', color: '#C2410C', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                Needs your sign-off
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={btnPrimary}>Approve</button>
              <button style={btnSecondary}>Decline</button>
            </div>
          </div>
        )}
      </div>
    )
  },
}

function Thinking({ step }: { step: string }) {
  const lines = [
    { label: 'pulling market data (Levels.fyi · Radford 2025 Q2)…', done: ['agent-market', 'agent-stacking', 'card-shown'].includes(step) },
    { label: 'checking salary band: Senior $135K–$165K — within band', done: ['agent-stacking', 'card-shown'].includes(step) },
    { label: 'flagging: stacks with $8K merit 3 mos ago (16% YoY)', done: step === 'card-shown' },
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
