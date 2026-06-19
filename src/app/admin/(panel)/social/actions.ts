'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { socialDb, publishForAccount } from '@/lib/social'

type AccountRow = {
  id: string
  author_urn: string | null
  access_token: string | null
  refresh_token: string | null
  expires_at: string | null
}

// Compose → create one post row per selected account. mode:
//   draft    → saved, not sent
//   schedule → status=scheduled, scheduled_at set (cron sends it)
//   now      → created then published immediately
export type ComposeResult = { ok: boolean; message: string }

export async function composePost(formData: FormData): Promise<ComposeResult> {
  const admin = await requireAdmin()
  const db = socialDb()
  if (!db) return { ok: false, message: 'LinkedIn isn’t configured yet — drafts can’t be saved.' }

  const body = String(formData.get('body') || '').trim()
  const mode = String(formData.get('mode') || 'draft') // draft | schedule | now
  // scheduledAt arrives as an absolute ISO string computed in the browser's
  // timezone, so the stored instant is unambiguous regardless of server TZ.
  const scheduledAt = String(formData.get('scheduledAt') || '').trim()
  const accountIds = formData.getAll('accountIds').map(String).filter(Boolean)
  if (!body || accountIds.length === 0) return { ok: false, message: 'Add some text and pick at least one account.' }

  if (mode === 'now') {
    let posted = 0
    let failed = 0
    for (const accountId of accountIds) {
      const { data: acct } = await db
        .from('social_accounts')
        .select('id, author_urn, access_token, refresh_token, expires_at')
        .eq('id', accountId)
        .maybeSingle()
      let externalId: string | null = null
      let error: string | null = null
      try {
        if (!acct) throw new Error('account not found')
        externalId = await publishForAccount(acct as AccountRow, body)
      } catch (e) {
        error = e instanceof Error ? e.message : 'publish failed'
      }
      await db.from('social_posts').insert({
        account_id: accountId,
        body,
        status: error ? 'failed' : 'published',
        published_at: error ? null : new Date().toISOString(),
        external_post_id: externalId,
        error,
        created_by: admin.email,
      })
      error ? failed++ : posted++
    }
    revalidatePath('/admin/social')
    if (failed === 0) return { ok: true, message: `Posted to ${posted} account${posted === 1 ? '' : 's'}.` }
    if (posted === 0) return { ok: false, message: `Publish failed — see the queue below for the reason.` }
    return { ok: false, message: `Posted to ${posted}, ${failed} failed — see the queue below.` }
  }

  const status = mode === 'schedule' ? 'scheduled' : 'draft'
  for (const accountId of accountIds) {
    await db.from('social_posts').insert({
      account_id: accountId,
      body,
      status,
      scheduled_at: mode === 'schedule' && scheduledAt ? scheduledAt : null,
      created_by: admin.email,
    })
  }
  revalidatePath('/admin/social')
  return {
    ok: true,
    message: mode === 'schedule' ? `Scheduled for ${accountIds.length} account${accountIds.length === 1 ? '' : 's'}.` : 'Saved as draft.',
  }
}

// Publish a saved draft / retry a failed or scheduled post immediately.
export async function publishPost(formData: FormData) {
  await requireAdmin()
  const db = socialDb()
  if (!db) return
  const id = String(formData.get('id') || '')
  if (!id) return

  const { data: post } = await db.from('social_posts').select('id, body, account_id').eq('id', id).single()
  if (!post) return
  const { data: acct } = await db
    .from('social_accounts')
    .select('id, author_urn, access_token, refresh_token, expires_at')
    .eq('id', post.account_id)
    .single()

  try {
    const externalId = await publishForAccount(acct as AccountRow, post.body as string)
    await db
      .from('social_posts')
      .update({ status: 'published', published_at: new Date().toISOString(), external_post_id: externalId, error: null, updated_at: new Date().toISOString() })
      .eq('id', id)
  } catch (e) {
    await db
      .from('social_posts')
      .update({ status: 'failed', error: e instanceof Error ? e.message : 'publish failed', updated_at: new Date().toISOString() })
      .eq('id', id)
  }
  revalidatePath('/admin/social')
}

export async function deletePost(formData: FormData) {
  await requireAdmin()
  const db = socialDb()
  if (!db) return
  const id = String(formData.get('id') || '')
  if (!id) return
  await db.from('social_posts').delete().eq('id', id)
  revalidatePath('/admin/social')
}

export async function disconnectAccount(formData: FormData) {
  await requireAdmin()
  const db = socialDb()
  if (!db) return
  const id = String(formData.get('id') || '')
  if (!id) return
  await db.from('social_accounts').delete().eq('id', id)
  revalidatePath('/admin/social')
}
