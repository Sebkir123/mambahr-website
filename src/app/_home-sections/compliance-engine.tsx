import SectionCta from '@/components/section-cta'

const cases = [
  {
    scenario: 'Employee on FMLA also requests CA CFRA — stack or sequential?',
    cost: '$30K back leave + penalty',
    answerHeadline: 'Approve up to 24 weeks combined.',
    answerDetail: 'Eligible for both (14-month tenure, 1,400 hours). The CA leave stacks on top of federal FMLA. Anything ambiguous routes to your legal team for review.',
    receipts: ['FMLA', 'CA CFRA', 'DLSE 7-2024'],
  },
  {
    scenario: 'Posting a $250K role across Colorado, New York, and Washington — no salary disclosure.',
    cost: '$10K per violation, per state',
    answerHeadline: 'Block the post. Add the right disclosure per state.',
    answerDetail: 'Three jurisdictions trigger pay transparency, each with different rules: salary range, bona fide hiring, benefits summary. The agent edits the post before it goes live.',
    receipts: ['CO Equal Pay Act', 'NY S9427A', 'WA RCW 49.58.110'],
  },
  {
    scenario: 'New hire offer at $58K — exempt or non-exempt under California + federal rules?',
    cost: '$50K back wages + 30% penalties',
    answerHeadline: 'Reclassify as non-exempt. Adjust the offer letter.',
    answerDetail: 'California requires exempt employees to earn at least 2× the state minimum wage. At $58K, this offer is below the threshold — overtime eligibility kicks in by law.',
    receipts: ['FLSA Part 541', 'CA Labor §515', 'IWC Wage Order 4'],
  },
]

export default function ComplianceEngineSection() {
  return (
    <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Hero */}
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>THE COMPLIANCE ENGINE</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: 24,
              lineHeight: 1.0,
            }}
          >
            The cases that<br />
            <span style={{ color: 'var(--gold-dark)' }}>cost you money.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 620 }}>
            Federal employment law and all 50 state codes, kept current. Three real edge cases — and exactly what the agent does with each one.
          </p>
        </div>

        {/* Case cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {cases.map((c) => (
            <div
              key={c.scenario}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 32px',
              }}
            >
              {/* Top row: scenario + risk chip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
                <p style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(20px, 2.2vw, 26px)',
                  fontWeight: 400,
                  color: 'var(--text)',
                  margin: 0,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  maxWidth: 720,
                }}>
                  {c.scenario}
                </p>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--color-red)',
                  background: 'var(--bg-warm)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '5px 12px',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}>
                  Risk · {c.cost}
                </span>
              </div>

              {/* Answer — the main payload */}
              <div style={{
                background: 'var(--gold-tint)',
                borderLeft: '3px solid var(--gold-dark)',
                borderRadius: '0 10px 10px 0',
                padding: '18px 22px',
                marginBottom: 20,
              }}>
                <p style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--gold-dark)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 8px',
                  fontFamily: 'var(--font-mono), monospace',
                }}>
                  The agent&rsquo;s answer
                </p>
                <p style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--text)',
                  margin: '0 0 6px',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                }}>
                  {c.answerHeadline}
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                  {c.answerDetail}
                </p>
              </div>

              {/* Receipts — compressed legal backing */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11,
                  color: 'var(--text-faint)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono), monospace',
                }}>
                  Backed by
                </span>
                {c.receipts.map((r) => (
                  <span key={r} style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-faint)',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontFamily: 'var(--font-mono), monospace',
                  }}>
                    {r}
                  </span>
                ))}
                <span style={{ fontSize: 12, color: 'var(--text-faint)', marginLeft: 'auto' }}>
                  Full citation available on every decision
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          paddingTop: 36,
          borderTop: '1px solid var(--border)',
        }} className="mobile-stack">
          {[
            { stat: '50',    unit: 'States + federal',    desc: 'Every jurisdiction your employees live in' },
            { stat: '100%',  unit: 'Always cited',         desc: 'Every compliance call comes with its regulation' },
            { stat: '< 48h', unit: 'New rulings live',    desc: 'Court rulings reach the agent within two days' },
          ].map((m) => (
            <div key={m.unit}>
              <p style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 40,
                fontWeight: 400,
                color: 'var(--gold-dark)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: '0 0 6px',
              }}>
                {m.stat}
              </p>
              <p style={{
                fontSize: 12,
                color: 'var(--text-faint)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 8px',
                fontFamily: 'var(--font-mono), monospace',
              }}>
                {m.unit}
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        <SectionCta headline="Talk to the founders about your state coverage." />
      </div>
    </section>
  )
}
