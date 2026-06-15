import sanitizeHtml from 'sanitize-html'

export type PostStatus = 'draft' | 'scheduled' | 'published'

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  body_html: string
  body_json: unknown | null
  cover_image_url: string | null
  status: PostStatus
  published_at: string | null
  scheduled_for: string | null
  author_name: string
  reading_time: number
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_title: string | null
  og_description: string | null
  og_image_url: string | null
  noindex: boolean
  created_at: string
  updated_at: string
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// ~200 wpm on the rendered text. Always at least 1 minute.
export function readingTimeMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(' ').length : 0
  return Math.max(1, Math.round(words / 200))
}

// Sanitizes TipTap output before it is rendered on the public site. The editor
// is admin-only, but rendering stored HTML still goes through this so a
// compromised row can never inject script/handlers (and to satisfy our CSP).
export function sanitizePostHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'a', 'strong',
      'em', 'b', 'i', 'u', 's', 'code', 'pre', 'img', 'figure', 'figcaption',
      'hr', 'br', 'span',
    ],
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      span: ['class'],
      code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      // Every outbound link gets safe rel + opens in a new tab.
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, rel: 'noopener noreferrer nofollow', target: '_blank' },
      }),
    },
    // Drop empty <span> wrappers TipTap sometimes emits.
    exclusiveFilter: (frame) =>
      frame.tag === 'span' && !frame.text.trim() && !Object.keys(frame.attribs).length,
  })
}

export function postUrl(slug: string): string {
  return `/blog/${slug}`
}

export const TAG_OPTIONS = [
  'Product', 'AI', 'Compliance', 'Hiring', 'Onboarding',
  'People Ops', 'Company', 'Guides',
]
