'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Animated step checklist ── */
function StepChecklist({ steps, startDelay = 0 }: { steps: string[]; startDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (visibleCount < steps.length) {
      const timer = setTimeout(() => setVisibleCount(v => v + 1), 500 + startDelay)
      return () => clearTimeout(timer)
    }
  }, [started, visibleCount, steps.length, startDelay])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => (
        <div
          key={step}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 0',
            borderBottom: i < steps.length - 1 ? '1px solid var(--border-light)' : 'none',
            opacity: i < visibleCount ? 1 : 0.15,
            transform: i < visibleCount ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: i < visibleCount ? '2px solid var(--gold)' : '2px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s',
            backgroundColor: i < visibleCount ? 'rgba(176,141,87,0.08)' : 'transparent',
          }}>
            {i < visibleCount && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 14, color: i < visibleCount ? 'var(--text-dark)' : 'var(--text-dark-faint)', fontWeight: i < visibleCount ? 500 : 400 }}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Status badge ── */
function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      backgroundColor: color === 'gold' ? 'rgba(176,141,87,0.1)' : color === 'green' ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.04)',
      fontSize: 11,
      fontWeight: 600,
      color: color === 'gold' ? 'var(--gold)' : color === 'green' ? '#16a34a' : 'var(--text-dark-faint)',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: color === 'gold' ? 'var(--gold)' : color === 'green' ? '#16a34a' : 'var(--text-dark-faint)' }} />
      {label}
    </span>
  )
}

/* ── File output row ── */
function FileRow({ name, generating }: { name: string; generating?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1" width="12" height="14" rx="2" stroke={generating ? 'var(--text-dark-faint)' : 'var(--gold)'} strokeWidth="1" fill="none" />
        <path d="M5 5h6M5 8h4" stroke={generating ? 'var(--text-dark-faint)' : 'var(--text-dark-muted)'} strokeWidth="0.8" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 13, color: generating ? 'var(--text-dark-faint)' : 'var(--text-dark)', fontStyle: generating ? 'italic' : 'normal' }}>
        {name}
      </span>
    </div>
  )
}

const sections = [
  {
    id: 'change-management',
    label: 'Change Management',
    headline: 'RIFs are brutal. The paperwork shouldn\'t be.',
    sub: 'Reorgs, layoffs, and role changes generate hundreds of tasks that have to be done right. One mistake and you\'re in court. MambaHR handles the operational side so your team can handle the human side.',
    mockup: 'change',
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    headline: 'Day 1 ready. Before the hire walks in.',
    sub: 'Contracts, equipment, access, buddy assignments, welcome messages — the agent handles every step. Your new hire shows up to a fully prepared environment, not a scramble.',
    mockup: 'onboard',
  },
  {
    id: 'offboarding',
    label: 'Offboarding',
    headline: 'Exits handled with surgical precision.',
    sub: 'Access revoked in minutes, not days. Equipment tracked. Final pay calculated. Knowledge transfer scheduled. No more "wait, does the ex-employee still have access to Stripe?"',
    mockup: 'offboard',
  },
  {
    id: 'leave',
    label: 'Leave & Time Off',
    headline: '4.2 seconds. No forms. No back-and-forth.',
    sub: 'Request comes in. Agent checks balance, verifies policy, routes approval (or auto-approves), updates payroll, notifies manager. Done before you finish reading this sentence.',
    mockup: 'leave',
  },
  {
    id: 'risk',
    label: 'Risk & Policy',
    headline: 'Problems caught before they become lawsuits.',
    sub: 'The agent monitors your policies, flags when your handbook is stale, catches pay equity gaps, and keeps an auditable trail of every decision it makes. Quietly, in the background.',
    mockup: 'risk',
  },
]

function ChangeMgmtMockup() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light-surface)', borderRadius: 12, border: '1px solid var(--border-light)', padding: 24, maxWidth: 400 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Agent Plan</div>
      <div style={{ fontSize: 13, color: 'var(--text-dark-muted)', marginBottom: 16 }}>Workforce reduction — 12 affected employees</div>
      <StepChecklist steps={[
        'Generate notification letters (12)',
        'Calculate severance packages',
        'Schedule exit interviews',
        'Revoke system access on termination date',
        'Process final pay and benefits continuation',
        'Archive employee records',
      ]} />
    </div>
  )
}

function OnboardMockup() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light-surface)', borderRadius: 12, border: '1px solid var(--border-light)', padding: 24, maxWidth: 380 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-dark)' }}>Taylor Ross</div>
          <div style={{ fontSize: 12, color: 'var(--text-dark-faint)' }}>Starts Monday, Apr 14</div>
        </div>
        <StatusBadge label="On track" color="green" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <FileRow name="Offer letter signed" />
        <FileRow name="Equipment ordered (MacBook Pro)" />
        <FileRow name="Google Workspace provisioned" />
        <FileRow name="Buddy assigned: Marcus Lee" />
        <FileRow name="Welcome message scheduled" />
        <FileRow name="Generating onboarding schedule..." generating />
      </div>
    </div>
  )
}

function OffboardMockup() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light-surface)', borderRadius: 12, border: '1px solid var(--border-light)', padding: 24, maxWidth: 380 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-dark)' }}>James Park — Exit</div>
          <div style={{ fontSize: 12, color: 'var(--text-dark-faint)' }}>Last day: Apr 18</div>
        </div>
        <StatusBadge label="In progress" color="gold" />
      </div>
      <StepChecklist steps={[
        'Revoke SSO, email, Slack, GitHub access',
        'Equipment return label sent',
        'Final paycheck calculated ($8,420.33)',
        'Benefits continuation notice generated',
        'Knowledge transfer meeting scheduled',
      ]} startDelay={200} />
    </div>
  )
}

function LeaveMockup() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light-surface)', borderRadius: 12, border: '1px solid var(--border-light)', padding: 24, maxWidth: 380 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 16 }}>PTO Request — Sarah Chen</div>
      {[
        { step: 'Balance checked — 14 days remaining', status: 'Done', color: 'green' },
        { step: 'No blackout conflict', status: 'Done', color: 'green' },
        { step: 'Auto-approved per policy', status: 'Done', color: 'green' },
        { step: 'Payroll updated in Gusto', status: 'Done', color: 'green' },
        { step: 'Manager notified', status: 'Done', color: 'green' },
      ].map((item, i) => (
        <div key={item.step} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--border-light)' : 'none' }}>
          <span style={{ fontSize: 13, color: 'var(--text-dark)' }}>{item.step}</span>
          <StatusBadge label={item.status} color={item.color} />
        </div>
      ))}
      <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono), monospace' }}>
        Completed in 4.2s
      </div>
    </div>
  )
}

function RiskMockup() {
  return (
    <div style={{ backgroundColor: 'var(--bg-light-surface)', borderRadius: 12, border: '1px solid var(--border-light)', padding: 24, maxWidth: 400 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark-faint)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 16 }}>Risk Monitor</div>
      {[
        { issue: 'Employee handbook section 4.2 outdated', severity: 'High', color: 'gold' },
        { issue: 'Pay equity gap: Engineering L3 (8.2%)', severity: 'Medium', color: 'gold' },
        { issue: 'Missing I-9 for 2 recent hires', severity: 'High', color: 'gold' },
      ].map((item, i) => (
        <div key={item.issue} style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dark)' }}>{item.issue}</span>
          </div>
          <StatusBadge label={item.severity} color={item.color} />
        </div>
      ))}
      <div style={{ marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: 'rgba(176,141,87,0.06)', fontSize: 12, color: 'var(--text-dark-muted)' }}>
        3 issues flagged · 0 escalated · Full audit trail available
      </div>
    </div>
  )
}

const mockups: Record<string, () => React.ReactNode> = {
  change: () => <ChangeMgmtMockup />,
  onboard: () => <OnboardMockup />,
  offboard: () => <OffboardMockup />,
  leave: () => <LeaveMockup />,
  risk: () => <RiskMockup />,
}

export default function Capabilities() {
  return (
    <section style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Section header */}
      <div style={{ padding: '96px 24px 0', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
          What the agent does
        </p>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-dark)', marginBottom: 20 }}>
          Delegate the admin.
        </h2>
        <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--text-dark-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.5, fontWeight: 500 }}>
          MambaHR agents handle HR operations end to end — so you can focus on what only humans can do.
        </p>
      </div>

      {/* Workflow pipeline — Harvey style */}
      <div className="hidden md:block" style={{ padding: '80px 24px 0', maxWidth: 1060, margin: '0 auto', position: 'relative' }}>

        {/* SVG flowing connector lines behind everything */}
        <svg style={{ position: 'absolute', top: 80, left: 0, width: '100%', height: 320, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1060 320" fill="none" preserveAspectRatio="none">
          {/* Flowing curves between columns */}
          <path d="M160 60 C210 60, 230 60, 280 60" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M380 60 C430 60, 450 60, 500 60" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M600 60 C650 60, 670 60, 720 60" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M820 60 C870 60, 890 60, 940 60" stroke="var(--border-light)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Downward curves from labels to cards */}
          <path d="M106 75 C106 100, 106 110, 106 120" stroke="var(--border-light)" strokeWidth="1" opacity="0.5" />
          <path d="M318 75 C318 100, 318 110, 318 120" stroke="var(--border-light)" strokeWidth="1" opacity="0.5" />
          <path d="M530 75 C530 100, 530 110, 530 120" stroke="var(--gold)" strokeWidth="1.5" opacity="0.4" />
          <path d="M742 75 C742 100, 742 110, 742 120" stroke="var(--border-light)" strokeWidth="1" opacity="0.5" />
          <path d="M954 75 C954 100, 954 110, 954 120" stroke="var(--border-light)" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Labels row */}
        <div className="grid grid-cols-5" style={{ gap: 20, marginBottom: 40, position: 'relative', zIndex: 1 }}>
          {['Intake', 'Verify', 'Act', 'Notify', 'Review'].map((label, i) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                padding: '10px 28px',
                borderRadius: 999,
                border: i === 2 ? '2px solid var(--gold)' : '1.5px solid var(--border-light)',
                fontSize: 14,
                fontWeight: 600,
                color: i === 2 ? 'var(--gold)' : 'var(--text-dark)',
                backgroundColor: 'var(--bg-light-surface)',
                boxShadow: i === 2 ? '0 4px 16px rgba(176,141,87,0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Mini mockup cards — floating with depth */}
        <div className="grid grid-cols-5" style={{ gap: 20, position: 'relative', zIndex: 1 }}>
          {/* Intake — request card with avatar */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }} className="card-hover">
            <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#f0eee8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-dark-faint)' }}>SC</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dark)' }}>Sarah Chen</div>
                <div style={{ fontSize: 10, color: 'var(--text-dark-faint)' }}>PTO request</div>
              </div>
            </div>
            <div style={{ padding: '8px 10px', borderRadius: 8, backgroundColor: 'rgba(176,141,87,0.04)', fontSize: 10, color: 'var(--text-dark-muted)' }}>
              5 days · Dec 23–27
            </div>
          </div>

          {/* Verify — checklist with green checks */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} className="card-hover">
            {[
              { text: '14 days remaining', done: true },
              { text: 'No blackout dates', done: true },
              { text: 'Auto-approve eligible', done: true },
            ].map((check) => (
              <div key={check.text} className="flex items-center" style={{ gap: 8, padding: '6px 0' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-dark)' }}>{check.text}</span>
              </div>
            ))}
          </div>

          {/* Act — HRIS logos + status */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '2px solid rgba(176,141,87,0.25)', boxShadow: '0 8px 32px rgba(176,141,87,0.1)' }} className="card-hover">
            <div className="flex items-center" style={{ gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              {['G', 'B', 'R'].map((letter, i) => (
                <div key={letter} style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: i === 0 ? '#e8f5e9' : i === 1 ? '#fff3e0' : '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? '#2e7d32' : i === 1 ? '#e65100' : '#1565c0', border: '1px solid rgba(0,0,0,0.06)' }}>
                  {letter}
                </div>
              ))}
            </div>
            <StatusBadge label="In progress" color="gold" />
            <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text-dark-muted)', fontStyle: 'italic' }}>
              Syncing payroll...
            </div>
          </div>

          {/* Notify — message bubbles */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} className="card-hover">
            {[
              { to: 'Sarah Chen', type: 'Approved' },
              { to: 'Alex Kim', type: 'FYI' },
            ].map((msg) => (
              <div key={msg.to} style={{ padding: '8px 10px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.02)', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-dark)' }}>{msg.to}</span>
                <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, backgroundColor: msg.type === 'Approved' ? '#dcfce7' : '#f0eee8', color: msg.type === 'Approved' ? '#16a34a' : 'var(--text-dark-faint)' }}>{msg.type}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: 'var(--text-dark-faint)', fontStyle: 'italic', marginTop: 4 }}>Calendar updated</div>
          </div>

          {/* Review — accept/reject */}
          <div style={{ padding: 16, borderRadius: 14, backgroundColor: 'var(--bg-light-surface)', border: '1px solid var(--border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} className="card-hover">
            <div style={{ fontSize: 11, color: 'var(--text-dark-faint)', marginBottom: 8 }}>MambaHR made a decision</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 12 }}>Auto-approved PTO</div>
            <div className="flex" style={{ gap: 6 }}>
              <span style={{ flex: 1, padding: '7px 0', borderRadius: 8, backgroundColor: 'var(--text-dark)', color: '#fff', fontSize: 11, fontWeight: 600, textAlign: 'center', cursor: 'pointer' }}>Accept</span>
              <span style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: '1px solid var(--border-light)', fontSize: 11, fontWeight: 500, color: 'var(--text-dark-faint)', textAlign: 'center', cursor: 'pointer' }}>Reject</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile pipeline — simplified pills */}
      <div className="md:hidden" style={{ padding: '48px 24px 0', maxWidth: 400, margin: '0 auto' }}>
        <div className="flex flex-wrap justify-center" style={{ gap: 8 }}>
          {['Intake', 'Verify', 'Act', 'Notify', 'Review'].map((step, i) => (
            <span key={step} style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: i === 2 ? '1.5px solid var(--gold)' : '1px solid var(--border-light)',
              fontSize: 12,
              fontWeight: 600,
              color: i === 2 ? 'var(--gold)' : 'var(--text-dark-muted)',
            }}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Feature sections */}
      {sections.map((section, i) => (
        <div
          key={section.id}
          style={{
            padding: '80px 24px',
            borderBottom: i < sections.length - 1 ? '1px solid var(--border-light)' : 'none',
          }}
        >
          <div
            className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center"
            style={{
              maxWidth: 900,
              gap: 56,
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
            }}
          >
            {/* Text side */}
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--gold)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 16,
                fontFamily: 'var(--font-mono), monospace',
              }}>
                {section.label}
              </p>
              <h3 style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-dark)',
                marginBottom: 16,
              }}>
                {section.headline}
              </h3>
              <p style={{
                fontSize: 15,
                color: 'var(--text-dark-muted)',
                lineHeight: 1.7,
              }}>
                {section.sub}
              </p>
            </div>

            {/* Mockup side */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              {mockups[section.mockup]()}
            </div>
          </div>
        </div>
      ))}

      {/* Closing line */}
      <div style={{ padding: '0 24px 96px', textAlign: 'center' }}>
        <h3 style={{
          fontSize: 'clamp(24px, 3vw, 40px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--text-dark)',
          marginBottom: 12,
          fontStyle: 'italic',
        }}>
          Judgment stays with your team.
        </h3>
        <p style={{ fontSize: 16, color: 'var(--text-dark-muted)', maxWidth: 440, margin: '0 auto' }}>
          Agents do the execution while you review, strategize, and make the decisions that matter.
        </p>
      </div>
    </section>
  )
}
