import type { Lead } from './admin-analytics'
export const LEAD_SOURCES = ['all', 'waitlist', 'demo', 'magnet', 'partner'] as const
export type LeadFilter = typeof LEAD_SOURCES[number]
export const LEAD_LABEL: Record<LeadFilter, string> = { all: 'All leads', waitlist: 'Early access', demo: 'Demo requests', magnet: 'Resources', partner: 'Partners' }
export function filterLeads(leads: Lead[], source: LeadFilter, query: string): Lead[] {
  const needle = query.trim().toLowerCase()
  return leads.filter((lead) => (source === 'all' || lead.source === source) && (!needle || [lead.name, lead.email, lead.company, lead.detail].some((value) => value?.toLowerCase().includes(needle))))
}
export function csvCell(value: string | null): string {
  const raw = value ?? ''
  const safe = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw
  return `"${safe.replace(/"/g, '""')}"`
}
