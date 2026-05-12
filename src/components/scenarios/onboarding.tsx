import type { Scenario } from './types'

type ChecklistItem = {
  at: number
  label: string
  meta: string
  time: string
}

const ITEMS: ChecklistItem[] = [
  { at: 1200, label: 'Offer letter generated + countersigned', meta: 'DocuSign · template v4.2', time: '9:02 AM' },
  { at: 2400, label: 'I-9 filed with E-Verify', meta: 'USCIS · case opened', time: '9:03 AM' },
  { at: 3800, label: 'MacBook Pro 14" ordered', meta: 'Apple Business · ships Thu', time: '9:04 AM' },
  { at: 5200, label: 'Google Workspace + Slack + GitHub provisioned', meta: 'SSO synced · alex.p@', time: '9:05 AM' },
  { at: 6600, label: 'Onboarding buddy assigned: Sam K.', meta: 'eng · same time zone', time: '9:06 AM' },
  { at: 8000, label: 'First-week calendar invites sent', meta: '11 meetings · Mon–Fri', time: '9:07 AM' },
]

export const onboardingScenario: Scenario = {
  id: 'onboarding',
  label: 'Onboarding',
  durationMs: 11000,
  render: (elapsedMs) => {
    const triggerVisible = elapsedMs >= 0
    const agentVisible = elapsedMs >= 700
    const footerVisible = elapsedMs >= 9200

    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          Greenhouse · candidate signal
        </div>

        {/* Trigger */}
        {triggerVisible && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: 14,
              padding: '10px 12px',
              background: 'var(--bg-warm)',
              borderLeft: '2px solid var(--gold-dark)',
              borderRadius: '0 6px 6px 0',
            }}
          >
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>
              <strong>Alex P.</strong> accepted offer — Senior Engineer · starts Monday
            </div>
          </div>
        )}

        {/* Agent header */}
        {agentVisible && (
          <div style={{ marginBottom: 10, fontSize: 11, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold-dark)' }}>hiring.agent</strong> is orchestrating Day 1 setup…
          </div>
        )}

        {/* Checklist */}
        {agentVisible && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              maxWidth: 540,
            }}
          >
            {ITEMS.map((item, i) => {
              const done = elapsedMs >= item.at
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    borderBottom: i < ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
                    opacity: done ? 1 : 0.35,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: done ? '#15803D' : 'transparent',
                      border: done ? 'none' : '1.5px solid var(--border)',
                      color: '#FFFFFF',
                      fontSize: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                      fontWeight: 700,
                    }}
                  >
                    {done ? '✓' : ''}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', marginTop: 2 }}>{item.meta}</div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', flexShrink: 0, marginTop: 2 }}>
                    {done ? item.time : '—'}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        {footerVisible && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, fontStyle: 'italic' }}>
            Day 1 setup complete in 4m 12s. Alex starts Monday.
          </p>
        )}
      </div>
    )
  },
}
