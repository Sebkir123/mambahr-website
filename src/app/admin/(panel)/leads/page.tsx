import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getAllLeads } from '@/lib/admin-analytics'
import { LEAD_SOURCES, type LeadFilter } from '@/lib/admin-lead-filters'
import LeadsTable from './leads-table'
import DataNotice from '../_components/data-notice'
import ui from '../admin-ui.module.css'
export const dynamic = 'force-dynamic'
export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  await requireAdmin()
  const [{ source }, { leads, warnings }] = await Promise.all([searchParams, getAllLeads()])
  const active = LEAD_SOURCES.includes(source as LeadFilter) ? source as LeadFilter : 'all'
  return <><div className={ui.header}><div><h1 className={ui.h1}>Incoming leads</h1><p className={ui.subtitle}>Every request in one place. Find a lead, reach out, and move the conversation forward.</p></div><Link href="/admin/crm?kind=customer" className={ui.btnGhost}>Open customer pipeline</Link></div><DataNotice warnings={warnings} /><LeadsTable leads={leads} initialSource={active} /></>
}
