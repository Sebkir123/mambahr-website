export default function BeforeAfter() {
  return (
    <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          The difference
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 48 }}>
          What changes when the agent runs.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
          {/* Without */}
          <div style={{
            padding: 32,
            borderRadius: 14,
            backgroundColor: 'rgba(17,17,19,0.4)',
            border: '1px solid var(--border-mid)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: 'var(--text-faint)', opacity: 0.3 }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              Without MambaHR
            </p>
            {[
              { task: 'PTO request comes in', time: '15 min back-and-forth' },
              { task: 'New hire starts Monday', time: '6 hours of setup' },
              { task: 'Policy question from employee', time: '30 min to research + respond' },
              { task: 'Quarterly reporting', time: '2 full days of pulling data' },
              { task: 'Something falls through the cracks', time: 'Inevitable' },
            ].map((item, i) => (
              <div key={item.task} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.task}</span>
                <span style={{ fontSize: 12, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', whiteSpace: 'nowrap', marginLeft: 16 }}>{item.time}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: '16px 0', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-faint)', letterSpacing: '-0.03em' }}>40%</span>
              <p style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 4 }}>of your team&apos;s time on admin</p>
            </div>
          </div>

          {/* With */}
          <div style={{
            padding: 32,
            borderRadius: 14,
            backgroundColor: 'rgba(17,17,19,0.4)',
            border: '1px solid rgba(176,141,87,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), rgba(176,141,87,0.3), transparent)' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-mono), monospace' }}>
              With MambaHR
            </p>
            {[
              { task: 'PTO request comes in', time: '4.2 seconds' },
              { task: 'New hire starts Monday', time: 'Already handled' },
              { task: 'Policy question from employee', time: 'Instant, cited answer' },
              { task: 'Quarterly reporting', time: 'Auto-generated' },
              { task: 'Something falls through the cracks', time: 'Never' },
            ].map((item, i) => (
              <div key={item.task} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text)' }}>{item.task}</span>
                <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-mono), monospace', whiteSpace: 'nowrap', marginLeft: 16 }}>{item.time}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: '16px 0', borderTop: '1px solid rgba(176,141,87,0.15)' }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--gold)', letterSpacing: '-0.03em' }}>200 hrs</span>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>per quarter back to your team</p>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            That&apos;s 5 full work weeks every quarter. Enough to run a culture initiative,
            build a mentorship program, or actually talk to your people.
          </p>
        </div>
      </div>
    </section>
  )
}
