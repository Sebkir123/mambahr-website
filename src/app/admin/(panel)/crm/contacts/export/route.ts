import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getContactsByKind, stageLabel } from '@/lib/crm'
import type { Contact } from '@/lib/crm-types'
import { filterContacts } from '@/lib/admin-contact-filters'
import { csvCell } from '@/lib/admin-lead-filters'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await requireAdmin()
  const p = req.nextUrl.searchParams
  const kindParam = p.get('kind')
  // Do not deliver an apparently complete export when a source failed or was capped.
  const results = await Promise.all((kindParam === 'customer' || kindParam === 'investor' ? [kindParam] as const : ['customer', 'investor'] as const).map(getContactsByKind))
  if (results.some((result) => result.warnings.length)) return NextResponse.json({ error: 'The full contact list is unavailable. Refresh and try again.' }, { status: 503 })
  const contacts: Contact[] = filterContacts(results.flatMap((result) => result.contacts), {
    kind: kindParam ?? 'all', owner: p.get('owner') ?? 'all', open: p.get('open') === '1', q: p.get('q') ?? '', attention: p.get('attention') ?? '',
  }).sort((a, b) => b.updated_at.localeCompare(a.updated_at))

  const header = ['name', 'type', 'company', 'title', 'email', 'stage', 'value_usd', 'priority', 'owner', 'source', 'location', 'website', 'tags', 'next_step', 'next_step_due', 'created_at', 'updated_at']
  const lines = [
    header.join(','),
    ...contacts.map((c) =>
      [
        csvCell(c.name),
        csvCell(c.kind),
        csvCell(c.company),
        csvCell(c.title),
        csvCell(c.email),
        csvCell(stageLabel(c.kind, c.stage)),
        csvCell(c.value == null ? '' : String(c.value)),
        csvCell(c.priority),
        csvCell(c.owner),
        csvCell(c.source),
        csvCell(c.location),
        csvCell(c.website),
        csvCell((c.tags ?? []).join('; ')),
        csvCell(c.next_step),
        csvCell(c.next_step_due),
        csvCell(c.created_at),
        csvCell(c.updated_at),
      ].join(','),
    ),
  ]
  // UTF-8 BOM so Excel reads unicode correctly.
  const body = '﻿' + lines.join('\r\n')

  const stamp = new Date().toISOString().slice(0, 10)
  const filename = `mambahr-crm${kindParam === 'customer' || kindParam === 'investor' ? `-${kindParam}` : ''}-${stamp}.csv`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
