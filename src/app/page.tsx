import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import SlackThread from '@/components/surfaces/slack-thread'
import TodayCard from '@/components/surfaces/today-card'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'
import PhotoImg from '@/components/surfaces/photo-img'

const heroMessages = [
  {
    name: 'Emma Rodriguez',
    initials: 'ER',
    avatarColor: '#D4C4B5',
    time: '9:02 AM',
    content: '@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉',
  },
  {
    name: 'Mamba',
    initials: 'M',
    isMamba: true as const,
    time: '9:02 AM',
    content: (
      <div>
        <p style={{ margin: '0 0 8px' }}>Approved. ✨</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 4px', color: 'var(--text-muted)' }}>PTO balance: <strong style={{ color: 'var(--text)' }}>12 → 9 days</strong></p>
          <p style={{ margin: '0 0 4px', color: 'var(--text-muted)' }}>Calendar: <strong style={{ color: 'var(--text)' }}>Mon Apr 6 – Wed Apr 8 blocked</strong></p>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manager: <strong style={{ color: 'var(--text)' }}>Notified · Out-of-office set</strong></p>
        </div>
      </div>
    ),
  },
]

const todayCards = [
  {
    title: 'Offer for Maya Chen — Senior Engineer',
    subtitle: '$195k base · 0.18% equity — above band by 8%',
    rationale: 'Top candidate from 6-week search. Competing offer from Scale AI. Recommended: approve with justification filed.',
    riskLevel: 'L4' as const,
    cuq: 0.88,
    decision: 'hil' as const,
    time: '8:14 AM',
    agent: 'Hiring agent',
    urgent: true,
  },
  {
    title: 'PTO approved — Emma Rodriguez',
    subtitle: 'Mon Apr 6 – Wed Apr 8 · 3 days',
    rationale: 'Within policy. Balance 12 → 9 days. Calendar and manager notified.',
    riskLevel: 'L2' as const,
    cuq: 0.97,
    decision: 'auto' as const,
    time: '9:02 AM',
    agent: 'Leave agent',
  },
  {
    title: 'November payroll ready',
    subtitle: '47 employees · $412,300 total · 2 state changes',
    rationale: 'CA and TX adjustments flagged. All direct deposits pre-verified. Ready to run.',
    riskLevel: 'L4' as const,
    cuq: 0.93,
    decision: 'hil' as const,
    time: '6:00 AM',
    agent: 'Payroll agent',
  },
]

const channelTiles = [
  {
    label: 'Already in Slack.',
    copy: 'Mention @mamba. Slash commands. DMs. Channel-aware.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 54 54" fill="none">
        <path d="M19.712 33.2c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9H19.712v4.9z" fill="#E01E5A"/>
        <path d="M22.2 33.2c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v12.3c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9V33.2z" fill="#E01E5A"/>
        <path d="M27.1 19.7c-2.7 0-4.9-2.2-4.9-4.9S24.4 9.9 27.1 9.9s4.9 2.2 4.9 4.9V19.7H27.1z" fill="#36C5F0"/>
        <path d="M27.1 22.2c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9H14.8c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9H27.1z" fill="#36C5F0"/>
        <path d="M40.6 27.1c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9V14.8c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9V27.1z" fill="#2EB67D"/>
        <path d="M38.1 30.7c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9V30.7H38.1z" fill="#2EB67D"/>
        <path d="M33.2 38.1c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9H33.2V38.1z" fill="#ECB22E"/>
        <path d="M30.7 35.6c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9v12.3c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9v-7.4z" fill="#ECB22E"/>
      </svg>
    ),
  },
  {
    label: 'Already in Teams.',
    copy: 'Same agent, Microsoft surface. Mentions, adaptive cards, tabs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 3H8C6.9 3 6 3.9 6 5v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#5059C9"/>
        <circle cx="15.5" cy="7.5" r="2.5" fill="white"/>
        <path d="M12 11h7v2.5c0 1.9-1.6 3.5-3.5 3.5S12 15.4 12 13.5V11z" fill="white"/>
        <path d="M4 7h4v2H4zM2 9h6v7c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9z" fill="#7B83EB"/>
        <circle cx="5" cy="6" r="2" fill="#7B83EB"/>
      </svg>
    ),
  },
  {
    label: 'Already in your inbox.',
    copy: 'Forward an offer letter. Reply to a leave request. CC the agent.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#EA4335"/>
        <path d="M4 8l8 6 8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="4" y="7" width="16" height="11" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Also a real app.',
    copy: "A web app for approvals and analytics. Optional, but it's nice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1C1917"/>
        <path d="M7 12l3.5 3.5L17 8" stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const agentPills = [
  'Hiring', 'Onboarding', 'Lifecycle', 'Comp & Benefits',
  'Time Off', 'Performance', 'L&D', 'Employee Relations',
  'Compliance', 'Offboarding', 'Reports', 'Culture', 'HR Ops',
]

// Photo sources: swap these URLs for licensed Stocksy/Unsplash+ images before launch
const PHOTO_HERO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&fit=crop&crop=faces'
const PHOTO_SOLO_HR = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&fit=crop&crop=face'
const PHOTO_DUO = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&fit=crop&crop=faces'
const PHOTO_FOUNDER = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&fit=crop&crop=face'

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>

        {/* ── HERO — Shapes-style: copy left, human photo + product UI right ── */}
        <section
          style={{
            background: 'var(--bg-warm)',
            paddingTop: 100,
            paddingBottom: 0,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 40px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: 64,
              alignItems: 'center',
              minHeight: 600,
            }}
            className="hero-split"
          >
            {/* Left — copy */}
            <div style={{ paddingBottom: 80 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="pill-gold">THE AI HR DEPARTMENT</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5vw, 68px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  lineHeight: 1.05,
                  marginBottom: 24,
                }}
              >
                Your next HR hire<br />isn&apos;t human.
              </h1>

              <p
                style={{
                  fontSize: 18,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: 440,
                  marginBottom: 40,
                }}
              >
                MambaHR is an AI HR department that handles hiring, payroll, leave, performance, and compliance — so one human can run people ops for hundreds.
              </p>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                <a href="#request-access" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
                  Request access →
                </a>
                <Link href="/today" className="btn-secondary" style={{ fontSize: 15 }}>
                  See it in action
                </Link>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
                Private beta · 4 design-partner spots · US-based
              </p>
            </div>

            {/* Right — real human photo + product UI overlay (Shapes pattern) */}
            {/* Photo: warm, natural light, HR person at laptop — swap src for licensed Stocksy image */}
            <div
              style={{
                position: 'relative',
                height: 580,
                borderRadius: '20px 20px 0 0',
                overflow: 'hidden',
                alignSelf: 'flex-end',
                background: 'linear-gradient(145deg, #E8DDD0 0%, #C9B99A 100%)',
              }}
              className="hero-today-panel"
            >
              <PhotoImg
                src={PHOTO_HERO}
                alt="HR professional at work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />

              {/* Warm overlay to let the product UI read cleanly */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(160deg, rgba(250,247,242,0) 30%, rgba(250,247,242,0.15) 100%)',
                }}
              />

              {/* Product UI — Today queue card floating bottom-left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  width: 340,
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ background: 'var(--bg-surface)', padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today · 3 items need you</span>
                </div>
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {todayCards.slice(0, 2).map((card, i) => (
                    <TodayCard key={i} {...card} />
                  ))}
                </div>
              </div>

              {/* Slack message floating top-right */}
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  right: 20,
                  width: 260,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: '#1C1917', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 10 }}>◆</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1D1C1D' }}>Mamba</span>
                      <span style={{ fontSize: 10, background: 'var(--gold-tint)', color: 'var(--gold-dark)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 3, padding: '1px 5px', fontWeight: 600 }}>APP</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#1D1C1D', lineHeight: 1.5, margin: 0 }}>
                      Emma&apos;s PTO approved. 3 days, Apr 6–8. Balance updated, manager notified. ✓
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHERE IT LIVES ── */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 16 }}>WHERE IT LIVES</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Works where your team already works.
            </h2>
            <p style={{ textAlign: 'center', fontSize: 18, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 60px' }}>
              Slack, Teams, email, or the web app. No migration. No retraining. Your employees never open a new tab.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {channelTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="card-hover"
                  style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px' }}
                >
                  <div style={{ marginBottom: 16 }}>{tile.icon}</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{tile.label}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55 }}>{tile.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REPLACES THE DEPARTMENT ── */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>WHAT IT HANDLES</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(28px, 3vw, 42px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    marginBottom: 24,
                    lineHeight: 1.15,
                  }}
                >
                  MambaHR isn&apos;t HR software.<br />It&apos;s the HR team.
                </h2>
                <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                  The agents handle the daily work — recruiting, leave requests, payroll, performance reviews, compliance filings, offboarding paperwork. The Chief People Officer stays. Their day compresses to 30 minutes of judgment calls. Every decision logged, audited, reversible where it should be.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {agentPills.map((p) => (
                    <span key={p} className="pill-gold">{p}</span>
                  ))}
                </div>
              </div>

              <div className="mobile-hide">
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>What 30 minutes looks like</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {todayCards.map((card, i) => <TodayCard key={i} {...card} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BUILT FOR — real human photos (Shapes pattern) ── */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Built for HR teams of 1–3<br />doing the work of 10.
            </h2>
            <p style={{ textAlign: 'center', fontSize: 18, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 64px' }}>
              Companies between 50 and 500 employees. Growing fast. HR is one or two people, plus a lot of Sheets.
            </p>

            {/* Photo cards — swap images for licensed photos before launch */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {[
                {
                  role: 'SOLO HR',
                  title: 'The Head of People',
                  copy: 'Running recruiting, comp, performance, and leave — alone. MambaHR is the team they never got to hire.',
                  photo: PHOTO_SOLO_HR,
                  alt: 'HR professional at laptop',
                  bg: 'linear-gradient(145deg, #DDD0C4 0%, #C4A882 100%)',
                },
                {
                  role: '2-PERSON TEAM',
                  title: 'The PeopleOps duo',
                  copy: 'Two people, 400 employees, a ticket queue that never empties. The agents clear the queue. They set the policy.',
                  photo: PHOTO_DUO,
                  alt: 'Two HR professionals reviewing work together',
                  bg: 'linear-gradient(145deg, #D4CCBE 0%, #B8A48C 100%)',
                },
                {
                  role: 'PRE-HR HIRE',
                  title: 'The founder doing HR',
                  copy: 'Until they can hire someone. MambaHR buys them the time to hire the right person — not just the next one.',
                  photo: PHOTO_FOUNDER,
                  alt: 'Founder working at desk',
                  bg: 'linear-gradient(145deg, #E2D8CC 0%, #CAAD8E 100%)',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="card-hover"
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    background: '#FFFFFF',
                  }}
                >
                  {/* Human photo — swap src for licensed Stocksy image per archetype */}
                  <div style={{ height: 240, overflow: 'hidden', position: 'relative', background: card.bg }}>
                    <PhotoImg
                      src={card.photo}
                      alt={card.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                    {/* Role badge overlaid on photo */}
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#FFFFFF', background: 'rgba(28,25,23,0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', borderRadius: 5, padding: '4px 10px' }}>{card.role}</span>
                    </div>
                  </div>
                  {/* Copy below photo */}
                  <div style={{ padding: '24px 24px 28px' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.01em' }}>{card.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{card.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <a href="#request-access" className="btn-secondary" style={{ display: 'inline-flex' }}>
                Is that you? Let&apos;s talk →
              </a>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ENGINE ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>COMPLIANCE ENGINE</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.15,
              }}
            >
              94.2% on HR-Bench.<br />The next-best model scores 31%.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 56 }}>
              We built our own benchmark for HR compliance accuracy across federal employment law, 50 state codes, and edge cases like FMLA + state PFML stacking. MambaHR scores 94.2%. The best general-purpose frontier model scores 31%. That gap is the product.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56, textAlign: 'left', maxWidth: 560, margin: '0 auto 56px' }}>
              {[
                { label: 'MambaHR', score: 94.2, gold: true },
                { label: 'Best frontier LLM', score: 31, gold: false },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 160, fontSize: 14, fontWeight: row.gold ? 600 : 400, color: row.gold ? 'var(--text)' : 'var(--text-muted)', flexShrink: 0, textAlign: 'right' }}>{row.label}</span>
                  <div style={{ flex: 1, background: 'var(--border)', borderRadius: 4, height: row.gold ? 18 : 10, overflow: 'hidden' }}>
                    <div style={{ width: `${row.score}%`, height: '100%', background: row.gold ? 'var(--gold)' : 'var(--border-mid)', borderRadius: 4 }} />
                  </div>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: row.gold ? 'var(--gold-dark)' : 'var(--text-faint)', width: 52, flexShrink: 0 }}>
                    {row.score}%
                  </span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center', marginTop: 4 }}>HR-Bench · 1,200 graded compliance scenarios · federal law + 50 states</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Compliance Engine', value: '95K', sub: 'lines of employment law' },
                { label: 'HR-Bench', value: '1,200', sub: 'graded scenarios' },
                { label: 'Self-learning', value: '∞', sub: 'improves with every decision' },
              ].map((pillar) => (
                <div key={pillar.label} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px' }}>
                  <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{pillar.value}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{pillar.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>{pillar.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS MARQUEE ── */}
        <section style={{ background: '#FFFFFF', paddingTop: 64, paddingBottom: 80, overflow: 'hidden' }}>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 0 }}>
            Bring what you have. The agent connects to it.
          </p>
          <IntegrationsMarquee />
        </section>

        {/* ── REQUEST ACCESS ── */}
        <RequestAccessSection />

      </main>
      <Footer />
    </>
  )
}
