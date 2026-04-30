import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import TodayCard from '@/components/surfaces/today-card'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'
import PhotoImg from '@/components/surfaces/photo-img'

const todayCards = [
  {
    title: 'Offer for Maya Chen — Senior Engineer',
    subtitle: '$195k base · 0.18% equity · above band by 8%',
    rationale: 'Top candidate from 6-week search. Competing offer from Scale AI. Recommended: approve with justification filed.',
    riskLevel: 'L4' as const,
    cuq: 0.88,
    decision: 'hil' as const,
    time: '8:14 AM',
    agent: 'Hiring agent',
    urgent: true,
  },
  {
    title: 'PTO approved — Emma Rodriguez',
    subtitle: 'Mon Apr 6 – Wed Apr 8 · 3 days',
    rationale: 'Within policy. Balance 12 → 9 days. Calendar and manager notified.',
    riskLevel: 'L2' as const,
    cuq: 0.97,
    decision: 'auto' as const,
    time: '9:02 AM',
    agent: 'Leave agent',
  },
]

const PHOTO_HERO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&fit=crop&crop=faces'
const PHOTO_SOLO_HR = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&fit=crop&crop=face'
const PHOTO_DUO = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&fit=crop&crop=faces'
const PHOTO_FOUNDER = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&fit=crop&crop=face'
const PHOTO_QUOTE = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face'
const PHOTO_BRIAN = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face'
const PHOTO_SEB = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face'

const heroValueProps = [
  '13 specialist agents. One orchestrator. Zero callouts.',
  '94.2% accuracy on federal + 50 state employment law.',
  'Replaces an HR team of 4. Keeps your CHRO in the loop.',
]

// 13 agents grouped into 4 clusters for the workforce visualization
const agentGroups = [
  {
    title: 'Hire & Onboard',
    desc: 'Reqs, screening, scheduling, references, background checks, offers, day-one ready.',
    agents: ['Hiring', 'Onboarding'],
    metric: '47 days → 19 days',
    metricLabel: 'avg time-to-hire',
  },
  {
    title: 'Pay & People',
    desc: 'Comp bands, equity grants, benefits enrollment, lifecycle changes, pay equity audits.',
    agents: ['Lifecycle', 'Comp & Benefits'],
    metric: '0 errors',
    metricLabel: 'on multi-state payroll',
  },
  {
    title: 'Time & Performance',
    desc: 'PTO, FMLA, parental leave, accommodations, review cycles, PIPs, calibration.',
    agents: ['Time Off', 'Performance', 'L&D'],
    metric: '4.2 sec',
    metricLabel: 'avg leave approval',
  },
  {
    title: 'Compliance & Off',
    desc: 'EEO-1, multi-state law, audits, ER investigations, terminations, separations, RIF.',
    agents: ['Compliance', 'Employee Relations', 'Offboarding', 'Reports', 'Culture', 'HR Ops'],
    metric: '94.2%',
    metricLabel: 'on HR-Bench',
  },
]

const problemStats = [
  { stat: '67%', label: 'of HR teams miss compliance deadlines', source: 'SHRM 2025 State of HR' },
  { stat: '$4,700', label: 'avg cost per new hire — most of it admin', source: 'SHRM Talent Acquisition Benchmark' },
  { stat: '40%', label: 'of HR time spent on admin instead of strategy', source: 'Gartner HR Productivity Report' },
]

const howItWorks = [
  {
    n: '01',
    title: 'Migrate',
    desc: 'Move off Gusto, Workday, Rippling, BambooHR, Namely, Personio — whatever you have. We pull employees, comp bands, leave policies, and org charts. One click. Done in a day.',
    time: '~1 day',
  },
  {
    n: '02',
    title: 'Set policy',
    desc: 'Tell the agent your approval thresholds, PTO rules, comp ranges, and HIL gates. One screen. Edit anytime.',
    time: '~30 minutes',
  },
  {
    n: '03',
    title: 'Run',
    desc: 'Employees ask in Slack. Agent answers, files, schedules, and approves what falls within policy. You handle Today queue — typically 30 minutes a day.',
    time: 'ongoing',
  },
]

const channelTiles = [
  {
    label: 'Slack',
    copy: 'Mention @mamba. DMs. Channel-aware.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 54 54" fill="none">
        <path d="M19.712 33.2c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9H19.712v4.9z" fill="#E01E5A"/>
        <path d="M22.2 33.2c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9v12.3c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9V33.2z" fill="#E01E5A"/>
        <path d="M27.1 19.7c-2.7 0-4.9-2.2-4.9-4.9S24.4 9.9 27.1 9.9s4.9 2.2 4.9 4.9V19.7H27.1z" fill="#36C5F0"/>
        <path d="M27.1 22.2c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9H14.8c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9H27.1z" fill="#36C5F0"/>
        <path d="M40.6 27.1c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9V14.8c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9V27.1z" fill="#2EB67D"/>
        <path d="M38.1 30.7c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9V30.7H38.1z" fill="#2EB67D"/>
        <path d="M33.2 38.1c0-2.7 2.2-4.9 4.9-4.9s4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9H33.2V38.1z" fill="#ECB22E"/>
        <path d="M30.7 35.6c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9v12.3c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9v-7.4z" fill="#ECB22E"/>
      </svg>
    ),
  },
  {
    label: 'Teams',
    copy: 'Mentions, adaptive cards, tabs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 3H8C6.9 3 6 3.9 6 5v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#5059C9"/>
        <circle cx="15.5" cy="7.5" r="2.5" fill="white"/>
        <path d="M12 11h7v2.5c0 1.9-1.6 3.5-3.5 3.5S12 15.4 12 13.5V11z" fill="white"/>
        <path d="M4 7h4v2H4zM2 9h6v7c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9z" fill="#7B83EB"/>
        <circle cx="5" cy="6" r="2" fill="#7B83EB"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    copy: 'Forward, reply, CC the agent.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#EA4335"/>
        <path d="M4 8l8 6 8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="4" y="7" width="16" height="11" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Web app',
    copy: 'Today queue + analytics for the CHRO.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1C1917"/>
        <path d="M7 12l3.5 3.5L17 8" stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'How is this different from a Slack bot or HRIS chatbot?',
    a: 'Slack bots answer questions. MambaHR takes action. The agent reads the thread, checks the policy, files the form, updates the HRIS, notifies the manager, and logs the audit trail. It does the work, not the lookup.',
  },
  {
    q: 'What happens if the agent gets something wrong?',
    a: 'Every action is risk-classified L1–L5. High-risk actions (terminations, RIF, separation agreements, comp changes above threshold) are always-human. Lower-risk actions (PTO within policy, standard onboarding) are automated with full audit log. You can override anything, anytime. CUQ scoring tells you when the agent is uncertain.',
  },
  {
    q: 'Do we replace our current HRIS, or run alongside it?',
    a: 'We replace it. MambaHR is the HRIS — system of record for employees, comp, leaves, performance, everything. We migrate your data from Gusto, Workday, Rippling, BambooHR, Namely, Personio, HiBob, or wherever it lives. Most teams cut over in a single day.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most teams are running in 2–3 days. Day 1 connect, day 2 shadow mode (agent suggests, you approve everything), day 3+ live mode in one function. Full deployment in weeks 4–8.',
  },
  {
    q: 'What about compliance? Are we still on the hook?',
    a: 'Legally, yes — you are always the employer. But MambaHR scores 94.2% on HR-Bench (federal + 50 state employment law) vs 31% for the best general LLM. Every action cites its regulatory source. Edge cases route to human review by default.',
  },
  {
    q: 'Who owns the data?',
    a: 'You do. We are a processor, not a controller. Data can be exported or deleted on request. Bedrock prompt logging is disabled at the AWS account level — we cannot see your prompts. SOC 2 Type II audit underway.',
  },
]

export default function HomePage() {
  return (
    <>
      <MegaNav />
      <main>

        {/* ───────────────────────── HERO ───────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-warm) 80%, #FFFFFF 100%)',
            paddingTop: 110,
            paddingBottom: 0,
            overflow: 'hidden',
          }}
        >
          <div
            className="hero-split"
            style={{
              maxWidth: 1240,
              margin: '0 auto',
              padding: '0 40px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.05fr',
              gap: 64,
              alignItems: 'center',
              minHeight: 720,
            }}
          >
            {/* Left — copy */}
            <div style={{ paddingBottom: 80 }}>
              {/* Category pill */}
              <div style={{ marginBottom: 24 }}>
                <span className="pill-gold">THE AI HR DEPARTMENT</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(44px, 5.5vw, 76px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  lineHeight: 1.0,
                  marginBottom: 24,
                }}
              >
                Your HR team,<br />
                <span style={{ color: 'var(--gold-dark)' }}>automated.</span>
              </h1>

              <p
                style={{
                  fontSize: 19,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: 480,
                  marginBottom: 32,
                }}
              >
                MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — handled by agents. <strong style={{ color: 'var(--text)' }}>One human approves the calls that matter.</strong>
              </p>

              {/* Value prop checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {heroValueProps.map((prop) => (
                  <div key={prop} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="9" cy="9" r="9" fill="var(--gold-tint)" />
                      <path d="M5 9l3 3 5-6" stroke="var(--gold-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{prop}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
                <a href="#request-access" className="btn-gold" style={{ fontSize: 15, padding: '14px 32px' }}>
                  Get a demo →
                </a>
                <Link href="/today" className="btn-secondary" style={{ fontSize: 15 }}>
                  See product tour
                </Link>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
                Live demo in 30 minutes · Connects to your existing stack · Founders respond within 24 hours
              </p>
            </div>

            {/* Right — photo + product UI overlay */}
            <div
              style={{
                position: 'relative',
                height: 660,
                borderRadius: '20px 20px 0 0',
                overflow: 'hidden',
                alignSelf: 'flex-end',
                background: 'linear-gradient(145deg, #E8DDD0 0%, #C9B99A 100%)',
              }}
              className="hero-today-panel"
            >
              <PhotoImg
                src={PHOTO_HERO}
                alt="HR professional at work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />

              {/* Today queue overlay — bottom-left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  width: 360,
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ background: 'var(--bg-surface)', padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today · 3 items need you</span>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>9:14 AM</span>
                </div>
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {todayCards.map((card, i) => (
                    <TodayCard key={i} {...card} />
                  ))}
                </div>
              </div>

              {/* Slack message — top-right */}
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  right: 20,
                  width: 280,
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: '#1C1917', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 10 }}>◆</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1D1C1D' }}>Mamba</span>
                      <span style={{ fontSize: 10, background: 'var(--gold-tint)', color: 'var(--gold-dark)', border: '1px solid rgba(176,141,87,0.2)', borderRadius: 3, padding: '1px 5px', fontWeight: 600 }}>APP</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#1D1C1D', lineHeight: 1.5, margin: 0 }}>
                      Emma&apos;s PTO approved. 3 days, Apr 6–8. Balance updated, manager notified. ✓
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── SOCIAL PROOF STRIP ───────────────────────── */}
        <section style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0 }}>
              Trusted by HR teams at <strong style={{ color: 'var(--text)' }}>fast-growing</strong> companies.
            </p>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap', opacity: 0.55 }}>
              {['Series B SaaS', 'Y Combinator', 'Series A Fintech', 'Sequoia-backed', 'Health-tech', 'AI lab'].map((label) => (
                <span key={label} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── THE PROBLEM ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>THE PROBLEM</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                HR is drowning. We did the math.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
                For every 100 employees, an HR department handles 47 leaves, 18 hires, hundreds of comp and policy decisions, and a regulatory landscape that updates every 90 days. The work doesn&apos;t end. The team can&apos;t scale.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="mobile-stack">
              {problemStats.map((s, i) => (
                <div
                  key={i}
                  style={{ background: 'var(--bg-warm)', borderRadius: 16, padding: '36px 28px', textAlign: 'left' }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: 56,
                      fontWeight: 400,
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      color: 'var(--gold-dark)',
                      lineHeight: 1,
                      marginBottom: 16,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {s.stat}
                  </p>
                  <p style={{ fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45, marginBottom: 12 }}>{s.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>Source: {s.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>HOW IT WORKS</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                From kickoff to autopilot in a week.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                One day to migrate. One screen to set policy. After that, the agent runs your HR department.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="mobile-stack">
              {howItWorks.map((step) => (
                <div
                  key={step.n}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    position: 'relative',
                  }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--gold)',
                      letterSpacing: '0.06em',
                      marginBottom: 24,
                    }}
                  >
                    STEP {step.n}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 24 }}>{step.desc}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)', borderTop: '1px solid var(--border-faint)', paddingTop: 16 }}>
                    Time required: <strong style={{ color: 'var(--text)' }}>{step.time}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── THE 13 AGENTS ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>THE WORKFORCE</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                13 specialists. 1 orchestrator.<br />0 calls in sick.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
                Every HR function gets its own AI specialist. They coordinate through one orchestrator, share context, and escalate to you when it matters.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="mobile-stack">
              {agentGroups.map((group) => (
                <div
                  key={group.title}
                  className="card-hover"
                  style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-faint)', borderRadius: 16, padding: '32px 28px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>{group.title}</h3>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-dark)', lineHeight: 1 }}>{group.metric}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{group.metricLabel}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>{group.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {group.agents.map((a) => (
                      <span
                        key={a}
                        style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px' }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── PROOF — HR-BENCH ───────────────────────── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>THE COMPLIANCE ENGINE</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.1,
                }}
              >
                We score 94.2% on HR compliance.<br />
                <span style={{ color: 'var(--gold-dark)' }}>The best general LLM scores 31%.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 700, margin: '0 auto' }}>
                That gap is the difference between catching the FMLA + state PFML stacking edge case that costs you $50K, and missing it. We built our own benchmark because no one else had one.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 20, padding: '40px 32px', marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720, margin: '0 auto' }}>
                {[
                  { label: 'MambaHR', score: 94.2, gold: true },
                  { label: 'Best frontier LLM', score: 31, gold: false },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{ width: 180, fontSize: 15, fontWeight: row.gold ? 600 : 500, color: row.gold ? 'var(--text)' : 'var(--text-muted)', flexShrink: 0, textAlign: 'right' }}>
                      {row.label}
                    </span>
                    <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: 6, height: row.gold ? 24 : 14, overflow: 'hidden', border: '1px solid var(--border-faint)' }}>
                      <div style={{ width: `${row.score}%`, height: '100%', background: row.gold ? 'var(--gold)' : 'var(--border-mid)', borderRadius: 6, transition: 'width 1s' }} />
                    </div>
                    <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: row.gold ? 'var(--gold-dark)' : 'var(--text-faint)', width: 64, flexShrink: 0 }}>
                      {row.score}%
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center', marginTop: 24 }}>
                HR-Bench · 1,200 graded compliance scenarios · federal law + 50 states · methodology open-sourced
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="mobile-stack">
              {[
                { value: '95K', label: 'Lines of employment law', sub: 'Curated, versioned, cited' },
                { value: '50', label: 'US states covered', sub: 'Plus federal + DC' },
                { value: '24/7', label: 'Updated continuously', sub: 'Reg changes within 48hrs' },
              ].map((p) => (
                <div key={p.label} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: 36,
                      fontWeight: 400,
                      color: 'var(--gold-dark)',
                      lineHeight: 1,
                      marginBottom: 8,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.value}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{p.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── WHERE IT LIVES ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>WHERE IT LIVES</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Works where your team already works.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto' }}>
                Slack, Teams, email, or the web app. No new tool to learn. No password to remember.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {channelTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="card-hover"
                  style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, padding: '24px' }}
                >
                  <div style={{ marginBottom: 16 }}>{tile.icon}</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{tile.label}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55 }}>{tile.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── BUILT FOR ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>BUILT FOR</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                HR teams of 1–3 doing<br />the work of 10.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
                50 to 500 employees. Growing fast. HR is one or two people, plus a lot of Sheets. Sound familiar?
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }} className="mobile-stack">
              {[
                {
                  role: 'SOLO HR',
                  title: 'The Head of People',
                  copy: 'Running recruiting, comp, performance, and leave — alone. MambaHR is the team they never got to hire.',
                  photo: PHOTO_SOLO_HR,
                  alt: 'HR professional at laptop',
                  bg: 'linear-gradient(145deg, #DDD0C4 0%, #C4A882 100%)',
                },
                {
                  role: '2-PERSON TEAM',
                  title: 'The PeopleOps duo',
                  copy: 'Two people, 400 employees, a backlog they cannot win. MambaHR is the rest of the department. They set the policy and watch it run.',
                  photo: PHOTO_DUO,
                  alt: 'Two HR professionals reviewing work together',
                  bg: 'linear-gradient(145deg, #D4CCBE 0%, #B8A48C 100%)',
                },
                {
                  role: 'PRE-HR HIRE',
                  title: 'The founder doing HR',
                  copy: 'Until they can hire someone. MambaHR buys them the time to hire the right person — not just the next one.',
                  photo: PHOTO_FOUNDER,
                  alt: 'Founder working at desk',
                  bg: 'linear-gradient(145deg, #E2D8CC 0%, #CAAD8E 100%)',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="card-hover"
                  style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', background: '#FFFFFF' }}
                >
                  <div style={{ height: 240, overflow: 'hidden', position: 'relative', background: card.bg }}>
                    <PhotoImg
                      src={card.photo}
                      alt={card.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#FFFFFF', background: 'rgba(28,25,23,0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', borderRadius: 5, padding: '4px 10px' }}>{card.role}</span>
                    </div>
                  </div>
                  <div style={{ padding: '24px 24px 28px' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.01em' }}>{card.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{card.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── CUSTOMER QUOTE ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 32 }}>WHAT THIS LOOKS LIKE IN PRACTICE</p>
            <p
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                lineHeight: 1.3,
                color: 'var(--text)',
                marginBottom: 40,
                letterSpacing: '-0.02em',
              }}
            >
              &ldquo;By week two, our HR department was running itself. Two review cycles kicked off, multi-state filings done, every leave request handled. I went from running people ops to running people strategy. 380 employees. No HR team. Just me and Mamba.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(145deg, #DDD0C4 0%, #C4A882 100%)' }}>
                <PhotoImg src={PHOTO_QUOTE} alt="Head of People" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Head of People</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Series B SaaS · 380 employees</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── PRICING TEASER ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>PRICING</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    marginBottom: 20,
                    lineHeight: 1.15,
                  }}
                >
                  One price. Every agent. No add-ons.
                </h2>
                <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 28 }}>
                  Pilot is 90 days. Production is per-employee, banded by company size. Every agent included. Every integration. Every region.
                </p>
                <Link href="/pricing" className="btn-primary" style={{ display: 'inline-flex' }}>
                  See pricing →
                </Link>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    'Full HRIS — system of record',
                    'All 13 agents enabled',
                    'Slack, Teams, email, and web app',
                    'HIL approval queue + audit log',
                    'Migration from any HRIS — Gusto, Workday, Rippling',
                    'HR-Bench compliance engine',
                    'SOC 2 Type II evidence',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="9" cy="9" r="9" fill="var(--gold-tint)" />
                        <path d="M5 9l3 3 5-6" stroke="var(--gold-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── INTEGRATIONS MARQUEE ───────────────────────── */}
        <section style={{ background: '#FFFFFF', paddingTop: 64, paddingBottom: 64, overflow: 'hidden' }}>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-faint)', marginBottom: 0, fontWeight: 500 }}>
            Plays nice with the rest of your stack
          </p>
          <IntegrationsMarquee />
        </section>

        {/* ───────────────────────── FOUNDERS ───────────────────────── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>BUILT BY</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Two founders. One scar tissue.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
                Brian ran people ops at three startups and watched the same problems compound. Sebastian built ML infrastructure and benchmarks. We built MambaHR because no one else was going to.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="mobile-stack">
              {[
                { name: 'Brian Bell', role: 'CEO & Co-Founder', bio: 'Three startups. Ran people ops for 200 → 2,000 headcount. Watched the same playbook fail every time.', photo: PHOTO_BRIAN, alt: 'Brian Bell, CEO' },
                { name: 'Sebastian Kirsch', role: 'CTO & Co-Founder', bio: 'Decade in agent systems and ML infrastructure. Built HR-Bench. Obsessed with the gap between LLM capability and HR software reality.', photo: PHOTO_SEB, alt: 'Sebastian Kirsch, CTO' },
              ].map((p) => (
                <div key={p.name} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 20, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(145deg, #DDD0C4 0%, #C4A882 100%)' }}>
                    <PhotoImg src={p.photo} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--gold-dark)', fontWeight: 500, marginBottom: 12 }}>{p.role}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
              <Link href="/about" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Read the full story →
              </Link>
            </p>
          </div>
        </section>

        {/* ───────────────────────── FAQ ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>FAQ</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Questions you&apos;re going to ask anyway.
              </h2>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === faqs.length - 1 ? '1px solid var(--border)' : 'none',
                    padding: '20px 4px',
                  }}
                >
                  <summary
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: 'var(--text)',
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ flexShrink: 0, color: 'var(--gold)', fontSize: 22, lineHeight: 1, fontWeight: 300 }}>+</span>
                  </summary>
                  <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, paddingRight: 32 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'var(--text-muted)' }}>
              Have more questions?{' '}
              <a href="mailto:hello@mambahr.com" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                Email the founders directly
              </a>
              .
            </p>
          </div>
        </section>

        {/* ───────────────────────── REQUEST ACCESS ───────────────────────── */}
        <RequestAccessSection />

      </main>
      <Footer />
    </>
  )
}
