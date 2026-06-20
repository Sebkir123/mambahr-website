'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { serviceDb } from '@/lib/supabase/service'
import { GUIDES, guidePath, newFieldGuideToken } from '@/lib/admin-field-guides'

export type LinkResult = { ok: boolean; message: string; path?: string; token?: string }

const SITE = 'https://mambahr.com'

// Create an admin-owned TRACKED share link for a guide (no email — identified by
// recipient name). field_guide_leads only allows admin READ via RLS, so writes
// go through the service role behind requireAdmin(). Returns the link so the UI
// can show + copy it immediately (the cached list catches up within ~20s).
export async function createFieldGuideLink(fd: FormData): Promise<LinkResult> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return { ok: false, message: 'Service not configured.' }

  const guide = String(fd.get('guide') || '').trim()
  const name = String(fd.get('recipient_name') || '').trim()
  const company = String(fd.get('company') || '').trim()
  if (!GUIDES[guide]) return { ok: false, message: 'Unknown guide.' }
  if (!name) return { ok: false, message: 'Recipient name is required.' }

  const token = newFieldGuideToken()
  const { error } = await db.from('field_guide_leads').insert({
    guide,
    email: null,
    recipient_name: name.slice(0, 120),
    company: company ? company.slice(0, 120) : null,
    token,
    source: 'manual',
    sent_at: new Date().toISOString(),
  })
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/field-guides')
  return { ok: true, message: `Tracked link created for ${name}.`, path: guidePath(guide), token }
}

// Revoke a link — the gated page immediately 404s for that token; opens are kept.
export async function revokeFieldGuideLink(fd: FormData): Promise<void> {
  await requireAdmin()
  const db = serviceDb()
  if (!db) return
  const id = String(fd.get('id') || '')
  if (!id) return
  await db.from('field_guide_leads').update({ revoked_at: new Date().toISOString() }).eq('id', id)
  revalidatePath('/admin/field-guides')
}
