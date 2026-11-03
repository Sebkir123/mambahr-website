// Client-safe editorial types and helpers. Sanitization stays on the server.
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

export const TAG_OPTIONS = [
  'Product', 'AI', 'Compliance', 'Hiring', 'Onboarding',
  'People Ops', 'Company', 'Guides',
]
