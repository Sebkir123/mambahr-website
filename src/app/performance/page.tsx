import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function PerformancePage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>PERFORMANCE MANAGEMENT</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Reviews that actually<br />
                  <span style={{ color: 'var(--gold-dark)' }}>get written.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  Review cycles run by the agent. It synthesizes evidence, drafts cited review narratives, and supports calibration, while you hold the final decision.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* Performance review draft preview */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '26px 28px' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: '0 0 14px' }}>
                  AI-DRAFTED REVIEW NARRATIVE
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Senior Engineer Cycle · Maya Chen</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 14 }}>
                  &ldquo;Maya has consistently exceeded expectations for engineering execution this quarter. Her leading role in shipping the database migration project on time was praised by both cross-functional peers and team leads.&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>Citations:</span>
                  {['shipped-db-mig', 'peer-feedback-dave', 'calendar-due-date'].map((ref) => (
                    <span key={ref} style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-faint)', borderRadius: 5, padding: '2px 6px', fontFamily: 'var(--font-mono), monospace' }}>{ref}</span>
                  ))}
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Continuous alignment without the administrative drag.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Automated Cycles & Calibration</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The agent launches review cycles (annual, quarterly, probationary, or promotion), coordinates invitations, and compiles feedback. For calibration meetings, it drafts 9-box grids and outlines performance trends based on historical project logs and cited peer feedback.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>PIP Tracking & Manager Coaching</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  When performance declines, the agent drafts Performance Improvement Plans (PIPs) that cite specific evidence and set clear milestones. Managers receive conversation prep notes and guidance, while all performance reviews and corrective actions are tracked securely in the audit trail. PIP drafts are always human-approved.
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
