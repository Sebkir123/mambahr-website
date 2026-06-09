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

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-warm) 62%, #FFFFFF 100%)',
        paddingTop: 168,
        paddingBottom: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Single soft gold atmosphere, centered behind the headline */}
      <div
        aria-hidden
        className="hero-glow"
        style={{
          position: 'absolute',
          top: '-14%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.20) 0%, rgba(201,169,110,0) 62%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hero-glow { animation: heroBreathe 10s ease-in-out infinite; }
          @keyframes heroBreathe {
            0%, 100% { transform: translateX(-50%) scale(1);    opacity: 0.85; }
            50%      { transform: translateX(-50%) scale(1.12); opacity: 1; }
          }
        }
        /* Hero visual: hide the floating decision card on small screens, shrink the riser */
        @media (max-width: 700px) {
          .hero-visual-card { display: none !important; }
          .hero-visual-wrap { transform: scale(0.92); }
        }
      `}</style>

      {/* ── Centered copy — one idea, lots of air ── */}
      <div
        className="page"
        style={{
          maxWidth: 940,
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold-dark)',
            marginBottom: 30,
          }}
        >
          The AI HR Department
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(52px, 8vw, 94px)',
            fontWeight: 400,
            letterSpacing: '-0.035em',
            color: 'var(--text)',
            lineHeight: 0.98,
            margin: '0 0 30px',
          }}
        >
          Your HR work,<br />
          <span style={{ color: 'var(--gold)' }}>automated.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(19px, 2.2vw, 22px)',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            maxWidth: 620,
            margin: '0 auto 40px',
          }}
        >
          Hiring, onboarding, leave, performance, compliance — handled. You approve only the calls that need a person.
        </p>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/demo" className="btn-gold" style={{ fontSize: 16, padding: '16px 36px' }}>
            Request access →
          </a>
          <Link href="/product" prefetch={false} style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            See it run
          </Link>
        </div>
      </div>

      {/* ── One restrained floating visual, centered below ── */}
      <div
        className="hero-visual-wrap"
        style={{
          maxWidth: 820,
          margin: '88px auto 0',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ position: 'relative' }}>
          <EmployeeDirectory />

          {/* Single floating decision card, overlapping bottom-right */}
          <div
            className="hero-visual-card"
            style={{
              position: 'absolute',
              bottom: -36,
              right: -48,
              width: 360,
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-float), var(--sheen)',
              overflow: 'hidden',
            }}
          >
            <div style={{ background: 'var(--bg-surface)', padding: '11px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Approvals · 3 items</span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>9:14 AM</span>
            </div>
            <div style={{ padding: 14 }}>
              <TodayCard {...todayCards[0]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { todayCards }
