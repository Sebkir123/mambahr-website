'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { slugify, readingTimeMinutes, sanitizePostHtml, type PostStatus } from '@/lib/blog'
import { postImagePaths } from '@/lib/blog-images'

// Keep the newest N revisions per post. Every autosave (every ~1.2s while
// typing) appends a snapshot, so without a cap the table grows without bound.
// The history panel only surfaces 30, this leaves headroom above that.
const REVISION_KEEP = 50

// All writes act as the signed-in admin so RLS (is_admin) is the real gate.

export async function createDraft() {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const stamp = Date.now().toString(36)
  const { data, error } = await supabase
    .from('posts')
    .insert({ title: 'Untitled post', slug: `untitled-${stamp}`, status: 'draft' })
    .select('id')
    .single()
  if (error || !data) throw new Error(error?.message || 'Could not create draft')
  redirect(`/admin/blog/${data.id}`)
}

export type SavePayload = {
  id: string
  title: string
  slug: string
  excerpt: string
  bodyHtml: string
  bodyJson: unknown
  coverImageUrl: string | null
  authorName: string
  tags: string[]
  metaTitle: string | null
  metaDescription: string | null
  canonicalUrl: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImageUrl: string | null
  noindex: boolean
  scheduledFor: string | null
  publishedAt: string | null
}

export type SaveResult = { ok: true; slug: string } | { ok: false; error: string }

type DbClient = Awaited<ReturnType<typeof createSupabaseServerClient>>

// Returns `base` if free, else the next open `base-2`, `base-3`, … Two "Untitled
// post" drafts both slugify to `untitled-post`; rather than hard-fail the second
// on the unique index, we suffix it, standard CMS behaviour. Excludes the post
// being saved so re-saving an unchanged slug never trips over itself.
async function uniqueSlug(supabase: DbClient, base: string, selfId: string): Promise<string> {
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .neq('id', selfId)
    .ilike('slug', `${base}%`)
  const taken = new Set<string>((data ?? []).map((r) => r.slug as string))
  if (!taken.has(base)) return base
  for (let n = 2; n < 1000; n++) {
    if (!taken.has(`${base}-${n}`)) return `${base}-${n}`
  }
  return `${base}-${Date.now().toString(36)}`
}

export async function savePost(payload: SavePayload): Promise<SaveResult> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()

  const cleanHtml = sanitizePostHtml(payload.bodyHtml)
  const base = slugify(payload.slug || payload.title) || `untitled-${Date.now().toString(36)}`
  const slug = await uniqueSlug(supabase, base, payload.id)

  const { error } = await supabase
    .from('posts')
    .update({
      title: payload.title.trim() || 'Untitled post',
      slug,
      excerpt: payload.excerpt.trim(),
      body_html: cleanHtml,
      body_json: payload.bodyJson,
      cover_image_url: payload.coverImageUrl,
      author_name: payload.authorName.trim() || 'MambaHR',
      reading_time: readingTimeMinutes(cleanHtml),
      tags: payload.tags,
      meta_title: payload.metaTitle?.trim() || null,
      meta_description: payload.metaDescription?.trim() || null,
      canonical_url: payload.canonicalUrl?.trim() || null,
      og_title: payload.ogTitle?.trim() || null,
      og_description: payload.ogDescription?.trim() || null,
      og_image_url: payload.ogImageUrl || null,
      noindex: payload.noindex,
      scheduled_for: payload.scheduledFor,
      // Only write published_at when the editor supplied one (backdating a
      // published post). Omitting it leaves the column untouched so a draft's
      // null and a publish timestamp are never clobbered.
      ...(payload.publishedAt ? { published_at: payload.publishedAt } : {}),
    })
    .eq('id', payload.id)

  if (error) {
    // unique_violation on slug
    if (error.code === '23505') return { ok: false, error: 'That slug is already taken.' }
    return { ok: false, error: error.message }
  }

  // best-effort revision snapshot, full editorial content so it can be restored.
  await supabase.from('post_revisions').insert({
    post_id: payload.id,
    body_json: payload.bodyJson,
    body_html: cleanHtml,
    excerpt: payload.excerpt.trim(),
    title: payload.title,
  })

  // Prune anything past the newest REVISION_KEEP for this post (best-effort).
  const { data: excess } = await supabase
    .from('post_revisions')
    .select('id')
    .eq('post_id', payload.id)
    .order('saved_at', { ascending: false })
    .range(REVISION_KEEP, REVISION_KEEP + 1000)
  if (excess && excess.length) {
    await supabase.from('post_revisions').delete().in('id', excess.map((r) => r.id as string))
  }

  revalidatePath('/admin/blog')
  revalidatePath(`/blog/${slug}`)
  return { ok: true, slug }
}

// Publish / unpublish / schedule. Sets published_at on first publish.
export async function setPostStatus(
  id: string,
  status: PostStatus,
  scheduledFor?: string | null,
): Promise<SaveResult> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()

  const { data: existing } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('id', id)
    .single()

  const patch: Record<string, unknown> = { status }
  if (status === 'published') {
    patch.published_at = existing?.published_at ?? new Date().toISOString()
    patch.scheduled_for = null
  } else if (status === 'scheduled') {
    patch.scheduled_for = scheduledFor ?? null
  } else {
    // draft → keep published_at history but it won't render (status gate)
  }

  const { error } = await supabase.from('posts').update(patch).eq('id', id)
  if (error) return { ok: false, error: error.message }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`)
  return { ok: true, slug: existing?.slug || '' }
}

export type Revision = { id: string; title: string | null; excerpt: string | null; saved_at: string }

// Most recent content snapshots for a post, newest first. Capped at 30, older
// history is rarely useful and the list stays scannable.
export async function listRevisions(postId: string): Promise<Revision[]> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('post_revisions')
    .select('id, title, excerpt, saved_at')
    .eq('post_id', postId)
    .order('saved_at', { ascending: false })
    .limit(30)
  return (data ?? []) as Revision[]
}

export type RestoreResult =
  | { ok: true; title: string; excerpt: string | null; bodyHtml: string | null; bodyJson: unknown }
  | { ok: false; error: string }

// Returns a revision's content for the editor to apply. Read-only by design: the
// editor pushes the content into TipTap (which re-renders + re-sanitizes the HTML
// client-side) and the existing autosave persists the restored state. That keeps
// a single write path.
//
// We return BOTH body_html and body_json and let the editor prefer body_html:
// an older editor build serialized <a> link marks into body_json WITHOUT their
// href, so restoring from body_json silently dropped every link. body_html
// carries the hrefs; body_json is the fallback only for legacy revisions saved
// before the body_html column existed.
export async function restoreRevision(postId: string, revisionId: string): Promise<RestoreResult> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const { data: rev, error } = await supabase
    .from('post_revisions')
    .select('title, excerpt, body_html, body_json')
    .eq('id', revisionId)
    .eq('post_id', postId)
    .single()
  if (error || !rev) return { ok: false, error: 'Revision not found.' }
  return { ok: true, title: rev.title ?? 'Untitled post', excerpt: rev.excerpt, bodyHtml: rev.body_html ?? null, bodyJson: rev.body_json }
}

export async function deletePost(id: string) {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  // Delete the row and return the fields we need to clean up its images.
  const { data } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .select('slug, cover_image_url, og_image_url, body_html')
    .maybeSingle()

  // Remove this post's cover/OG/in-body images from storage (best-effort). The
  // post_revisions rows cascade-delete with the post via the FK.
  if (data) {
    const paths = postImagePaths(data)
    if (paths.length) await supabase.storage.from('blog-media').remove(paths)
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (data?.slug) revalidatePath(`/blog/${data.slug}`)
  redirect('/admin/blog')
}
