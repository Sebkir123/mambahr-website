import 'server-only'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'
import { readAdminRows } from '@/lib/admin-rows'
import { getBlogReadSummary } from '@/lib/blog-analytics'
import { getSiteAnalytics } from '@/lib/site-analytics'
import { getSeoOverview } from '@/lib/admin-seo'

export type OverviewPost = { id: string; title: string; slug: string; status: 'draft' | 'published' | 'scheduled'; updated_at: string }
export type Overview = {
  warnings: string[]
  website: { visits: number; pageviews: number; spark: number[] }
  posts: { published: number; draft: number; scheduled: number; recent: OverviewPost[]; drafts: OverviewPost[] }
  resources: { published: number; draft: number }
  reads: { total: number; last7d: number; top: { slug: string; title: string; views: number }[] }
  missingDescriptions: number
}

const cachedOverview = unstable_cache(async () => computeOverview(serviceDb()!), ['admin-content-overview-v1'], { revalidate: 20, tags: ['admin-data'] })
export async function getOverview(): Promise<Overview> {
  return serviceDb() ? cachedOverview() : computeOverview(await createSupabaseServerClient())
}

// The workspace summarizes website and publishing only. Relationship data and
// lead intake records are managed outside this panel; no CRM reads are needed.
async function computeOverview(db: SupabaseClient): Promise<Overview> {
  const [postResult, resourceResult, reads, website, seo] = await Promise.all([
    readAdminRows<OverviewPost>((from, to) => db.from('posts').select('id, title, slug, status, updated_at').order('updated_at', { ascending: false }).order('id').range(from, to)),
    readAdminRows<{ id: string; status: string }>((from, to) => db.from('resources').select('id, status').order('id').range(from, to)),
    getBlogReadSummary(), getSiteAnalytics('website', '7d', 'ET'), getSeoOverview(),
  ])
  const warnings = [...reads.warnings, ...website.warnings, ...seo.warnings]
  if (postResult.error) warnings.push('Post totals could not be fully loaded.')
  if (resourceResult.error) warnings.push('Resource totals could not be fully loaded.')
  if (postResult.truncated || resourceResult.truncated) warnings.push('Content totals include only the first 10,000 records of each content type.')
  const posts = postResult.rows
  const titles = new Map(posts.map((post) => [post.slug, post.title]))
  return {
    warnings,
    website: { visits: website.totals.real, pageviews: website.totals.pageviews, spark: website.spark },
    posts: { published: posts.filter((p) => p.status === 'published').length, draft: posts.filter((p) => p.status === 'draft').length, scheduled: posts.filter((p) => p.status === 'scheduled').length, recent: posts.slice(0, 6), drafts: posts.filter((p) => p.status === 'draft').slice(0, 4) },
    resources: { published: resourceResult.rows.filter((r) => r.status === 'published').length, draft: resourceResult.rows.filter((r) => r.status === 'draft').length },
    reads: { total: reads.total, last7d: reads.last7d, top: reads.top.map((post) => ({ ...post, title: titles.get(post.slug) || post.slug })) },
    missingDescriptions: seo.posts.filter((post) => post.status === 'published' && !post.noindex && !post.hasMetaDescription).length,
  }
}
