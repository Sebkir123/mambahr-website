import 'server-only'
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { serviceDb } from '@/lib/supabase/service'
import {
  STAGES,
  WON_STAGES,
  LOST_STAGES,
  type Contact,
  type Activity,
  type Task,
  type ContactKind,
} from '@/lib/crm-types'

// CRM data access for the admin panel. Reads crm_contacts / crm_activities /
// crm_tasks AS THE LOGGED-IN ADMIN (RLS: is_admin() = @mambahr.com). Every
// caller is behind requireAdmin(). No service-role key — RLS is the gate.
// Pure types + helpers live in ./crm-types (client-safe); re-exported here so
// server callers can keep importing everything from '@/lib/crm'.
export * from '@/lib/crm-types'

const CONTACT_COLS =
  'id, kind, name, email, company, title, stage, owner, source, value, priority, linkedin_url, website, location, tags, notes, next_step, next_step_due, last_contacted_at, external_ref, created_at, updated_at'

export type Dashboard = {
  warnings: string[]
  byKind: Record<ContactKind, {
    total: number
    open: number
    won: number
    lost: number
    openValue: number
    wonValue: number
    winRatePct: number
    byStage: { key: string; label: string; count: number; value: number }[]
  }>
  upcomingTasks: (Task & { contactName: string; contactKind: ContactKind })[]
  openTaskCount: number
  recent: Contact[]
}

function num(v: unknown): number {
  const n = typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : 0
  return Number.isFinite(n) ? n : 0
}

// Dashboard stats are cached 20s (service-role read, admin-gated at the page) so
// the Overview / Investors / Customers pages don't re-query on every visit.
const cachedDashboard = unstable_cache(async () => computeCrmDashboard(serviceDb()!), ['crm-dashboard-v1'], { revalidate: 20 })

export async function getCrmDashboard(): Promise<Dashboard> {
  if (serviceDb()) return cachedDashboard()
  return computeCrmDashboard(await createSupabaseServerClient())
}

async function computeCrmDashboard(supabase: SupabaseClient): Promise<Dashboard> {
  const warnings: string[] = []

  const { data: cRows, error: cErr } = await supabase
    .from('crm_contacts')
    .select(CONTACT_COLS)
    .order('updated_at', { ascending: false })
    .limit(10000)
  if (cErr) warnings.push(`Could not read crm_contacts: ${cErr.message}`)
  const contacts = ((cRows as Contact[] | null) ?? []).map((c) => ({ ...c, value: c.value == null ? null : num(c.value) }))

  const { data: tRows, error: tErr, count: openTaskCount } = await supabase
    .from('crm_tasks')
    .select('id, contact_id, title, due_date, done, done_at, assignee, created_at', { count: 'exact' })
    .eq('done', false)
    .order('due_date', { ascending: true, nullsFirst: false })
    .limit(50)
  if (tErr) warnings.push(`Could not read crm_tasks: ${tErr.message}`)
  const openTasks = (tRows as Task[] | null) ?? []

  const byNameKind = new Map(contacts.map((c) => [c.id, c]))
  const upcomingTasks = openTasks
    .map((t) => {
      const c = byNameKind.get(t.contact_id)
      return { ...t, contactName: c?.name ?? 'Unknown', contactKind: (c?.kind ?? 'customer') as ContactKind }
    })
    .slice(0, 8)

  function summarize(kind: ContactKind) {
    const list = contacts.filter((c) => c.kind === kind)
    const won = list.filter((c) => WON_STAGES.has(c.stage))
    const lost = list.filter((c) => LOST_STAGES.has(c.stage))
    const open = list.filter((c) => !WON_STAGES.has(c.stage) && !LOST_STAGES.has(c.stage))
    const decided = won.length + lost.length
    return {
      total: list.length,
      open: open.length,
      won: won.length,
      lost: lost.length,
      openValue: open.reduce((s, c) => s + (c.value ?? 0), 0),
      wonValue: won.reduce((s, c) => s + (c.value ?? 0), 0),
      winRatePct: decided ? Math.round((won.length / decided) * 100) : 0,
      byStage: STAGES[kind].map((st) => {
        const inStage = list.filter((c) => c.stage === st.key)
        return { key: st.key, label: st.label, count: inStage.length, value: inStage.reduce((s, c) => s + (c.value ?? 0), 0) }
      }),
    }
  }

  return {
    warnings,
    byKind: { customer: summarize('customer'), investor: summarize('investor') },
    upcomingTasks,
    openTaskCount: openTaskCount ?? openTasks.length,
    recent: contacts.slice(0, 6),
  }
}

// Board / list query. Returns every contact of a kind (bounded), newest-touched
// first; filtering + grouping into columns happens in the page.
export async function getContactsByKind(kind: ContactKind): Promise<{ contacts: Contact[]; warnings: string[] }> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('crm_contacts')
    .select(CONTACT_COLS)
    .eq('kind', kind)
    .order('updated_at', { ascending: false })
    .limit(10000)
  const warnings = error ? [`Could not read crm_contacts: ${error.message}`] : []
  const contacts = ((data as Contact[] | null) ?? []).map((c) => ({ ...c, value: c.value == null ? null : num(c.value) }))
  return { contacts, warnings }
}

export type ContactDetail = {
  contact: Contact
  activities: Activity[]
  tasks: Task[]
}

export async function getContact(id: string): Promise<ContactDetail | null> {
  const supabase = await createSupabaseServerClient()
  const { data: c } = await supabase.from('crm_contacts').select(CONTACT_COLS).eq('id', id).maybeSingle()
  if (!c) return null
  const contact = { ...(c as Contact), value: (c as Contact).value == null ? null : num((c as Contact).value) }

  const [{ data: aRows }, { data: tRows }] = await Promise.all([
    supabase
      .from('crm_activities')
      .select('id, contact_id, kind, body, meta, author, created_at')
      .eq('contact_id', id)
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('crm_tasks')
      .select('id, contact_id, title, due_date, done, done_at, assignee, created_at')
      .eq('contact_id', id)
      .order('done', { ascending: true })
      .order('due_date', { ascending: true, nullsFirst: false })
      .limit(200),
  ])

  return {
    contact,
    activities: (aRows as Activity[] | null) ?? [],
    tasks: (tRows as Task[] | null) ?? [],
  }
}
