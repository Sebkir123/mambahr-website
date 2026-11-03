import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getAllLeads, type Lead } from '@/lib/admin-analytics'
import { csvCell, filterLeads } from '@/lib/admin-lead-filters'

export const dynamic = 'force-dynamic'

const SOURCES: Lead['source'][] = ['waitlist', 'demo', 'magnet', 'partner']

export async function GET(req: NextRequest) {
  await requireAdmin()

  const sourceParam = req.nextUrl.searchParams.get('source')
  const source = SOURCES.includes(sourceParam as Lead['source']) ? (sourceParam as Lead['source']) : null

  const { leads, warnings } = await getAllLeads()
  if (warnings.length) return NextResponse.json({ error: 'Could not export a complete lead list. Refresh and try again.' }, { status: 503 })
  const rows = filterLeads(leads, source ?? 'all', req.nextUrl.searchParams.get('q') ?? '')

  const header = ['email', 'name', 'company', 'source', 'detail', 'captured_at']
  const lines = [
    header.join(','),
    ...rows.map((l) =>
      [
        csvCell(l.email),
        csvCell(l.name),
        csvCell(l.company),
        csvCell(l.source),
        csvCell(l.detail),
        csvCell(l.created_at),
      ].join(','),
    ),
  ]
  // Prepend a UTF-8 BOM so Excel reads accents/unicode correctly.
  const body = '﻿' + lines.join('\r\n')

  const stamp = new Date().toISOString().slice(0, 10)
  const filename = `mambahr-leads${source ? `-${source}` : ''}-${stamp}.csv`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
