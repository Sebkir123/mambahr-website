/**
 * The published plans. One source for the home page pricing section and
 * /pricing so the two can never drift; /pricing/layout.tsx reads the same
 * numbers into its Product JSON-LD.
 */
export type PricingTier = {
  name: string
  size: string
  price: string
  unit: string
  /** Annual minimum, shown under the price. */
  min: string
  blurb: string
  /** What the plan takes off the buyer's plate. Shown on /pricing only. */
  replaces: string[]
  feats: string[]
  cta: string
  popular?: boolean
  badge?: string
}

export const TIERS: PricingTier[] = [
  {
    name: 'HR Starter',
    size: 'For teams of 50–150',
    price: '$14',
    unit: '/employee/mo',
    min: '$9k/yr minimum · billed annually',
    blurb: 'HR structure before your first HR hire.',
    replaces: ['The HR admin backlog', 'Records & org-chart cleanup', 'Payroll-change spreadsheets'],
    feats: ['Employee records & org chart', 'Onboarding & offboarding, done', 'Every employee question, answered', 'Time off & leave handled', 'Payroll change files, ready to load'],
    cta: 'Hire MambaHR',
  },
  {
    name: 'HR Ops Manager',
    size: 'For teams of 75–400',
    price: '$22',
    unit: '/employee/mo',
    min: '$24k/yr minimum · billed annually',
    blurb: 'A full HR ops workload, for a tenth of the cost.',
    replaces: ['Onboarding & offboarding runs', 'Offer and approval chasing', 'Candidate screening and ranking'],
    feats: ['Everything in Starter', 'Hiring: reqs, candidates & offers', 'Offers sent, approvals routed', 'Payroll change files & change reports'],
    cta: 'Take ops off your plate',
    popular: true,
    badge: 'Where most teams start',
  },
  {
    name: 'AI HR Department',
    size: 'For teams of 150+',
    price: '$30',
    unit: '/employee/mo',
    min: '$48k/yr minimum · billed annually',
    blurb: 'The whole admin load, run for you.',
    replaces: ['Compensation cycle machinery', 'Compliance research & citations', 'Workforce change planning'],
    feats: ['Everything in Ops Manager', 'RIF & change planning, done right', 'Deep compliance + full audit trail', 'SSO, your own approval rules & security review'],
    cta: 'Build your department',
  },
  {
    name: 'Enterprise',
    size: 'For 1,000+ and multi-entity',
    price: 'Custom',
    unit: '',
    min: 'from $100k/yr',
    blurb: 'For complex orgs with procurement to satisfy.',
    replaces: ['High-volume HR ops queues', 'Custom approval chains', 'Manual audit prep'],
    feats: ['Everything in AI HR Dept', 'Custom implementation & approval logic', 'Procurement & security review', 'Enterprise integrations & success support'],
    cta: 'Talk to founders',
  },
]
