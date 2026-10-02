// One index over every guide, state page and the company-size page, so the
// routes, the hubs, the sitemap and llms.txt all read the same records.

import type { Guide, GuideCategory, StateGuide } from './types'
import { hiringGuides } from './hiring'
import { onboardingGuides } from './onboarding'
import { payGuides } from './pay'
import { leaveGuides } from './leave'
import { firingGuides } from './firing'
import { offboardingGuides } from './offboarding'
import { complianceGuides } from './compliance'
import { thresholdsPage } from './thresholds'
import { statesGroupA } from '../states/group-a'
import { statesGroupB } from '../states/group-b'
import { statesGroupC } from '../states/group-c'
import { statesGroupD } from '../states/group-d'

export { thresholdsPage }

export const SITE = 'https://www.mambahr.com'
export const THRESHOLDS_SLUG = 'hr-laws-by-company-size'

/** Hub order. Each category is one block on /guides. */
export const GUIDE_CATEGORIES: { name: GuideCategory; blurb: string }[] = [
  { name: 'Hiring', blurb: 'Before the offer: classifying the role, the job post, background checks, hiring in a new state.' },
  { name: 'Onboarding', blurb: 'The paperwork every new hire needs, and when each piece is due.' },
  { name: 'Pay', blurb: 'Payroll, overtime, exempt status and what is owed when someone leaves.' },
  { name: 'Leave', blurb: 'Family and medical leave, sick leave and parental leave, federal and state.' },
  { name: 'Offboarding', blurb: 'Ending employment fairly and legally: final pay, notices, COBRA and severance.' },
  { name: 'Compliance', blurb: 'Insurance, records and the rules that change with company size.' },
]

export const allGuides: Guide[] = [
  ...hiringGuides,
  ...onboardingGuides,
  ...payGuides,
  ...leaveGuides,
  ...firingGuides,
  ...offboardingGuides,
  ...complianceGuides,
]

export const guidesBySlug: Record<string, Guide> = Object.fromEntries(allGuides.map((g) => [g.slug, g]))

export const allStates: StateGuide[] = [...statesGroupA, ...statesGroupB, ...statesGroupC, ...statesGroupD].sort((a, b) =>
  a.name.localeCompare(b.name),
)

export const statesBySlug: Record<string, StateGuide> = Object.fromEntries(allStates.map((s) => [s.slug, s]))

const STATIC_LABELS: Record<string, string> = {
  '/guides': 'All HR guides',
  '/hr-by-state': 'HR laws by state',
  [`/guides/${THRESHOLDS_SLUG}`]: 'HR laws by company size',
  '/onboarding': 'How MambaHR handles onboarding',
  '/leave': 'How MambaHR handles time off and leave',
  '/payroll': 'How MambaHR prepares payroll changes',
  '/hiring': 'How MambaHR handles hiring',
  '/compliance': 'How MambaHR answers compliance questions',
  '/rif': 'How MambaHR plans layoffs',
  '/people': 'Employee records in MambaHR',
  '/pricing': 'MambaHR pricing',
  '/demo': 'Book a demo',
}

/** Human label for an internal path, used for related links. */
export function linkLabel(path: string): string {
  if (STATIC_LABELS[path]) return STATIC_LABELS[path]
  const g = path.startsWith('/guides/') ? guidesBySlug[path.slice('/guides/'.length)] : undefined
  if (g) return g.title
  const s = path.startsWith('/hr-by-state/') ? statesBySlug[path.slice('/hr-by-state/'.length)] : undefined
  if (s) return `HR laws in ${s.name}`
  return path
}

/** Every internal path these pages may link to. Used to check links resolve. */
export function knownPaths(): Set<string> {
  return new Set([
    ...Object.keys(STATIC_LABELS),
    ...allGuides.map((g) => `/guides/${g.slug}`),
    ...allStates.map((s) => `/hr-by-state/${s.slug}`),
  ])
}

/** The guide categories with their guides, in hub order. */
export function guidesByCategory(): { name: GuideCategory; blurb: string; guides: Guide[] }[] {
  return GUIDE_CATEGORIES.map((c) => ({ ...c, guides: allGuides.filter((g) => g.category === c.name) }))
}
