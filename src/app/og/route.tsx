import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

// Branded per-page OG image: /og?title=...&eyebrow=...  Warm Editorial Premium —
// oat field, gold→violet seam, Fraunces headline, MambaHR wordmark. Marketing
// pages pass their own title so each share/preview is unique (not one generic jpg).
const SIZE = { width: 1200, height: 630 }

async function loadFraunces(text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,${weight}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    if (!m) return null
    return await (await fetch(m[1])).arrayBuffer()
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'The AI HR department').slice(0, 120)
  const eyebrow = (searchParams.get('eyebrow') || 'MambaHR').slice(0, 40)

  const glyphs = title + eyebrow + 'MambaHR'
  const [serif, serifBold] = await Promise.all([loadFraunces(glyphs, 400), loadFraunces(glyphs, 600)])
  const fonts = [
    ...(serif ? [{ name: 'Fraunces', data: serif, weight: 400 as const, style: 'normal' as const }] : []),
    ...(serifBold ? [{ name: 'Fraunces', data: serifBold, weight: 600 as const, style: 'normal' as const }] : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#FEFDFA',
          backgroundImage:
            'radial-gradient(120% 120% at 12% 0%, rgba(196,154,108,0.22), transparent 55%), radial-gradient(120% 120% at 100% 100%, rgba(106,93,166,0.16), transparent 55%)',
          fontFamily: fonts.length ? 'Fraunces' : 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #B98A4E, #6A5DA6)' }} />
            <div style={{ fontSize: 30, fontWeight: 600, color: '#1A1A19', letterSpacing: '-0.02em' }}>MambaHR</div>
          </div>
          <div style={{ fontSize: 20, fontFamily: 'sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6B4E26' }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ fontSize: title.length > 70 ? 58 : 76, lineHeight: 1.04, letterSpacing: '-0.03em', color: '#1A1A19', maxWidth: 1040, display: 'flex' }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 96, height: 4, borderRadius: 4, background: 'linear-gradient(100deg, #B98A4E, #6A5DA6)' }} />
          <div style={{ fontSize: 22, fontFamily: 'sans-serif', color: '#7A7A75' }}>The AI HR department · mambahr.com</div>
        </div>
      </div>
    ),
    { ...SIZE, fonts: fonts.length ? fonts : undefined },
  )
}
