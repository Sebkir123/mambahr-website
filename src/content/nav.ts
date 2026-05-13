export type NavItem = {
  label: string
  href: string
  description: string
  live: boolean
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const productSections: NavSection[] = [
  {
    title: 'Daily',
    items: [
      {
        label: 'Today',
        href: '/today',
        description: 'Your sign-off queue — 30 min, every morning',
        live: true,
      },
      {
        label: 'Mamba',
        href: '/mamba',
        description: 'The agent in Slack, Teams, and email',
        live: true,
      },
    ],
  },
  {
    title: 'People',
    items: [
      {
        label: 'People',
        href: '/people',
        description: 'Directory, comp, performance, leave',
        live: true,
      },
      {
        label: 'Performance',
        href: '/coming-soon/performance',
        description: 'Reviews, PIPs, calibration',
        live: false,
      },
      {
        label: 'Time Off',
        href: '/coming-soon/time-off',
        description: 'PTO, FMLA, parental, disability',
        live: false,
      },
    ],
  },
  {
    title: 'Workflows',
    items: [
      {
        label: 'Hiring',
        href: '/hiring',
        description: 'Reqs to offer — without the loop',
        live: true,
      },
      {
        label: 'Payroll',
        href: '/coming-soon/payroll',
        description: 'Multi-state, 1099, equity',
        live: false,
      },
      {
        label: 'Onboarding',
        href: '/coming-soon/onboarding',
        description: 'Day-one ready, before day one',
        live: false,
      },
    ],
  },
  {
    title: 'Foundation',
    items: [
      {
        label: 'Vault',
        href: '/coming-soon/vault',
        description: 'Docs, e-sign, audit-ready',
        live: false,
      },
      {
        label: 'Workspaces',
        href: '/coming-soon/workspaces',
        description: 'Multi-entity, international',
        live: false,
      },
      {
        label: 'Settings',
        href: '/coming-soon/settings',
        description: 'RBAC, integrations, sign-off policy',
        live: false,
      },
    ],
  },
]

export const platformItems: NavItem[] = [
  {
    label: 'Channels',
    href: '/coming-soon/channels',
    description: 'Slack, Teams, Web app',
    live: false,
  },
  {
    label: 'Integrations',
    href: '/coming-soon/integrations',
    description: 'Gusto, Workday, Okta, Carta…',
    live: false,
  },
  {
    label: 'Human sign-off',
    href: '/coming-soon/hil',
    description: 'Decision Cards and sign-off policy',
    live: false,
  },
  {
    label: 'Security & Trust',
    href: '/security',
    description: 'Encryption, audit log, RBAC',
    live: true,
  },
  {
    label: 'Compliance Engine',
    href: '/coming-soon/compliance-engine',
    description: 'Federal + 50 state employment law',
    live: false,
  },
]

export const companyItems: NavItem[] = [
  { label: 'About', href: '/about', description: 'The team and the mission', live: true },
  { label: 'Customers', href: '/coming-soon/customers', description: 'How teams use MambaHR', live: false },
  { label: 'Changelog', href: '/coming-soon/changelog', description: "What's shipped", live: false },
  { label: 'Careers', href: '/coming-soon/careers', description: 'Join the team', live: false },
]

export const comingSoonContent: Record<string, { title: string; body: string }> = {
  performance: {
    title: 'Performance & Growth',
    body: 'Review cycles, continuous feedback, PIPs, calibration sessions, and promotion recommendations — all drafted and tracked by the Performance agent. You set the policy; the agent does the work.',
  },
  'time-off': {
    title: 'Time Off & Leave',
    body: 'Policy-aware PTO approvals in seconds. FMLA eligibility, intermittent leave tracking, state PFML stacking, bereavement, USERRA, and ADA accommodations — the Leave agent handles every case.',
  },
  payroll: {
    title: 'Payroll',
    body: 'Multi-state payroll, contractor 1099s, equity treatment, and edge cases. The agent runs the numbers, surfaces exceptions, and sends the run for your approval before anything moves.',
  },
  onboarding: {
    title: 'Onboarding',
    body: 'From signed offer to day-one ready — I-9, W-4, equipment provisioned, access granted, buddy assigned, training scheduled, announcement drafted. Automated, with you in the loop for the budget calls.',
  },
  vault: {
    title: 'Vault',
    body: 'Every HR document — offer letters, separation agreements, handbook acknowledgments, compliance filings — generated, sent for e-signature, filed, and retained per your policy.',
  },
  workspaces: {
    title: 'Workspaces',
    body: 'One agent across multiple legal entities. Sister companies, international entities, M&A integrations — each workspace gets its own RBAC, audit log, and sign-off policy.',
  },
  settings: {
    title: 'Settings',
    body: 'RBAC roles, integration credentials, sign-off policy, audit log configuration, and the compliance engine rules. The control room for your AI HR department.',
  },
  channels: {
    title: 'Channels',
    body: 'MambaHR meets your team where they already work. Slack mentions, Teams adaptive cards, email threads, or the web app — same agent, every surface, every action fully audited.',
  },
  integrations: {
    title: 'Integrations',
    body: 'Connect your existing stack. Gusto, Workday, Rippling, BambooHR, Okta, Carta, DocuSign, Greenhouse, Lever, Lattice — the agent works inside your tools, not instead of them.',
  },
  hil: {
    title: 'Human sign-off',
    body: 'Every high-stakes action is gated. The agent surfaces a Decision Card — rationale, evidence, who decides — and you approve or decline. Terminations are always you. Always.',
  },
  'compliance-engine': {
    title: 'Compliance Engine',
    body: 'A curated employment-law dataset covering federal regulations and all 50 state codes. Every compliance call from MambaHR cites its regulatory source. Edge cases — FMLA + state PFML stacking, multi-state pay transparency, exempt classification — route to human review by default.',
  },
  customers: {
    title: 'Customers',
    body: "How HR teams are running their entire department on MambaHR. Customer stories coming soon — for now, talk to the founders for references.",
  },
  changelog: {
    title: 'Changelog',
    body: "We ship constantly. A public changelog is coming — for now, customers get weekly product updates directly.",
  },
  careers: {
    title: 'Careers',
    body: "We're a small team building something ambitious. If you want to work on the AI HR department, reach out.",
  },
}
