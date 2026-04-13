'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Animated checklist — items check off on scroll ── */
function AnimatedChecklist({ items, delay = 0 }: { items: string[]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || count >= items.length) return
    const t = setTimeout(() => setCount(c => c + 1), 450 + delay)
    return () => clearTimeout(t)
  }, [started, count, items.length, delay])

  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <div key={item} className="flex items-center" style={{ gap: 10, padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid #f0eeea' : 'none', opacity: i < count ? 1 : 0.2, transform: i < count ? 'translateX(0)' : 'translateX(-6px)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: i < count ? '#f0fdf4' : '#f5f5f4', border: i < count ? '1.5px solid #22c55e' : '1.5px solid #e7e5e4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
            {i < count && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <span style={{ fontSize: 13, color: i < count ? '#1a1611' : '#a8a29e', fontWeight: i < count ? 500 : 400, transition: 'color 0.3s' }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Typing progress indicator ── */
function WorkingIndicator({ text }: { text: string }) {
  const [dots, setDots] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex items-center" style={{ gap: 6 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 2s linear infinite' }}>
        <circle cx="7" cy="7" r="5.5" stroke="#e7e5e4" strokeWidth="1.5" />
        <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 13, color: '#78716c' }}>{text}{'.'.repeat(dots)}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 1: Change Management
   Visual: Agent plan with progress steps + notification letter preview
   ═══════════════════════════════════════════ */
function ChangeMgmtMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Progress card */}
      <div style={{ padding: 20, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1611' }}>Progress</span>
          <span style={{ fontSize: 11, color: '#a8a29e' }}>4 of 6 steps</span>
        </div>
        <AnimatedChecklist items={[
          'Generate notification letters (12)',
          'Calculate severance packages',
          'Schedule COBRA continuation',
          'Revoke system access on termination date',
        ]} />
        {/* Pending items */}
        <div style={{ opacity: 0.35, marginTop: 2 }}>
          <div className="flex items-center" style={{ gap: 10, padding: '10px 0', borderBottom: '1px solid #f0eeea' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #e7e5e4', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#a8a29e' }}>Process final paychecks</span>
          </div>
          <div className="flex items-center" style={{ gap: 10, padding: '10px 0' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #e7e5e4', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#a8a29e' }}>Archive employee records</span>
          </div>
        </div>
      </div>

      {/* Output files */}
      <div style={{ padding: 16, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#a8a29e' }}>Outputs</span>
          <span style={{ fontSize: 11, color: '#a8a29e' }}>3 Files Created</span>
        </div>
        {[
          { name: 'Notification_Letters_Batch.docx', icon: 'W', color: '#1565c0', bg: '#e3f2fd' },
          { name: 'Severance_Calculations.xlsx', icon: 'X', color: '#2e7d32', bg: '#e8f5e9' },
          { name: 'COBRA_Continuation_Notice.pdf', icon: 'P', color: '#c62828', bg: '#ffebee' },
        ].map((file) => (
          <div key={file.name} className="flex items-center" style={{ gap: 10, padding: '8px 0', borderBottom: '1px solid #f5f5f4' }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: file.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: file.color, flexShrink: 0 }}>{file.icon}</div>
            <span style={{ fontSize: 12, color: '#1a1611' }}>{file.name}</span>
          </div>
        ))}
        <div className="flex items-center" style={{ gap: 10, padding: '8px 0' }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#f5f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#a8a29e', flexShrink: 0 }}>...</div>
          <span style={{ fontSize: 12, color: '#a8a29e', fontStyle: 'italic' }}>Generating...</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 2: Onboarding
   Visual: Multi-task runner showing parallel tasks
   ═══════════════════════════════════════════ */
function OnboardMockup() {
  return (
    <div style={{ padding: 24, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <WorkingIndicator text="Preparing Day 1 for Taylor Ross" />
      <div style={{ marginTop: 20 }}>
        {[
          { task: 'Send offer letter for e-signature', status: 'Done', badge: '#dcfce7', badgeText: '#16a34a', source: 'DocuSign' },
          { task: 'Order equipment (MacBook Pro, monitor)', status: 'Done', badge: '#dcfce7', badgeText: '#16a34a', source: 'IT' },
          { task: 'Provision Google Workspace account', status: 'Done', badge: '#dcfce7', badgeText: '#16a34a', source: 'Admin' },
          { task: 'Assign onboarding buddy', status: 'In progress', badge: '#fef9c3', badgeText: '#a16207', source: 'Team' },
          { task: 'Generate onboarding schedule', status: 'In progress', badge: '#fef9c3', badgeText: '#a16207', source: 'Calendar' },
        ].map((item, i) => (
          <div key={item.task} className="flex items-center justify-between" style={{ padding: '12px 0', borderBottom: i < 4 ? '1px solid #f5f5f4' : 'none' }}>
            <span style={{ fontSize: 13, color: '#1a1611', flex: 1, marginRight: 12 }}>{item.task}</span>
            <div className="flex items-center" style={{ gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999, backgroundColor: item.badge, color: item.badgeText }}>{item.status}</span>
              <span style={{ fontSize: 10, color: '#a8a29e', padding: '3px 8px', borderRadius: 999, backgroundColor: '#f5f5f4' }}>{item.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 3: Offboarding
   Visual: Source gathering + access revocation with real system names
   ═══════════════════════════════════════════ */
function OffboardMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: 20, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <WorkingIndicator text="Revoking access for James Park" />
        <div style={{ marginTop: 16 }}>
          {[
            { system: 'Google Workspace', icon: 'G', color: '#4285f4', bg: '#e8f0fe', status: 'Revoked' },
            { system: 'Slack', icon: 'S', color: '#611f69', bg: '#f3e8ff', status: 'Revoked' },
            { system: 'GitHub', icon: 'H', color: '#1a1611', bg: '#f5f5f4', status: 'Revoked' },
            { system: 'AWS Console', icon: 'A', color: '#ff9900', bg: '#fff7ed', status: 'Revoking...' },
          ].map((sys) => (
            <div key={sys.system} className="flex items-center justify-between" style={{ padding: '10px 0', borderBottom: '1px solid #f5f5f4' }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: sys.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: sys.color }}>{sys.icon}</div>
                <span style={{ fontSize: 13, color: '#1a1611' }}>{sys.system}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, color: sys.status === 'Revoking...' ? '#a16207' : '#16a34a' }}>{sys.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final pay calculation */}
      <div style={{ padding: 16, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 12, color: '#a8a29e' }}>Synthesizing final pay</span>
        <div style={{ marginTop: 12, padding: 14, borderRadius: 10, backgroundColor: '#fafaf7' }}>
          <div className="flex justify-between" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#78716c' }}>Remaining salary</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>$6,230.77</span>
          </div>
          <div className="flex justify-between" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#78716c' }}>Unused PTO (8 days)</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1611' }}>$2,189.56</span>
          </div>
          <div className="flex justify-between" style={{ paddingTop: 8, borderTop: '1px solid #e7e5e4' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1611' }}>Total final pay</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1611' }}>$8,420.33</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 4: Leave
   Visual: Clean approval flow with timeline
   ═══════════════════════════════════════════ */
function LeaveMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || step >= 5) return
    const t = setTimeout(() => setStep(s => s + 1), 600)
    return () => clearTimeout(t)
  }, [started, step])

  const steps = [
    { time: '0.0s', label: 'Request received', detail: 'Sarah Chen — 5 days PTO' },
    { time: '0.8s', label: 'Balance verified', detail: '14 days remaining, no conflicts' },
    { time: '1.4s', label: 'Policy checked', detail: 'Auto-approve eligible' },
    { time: '2.8s', label: 'Systems updated', detail: 'Gusto payroll + Google Calendar' },
    { time: '4.2s', label: 'Complete', detail: 'Manager and employee notified' },
  ]

  return (
    <div ref={ref} style={{ padding: 24, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Vertical timeline line */}
        <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 1, backgroundColor: '#e7e5e4' }} />

        {steps.map((s, i) => (
          <div key={s.time} style={{ position: 'relative', paddingBottom: i < 4 ? 20 : 0, opacity: i < step ? 1 : 0.2, transition: 'opacity 0.4s' }}>
            {/* Dot on timeline */}
            <div style={{ position: 'absolute', left: -24, top: 3, width: 11, height: 11, borderRadius: '50%', backgroundColor: i < step ? (i === 4 ? '#22c55e' : 'var(--gold)') : '#e7e5e4', border: '2px solid #fff', transition: 'background-color 0.3s', zIndex: 1 }} />
            <div className="flex items-baseline justify-between">
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1611' }}>{s.label}</span>
              <span style={{ fontSize: 10, color: '#a8a29e', fontFamily: 'var(--font-mono), monospace' }}>{s.time}</span>
            </div>
            <span style={{ fontSize: 12, color: '#78716c' }}>{s.detail}</span>
          </div>
        ))}
      </div>

      {step >= 5 && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#16a34a' }}>
          Resolved in 4.2 seconds — no human involved
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   SECTION 5: Risk
   Visual: Document review with flagged issues + tracked changes preview
   ═══════════════════════════════════════════ */
function RiskMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Flagged issues */}
      <div style={{ padding: 20, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1611' }}>Issues flagged</span>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999, backgroundColor: '#fef9c3', color: '#a16207' }}>3 found</span>
        </div>
        {[
          { issue: 'Employee handbook §4.2 outdated', severity: 'High', color: '#dc2626' },
          { issue: 'Pay equity gap in Engineering L3 (8.2%)', severity: 'Medium', color: '#d97706' },
          { issue: 'Missing I-9 verification for 2 hires', severity: 'High', color: '#dc2626' },
        ].map((item, i) => (
          <div key={item.issue} style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid #f5f5f4' : 'none' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: '#1a1611' }}>{item.issue}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: item.color }}>{item.severity}</span>
          </div>
        ))}
      </div>

      {/* Document redline preview */}
      <div style={{ padding: 16, borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#a8a29e' }}>MambaHR suggested an edit</span>
          <span style={{ fontSize: 10, color: '#a8a29e' }}>Just now</span>
        </div>
        <div style={{ padding: 14, borderRadius: 10, backgroundColor: '#fafaf7', fontSize: 12, color: '#57534e', lineHeight: 1.7 }}>
          <span style={{ textDecoration: 'line-through', color: '#dc2626', opacity: 0.7 }}>Employees may take unpaid leave at the discretion of their manager.</span>
          {' '}
          <span style={{ backgroundColor: '#dcfce7', padding: '1px 4px', borderRadius: 3, color: '#16a34a' }}>Employees are entitled to unpaid leave as provided under applicable federal and state regulations, subject to eligibility verification.</span>
        </div>
        <div className="flex" style={{ gap: 8, marginTop: 12 }}>
          <span style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid #e7e5e4', fontSize: 12, fontWeight: 500, color: '#78716c', textAlign: 'center', cursor: 'pointer' }}>Reject</span>
          <span style={{ flex: 1, padding: '8px 0', borderRadius: 8, backgroundColor: '#1a1611', color: '#fff', fontSize: 12, fontWeight: 600, textAlign: 'center', cursor: 'pointer' }}>Accept</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

const sections = [
  {
    label: 'Change Management',
    headline: 'RIFs are brutal.\nThe paperwork shouldn\'t be.',
    sub: 'Reorgs, layoffs, and role changes generate hundreds of tasks. One mistake and you\'re in court. The agent handles the operational side — letters, severance, access, records — so your team can handle the human side.',
    mockup: <ChangeMgmtMockup />,
  },
  {
    label: 'Onboarding',
    headline: 'Run five onboardings\nat once.',
    sub: 'Each new hire triggers dozens of parallel tasks across systems. The agent kicks them all off simultaneously and reports back when they\'re done — or when something needs you.',
    mockup: <OnboardMockup />,
  },
  {
    label: 'Offboarding',
    headline: 'Exits handled with\nsurgical precision.',
    sub: 'Access revoked in minutes across every system. Final pay calculated to the penny. Equipment tracked. Knowledge transfer scheduled. No more security gaps from forgotten accounts.',
    mockup: <OffboardMockup />,
  },
  {
    label: 'Leave & Time Off',
    headline: '4.2 seconds.\nNo humans involved.',
    sub: 'Request comes in. Agent checks balance, verifies policy, routes approval, updates payroll, notifies manager. Done before you finish reading this sentence.',
    mockup: <LeaveMockup />,
  },
  {
    label: 'Risk & Policy',
    headline: 'Make the final call.\nWe\'ll flag the rest.',
    sub: 'The agent monitors your policies, catches gaps, suggests edits, and keeps an auditable trail. You review and approve — the judgment stays with you.',
    mockup: <RiskMockup />,
  },
]

export default function Capabilities() {
  return (
    <section style={{ backgroundColor: '#fafaf7' }}>
      {/* Section header */}
      <div style={{ padding: '120px 24px 0', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--gold)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
          What the agent does
        </p>
        <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#1a1611', marginBottom: 20 }}>
          Delegate the admin.
        </h2>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#78716c', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          MambaHR agents handle HR operations end to end, so you can focus on what only humans can do.
        </p>
      </div>

      {/* Pipeline visualization — desktop only */}
      <div className="hidden md:block" style={{ padding: '72px 24px 0', maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        {/* Labels */}
        <div className="grid grid-cols-5" style={{ gap: 12, marginBottom: 20 }}>
          {['Intake', 'Verify', 'Act', 'Notify', 'Review'].map((label, i) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                padding: '10px 28px',
                borderRadius: 999,
                border: i === 2 ? '2px solid var(--gold)' : '1.5px solid #e7e5e4',
                fontSize: 14,
                fontWeight: 600,
                color: i === 2 ? 'var(--gold)' : '#1a1611',
                backgroundColor: '#fff',
                boxShadow: i === 2 ? '0 4px 20px rgba(176,141,87,0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Connecting line with dots */}
        <div style={{ position: 'relative', height: 8, margin: '0 10%' }}>
          <div style={{ position: 'absolute', top: 3, left: 0, right: 0, height: 1, backgroundColor: '#e7e5e4' }} />
          {[0, 25, 50, 75, 100].map((pct) => (
            <div key={pct} style={{ position: 'absolute', left: `${pct}%`, top: 0, width: 7, height: 7, borderRadius: '50%', backgroundColor: pct === 50 ? 'var(--gold)' : '#d6d3d1', transform: 'translateX(-50%)', boxShadow: pct === 50 ? '0 0 8px rgba(176,141,87,0.4)' : 'none' }} />
          ))}
        </div>

        {/* Mini mockup cards */}
        <div className="grid grid-cols-5" style={{ gap: 12, marginTop: 20 }}>
          {/* Intake — avatar card */}
          <div className="card-hover" style={{ padding: 14, borderRadius: 12, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: '#f0eee8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#78716c' }}>SC</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1611' }}>Sarah Chen</div>
                <div style={{ fontSize: 9, color: '#a8a29e' }}>PTO · 5 days</div>
              </div>
            </div>
            <div style={{ padding: '6px 8px', borderRadius: 6, backgroundColor: '#fafaf7', fontSize: 9, color: '#78716c' }}>Dec 23–27, 2026</div>
          </div>

          {/* Verify — green checks */}
          <div className="card-hover" style={{ padding: 14, borderRadius: 12, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
            {['14 days left', 'No blackout', 'Auto-approve'].map((t) => (
              <div key={t} className="flex items-center" style={{ gap: 6, padding: '5px 0' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="7" height="5" viewBox="0 0 7 5"><path d="M1 2.5L2.5 4L6 1" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                </div>
                <span style={{ fontSize: 10, color: '#1a1611' }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Act — HRIS logos */}
          <div className="card-hover" style={{ padding: 14, borderRadius: 12, backgroundColor: '#fff', border: '2px solid rgba(176,141,87,0.2)', boxShadow: '0 6px 24px rgba(176,141,87,0.1)' }}>
            <div className="flex" style={{ gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              {[
                { l: 'G', c: '#2e7d32', b: '#e8f5e9' },
                { l: 'B', c: '#e65100', b: '#fff3e0' },
                { l: 'R', c: '#1565c0', b: '#e3f2fd' },
              ].map(s => (
                <div key={s.l} style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: s.b, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: s.c }}>{s.l}</div>
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gold)', marginBottom: 4 }}>● In progress</div>
            <div style={{ fontSize: 9, color: '#a8a29e', fontStyle: 'italic' }}>Syncing payroll...</div>
          </div>

          {/* Notify — messages */}
          <div className="card-hover" style={{ padding: 14, borderRadius: 12, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
            {[
              { to: 'Sarah Chen', tag: 'Approved', color: '#16a34a', bg: '#dcfce7' },
              { to: 'Alex Kim', tag: 'FYI', color: '#78716c', bg: '#f5f5f4' },
            ].map(m => (
              <div key={m.to} className="flex items-center justify-between" style={{ padding: '6px 8px', borderRadius: 6, backgroundColor: '#fafaf7', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: '#1a1611' }}>{m.to}</span>
                <span style={{ fontSize: 8, fontWeight: 600, padding: '2px 5px', borderRadius: 3, backgroundColor: m.bg, color: m.color }}>{m.tag}</span>
              </div>
            ))}
            <div style={{ fontSize: 9, color: '#a8a29e', marginTop: 4, fontStyle: 'italic' }}>Calendar updated</div>
          </div>

          {/* Review — accept/reject */}
          <div className="card-hover" style={{ padding: 14, borderRadius: 12, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 6 }}>MambaHR made an edit</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#1a1611', marginBottom: 10 }}>Auto-approved PTO request</div>
            <div className="flex" style={{ gap: 4 }}>
              <span style={{ flex: 1, padding: '6px 0', borderRadius: 6, backgroundColor: '#1a1611', color: '#fff', fontSize: 10, fontWeight: 600, textAlign: 'center' }}>Accept</span>
              <span style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid #e7e5e4', fontSize: 10, color: '#78716c', textAlign: 'center' }}>Reject</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile pipeline — pills only */}
      <div className="md:hidden" style={{ padding: '48px 24px 0' }}>
        <div className="flex flex-wrap justify-center" style={{ gap: 8 }}>
          {['Intake', 'Verify', 'Act', 'Notify', 'Review'].map((s, i) => (
            <span key={s} style={{ padding: '6px 14px', borderRadius: 999, border: i === 2 ? '1.5px solid var(--gold)' : '1px solid #e7e5e4', fontSize: 12, fontWeight: 600, color: i === 2 ? 'var(--gold)' : '#78716c' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Feature sections — Harvey style, each visually unique */}
      {sections.map((section, i) => (
        <div key={section.label} style={{ padding: '100px 24px', borderTop: i === 0 ? '1px solid #e7e5e4' : 'none', borderBottom: '1px solid #e7e5e4', marginTop: i === 0 ? 80 : 0 }}>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-start" style={{ maxWidth: 920, gap: 64 }}>
            {/* Text */}
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-mono), monospace' }}>
                {section.label}
              </p>
              <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1a1611', marginBottom: 20, whiteSpace: 'pre-line' }}>
                {section.headline}
              </h3>
              <p style={{ fontSize: 16, color: '#78716c', lineHeight: 1.7 }}>
                {section.sub}
              </p>
            </div>

            {/* Mockup */}
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              {section.mockup}
            </div>
          </div>
        </div>
      ))}

      {/* Closing — "Judgment stays with your team" */}
      <div style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Floating "Ready for review" pills */}
        {[
          { top: '15%', left: '8%' }, { top: '25%', right: '12%' },
          { top: '55%', left: '5%' }, { top: '65%', right: '8%' },
          { top: '35%', left: '15%' }, { top: '45%', right: '18%' },
          { bottom: '20%', left: '12%' }, { bottom: '25%', right: '15%' },
        ].map((pos, i) => (
          <div
            key={i}
            className="hidden md:flex items-center"
            style={{
              position: 'absolute',
              ...pos,
              gap: 6,
              padding: '5px 12px',
              borderRadius: 999,
              backgroundColor: '#fff',
              border: '1px solid #e7e5e4',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              fontSize: 10,
              color: '#a8a29e',
              animation: `float ${5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#60a5fa' }} />
            Ready for review
          </div>
        ))}

        {/* Center card */}
        <div style={{ position: 'relative', zIndex: 1, display: 'inline-block', marginBottom: 32 }}>
          <div style={{ padding: '20px 32px', borderRadius: 14, backgroundColor: '#fff', border: '1px solid #e7e5e4', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'left' }}>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: '#1a1611', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>M</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1611' }}>MambaHR</span>
            </div>
            <div style={{ fontSize: 12, color: '#78716c', marginBottom: 12 }}>12 tasks completed · 2 need review</div>
            <div style={{ padding: '10px 32px', borderRadius: 8, backgroundColor: '#1a1611', color: '#fff', fontSize: 13, fontWeight: 600, textAlign: 'center', cursor: 'pointer' }}>
              Accept Changes
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1a1611', lineHeight: 1.1, marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <em style={{ fontStyle: 'italic', fontWeight: 800 }}>Judgment</em><br />
          <em style={{ fontStyle: 'italic', fontWeight: 800 }}>stays with</em> <em style={{ fontStyle: 'italic', fontWeight: 800, color: 'var(--gold)' }}>you.</em>
        </h3>
        <p style={{ fontSize: 16, color: '#78716c', maxWidth: 400, margin: '0 auto', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
          Agents do the execution while you review, strategize, and make the decisions that matter.
        </p>
      </div>
    </section>
  )
}
