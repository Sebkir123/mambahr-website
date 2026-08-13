import { LLMS_TXT } from '@/lib/llms-content'

export const dynamic = 'force-static'

// /llms.txt, the emerging convention that gives AI assistants a curated map of
// the site (we already welcome AI crawlers in robots.txt). Content lives in
// src/lib/llms-content.ts so this file and /llms-full.txt cannot drift apart.
export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
