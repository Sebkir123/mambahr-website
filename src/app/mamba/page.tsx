import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import SlackThread from '@/components/surfaces/slack-thread'
import RoutingLog from '@/components/surfaces/routing-log'

export const metadata: Metadata = {
  title: 'Mamba — MambaHR',
  description: '@mamba, take it from here. Mention the agent in Slack. It reads the thread, checks the policy, takes the action, logs the trail.',
}

const heroMessages = [
  {
    name: 'Priya Shah',
    initials: 'PS',
    avatarColor: '#C4B5D4',
    time: '9:02 AM',
    content: 'Hey, anyone know how parental leave works for adoption? Adopting in June.',
  },
  {
    name: 'Marcus Webb',
    initials: 'MW',
    avatarColor: '#D4C4B5',
    time: '9:04 AM',
    content: '@mamba — can you help here?',
  },
  {
    name: 'Mamba',
    initials: 'M',
    isMamba: true as const,
    time: '9:04 AM',
    content: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Priya — congratulations! Here is what applies to you:</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '12px 14px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 4px' }}>
            <strong style={{ color: 'var(--text)' }}>Eligibility:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>18 months tenure ✓ (12 months required)</span>
          </p>
          <p style={{ margin: '0 0 4px' }}>
            <strong style={{ color: 'var(--text)' }}>Federal:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>12 weeks FMLA unpaid (adoption covered)</span>
          </p>
          <p style={{ margin: '0 0 4px' }}>
            <strong style={{ color: 'var(--text)' }}>State (CA):</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>8 weeks CA CFRA — stacks with FMLA</span>
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--text)' }}>Company top-up:</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>8 weeks paid per policy §4.2</span>
          </p>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 12 }}>
          Total: up to 20 weeks. Want to start the paperwork?{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 500 }}>Start leave request →</span>
        </p>
      </div>
    ),
  },
]

const exampleThreads = [
  {
    label: 'Leave request',
    channel: 'general',
    messages: [
      { name: 'Emma R.', initials: 'ER', avatarColor: '#D4C4B5', time: '9:02 AM', content: '@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉' },
      { name: 'Mamba', initials: 'M', isMamba: true as const, time: '9:02 AM', content: 'Approved. Balance 12 → 9 days. Calendar blocked, manager notified.' },
    ],
  },
  {
    label: 'Offer letter',
    channel: 'recruiting',
    messages: [
      { name: 'Brian Bell', initials: 'BB', avatarColor: '#B5C4D4', time: '2:12 PM', content: '@mamba write the offer for Maya at $185k base + 0.15% equity, June 1 start' },
      { name: 'Mamba', initials: 'M', isMamba: true as const, time: '2:13 PM', content: 'Draft ready — sent to you for review before routing to Maya. Includes equity grant, cliff, and vesting terms.' },
    ],
  },
  {
    label: 'Headcount question',
    channel: 'people-ops',
    messages: [
      { name: 'Sarah Kim', initials: 'SK', avatarColor: '#D4D4B5', time: '4:00 PM', content: 'How many people have we hired this quarter?' },
      { name: 'Mamba', initials: 'M', isMamba: true as const, time: '4:00 PM', content: '14 hires Q2 (vs 9 in Q1). Engineering: 8, GTM: 4, G&A: 2. Attrition: 2 voluntary. Net headcount: +12.' },
    ],
  },
  {
    label: 'Policy question',
    channel: 'general',
    messages: [
      { name: 'Liam Torres', initials: 'LT', avatarColor: '#C4D4B5', time: '10:45 AM', content: "What's the bereavement policy for an aunt?" },
      { name: 'Mamba', initials: 'M', isMamba: true as const, time: '10:45 AM', content: 'Per policy §6.1: 1 paid day for non-immediate family (aunt, uncle, cousin). No documentation required. Want to submit a request?' },
    ],
  },
]

const channelDetails = [
  {
    label: 'Slack',
    logo: '/slack-new-logo.svg',
    copy: 'Mention @mamba in any channel or DM. It reads the thread context, knows who asked, checks their role and permissions, and responds in the same thread. Slash commands available for power users.',
  },
  {
    label: 'Microsoft Teams',
    logo: '/Microsoft_Symbol_0.svg',
    copy: 'Same agent on the Microsoft surface. Adaptive cards, @mentions, and tabs in Teams channels. Works with your existing Microsoft 365 identity.',
  },
  {
    label: 'Web app',
    logo: '/MambaHR_logo.png',
    copy: 'The Today queue, People directory, hiring pipeline, reports, and settings — all in a web app at app.mambahr.com. Used by the CHRO for approvals and analytics. Optional for everyone else.',
  },
]

const trustCards = [
  { label: 'RBAC scoped to your role', desc: 'The agent only surfaces information and actions your role is authorized to see. Managers see their reports. Employees see their own data.' },
  { label: 'Every action audit-logged', desc: 'Every tool call, every decision, every approval — written to an immutable audit log. SOC 2 evidence on day one.' },
  { label: 'PII never enters the LLM context', desc: 'SSNs, DOBs, bank accounts, medical information — never passed to the model. The agent works with identifiers and references, not raw data.' },
]

export default function MambaPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 20 }}>MAMBA — THE AGENT</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 58px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.05,
                }}
              >
                @mamba,<br />take it from here.
              </h1>
              <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 36 }}>
                Mention the agent in any Slack channel. It reads the thread. Checks the policy. Takes the action. Logs the trail. Replies in seconds.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#request-access" className="btn-gold">Request access →</a>
                <Link href="/today" className="btn-secondary">See Today queue</Link>
              </div>
            </div>
            <div>
              <SlackThread channel="people-ops" messages={heroMessages} />
            </div>
          </div>
        </section>

        {/* Example threads */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>WHAT YOU CAN ASK</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              It speaks HR.
            </h2>
            <p style={{ textAlign: 'center', fontSize: 17, color: 'var(--text-muted)', marginBottom: 64, maxWidth: 480, margin: '0 auto 64px' }}>
              Natural language. No commands to memorize. No forms to fill. Just tell it what you need.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {exampleThreads.map((thread) => (
                <div key={thread.label}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>{thread.label}</p>
                  <SlackThread channel={thread.channel} messages={thread.messages} compact />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where it lives */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>WHERE IT LIVES</p>
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
              One agent. Every surface.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {channelDetails.map((ch) => (
                <div key={ch.label} style={{ background: 'var(--bg-warm)', borderRadius: 16, padding: '28px 24px' }}>
                  <div style={{ width: 36, height: 36, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={ch.logo} alt={ch.label} width={32} height={32} style={{ display: 'block', objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{ch.label}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{ch.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Under the hood — live routing log */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'flex-start' }}>

              {/* Left: explanation */}
              <div>
                <p className="eyebrow" style={{ marginBottom: 20 }}>HOW IT ROUTES</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(32px, 4vw, 52px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    marginBottom: 24,
                    lineHeight: 1.0,
                  }}
                >
                  One question.<br />The right specialist.<br />Every time.
                </h2>
                <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                  Mamba reads the message, classifies the intent, checks your role, and hands the request to the right specialist. The specialist works, cites sources, and returns the answer through the same rail.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { n: '01', t: 'Read', d: 'Parse the message in context — channel, thread, who is asking, what role.' },
                    { n: '02', t: 'Route', d: 'Classify intent and select the specialist with the right tools and permissions.' },
                    { n: '03', t: 'Resolve', d: 'Specialist runs the work, cites sources, returns the answer through Mamba.' },
                  ].map((s) => (
                    <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.04em' }}>{s.n}</span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{s.t}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, margin: '4px 0 0' }}>{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-faint)', lineHeight: 1.6 }}>
                  14 specialist agents work behind one rail.<br />All gated by your policy. Every action audit-logged.
                </p>
              </div>

              {/* Right: live routing log mockup (entries stream in on scroll) */}
              <RoutingLog />

            </div>
          </div>
        </section>

        {/* Trust */}
        <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {trustCards.map((card) => (
                <div key={card.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{card.label}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{card.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-faint)' }}>
              <Link href="/security" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Full security details →</Link>
            </p>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
