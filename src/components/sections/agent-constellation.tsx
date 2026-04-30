import { ReactNode } from 'react'
import {
  HiringIcon, OnboardingIcon, LifecycleIcon, CompIcon, TimeOffIcon,
  PerformanceIcon, LDIcon, EmployeeRelationsIcon, ComplianceIcon,
  OffboardingIcon, ReportsIcon, CultureIcon, HROpsIcon, ChangeMgmtIcon,
} from '@/components/surfaces/agent-icons'

type AgentNode = {
  name: string
  icon: ReactNode
  status: 'active' | 'idle' | 'working'
  activity?: string
}

const agents: AgentNode[] = [
  { name: 'Hiring',            icon: <HiringIcon />,            status: 'working', activity: 'Drafting offer · Maya Chen' },
  { name: 'Onboarding',        icon: <OnboardingIcon />,        status: 'active'  },
  { name: 'Lifecycle',         icon: <LifecycleIcon />,         status: 'idle'    },
  { name: 'Comp & Benefits',   icon: <CompIcon />,              status: 'working', activity: 'Pay equity audit' },
  { name: 'Time Off',          icon: <TimeOffIcon />,           status: 'active', activity: '31 leaves · 4.2s avg' },
  { name: 'Performance',       icon: <PerformanceIcon />,       status: 'active'  },
  { name: 'L&D',               icon: <LDIcon />,                status: 'idle'    },
  { name: 'Employee Relations',icon: <EmployeeRelationsIcon />, status: 'working' },
  { name: 'Compliance',        icon: <ComplianceIcon />,        status: 'active', activity: 'EEO-1 · due May 31' },
  { name: 'Offboarding',       icon: <OffboardingIcon />,       status: 'idle'    },
  { name: 'Reports',           icon: <ReportsIcon />,           status: 'active'  },
  { name: 'Culture',           icon: <CultureIcon />,           status: 'idle'    },
  { name: 'HR Ops',            icon: <HROpsIcon />,             status: 'active'  },
  { name: 'Change Management', icon: <ChangeMgmtIcon />,        status: 'working', activity: 'Modeling Q3 reorg' },
]

// Container is square. Use viewBox of 800x800. Center at (400,400).
// Outer agent radius ~310. Center node ~96 radius. Inner orbit ~150, mid ~230.
const SIZE = 800
const CX = 400
const CY = 400
const AGENT_R = 305          // distance from center to agent center
const AGENT_BADGE = 92       // size of agent badge
const ORBITS = [148, 232, 308] // decorative orbits
const NAME_OFFSET = 60       // distance below badge for the label

const statusColor: Record<string, { stroke: string; opacity: number; dot: string }> = {
  working: { stroke: 'var(--gold)',     opacity: 0.85, dot: '#EAB308' },
  active:  { stroke: 'var(--gold)',     opacity: 0.55, dot: '#22C55E' },
  idle:    { stroke: 'var(--text-faint)', opacity: 0.25, dot: '#A8A29E' },
}

function pos(i: number, n: number, r: number) {
  const angle = (2 * Math.PI * i) / n - Math.PI / 2 // start at top, go clockwise
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
    angle,
  }
}

export default function AgentConstellation() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: SIZE,
        aspectRatio: '1 / 1',
        margin: '0 auto',
      }}
    >
      {/* SVG layer: orbits + connection lines */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Radial gradient background */}
        <defs>
          <radialGradient id="constellation-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(176,141,87,0.08)" />
            <stop offset="55%" stopColor="rgba(250,247,242,0)" />
            <stop offset="100%" stopColor="rgba(250,247,242,0)" />
          </radialGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(176,141,87,0.35)" />
            <stop offset="100%" stopColor="rgba(176,141,87,0)" />
          </radialGradient>
        </defs>

        {/* Background tint */}
        <rect width={SIZE} height={SIZE} fill="url(#constellation-bg)" />

        {/* Decorative orbital tracks */}
        {ORBITS.map((r, i) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="var(--gold)"
            strokeOpacity={0.06 + i * 0.02}
            strokeWidth={1}
            strokeDasharray={i === 1 ? '2 6' : 'none'}
          />
        ))}

        {/* Core glow */}
        <circle cx={CX} cy={CY} r={150} fill="url(#core-glow)" />

        {/* Connection lines: orchestrator → each agent */}
        {agents.map((a, i) => {
          const p = pos(i, agents.length, AGENT_R)
          const s = statusColor[a.status]
          const dx = p.x - CX
          const dy = p.y - CY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const innerR = 96  // start at edge of core node
          const outerR = dist - AGENT_BADGE / 2 - 4  // stop at edge of agent badge
          const x1 = CX + (dx / dist) * innerR
          const y1 = CY + (dy / dist) * innerR
          const x2 = CX + (dx / dist) * outerR
          const y2 = CY + (dy / dist) * outerR
          return (
            <g key={a.name}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={s.stroke}
                strokeOpacity={s.opacity}
                strokeWidth={a.status === 'working' ? 1.5 : 1}
                strokeDasharray={a.status === 'idle' ? '3 5' : 'none'}
              />
              {/* tiny dot at the agent end of the line */}
              <circle cx={x2} cy={y2} r={2.5} fill={s.stroke} fillOpacity={s.opacity} />
            </g>
          )
        })}

        {/* Animated pulse: a single dot traveling on the Hiring line (most active) */}
        <circle r={3.5} fill="var(--gold)">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path={`M ${CX + 96 * Math.cos(-Math.PI / 2)} ${CY + 96 * Math.sin(-Math.PI / 2)} L ${CX + (AGENT_R - AGENT_BADGE / 2 - 4) * Math.cos(-Math.PI / 2)} ${CY + (AGENT_R - AGENT_BADGE / 2 - 4) * Math.sin(-Math.PI / 2)}`}
          />
        </circle>
      </svg>

      {/* Center: Orchestrator node */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 192,
          height: 192,
          borderRadius: 32,
          background: 'linear-gradient(135deg, #1C1917 0%, #2A2723 100%)',
          border: '1px solid rgba(176,141,87,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 60px rgba(28,25,23,0.18), 0 0 0 6px rgba(176,141,87,0.06)',
        }}
      >
        <span style={{ color: 'var(--gold)', fontSize: 36, lineHeight: 1, marginBottom: 8 }}>◆</span>
        <span
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 28,
            fontWeight: 400,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          Mamba
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'rgba(176,141,87,0.85)',
            background: 'rgba(176,141,87,0.12)',
            border: '1px solid rgba(176,141,87,0.25)',
            borderRadius: 999,
            padding: '3px 10px',
          }}
        >
          ORCHESTRATOR
        </span>
        {/* Live activity tiny line */}
        <p
          style={{
            position: 'absolute',
            bottom: -32,
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 10,
            color: 'var(--text-faint)',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#22C55E' }}>●</span>{'  '}routing 47 actions/min
        </p>
      </div>

      {/* Agent badges */}
      {agents.map((a, i) => {
        const p = pos(i, agents.length, AGENT_R)
        const xPct = (p.x / SIZE) * 100
        const yPct = (p.y / SIZE) * 100
        const s = statusColor[a.status]
        const isActive = a.status !== 'idle'
        return (
          <div
            key={a.name}
            style={{
              position: 'absolute',
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: 'translate(-50%, -50%)',
              width: AGENT_BADGE,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: '#FFFFFF',
                border: isActive ? '1px solid rgba(176,141,87,0.35)' : '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-dark)',
                position: 'relative',
                boxShadow: isActive
                  ? '0 4px 16px rgba(176,141,87,0.12), 0 1px 2px rgba(0,0,0,0.04)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {a.icon}
              {/* status dot */}
              <span
                style={{
                  position: 'absolute',
                  top: -3,
                  right: -3,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: s.dot,
                  border: '2px solid #FFFFFF',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--text)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              }}
            >
              {a.name}
            </span>
            {a.activity && (
              <span
                style={{
                  fontSize: 9.5,
                  color: 'var(--text-faint)',
                  fontStyle: 'italic',
                  whiteSpace: 'nowrap',
                  marginTop: -4,
                }}
              >
                {a.activity}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
