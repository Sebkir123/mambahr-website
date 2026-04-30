import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import SlackThread from '@/components/surfaces/slack-thread'
import TodayCard from '@/components/surfaces/today-card'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'

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

// FINDING-009: Real brand SVGs instead of colored squares with ◆
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

// FINDING-003: No emoji — use styled role labels
const builtForCards = [
  {
    title: 'The Head of People',
    role: 'SOLO HR',
    copy: 'Running recruiting, comp, performance, and leave — alone. MambaHR is the team they never got to hire.',
  },
  {
    title: 'The PeopleOps duo',
    role: '2-PERSON TEAM',
    copy: 'Two people, 400 employees, a ticket queue that never empties. The agents clear the queue. They set the policy.',
  },
  {
    title: 'The founder doing HR',
    role: 'PRE-HR HIRE',
    copy: 'Until they can hire someone. MambaHR buys them the time to hire the right person — not just the next one.',
  },
]

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>

        {/* ── HERO ── */}
        <section
          style={{
            background: 'linear-gradient(180deg, var(--bg-warm) 0%, #FFFFFF 100%)',
            paddingTop: 160,
            paddingBottom: 0,
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <span className="pill-gold">THE AI HR DEPARTMENT</span>
            </div>

            {/* FINDING-001: New headline — category-defining, not channel-defining */}
            <h1
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(44px, 7vw, 80px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 1.0,
                marginBottom: 28,
              }}
            >
              Your next HR hire<br />isn&apos;t human.
            </h1>

            {/* FINDING-005: One sentence, leads with the most powerful claim */}
            <p
              style={{
                textAlign: 'center',
                fontSize: 'clamp(17px, 2vw, 20px)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: 540,
                margin: '0 auto 40px',
              }}
            >
              MambaHR is an AI HR department that handles hiring, payroll, leave, performance, and compliance — so one human can run people ops for hundreds.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
              <a href="#request-access" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
                Request access →
              </a>
              <Link href="/today" className="btn-secondary" style={{ fontSize: 15 }}>
                See it in action
              </Link>
            </div>

            {/* FINDING-014: Removed "SOC 2 in progress" — keep trust copy clean */}
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 80 }}>
              Private beta · 4 design-partner spots open this quarter · US-based
            </p>

            {/* Split-screen hero visual — FINDING-004: hide Today panel on mobile */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                maxWidth: 1000,
                margin: '0 auto',
              }}
              className="hero-split"
            >
              <div>
                <div style={{ background: 'var(--bg-surface)', borderRadius: '12px 12px 0 0', padding: '8px 16px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 500, margin: 0 }}>Employee — in Slack</p>
                </div>
                <SlackThread channel="general" messages={heroMessages} />
              </div>

              <div className="hero-today-panel">
                <div style={{ background: 'var(--bg-surface)', borderRadius: '12px 12px 0 0', padding: '8px 16px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 500, margin: 0 }}>CHRO — in Today (8:30 AM)</p>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '0 0 12px 12px', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {todayCards.map((card, i) => <TodayCard key={i} {...card} />)}
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginTop: 20, paddingBottom: 80 }}>
              Same agent. Two surfaces. Employees work in Slack. The CHRO approves what matters in Today.
            </p>
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
              {/* FINDING-006: Flip from defensive "No" to positive */}
              Works where your team already works.
            </h2>
            <p style={{ textAlign: 'center', fontSize: 18, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 60px' }}>
              Slack, Teams, email, or the web app. No migration. No retraining. Your employees never open a new tab.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {channelTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="card-hover"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '28px 24px',
                  }}
                >
                  {/* FINDING-009: Real brand icons */}
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 80,
                alignItems: 'center',
              }}
            >
              <div>
                {/* FINDING-002: Remove internal eyebrow labels */}
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

              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>What 30 minutes looks like</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {todayCards.map((card, i) => <TodayCard key={i} {...card} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BUILT FOR ── */}
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

            {/* FINDING-003: No emoji — use role labels + left-aligned layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              {builtForCards.map((card, i) => (
                <div
                  key={card.title}
                  style={{
                    background: i % 2 === 0 ? 'var(--bg-warm)' : '#FFFFFF',
                    padding: '36px 32px',
                    borderRight: i < builtForCards.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gold-dark)', background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 4, padding: '3px 8px', marginBottom: 16 }}>{card.role}</span>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.01em' }}>{card.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65 }}>{card.copy}</p>
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
            {/* FINDING-002: "THE MOAT" → "COMPLIANCE ENGINE" */}
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

            {/* FINDING-007: Simplify to 2 bars — more credible */}
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
