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

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-warm) 80%, #FFFFFF 100%)',
        paddingTop: 110,
        paddingBottom: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Breathing gold atmosphere */}
      <div
        aria-hidden
        className="hero-glow"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '8%',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.22) 0%, rgba(201,169,110,0) 68%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hero-glow { animation: heroBreathe 9s ease-in-out infinite; }
          @keyframes heroBreathe {
            0%, 100% { transform: scale(1);   opacity: 0.85; }
            50%      { transform: scale(1.18); opacity: 1; }
          }
        }
      `}</style>
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
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left — copy */}
        <div style={{ paddingBottom: 80 }}>
          <div data-animate style={{ marginBottom: 22 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
              The AI HR Department
            </span>
          </div>

          <h1
            data-animate
            data-animate-delay="100"
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
            Your HR work,<br />
            <span style={{ color: 'var(--gold)' }}>automated.</span>
          </h1>

          <p
            data-animate
            data-animate-delay="200"
            style={{
              fontSize: 19,
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            Hiring, onboarding, leave, performance, compliance — MambaHR does the everyday HR work and brings you only the calls that need a person. <strong style={{ color: 'var(--text)' }}>You approve. It runs.</strong>
          </p>

          <div data-animate data-animate-delay="400" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <a href="/demo" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
              Request access →
            </a>
            <Link href="/today" prefetch={false} className="btn-secondary" style={{ fontSize: 15 }}>
              See product tour
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontSize: 14.5, color: 'var(--text)', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              A fraction of your next HR hire.{' '}
              <span style={{ color: 'var(--gold-dark)' }}>Founding pricing — first 20 companies.</span>
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-faint)', margin: 0 }}>
              Live demo in 30 minutes · Switch from any HR system in a day · Built by HR operators
            </p>
          </div>
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
              boxShadow: 'var(--shadow-float), var(--sheen)',
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
              boxShadow: 'var(--shadow-md), var(--sheen)',
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
