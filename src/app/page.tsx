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

const channelTiles = [
  {
    label: 'Already in Slack.',
    copy: 'Mention @mamba. Slash commands. DMs. Channel-aware.',
    bg: '#4A154B',
    icon: '◆',
  },
  {
    label: 'Already in Teams.',
    copy: 'Same agent, Microsoft surface. Mentions, adaptive cards, tabs.',
    bg: '#464EB8',
    icon: '◆',
  },
  {
    label: 'Already in your inbox.',
    copy: 'Forward an offer letter. Reply to a leave request. CC the agent.',
    bg: '#EA4335',
    icon: '◆',
  },
  {
    label: 'Also a real app.',
    copy: "A web app for approvals and analytics. Optional — but it's nice.",
    bg: '#1C1917',
    icon: '◆',
  },
]

const agentPills = [
  'Hiring', 'Onboarding', 'Lifecycle', 'Comp & Benefits',
  'Time Off', 'Performance', 'L&D', 'Employee Relations',
  'Compliance', 'Offboarding', 'Reports', 'Culture', 'HR Ops',
]

const builtForCards = [
  {
    title: 'The Head of People',
    copy: 'Running recruiting, comp, performance, and leave — alone. MambaHR is the team they never got to hire.',
    emoji: '👩‍💼',
  },
  {
    title: 'The PeopleOps duo',
    copy: 'Two people, 400 employees, a ticket queue that never empties. The agents clear the queue. They set the policy.',
    emoji: '👥',
  },
  {
    title: 'The founder doing HR',
    copy: 'Until they can hire someone. MambaHR buys them the time to hire the right person — not just the next one.',
    emoji: '🚀',
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

            <h1
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                lineHeight: 1.0,
                marginBottom: 28,
              }}
            >
              Your HR team,<br />in Slack.
            </h1>

            <p
              style={{
                textAlign: 'center',
                fontSize: 'clamp(17px, 2vw, 20px)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto 40px',
              }}
            >
              An AI HR department that runs in the tools you already use. Hiring, payroll, leave, performance, compliance — the agents do the work. One human approves the calls that matter.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
              <a href="#request-access" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
                Request access →
              </a>
              <Link href="/mamba" className="btn-secondary" style={{ fontSize: 15 }}>
                See it in Slack
              </Link>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 80 }}>
              Private beta · 4 design-partner spots open this quarter · SOC 2 in progress
            </p>

            {/* Split-screen hero visual */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                maxWidth: 1000,
                margin: '0 auto',
              }}
            >
              <div>
                <div style={{ background: 'var(--bg-surface)', borderRadius: '12px 12px 0 0', padding: '8px 16px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 500, margin: 0 }}>Employee — in Slack</p>
                </div>
                <SlackThread channel="general" messages={heroMessages} />
              </div>

              <div>
                <div style={{ background: 'var(--bg-surface)', borderRadius: '12px 12px 0 0', padding: '8px 16px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 500, margin: 0 }}>CHRO — in Today (8:30 AM)</p>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '0 0 12px 12px', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {todayCards.map((card, i) => <TodayCard key={i} {...card} />)}
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginTop: 20, paddingBottom: 80 }}>
              Same agent. Two surfaces. The employee never leaves Slack. The CHRO sees every decision in Today.
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
                No new app. No retraining.<br />No migration risk.
              </h2>
              <p style={{ textAlign: 'center', fontSize: 18, color: 'var(--text-muted)', marginBottom: 60, maxWidth: 540, margin: '0 auto 60px' }}>
                MambaHR meets your team where they already work. Mention it. Email it. DM it. It just works.
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
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: tile.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        color: 'var(--gold)',
                        marginBottom: 16,
                      }}
                    >
                      {tile.icon}
                    </div>
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
                  <p className="eyebrow" style={{ marginBottom: 20 }}>THE WORK</p>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {builtForCards.map((card) => (
                  <div
                    key={card.title}
                    style={{ background: 'var(--bg-warm)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 20 }}>{card.emoji}</div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 12, letterSpacing: 0 }}>{card.title}</h3>
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

        {/* ── THE MOAT ── */}
          <section style={{ background: 'var(--bg-warm)', padding: '100px 24px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>THE MOAT</p>
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
                We built our own benchmark for HR compliance accuracy across federal employment law, 50 state codes, and edge cases like FMLA + state PFML stacking. MambaHR scores 94.2%. Frontier general-purpose models score in the low 30s. That gap is the product.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 56, textAlign: 'left' }}>
                {[
                  { label: 'MambaHR', score: 94.2, gold: true },
                  { label: 'Frontier model A', score: 31, gold: false },
                  { label: 'Frontier model B', score: 28, gold: false },
                  { label: 'Frontier model C', score: 24, gold: false },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ width: 140, fontSize: 13, fontWeight: row.gold ? 600 : 400, color: row.gold ? 'var(--text)' : 'var(--text-muted)', flexShrink: 0, textAlign: 'right' }}>{row.label}</span>
                    <div style={{ flex: 1, background: 'var(--border)', borderRadius: 4, height: row.gold ? 16 : 10, overflow: 'hidden' }}>
                      <div style={{ width: `${row.score}%`, height: '100%', background: row.gold ? 'var(--gold)' : 'var(--border-mid)', borderRadius: 4 }} />
                    </div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: row.gold ? 'var(--gold-dark)' : 'var(--text-faint)', width: 48, flexShrink: 0 }}>
                      {row.score}%
                    </span>
                  </div>
                ))}
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
