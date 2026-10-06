/**
 * The early access list: options shown on /early-access and accepted by
 * /api/waitlist. The slugs are also CHECK constraints on public.waitlist
 * (supabase/migrations/20261006000000_waitlist_early_access.sql); change both
 * together.
 */

export type Option = { value: string; label: string }

// The pricing page's plan bands (src/app/pricing/tiers.ts).
export const TEAM_SIZES: Option[] = [
  { value: 'under_75', label: 'Up to 75' },
  { value: '75_149', label: '75 to 150' },
  { value: '150_399', label: '150 to 400' },
  { value: '400_plus', label: '400+' },
]

// Where the records come from today: the systems MambaHR imports from.
export const HR_SYSTEMS: Option[] = [
  { value: 'gusto', label: 'Gusto' },
  { value: 'bamboohr', label: 'BambooHR' },
  { value: 'rippling', label: 'Rippling' },
  { value: 'adp', label: 'ADP' },
  { value: 'workday', label: 'Workday' },
  { value: 'namely', label: 'Namely' },
  { value: 'spreadsheets', label: 'Spreadsheets' },
  { value: 'other', label: 'Something else' },
]

export const HANDOFFS: Option[] = [
  { value: 'hiring', label: 'Hiring' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'time_off', label: 'Time off and leave' },
  { value: 'payroll_changes', label: 'Payroll changes' },
  { value: 'compliance', label: 'Compliance' },
]

export function labelFor(options: Option[], value: string | null | undefined): string | null {
  if (!value) return null
  return options.find((o) => o.value === value)?.label ?? null
}
