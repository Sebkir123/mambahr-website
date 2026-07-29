'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import {
  PageHero, AgentLoop, FeatureSplit, PageCta, Em,
  type LoopStep,
} from '@/components/v2/page-kit'

const STEPS: LoopStep[] = [
  { n: '01', img: '/avatars/maya.jpg',   label: 'Offer letter sent, Maya Chen',   desc: 'Senior Engineer · $195k · above band 8%',     who: 'agent', time: '2 min' },
  { n: '02', img: '/avatars/priya.jpg',  label: 'Leave approved, Jordan Lee',    desc: 'CA PDL, CFRA and FMLA sequenced · job protected', who: 'agent', time: '4 min' },
  { n: '03', img: '/avatars/marcus.jpg', label: 'PIP drafted, Marcus Webb',       desc: '90-day evidence cited · L3 sign-off queued',  who: 'you',   time: 'Pending' },
  { n: '04', img: '/avatars/sarah.jpg',  label: 'Separation docs, Sarah Lin',     desc: 'State-aware final pay · signature chain ready', who: 'you',   time: 'Review' },
]

const CAPABILITIES = [
  {
    eyebrow: 'Onboarding & offboarding',
    title: <>Day one to last day, <Em>one workflow.</Em></>,
    lead: 'A signed offer kicks off the whole fanout, provisioning, I-9, device, first-week calendar. An exit runs the reverse, always with a human on final pay.',
    bullets: [
      'Offer generated + countersigned (e-signed)',
      'I-9 verified, E-Verify cleared',
      'Accounts provisioned (IdP, Slack, app suite)',
      'Device set up (MDM), buddy + first-week calendar',
      'Offboarding: WARN / COBRA / OWBPA, state-aware final pay',
    ],
    flip: false,
    warm: false,
  },
  {
    eyebrow: 'Time off & leave',
    title: <>Leave that reads <Em>the statute for you.</Em></>,
    lead: 'Requests come in as plain text. The agent checks eligibility, stacks the right entitlements, and auto-approves within policy or routes to a human.',
    bullets: [
      'PTO accrual and balances, tracked automatically',
      'FMLA eligibility + state paid-leave stacking (CA, NY, MA, CO)',
      'Auto-approve within policy, or route to a person',
      'Anything medical or ambiguous escalates',
      'Benefits: 401(k) enrollment + qualifying life-event changes',
    ],
    flip: true,
    warm: true,
  },
  {
    eyebrow: 'Performance management',
    title: <>Reviews that <Em>actually get written.</Em></>,
    lead: 'The agent drafts narratives from real evidence and cites every claim. You run calibration and make the calls.',
    bullets: [
      'Annual, quarterly, probationary, promotion, and PIP cycles',
      'AI-drafted review narratives with cited evidence',
      '9-box calibration + fairness intelligence',
      'Comp-change recommendations, human-approved',
      'Disputes, appeals, and signed close artifacts',
    ],
    flip: false,
    warm: false,
  },
  {
    eyebrow: 'Compensation',
    title: <>Raises that <Em>stay fair.</Em></>,
    lead: 'Market bands and a real pay-equity model behind every comp change, with a fairness gate before anything is final.',
    bullets: [
      'Market bands on every role',
      'Pay-equity regression, p-values, outliers flagged',
      'Promotions and raises with risk-based approval routing',
      'Fairness gate on all sensitive changes',
      'Comp-change draft, human-approved before anything sends',
    ],
    flip: true,
    warm: true,
  },
  {
    eyebrow: 'Compliance',
    title: <>Every decision, <Em>cited to the rule.</Em></>,
    lead: 'Federal baseline everywhere, plus state-specific rules where states differ. Confidence-scored, and edge cases route to a human.',
    bullets: [
      'Federal employment law + all 50 states',
      'Statute citation on every decision',
      'Confidence scoring + freshness tracking',
      'Append-only audit log on every action',
      'Ambiguous calls route to your legal team',
    ],
    flip: false,
    warm: false,
  },
  {
    eyebrow: 'Headcount & RIF',
    title: <>Reductions, <Em>done defensibly.</Em></>,
    lead: 'Plan a reduction, model severance, and run the legal steps, heavily gated, always human-approved.',
    bullets: [
      'Scenario planning + severance and final-pay math',
      'WARN notices and batch legal hold',
      'Internal-redeployment scan before anyone is cut',
      '18-point preflight safety check that hard-blocks',
      'Three-role approval, humans sign off',
    ],
    flip: true,
    warm: true,
  },
  {
    eyebrow: 'Documents & e-sign',
    title: <>Generated, signed, <Em>filed, retained.</Em></>,
    lead: 'Offers, separation agreements, NDAs, and policies, versioned, jurisdiction-scoped, and sent for signature without leaving the agent.',
    bullets: [
      'Templates for offer / separation / NDA / policy',
      'Signer chains, e-sign end to end',
      'Versioned and jurisdiction-scoped',
      'Filed and retained per your policy',
      'Indexed for retrieval, PII-redacted on export',
    ],
    flip: false,
    warm: false,
  },
]

function CapCard({ bullets }: { bullets: string[] }) {
  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '22px 24px',
      boxShadow: 'var(--shadow-float)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {bullets.map((b) => (
        <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="8" fill="var(--gold-tint)" />
            <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.45 }}>{b}</span>
        </div>
      ))}
    </div>
  )
}

export default function ProductPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        <PageHero
          eyebrow="The product"
          title={<>See the agent <Em>run the work.</Em></>}
          lead="Hiring, onboarding, leave, performance, compensation, compliance, handled end to end, with a human on the calls that matter."
        >
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: 'var(--shadow-float)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="mamba-chip working" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', background: 'var(--gold-tint)', borderRadius: 999, padding: '4px 10px' }}>
                MambaHR · working
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>4 workflows in flight</span>
            </div>
            {STEPS.slice(0, 3).map((s) => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: '1px solid var(--border-faint)' }}>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums', width: 20 }}>{s.n}</span>
                {s.img && <img src={s.img} alt="" width={24} height={24} style={{ borderRadius: 999, objectFit: 'cover' }} />}
                <span style={{ flex: 1, fontSize: 13.5, color: 'var(--text)', fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 11, color: s.who === 'you' ? 'var(--gold-dark)' : 'var(--text-faint)' }}>
                  {s.who === 'you' ? 'You decide' : 'MambaHR'}
                </span>
              </div>
            ))}
          </div>
        </PageHero>

        <AgentLoop
          eyebrow="Live today"
          title={<>Four workflows. <Em>One morning.</Em></>}
          lead="A sample of what MambaHR handles while you focus on what requires you."
          steps={STEPS}
        />

        {/* Bullets live in the CapCard visual only. Passing them to FeatureSplit
            too would print the same list twice in one section. */}
        {CAPABILITIES.map((cap) => (
          <FeatureSplit
            key={cap.eyebrow}
            eyebrow={cap.eyebrow}
            title={cap.title}
            lead={cap.lead}
            flip={cap.flip}
            warm={cap.warm}
          >
            <CapCard bullets={cap.bullets} />
          </FeatureSplit>
        ))}

        <PageCta
          title={<>One AI department.<br /><Em>Every HR function.</Em></>}
          sub="Replace the admin work, keep the humans where they matter."
        />
      </main>
      <Footer />
    </>
  )
}
