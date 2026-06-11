import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function LeavePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>TIME OFF & LEAVE</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Leave that reads the<br />
                  <span style={{ color: 'var(--gold-dark)' }}>statute for you.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  PTO, FMLA eligibility, and state paid-leave stacking. The agent evaluates every request against your policy and the law, routing only what requires a human.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* FMLA Cited Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '28px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: 'var(--text)', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
                    Marcus Webb — FMLA Eligibility Request
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold-dark)', background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    NEEDS SIGN-OFF
                  </span>
                </div>
                <div style={{ background: 'var(--gold-tint)', borderLeft: '3px solid var(--gold-dark)', borderRadius: '0 10px 10px 0', padding: '16px 20px', marginBottom: 18 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px', fontFamily: 'var(--font-mono), monospace' }}>
                    Agent Assessment
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.35 }}>
                    Eligible: FMLA & CA CFRA stacking.
                  </p>
                  <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Employee has 14 months tenure and 1,400 hours worked. Under California rules, CFRA stacks on top of federal FMLA. Approve up to 12 weeks of job-protected leave.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>Citing:</span>
                  {['FMLA', 'CA CFRA', 'DLSE 7-2024'].map((r) => (
                    <span key={r} style={{ fontSize: 11.5, color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-faint)', borderRadius: 5, padding: '2px 8px', fontFamily: 'var(--font-mono), monospace' }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Details page */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Routine time-off auto-approved. Complex cases routed.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Routine PTO & Sick Time</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Employees mention the agent in Slack or Teams to request time off. The agent instantly verifies their accrual balance, checks for calendar conflicts within their department, and either auto-approves within your policy or notifies their manager.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Extended & Statutory Leaves</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  For parental, FMLA, state-specific paid family leave, or disability accommodations, the agent runs the calculations. It reads state statutes to stack FMLA, CA CFRA, MA PFML, or CO FAMLI properly, ensuring your organization stays compliant with local employment laws. Anything ambiguous or health-related escalates to you.
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
