// Helpers for reconciling blog images with the `blog-media` storage bucket.
// Pure string functions, no imports, so this is safe to use from both the
// browser editor and server actions / the cron sweep.

const PUBLIC_MARKER = '/storage/v1/object/public/blog-media/'

// Convert a public blog-media URL back to its path within the bucket, e.g.
//   https://x.supabase.co/storage/v1/object/public/blog-media/2026/ab.png
//   -> "2026/ab.png"
// Returns null for anything that isn't a blog-media object (external images,
// data: URIs, the branded /og fallback), so those are never touched.
export function blogStoragePath(url: string | null | undefined): string | null {
  if (!url) return null
  const i = url.indexOf(PUBLIC_MARKER)
  if (i === -1) return null
  const path = url.slice(i + PUBLIC_MARKER.length).split(/[?#]/)[0]
  if (!path) return null
  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

// Every <img src> URL in a post body (sanitized HTML uses double quotes, the
// live TipTap editor can emit either quote style, so accept both).
export function bodyImageUrls(html: string): string[] {
  const urls: string[] = []
  const re = /<img\b[^>]*?\ssrc=["']([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) urls.push(m[1])
  return urls
}

// All bucket paths a single post references (cover, OG, and in-body images),
// deduped. Used to clean up on delete and to build the "still referenced" set
// for the sweep.
export function postImagePaths(post: {
  cover_image_url?: string | null
  og_image_url?: string | null
  body_html?: string | null
}): string[] {
  const urls = [post.cover_image_url, post.og_image_url, ...bodyImageUrls(post.body_html || '')]
  const paths = urls.map(blogStoragePath).filter((p): p is string => !!p)
  return Array.from(new Set(paths))
}
