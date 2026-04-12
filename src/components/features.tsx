export default function Capabilities() {
  const features = [
    {
      num: '01',
      title: 'Leave & Time Off',
      hook: 'Request in. Resolved. No one touched a form.',
      details: [
        'Automatically checks eligibility, remaining balance, and blackout dates',
        'Routes approvals based on your company policy — or auto-approves when thresholds are met',
        'Updates payroll, calendars, and notifies the right people',
      ],
      result: 'What used to take 15 minutes of back-and-forth takes 4 seconds.',
    },
    {
      num: '02',
      title: 'Zero-Touch Onboarding',
      hook: 'Day 1 ready before the hire walks in.',
      details: [
        'Contracts generated and sent for signature automatically',
        'Equipment ordered, access provisioned, accounts created',
        'Buddy assigned, onboarding schedule built, welcome message queued',
      ],
      result: 'Your HR team used to spend 6 hours per new hire on setup. Now it\'s zero.',
    },
    {
      num: '03',
      title: 'Offboarding & Transitions',
      hook: 'Exits handled with the same precision as entries.',
      details: [
        'Access revoked across all systems — SSO, email, Slack, cloud — within minutes',
        'Equipment return tracked, final pay calculated, benefits termination scheduled',
        'Knowledge transfer docs generated and handoff meetings auto-scheduled',
      ],
      result: 'No more "wait, does the ex-employee still have access to our Stripe?" moments.',
    },
    {
      num: '04',
      title: 'Change Management',
      hook: 'RIFs, reorgs, and role changes. The hardest work in HR.',
      details: [
        'Manages the operational complexity of workforce restructuring end-to-end',
        'Generates notification letters, severance calculations, and benefits continuation',
        'Tracks every action for audit and ensures nothing falls through the cracks',
      ],
      result: 'Your team focuses on the human side. The agent handles the operational side.',
    },
    {
      num: '05',
      title: 'Risk & Policy',
      hook: 'Problems flagged before they become lawsuits.',
      details: [
        'Monitors policy changes and flags when your handbook is out of date',
        'Catches errors in PTO calculations, pay equity gaps, and missing documentation',
        'Keeps an auditable trail of every decision the agent makes',
      ],
      result: 'The stuff that keeps HR leaders up at night — handled quietly, in the background.',
    },
  ]

  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          What the agent does
        </p>
        <h2

          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-dark)', marginBottom: 16 }}
        >
          From the first offer letter to the hardest quarter.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', marginBottom: 56, maxWidth: 520 }}>
          MambaHR doesn&apos;t organize your busywork into a prettier dashboard. It does the work.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {features.map((f, i) => (
            <div
              key={f.num}
    
              className="card-hover"
              style={{
                backgroundColor: 'var(--bg-light-surface)',
                borderRadius: 14,
                padding: 0,
                border: '1px solid var(--border-light)',
                transitionDelay: `${i * 60}ms`,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Gold left accent */}
              <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 2, borderRadius: 1, backgroundColor: 'var(--gold)', opacity: 0.4 }} />

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0 }}>
                {/* Left — title + hook */}
                <div style={{ padding: '32px 32px 32px 44px' }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>
                    {f.num}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', margin: '12px 0 8px', letterSpacing: '-0.01em' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--text-dark)', lineHeight: 1.5, fontWeight: 500 }}>
                    {f.hook}
                  </p>
                </div>

                {/* Right — details + result */}
                <div className="md:border-l" style={{ padding: '32px 32px 32px 24px', borderColor: 'var(--border-light)' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                    {f.details.map((d) => (
                      <li key={d} className="flex" style={{ gap: 10, marginBottom: 8, alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--gold)', fontSize: 10, flexShrink: 0, marginTop: 4 }}>&#9679;</span>
                        <span style={{ fontSize: 13, color: 'var(--text-dark-muted)', lineHeight: 1.5 }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 13, color: 'var(--text-dark)', fontWeight: 600, fontStyle: 'italic' }}>
                    {f.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
