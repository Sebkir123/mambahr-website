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
  { metric: 'HR headcount for 500 employees', legacy: '5', mamba: '1', note: 'judgment only' },
  { metric: 'Avg PTO request resolution',     legacy: '4.2 hr',  mamba: '4.2 sec' },
  { metric: 'Time spent on operational admin', legacy: '60%',  mamba: '0%' },
  { metric: 'Time spent on compliance filings', legacy: '15%', mamba: '0%',   note: 'automated, you sign on submit' },
  { metric: 'Time spent on judgment + policy', legacy: '25%', mamba: '100%' },
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
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
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
                What 30 minutes a day<br />actually replaces.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                The work doesn&apos;t disappear. It shifts from admin to judgment.
              </p>
            </div>

            <div className="math-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {mathRows.map((row, i) => (
                <div
                  key={i}
                  className="math-row"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    padding: '28px 28px 24px',
                    gridColumn: i === mathRows.length - 1 ? '1 / -1' : 'auto',
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: 'var(--text-faint)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} · {row.metric}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                    {/* Legacy number */}
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

                    {/* Arrow */}
                    <span
                      style={{
                        fontSize: 22,
                        color: 'var(--gold-dark)',
                        lineHeight: 1,
                        opacity: 0.6,
                      }}
                    >
                      →
                    </span>

                    {/* MambaHR number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(38px, 4.6vw, 52px)',
                        fontWeight: 400,
                        color: 'var(--gold-dark)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {row.mamba}
                    </span>

                    {row.note && (
                      <span
                        style={{
                          fontSize: 13,
                          color: 'var(--text-muted)',
                          fontStyle: 'italic',
                          marginLeft: 4,
                          flex: '1 1 100%',
                          marginTop: 8,
                        }}
                      >
                        {row.note}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 24, marginTop: 14, fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }} className="mono">
                    <span>Legacy HR</span>
                    <span style={{ color: 'var(--gold-dark)' }}>With MambaHR</span>
                  </div>
                </div>
              ))}
            </div>

            <style>{`
              @media (max-width: 720px) {
                .math-grid { grid-template-columns: 1fr !important; }
                .math-row { grid-column: 1 !important; }
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
