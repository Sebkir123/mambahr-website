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
    blurb: 'Your HR basics, set up and kept up to date.',
    feats: ['Employee records & org chart', 'Onboarding & offboarding, done', 'Every employee question, answered', 'Time off & leave handled', 'Payroll change files, ready to load', 'The HR admin backlog, cleared'],
    cta: 'Choose Starter',
  },
  {
    name: 'HR Ops Manager',
    size: '75 to 150 employees',
    price: '$22',
    unit: '/employee/mo',
    min: '$24k/yr minimum · billed annually',
    blurb: 'For teams hiring and onboarding every month.',
    feats: ['Everything in Starter', 'Hiring: job posts, candidates & offers', 'Interviews scheduled', 'Offers sent, approvals routed', 'Payroll change files & change reports'],
    cta: 'Choose Ops Manager',
    popular: true,
    badge: 'Recommended',
  },
  {
    name: 'Whole department',
    size: '150 to 400 employees',
    price: '$30',
    unit: '/employee/mo',
    min: '$48k/yr minimum · billed annually',
    blurb: 'For larger teams with pay reviews and compliance work.',
    feats: ['Everything in Ops Manager', 'Pay reviews, prepared for you', 'Compliance answers with the law cited', 'Layoff planning with legal checks', 'Full audit trail', 'Single sign-on, your own approval rules & security review'],
    cta: 'Choose the whole department',
  },
  {
    name: 'Enterprise',
    size: '400+ employees or multi-entity',
    price: 'Custom',
    unit: '',
    min: 'from $100k/yr',
    blurb: 'For large or multi-company organizations.',
    feats: ['Everything in Whole department', 'High-volume HR requests', 'Custom implementation & approval chains', 'Procurement & security review', 'Audit prep, done', 'Custom integrations and a named contact'],
    cta: 'Talk to us',
  },
]
