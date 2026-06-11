export type NavItem = {
  label: string
  href: string
  description: string
  live: boolean
  /** Key into the icon map in MegaNav (icons are JSX, so they live in the component). */
  icon?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

/**
 * Buyer-vocabulary product menu. Two columns:
 *  - "By function": the category terms HR buyers procure against.
 *  - "How it works": the surfaces, translated out of internal nouns.
 * Every href resolves to a real page or an in-page anchor we create.
 */
export const byFunction: NavItem[] = [
  { label: 'Hiring & ATS',             href: '/hiring',       description: 'Reqs, screening, offers, onboarding',  live: true, icon: 'hiring' },
  { label: 'Onboarding & offboarding', href: '/onboarding',   description: 'Day-one accounts to clean exits',      live: true, icon: 'onboarding' },
  { label: 'Time off & leave',         href: '/leave',        description: 'PTO, FMLA, state paid-leave',          live: true, icon: 'timeoff' },
  { label: 'Performance',              href: '/performance',  description: 'Reviews, calibration, PIPs',           live: true, icon: 'performance' },
  { label: 'Compensation',             href: '/compensation', description: 'Bands, pay equity, raises',            live: true, icon: 'comp' },
  { label: 'Compliance',               href: '/compliance',   description: 'Federal + 50-state, every cite',       live: true, icon: 'compliance' },
  { label: 'Headcount & RIF',          href: '/rif',          description: 'Planning, severance, WARN notices',    live: true, icon: 'rif' },
  { label: 'Payroll-ready exports',    href: '/payroll',      description: 'Change files in your provider format', live: true, icon: 'payroll' },
]

export const howItWorks: NavItem[] = [
  { label: 'The AI agent',        href: '/mamba',      description: 'Works in Slack, Teams, and the web', live: true, icon: 'agent' },
  { label: 'Approvals',           href: '/today',      description: 'Your daily sign-off queue',          live: true, icon: 'today' },
  { label: 'Employee records',    href: '/people',     description: 'HRIS, org chart, comp, leave',       live: true, icon: 'people' },
  { label: 'Documents & e-sign',  href: '/documents',  description: 'Generate, sign, file, retain',       live: true, icon: 'documents' },
  { label: 'Security',            href: '/security',   description: 'Encryption, access controls, audit trail', live: true, icon: 'security' },
]

export const companyItems: NavItem[] = [
  { label: 'About',    href: '/about',                 description: 'The team and the mission', live: true },
  { label: 'Security', href: '/security',              description: 'How we protect your data', live: true },
  { label: 'Contact',  href: 'mailto:founders@mambahr.com', description: 'Talk to the founders', live: true },
]

export const comingSoonContent: Record<string, { title: string; body: string }> = {
  performance: {
    title: 'Performance & Growth',
    body: 'Review cycles, continuous feedback, PIPs, calibration sessions, and promotion recommendations — all drafted and tracked by the Performance agent. You set the policy; the agent does the work.',
  },
  'time-off': {
    title: 'Time Off & Leave',
    body: 'Policy-aware PTO approvals in seconds. FMLA eligibility, intermittent leave tracking, state paid-leave stacking, bereavement, USERRA, and ADA accommodations — the Leave agent handles every case.',
  },
  payroll: {
    title: 'Payroll-ready exports',
    body: 'MambaHR generates the per-cycle change file in your provider’s format — new hires, terminations, comp changes, leave — ready to upload to ADP, Workday, Gusto, or Rippling. No rip-and-replace.',
  },
  onboarding: {
    title: 'Onboarding',
    body: 'From signed offer to day-one ready — I-9 and E-Verify, accounts provisioned, device set up, buddy assigned, first-week calendar invites. Automated, with you in the loop for the budget calls.',
  },
  vault: {
    title: 'Document management & e-sign',
    body: 'Every HR document — offer letters, separation agreements, handbook acknowledgments, compliance filings — generated, sent for e-signature, filed, and retained per your policy.',
  },
  workspaces: {
    title: 'Workforce planning',
    body: 'One agent across multiple legal entities. Headcount planning, org design, RIF modeling with severance math and WARN notices — each entity with its own access rules, audit trail, and sign-off policy.',
  },
  settings: {
    title: 'Settings',
    body: 'Roles and access, integration credentials, sign-off policy, audit-trail configuration, and the compliance rules. The control room for your AI HR department.',
  },
  channels: {
    title: 'Slack, Teams & email',
    body: 'MambaHR meets your team where they already work. Slack mentions, Teams cards, email threads, or the web app — same agent, every surface, every action recorded.',
  },
  integrations: {
    title: 'Integrations',
    body: 'Connect the systems you already use. Gusto, Workday, Rippling, BambooHR, Okta, Microsoft Entra, Google Workspace, Carta, DocuSign, Greenhouse, Lever — the agent works inside your tools, not instead of them.',
  },
  hil: {
    title: 'Human sign-off',
    body: 'Every high-stakes action is gated. The agent surfaces a decision card — rationale, evidence, who decides — and you approve or decline. Terminations are always you. Always.',
  },
  'compliance-engine': {
    title: 'Compliance',
    body: 'Federal employment law plus all 50 states, kept current: a federal baseline everywhere and state-specific rules where states differ. Every compliance call cites its source; edge cases route to a human.',
  },
  customers: {
    title: 'Customers',
    body: 'How HR teams are running their entire department on MambaHR. Customer stories coming soon — for now, talk to the founders for references.',
  },
  changelog: {
    title: 'Changelog',
    body: 'We ship constantly. A public changelog is coming — for now, customers get weekly product updates directly.',
  },
  careers: {
    title: 'Careers',
    body: "We're a small team building something ambitious. If you want to work on the AI HR department, reach out.",
  },
}
