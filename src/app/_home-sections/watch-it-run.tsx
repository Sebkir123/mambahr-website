import Image from 'next/image'
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

export default function WatchItRunSection() {
  return (
    <Beat bg="white">
      <Page>
        <div className="wir-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
          {/* Copy */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Watch it run</p>
            <h2 className="t-h2" style={{ margin: '0 0 20px' }}>Day one, handled before they arrive.</h2>
            <p className="t-lead" style={{ margin: '0 0 16px' }}>
              A candidate accepts. The agent runs the whole fanout — paperwork, accounts, device, buddy, calendar — and surfaces only the budget call for your sign-off.
            </p>
            <p className="t-body" style={{ margin: 0 }}>
              One workflow. No checklist living in someone&rsquo;s head, no day-one scramble.
            </p>
          </div>

          {/* Onboarding surface */}
          <div
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              boxShadow: 'var(--shadow-float), var(--sheen)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
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

            {/* Progress line */}
            <div style={{ padding: '12px 20px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>ONBOARDING · 6 OF 6 READY</span>
            </div>

            {/* Checklist */}
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

        {/* Compressed pull-quote */}
        <figure style={{ maxWidth: 760, margin: '80px auto 0', textAlign: 'center' }}>
          <blockquote style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 400, lineHeight: 1.38, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
            &ldquo;By week two, the agent was handling the operational lane — leave, classifications, multi-state filings, onboarding. <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>I started doing the role I was actually hired for.</em>&rdquo;
          </blockquote>
          <figcaption style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border)', position: 'relative', background: 'var(--bg-warm)' }}>
              <Image src="/avatars/head-of-people.jpg" alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
            </span>
            <span style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>Head of People</span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-faint)', marginTop: 1 }}>MambaHR design partner · in private beta</span>
            </span>
          </figcaption>
        </figure>
      </Page>

      <style>{`
        @media (max-width: 1024px) {
          .wir-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Beat>
  )
}
