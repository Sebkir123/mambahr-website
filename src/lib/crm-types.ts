// Pure CRM types + helpers — NO 'server-only', NO db imports — so both server
// queries (lib/crm.ts) and client components can import them. Keep all data
// access in lib/crm.ts; keep only types + pure functions here.

export type ContactKind = 'customer' | 'investor'
export type Priority = 'low' | 'medium' | 'high'
export type ActivityKind = 'note' | 'call' | 'email' | 'meeting' | 'stage_change' | 'created' | 'task'

// Pipeline stages per kind. Ordered — the board renders columns in this order.
export const STAGES: Record<ContactKind, { key: string; label: string }[]> = {
  customer: [
    { key: 'lead', label: 'Lead' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'demo', label: 'Demo' },
    { key: 'proposal', label: 'Proposal' },
    { key: 'won', label: 'Won' },
    { key: 'lost', label: 'Lost' },
  ],
  investor: [
    { key: 'prospect', label: 'Prospect' },
    { key: 'intro', label: 'Intro’d' },
    { key: 'pitched', label: 'Pitched' },
    { key: 'diligence', label: 'Diligence' },
    { key: 'committed', label: 'Committed' },
    { key: 'passed', label: 'Passed' },
  ],
}

export const WON_STAGES = new Set(['won', 'committed'])
export const LOST_STAGES = new Set(['lost', 'passed'])

export function stageLabel(kind: ContactKind, stage: string): string {
  return STAGES[kind].find((s) => s.key === stage)?.label ?? stage
}
export function defaultStage(kind: ContactKind): string {
  return STAGES[kind][0].key
}
export function isValidStage(kind: ContactKind, stage: string): boolean {
  return STAGES[kind].some((s) => s.key === stage)
}

export function formatMoney(v: number | null | undefined): string {
  if (!v) return '—'
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`
  if (v >= 1_000) return `$${Math.round(v / 1_000)}k`
  return `$${v}`
}

export type Contact = {
  id: string
  kind: ContactKind
  name: string
  email: string | null
  company: string | null
  title: string | null
  stage: string
  owner: string | null
  source: string | null
  value: number | null
  priority: Priority
  linkedin_url: string | null
  website: string | null
  location: string | null
  tags: string[]
  notes: string | null
  next_step: string | null
  next_step_due: string | null
  last_contacted_at: string | null
  external_ref: string | null
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  contact_id: string
  kind: ActivityKind
  body: string | null
  meta: Record<string, unknown>
  author: string | null
  created_at: string
}

export type Task = {
  id: string
  contact_id: string
  title: string
  due_date: string | null
  done: boolean
  done_at: string | null
  assignee: string | null
  created_at: string
}
