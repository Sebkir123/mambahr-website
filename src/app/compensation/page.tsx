import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function CompensationPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>COMPENSATION & BENEFITS</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Raises that<br />
                  <span style={{ color: 'var(--gold-dark)' }}>stay fair.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  Market bands, pay-equity regression checks, and automated approvals. The agent monitors consistency; humans make the final comp decisions.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* Pay Equity Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '26px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: 0 }}>
                    COMPENSATION REVIEW
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-green)', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 999, padding: '4px 10px' }}>
                    PASSES BAND
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Proposed Raise · Alex Rivera</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>$165k → $175k base salary · Software Engineer Level 3</p>
                <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12.5, lineHeight: 1.6, border: '1px solid var(--border-faint)' }}>
                  <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Band limit:</strong> $150k - $185k (Within Band)</p>
                  <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Pay Equity Audit:</strong> Checked against 4 peers (No anomalies)</p>
                  <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Equity Adjustment:</strong> Carta grant draft prepared (0.08%)</p>
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Structured pay bands and benefits that scale.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Bands & Pay Equity</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Define your compensation bands for each role, location, and seniority tier. When a manager suggests a comp change or promotion, the agent checks it against these bands and runs a pay-equity regression analysis to flag any outliers or potential disparities. Draft comp recommendations are prepared for your approval.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Equity & Benefits Integration</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The agent handles employee lifecycle data transfers. It integrates with Guideline to manage 401(k) enrollments and handles qualifying life events. Stock option grants and equity updates are drafted inside Carta. Payroll change files are compiled automatically per cycle.
                </p>
              </div>
            </div>
          </Page>
        </Beat>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
