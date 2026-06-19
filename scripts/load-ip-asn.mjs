// One-time loader for the IP→ASN/org reference table (public.deck_ip_asn).
//
// Pulls the free, public-domain iptoasn.com dataset (IPv4 + IPv6) and bulk-loads
// it into Supabase so lookup_asn() can resolve a viewer's IP to its owning
// network entirely inside Postgres — no third-party API, no per-call billing.
//
// Re-run whenever you want to refresh (the dataset shifts slowly; monthly is
// plenty). It clears the table and reloads, so it's idempotent.
//
// Usage:
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
//   node scripts/load-ip-asn.mjs
//
// The service-role key is required (writes bypass RLS on the locked table); it
// lives in AWS Secrets Manager / the Supabase dashboard — never commit it.
//
// Talks to PostgREST directly via fetch — deliberately NO @supabase/supabase-js,
// which drags in a Realtime WebSocket client that crashes on Node < 22. This
// script only needs plain REST, so it stays dependency-free and Node-proof.

import { gunzipSync } from 'node:zlib'

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.')
  process.exit(1)
}

const SOURCES = [
  'https://iptoasn.com/data/ip2asn-v4.tsv.gz',
  'https://iptoasn.com/data/ip2asn-v6.tsv.gz',
]
const BATCH = 5000
const REST = `${SUPABASE_URL}/rest/v1/deck_ip_asn`
const AUTH = {
  apikey: SERVICE_KEY,
  authorization: `Bearer ${SERVICE_KEY}`,
}

async function fetchRows(url) {
  process.stdout.write(`Fetching ${url} … `)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  const gz = Buffer.from(await res.arrayBuffer())
  const tsv = gunzipSync(gz).toString('utf8')
  const rows = []
  for (const line of tsv.split('\n')) {
    if (!line) continue
    // range_start  range_end  AS_number  country_code  AS_description
    const [start, end, asNum, , ...descParts] = line.split('\t')
    const num = Number(asNum)
    if (!start || !end || !num) continue // AS0 = not routed → skip
    const org = descParts.join('\t').trim()
    rows.push({
      range_start: start,
      range_end: end,
      asn: `AS${num}`,
      asn_org: org || null,
    })
  }
  console.log(`${rows.length.toLocaleString()} ranges`)
  return rows
}

async function main() {
  // concat, not push(...rows): spreading ~450k elements as call arguments
  // overflows the stack.
  let all = []
  for (const url of SOURCES) all = all.concat(await fetchRows(url))
  console.log(`Total ${all.length.toLocaleString()} ranges. Reloading deck_ip_asn …`)

  // Clear existing rows. PostgREST requires a filter on bulk delete; asn is
  // NOT NULL on every row, so `asn=not.is.null` matches the whole table.
  const del = await fetch(`${REST}?asn=not.is.null`, {
    method: 'DELETE',
    headers: { ...AUTH, prefer: 'return=minimal' },
  })
  if (!del.ok && del.status !== 404) {
    console.warn(`Could not clear existing rows (HTTP ${del.status}): ${await del.text()}`)
  }

  let done = 0
  for (let i = 0; i < all.length; i += BATCH) {
    const chunk = all.slice(i, i + BATCH)
    const res = await fetch(REST, {
      method: 'POST',
      headers: { ...AUTH, 'content-type': 'application/json', prefer: 'return=minimal' },
      body: JSON.stringify(chunk),
    })
    if (!res.ok) throw new Error(`Insert batch at ${i} (HTTP ${res.status}): ${await res.text()}`)
    done += chunk.length
    process.stdout.write(`\r  loaded ${done.toLocaleString()} / ${all.length.toLocaleString()}`)
  }
  console.log('\nDone.')
}

main().catch((e) => {
  console.error('\nLoad failed:', e.message)
  process.exit(1)
})
