import Link from 'next/link'
import Image from 'next/image'
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

const heroValueProps = [
  '14 specialist agents. Zero callouts.',
  'Federal + 50 state employment law, cited on every action.',
  'Replaces an HR team of 4. Keeps your CHRO in the loop.',
]

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-warm) 80%, #FFFFFF 100%)',
        paddingTop: 110,
        paddingBottom: 0,
        overflow: 'hidden',
      }}
    >
      <div
        className="hero-split"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: 64,
          alignItems: 'center',
          minHeight: 720,
        }}
      >
        {/* Left — copy */}
        <div style={{ paddingBottom: 80 }}>
          <div style={{ marginBottom: 24 }}>
            <span className="pill-gold">THE AI HR DEPARTMENT</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(44px, 5.5vw, 76px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.0,
              marginBottom: 24,
            }}
          >
            Your HR team,<br />
            <span style={{ color: 'var(--gold-dark)' }}>automated.</span>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — the agents do the work. <strong style={{ color: 'var(--text)' }}>You sign off when it matters.</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
            {heroValueProps.map((prop) => (
              <div key={prop} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="9" cy="9" r="9" fill="var(--gold-tint)" />
                  <path d="M5 9l3 3 5-6" stroke="var(--gold-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{prop}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <a href="/demo" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
              Get a demo →
            </a>
            <Link href="/today" className="btn-secondary" style={{ fontSize: 15 }}>
              See product tour
            </Link>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
            Live demo in 30 minutes · Switch from any HRIS within 1 day
          </p>
        </div>

        {/* Right — Employee Directory + Today Card overlay (Shapes pattern, hardcoded mockup) */}
        <div className="hero-today-panel" style={{ position: 'relative', alignSelf: 'flex-end', paddingBottom: 0 }}>
          {/* Backdrop card with employee directory */}
          <div style={{ position: 'relative', marginRight: 60, marginBottom: 100 }}>
            <EmployeeDirectory />
          </div>

          {/* Today decision card overlay — bottom-right */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 0,
              width: 340,
              background: '#FFFFFF',
              borderRadius: 14,
              border: '1px solid var(--border)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today queue · 3 items</span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>9:14 AM</span>
            </div>
            <div style={{ padding: 12 }}>
              <TodayCard {...todayCards[0]} />
            </div>
          </div>

          {/* Floating Slack-style message — top-right */}
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              width: 240,
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid var(--border)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <Image src="/MambaHR_logo.png" alt="Mamba" width={20} height={20} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
              </div>
              <div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#1D1C1D' }}>Mamba</span>
                  <span style={{ fontSize: 9, background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 3, padding: '1px 4px', fontWeight: 600 }}>APP</span>
                </div>
                <p style={{ fontSize: 11, color: '#1D1C1D', lineHeight: 1.4, margin: 0 }}>
                  Emma&apos;s PTO approved · 3 days · ✓
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { todayCards }
