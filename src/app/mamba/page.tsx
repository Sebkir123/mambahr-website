import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import SlackThread from '@/components/surfaces/slack-thread'
import RoutingLog from '@/components/surfaces/routing-log'
import MambaExamples from '@/components/sections/mamba-examples'

export const metadata: Metadata = {
  title: 'Mamba — MambaHR',
  description: '@mamba, take it from here. Mention the agent in any Slack channel — it reads the thread, checks the policy, takes the action, and replies in seconds.',
}

const heroMessages = [
  {
    name: 'Maya Chen',
    initials: 'MC',
    avatarColor: '#D4C4B5',
    time: '9:14 AM',
    content: '@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉',
  },
  {
    name: 'Mamba',
    initials: 'M',
    isMamba: true as const,
    time: '9:14 AM',
    content: (
      <div>
        <p style={{ margin: '0 0 10px' }}>Approved — enjoy the wedding 🎉</p>
        <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '10px 12px', fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Balance:</strong> <span style={{ color: 'var(--text-muted)' }}>12 → 9 days</span></p>
          <p style={{ margin: '0 0 3px' }}><strong style={{ color: 'var(--text)' }}>Calendar:</strong> <span style={{ color: 'var(--text-muted)' }}>Apr 7–9 blocked</span></p>
          <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Manager:</strong> <span style={{ color: 'var(--text-muted)' }}>notified · OOO set</span></p>
        </div>
      </div>
    ),
  },
]

const channelDetails = [
  {
    label: 'Slack',
    logo: '/slack-new-logo.svg',
    copy: 'Mention @mamba in any channel or DM. The agent reads the thread, checks who\'s asking, and replies in the same place. Slash commands available too.',
  },
  {
    label: 'Microsoft Teams',
    logo: '/Microsoft_Symbol_0.svg',
    copy: 'Same agent on Teams. Adaptive cards, @mentions, and tabs in channels. Works with your existing Microsoft 365 identity.',
  },
  {
    label: 'Web app',
    logo: '/MambaHR_logo.png',
    copy: 'Today queue, people directory, hiring pipeline, reports, and settings — all at app.mambahr.com. Used for approvals and analytics.',
  },
]

const trustCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="9" cy="7" r="3" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 10l3 3m0 0l-3 3m3-3h-5" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Scoped to your role',
    desc: 'The agent only surfaces what your role can see. Managers see their team. Employees see themselves.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M6 8h10M6 12h6M6 16h8" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    label: 'Every action audit-logged',
    desc: 'Every tool call, every decision, every approval — written to an immutable, cryptographically signed audit log.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="9" width="16" height="11" rx="2" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M7 9V6a4 4 0 018 0v3" stroke="var(--gold)" strokeWidth="1.4" />
        <circle cx="11" cy="14" r="1.5" fill="var(--gold)" />
      </svg>
    ),
    label: 'PII never enters the model',
    desc: 'SSNs, DOBs, bank accounts, medical info — never passed to the LLM. The agent works with references, not raw data.',
  },
]

export default function MambaPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO ── */}
        <section style={{ background: 'var(--bg)', padding: '90px 24px 72px' }}>
          <div className="hero-split" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 72, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 18 }}>MAMBA — THE AGENT</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(38px, 4.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: 22,
                  lineHeight: 1.0,
                }}
              >
                <span style={{ color: 'var(--gold-dark)' }}>@mamba,</span><br />take it from here.
              </h1>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
                Mention the agent in any Slack channel and it does the work — reads the thread, checks the policy, takes the action, replies in seconds. Your team stops processing tickets.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/demo" className="btn-gold">Request access →</a>
                <Link href="/today" className="btn-secondary">See Today queue</Link>
              </div>
            </div>
            <div className="hero-today-panel">
              <SlackThread channel="people-ops" messages={heroMessages} instant />
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE EXAMPLES ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>WHAT YOU CAN ASK</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 14,
                  lineHeight: 1.15,
                }}
              >
                It speaks HR.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                No commands. No forms. Just type what you need — pick a category to see how it answers.
              </p>
            </div>

            <MambaExamples />
          </div>
        </section>

        {/* ── HOW IT ROUTES ── */}
        <section style={{ background: 'var(--bg-cream)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'flex-start' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>HOW IT ROUTES</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(26px, 3vw, 38px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    marginBottom: 18,
                    lineHeight: 1.1,
                  }}
                >
                  One question.<br />The right specialist.
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 28 }}>
                  Mamba reads the message, classifies the intent, checks your role, and hands the request to the right specialist agent. The specialist runs the work, cites sources, and replies through Mamba.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { n: '01', t: 'Read', d: 'Parses the message in context — channel, thread, who\'s asking.' },
                    { n: '02', t: 'Route', d: 'Classifies intent and selects the specialist with the right tools.' },
                    { n: '03', t: 'Resolve', d: 'Specialist runs the work, cites sources, returns the answer.' },
                  ].map((s) => (
                    <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.06em' }}>{s.n}</span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{s.t}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, margin: '3px 0 0' }}>{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ marginTop: 28, fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.6 }}>
                  14 specialist agents · all gated by your policy · every action audit-logged
                </p>
              </div>

              <RoutingLog />
            </div>
          </div>
        </section>

        {/* ── WHERE IT LIVES ── */}
        <section style={{ background: 'var(--bg)', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>WHERE IT LIVES</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(26px, 3vw, 38px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 0,
                  lineHeight: 1.15,
                }}
              >
                One agent. Every surface.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {channelDetails.map((ch) => (
                <div key={ch.label} style={{ background: 'var(--bg-warm)', borderRadius: 14, padding: '24px 22px', border: '1px solid var(--border-faint)' }}>
                  <div style={{ width: 32, height: 32, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={ch.logo} alt={ch.label} width={28} height={28} style={{ display: 'block', objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{ch.label}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{ch.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '72px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 32 }}>BUILT FOR THE MOST SENSITIVE DATA IN YOUR COMPANY</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {trustCards.map((card) => (
                <div key={card.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ marginBottom: 12 }}>{card.icon}</div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13 }}>
              <Link href="/security" style={{ color: 'var(--gold-dark)', fontWeight: 600, textDecoration: 'none' }}>Full security details →</Link>
            </p>
          </div>
        </section>

        <RequestAccessSection />
      </main>
      <Footer />
    </>
  )
}
