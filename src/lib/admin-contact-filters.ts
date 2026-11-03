import { WON_STAGES, LOST_STAGES, type Contact } from './crm-types'

export const ATTENTION_FILTERS = ['overdue', 'unassigned', 'next-step'] as const
export type AttentionFilter = '' | typeof ATTENTION_FILTERS[number]
export function contactIsOpen(contact: Pick<Contact, 'stage'>) { return !WON_STAGES.has(contact.stage) && !LOST_STAGES.has(contact.stage) }
export function needsAttention(contact: Contact, filter: string, today = new Date().toISOString().slice(0, 10)): boolean {
  if (!filter) return true
  if (!contactIsOpen(contact)) return false
  if (filter === 'overdue') return Boolean(contact.next_step_due && contact.next_step_due < today)
  if (filter === 'unassigned') return !contact.owner?.trim()
  if (filter === 'next-step') return !contact.next_step?.trim()
  return true
}
export function filterContacts(contacts: Contact[], filters: { kind: string; owner: string; open: boolean; q: string; attention: string }, today?: string): Contact[] {
  const needle = filters.q.trim().toLowerCase()
  return contacts.filter((contact) =>
    (filters.kind === 'all' || !['customer', 'investor'].includes(filters.kind) || contact.kind === filters.kind) &&
    (filters.owner === 'all' || contact.owner === filters.owner) &&
    (!filters.open || contactIsOpen(contact)) && needsAttention(contact, filters.attention, today) &&
    (!needle || [contact.name, contact.company, contact.email, contact.title, contact.location, ...(contact.tags ?? [])].some((value) => value?.toLowerCase().includes(needle)))
  )
}
