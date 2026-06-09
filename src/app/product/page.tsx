import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import { Beat, Page } from '@/components/ui/page'
import {
  OnboardingIcon, TimeOffIcon, PerformanceIcon, CompIcon,
  ComplianceIcon, ChangeMgmtIcon, ReportsIcon,
} from '@/components/surfaces/agent-icons'

const LazyPlayer = dynamic(() => import('@/components/scenarios/scenarios-section'), {
  loading: () => (
    <div style={{ minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
        Loading…
      </span>
    </div>
  ),
})

type Capability = {
  id: string
  icon: ReactNode
  eyebrow: string
  title: string
  body: string
  bullets: string[]
}

// Every bullet maps to a SAFE claim in features.md. Human-approved actions are marked.
const CAPABILITIES: Capability[] = [
  {
    id: 'onboarding',
    icon: <OnboardingIcon />,
    eyebrow: 'Onboarding & offboarding',
    title: 'Day one to last day, one workflow.',
    body: 'A signed offer kicks off the whole fanout. An exit runs the reverse — always with a human on the final pay and termination calls.',
    bullets: [
      'Offer letter generated + countersigned (DocuSign)',
      'I-9 verified, E-Verify cleared',
      'Accounts provisioned (Okta, Entra, Google, Slack)',
      'Device set up (Jamf), buddy + first-week calendar',
      'Offboarding: WARN / COBRA / OWBPA, state-aware final pay (human-approved)',
    ],
  },
  {
    id: 'leave',
    icon: <TimeOffIcon />,
    eyebrow: 'Time off & leave',
    title: 'Leave that reads the statute for you.',
    body: 'Requests come in as plain text. The agent checks eligibility, stacks the right entitlements, and either approves within policy or routes to a human.',
    bullets: [
      'PTO accrual and balances, tracked automatically',
      'FMLA eligibility + state paid-leave stacking (CA CFRA, NY, MA, CO)',
      'Auto-approve within policy, or route to a person',
      'Anything medical or ambiguous escalates',
      'Benefits: 401(k) enrollment + qualifying life-event changes',
    ],
  },
  {
    id: 'performance',
    icon: <PerformanceIcon />,
    eyebrow: 'Performance management',
    title: 'Reviews that actually get written.',
    body: 'The agent drafts narratives from real evidence and cites every claim. You run calibration and make the calls.',
    bullets: [
      'Cycles: annual, quarterly, probationary, promotion, PIP',
      'AI-drafted review narratives with cited evidence',
      '9-box calibration + fairness intelligence',
      'Comp-change recommendations (human-approved)',
      'Disputes, appeals, and signed close artifacts',
    ],
  },
  {
    id: 'comp',
    icon: <CompIcon />,
    eyebrow: 'Compensation',
    title: 'Raises that stay fair.',
    body: 'Market bands and a real pay-equity model behind every comp change — with a fairness gate before anything is final.',
    bullets: [
      'Market bands on every role',
      'Pay-equity regression (p-values, outliers flagged)',
      'Promotions and raises with risk-based approval',
      'Comp-change recommendation drafts (human-approved)',
      'Fairness gate on sensitive changes',
    ],
  },
  {
    id: 'compliance',
    icon: <ComplianceIcon />,
    eyebrow: 'Compliance',
    title: 'Every decision, cited to the rule.',
    body: 'A federal baseline everywhere, plus state-specific rules where states differ. Confidence-scored, and edge cases route to a human.',
    bullets: [
      'Federal employment law + all 50 states',
      'Statute citation on every decision',
      'Confidence scoring + freshness tracking',
      'Append-only audit log on every action',
      'Ambiguous calls route to your legal team',
    ],
  },
  {
    id: 'rif',
    icon: <ChangeMgmtIcon />,
    eyebrow: 'Headcount & RIF',
    title: 'Reductions, done defensibly.',
    body: 'Plan a reduction, model severance, and run the legal steps — heavily gated, always human-approved.',
    bullets: [
      'Scenario planning + severance and final-pay math',
      'WARN notices and batch legal hold',
      'Internal-redeployment scan before anyone is cut',
      '18-point preflight safety check that hard-blocks',
      'Three-role approval; humans sign off',
    ],
  },
  {
    id: 'documents',
    icon: <ReportsIcon />,
    eyebrow: 'Documents & e-sign',
    title: 'Generated, signed, filed, retained.',
    body: 'Offers, separation agreements, NDAs, and policies — versioned, jurisdiction-scoped, and sent for signature without leaving the agent.',
    bullets: [
      'Templates for offer / separation / NDA / policy',
      'DocuSign signer chains, e-sign end to end',
      'Versioned and jurisdiction-scoped',
      'Filed and retained per your policy',
      'Indexed for retrieval, PII-redacted first',
    ],
  },
]

function CapabilityBeat({ cap, index }: { cap: Capability; index: number }) {
  const flip = index % 2 === 1 // on desktop, swap so visual sits on the left
  const visual = (
    <div
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        boxShadow: 'var(--shadow-float), var(--sheen)',
        padding: '26px 28px',
      }}
    >
      <span
        style={{
          display: 'inline-flex', width: 44, height: 44, borderRadius: 11,
          background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.22)',
          color: 'var(--gold-dark)', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
        }}
      >
        {cap.icon}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cap.bullets.map((b) => (
          <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="8" cy="8" r="8" fill="var(--gold-tint)" />
              <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.45 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
  const copy = (
    <div>
      <p className="eyebrow" style={{ marginBottom: 14 }}>{cap.eyebrow}</p>
      <h2 className="t-h2" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', margin: '0 0 16px' }}>{cap.title}</h2>
      <p className="t-lead" style={{ margin: 0 }}>{cap.body}</p>
    </div>
  )
  return (
    <Beat id={cap.id} bg={index % 2 === 0 ? 'white' : 'warm'} style={{ scrollMarginTop: 72 }}>
      <Page>
        <div className={`cap-grid${flip ? ' flip' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {/* DOM order always copy-then-visual (correct on mobile); desktop flips via CSS */}
          {copy}
          {visual}
        </div>
      </Page>
    </Beat>
  )
}

export default function ProductPage() {
  return (
    <>
      <MegaNav />
      <main>
        {/* Hero */}
        <Beat bg="warm" style={{ paddingTop: 'calc(var(--beat-pad) + 24px)' }}>
          <Page>
            <div style={{ maxWidth: 760 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>The product</p>
              <h1 className="t-display" style={{ fontSize: 'clamp(44px, 6vw, 72px)', margin: '0 0 20px' }}>
                See the agent run the work.
              </h1>
              <p className="t-lead" style={{ maxWidth: 560, margin: 0 }}>
                Hiring, onboarding, leave, performance, compensation, compliance — handled end to end, with a human
                on the calls that matter. Watch a few real workflows, then dig into each function.
              </p>
            </div>
          </Page>
        </Beat>

        {/* Interactive scenario player */}
        <section style={{ background: '#FFFFFF', padding: 'var(--beat-pad) 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Watch it work</p>
              <h2 className="t-h2" style={{ margin: '0 0 16px' }}>Six workflows, start to finish.</h2>
              <p className="t-lead" style={{ margin: 0 }}>
                Each one is a real request resolved the way the agent resolves it — paperwork, citations, and the
                sign-off that comes back to you.
              </p>
            </div>
            <LazyPlayer />
          </div>
        </section>

        {/* Capability deep-dives (anchor targets for nav + coverage grid) */}
        {CAPABILITIES.map((cap, i) => (
          <CapabilityBeat key={cap.id} cap={cap} index={i} />
        ))}

        <RequestAccessSection />
      </main>
      <Footer />

      <style>{`
        @media (min-width: 1025px) {
          .cap-grid.flip > :first-child { order: 2; }
          .cap-grid.flip > :last-child  { order: 1; }
        }
        @media (max-width: 1024px) {
          .cap-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  )
}
