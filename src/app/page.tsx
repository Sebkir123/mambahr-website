import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RequestAccessSection from '@/components/waitlist'
import TodayCard from '@/components/surfaces/today-card'
import IntegrationsMarquee from '@/components/sections/integrations-marquee'
import PhotoImg from '@/components/surfaces/photo-img'
import EmployeeDirectory from '@/components/surfaces/employee-directory'
import AgentPipeline from '@/components/sections/agent-pipeline'
import MigrationCard from '@/components/surfaces/migration-card'
import PolicyCard from '@/components/surfaces/policy-card'

// Local placeholder portraits served from /public/avatars/
const AVATAR = (name: string) => `/avatars/${name}.jpg`
const SCENE_HRO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&fit=crop'
const SCENE_HEAD_OF_PEOPLE = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&fit=crop'
const SCENE_DUO = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&fit=crop'
const SCENE_FOUNDER = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80&fit=crop'

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

const heroValueProps = [
  '14 specialist agents. Zero callouts.',
  'Federal + 50 state employment law, cited on every action.',
  'Replaces an HR team of 4. Keeps your CHRO in the loop.',
]

const problemStats = [
  { stat: '67%', label: 'of HR teams miss compliance deadlines',           source: 'SHRM 2025 State of HR' },
  { stat: '$4,700', label: 'avg cost per new hire — most of it admin',     source: 'SHRM Talent Acquisition Benchmark' },
  { stat: '40%', label: 'of HR time spent on admin instead of strategy',   source: 'Gartner HR Productivity Report' },
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
  { q: 'Do we replace our current HRIS, or run alongside it?', a: 'We replace it. MambaHR is the HRIS — system of record for employees, comp, leaves, performance, everything. We migrate your data from Gusto, Workday, Rippling, BambooHR, Namely, Personio, HiBob, or wherever it lives. Most teams cut over in a single day.' },
  { q: 'How is this different from a Slack bot or HRIS chatbot?', a: 'Slack bots answer questions. MambaHR takes action. The agent reads the thread, checks the policy, files the form, updates records, notifies the manager, and logs the audit trail. It does the work, not the lookup.' },
  { q: 'What happens if the agent gets something wrong?', a: 'Every action is risk-classified L1–L5. High-risk actions (terminations, RIF, separation agreements, comp changes above threshold) are always-human. Lower-risk actions (PTO within policy, standard onboarding) are automated with full audit log. You can override anything. CUQ scoring tells you when the agent is uncertain.' },
  { q: 'How long does setup take?', a: 'Most teams are running by end of day Friday and live Monday morning. Day 1: we pull your data from your old HRIS and you set policy on one screen. Day 2: the agent goes live. Some teams choose to start with one function (like leave) and add others over the first week — that\'s a trust pace, not a setup limitation.' },
  { q: 'What about compliance? Are we still on the hook?', a: 'Legally, yes — you are always the employer. MambaHR runs on a curated employment-law engine covering federal regulations and all 50 state codes. Every compliance call cites its regulatory source. Edge cases route to human review by default — your CHRO (or external counsel) signs off before anything binding goes out.' },
  { q: 'Who owns the data?', a: 'You do. We are a processor, not a controller. Data can be exported or deleted on request. We never train AI models on your data — contractually guaranteed.' },
]

const founders = [
  { name: 'Brian Bell', role: 'CEO & Co-Founder', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', avatar: AVATAR('brian') },
  { name: 'Sebastian Kirsch', role: 'CTO & Co-Founder', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', avatar: AVATAR('sebastian') },
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
                MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — the agents do the work. <strong style={{ color: 'var(--text)' }}>You sign off when it matters.</strong>
              </p>

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
                Live demo in 30 minutes · Switch from any HRIS within 1 day · Founders respond within&nbsp;24&nbsp;hours
              </p>
            </div>

            {/* Right — Employee Directory + Today Card overlay (Shapes pattern, hardcoded mockup) */}
            <div className="hero-today-panel" style={{ position: 'relative', alignSelf: 'flex-end', paddingBottom: 0 }}>
              {/* Backdrop card with employee directory */}
              <div style={{ position: 'relative', marginRight: 60, marginBottom: 100 }}>
                <EmployeeDirectory />
              </div>

              {/* Today decision card overlay — bottom-right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 0,
                  width: 340,
                  background: '#FFFFFF',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today queue · 3 items</span>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>9:14 AM</span>
                </div>
                <div style={{ padding: 12 }}>
                  <TodayCard {...todayCards[0]} />
                </div>
              </div>

              {/* Floating Slack-style message — top-right */}
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  width: 240,
                  background: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  padding: '10px 12px',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src="/MambaHR_logo.png" alt="Mamba" width={20} height={20} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#1D1C1D' }}>Mamba</span>
                      <span style={{ fontSize: 9, background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 3, padding: '1px 4px', fontWeight: 600 }}>APP</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#1D1C1D', lineHeight: 1.4, margin: 0 }}>
                      Emma&apos;s PTO approved · 3 days · ✓
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

        {/* ───────────────────────── PROBLEM ───────────────────────── */}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }} className="mobile-stack">
              {problemStats.map((s, i) => (
                <div
                  key={i}
                  style={{ background: i === 1 ? 'var(--bg-cream)' : 'var(--bg-warm)', padding: '40px 32px', borderRight: i < problemStats.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <p
                    style={{
                      fontSize: 64,
                      fontWeight: 400,
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      color: 'var(--gold-dark)',
                      lineHeight: 1,
                      marginBottom: 16,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {s.stat}
                  </p>
                  <p style={{ fontSize: 16, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45, marginBottom: 12 }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>{s.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── HOW IT WORKS — with hardcoded mockups ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 720, margin: '0 auto 80px' }}>
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
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                One day to migrate. One screen to set policy. After that, the agent runs your HR department.
              </p>
            </div>

            {/* Step 1: Migrate — left copy, right mockup */}
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
              <div>
                <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 01 · ~1 DAY</p>
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Migrate from your old HRIS.
                </h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                  Move off Gusto, Workday, Rippling, BambooHR, Namely, Personio — whatever you have. We pull employees, comp records, org chart, leave balances, performance history, and documents. One click. Zero data loss.
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
                  Most teams cut over end-of-day Friday. Live Monday morning.
                </p>
              </div>
              <MigrationCard />
            </div>

            {/* Step 2: Set Policy — right copy, left mockup */}
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
              <PolicyCard />
              <div>
                <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 02 · ~30 MINUTES</p>
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Set your policy. One screen.
                </h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                  Tell the agent your approval thresholds, PTO rules, comp ranges, and HIL gates. Toggle what runs automatically and what comes to you. Edit anytime.
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
                  High-risk actions stay always-human. The matrix is codified in code, not policy doc.
                </p>
              </div>
            </div>

            {/* Step 3: Run — left copy, right mockup */}
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <p className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 16 }}>STEP 03 · ONGOING</p>
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  The agent runs your HR.
                </h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                  Employees ask in Slack. Agent answers, files, schedules, and approves what falls within policy. You handle the Today queue — typically 30 minutes a day. Every action audit-logged.
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
                  Your CHRO does judgment. Everything else does itself.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 14, padding: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                <div style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803D' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Today queue · 3 items need you</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {todayCards.map((c, i) => <TodayCard key={i} {...c} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── THE AI WORKFORCE — orchestrator + 14 agents constellation ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 720, margin: '0 auto 32px' }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>THE AI WORKFORCE</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.05,
                }}
              >
                One orchestrator.<br />Fourteen specialists.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Every request enters through Mamba, gets routed to the right specialist, and resolves with a full audit trail. Watch one in flight.
              </p>
            </div>

            <AgentPipeline />

            <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: 'var(--text-muted)' }}>
              All coordinated by an orchestrator. All gated by your policy.{' '}
              <Link href="/mamba" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                See how they coordinate →
              </Link>
            </p>
          </div>
        </section>

        {/* ───────────────────────── COMPLIANCE ENGINE — real edge cases the engine handles ───────────────────────── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Hero */}
            <div style={{ maxWidth: 760, marginBottom: 64 }}>
              <p className="eyebrow" style={{ marginBottom: 20 }}>THE COMPLIANCE ENGINE</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 24,
                  lineHeight: 1.0,
                }}
              >
                The cases that<br />
                <span style={{ color: 'var(--gold-dark)' }}>cost you money.</span>
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 600 }}>
                Federal employment law, all 50 state codes, kept current and cited. Three real edge cases — and how MambaHR handles them, citation by citation.
              </p>
            </div>

            {/* Three deeper compliance scenario cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  scenario: 'Employee on FMLA also requests CA CFRA — stack or sequential?',
                  cost: '$30K back leave + DLSE penalty',
                  analysis: 'Eligible for both: 14 mo tenure ✓ · 1,400 hrs ✓ · CA CFRA stacks with FMLA per 2 CCR §11091.4(c). Up to 24 weeks combined.',
                  citations: ['29 USC §2611 (FMLA eligibility)', 'CA Gov Code §12945.2 (CFRA stacking)', 'DLSE 7-2024 opinion letter'],
                  action: 'Approve 24 weeks combined · Route ambiguous overlap to legal',
                },
                {
                  scenario: 'Posting a $250K role across CO + NY + WA without salary disclosure.',
                  cost: '$10K per violation, per state',
                  analysis: 'Three jurisdictions trigger pay transparency. CO requires range in posting. NY requires range + bona fide hiring. WA requires range + benefits summary.',
                  citations: ['CO C.R.S. §8-5-201 (Equal Pay for Equal Work)', 'NY S9427A (Pay Transparency Law)', 'WA RCW 49.58.110'],
                  action: 'Block post · Add required ranges and benefits per jurisdiction',
                },
                {
                  scenario: 'New hire offer at $58K — exempt or non-exempt under CA + federal?',
                  cost: '$50K back wages + 30% penalties',
                  analysis: 'CA exempt minimum is 2× state minimum wage = $66,560 in 2026. Below threshold even before duties test. Cannot lawfully classify as exempt.',
                  citations: ['29 CFR Part 541 (FLSA exempt tests)', 'CA Labor Code §515 (CA exempt threshold)', 'IWC Wage Order 4-2001'],
                  action: 'Reclassify as non-exempt · Surface OT eligibility · Adjust offer letter',
                },
              ].map((row) => (
                <div
                  key={row.scenario}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  {/* Scenario header */}
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.4 }}>
                      {row.scenario}
                    </p>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#B91C1C', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
                      EXPOSURE: {row.cost.toUpperCase()}
                    </span>
                  </div>
                  {/* MambaHR analysis */}
                  <div style={{ padding: '24px 28px' }}>
                    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 18px' }}>
                      {row.analysis}
                    </p>
                    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                          Citations
                        </p>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                          {row.citations.map((c) => (
                            <li key={c} style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 3 }}>
                              · {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                          Action
                        </p>
                        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                          <span style={{ color: '#15803D', marginRight: 6, fontWeight: 700 }}>✓</span>
                          {row.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Methodology footer — honest claims about how the engine works */}
            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, paddingTop: 32, borderTop: '1px solid var(--border)' }} className="mobile-stack">
              {[
                { stat: '50', unit: 'states + federal', desc: 'Every jurisdiction your employees live in' },
                { stat: '100%', unit: 'cited', desc: 'Every compliance call cites its regulation' },
                { stat: '< 48h', unit: 'reg updates', desc: 'New rulings reach the engine within 48 hours' },
              ].map((m) => (
                <div key={m.unit}>
                  <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 36, fontWeight: 400, color: 'var(--gold-dark)', letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 4px' }}>
                    {m.stat}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                    {m.unit}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── WHERE IT LIVES — rich product mockups ───────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '88px 24px' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 600 }}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>WHERE IT LIVES</p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(28px, 3.4vw, 44px)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    margin: '0 0 14px',
                    lineHeight: 1.1,
                  }}
                >
                  One agent. Three surfaces. Same context.
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                  Mamba meets your team in the tools they already use — with one shared memory and one audit trail across all of them.
                </p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>same employee · all 3 surfaces</span>
              </div>
            </div>

            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

              {/* ── SLACK MOCKUP — full chrome ── */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                {/* Slack purple header */}
                <div style={{ background: '#3F0E40', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src="/slack-new-logo.svg" alt="Slack" width={16} height={16} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>mambahr-team</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>3 online</span>
                </div>
                {/* Channel header */}
                <div style={{ padding: '10px 18px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>#</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>people-ops</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-faint)' }}>12 members</span>
                </div>
                {/* Thread */}
                <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, background: '#D4C4B5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#57534E' }}>MC</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Maya Chen</span>
                        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img src="/MambaHR_logo.png" alt="Mamba" width={26} height={26} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Mamba</span>
                        <span style={{ fontSize: 9, fontWeight: 600, background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 3, padding: '1px 5px' }}>APP</span>
                        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.5 }}>Approved — enjoy the wedding 🎉</p>
                      <div style={{ background: 'var(--bg-warm)', borderRadius: 8, padding: '8px 10px', fontSize: 11, lineHeight: 1.7, border: '1px solid var(--border-faint)' }}>
                        <p style={{ margin: '0 0 1px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Balance:</strong> 12 → 9 days</p>
                        <p style={{ margin: '0 0 1px', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Calendar:</strong> Apr 7–9 blocked</p>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text)' }}>Manager:</strong> notified</p>
                      </div>
                      {/* Reactions */}
                      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                        <span style={{ fontSize: 10, padding: '2px 7px', background: '#EDF2F7', borderRadius: 12, border: '1px solid #E2E8F0' }}>🎉 3</span>
                        <span style={{ fontSize: 10, padding: '2px 7px', background: '#EDF2F7', borderRadius: 12, border: '1px solid #E2E8F0' }}>✅ 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── TEAMS MOCKUP — proper Teams chrome ── */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                {/* Teams purple header */}
                <div style={{ background: '#4B53BC', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src="/Microsoft_Symbol_0.svg" alt="Microsoft Teams" width={16} height={16} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>Microsoft Teams</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>People Ops &gt; Approvals</span>
                </div>
                {/* Teams body */}
                <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Mamba bot message preamble */}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFFFFF', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img src="/MambaHR_logo.png" alt="Mamba" width={24} height={24} style={{ display: 'block', objectFit: 'contain', borderRadius: 6 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Mamba</span>
                        <span style={{ fontSize: 9, fontWeight: 600, background: '#EFEEFC', color: '#4B53BC', borderRadius: 3, padding: '1px 5px' }}>BOT</span>
                        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                      </div>
                      {/* Adaptive card */}
                      <div style={{ background: '#FFFFFF', borderLeft: '4px solid #4B53BC', borderRadius: '0 10px 10px 0', padding: '12px 14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--border-faint)' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#4B53BC', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>Time-off request · auto-approved</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>Maya Chen · 3 days</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 10px', lineHeight: 1.5 }}>Apr 7–9 · within policy · balance 12 → 9 days</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 0', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', margin: '0 0 10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                            <span style={{ color: 'var(--text-faint)' }}>Manager</span>
                            <span style={{ color: 'var(--text)', fontWeight: 500 }}>B. Bell · notified</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                            <span style={{ color: 'var(--text-faint)' }}>Calendar</span>
                            <span style={{ color: 'var(--text)', fontWeight: 500 }}>blocked · OOO set</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                            <span style={{ color: 'var(--text-faint)' }}>Audit ref</span>
                            <span style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>act_4f81a2</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ background: '#4B53BC', color: '#FFFFFF', border: 'none', borderRadius: 4, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>View details</button>
                          <button style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '6px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>Override</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── WEB APP MOCKUP — rich dashboard ── */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                {/* App chrome — looks like macOS browser window */}
                <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-faint)' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
                  <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
                </div>
                {/* Top nav bar */}
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/MambaHR_logo.png" alt="MambaHR" width={18} height={18} style={{ display: 'block', objectFit: 'contain', borderRadius: 4 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Today</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
                    <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>live</span>
                  </span>
                </div>
                {/* Body */}
                <div style={{ padding: '14px 16px', flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>Tuesday morning</p>

                  {/* Maya's leave request — glow because it just happened */}
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="#22C55E"/><path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Auto-resolved · 9:14 AM</span>
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', margin: '0 0 2px' }}>Maya Chen · 3 days off</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>Apr 7–9 · within policy</p>
                  </div>

                  {/* Approval queue */}
                  <div style={{ background: 'var(--gold-tint)', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Need your approval</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold-dark)', background: '#FFFFFF', borderRadius: 12, padding: '1px 8px' }}>3</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Maya offer above band · Q2 review packet · Tom PIP draft</p>
                  </div>

                  {/* Stats footer */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingTop: 10, borderTop: '1px solid var(--border-faint)' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: '#15803D', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>14</p>
                      <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: '2px 0 0' }}>Auto-resolved overnight</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: 'var(--text-muted)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>02</p>
                      <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: '2px 0 0' }}>Awaiting employee</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────── BUILT FOR — every stage, editorial typography ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 80, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>BUILT FOR EVERY STAGE</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.0,
                }}
              >
                From two employees<br />to the enterprise.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 580, lineHeight: 1.6 }}>
                The agents scale with you. Same product, same depth — different policy thresholds, different volumes, different price.
              </p>
            </div>

            {/* Three stage cards — typography-driven, no photos */}
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF' }}>
              {[
                {
                  range: '2 — 25',
                  stage: 'STARTUP',
                  title: "Founders running HR off Notion docs and Sheets.",
                  copy: 'Your first HR hire is an AI department. Onboarding, payroll, leave, compliance — handled. Spend your time hiring engineers, not chasing W-4s.',
                  outcome: 'Outcome: an HR department before your first HR hire',
                },
                {
                  range: '25 — 500',
                  stage: 'GROWTH',
                  title: 'One CHRO doing the work of a 4-person HR team.',
                  copy: 'The agents clear the backlog. The CHRO sets policy and approves the calls that matter. Compliance, performance cycles, multi-state payroll — running on autopilot.',
                  outcome: 'Outcome: ~$300K/year saved on HR FTEs',
                  highlight: true,
                },
                {
                  range: '500 +',
                  stage: 'ENTERPRISE',
                  title: 'Multi-entity HR running with one human in the loop.',
                  copy: 'Multiple legal entities, international headcount, advanced security. Same agents, customized HIL policy, dedicated success manager, SCIM + custom data residency.',
                  outcome: 'Outcome: enterprise HR ops at startup speed',
                },
              ].map((card, i) => (
                <div
                  key={card.range}
                  style={{
                    padding: '40px 32px 36px',
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                    background: card.highlight ? 'var(--bg-warm)' : '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  {/* Range — big serif number */}
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: card.highlight ? 'var(--gold-dark)' : 'var(--text-faint)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                      {card.stage}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(40px, 4vw, 56px)',
                        fontWeight: 400,
                        color: 'var(--text)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      {card.range}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-faint)', margin: '6px 0 0', fontStyle: 'italic' }}>employees</p>
                  </div>

                  {/* Description */}
                  <div style={{ flex: 1, paddingTop: 8, borderTop: card.highlight ? '1px solid rgba(176,141,87,0.25)' : '1px solid var(--border-faint)' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '16px 0 12px', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                      {card.copy}
                    </p>
                  </div>

                  {/* Outcome */}
                  <p style={{ fontSize: 12, fontWeight: 600, color: card.highlight ? 'var(--gold-dark)' : 'var(--text-muted)', margin: 0, paddingTop: 16, borderTop: '1px solid var(--border-faint)' }}>
                    {card.outcome}
                  </p>
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
              <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden' }}>
                <PhotoImg src={AVATAR('head-of-people')} alt="Head of People" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Head of People</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Series B SaaS · 380 employees</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── PRICING TEASER — 3 tiers with monthly + outcome ───────────────────────── */}
        <section style={{ background: 'var(--bg-cream)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <div style={{ marginBottom: 56, maxWidth: 720 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>PRICING</p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: 16,
                  lineHeight: 1.0,
                }}
              >
                Three tiers.<br />Every agent in all of them.
              </h2>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580 }}>
                You pay monthly. We replace HR FTEs that cost <strong style={{ color: 'var(--text)' }}>$80K–$120K/year</strong> each. The math works at every stage.
              </p>
            </div>

            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  name: 'Starter',
                  for: '2 — 25 employees',
                  price: '$299',
                  unit: '/month flat',
                  outcome: 'Replaces your founder doing HR',
                  features: ['All 14 agents', 'Slack + Teams + web app', 'Migrate from any HRIS', 'Audit log on every action', 'Email support'],
                  highlight: false,
                },
                {
                  name: 'Growth',
                  for: '25 — 500 employees',
                  price: '$14',
                  unit: '/employee/month',
                  outcome: 'Saves ~$300K/year on HR FTEs',
                  features: ['Everything in Starter', 'HIL approval workflows', 'Cryptographic audit log', 'RBAC + custom roles', 'Dedicated success manager'],
                  highlight: true,
                },
                {
                  name: 'Enterprise',
                  for: '500+ employees',
                  price: 'Custom',
                  unit: 'volume + multi-entity',
                  outcome: 'Multi-entity HR on autopilot',
                  features: ['Everything in Growth', 'Multi-entity workspaces', 'SAML SSO + SCIM', 'Custom data residency', '24/7 priority support + SLA'],
                  highlight: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: tier.highlight ? '#1C1917' : '#FFFFFF',
                    border: tier.highlight ? '1px solid rgba(176,141,87,0.3)' : '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '36px 28px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: tier.highlight ? '0 8px 32px rgba(28,25,23,0.18)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {tier.highlight && (
                    <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--gold)', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.35)', borderRadius: 999, padding: '4px 10px' }}>MOST POPULAR</span>
                  )}

                  {/* Tier header */}
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{tier.name}</p>
                    <p style={{ fontSize: 12, color: tier.highlight ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', margin: '4px 0 0' }}>{tier.for}</p>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: tier.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-faint)' }}>
                    <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 56, fontWeight: 400, color: tier.highlight ? '#FFFFFF' : 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)', marginLeft: 6 }}>
                      {tier.unit}
                    </span>
                  </div>

                  {/* Outcome */}
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: tier.highlight ? 'rgba(176,141,87,0.85)' : 'var(--gold-dark)', textTransform: 'uppercase', margin: '0 0 6px' }}>Outcome</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: tier.highlight ? '#FFFFFF' : 'var(--text)', margin: 0, lineHeight: 1.4 }}>{tier.outcome}</p>
                  </div>

                  {/* Features */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 3, flexShrink: 0 }}>
                          <path d="M2 7l4 4 6-6" stroke={tier.highlight ? 'var(--gold)' : 'var(--gold-dark)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, color: tier.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={tier.name === 'Enterprise' ? '#request-access' : '/pricing'}
                    className={tier.highlight ? 'btn-gold' : 'btn-secondary'}
                    style={{ justifyContent: 'center', textAlign: 'center' }}
                  >
                    {tier.name === 'Enterprise' ? 'Talk to sales' : 'Start ' + tier.name}
                  </Link>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
              All tiers include the full HRIS, all 14 agents, every integration, every channel. <Link href="/pricing" style={{ color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}>See full breakdown →</Link>
            </p>
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
              {founders.map((p) => (
                <div key={p.name} style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 20, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                    <PhotoImg src={p.avatar} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

        <RequestAccessSection />

      </main>
      <Footer />
    </>
  )
}

// Note: SCENE_* and Employee type retained for future use; current placements use HEADSHOT()
void SCENE_HRO; void SCENE_HEAD_OF_PEOPLE; void SCENE_DUO; void SCENE_FOUNDER;
