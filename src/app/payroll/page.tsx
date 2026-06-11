import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

const changeTypes = [
  'New hire payroll records',
  'Termination final pay adjustments',
  'Compensation band increases',
  'Job title & manager changes',
  'FMLA / Paid family leave timesheets',
  'Benefits election deductions (401k)',
  'Qualifying life event updates',
  'Audit trails on historical changes',
]

export default function PayrollPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>PAYROLL EXPORTS</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Keep your payroll.<br />
                  <span style={{ color: 'var(--gold-dark)' }}>We get it ready.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  MambaHR compiles every new hire, comp bump, and leave adjustment into a clean change file formatted for your provider. No double-entry.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* Payroll Export Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '26px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: 0 }}>
                    PAYROLL CHANGE REPORT
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold-dark)', background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 999, padding: '4px 10px' }}>
                    EXPORT READY
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Cycle: November 15 · Monthly Pay</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-faint)', paddingBottom: 6 }}>
                    <span>Priya Shah (New Hire)</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>+$8,333.33</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-faint)', paddingBottom: 6 }}>
                    <span>Alex Rivera (Comp Increase)</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600 }}>+$833.33</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4 }}>
                    <span>Marcus Webb (Unpaid FMLA Adjustment)</span>
                    <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>-$1,240.00</span>
                  </div>
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Works alongside your existing payroll system.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>We Don&apos;t Run Payroll. We Prep It.</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  MambaHR does not process tax filings or disperse paychecks directly. Instead, the agent tracks every structural change across your team and drafts a change log ready for your payroll processor. Download the CSV in Gusto, Workday, Rippling, Namely, or ADP formats and upload it to run payroll in minutes.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Tracked Changes Included:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginTop: 12 }}>
                  {changeTypes.map((type) => (
                    <div key={type} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 7l4 4 6-6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{type}</span>
                    </div>
                  ))}
                </div>
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
