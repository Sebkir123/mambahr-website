// ── Guides, state pages and the company-size page: shared content types ─────
//
// Every answer page on /guides, /hr-by-state and /guides/hr-laws-by-company-size
// is rendered from typed records in this folder, so a rule that changes is a
// one-line data edit, not a component edit.
//
// House rules for everything typed into these records (enforced by review):
// - Every legal fact comes from an official source that was actually opened,
//   and that source is listed in `sources`. If a detail could not be confirmed,
//   it is left out rather than guessed.
// - The first one or two sentences (`answer`) answer the question directly.
//   That is the sentence answer engines quote, so it must stand on its own.
// - Plain, supportive English. No em dashes, no emojis, no copy about MambaHR
//   the company, no invented customers or numbers, no promise about where data
//   is stored. The payroll partner credit is exactly "Powered by Deel".
//
// Inline markup: any string rendered as body text may contain **bold** and markdown-style
// links, `[label](/guides/some-slug)` or `[label](https://www.dol.gov/...)`.
// Internal links start with "/". External links open in a new tab.

/** The date every page shows as "Last reviewed". Bump it after a full re-check. */
export const LAST_REVIEWED = '2026-10-02'

export type Source = {
  /** Short name of the page, e.g. "DOL: Fact Sheet #28, The FMLA". */
  label: string
  /** Official URL that was opened while writing (prefer .gov). */
  url: string
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }

export type Section = {
  heading: string
  blocks: Block[]
}

export type Faq = { q: string; a: string }

export type GuideCategory = 'Hiring' | 'Onboarding' | 'Pay' | 'Leave' | 'Offboarding' | 'Compliance'

export type Guide = {
  slug: string
  category: GuideCategory
  /** The h1. Phrased the way the buyer asks it, e.g. "How to onboard your first employee". */
  title: string
  /** <title>. 45 to 65 characters, ends with " | MambaHR". */
  metaTitle: string
  /** 120 to 160 characters. Leads with the answer. */
  metaDescription: string
  /** One or two sentences that answer the question directly. */
  answer: string
  sections: Section[]
  /** Optional visible FAQ. When present, the page also emits FAQPage JSON-LD. */
  faq?: Faq[]
  /** One short paragraph on how MambaHR handles this. Plain, not pushy. */
  mambahr: string
  sources: Source[]
  /** Internal paths to related guides and state pages, e.g. "/guides/cobra". */
  related: string[]
}

/** The at-a-glance table at the top of every state page. Same rows on every
 *  state, so the hub can compare states side by side. Each value is one or two
 *  short sentences. */
export type StateKeyFacts = {
  payTransparency: string
  newHireReporting: string
  paidSickLeave: string
  familyLeave: string
  finalPayFired: string
  finalPayQuit: string
  vacationPayout: string
}

export type StateGuide = {
  slug: string
  name: string
  abbr: string
  /** <title>. 45 to 65 characters, ends with " | MambaHR". */
  metaTitle: string
  metaDescription: string
  /** One or two sentences: the most important things that differ from federal law. */
  answer: string
  keyFacts: StateKeyFacts
  /** Usually: Hiring, Leave, Final pay, Other things to know. */
  sections: Section[]
  faq?: Faq[]
  mambahr: string
  sources: Source[]
  related: string[]
}

export type ThresholdRow = {
  /** Display label for the headcount, e.g. "15", "20", "50", "100". */
  employees: string
  /** Numeric sort key, e.g. 15. */
  sortKey: number
  /** Law name in plain words plus the short name, e.g. "Title VII (discrimination)". */
  law: string
  /** What starts to apply at this size. */
  whatChanges: string
  /** How the headcount is counted for this law, short. */
  howCounted: string
  source: Source
}

export type StateThresholdRow = {
  state: string
  employees: string
  law: string
  whatChanges: string
  source: Source
}

export const STATE_KEY_FACT_LABELS: Record<keyof StateKeyFacts, string> = {
  payTransparency: 'Pay range in job posts',
  newHireReporting: 'New-hire reporting',
  paidSickLeave: 'Paid sick leave',
  familyLeave: 'Paid family and medical leave',
  finalPayFired: 'Final pay when you end employment',
  finalPayQuit: 'Final pay when they quit',
  vacationPayout: 'Unused vacation at exit',
}

/** The company-size page (/guides/hr-laws-by-company-size). */
export type ThresholdsPage = {
  title: string
  metaTitle: string
  metaDescription: string
  answer: string
  /** Federal table, sorted by sortKey when rendered. */
  federal: ThresholdRow[]
  /** State thresholds that differ from federal, for the ten states covered on /hr-by-state. */
  state: StateThresholdRow[]
  /** Short notes rendered under the tables, e.g. how employees are counted. */
  sections: Section[]
  faq?: Faq[]
  mambahr: string
  sources: Source[]
  related: string[]
}
