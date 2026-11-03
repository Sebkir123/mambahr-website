'use server'

import { randomBytes } from 'node:crypto'
import { revalidatePath, updateTag } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { serviceDb } from '@/lib/supabase/service'

const BUCKET = 'resources'
const MAX_PDF_BYTES = 50 * 1024 * 1024

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// Slugs that collide with existing static routes under /resources/, a CMS row
// with one of these would be permanently shadowed by the static page.
const RESERVED_SLUGS = new Set(['rif-playbook'])

export type SaveResult = { ok: boolean; message: string; slug?: string }

// Mint a signed upload URL for a playbook PDF. The browser then uploads the
// bytes DIRECTLY to Supabase Storage with this token, bypassing the Next/Vercel
// request-body limits (1 MB server action, ~4.5 MB function) so PDFs up to the
// bucket's 50 MB cap work. Admin-gated; only metadata crosses the function.
export type UploadTicket = { ok: boolean; path?: string; token?: string; name?: string; message?: string }
export async function createResourceUploadUrl(formData: FormData): Promise<UploadTicket> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Storage isn’t configured yet.' }

  const name = String(formData.get('name') || '').trim()
  const type = String(formData.get('type') || '').trim()
  const size = Number(formData.get('size')) || 0
  if (type !== 'application/pdf') return { ok: false, message: 'Upload a PDF.' }
  if (size <= 0) return { ok: false, message: 'Empty file.' }
  if (size > MAX_PDF_BYTES) return { ok: false, message: 'PDF must be under 50 MB.' }

  const path = `pdf/${randomBytes(10).toString('hex')}.pdf`
  const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path)
  if (error || !data) return { ok: false, message: 'Could not start the upload, try again.' }
  return { ok: true, path: data.path, token: data.token, name: name.slice(0, 200) }
}

// Create or update a resource. id present → update.
export async function saveResource(formData: FormData): Promise<SaveResult> {
  const admin = await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Service not configured.' }

  const id = String(formData.get('id') || '').trim()
  const title = String(formData.get('title') || '').trim()
  if (!title) return { ok: false, message: 'Title is required.' }
  const slug = slugify(String(formData.get('slug') || '') || title)
  if (!slug) return { ok: false, message: 'Could not derive a slug from the title.' }
  if (RESERVED_SLUGS.has(slug)) return { ok: false, message: `“${slug}” is reserved, pick a different slug.` }

  const status = String(formData.get('status') || 'draft') === 'published' ? 'published' : 'draft'
  const filePath = String(formData.get('file_path') || '').trim() || null
  // A published resource with no PDF would render a dead "Download" button.
  if (status === 'published' && !filePath) return { ok: false, message: 'Attach a PDF before publishing.' }

  const bullets = String(formData.get('bullets') || '')
    .split('\n')
    .map((b) => b.trim())
    .filter(Boolean)
    .slice(0, 8)

  const row = {
    slug,
    title: title.slice(0, 200),
    kicker: (String(formData.get('kicker') || 'Playbook').trim() || 'Playbook').slice(0, 40),
    cover_no: String(formData.get('cover_no') || '').trim().slice(0, 8) || null,
    description: String(formData.get('description') || '').trim().slice(0, 2000),
    bullets,
    file_path: filePath,
    file_name: String(formData.get('file_name') || '').trim() || null,
    file_size: Number(formData.get('file_size')) || null,
    featured: formData.get('featured') === 'on' || formData.get('featured') === 'true',
    status,
    sort_order: Number(formData.get('sort_order')) || 0,
    updated_at: new Date().toISOString(),
  }

  if (id) {
    const { data, error } = await db.from('resources').update(row).eq('id', id).select('id').maybeSingle()
    if (error) return { ok: false, message: error.message.includes('duplicate') ? 'That slug is already taken.' : error.message }
    if (!data) return { ok: false, message: 'This resource no longer exists. Reload the list before editing.' }
  } else {
    const { error } = await db.from('resources').insert({ ...row, created_by: admin.email })
    if (error) return { ok: false, message: error.message.includes('duplicate') ? 'That slug is already taken.' : error.message }
  }

  updateTag('admin-data')
  revalidatePath('/admin/resources')
  revalidatePath('/') // homepage resources section
  revalidatePath(`/resources/${slug}`)
  return { ok: true, message: id ? 'Saved.' : 'Resource created.', slug }
}

function invalidateResource(slug: string) {
  updateTag('admin-data')
  revalidatePath('/admin/resources')
  revalidatePath('/')
  revalidatePath(`/resources/${slug}`)
}
export async function setResourceStatus(formData: FormData): Promise<SaveResult> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Service not configured.' }
  const id = String(formData.get('id') || '').trim()
  const status = String(formData.get('status') || '')
  if (!id || !['published', 'draft'].includes(status)) return { ok: false, message: 'Choose a valid resource and status.' }
  const { data: resource, error: readError } = await db.from('resources').select('slug,file_path').eq('id', id).maybeSingle()
  if (readError) return { ok: false, message: 'Could not load the resource. Please retry.' }
  if (!resource) return { ok: false, message: 'This resource no longer exists. Reload the list.' }
  if (status === 'published' && !resource.file_path) return { ok: false, message: 'Attach a PDF before publishing.' }
  let update = db.from('resources').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
  if (status === 'published') update = update.not('file_path', 'is', null)
  const { data, error } = await update.select('id').maybeSingle()
  if (error) return { ok: false, message: 'Could not change the status. Please retry.' }
  if (!data) return { ok: false, message: 'The resource changed or was deleted. Reload the list and retry.' }
  invalidateResource(resource.slug)
  return { ok: true, message: status === 'published' ? 'Resource published.' : 'Resource returned to draft.' }
}
export async function deleteResource(formData: FormData): Promise<SaveResult> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Service not configured.' }
  const id = String(formData.get('id') || '').trim()
  if (!id) return { ok: false, message: 'Choose a resource to delete.' }
  // Never remove the PDF until its owning record has actually been deleted.
  const { data, error } = await db.from('resources').delete().eq('id', id).select('slug,file_path').maybeSingle()
  if (error) return { ok: false, message: 'Could not delete the resource. Please retry.' }
  if (!data) return { ok: false, message: 'This resource no longer exists. Reload the list.' }
  invalidateResource(data.slug)
  if (data.file_path) {
    const { data: references, error: referenceError } = await db.from('resources').select('id').eq('file_path', data.file_path).limit(1)
    if (referenceError) return { ok: true, message: 'Resource deleted. Its PDF was retained because file usage could not be checked.' }
    if (!references?.length) {
      try {
        const { error: storageError } = await db.storage.from(BUCKET).remove([data.file_path])
        if (storageError) return { ok: true, message: 'Resource deleted. Its PDF could not be removed from storage.' }
      } catch { return { ok: true, message: 'Resource deleted. Its PDF could not be removed from storage.' } }
    }
  }
  return { ok: true, message: 'Resource deleted.' }
}
