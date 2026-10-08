import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog-queries'
import { OG_SIZE, OgCard, ogFonts } from '@/components/og/og-card'

export const dynamic = 'force-dynamic'

// Branded fallback OG image for posts without a cover/OG upload.
// Admin-uploaded cover/OG images take precedence (see generateMetadata).
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const title = (post?.meta_title || post?.title || 'MambaHR').slice(0, 120)
  const tag = post?.tags?.[0] || 'MambaHR Blog'
  const fonts = await ogFonts(title + tag)

  return new ImageResponse(<OgCard eyebrow={tag} title={title} serif={!!fonts} />, { ...OG_SIZE, fonts })
}
