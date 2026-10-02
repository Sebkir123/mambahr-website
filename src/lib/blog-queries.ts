import { createSupabasePublicClient } from '@/lib/supabase/public'
import type { Post } from '@/lib/blog'

// Public-facing reads. These always run as anon (see createSupabasePublicClient),
// so RLS (posts_public_read) is the real gate, only live posts ever come back,
// even though the query itself asks for everything. Never trust the query alone.

// A post's effective publish date is published_at, or scheduled_for for a
// scheduled row that has just gone live.
export function effectiveDate(p: Pick<Post, 'published_at' | 'scheduled_for' | 'created_at'>): string {
  return p.published_at || p.scheduled_for || p.created_at
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createSupabasePublicClient()
  const { data } = await supabase.from('posts').select('*')
  const posts = (data as Post[] | null) ?? []
  return posts.sort(
    (a, b) => new Date(effectiveDate(b)).getTime() - new Date(effectiveDate(a)).getTime(),
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createSupabasePublicClient()
  const { data } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle()
  return (data as Post | null) ?? null
}

// Slugs for the sitemap. RLS keeps this to live posts only. A post marked
// noindex, or one whose canonical points at another URL, is left out: listing
// it would ask crawlers to index a page that tells them not to.
export async function getPublishedSlugs(): Promise<{ slug: string; date: string }[]> {
  const supabase = createSupabasePublicClient()
  const { data } = await supabase.from('posts').select('slug, published_at, scheduled_for, created_at, noindex, canonical_url')
  const rows = (data as Pick<Post, 'slug' | 'published_at' | 'scheduled_for' | 'created_at' | 'noindex' | 'canonical_url'>[] | null) ?? []
  return rows
    .filter((r) => !r.noindex && (!r.canonical_url || r.canonical_url === `https://www.mambahr.com/blog/${r.slug}`))
    .map((r) => ({ slug: r.slug, date: effectiveDate(r) }))
}
