import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'

const checklist = [
  { label: 'Offer letter generated + countersigned', meta: 'DocuSign' },
  { label: 'I-9 verified, E-Verify cleared', meta: 'Federal' },
  { label: 'Accounts provisioned', meta: 'Okta · Google · Slack' },
  { label: 'Device set up', meta: 'Jamf' },
  { label: 'Onboarding buddy assigned', meta: 'Eng team' },
  { label: 'First-week calendar invites sent', meta: '5 meetings' },
]

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="var(--green)" />
    <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function OnboardingPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
          <Page>
            <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>ONBOARDING & OFFBOARDING</p>
                <h1 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.0 }}>
                  Day one to last day.<br />
                  <span style={{ color: 'var(--gold-dark)' }}>One workflow.</span>
                </h1>
                <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                  From a signed offer letter to account deprovisioning. The agent runs the entire workflow, with you in the loop for sign-offs.
                </p>
                <a href="/demo" className="btn-gold">Request access →</a>
              </div>

              {/* Onboarding Checklist Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 18, boxShadow: 'var(--shadow-float), var(--sheen)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                    AR
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>Alex Rivera</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '1px 0 0' }}>Senior Engineer · starts Monday</p>
                  </div>
                  <span className="gold-pulse" style={{ background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>
                    DAY 1 READY
                  </span>
                </div>
                <div style={{ padding: '12px 20px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>ONBOARDING · 6 OF 6 READY</span>
                </div>
                <div style={{ padding: '8px 20px 20px' }}>
                  {checklist.map((item) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border-faint)' }}>
                      <Check />
                      <span style={{ flex: 1, fontSize: 14.5, color: 'var(--text)' }}>{item.label}</span>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>{item.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Page>
        </Beat>

        {/* Detailed capabilities beat */}
        <Beat bg="white">
          <Page narrow>
            <h2 className="t-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Complete automation from signed offer to exit.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Day-One Readiness</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Once a candidate accept letters generated and signed via DocuSign, the agent handles the setup. It triggers I-9 and E-Verify checks, provisions accounts in Okta, Google Workspace, and Slack, sets up hardware management via Jamf, assigns their onboarding buddy, and schedules first-week meetings.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Compliant Offboarding</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  When an employee exits, the agent executes the reverse process. It handles state-specific final pay calculations, drafts separation agreements, coordinates COBRA triggers, and revokes accounts instantly. Terminations are always gated by human approval.
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
