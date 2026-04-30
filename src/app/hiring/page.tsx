import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'

export const metadata: Metadata = {
  title: 'Hiring — MambaHR',
  description: 'From req to offer. Without the loop. The agent screens, schedules, references, and drafts the offer. You decide who joins.',
}

const funnelSteps = [
  { num: '01', title: 'Req intake', agent: 'Reads Slack/form, drafts JD with comp band', you: 'Approve JD', hil: false },
  { num: '02', title: 'Posting', agent: 'Posts to ATS, LinkedIn, Indeed, job boards', you: '—', hil: false },
  { num: '03', title: 'Screening', agent: 'Ranks resumes, drafts shortlist with rationale', you: '—', hil: false },
  { num: '04', title: 'Scheduling', agent: 'Multi-calendar, time-zone aware, panel-coordinated', you: '—', hil: false },
  { num: '05', title: 'Interview kit', agent: 'Loads scorecards, briefs panel, synthesizes feedback', you: '—', hil: false },
  { num: '06', title: 'References', agent: 'Requests, follows up, summarizes, flags concerns', you: '—', hil: false },
  { num: '07', title: 'Background check', agent: 'Runs Checkr, flags issues, tracks timing', you: '—', hil: false },
  { num: '08', title: 'Offer', agent: 'Drafts, models counter-offer, sends for signature', you: 'Approve offers above band', hil: true },
]

const onboardingSteps = [
  'I-9 + right-to-work verification (3-day window enforced)',
  'W-4 (federal + state) + direct deposit',
  'Equipment provisioned (Apple Business, Hofy, etc.)',
  'Access provisioned (Okta SSO + downstream via SCIM)',
  'Buddy assigned + intro scheduled',
  'Day-one orientation + handbook acknowledgment',
  '30/60/90-day check-in cadence set',
  'Required training assigned (anti-harassment, security)',
  'New-hire announcement drafted',
]

export default function HiringPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 700 , margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>HIRING</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              From req to offer.<br />Without the loop.
            </h1>
            <p style={{ fontSize: 20, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36 }}>
              Reqs come in. The agent screens, schedules, references, and drafts the offer. You decide who joins.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#request-access" className="btn-gold">Request access →</a>
              <Link href="/mamba" className="btn-secondary">See the agent in Slack</Link>
            </div>
          </div>
        </section>

        {/* Funnel timeline */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>THE HIRING LOOP</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 64,
                lineHeight: 1.15,
              }}
            >
              A complete hiring loop, run by the agent.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {funnelSteps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr 1fr 1fr',
                    gap: 24,
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderBottom: i < funnelSteps.length - 1 ? '1px solid var(--border-faint)' : 'none',
                    background: i % 2 === 0 ? '#FFFFFF' : 'var(--bg-surface)',
                    borderRadius: i === 0 ? '12px 12px 0 0' : i === funnelSteps.length - 1 ? '0 0 12px 12px' : 0,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{step.num}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{step.title}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.45 }}>{step.agent}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {step.hil ? (
                      <>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: 'var(--gold-dark)', fontWeight: 500 }}>{step.you}</span>
                      </>
                    ) : (
                      <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>Agent handles</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr 1fr', gap: 24, padding: '12px 24px', marginTop: 8 }}>
              <span />
              <span />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Agent does</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>You approve</span>
            </div>
          </div>
        </section>

        {/* Day one ready */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>ONBOARDING</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 20,
                  lineHeight: 1.15,
                }}
              >
                Day one ready,<br />before day one.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Once they accept, the onboarding agent takes over. By the time they log in on day one, everything works — access, equipment, benefits, training, their first meeting.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {onboardingSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" stroke="var(--gold)" strokeWidth="1.5" />
                    <path d="M5 8l2.5 2.5 3.5-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In Slack */}
        <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>IN SLACK</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 40,
              }}
            >
              The whole loop, from a thread.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
              {[
                { cmd: '@mamba open a req for Senior Engineer, NYC hybrid, $160–190k', resp: 'JD drafted, posted to Greenhouse. 3 sourcing strategies initiated. Shortlist expected in 3 days.' },
                { cmd: '@mamba write the offer for Alex at $175k + 0.12% equity, May 15 start', resp: 'Offer drafted. Above band by 4% — flagging for your approval before it goes to Alex. Review link sent.' },
              ].map((ex, i) => (
                <div key={i} style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono), monospace', marginBottom: 8 }}>{ex.cmd}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <img src="/MambaHR_logo.png" alt="Mamba" width={20} height={20} style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{ex.resp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
