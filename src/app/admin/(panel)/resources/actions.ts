'use server'

import { randomBytes } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { serviceDb } from '@/lib/supabase/service'
import { resourceFileUrl } from '@/lib/resources'

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

// Slugs that collide with existing static routes under /resources/ — a CMS row
// with one of these would be permanently shadowed by the static page.
const RESERVED_SLUGS = new Set(['rif-playbook'])

export type SaveResult = { ok: boolean; message: string; slug?: string }

// Upload a playbook PDF to the public resources bucket. Returns the public URL +
// the storage path the form persists. Admin-gated; service role bypasses RLS.
export type UploadResult = { ok: boolean; url?: string; path?: string; name?: string; size?: number; message?: string }
export async function uploadResourceFile(formData: FormData): Promise<UploadResult> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Storage isn’t configured yet.' }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: 'No file selected.' }
  if (file.type !== 'application/pdf') return { ok: false, message: 'Upload a PDF.' }
  if (file.size > MAX_PDF_BYTES) return { ok: false, message: 'PDF must be under 50 MB.' }

  const path = `pdf/${randomBytes(10).toString('hex')}.pdf`
  const bytes = Buffer.from(await file.arrayBuffer())
  const { error } = await db.storage.from(BUCKET).upload(path, bytes, { contentType: 'application/pdf', upsert: false })
  if (error) return { ok: false, message: 'Upload failed — try again.' }
  return { ok: true, url: resourceFileUrl(path), path, name: file.name.slice(0, 200), size: file.size }
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
  if (RESERVED_SLUGS.has(slug)) return { ok: false, message: `“${slug}” is reserved — pick a different slug.` }

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
    const { error } = await db.from('resources').update(row).eq('id', id)
    if (error) return { ok: false, message: error.message.includes('duplicate') ? 'That slug is already taken.' : error.message }
  } else {
    const { error } = await db.from('resources').insert({ ...row, created_by: admin.email })
    if (error) return { ok: false, message: error.message.includes('duplicate') ? 'That slug is already taken.' : error.message }
  }

  revalidatePath('/admin/resources')
  revalidatePath('/') // homepage resources section
  revalidatePath(`/resources/${slug}`)
  return { ok: true, message: id ? 'Saved.' : 'Resource created.', slug }
}

export async function setResourceStatus(formData: FormData): Promise<void> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return
  const id = String(formData.get('id') || '')
  const status = String(formData.get('status') || '') === 'published' ? 'published' : 'draft'
  if (!id) return
  // Don't publish a resource with no PDF (dead download button on the site).
  if (status === 'published') {
    const { data } = await db.from('resources').select('file_path').eq('id', id).maybeSingle()
    if (!data?.file_path) return
  }
  await db.from('resources').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
  revalidatePath('/admin/resources')
  revalidatePath('/')
}

export async function deleteResource(formData: FormData): Promise<void> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return
  const id = String(formData.get('id') || '')
  if (!id) return
  const { data } = await db.from('resources').select('file_path').eq('id', id).maybeSingle()
  if (data?.file_path) await db.storage.from(BUCKET).remove([data.file_path as string])
  await db.from('resources').delete().eq('id', id)
  revalidatePath('/admin/resources')
  revalidatePath('/')
}
