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

// ── Rewards. Stated once so the pages, the pass and the emails agree. ──

// Referral (founder decision 2026-10-06): credit on the referrer's own bill,
// earned when the referred company pays its first invoice.
export const REFERRAL_REWARD = 'One free month on your plan for every company that joins with your link and becomes a customer.'
export const REFERRAL_GIFT = 'They skip the queue and get founding customer pricing.'

// Partner program (founder chose "full program now" 2026-10-06; the share is
// the proposed figure shown on the preview for sign-off).
export const PARTNER_SHARE = '20%'

export const PARTNER_TYPES: Option[] = [
  { value: 'accountant', label: 'Accountant or bookkeeper' },
  { value: 'fractional_cfo', label: 'Fractional CFO' },
  { value: 'fractional_hr', label: 'Fractional HR or People lead' },
  { value: 'vc_platform', label: 'VC or accelerator platform team' },
  { value: 'other', label: 'Something else' },
]

export const COMPANIES_ADVISED: Option[] = [
  { value: '1_5', label: '1 to 5' },
  { value: '6_20', label: '6 to 20' },
  { value: '21_50', label: '21 to 50' },
  { value: '50_plus', label: '50+' },
]

// Personal inboxes say nothing about the company.
const FREE_MAIL = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com',
  'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'msn.com', 'hey.com', 'fastmail.com',
])

/** "jane@northwind-trading.com" → "Northwind Trading"; null for personal inboxes. */
export function companyFromEmail(email: string): string | null {
  const domain = email.split('@')[1]?.trim().toLowerCase()
  if (!domain || !domain.includes('.') || FREE_MAIL.has(domain)) return null
  const labels = domain.split('.')
  // Drop the TLD, and a second-level suffix like the "co" in acme.co.uk.
  const n = labels.length
  const secondLevel = n > 2 && labels[n - 1].length === 2 && ['co', 'com', 'org', 'net', 'ac'].includes(labels[n - 2])
  const core = secondLevel ? labels[n - 3] : labels[n - 2]
  if (!core) return null
  return core.split(/[-_]/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
}

/** True when two addresses belong to the same company (personal inboxes never do). */
export function sameCompany(a: string, b: string): boolean {
  const da = emailDomain(a)
  return Boolean(da && !FREE_MAIL.has(da) && da === emailDomain(b))
}

export function emailDomain(email: string): string | null {
  const d = email.split('@')[1]?.trim().toLowerCase()
  return d && d.includes('.') ? d : null
}

/**
 * A decorative barcode drawn from a pass code: the same code always draws the
 * same bars, on the page and in the email. Each entry is a bar width and the
 * gap after it, in units.
 */
export function barcodeBars(seed: string): { w: number; gap: number }[] {
  const bars = [{ w: 2, gap: 1 }, { w: 1, gap: 1 }]
  for (const ch of seed.toLowerCase()) {
    const v = parseInt(ch, 36) || 0
    bars.push({ w: 1 + (v % 3), gap: 1 + ((v >> 2) % 2) })
    bars.push({ w: 1 + ((v >> 1) % 2), gap: 1 + (v % 2) })
  }
  bars.push({ w: 1, gap: 1 }, { w: 2, gap: 0 })
  return bars
}
