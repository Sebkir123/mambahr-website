'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { defaultStage, isValidStage, stageLabel, type ContactKind } from '@/lib/crm'

// All CRM mutations. Each runs AS the logged-in admin (RLS: is_admin()), so the
// @mambahr.com gate is enforced at the row level — no service-role key. Server
// actions are independently invokable, so requireAdmin() is called in every one.

function s(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : ''
}
function orNull(v: string): string | null {
  return v ? v : null
}
function moneyOrNull(v: string): number | null {
  if (!v) return null
  const n = parseFloat(v.replace(/[$,\s]/g, ''))
  return Number.isFinite(n) ? n : null
}

export type ActionResult = { ok: boolean; message: string; id?: string }

export async function createContact(fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin()
  const supabase = await createSupabaseServerClient()

  const kind = (s(fd.get('kind')) || 'customer') as ContactKind
  if (kind !== 'customer' && kind !== 'investor') return { ok: false, message: 'Invalid type.' }
  const name = s(fd.get('name'))
  if (!name) return { ok: false, message: 'Name is required.' }

  let stage = s(fd.get('stage')) || defaultStage(kind)
  if (!isValidStage(kind, stage)) stage = defaultStage(kind)

  const { data, error } = await supabase
    .from('crm_contacts')
    .insert({
      kind,
      name,
      email: orNull(s(fd.get('email'))),
      company: orNull(s(fd.get('company'))),
      title: orNull(s(fd.get('title'))),
      stage,
      owner: orNull(s(fd.get('owner'))) ?? admin.email,
      source: orNull(s(fd.get('source'))) ?? 'manual',
      value: moneyOrNull(s(fd.get('value'))),
      priority: s(fd.get('priority')) || 'medium',
      linkedin_url: orNull(s(fd.get('linkedin_url'))),
      website: orNull(s(fd.get('website'))),
      location: orNull(s(fd.get('location'))),
      notes: orNull(s(fd.get('notes'))),
      next_step: orNull(s(fd.get('next_step'))),
      next_step_due: orNull(s(fd.get('next_step_due'))),
      created_by: admin.email,
    })
    .select('id')
    .maybeSingle()

  if (error || !data) return { ok: false, message: error?.message ?? 'Could not create contact.' }

  await supabase.from('crm_activities').insert({
    contact_id: data.id,
    kind: 'created',
    body: `Added to the ${kind} pipeline`,
    author: admin.email,
  })

  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/contacts')
  return { ok: true, message: 'Contact created.', id: data.id as string }
}

export async function updateContact(fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const id = s(fd.get('id'))
  if (!id) return { ok: false, message: 'Missing id.' }

  const { data: prev } = await supabase.from('crm_contacts').select('kind, stage').eq('id', id).maybeSingle()
  if (!prev) return { ok: false, message: 'Contact not found.' }
  const kind = prev.kind as ContactKind

  let stage = s(fd.get('stage')) || prev.stage
  if (!isValidStage(kind, stage)) stage = prev.stage

  const tagsRaw = s(fd.get('tags'))
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []

  const { error } = await supabase
    .from('crm_contacts')
    .update({
      name: s(fd.get('name')) || 'Unnamed',
      email: orNull(s(fd.get('email'))),
      company: orNull(s(fd.get('company'))),
      title: orNull(s(fd.get('title'))),
      stage,
      owner: orNull(s(fd.get('owner'))),
      value: moneyOrNull(s(fd.get('value'))),
      priority: s(fd.get('priority')) || 'medium',
      linkedin_url: orNull(s(fd.get('linkedin_url'))),
      website: orNull(s(fd.get('website'))),
      location: orNull(s(fd.get('location'))),
      tags,
      notes: orNull(s(fd.get('notes'))),
      next_step: orNull(s(fd.get('next_step'))),
      next_step_due: orNull(s(fd.get('next_step_due'))),
    })
    .eq('id', id)

  if (error) return { ok: false, message: error.message }

  if (stage !== prev.stage) {
    await supabase.from('crm_activities').insert({
      contact_id: id,
      kind: 'stage_change',
      body: `Moved to ${stageLabel(kind, stage)}`,
      meta: { from: prev.stage, to: stage },
      author: admin.email,
    })
  }

  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/contacts')
  revalidatePath(`/admin/crm/${id}`)
  return { ok: true, message: 'Saved.' }
}

// Lightweight stage move for the kanban board (drag/drop or quick select).
export async function moveStage(fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const id = s(fd.get('id'))
  const stage = s(fd.get('stage'))
  if (!id || !stage) return { ok: false, message: 'Missing id or stage.' }

  const { data: prev } = await supabase.from('crm_contacts').select('kind, stage').eq('id', id).maybeSingle()
  if (!prev) return { ok: false, message: 'Contact not found.' }
  const kind = prev.kind as ContactKind
  if (!isValidStage(kind, stage)) return { ok: false, message: 'Invalid stage.' }
  if (stage === prev.stage) return { ok: true, message: 'No change.' }

  const { error } = await supabase.from('crm_contacts').update({ stage }).eq('id', id)
  if (error) return { ok: false, message: error.message }

  await supabase.from('crm_activities').insert({
    contact_id: id,
    kind: 'stage_change',
    body: `Moved to ${stageLabel(kind, stage)}`,
    meta: { from: prev.stage, to: stage },
    author: admin.email,
  })

  revalidatePath('/admin/crm')
  revalidatePath(`/admin/crm/${id}`)
  return { ok: true, message: `Moved to ${stageLabel(kind, stage)}.` }
}

export async function deleteContact(fd: FormData): Promise<void> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const id = s(fd.get('id'))
  if (id) await supabase.from('crm_contacts').delete().eq('id', id)
  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/contacts')
}

export async function logActivity(fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const contact_id = s(fd.get('contact_id'))
  const kind = s(fd.get('kind')) || 'note'
  const body = s(fd.get('body'))
  if (!contact_id) return { ok: false, message: 'Missing contact.' }
  if (!body) return { ok: false, message: 'Write something first.' }

  const { error } = await supabase.from('crm_activities').insert({ contact_id, kind, body, author: admin.email })
  if (error) return { ok: false, message: error.message }

  // Logging a call/email/meeting counts as outreach — bump last_contacted_at.
  if (kind === 'call' || kind === 'email' || kind === 'meeting') {
    await supabase.from('crm_contacts').update({ last_contacted_at: new Date().toISOString() }).eq('id', contact_id)
  }

  revalidatePath(`/admin/crm/${contact_id}`)
  return { ok: true, message: 'Logged.' }
}

export async function addTask(fd: FormData): Promise<ActionResult> {
  const admin = await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const contact_id = s(fd.get('contact_id'))
  const title = s(fd.get('title'))
  if (!contact_id || !title) return { ok: false, message: 'Task needs a title.' }

  const { error } = await supabase.from('crm_tasks').insert({
    contact_id,
    title,
    due_date: orNull(s(fd.get('due_date'))),
    assignee: orNull(s(fd.get('assignee'))) ?? admin.email,
    created_by: admin.email,
  })
  if (error) return { ok: false, message: error.message }
  revalidatePath(`/admin/crm/${contact_id}`)
  revalidatePath('/admin/crm')
  return { ok: true, message: 'Task added.' }
}

export async function toggleTask(fd: FormData): Promise<void> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const id = s(fd.get('id'))
  const contact_id = s(fd.get('contact_id'))
  const done = s(fd.get('done')) === 'true'
  if (id) {
    await supabase
      .from('crm_tasks')
      .update({ done, done_at: done ? new Date().toISOString() : null })
      .eq('id', id)
  }
  if (contact_id) revalidatePath(`/admin/crm/${contact_id}`)
  revalidatePath('/admin/crm')
}

export async function deleteTask(fd: FormData): Promise<void> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()
  const id = s(fd.get('id'))
  const contact_id = s(fd.get('contact_id'))
  if (id) await supabase.from('crm_tasks').delete().eq('id', id)
  if (contact_id) revalidatePath(`/admin/crm/${contact_id}`)
}

// Pull existing first-party signals into the CRM as contacts. Idempotent:
// dedupes on (kind, external_ref) so re-running only adds what's new.
//   customers  ← waitlist / demo_requests / magnet_requests / field_guide_leads
//   investors  ← deck_links (everyone who got a tracked deck link)
export async function ingestLeads(): Promise<ActionResult> {
  await requireAdmin()
  const supabase = await createSupabaseServerClient()

  const { data: existing } = await supabase.from('crm_contacts').select('kind, external_ref').limit(50000)
  const have = new Set(
    ((existing as { kind: string; external_ref: string | null }[] | null) ?? [])
      .filter((r) => r.external_ref)
      .map((r) => `${r.kind}:${r.external_ref}`),
  )

  type Row = Record<string, unknown>
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null)

  const inserts: Record<string, unknown>[] = []

  // Customers — one contact per email (warmest source wins the stage).
  const customerByEmail = new Map<string, Record<string, unknown>>()
  const sourceRank: Record<string, number> = { demo: 4, field_guide: 3, magnet: 2, waitlist: 1 }
  const stageForSource: Record<string, string> = { demo: 'qualified', field_guide: 'lead', magnet: 'lead', waitlist: 'lead' }

  async function pull(table: string, source: string) {
    const { data } = await supabase.from(table).select('*').limit(5000)
    for (const r of (data as Row[] | null) ?? []) {
      const email = str(r.email)?.toLowerCase()
      if (!email) continue
      const ref = `customer:${email}`
      if (have.has(ref)) continue
      const cur = customerByEmail.get(email)
      const better = !cur || (sourceRank[source] ?? 0) > (sourceRank[(cur._source as string)] ?? 0)
      if (better) {
        customerByEmail.set(email, {
          kind: 'customer',
          name: str(r.name) ?? str(r.first_name) ?? email.split('@')[0],
          email,
          company: str(r.company),
          stage: stageForSource[source],
          source,
          priority: 'medium',
          external_ref: email,
          _source: source,
        })
      }
    }
  }

  await pull('waitlist', 'waitlist')
  await pull('demo_requests', 'demo')
  await pull('magnet_requests', 'magnet')
  await pull('field_guide_leads', 'field_guide')

  for (const row of customerByEmail.values()) {
    delete row._source
    inserts.push(row)
  }

  // Investors — one per deck link.
  const { data: deck } = await supabase
    .from('deck_links')
    .select('id, recipient_name, recipient_org, created_at')
    .limit(5000)
  for (const d of (deck as Row[] | null) ?? []) {
    const ref = `deck:${d.id}`
    if (have.has(`investor:${ref}`)) continue
    inserts.push({
      kind: 'investor',
      name: str(d.recipient_name) ?? 'Investor',
      company: str(d.recipient_org),
      stage: 'pitched',
      source: 'deck',
      priority: 'medium',
      external_ref: ref,
    })
  }

  if (inserts.length === 0) {
    return { ok: true, message: 'Already up to date — no new contacts to import.' }
  }

  const { error } = await supabase.from('crm_contacts').insert(inserts)
  if (error) return { ok: false, message: error.message }

  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/contacts')
  return { ok: true, message: `Imported ${inserts.length} contact${inserts.length === 1 ? '' : 's'}.` }
}
