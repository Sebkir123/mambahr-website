export type NavItem = {
  label: string
  href: string
  description: string
  live: boolean
  /** Key into the icon map in MegaNav (icons are JSX, so they live in the component). */
  icon?: string
  /** Optional partner credit shown as a small pill beside the label. */
  pill?: string
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
  // Descriptions are ONE line in the mega menu, keep ≤ 28 chars so they never wrap.
  { label: 'Hiring & ATS',          href: '/hiring',       description: 'Req to signed offer, fast',   live: true, icon: 'hiring' },
  { label: 'Onboarding',            href: '/onboarding',   description: 'Ready before they arrive',    live: true, icon: 'onboarding' },
  { label: 'Payroll changes',       href: '/payroll',      description: 'Every change in before payday', live: true, icon: 'payroll', pill: 'Deel managed payroll' },
  { label: 'Time off & leave',      href: '/leave',        description: 'PTO to FMLA, in seconds',     live: true, icon: 'timeoff' },
  { label: 'Compensation',          href: '/compensation', description: 'Raises priced to your bands', live: true, icon: 'comp' },
  { label: 'Compliance',            href: '/compliance',   description: 'Every answer cites the law',  live: true, icon: 'compliance' },
  { label: 'Headcount & RIF',       href: '/rif',          description: 'The hard days, done right',   live: true, icon: 'rif' },
]

/**
 * The procurement-checklist keywords buyers scan for. Rendered as small
 * tag-chips in the dropdown, exact search phrases, each pointing at the
 * closest existing page. Keyword coverage without new pages.
 */
export const alsoHandled: { label: string; href: string }[] = [
  { label: 'Careers page', href: '/job-portal' },
  { label: 'Job board', href: '/job-portal' },
  { label: 'Org chart', href: '/people' },
  { label: 'PTO tracking', href: '/leave' },
  { label: 'Offer letters', href: '/hiring' },
  { label: 'E-signatures', href: '/documents' },
  { label: 'Form I-9 collection', href: '/onboarding' },
  { label: 'Pay equity', href: '/compensation' },
  { label: 'EEO self-identification', href: '/compliance' },
  { label: 'Severance & COBRA', href: '/rif' },
  { label: 'Employee database', href: '/people' },
  { label: 'Audit trail', href: '/security' },
]

export const howItWorks: NavItem[] = [
  { label: 'The AI agent',        href: '/mamba',      description: 'Works in Slack and the web', live: true, icon: 'agent' },
  { label: 'Job portal',          href: '/job-portal', description: 'Your careers page, hosted',          live: true, icon: 'hiring' },
  { label: 'Approvals',           href: '/today',      description: 'Your day in three taps',             live: true, icon: 'today' },
  { label: 'Employee records',    href: '/people',     description: 'HRIS, org chart, always current',   live: true, icon: 'people' },
  { label: 'Documents & e-sign',  href: '/documents',  description: 'Generated, signed, filed',           live: true, icon: 'documents' },
  { label: 'Security',            href: '/security',   description: 'Encrypted, logged, US-resident',     live: true, icon: 'security' },
]

export const companyItems: NavItem[] = [
  { label: 'About',    href: '/about',                 description: 'The team and the mission', live: true },
  { label: 'Security', href: '/security',              description: 'How we protect your data', live: true },
  { label: 'Contact',  href: 'mailto:hello@mambahr.com', description: 'Talk to the founders', live: true },
]
