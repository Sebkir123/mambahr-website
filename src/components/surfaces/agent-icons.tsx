// Custom single-stroke SVG icons for the 14 HR agents.
// All 24x24, stroke=currentColor 1.5px. Used inside AgentCard's gold-tinted frame.

const baseProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const HiringIcon = () => (
  <svg {...baseProps}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 19c0-3 2.7-5 6-5s4.5 1.3 5.5 3" />
    <path d="M16 9h6m-3 -3v6" />
  </svg>
)

export const OnboardingIcon = () => (
  <svg {...baseProps}>
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    <path d="M5 21h14" />
    <circle cx="14" cy="13" r="0.8" fill="currentColor" />
  </svg>
)

export const LifecycleIcon = () => (
  <svg {...baseProps}>
    <path d="M21 12a9 9 0 1 1 -3.5 -7.1" />
    <path d="M21 4v5h-5" />
  </svg>
)

export const CompIcon = () => (
  <svg {...baseProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9.5c-.8-.9-2-1.5-3-1.5-1.7 0-3 1-3 2.3 0 3 6 1.8 6 4.7 0 1.4-1.3 2.5-3 2.5-1.5 0-2.6-.7-3-1.5" />
    <path d="M12 6v2m0 8v2" />
  </svg>
)

export const TimeOffIcon = () => (
  <svg {...baseProps}>
    <circle cx="12" cy="9" r="4" />
    <path d="M12 1v2M12 15v8M3 9h2M19 9h2M5.5 2.5l1.5 1.5M17 14l1.5 1.5M5.5 15.5l1.5-1.5M17 4l1.5-1.5" />
  </svg>
)

export const PerformanceIcon = () => (
  <svg {...baseProps}>
    <path d="M3 20h18" />
    <rect x="5" y="14" width="3" height="6" />
    <rect x="10.5" y="9" width="3" height="11" />
    <rect x="16" y="4" width="3" height="16" />
  </svg>
)

export const LDIcon = () => (
  <svg {...baseProps}>
    <path d="M2 9l10-5 10 5-10 5L2 9z" />
    <path d="M6 11v5c2 2 10 2 12 0v-5" />
    <path d="M22 9v6" />
  </svg>
)

export const EmployeeRelationsIcon = () => (
  <svg {...baseProps}>
    <circle cx="7" cy="8" r="2.5" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M2 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />
    <path d="M12 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />
  </svg>
)

export const ComplianceIcon = () => (
  <svg {...baseProps}>
    <path d="M12 2L4 5v7c0 4.5 3.5 8 8 10 4.5-2 8-5.5 8-10V5l-8-3z" />
    <path d="M9 12l2 2 4-5" />
  </svg>
)

export const OffboardingIcon = () => (
  <svg {...baseProps}>
    <path d="M9 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M9 21h12" />
    <circle cx="16" cy="13" r="0.8" fill="currentColor" />
    <path d="M3 12h8m-3-3l3 3-3 3" />
  </svg>
)

export const ReportsIcon = () => (
  <svg {...baseProps}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 17v-3M12 17v-6M16 17v-4" />
  </svg>
)

export const CultureIcon = () => (
  <svg {...baseProps}>
    <path d="M12 21s-7-4.5-7-11c0-2.5 2-4.5 4.5-4.5 1.5 0 2.7.7 3.5 1.8.8-1.1 2-1.8 3.5-1.8 2.5 0 4.5 2 4.5 4.5 0 6.5-9 11-9 11z" />
  </svg>
)

export const HROpsIcon = () => (
  <svg {...baseProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
  </svg>
)

export const ChangeMgmtIcon = () => (
  <svg {...baseProps}>
    <circle cx="12" cy="4" r="2" />
    <circle cx="5" cy="13" r="2" />
    <circle cx="19" cy="13" r="2" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="15" cy="20" r="1.5" />
    <path d="M12 6v3M12 9l-6 2.5M12 9l6 2.5M5 14.5v.5l3.5 3.5M19 14.5v.5l-3.5 3.5" />
  </svg>
)
