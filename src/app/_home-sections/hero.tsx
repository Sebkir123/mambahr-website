const todayCards = [
  {
    title: 'Offer for Maya Chen — Senior Engineer',
    subtitle: '$195k base · 0.18% equity · above band by 8%',
    rationale: 'Top candidate from 6-week search. Competing offer from Scale AI. Recommended: approve with justification filed.',
    status: 'always-you' as const,
    time: '8:14 AM',
    agent: 'Hiring agent',
    urgent: true,
  },
  {
    title: 'PTO approved — Emma Rodriguez',
    subtitle: 'Mon Apr 6 – Wed Apr 8 · 3 days',
    rationale: 'Within policy. Balance 12 → 9 days. Calendar and manager notified.',
    status: 'auto' as const,
    time: '9:02 AM',
    agent: 'Leave agent',
  },
]

const nav = [
  { label: 'Approvals', badge: '3', active: true },
  { label: 'People' },
  { label: 'Hiring' },
  { label: 'Time off' },
  { label: 'Compliance' },
  { label: 'Documents' },
]
const Dot = ({ c }: { c: string }) => <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />

export default function HeroSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-cream) 100%)', paddingTop: 168, paddingBottom: 0, overflow: 'hidden', position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-16%', left: '50%', transform: 'translateX(-50%)', width: 1100, height: 820, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(201,169,110,0.20) 0%, rgba(201,169,110,0) 62%)', pointerEvents: 'none' }} />

      {/* Centered copy — shapes.co restraint: huge headline, one CTA, big airy field */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1 className="hero-h1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(44px, 6.6vw, 100px)', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1.0, margin: '0 0 38px', whiteSpace: 'nowrap' }}>
          Your HR work, <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>automated.</span>
        </h1>
        <p style={{ fontSize: 'clamp(19px, 2.1vw, 23px)', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 560, margin: '0 auto 48px' }}>
          The work is handled. You approve only the calls that need a person.
        </p>
        <a href="/demo" className="btn-gold" style={{ fontSize: 16.5, padding: '18px 44px' }}>Request access →</a>
      </div>

      {/* Big product dashboard, centered, with side cards peeking in */}
      <div className="hero-stage" style={{ maxWidth: 1180, margin: '120px auto 0', padding: '0 24px 0', position: 'relative', zIndex: 1 }}>
        {/* left peek — Slack */}
        <div className="hero-peek hero-peek-l" style={{ position: 'absolute', left: -8, bottom: 60, width: 268, background: '#FFFFFF', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)', overflow: 'hidden', transform: 'rotate(-4deg)', zIndex: 3 }}>
          <div style={{ background: '#3F0E40', padding: '8px 13px', fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}># people-ops</div>
          <div style={{ padding: '12px 13px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text)', lineHeight: 1.45 }}><strong>Maya</strong> @mamba 3 days off next week? 🎉</p>
            <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text)', lineHeight: 1.45 }}><strong>Mamba</strong> <span style={{ color: '#15803D' }}>✓ Approved</span> · within policy</p>
          </div>
        </div>

        {/* right peek — compliance cite */}
        <div className="hero-peek hero-peek-r" style={{ position: 'absolute', right: -8, bottom: 96, width: 252, background: '#FFFFFF', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)', padding: '14px 16px', transform: 'rotate(4deg)', zIndex: 3 }}>
          <p style={{ margin: '0 0 7px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace' }}>Every decision cited</p>
          <p style={{ margin: '0 0 9px', fontSize: 12.5, color: 'var(--text)', lineHeight: 1.4, fontWeight: 500 }}>FMLA + CA CFRA stack — 24 weeks combined.</p>
          <div style={{ display: 'flex', gap: 5 }}>
            {['FMLA', 'CA CFRA'].map((r) => <span key={r} style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-faint)', borderRadius: 5, padding: '2px 7px', fontFamily: 'var(--font-mono), monospace' }}>{r}</span>)}
          </div>
        </div>

        {/* center — app dashboard */}
        <div className="hero-app" style={{ maxWidth: 860, margin: '0 auto', background: '#FFFFFF', borderRadius: '18px 18px 0 0', border: '1px solid var(--border)', borderBottom: 'none', boxShadow: 'var(--shadow-float), var(--sheen)', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
          <div style={{ background: 'var(--bg-surface)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
            <Dot c="#FF5F57" /><Dot c="#FEBC2E" /><Dot c="#28C840" />
            <span style={{ marginLeft: 10, fontSize: 11.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot c="#15803D" /><span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>live</span></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '176px 1fr' }}>
            <div className="hero-side" style={{ borderRight: '1px solid var(--border-faint)', padding: '16px 12px', background: 'var(--bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 14px' }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: '#1C1917', color: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif), serif', fontSize: 13 }}>M</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>MambaHR</span>
              </div>
              {nav.map((n) => (
                <div key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, marginBottom: 2, background: n.active ? 'var(--gold-tint)' : 'transparent' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: n.active ? 'var(--gold-dark)' : 'var(--border-mid)' }} />
                  <span style={{ fontSize: 13, fontWeight: n.active ? 600 : 500, color: n.active ? 'var(--gold-dark)' : 'var(--text-muted)' }}>{n.label}</span>
                  {n.badge && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: '#fff', background: 'var(--gold-dark)', borderRadius: 999, padding: '1px 7px' }}>{n.badge}</span>}
                </div>
              ))}
            </div>
            <div style={{ padding: '18px 18px 22px', background: 'var(--bg-warm)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif), serif', fontSize: 20, color: 'var(--text)', letterSpacing: '-0.01em' }}>Approvals</span>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>Tue · 9:14 AM</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '11px 13px' }}>
                  <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 28, color: '#15803D', margin: 0, lineHeight: 1 }}>14</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>auto-resolved overnight</p>
                </div>
                <div style={{ background: 'var(--gold-tint)', border: '1px solid var(--gold-light)', borderRadius: 10, padding: '11px 13px' }}>
                  <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 28, color: 'var(--gold-dark)', margin: 0, lineHeight: 1 }}>3</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>need your sign-off</p>
                </div>
              </div>
              {todayCards.map((c) => (
                <div key={c.title} style={{ background: '#FFFFFF', border: c.urgent ? '1px solid var(--gold-light)' : '1px solid var(--border)', borderRadius: 12, padding: '13px 15px', marginBottom: 10, boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 5 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{c.title}</p>
                    <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', borderRadius: 5, padding: '2px 7px', background: c.urgent ? 'var(--gold-tint)' : '#F0FDF4', color: c.urgent ? 'var(--gold-dark)' : '#15803D' }}>{c.urgent ? 'NEEDS YOU' : 'AUTO'}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-muted)' }}>{c.subtitle}</p>
                  {c.urgent && (
                    <div style={{ display: 'flex', gap: 7, marginTop: 10 }}>
                      <span style={{ flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7, background: '#1C1917', color: '#fff', fontSize: 11.5, fontWeight: 600 }}>Approve</span>
                      <span style={{ flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7, border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 11.5, fontWeight: 500 }}>Decline</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .hero-h1 { white-space: normal !important; }
        }
        @media (max-width: 860px) {
          .hero-peek { display: none !important; }
        }
        @media (max-width: 560px) {
          .hero-side { display: none !important; }
          .hero-app > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export { todayCards }
