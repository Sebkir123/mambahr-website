import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'

// Marketing-managed downloadable resources (playbooks/checklists/kits) and their
// read/download analytics from the first-party site tracker. Public reads use
// the published-only RLS path; admin reads/writes prefer the service role.

const BUCKET = 'resources'

export type Resource = {
  id: string
  slug: string
  title: string
  kicker: string
  cover_no: string | null
  description: string
  bullets: string[]
  file_path: string | null
  file_name: string | null
  file_size: number | null
  featured: boolean
  status: 'draft' | 'published'
  sort_order: number
  created_at: string
  updated_at: string
}

export type ResourceStat = { views: number; visitors: number; downloads: number; topSource: string | null; lastView: string | null }

// Public download URL for a resource's PDF (bucket is public).
export function resourceFileUrl(filePath: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`
}

async function adminDb(): Promise<SupabaseClient> {
  return serviceDb() ?? (await createSupabaseServerClient())
}

// Published resources for the public site, hero (featured) first then sort order.
// Uses a cookieless anon client so callers (e.g. the static homepage) stay
// statically renderable, RLS still restricts to published rows. Pages that
// mutate resources call revalidatePath('/') to regenerate.
export async function listPublishedResources(): Promise<Resource[]> {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return (data as Resource[] | null) ?? []
}

// One published resource for its public landing page.
export async function getPublishedResource(slug: string): Promise<Resource | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('resources').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
  return (data as Resource | null) ?? null
}

// Any resource by slug, draft or published, for admin preview.
export async function getAnyResource(slug: string): Promise<Resource | null> {
  const db = await adminDb()
  const { data } = await db.from('resources').select('*').eq('slug', slug).maybeSingle()
  return (data as Resource | null) ?? null
}

// All resources (incl. drafts) for the admin list.
export async function listAllResources(): Promise<Resource[]> {
  const db = await adminDb()
  const { data } = await db
    .from('resources')
    .select('*')
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return (data as Resource[] | null) ?? []
}

export async function getResource(id: string): Promise<Resource | null> {
  const db = await adminDb()
  const { data } = await db.from('resources').select('*').eq('id', id).maybeSingle()
  return (data as Resource | null) ?? null
}

// Referral-source breakdown per resource, keyed by slug. One unified link
// auto-attributes via the tracker; this is the resulting mix (linkedin, x, …).
export async function getResourceSourceBreakdown(): Promise<Map<string, { source: string; views: number }[]>> {
  const db = await adminDb()
  const { data, error } = await db.rpc('resource_source_breakdown')
  const map = new Map<string, { source: string; views: number }[]>()
  if (error || !data) return map
  for (const r of data as { slug: string; source: string; views: number }[]) {
    if (!r.slug) continue
    const list = map.get(r.slug) ?? []
    list.push({ source: r.source, views: Number(r.views) || 0 })
    map.set(r.slug, list)
  }
  return map
}

// Per-slug view/download stats keyed by slug, from the site tracker (bot-excluded).
export async function getResourceStats(): Promise<Map<string, ResourceStat>> {
  const db = await adminDb()
  const { data, error } = await db.rpc('resource_stats')
  const map = new Map<string, ResourceStat>()
  if (error || !data) return map
  for (const r of data as { slug: string; views: number; visitors: number; downloads: number; top_source: string | null; last_view: string | null }[]) {
    if (!r.slug) continue
    map.set(r.slug, {
      views: Number(r.views) || 0,
      visitors: Number(r.visitors) || 0,
      downloads: Number(r.downloads) || 0,
      topSource: r.top_source,
      lastView: r.last_view,
    })
  }
  return map
}

// Force-download URL for a resource's PDF, Supabase Storage honours ?download
// to set Content-Disposition: attachment (the bare public URL opens inline).
export function resourceDownloadUrl(filePath: string, fileName?: string | null): string {
  const name = (fileName && fileName.trim()) || filePath.split('/').pop() || 'mambahr-playbook.pdf'
  return `${resourceFileUrl(filePath)}?download=${encodeURIComponent(name)}`
}
