import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getContactsByKind, stageLabel } from '@/lib/crm'
import { WON_STAGES, LOST_STAGES, type Contact, type ContactKind } from '@/lib/crm-types'

export const dynamic = 'force-dynamic'

// RFC 4180 CSV escaping: wrap in quotes, double any embedded quote.
function csvCell(v: string | number | null | undefined): string {
  const s = v == null ? '' : String(v)
  return `"${s.replace(/"/g, '""')}"`
}

export async function GET(req: NextRequest) {
  await requireAdmin()
  const p = req.nextUrl.searchParams
  const kindParam = p.get('kind')
  const ownerFilter = p.get('owner')
  const openOnly = p.get('open') === '1'
  const q = (p.get('q') ?? '').trim().toLowerCase()

  // Mirror the on-screen filters so the export matches what the admin sees.
  let contacts: Contact[]
  if (kindParam === 'customer' || kindParam === 'investor') {
    contacts = (await getContactsByKind(kindParam as ContactKind)).contacts
  } else {
    const [c, i] = await Promise.all([getContactsByKind('customer'), getContactsByKind('investor')])
    contacts = [...c.contacts, ...i.contacts]
  }
  contacts = contacts
    .filter((c) => (ownerFilter ? c.owner === ownerFilter : true))
    .filter((c) => (openOnly ? !WON_STAGES.has(c.stage) && !LOST_STAGES.has(c.stage) : true))
    .filter((c) =>
      q
        ? [c.name, c.company, c.email, c.title, c.location, ...(c.tags ?? [])]
            .filter(Boolean)
            .some((v) => (v as string).toLowerCase().includes(q))
        : true,
    )
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

  const header = ['name', 'type', 'company', 'title', 'email', 'stage', 'value_usd', 'priority', 'owner', 'source', 'location', 'linkedin', 'website', 'tags', 'next_step', 'next_step_due', 'created_at', 'updated_at']
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
        csvCell(c.value ?? ''),
        csvCell(c.priority),
        csvCell(c.owner),
        csvCell(c.source),
        csvCell(c.location),
        csvCell(c.linkedin_url),
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
