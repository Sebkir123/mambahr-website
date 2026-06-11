import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

export default function DocumentsPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>DOCUMENT MANAGEMENT & E-SIGNATURE</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Generated, signed,<br />
                  <span style={{ color: 'var(--gold-dark)' }}>filed, retained.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  Your legal agreements and HR policies, compiled and executed on auto-pilot. Integration with DocuSign allows end-to-end management inside the agent thread.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* DocuSign audit card mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', padding: '26px 28px' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', fontFamily: 'var(--font-mono), monospace', margin: '0 0 14px' }}>
                  E-SIGN STATUS
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Separation Agreement · Tom Harrison</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>✓</span>
                    <span style={{ color: 'var(--text-muted)' }}>Document generated (CA state specific)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>✓</span>
                    <span style={{ color: 'var(--text-muted)' }}>Signed by Employee (Verified DocuSign envelope)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid var(--border-mid)', borderTopColor: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text)' }}>Awaiting Co-founder countersignature</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 10, fontSize: 11, color: 'var(--text-faint)' }}>
                  Envelope ID: docusign_env_8b91c29a
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capability details */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Gated templates and automated signer chains.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Dynamic Document Compilation</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Keep your templates updated and state-aware. The agent automatically selects the right template variations based on employee jurisdiction, compiles details like role details, comp numbers, and severance dates, and sends the final PDF to sign.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Secure Retention & PII Redaction</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  All executed documents are stored securely in your employee database. Sensitive information is filtered through a PII redaction layer before indexation for general search, ensuring that only users with granular authorization can access personal data.
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
