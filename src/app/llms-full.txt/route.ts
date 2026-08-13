import { LLMS_FULL_TXT } from '@/lib/llms-content'

export const dynamic = 'force-static'

// /llms-full.txt, the deep companion to /llms.txt, linked from its Optional
// section. An assistant that fetches this one file can answer a buyer's
// question without crawling the whole site. Previously a hand-maintained static
// file in public/ that had drifted (wrong price, withdrawn integrations); it is
// now generated from the same module as /llms.txt.
export function GET() {
  return new Response(LLMS_FULL_TXT, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
