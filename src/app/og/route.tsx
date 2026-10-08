import { ImageResponse } from 'next/og'
import { OG_SIZE, OgCard, ogFonts } from '@/components/og/og-card'

// Branded per-page OG image: /og?title=...&eyebrow=...  Marketing pages pass
// their own title so each share/preview is unique (not one generic jpg).
// Not force-static: a static route handler is called with the query string
// stripped, so every page would get the default title.
export const dynamic = 'force-dynamic'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'HR that runs itself.').slice(0, 120)
  const eyebrow = (searchParams.get('eyebrow') || 'MambaHR').slice(0, 40)
  const fonts = await ogFonts(title + eyebrow)

  return new ImageResponse(<OgCard eyebrow={eyebrow} title={title} serif={!!fonts} />, {
    ...OG_SIZE,
    fonts,
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
  })
}
