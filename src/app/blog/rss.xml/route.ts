import { getPublishedPosts, effectiveDate } from '@/lib/blog-queries'
import { postUrl, sanitizePostHtml } from '@/lib/blog'

export const dynamic = 'force-dynamic'

const SITE = 'https://mambahr.com'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Wrap HTML in CDATA for <content:encoded>, neutralising any literal "]]>"
// so a stray sequence in the body can't terminate the section early.
function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export async function GET() {
  const posts = await getPublishedPosts()
  const updated = posts[0] ? new Date(effectiveDate(posts[0])).toUTCString() : new Date().toUTCString()

  const items = posts
    .map((p) => {
      const link = `${SITE}${postUrl(p.slug)}`
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(effectiveDate(p)).toUTCString()}</pubDate>
      ${p.author_name ? `<dc:creator>${esc(p.author_name)}</dc:creator>` : ''}
      ${p.excerpt ? `<description>${esc(p.excerpt)}</description>` : ''}
      ${p.body_html ? `<content:encoded>${cdata(sanitizePostHtml(p.body_html))}</content:encoded>` : ''}
      ${(p.tags || []).map((t) => `<category>${esc(t)}</category>`).join('\n      ')}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>MambaHR Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Field notes on AI in HR, compliance, hiring, and running a people function end to end.</description>
    <language>en-us</language>
    <lastBuildDate>${updated}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=3600',
    },
  })
}
