import { Beat, Page } from '@/components/ui/page'

const cardBase: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  padding: 22,
  boxShadow: 'var(--shadow-sm)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}
const label: React.CSSProperties = {
  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
  color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: '0 0 14px',
}

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="var(--green)" />
    <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function BentoSection() {
  return (
    <Beat bg="warm">
      <Page>
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>The whole department, in one agent</p>
          <h2 className="t-h2" style={{ margin: '0 0 16px' }}>
            Everything your People team does — <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>handled.</em>
          </h2>
          <p className="t-lead" style={{ margin: 0 }}>
            Requests come in where your team already works. The agent does the work and brings you only the calls that need a person.
          </p>
        </div>

        <div className="bento">
          {/* A — Resolved in Slack (big) */}
          <div className="b-slack" style={{ ...cardBase, gridColumn: '1 / 7', gridRow: '1 / 3', padding: 0 }}>
            <div style={{ background: '#3F0E40', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}># people-ops</span>
              <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>resolved · 4s</span>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              <p style={label}>Answered in Slack, in seconds</p>
              <div style={{ display: 'flex', gap: 11 }}>
                <span style={{ width: 30, height: 30, borderRadius: 7, background: '#D4C4B5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#57534E' }}>MC</span>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}><strong>Maya Chen</strong>&nbsp;&nbsp;@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉</p>
              </div>
              <div style={{ display: 'flex', gap: 11 }}>
                <span style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--text)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--gold-light)', fontSize: 13, fontFamily: 'var(--font-serif), serif', fontWeight: 700 }}>M</span>
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}><strong>Mamba</strong> &nbsp;Approved — enjoy the wedding 🎉</p>
                  <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-faint)', borderRadius: 10, padding: '11px 14px', fontSize: 12.5, lineHeight: 1.8, color: 'var(--text-muted)' }}>
                    <div><strong style={{ color: 'var(--text)' }}>Balance</strong> · 12 → 9 days</div>
                    <div><strong style={{ color: 'var(--text)' }}>Calendar</strong> · Apr 7–9 blocked · OOO set</div>
                    <div><strong style={{ color: 'var(--text)' }}>Manager</strong> · notified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B — Morning approvals queue */}
          <div className="b-queue" style={{ ...cardBase, gridColumn: '7 / 13', gridRow: '1 / 2' }}>
            <p style={label}>Your morning queue · 3 items</p>
            <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 16, background: 'var(--bg)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>Offer for Maya Chen — Senior Engineer</p>
                <span style={{ background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 5, padding: '2px 8px', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>URGENT</span>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 12.5, color: 'var(--text-muted)' }}>$195k base · 0.18% equity · above band 8%</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 7, background: '#1C1917', color: '#fff', fontSize: 12, fontWeight: 600 }}>Approve</span>
                <span style={{ flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 7, border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}>Decline</span>
              </div>
            </div>
          </div>

          {/* C — stat: 30 min (gold-tint) */}
          <div className="b-stat-gold" style={{ ...cardBase, gridColumn: '7 / 10', gridRow: '2 / 3', background: 'linear-gradient(160deg, var(--gold-tint) 0%, #FFFFFF 80%)', borderColor: 'var(--gold-light)', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 'clamp(34px, 4vw, 46px)', fontWeight: 400, color: 'var(--gold-dark)', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 8px' }}>30 min</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>a morning, on the calls that need you</p>
          </div>

          {/* D — stat: 1 day (dark) */}
          <div className="b-stat-dark" style={{ ...cardBase, gridColumn: '10 / 13', gridRow: '2 / 3', background: '#15110D', borderColor: 'rgba(255,255,255,0.08)', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 'clamp(34px, 4vw, 46px)', fontWeight: 400, color: 'var(--gold-light)', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 8px' }}>1 day</p>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(251,247,240,0.6)', lineHeight: 1.4 }}>to migrate from your current HRIS</p>
          </div>

          {/* E — compliance cited */}
          <div className="b-comp" style={{ ...cardBase, gridColumn: '1 / 5', gridRow: '3 / 4' }}>
            <p style={label}>Every decision cited</p>
            <p style={{ margin: '0 0 14px', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.5, fontWeight: 500 }}>FMLA + CA CFRA stack — approve up to 24 weeks combined.</p>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 'auto' }}>
              {['FMLA', 'CA CFRA', 'DLSE 7-2024'].map((r) => (
                <span key={r} style={{ fontSize: 11.5, color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-faint)', borderRadius: 6, padding: '4px 9px', fontFamily: 'var(--font-mono), monospace' }}>{r}</span>
              ))}
            </div>
          </div>

          {/* F — onboarding */}
          <div className="b-onb" style={{ ...cardBase, gridColumn: '5 / 9', gridRow: '3 / 4' }}>
            <p style={label}>Day one, ready before they arrive</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Offer signed (DocuSign)', 'I-9 + E-Verify cleared', 'Accounts + device provisioned', 'Buddy + first-week calendar'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Check /><span style={{ fontSize: 13.5, color: 'var(--text)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* G — works everywhere (gold-tint) */}
          <div className="b-where" style={{ ...cardBase, gridColumn: '9 / 13', gridRow: '3 / 4', background: 'linear-gradient(160deg, var(--gold-tint) 0%, #FFFFFF 85%)', borderColor: 'var(--gold-light)' }}>
            <p style={label}>Works where you work</p>
            <p style={{ margin: '0 0 16px', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.5, fontWeight: 500 }}>Slack, Microsoft Teams, email, and the web — one agent, one record.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
              {['Slack', 'Teams', 'Email', 'Web'].map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', background: '#FFFFFF', border: '1px solid var(--gold-light)', borderRadius: 999, padding: '5px 12px' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Page>

      <style>{`
        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(160px, auto);
          gap: 16px;
        }
        @media (max-width: 920px) {
          .bento { grid-template-columns: repeat(2, 1fr); }
          .bento > div { grid-column: auto !important; grid-row: auto !important; }
          .b-slack { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 560px) {
          .bento { grid-template-columns: 1fr; }
        }
      `}</style>
    </Beat>
  )
}
