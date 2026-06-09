import Image from 'next/image'

export default function WhereItLivesSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div data-animate style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 600 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>WORKS WHERE YOU WORK</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                margin: '0 0 14px',
                lineHeight: 1.1,
              }}
            >
              Slack, Teams, or the web.<br />Same answer everywhere.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
              The agent works in the tools your team already uses — one shared memory and one record of everything, everywhere.
            </p>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>same employee · all 3 surfaces</span>
          </div>
        </div>

        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

          {/* ── SLACK MOCKUP — full chrome ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)' }}>
            {/* Slack purple header */}
            <div style={{ background: '#3F0E40', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image src="/slack-new-logo.svg" alt="Slack" width={16} height={16} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>mambahr-team</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>3 online</span>
            </div>
            {/* Channel header */}
            <div style={{ padding: '10px 18px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>#</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>people-ops</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-faint)' }}>12 members</span>
            </div>
            {/* Thread */}
            <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: '#D4C4B5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#57534E' }}>MC</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Maya Chen</span>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  <Image src="/MambaHR_logo.png" alt="Mamba" width={26} height={26} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Mamba</span>
                    <span style={{ fontSize: 9, fontWeight: 600, background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 3, padding: '1px 5px' }}>APP</span>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.5 }}>Approved — enjoy the wedding 🎉</p>
                  <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '8px 10px', fontSize: 11, lineHeight: 1.7, border: '1px solid var(--border-faint)' }}>
                    <p style={{ margin: '0 0 1px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Balance:</strong> 12 → 9 days</p>
                    <p style={{ margin: '0 0 1px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Calendar:</strong> Apr 7–9 blocked</p>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Manager:</strong> notified</p>
                  </div>
                  {/* Reactions */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                    <span style={{ fontSize: 10, padding: '2px 7px', background: '#EDF2F7', borderRadius: 12, border: '1px solid #E2E8F0' }}>🎉 3</span>
                    <span style={{ fontSize: 10, padding: '2px 7px', background: '#EDF2F7', borderRadius: 12, border: '1px solid #E2E8F0' }}>✅ 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── TEAMS MOCKUP — proper Teams chrome ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)' }}>
            {/* Teams purple header */}
            <div style={{ background: '#4B53BC', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image src="/Microsoft_Symbol_0.svg" alt="Microsoft Teams" width={16} height={16} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>Microsoft Teams</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>People Ops &gt; Approvals</span>
            </div>
            {/* Teams body */}
            <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Mamba bot message preamble */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  <Image src="/MambaHR_logo.png" alt="Mamba" width={24} height={24} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Mamba</span>
                    <span style={{ fontSize: 9, fontWeight: 600, background: '#EFEEFC', color: '#4B53BC', borderRadius: 3, padding: '1px 5px' }}>BOT</span>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                  </div>
                  {/* Adaptive card */}
                  <div style={{ background: '#FFFFFF', borderLeft: '4px solid #4B53BC', borderRadius: '0 10px 10px 0', padding: '12px 14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--border-faint)' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#4B53BC', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>Time-off request · auto-approved</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>Maya Chen · 3 days</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 10px', lineHeight: 1.5 }}>Apr 7–9 · within policy · balance 12 → 9 days</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 0', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', margin: '0 0 10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text-faint)' }}>Manager</span>
                        <span style={{ color: 'var(--text)', fontWeight: 500 }}>B. Bell · notified</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text-faint)' }}>Calendar</span>
                        <span style={{ color: 'var(--text)', fontWeight: 500 }}>blocked · OOO set</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                        <span style={{ color: 'var(--text-faint)' }}>Audit ref</span>
                        <span style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>act_4f81a2</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ background: '#4B53BC', color: '#FFFFFF', border: 'none', borderRadius: 4, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>View details</button>
                      <button style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '6px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>Override</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── WEB APP MOCKUP — rich dashboard ── */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)' }}>
            {/* App chrome — looks like macOS browser window */}
            <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-faint)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
              <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
            </div>
            {/* Top nav bar */}
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Image src="/MambaHR_logo.png" alt="MambaHR" width={18} height={18} style={{ display: 'block', objectFit: 'contain', borderRadius: 4 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Today</span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>live</span>
              </span>
            </div>
            {/* Body */}
            <div style={{ padding: '14px 16px', flex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>Tuesday morning</p>

              {/* Maya's leave request — glow because it just happened */}
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="#22C55E"/><path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Auto-resolved · 9:14 AM</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', margin: '0 0 2px' }}>Maya Chen · 3 days off</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Apr 7–9 · within policy</p>
              </div>

              {/* Approval queue */}
              <div style={{ background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Need your approval</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold-dark)', background: '#FFFFFF', borderRadius: 12, padding: '1px 8px' }}>3</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Maya offer above band · Q2 review packet · Tom PIP draft</p>
              </div>

              {/* Stats footer */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingTop: 10, borderTop: '1px solid var(--border-faint)' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: '#15803D', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>14</p>
                  <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: '2px 0 0' }}>Auto-resolved overnight</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: 'var(--text-muted)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>02</p>
                  <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: '2px 0 0' }}>Awaiting employee</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
