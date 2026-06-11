import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function CompliancePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>COMPLIANCE</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Every decision,<br />
                  <span style={{ color: 'var(--gold-dark)' }}>cited to the rule.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  A federal baseline everywhere, plus state-specific rules. Kept current across all 50 states. Every decision includes citation files.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* Compliance Cite Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '28px 30px' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: '0 0 14px' }}>
                  DECISION CITED BACKING
                </p>
                <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.015em', lineHeight: 1.25 }}>
                  Statute Citation: DLSE 7-2024
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 14 }}>
                  California Paid Family Leave (PFL) benefits can be stacked sequentially with federal FMLA leave for pregnancy disability.
                </p>
                <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.6, border: '1px solid var(--border-faint)' }}>
                  <p style={{ margin: '0 0 2px' }}><strong style={{ color: 'var(--text)' }}>Source:</strong> California Code of Regulations § 11044</p>
                  <p style={{ margin: '0 0 2px' }}><strong style={{ color: 'var(--text)' }}>Freshness:</strong> Verified June 2026</p>
                  <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Audit Ref:</strong> audit_log_3c92e1</p>
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Continuous state-by-state compliance monitoring.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Federal Baseline + State Rules</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The compliance engine handles the federal baseline across your team, plus state-specific rules (paid leave, wage adjustments, non-competes, pay transparency) where states differ. Every compliance action cites its exact statute sources for complete transparency.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Append-Only Auditing</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  MambaHR writes every decision, intent check, and human approval to an immutable, append-only audit log. If auditors or legal teams request proof of compliance, you have the historical record ready. Ambiguous or borderline calls route directly to your legal team.
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
