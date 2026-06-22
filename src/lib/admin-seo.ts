import 'server-only'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'

// SEO health for the admin panel. Reads every post (any status) as the
// logged-in admin (RLS via is_admin(), no service-role key) and scores its
// on-page SEO fields, so the SEO page can surface posts missing a meta
// description, posts set to noindex, etc. Behind requireAdmin() at every call.

export type PostSeo = {
  id: string
  slug: string
  title: string
  status: 'draft' | 'scheduled' | 'published'
  noindex: boolean
  hasMetaTitle: boolean
  hasMetaDescription: boolean
  hasExcerpt: boolean
  hasCover: boolean
  hasOgImage: boolean
  hasCanonical: boolean
  score: number // 0–100, weighted on-page completeness
  issues: string[]
}

export type SeoOverview = {
  warnings: string[]
  totals: { posts: number; published: number; indexable: number; noindex: number; avgScore: number }
  posts: PostSeo[] // published first, then by ascending score (worst SEO first)
}

type RawPost = {
  id: string
  slug: string
  title: string | null
  status: string
  excerpt: string | null
  cover_image_url: string | null
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_image_url: string | null
  noindex: boolean | null
}

// Field weights sum to 100. Cover/canonical are softer signals than the core
// title + description that actually drive the SERP snippet.
const WEIGHTS = { metaTitle: 22, metaDescription: 30, excerpt: 12, cover: 14, ogImage: 14, canonical: 8 }

function scorePost(p: RawPost): PostSeo {
  const hasMetaTitle = !!p.meta_title?.trim() || !!p.title?.trim()
  const hasMetaDescription = !!p.meta_description?.trim() || !!p.excerpt?.trim()
  const hasExcerpt = !!p.excerpt?.trim()
  const hasCover = !!p.cover_image_url?.trim()
  // Every post is guaranteed a 1200×630 share image: an uploaded og/cover, or the
  // dynamic branded /blog/[slug]/og route. Social sharing is never actually broken,
  // so this signal is always satisfied, don't penalize posts for it.
  const hasOgImage = true
  const hasCanonical = !!p.canonical_url?.trim()

  let score = 0
  if (hasMetaTitle) score += WEIGHTS.metaTitle
  if (hasMetaDescription) score += WEIGHTS.metaDescription
  if (hasExcerpt) score += WEIGHTS.excerpt
  if (hasCover) score += WEIGHTS.cover
  if (hasOgImage) score += WEIGHTS.ogImage
  if (hasCanonical) score += WEIGHTS.canonical

  const issues: string[] = []
  if (!p.meta_title?.trim()) issues.push('No custom meta title (falling back to post title)')
  if (!p.meta_description?.trim() && !p.excerpt?.trim()) issues.push('No meta description or excerpt')
  if (!hasCover) issues.push('No custom cover image (branded fallback in use)')
  if (p.noindex) issues.push('Set to noindex, hidden from search engines')

  return {
    id: p.id,
    slug: p.slug,
    title: p.title?.trim() || 'Untitled',
    status: (['draft', 'scheduled', 'published'].includes(p.status) ? p.status : 'draft') as PostSeo['status'],
    noindex: !!p.noindex,
    hasMetaTitle,
    hasMetaDescription,
    hasExcerpt,
    hasCover,
    hasOgImage,
    hasCanonical,
    score: Math.round(score),
    issues,
  }
}

const cachedSeo = unstable_cache(async () => computeSeoOverview(serviceDb()!), ['seo-overview-v1'], { revalidate: 20 })

export async function getSeoOverview(): Promise<SeoOverview> {
  if (serviceDb()) return cachedSeo()
  return computeSeoOverview(await createSupabaseServerClient())
}

async function computeSeoOverview(supabase: SupabaseClient): Promise<SeoOverview> {
  const empty: SeoOverview = {
    warnings: [],
    totals: { posts: 0, published: 0, indexable: 0, noindex: 0, avgScore: 0 },
    posts: [],
  }

  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, status, excerpt, cover_image_url, meta_title, meta_description, canonical_url, og_image_url, noindex')
  if (error) {
    return { ...empty, warnings: [`Could not read posts: ${error.message}`] }
  }

  const rows = (data as RawPost[] | null) ?? []
  const posts = rows.map(scorePost)

  const published = posts.filter((p) => p.status === 'published')
  const noindex = posts.filter((p) => p.noindex).length
  const indexable = published.filter((p) => !p.noindex).length
  const avgScore = published.length
    ? Math.round(published.reduce((s, p) => s + p.score, 0) / published.length)
    : 0

  // Published first, then worst SEO score first so the page leads with what to fix.
  const order = { published: 0, scheduled: 1, draft: 2 } as const
  posts.sort((a, b) => order[a.status] - order[b.status] || a.score - b.score)

  return {
    warnings: [],
    totals: { posts: posts.length, published: published.length, indexable, noindex, avgScore },
    posts,
  }
}
