'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { newDeckToken } from '@/lib/deck-links'

// Create a per-recipient deck link (writes as the admin via RLS). The token both
// gates the deck and identifies the recipient in analytics.
export async function createDeckLink(formData: FormData) {
  const admin = await requireAdmin()
  const name = String(formData.get('recipient_name') || '').trim()
  const org = String(formData.get('recipient_org') || '').trim()
  if (!name) return
  const supabase = await createSupabaseServerClient()
  await supabase.from('deck_links').insert({
    token: newDeckToken(),
    recipient_name: name.slice(0, 120),
    recipient_org: org ? org.slice(0, 120) : null,
    created_by: admin.email,
  })
  revalidatePath('/admin/deck')
}

// Revoke a link — the deck immediately 404s for that token; analytics are kept.
export async function revokeDeckLink(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') || '')
  if (!id) return
  const supabase = await createSupabaseServerClient()
  await supabase.from('deck_links').update({ revoked_at: new Date().toISOString() }).eq('id', id)
  revalidatePath('/admin/deck')
}
