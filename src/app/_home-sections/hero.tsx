import Link from 'next/link'
import TodayCard from '@/components/surfaces/today-card'
import EmployeeDirectory from '@/components/surfaces/employee-directory'

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
  { label: 'Employee records' },
  { label: 'Hiring & ATS' },
  { label: 'Time off & leave' },
  { label: 'Performance' },
  { label: 'Compliance' },
  { label: 'Documents' },
]

const Dot = ({ c }: { c: string }) => <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />

export default function HeroSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-cream) 100%)', paddingTop: 160, paddingBottom: 0, overflow: 'hidden', position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-16%', left: '50%', transform: 'translateX(-50%)', width: 1100, height: 820, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(201,169,110,0.20) 0%, rgba(201,169,110,0) 62%)', pointerEvents: 'none' }} />

      {/* Centered copy — shapes.co restraint */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p className="eyebrow" style={{ marginBottom: 18 }}>THE AI HR DEPARTMENT</p>
        <h1 className="hero-h1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(56px, 7.5vw, 88px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.05, margin: '0 0 24px' }}>
          Your HR work, <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>automated.</span>
        </h1>
        <p style={{ fontSize: 'clamp(19px, 2.2vw, 20px)', color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: 640, margin: '0 auto 40px' }}>
          Hiring, onboarding, payroll, leave, performance, compliance — handled.
        </p>
        
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <a href="/demo" className="btn-gold" style={{ fontSize: 15, padding: '14px 36px' }}>Request access</a>
          <Link href="#watch-it-run" style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 600, textDecoration: 'none' }} className="hover-gold transition-colors">
            See it run →
          </Link>
        </div>
      </div>

      {/* Big product dashboard, centered */}
      <div className="hero-stage" style={{ maxWidth: 1240, margin: '80px auto 0', padding: '0 24px 0', position: 'relative', zIndex: 1 }}>
        <div className="hero-app" style={{ maxWidth: 1120, margin: '0 auto', background: '#FFFFFF', borderRadius: '18px 18px 0 0', border: '1px solid var(--border)', borderBottom: 'none', boxShadow: 'var(--shadow-float), var(--sheen)', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
          {/* macOS window header */}
          <div style={{ background: 'var(--bg-surface)', padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
            <Dot c="#FF5F57" /><Dot c="#FEBC2E" /><Dot c="#28C840" />
            <span style={{ marginLeft: 10, fontSize: 11.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dot c="#15803D" /><span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>live</span></span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '176px 1fr' }} className="hero-app-split">
            {/* Sidebar */}
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

            {/* Split dashboard area */}
            <div style={{ padding: '24px', background: 'var(--bg-warm)', display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: 20 }} className="hero-dashboard-split">
              {/* Column 1: Approvals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--font-serif), serif', fontSize: 18, color: 'var(--text)', letterSpacing: '-0.01em' }}>Approvals queue</span>
                  <span style={{ fontSize: 10.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>3 needs sign-off</span>
                </div>
                {todayCards.slice(0, 1).map((c) => (
                  <TodayCard key={c.title} {...c} />
                ))}
                
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '12px 16px', marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <Dot c="#15803D" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Overnight run</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#15803D', margin: 0, lineHeight: 1.2 }}>14 routines auto-resolved</p>
                  <p style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.45 }}>PTO, benefits enrollments, and standard compliance notifications cleared.</p>
                </div>
              </div>

              {/* Column 2: Employee Records */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--font-serif), serif', fontSize: 18, color: 'var(--text)', letterSpacing: '-0.01em' }}>Employee records</span>
                  <span style={{ fontSize: 10.5, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>1,247 active</span>
                </div>
                <div style={{ scale: '0.94', transformOrigin: 'top left', width: '106.3%' }}>
                  <EmployeeDirectory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-gold:hover {
          color: var(--gold-dark) !important;
        }
        @media (max-width: 1024px) {
          .hero-dashboard-split {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-app-split {
            grid-template-columns: 1fr !important;
          }
          .hero-side {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export { todayCards }
