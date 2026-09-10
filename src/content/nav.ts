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
 * The Product menu, 14 links in three groups:
 *  - "By function": the seven functions, one card each.
 *  - "How it works": the agent, the desk, the record, the documents.
 *  - "For": the three buyer-category pages.
 * Every href resolves to a real page.
 */
export const byFunction: NavItem[] = [
  // Descriptions are ONE line in the mega menu, keep them short so they never wrap.
  { label: 'Hiring',              href: '/hiring',       description: 'Job post to signed offer',         live: true, icon: 'hiring' },
  { label: 'Onboarding',          href: '/onboarding',   description: 'Ready before they arrive',    live: true, icon: 'onboarding' },
  { label: 'Payroll',             href: '/payroll',      description: 'Every change in before payday', live: true, icon: 'payroll', pill: 'Powered by Deel' },
  { label: 'Time off & leave',    href: '/leave',        description: 'Vacation to family leave, in seconds',     live: true, icon: 'timeoff' },
  { label: 'Compensation',        href: '/compensation', description: 'Raises priced to your pay ranges', live: true, icon: 'comp' },
  { label: 'Compliance',          href: '/compliance',   description: 'Every answer cites the law',  live: true, icon: 'compliance' },
  { label: 'Headcount & layoffs', href: '/rif',          description: 'Notices, severance, final pay',   live: true, icon: 'rif' },
]

export const howItWorks: NavItem[] = [
  { label: 'How MambaHR works',  href: '/mamba',     description: 'Ask in Slack or the app, it does the work', live: true, icon: 'agent' },
  { label: 'To do',              href: '/today',     description: 'Only the calls that need you',     live: true, icon: 'today' },
  { label: 'Employee records',   href: '/people',    description: 'Every record and the org chart, always current',            live: true, icon: 'people' },
  { label: 'Documents & e-sign', href: '/documents', description: 'Drafted, signed, and filed',        live: true, icon: 'documents' },
]

export const forWhom: NavItem[] = [
  { label: 'For startups',       href: '/best-hris-for-startups',   description: '', live: true },
  { label: 'For small business', href: '/hr-software-small-business', description: '', live: true },
  { label: 'AI HR software',     href: '/ai-hr-software',           description: '', live: true },
]

export const companyItems: NavItem[] = [
  { label: 'About',    href: '/about',                 description: 'The team and the mission', live: true },
  { label: 'Security', href: '/security',              description: 'How we protect your data', live: true },
  { label: 'Contact',  href: 'mailto:hello@mambahr.com', description: 'Talk to the founders', live: true },
]
