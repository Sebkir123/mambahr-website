import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import TodayCard from '@/components/surfaces/today-card'
import DecisionCardAnatomy from '@/components/sections/decision-card-anatomy'

const cards = [
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
  {
    title: 'November payroll ready',
    subtitle: '47 employees · $412,300 · 2 state changes',
    rationale: 'CA and TX adjustments flagged. All direct deposits pre-verified. Ready to run.',
    status: 'always-you' as const,
    time: '6:00 AM',
    agent: 'Payroll agent',
  },
  {
    title: 'Background check cleared — Jordan Kim',
    subtitle: 'Role: Account Executive · Start: May 12',
    rationale: 'Clean report. Offer letter triggered for e-signature. Equipment order submitted.',
    status: 'auto' as const,
    time: '7:30 AM',
    agent: 'Hiring agent',
  },
  {
    title: 'FMLA eligibility — Marcus Webb',
    subtitle: 'Intermittent leave · FMLA + CA CFRA stacking',
    rationale: 'Eligible: 14 months tenure, 1,400 hours. CA CFRA stacks with federal FMLA. Up to 12 weeks approved.',
    status: 'sign-off' as const,
    time: '5:45 AM',
    agent: 'Leave agent',
  },
  {
    title: 'EEO-1 filing draft ready',
    subtitle: 'Annual federal filing · Due May 31',
    rationale: 'Component 1 data pulled and formatted. No anomalies detected. Review before submission.',
    status: 'always-you' as const,
    time: '4:00 AM',
    agent: 'Compliance agent',
  },
]

const agentDecides = [
  'PTO requests within policy',
  'Onboarding tasks within budget',
  'Background check routing',
  'Standard compliance filings',
  '401k enrollments, life events',
  'Performance review draft generation',
  'Headcount and turnover reports',
  'Training completion tracking',
]

const humanDecides = [
  'Involuntary terminations — always',
  'RIF execution — always',
  'Separation agreements — always',
  'ER investigation findings — always',
  'Hire decisions above director',
  'Comp changes above threshold',
  'Equity grants above per-grant cap',
  'Policy changes — always',
]

const mathRows = [
  { metric: 'Avg PTO request resolution',       legacy: '4.2 hr', mamba: '4.2 sec' },
  { metric: 'Time spent on operational admin',  legacy: '60%',    mamba: '0%' },
  { metric: 'Time spent on compliance filings', legacy: '15%',    mamba: '0%', note: 'automated, you sign on submit' },
  { metric: 'Time spent on judgment + policy',  legacy: '25%',    mamba: '100%' },
  { metric: 'CHRO time on strategic work',      legacy: '8 hr/wk', mamba: '32 hr/wk' },
]

const anatomyItems = [
  { label: 'The action', desc: 'What the agent did or wants to do' },
  { label: 'The rationale', desc: "Agent's summary in 3 lines, with citations" },
  { label: 'Status label', desc: 'One of: Auto-approved, Needs your sign-off, Always you.' },
  { label: 'One-click decision', desc: 'Approve, Decline, Request changes, Escalate' },
  { label: 'The trail', desc: 'Every prior step, timestamped, audited' },
]

export default function TodayPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ maxWidth: 640, marginBottom: 64 }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>TODAY</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.05,
                }}
              >
                30 minutes.<br />Your whole HR day.
              </h1>
              <p style={{ fontSize: 20, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36 }}>
                The agents ran the night shift. Recruiting screens, leave requests, comp changes, offboarding paperwork — done while you slept. This morning, a queue. Approve. Decline. Move on.
              </p>
              <a href="/demo" className="btn-gold">Request access →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {cards.map((card, i) => <TodayCard key={i} {...card} />)}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 16, textAlign: 'center' }}>
              6 items in queue · 3 require your approval · Agents resolved 14 overnight
            </p>
          </div>
        </section>

        {/* Decision Card anatomy — interactive annotated component */}
        <DecisionCardAnatomy />

        {/* The math */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>THE MATH</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.05,
                }}
              >
                Where your HR time<br />goes now.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                The work doesn&apos;t disappear. It shifts from admin to judgment.
              </p>
            </div>

            {/* Editorial rows — no cards, no redundant labels */}
            <div>
              {mathRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    padding: '36px 0',
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === mathRows.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(220px, 1.1fr) 1.4fr',
                    gap: 32,
                    alignItems: 'center',
                  }}
                  className="math-row"
                >
                  {/* Left: metric label */}
                  <div>
                    <p
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--text-faint)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 6,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 20,
                        fontWeight: 400,
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {row.metric}
                    </p>
                    {row.note && (
                      <p
                        style={{
                          fontSize: 13,
                          color: 'var(--text-muted)',
                          fontStyle: 'italic',
                          marginTop: 8,
                          marginBottom: 0,
                        }}
                      >
                        {row.note}
                      </p>
                    )}
                  </div>

                  {/* Right: number transformation */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(32px, 4vw, 44px)',
                        fontWeight: 400,
                        color: 'var(--text-faint)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1,
                        textDecoration: 'line-through',
                        textDecorationThickness: '1.5px',
                      }}
                    >
                      {row.legacy}
                    </span>

                    <span
                      style={{
                        fontSize: 22,
                        color: 'var(--gold-dark)',
                        lineHeight: 1,
                        opacity: 0.5,
                      }}
                    >
                      →
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(40px, 5vw, 60px)',
                        fontWeight: 400,
                        color: 'var(--gold-dark)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {row.mamba}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <style>{`
              @media (max-width: 640px) {
                .math-row {
                  grid-template-columns: 1fr !important;
                  gap: 16px !important;
                  padding: 28px 0 !important;
                }
              }
            `}</style>
          </div>
        </section>

        {/* Agent vs human */}
        <section style={{ background: 'var(--bg)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>THE POLICY</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              What the agent decides.<br />What you decide.
            </h2>
            <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--text-muted)', marginBottom: 56 }}>
              Codified in code. Not a policy doc — a compiler check.
            </p>

            <div className="policy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Agent decides */}
              <div style={{
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--color-green)',
                borderRadius: 14,
                padding: '32px 32px 28px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-green)' }} />
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Agent decides
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 22, lineHeight: 1.55, fontStyle: 'italic' }}>
                  Auto-resolved within your policy. Every action logged in the audit trail.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {agentDecides.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                        <path d="M2 7l4 4 6-6" stroke="var(--color-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* You decide */}
              <div style={{
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--color-red)',
                borderRadius: 14,
                padding: '32px 32px 28px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-red)' }} />
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Always you
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 22, lineHeight: 1.55, fontStyle: 'italic' }}>
                  No exceptions. The agent prepares everything; the decision stays with you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {humanDecides.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="5.5" stroke="var(--color-red)" strokeWidth="1.8" />
                        <path d="M7 4v3.5" stroke="var(--color-red)" strokeWidth="1.8" strokeLinecap="round" />
                        <circle cx="7" cy="10" r="0.6" fill="var(--color-red)" />
                      </svg>
                      <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 720px) {
                .policy-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
