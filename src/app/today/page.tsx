import type { Metadata } from 'next'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import TodayCard from '@/components/surfaces/today-card'

export const metadata: Metadata = {
  title: 'Today — MambaHR',
  description: '30 minutes. Your whole HR day. The agents ran the night shift — this morning, a queue of decisions. Approve, decline, done.',
}

const cards = [
  {
    title: 'Offer for Maya Chen — Senior Engineer',
    subtitle: '$195k base · 0.18% equity · above band by 8%',
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
    subtitle: '47 employees · $412,300 · 2 state changes',
    rationale: 'CA and TX adjustments flagged. All direct deposits pre-verified. Ready to run.',
    riskLevel: 'L4' as const,
    cuq: 0.93,
    decision: 'hil' as const,
    time: '6:00 AM',
    agent: 'Payroll agent',
  },
  {
    title: 'Background check cleared — Jordan Kim',
    subtitle: 'Role: Account Executive · Start: May 12',
    rationale: 'Clean report. Offer letter triggered for e-signature. Equipment order submitted.',
    riskLevel: 'L3' as const,
    cuq: 0.99,
    decision: 'auto' as const,
    time: '7:30 AM',
    agent: 'Hiring agent',
  },
  {
    title: 'FMLA eligibility — Marcus Webb',
    subtitle: 'Intermittent leave · FMLA + CA CFRA stacking',
    rationale: 'Eligible: 14 months tenure, 1,400 hours. CA CFRA stacks with federal FMLA. Up to 12 weeks approved.',
    riskLevel: 'L3' as const,
    cuq: 0.91,
    decision: 'hil' as const,
    time: '5:45 AM',
    agent: 'Leave agent',
  },
  {
    title: 'EEO-1 filing draft ready',
    subtitle: 'Annual federal filing · Due May 31',
    rationale: 'Component 1 data pulled and formatted. No anomalies detected. Review before submission.',
    riskLevel: 'L4' as const,
    cuq: 0.95,
    decision: 'hil' as const,
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
  { metric: 'HR FTE for 500 employees', legacy: '5', mamba: '1 (judgment only)' },
  { metric: 'Avg PTO request resolution', legacy: '4.2 hours', mamba: '4.2 seconds' },
  { metric: 'Time on operational admin work', legacy: '60%', mamba: '0%' },
  { metric: 'Time on compliance filings', legacy: '15%', mamba: '0% (automated, HIL on submit)' },
  { metric: 'Time on judgment and policy', legacy: '25%', mamba: '100%' },
]

const anatomyItems = [
  { label: 'The action', desc: 'What the agent did or wants to do' },
  { label: 'The rationale', desc: "Agent's summary in 3 lines, with citations" },
  { label: 'Risk class and CUQ', desc: 'L1–L5 + confidence score, color-coded' },
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
              <a href="#request-access" className="btn-gold">Request access →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {cards.map((card, i) => <TodayCard key={i} {...card} />)}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 16, textAlign: 'center' }}>
              6 items in queue · 3 require your approval · Agents resolved 14 overnight
            </p>
          </div>
        </section>

        {/* Decision Card anatomy */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>THE DECISION CARD</p>
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
                Every card is decision-ready.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                No &ldquo;go investigate.&rdquo; The agent investigated. Every card surfaces the action, the rationale, the evidence, the risk class, the CUQ score, and a one-click decision. The average approval takes 12 seconds.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {anatomyItems.map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <TodayCard
                title="Offer for Maya Chen — Senior Engineer"
                subtitle="$195k base · 0.18% equity · above band by 8%"
                rationale="Top candidate from 6-week search. Competing offer from Scale AI. Recommended: approve with justification filed to comp committee."
                riskLevel="L4"
                cuq={0.88}
                decision="hil"
                time="8:14 AM"
                agent="Hiring agent"
                urgent
              />
            </div>
          </div>
        </section>

        {/* The math */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>THE MATH</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 64,
                lineHeight: 1.15,
              }}
            >
              What 30 minutes a day actually replaces.
            </h2>

            <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: '#FFFFFF' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'var(--bg-surface)', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Metric</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Legacy HR</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>With MambaHR</span>
              </div>
              {mathRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    padding: '16px 24px',
                    borderBottom: i < mathRows.length - 1 ? '1px solid var(--border-faint)' : 'none',
                    background: i % 2 === 0 ? '#FFFFFF' : 'var(--bg-surface)',
                  }}
                >
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{row.metric}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace' }}>{row.legacy}</span>
                  <span style={{ fontSize: 14, color: 'var(--gold-dark)', fontWeight: 600, fontFamily: 'var(--font-mono), monospace' }}>{row.mamba}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agent vs human */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'var(--bg-warm)', borderRadius: 16, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#15803D' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#15803D' }}>Agent decides (with audit log)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {agentDecides.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                        <path d="M2 7l4 4 6-6" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#FEF2F2', borderRadius: 16, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B91C1C' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#B91C1C' }}>Always you — no exceptions</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {humanDecides.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="5.5" stroke="#B91C1C" strokeWidth="1.5" />
                        <path d="M7 4v3.5" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="7" cy="10" r="0.5" fill="#B91C1C" />
                      </svg>
                      <span style={{ fontSize: 14, color: '#7F1D1D', lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
