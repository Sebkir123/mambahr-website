// Share cards (the image a link shows in Slack, LinkedIn, iMessage, X).
// Drawn by src/app/og: one per page from its title and section, and one for
// the homepage and anything without its own.

/** The share card for a page: its title and the section it belongs to. */
export const ogCard = (title: string, eyebrow: string) =>
  `/og?title=${encodeURIComponent(title)}&eyebrow=${encodeURIComponent(eyebrow)}`

/** The homepage and default share card. */
export const OG_HOME = '/og/home'
