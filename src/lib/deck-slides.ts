// Canonical slide list for the investor deck. Single source of truth shared by
// the deck itself (deck-client), the admin funnel labels, and the analytics
// rollup, so the funnel always knows there are 12 slides even before anyone
// has opened the deck (otherwise it collapses to a single row). Keep in sync
// with the actual slides rendered in deck-client.tsx.
export const DECK_SLIDE_TITLES = [
  'Title',
  'The problem',
  'Why now',
  'The paradigm shift',
  'The product',
  'How it works',
  'The moat',
  'Traction',
  'Business model',
  'Market',
  'Team',
  'The ask',
] as const

// Widened to `number` (not the literal 12) so it composes in numeric reducers.
export const DECK_SLIDE_COUNT: number = DECK_SLIDE_TITLES.length
