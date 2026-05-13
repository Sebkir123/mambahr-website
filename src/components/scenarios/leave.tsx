import type { Scenario } from './types'
import { Bubble, AgentBlock, btnPrimary, btnSecondary } from './_helpers'

const STEPS = [
  { at: 0,    state: 'msg-typing'      as const },
  { at: 1500, state: 'msg-sent'        as const },
  { at: 2200, state: 'agent-thinking'  as const },
  { at: 4000, state: 'agent-cites'     as const },
  { at: 5800, state: 'card-shown'      as const },
  { at: 8400, state: 'approved'        as const },
  { at: 10000, state: 'done'           as const },
]

function getStep(elapsedMs: number) {
  let current = STEPS[0].state
  for (const s of STEPS) {
    if (elapsedMs >= s.at) current = s.state
  }
  return current
}

export const leaveScenario: Scenario = {
  id: 'leave',
  label: 'Parental leave',
  durationMs: 12000,
  render: (elapsedMs) => {
    const step = getStep(elapsedMs)
    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          #people-ops · Slack
        </div>

        {/* Maria's message */}
        <Bubble author="Maria K." time="9:13 AM" visible={elapsedMs >= 0}>
          {step === 'msg-typing' ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>typing…</span>
          ) : (
            <>Hi! I&apos;m expecting in May — trying to figure out my leave options. We&apos;re based in California.</>
          )}
        </Bubble>

        {/* Agent thinking */}
        {elapsedMs >= 2200 && (
          <AgentBlock>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--gold-dark)' }}>Leave agent</strong> is working…
            </div>
            <Thinking step={step} />
          </AgentBlock>
        )}

        {/* Decision card */}
        {elapsedMs >= 5800 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              marginTop: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              maxWidth: 460,
              animation: 'mamba-card-in 0.4s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Parental leave — Maria K.</strong>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>9:14 AM</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 10 }}>
              Eligible: 14 months tenure, 1,400 hrs. <strong style={{ color: 'var(--text)' }}>12 wks FMLA + 8 wks CA CFRA = up to 20 weeks combined.</strong>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: '#FFF7ED', color: '#C2410C', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                Needs your sign-off
              </span>
            </div>
            {step !== 'approved' && step !== 'done' ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btnPrimary}>Approve</button>
                <button style={btnSecondary}>Decline</button>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: '#15803D', fontWeight: 600, margin: 0 }}>✓ Approved by Lisa K. · 9:14:08</p>
            )}
          </div>
        )}

        {/* Confirmation */}
        {step === 'done' && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, fontStyle: 'italic' }}>
            Maria notified. Calendar blocked. Benefits provider pinged. Done.
          </p>
        )}
      </div>
    )
  },
}

function Thinking({ step }: { step: string }) {
  const lines = [
    { label: 'reading leave policy…', done: step !== 'agent-thinking' },
    { label: 'checking eligibility (tenure, hours)…', done: ['agent-cites', 'card-shown', 'approved', 'done'].includes(step) },
    { label: 'citing FMLA + CA CFRA stacking rule', done: ['card-shown', 'approved', 'done'].includes(step) },
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