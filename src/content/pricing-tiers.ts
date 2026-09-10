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
  /** One checklist per card, six items at most. */
  feats: string[]
  cta: string
  popular?: boolean
  badge?: string
}

export const TIERS: PricingTier[] = [
  {
    name: 'HR Starter',
    size: 'Up to 75 employees',
    price: '$14',
    unit: '/employee/mo',
    min: '$9k/yr minimum · billed annually',
    blurb: 'HR structure before your first HR hire.',
    feats: ['Employee records & org chart', 'Onboarding & offboarding, done', 'Every employee question, answered', 'Time off & leave handled', 'Payroll change files, ready to load', 'The HR admin backlog, cleared'],
    cta: 'Hire MambaHR',
  },
  {
    name: 'HR Ops Manager',
    size: '75 to 150 employees',
    price: '$22',
    unit: '/employee/mo',
    min: '$24k/yr minimum · billed annually',
    blurb: 'A full HR ops workload, for a tenth of the cost.',
    feats: ['Everything in Starter', 'Hiring: reqs, candidates & offers', 'Candidates screened and ranked', 'Offers sent, approvals routed', 'Payroll change files & change reports'],
    cta: 'Take ops off your plate',
    popular: true,
    badge: 'Where most teams start',
  },
  {
    name: 'AI HR Department',
    size: '150 to 400 employees',
    price: '$30',
    unit: '/employee/mo',
    min: '$48k/yr minimum · billed annually',
    blurb: 'The whole admin load, run for you.',
    feats: ['Everything in Ops Manager', 'Compensation cycles, run for you', 'Compliance research with the citation', 'RIF & change planning, done right', 'Full audit trail', 'SSO, your own approval rules & security review'],
    cta: 'Build your department',
  },
  {
    name: 'Enterprise',
    size: '400+ employees or multi-entity',
    price: 'Custom',
    unit: '',
    min: 'from $100k/yr',
    blurb: 'For complex orgs with procurement to satisfy.',
    feats: ['Everything in AI HR Dept', 'High-volume HR ops queues', 'Custom implementation & approval chains', 'Procurement & security review', 'Audit prep, done', 'Enterprise integrations & success support'],
    cta: 'Talk to founders',
  },
]
