import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function RIFPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>HEADCOUNT & WORKFORCE PLANNING</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Reductions,<br />
                  <span style={{ color: 'var(--gold-dark)' }}>done defensibly.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  Plan changes, model severance, and run reductions with compliance safety checks. Fully gated and always human-approved.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* RIF safety check mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '26px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: 0 }}>
                    WORKFORCE PLAN PREFLIGHT
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-red)', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 999, padding: '4px 10px' }}>
                    1 BLOCKER
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Model Alpha · California Division</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13 }}>
                    <span style={{ color: 'var(--color-red)', fontWeight: 700 }}>✕</span>
                    <span style={{ color: 'var(--text)' }}>WARN Act trigger: 62 employees in CA (Needs 60-day notice)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13 }}>
                    <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>✓</span>
                    <span style={{ color: 'var(--text-muted)' }}>Severance math verified (OWBPA Compliant)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13 }}>
                    <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>✓</span>
                    <span style={{ color: 'var(--text-muted)' }}>Legal hold drafted (Litigation Hold ready)</span>
                  </div>
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Structure RIF scenarios without leaks or legal risks.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Scenario Modeling & Severance Math</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Run workforce planning models in isolated workspace lanes. The agent models headcount reductions, handles complex severance calculations, and verifies compliance against OWBPA (Older Workers Benefit Protection Act) rules. Multiple legal entities can be managed with separate access permissions.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Preflight Safety Controls</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The agent runs an 18-point preflight safety checklist before any RIF plan can be executed. It scans for internal candidate redeployments, checks local WARN notice thresholds, drafts release agreements, and coordinates legal holds. All RIF decisions require three-role human approval.
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
