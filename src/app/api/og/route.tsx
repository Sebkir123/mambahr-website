import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// In-memory rate limiter. Edge instances are short-lived so this is a
// per-instance "spam dampener" rather than a hard global cap.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 60
const ipBuckets = new Map<string, number[]>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (ipBuckets.get(ip) ?? []).filter((t) => t > cutoff)
  if (timestamps.length >= RATE_LIMIT_MAX) return false
  timestamps.push(now)
  ipBuckets.set(ip, timestamps)
  return true
}

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(ip)) {
    return new Response('Too many requests', { status: 429, headers: { 'Retry-After': '3600' } })
  }

  try {
    const { searchParams } = new URL(request.url)

    const titleLine1 = searchParams.get('line1') || 'The HR agent'
    const titleLine2 = searchParams.get('line2') || 'that never '
    const highlight = searchParams.get('highlight') || 'calls in sick.'
    
    const subtitle = searchParams.has('subtitle') 
      ? searchParams.get('subtitle') 
      : 'The autonomous AI agent for people operations. Leave, onboarding,\nchange management — handled in seconds.'
    
    const bottomRight = searchParams.has('bottomRight')
      ? searchParams.get('bottomRight')
      : 'Leave   ·   Onboarding   ·   Offboarding   ·   Change Mgmt'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#0A0A0A',
            backgroundImage: 'radial-gradient(circle at 80% 120%, rgba(176, 141, 87, 0.25) 0%, rgba(10, 10, 10, 1) 60%)',
            padding: '80px 100px',
            position: 'relative',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Subtle Grid Background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              zIndex: 0,
            }}
          />

          {/* Decorative Gold Particles */}
          <div style={{ position: 'absolute', top: '15%', left: '35%', width: 2, height: 2, backgroundColor: '#D4AF37', borderRadius: '50%', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '25%', right: '20%', width: 3, height: 3, backgroundColor: '#D4AF37', borderRadius: '50%', opacity: 0.4 }} />
          <div style={{ position: 'absolute', bottom: '40%', left: '10%', width: 2, height: 2, backgroundColor: '#D4AF37', borderRadius: '50%', opacity: 0.3 }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '40%', width: 3, height: 3, backgroundColor: '#D4AF37', borderRadius: '50%', opacity: 0.5 }} />

          {/* Top Logo */}
          <div style={{ position: 'absolute', top: 70, left: 100, display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 52, fontFamily: 'serif', letterSpacing: '-0.03em', fontWeight: 400 }}>
              MambaHR
            </span>
          </div>

          {/* Main Text Area */}
          <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, marginTop: 40 }}>
            {/* Headline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 100,
                fontWeight: 900,
                color: 'white',
                lineHeight: 0.95,
                letterSpacing: '-0.05em',
              }}
            >
              <span style={{ display: 'block' }}>{titleLine1}</span>
              <div style={{ display: 'flex', gap: '20px' }}>
                <span>{titleLine2}</span>
                <span style={{ color: '#A68453' }}>{highlight}</span>
              </div>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: 32,
                  color: '#A1A1AA',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  marginTop: 48,
                  fontWeight: 400,
                  maxWidth: 800,
                }}
              >
                {subtitle.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Left URL */}
          <div style={{ position: 'absolute', bottom: 70, left: 100, display: 'flex' }}>
            <span style={{ color: '#71717A', fontSize: 20, letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              mambahr.com
            </span>
          </div>

          {/* Bottom Right Links */}
          {bottomRight && (
            <div style={{ position: 'absolute', bottom: 70, right: 100, display: 'flex' }}>
              <span style={{ color: '#71717A', fontSize: 20, letterSpacing: '0.02em', fontWeight: 500 }}>
                {bottomRight}
              </span>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('[api/og] image generation failed:', message)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
