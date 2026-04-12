export default function ProductDemo() {
  const steps = [
    { time: '0.0s', label: 'Inbound', text: 'Sarah submits a PTO request for 5 days', color: 'var(--text-muted)' },
    { time: '0.8s', label: 'Policy', text: 'Checked: 14 days remaining, no blackout conflict', color: 'var(--text-muted)' },
    { time: '1.4s', label: 'Verify', text: 'Policy checked — auto-approve eligible per company rules', color: 'var(--green)' },
    { time: '2.1s', label: 'Action', text: 'Updated Gusto payroll + Google Calendar', color: 'var(--text-muted)' },
    { time: '3.8s', label: 'Notify', text: 'Sarah and her manager notified. Calendar updated.', color: 'var(--text-muted)' },
    { time: '4.2s', label: 'Done', text: 'Leave approved. No human touched it.', color: 'var(--green)' },
  ]

  return (
    <section id="product" style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          How it works
        </p>
        <h2

          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 12 }}
        >
          4.2 seconds. Zero humans.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 48, maxWidth: 480 }}>
          Watch MambaHR handle a PTO request — start to finish, autonomously.
        </p>

        <div
          style={{
            backgroundColor: 'var(--bg)',
            borderRadius: 12,
            border: '1px solid var(--border-mid)',
            padding: 32,
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.time}
    
              className="flex"
              style={{
                gap: 16,
                padding: '12px 0',
                borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                alignItems: 'baseline',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span style={{ fontSize: 12, color: 'var(--text-faint)', minWidth: 40, fontVariantNumeric: 'tabular-nums' }}>
                {step.time}
              </span>
              <span style={{ fontSize: 12, color: 'var(--gold)', minWidth: 80, fontWeight: 500 }}>
                {step.label}
              </span>
              <span style={{ fontSize: 13, color: step.color, lineHeight: 1.5 }}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
