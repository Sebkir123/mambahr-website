import { ImageResponse } from 'next/og'
import { earlyAccessDb, isReferralCode, referralUrl } from '@/lib/early-access'
import { companyFromEmail } from '@/content/early-access'
import { qrSvg } from '@/lib/qr'

// The founding pass as a PNG, for the welcome email. Mail apps cannot be
// trusted with the pass's layout (tables collapse, dashed rules vanish, bar
// widths are ignored), so the email shows this picture of the same design.
// Keyed by the PUBLIC referral code: it shows only what a shared link already
// shows (company, its domain, the join date), never the email address.

const W = 960
const H = 540

async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    return m ? await (await fetch(m[1])).arrayBuffer() : null
  } catch {
    return null
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const ref = code.replace(/\.png$/, '').toLowerCase()
  const db = earlyAccessDb()
  if (!db || !isReferralCode(ref)) return new Response('Not found', { status: 404 })
  const { data } = await db.from('waitlist').select('email, company, created_at').eq('referral_code', ref).maybeSingle()
  if (!data) return new Response('Not found', { status: 404 })

  const domain = String(data.email).split('@')[1] ?? ''
  // A personal inbox (gmail.com, …) is not the company: never print it as one.
  const personal = !companyFromEmail(data.email)
  const name = data.company || companyFromEmail(data.email) || 'Founding member'
  const sub = personal ? (data.company ? 'Founding member' : 'mambahr.com/early-access') : domain
  const joined = new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
  const passNo = `EA-${ref.slice(0, 6).toUpperCase()}`

  const qr = `data:image/svg+xml;base64,${Buffer.from(qrSvg(referralUrl(ref))).toString('base64')}`
  const sansText = `MambaHR FOUNDING SPOT PRICING JOINED Founding Scan to give a founding spot ${joined} ${sub}`
  const [serif, serifSemi, sans, sansSemi, mono] = await Promise.all([
    googleFont('Fraunces', 400, name + 'MambaHR'),
    googleFont('Fraunces', 600, 'MambaHR'),
    googleFont('Inter', 400, sansText),
    googleFont('Inter', 600, sansText),
    googleFont('JetBrains+Mono', 500, passNo),
  ])
  const fonts = [
    serif && { name: 'Fraunces', data: serif, weight: 400 as const, style: 'normal' as const },
    serifSemi && { name: 'Fraunces', data: serifSemi, weight: 600 as const, style: 'normal' as const },
    sans && { name: 'Inter', data: sans, weight: 400 as const, style: 'normal' as const },
    sansSemi && { name: 'Inter', data: sansSemi, weight: 600 as const, style: 'normal' as const },
    mono && { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f))

  const label = { fontFamily: 'Inter', fontSize: 19, fontWeight: 600, letterSpacing: '0.08em', color: '#8C8276' } as const
  const value = { fontFamily: 'Inter', fontSize: 30, fontWeight: 600, color: '#1A1A19', marginTop: 6 } as const

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 44,
          backgroundColor: '#E9B9A6',
          backgroundImage:
            'radial-gradient(60% 70% at 8% 0%, rgba(255,214,160,0.95), rgba(255,214,160,0) 70%), radial-gradient(60% 80% at 100% 30%, rgba(157,143,224,0.95), rgba(157,143,224,0) 70%), linear-gradient(155deg, #F3C796 0%, #EAB2A4 38%, #B9A2D6 68%, #7F71C9 100%)',
        }}
      >
        <div
          style={{
            width: 836,
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(160deg, #FFFFFF, #FFFBF6)',
            borderRadius: 34,
            boxShadow: '0 30px 60px -20px rgba(40,25,70,0.45)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', padding: '36px 52px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Fraunces', fontSize: 30, color: '#1A1A19' }}>
                <span style={{ color: '#8A6535', fontWeight: 600, marginRight: 12 }}>M</span>MambaHR
              </div>
              <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: 19, fontWeight: 600, letterSpacing: '0.08em', color: '#8A6535', background: '#F8EFE3', border: '2px solid #E6D3B8', borderRadius: 999, padding: '8px 18px' }}>
                FOUNDING SPOT
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 34 }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 620 }}>
                <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: name.length <= 12 ? 76 : name.length <= 20 ? 60 : 48, lineHeight: 1.04, letterSpacing: '-0.03em', color: '#1A1A19' }}>{name}</div>
                <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: 28, color: '#7A6F64', marginTop: 12 }}>{sub}</div>
              </div>
              {/* the foil seal */}
              <div
                style={{
                  width: 108,
                  height: 108,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(255,255,255,0.95)',
                  backgroundImage:
                    'radial-gradient(circle at 30% 25%, #FFFFFF 0%, rgba(255,255,255,0) 35%), linear-gradient(135deg, #F6D3A1 0%, #F2B8B0 30%, #D9C2F0 58%, #B8E0E6 82%, #E8F0C4 100%)',
                  boxShadow: '0 10px 24px -10px rgba(60,40,90,0.5)',
                  fontFamily: 'Fraunces',
                  fontWeight: 600,
                  fontSize: 42,
                  color: '#3D2F52',
                }}
              >
                M
              </div>
            </div>
          </div>
          {/* perforation, with the ticket notches cut in the stage colours */}
          <div style={{ display: 'flex', position: 'relative', height: 4, alignItems: 'center' }}>
            <div style={{ display: 'flex', flex: 1, borderTop: '3px dashed #E2D6C6', margin: '0 36px' }} />
            <div style={{ position: 'absolute', left: -22, top: -20, width: 44, height: 44, borderRadius: 999, background: '#EDB59F' }} />
            <div style={{ position: 'absolute', right: -22, top: -20, width: 44, height: 44, borderRadius: 999, background: '#AC9CDB' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px 26px 52px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: 56 }}>
                <span style={label}>PRICING</span>
                <span style={value}>Founding</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={label}>JOINED</span>
                <span style={value}>{joined}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 22 }}>
                <span style={{ fontFamily: 'Mono', fontSize: 23, letterSpacing: '0.14em', color: '#3D3D3A' }}>{passNo}</span>
                <span style={{ fontFamily: 'Inter', fontSize: 18, color: '#8C8276', marginTop: 8 }}>Scan to give a founding spot</span>
              </div>
              <div style={{ display: 'flex', width: 128, height: 128, padding: 10, borderRadius: 18, background: '#FFFFFF', boxShadow: '0 0 0 2px rgba(26,26,25,0.08), 0 10px 22px -12px rgba(40,25,70,0.4)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qr} width={108} height={108} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: fonts.length ? fonts : undefined,
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600' },
    },
  )
}
