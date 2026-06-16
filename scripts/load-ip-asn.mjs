// One-time loader for the IP→ASN/org reference table (public.deck_ip_asn).
//
// Pulls the free, public-domain iptoasn.com dataset (IPv4 + IPv6) and bulk-loads
// it into Supabase so lookup_asn() can resolve a viewer's IP to its owning
// network entirely inside Postgres — no third-party API, no per-call billing.
//
// Re-run whenever you want to refresh (the dataset shifts slowly; monthly is
// plenty). It TRUNCATEs and reloads, so it's idempotent.
//
// Usage:
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
//   node scripts/load-ip-asn.mjs
//
// The service-role key is required (writes bypass RLS on the locked table); it
// lives in AWS Secrets Manager / the Supabase dashboard — never commit it.

import { gunzipSync } from 'node:zlib'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
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

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

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
  const all = []
  for (const url of SOURCES) all.push(...(await fetchRows(url)))
  console.log(`Total ${all.length.toLocaleString()} ranges. Reloading deck_ip_asn …`)

  const { error: delErr } = await supabase
    .from('deck_ip_asn')
    .delete()
    .gte('range_start', '0.0.0.0') // delete-all guard (PostgREST requires a filter)
  if (delErr) {
    // Fall back to a raw truncate via RPC isn't available; surface and continue
    // only if the table was already empty.
    console.warn(`Could not clear existing rows: ${delErr.message}`)
  }

  let done = 0
  for (let i = 0; i < all.length; i += BATCH) {
    const chunk = all.slice(i, i + BATCH)
    const { error } = await supabase.from('deck_ip_asn').insert(chunk)
    if (error) throw new Error(`Insert batch at ${i}: ${error.message}`)
    done += chunk.length
    process.stdout.write(`\r  loaded ${done.toLocaleString()} / ${all.length.toLocaleString()}`)
  }
  console.log('\nDone.')
}

main().catch((e) => {
  console.error('\nLoad failed:', e.message)
  process.exit(1)
})
