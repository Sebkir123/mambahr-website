import { ImageResponse } from 'next/og'
import { markSvg } from '@/content/brand-mark'

// The site's nav lockup (gold mark + "MambaHR" in Fraunces) as a PNG for the
// email header: mail apps cannot load the site's fonts or its CSS-mask mark.
// Drawn at 3x; the email shows it at 126 x 24.
export const dynamic = 'force-static'

const W = 378
const H = 72

async function fraunces(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Fraunces:wght@400&text=${encodeURIComponent(text)}`)).text()
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    return m ? await (await fetch(m[1])).arrayBuffer() : null
  } catch {
    return null
  }
}

export async function GET() {
  const font = await fraunces('MambaHR')
  const mark = `data:image/svg+xml;base64,${Buffer.from(markSvg('#7A5A2E')).toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', alignItems: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={60} height={60} alt="" />
        <span style={{ marginLeft: 16, fontFamily: 'Fraunces', fontSize: 54, letterSpacing: '-0.01em', color: '#1A1A19' }}>MambaHR</span>
      </div>
    ),
    { width: W, height: H, fonts: font ? [{ name: 'Fraunces', data: font, weight: 400, style: 'normal' }] : undefined },
  )
}
