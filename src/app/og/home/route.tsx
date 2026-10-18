import { ImageResponse } from 'next/og'
import { OG_SIZE, OgHome, ogFonts } from '@/components/og/og-card'

// The homepage and default share card (/og/home): the headline beside one
// product moment. Rendered once at build and cached.
export const dynamic = 'force-static'

export async function GET() {
  const fonts = await ogFonts('')
  return new ImageResponse(<OgHome />, {
    ...OG_SIZE,
    fonts,
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
  })
}
