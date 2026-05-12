import { TimeOffIcon, HiringIcon, OnboardingIcon, LifecycleIcon, CompIcon,
  PerformanceIcon, LDIcon, EmployeeRelationsIcon, ComplianceIcon,
  OffboardingIcon, ReportsIcon, CultureIcon, HROpsIcon, ChangeMgmtIcon } from '@/components/surfaces/agent-icons'

const directory = [
  { num: '01', name: 'Hiring',             role: 'Recruiting, screening, offers',           icon: <HiringIcon /> },
  { num: '02', name: 'Onboarding',         role: 'Day-one ready in 3 days',                  icon: <OnboardingIcon /> },
  { num: '03', name: 'Lifecycle',          role: 'Promotions, transfers, role changes',      icon: <LifecycleIcon /> },
  { num: '04', name: 'Comp & Benefits',    role: 'Bands, equity, enrollment',                icon: <CompIcon /> },
  { num: '05', name: 'Time Off',           role: 'PTO, FMLA, parental, disability',          icon: <TimeOffIcon /> },
  { num: '06', name: 'Performance',        role: 'Reviews, PIPs, calibration',               icon: <PerformanceIcon /> },
  { num: '07', name: 'Learning & Dev.',    role: 'Training, career paths, tuition',          icon: <LDIcon /> },
  { num: '08', name: 'Employee Relations', role: 'Investigations, accommodations',           icon: <EmployeeRelationsIcon /> },
  { num: '09', name: 'Compliance',         role: '95K lines of employment law',              icon: <ComplianceIcon /> },
  { num: '10', name: 'Offboarding',        role: 'Resignations, terminations, RIF',          icon: <OffboardingIcon /> },
  { num: '11', name: 'Reports',            role: 'Headcount, turnover, DEI, board',          icon: <ReportsIcon /> },
  { num: '12', name: 'Culture',            role: 'Surveys, eNPS, recognition',               icon: <CultureIcon /> },
  { num: '13', name: 'HR Ops',             role: 'Data quality, vendor management',          icon: <HROpsIcon /> },
  { num: '14', name: 'Change Management',  role: 'Restructures, M&A, RIF planning',          icon: <ChangeMgmtIcon /> },
]

const Arrow = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 12px' }}>
    <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
      <path d="M0 7h28m-5-5l5 5-5 5" stroke="var(--gold)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  </div>
)

export default function AgentPipeline() {

  return (
    <div>
      {/* Live ticker label above pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          9:14 AM · 47 actions routed
        </span>
      </div>

      {/* Three-frame pipeline */}
      <div className="pipeline-row" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0, maxWidth: 1080, margin: '0 auto' }}>

        {/* FRAME 1: Inbound */}
        <div style={{ flex: 1, maxWidth: 320 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 14 }}>
            Inbound
          </p>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: '0 0 10px', fontFamily: 'var(--font-mono), monospace' }}>
              #people-ops · Slack
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#D4C4B5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#57534E' }}>
                MC
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Maya Chen</span>
                  <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>9:14 AM</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>
                  @mamba I need 3 days off next week — Mon to Wed for a wedding 🎉
                </p>
              </div>
            </div>
          </div>
        </div>

        <Arrow />

        {/* FRAME 2: Mamba orchestrator — dark, premium */}
        <div style={{ flex: 1, maxWidth: 280 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 14 }}>
            Orchestrator
          </p>
          <div style={{
            background: 'linear-gradient(160deg, #1C1917 0%, #2A2723 100%)',
            border: '1px solid rgba(176,141,87,0.25)',
            borderRadius: 12,
            padding: '20px',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle gold corner glow */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle, rgba(176,141,87,0.18), transparent 70%)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative' }}>
              <img src="/MambaHR_logo.png" alt="Mamba" width={22} height={22} style={{ display: 'block', objectFit: 'contain', borderRadius: 6, filter: 'brightness(1.4)' }} />
              <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 18, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Mamba</span>
              <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: 'rgba(176,141,87,0.85)', letterSpacing: '0.16em', background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.25)', borderRadius: 999, padding: '2px 8px' }}>
                ROUTED
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Intent classified
              </p>
              <p style={{ fontSize: 13, color: '#FFFFFF', lineHeight: 1.5, margin: '0 0 16px' }}>
                Leave request · 3 days · within policy
              </p>

              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Handed to
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(176,141,87,0.12)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 8, padding: '6px 12px', color: 'var(--gold)' }}>
                <TimeOffIcon />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>Time Off agent</span>
              </div>
            </div>
          </div>
        </div>

        <Arrow />

        {/* FRAME 3: Specialist response */}
        <div style={{ flex: 1, maxWidth: 320 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 14 }}>
            Resolved in 4.2 sec
          </p>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(176,141,87,0.25)',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ background: 'var(--gold-tint)', color: 'var(--gold-dark)', borderRadius: 6, padding: '4px', display: 'inline-flex' }}>
                <TimeOffIcon />
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Time Off agent</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: '#15803D', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.04em' }}>
                AUTO
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { txt: 'Within company policy · 12 → 9 days', strong: false },
                { txt: 'Calendar blocked Apr 6–8', strong: false },
                { txt: 'Manager notified · OOO set', strong: false },
                { txt: 'Audit log entry written', strong: false },
              ].map((r) => (
                <div key={r.txt} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 6l3 3 5-6" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{r.txt}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border-faint)' }}>
              <p style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em', margin: 0 }}>
                resolved 9:14:04
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECTORY — editorial list of 14 agents */}
      <div style={{ marginTop: 100, maxWidth: 1080, margin: '100px auto 0' }}>
        {/* Section divider rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <span style={{ height: 1, background: 'var(--border)', flex: 1 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            The fourteen specialists
          </span>
          <span style={{ height: 1, background: 'var(--border)', flex: 1 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 64, rowGap: 0 }} className="agent-directory">
          {directory.map((a, i) => (
            <div
              key={a.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '36px 24px 1fr',
                alignItems: 'baseline',
                gap: 16,
                padding: '20px 0',
                borderBottom: i < directory.length - 1 && i !== directory.length - 2 ? '1px solid var(--border-faint)' : (i === directory.length - 1 || i === directory.length - 2 ? 'none' : '1px solid var(--border-faint)'),
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: '0.04em' }}
              >
                {a.num}
              </span>
              <span style={{ color: 'var(--gold-dark)', display: 'inline-flex', alignSelf: 'center' }}>
                {a.icon}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, justifyContent: 'space-between', minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.name}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                    fontStyle: 'italic',
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
