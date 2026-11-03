import 'server-only'
import sanitizeHtml from 'sanitize-html'
import { unwrapGoogleRedirect } from '@/lib/link-utils'

export { slugify, TAG_OPTIONS, type Post, type PostStatus } from '@/lib/blog-types'

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
      // target + rel must be allow-listed here or sanitize-html strips them
      // AFTER the transformTags below adds them — which is why in-post links
      // never opened in a new tab. The transform always overwrites both to
      // safe values, so allow-listing them can't leak attacker-controlled ones.
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      span: ['class'],
      code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      // Every outbound link gets safe rel + opens in a new tab, and a Google
      // Docs paste's click-tracking redirect unwraps to the real destination.
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          href: unwrapGoogleRedirect(attribs.href || ''),
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
      }),
      // Every image carries an alt attribute; one the author left blank is
      // marked decorative (alt="") rather than missing.
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, alt: attribs.alt ?? '' } }),
    },
    // Drop empty <span> wrappers TipTap sometimes emits, and any <img> whose
    // source was stripped (a pasted data: or relative URL), which would
    // otherwise render as a broken, unlabeled image.
    exclusiveFilter: (frame) =>
      (frame.tag === 'span' && !frame.text.trim() && !Object.keys(frame.attribs).length) ||
      (frame.tag === 'img' && !frame.attribs.src),
  })
}

export function postUrl(slug: string): string {
  return `/blog/${slug}`
}
