// The share cards behind /og (one per page), /og/home (the homepage and the
// default) and the blog's fallback. Warm Soft + Dusk, as on the site: the oat
// ground with its two soft glows, the gold-to-iris stage, Fraunces headlines
// and Geist for everything else. ImageResponse cannot read CSS variables, so
// the token values are written out (globals.css is the source).

const OAT = '#F5F2EC' // --bg
const INK = '#1A1A19' // --text
const INK_2 = '#3D3D3A' // --text-muted
const FAINT = '#5C5C58' // --text-faint
const GOLD = '#7B5A2F' // --gold
const VIOLET = '#5F5394' // --violet
const GREEN = '#0F6C31' // --green
const STAGE = 'linear-gradient(155deg, #F2D3A6 0%, #EDB9B9 36%, #C9B4E6 68%, #8F82DA 100%)' // --stage-field
const DUSK = 'linear-gradient(110deg, #926D3E, #A95E6B 50%, #6A5BC4)' // --grad
// The hero's sky: a gold glow top left, an iris glow top right.
const SKY = [
  'radial-gradient(circle at 8% -10%, rgba(226, 186, 130, 0.42), rgba(226, 186, 130, 0) 46%)',
  'radial-gradient(circle at 70% -20%, rgba(150, 136, 222, 0.30), rgba(150, 136, 222, 0) 50%)',
].join(', ')
// Glows over the stage: champagne top left, iris right, light centre.
const STAGE_GLOWS = [
  'radial-gradient(circle at 18% 12%, rgba(250, 222, 182, 0.85), rgba(250, 222, 182, 0) 45%)',
  'radial-gradient(circle at 92% 60%, rgba(160, 146, 228, 0.75), rgba(160, 146, 228, 0) 50%)',
  'radial-gradient(circle at 45% 40%, rgba(255, 246, 234, 0.55), rgba(255, 246, 234, 0) 40%)',
].join(', ')

// The official serif M (public/brand/mamba-mark-light.svg), viewBox 0 0 1665 1665.
const M_PATH =
  'M 127 266.263 L 127 282.582 143.250 283.843 C 175.077 286.311, 195.150 290.535, 210.500 297.992 C 237.139 310.934, 246.903 334.793, 249.997 394.500 C 251.344 420.484, 251.331 1166.452, 249.983 1202 C 246.884 1283.765, 237.108 1322.226, 213.491 1345.570 C 198.781 1360.110, 171.763 1371.873, 140.083 1377.531 C 135.362 1378.374, 130.487 1379.283, 129.250 1379.551 C 127.027 1380.032, 127 1380.236, 127 1396.599 L 127 1413.159 129.750 1412.591 C 157.868 1406.790, 382.657 1406.595, 445.500 1412.318 C 447.415 1412.492, 447.512 1411.812, 447.775 1396.275 C 448.049 1380.094, 448.043 1380.049, 445.775 1379.612 C 444.524 1379.370, 437.875 1378.412, 431 1377.481 C 398.419 1373.071, 369.411 1365.249, 350.584 1355.797 C 339.901 1350.433, 334.707 1346.881, 327.650 1340.112 C 300.424 1313.998, 291.619 1276.389, 288.994 1175 C 287.813 1129.407, 287.680 357.243, 288.853 358.550 C 289.321 359.072, 389.109 596.761, 510.603 886.746 L 731.500 1413.992 744.819 1413.746 L 758.138 1413.500 953.590 903 C 1061.089 622.225, 1149.912 390.250, 1150.976 387.500 C 1152.892 382.547, 1152.907 386.700, 1152.671 832.500 C 1152.443 1261.097, 1152.346 1283.071, 1150.621 1294.500 C 1148.073 1311.381, 1143.755 1327.721, 1139.509 1336.548 C 1135.038 1345.844, 1125.715 1356.024, 1116.864 1361.276 C 1103.574 1369.161, 1077.172 1375.132, 1043 1377.982 C 1035.575 1378.601, 1027.588 1379.336, 1025.250 1379.615 L 1021 1380.123 1021 1396.623 L 1021 1413.123 1025.250 1412.546 C 1068.485 1406.683, 1490.444 1406.684, 1533.750 1412.547 L 1538 1413.123 1538 1396.623 L 1538 1380.123 1533.750 1379.623 C 1531.412 1379.348, 1523.650 1378.605, 1516.500 1377.972 C 1489.233 1375.557, 1465.309 1370.230, 1452.781 1363.782 C 1447.210 1360.915, 1443.257 1357.896, 1438.571 1352.929 C 1426.719 1340.365, 1421.251 1324.963, 1417.295 1293 C 1415.593 1279.249, 1415.500 1255.396, 1415.500 831 C 1415.500 406.604, 1415.593 382.751, 1417.295 369 C 1421.311 336.558, 1426.929 321.006, 1438.974 308.990 C 1453.690 294.309, 1477.219 287.085, 1520.750 283.883 L 1538 282.614 1538 266.283 L 1538 249.953 1530.250 250.487 C 1520.761 251.141, 1459.924 252.731, 1395.500 254.010 C 1369.100 254.534, 1306.100 254.971, 1255.500 254.982 L 1163.500 255.003 1013.092 649.751 C 930.367 866.863, 862.188 1045.496, 861.583 1046.713 C 860.629 1048.632, 838.453 995.727, 695.057 649.436 L 529.632 249.946 517.066 250.484 C 466.394 252.656, 346.550 254.981, 285.500 254.978 C 229.508 254.974, 163.979 253.033, 133.250 250.466 L 127 249.944 127 266.263'

export const OG_SIZE = { width: 1200, height: 630 }

// Pull just the glyphs we need from Google Fonts (the official Next.js pattern).
// Requesting css2 without a modern UA returns a truetype src ImageResponse can use.
async function loadGoogleFont(family: string, axes: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    if (!m) return null
    return await (await fetch(m[1])).arrayBuffer()
  } catch {
    return null
  }
}

// Every glyph the cards can draw besides the title: the brand, the fixed
// card copy and digits.
const FIXED =
  'MambaHR mambahr.com HR admin, done for you · FOR BUSY HR TEAMS HR that runs itself. The HR admin, done for you. You make the judgment calls. ' +
  'Priya Nair #people-ops 9:01 @MambaHR Maya signed. She starts Monday. Started when Priya asked in Slack Today Day one for Maya Chen ' +
  'Left for you: Form I-9 Section 2 by Thursday Assign to me Pick someone else Accounts requested from IT ' +
  'Laptop request sent to IT Sent to Maya The admin, done for you Every step logged Done 0123456789 ’'

type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: 'normal' }

export async function ogFonts(text: string): Promise<Font[] | undefined> {
  const glyphs = FIXED + text + text.toUpperCase()
  const [serif, serifSemi, sans, sansMid, sansSemi] = await Promise.all([
    loadGoogleFont('Fraunces', 'opsz,wght@9..144,400', glyphs),
    loadGoogleFont('Fraunces', 'opsz,wght@9..144,600', glyphs),
    loadGoogleFont('Geist', 'wght@400', glyphs),
    loadGoogleFont('Geist', 'wght@500', glyphs),
    loadGoogleFont('Geist', 'wght@600', glyphs),
  ])
  const fonts: Font[] = [
    ...(serif ? [{ name: 'Fraunces', data: serif, weight: 400 as const, style: 'normal' as const }] : []),
    ...(serifSemi ? [{ name: 'Fraunces', data: serifSemi, weight: 600 as const, style: 'normal' as const }] : []),
    ...(sans ? [{ name: 'Geist', data: sans, weight: 400 as const, style: 'normal' as const }] : []),
    ...(sansMid ? [{ name: 'Geist', data: sansMid, weight: 500 as const, style: 'normal' as const }] : []),
    ...(sansSemi ? [{ name: 'Geist', data: sansSemi, weight: 600 as const, style: 'normal' as const }] : []),
  ]
  return fonts.length ? fonts : undefined
}

const SERIF = 'Fraunces, serif'
const SANS = 'Geist, sans-serif'

function Mark({ size, color = GOLD }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1665 1665">
      <path d={M_PATH} fill={color} fillRule="evenodd" />
    </svg>
  )
}

function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Mark size={40} />
      <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: INK, letterSpacing: '-0.02em' }}>MambaHR</div>
    </div>
  )
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>
      {children}
    </div>
  )
}

// The MambaHR agent mark: the M on white inside the Dusk ring.
function AgentMark({ size }: { size: number }) {
  const ring = Math.max(2, Math.round(size * 0.06))
  return (
    <div style={{ display: 'flex', width: size, height: size, borderRadius: size, backgroundImage: DUSK, padding: ring }}>
      <div style={{ display: 'flex', flex: 1, borderRadius: size, background: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        <Mark size={Math.round(size * 0.5)} color="#926D3E" />
      </div>
    </div>
  )
}

function Tick() {
  return (
    <div style={{ display: 'flex', width: 22, height: 22, borderRadius: 22, background: GREEN, alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      <svg width="13" height="13" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  )
}

// The gold-to-iris stage, bleeding off the right edge.
function Stage({ left, children }: { left: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: 40,
        right: -40,
        bottom: 40,
        display: 'flex',
        borderRadius: 32,
        backgroundImage: `${STAGE_GLOWS}, ${STAGE}`,
        boxShadow: '0 40px 80px -40px rgba(90, 60, 110, 0.45)',
      }}
    >
      {children}
    </div>
  )
}

const glass = {
  display: 'flex',
  background: 'rgba(255, 255, 255, 0.74)',
  border: '1px solid rgba(255, 255, 255, 0.9)',
  borderRadius: 20,
  boxShadow: '0 24px 48px -18px rgba(40, 25, 70, 0.45)',
} as const

/* The homepage and default card: the headline beside one product moment,
   the Slack ask and the To do card it became. */
export function OgHome() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: OAT, backgroundImage: SKY, fontFamily: SANS }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 56px 72px', width: 610 }}>
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Eyebrow>For busy HR teams</Eyebrow>
          <div style={{ fontFamily: SERIF, fontSize: 104, lineHeight: 0.94, letterSpacing: '-0.045em', color: INK }}>HR that runs itself.</div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: INK_2, maxWidth: 500 }}>The HR admin, done for you. You make the judgment calls.</div>
        </div>
        <div style={{ fontSize: 21, color: FAINT }}>mambahr.com</div>
      </div>

      <Stage left={680}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '44px 0 0 40px', width: 490 }}>
          {/* The ask, in Slack */}
          <div style={{ ...glass, flexDirection: 'column', padding: '16px 18px', width: 450, gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16 }}>
              <div style={{ display: 'flex', width: 30, height: 30, borderRadius: 8, background: '#E2D5E8', color: '#574566', fontSize: 13, fontWeight: 600, alignItems: 'center', justifyContent: 'center' }}>PN</div>
              <div style={{ fontWeight: 600, color: INK }}>Priya Nair</div>
              <div style={{ color: '#57534C', fontSize: 15 }}>#people-ops · 9:01</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', fontSize: 17, lineHeight: 1.4, color: INK, gap: 6 }}>
              <div style={{ display: 'flex', color: VIOLET, fontWeight: 600, background: 'rgba(95, 83, 148, 0.12)', borderRadius: 5, padding: '1px 6px' }}>@MambaHR</div>
              <div style={{ display: 'flex' }}>Maya signed. She starts Monday.</div>
            </div>
          </div>

          {/* What it became on To do */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: 24, padding: '22px 24px 24px', gap: 12, boxShadow: '0 2px 6px rgba(40, 25, 60, 0.08), 0 30px 60px -22px rgba(40, 25, 60, 0.5)' }}>
            <div style={{ display: 'flex', fontSize: 15, color: FAINT }}>Started when Priya asked in Slack · Today 9:01</div>
            <div style={{ fontFamily: SERIF, fontSize: 34, letterSpacing: '-0.02em', color: INK }}>Day one for Maya Chen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
              {['Form I-9 sent to Maya', 'Accounts requested from IT', 'Laptop request sent to IT'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, color: INK }}>
                  <Tick />
                  {t}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', fontSize: 17, color: INK_2, marginTop: 4 }}>Left for you: Form I-9 Section 2 by Thursday</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <div style={{ display: 'flex', background: INK, color: '#FFFFFF', borderRadius: 999, padding: '11px 20px', fontSize: 17, fontWeight: 500 }}>Assign to me</div>
              <div style={{ display: 'flex', border: '1px solid rgba(0, 0, 0, 0.3)', color: INK, borderRadius: 999, padding: '10px 20px', fontSize: 17, fontWeight: 500 }}>Pick someone else</div>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  )
}

/* One card per page: its section and title, beside the stage with the
   MambaHR mark and the two things every page stands on. */
export function OgCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  const size = title.length > 64 ? 54 : title.length > 40 ? 64 : 74
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: OAT, backgroundImage: SKY, fontFamily: SANS }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 56px 72px', width: 700 }}>
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.035em', color: INK }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 21, color: FAINT }}>
          <div style={{ fontFamily: SERIF, fontSize: 25, color: INK, letterSpacing: '-0.02em' }}>HR that runs itself.</div>
          <div>mambahr.com</div>
        </div>
      </div>

      <Stage left={790}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 40px', width: 410 }}>
          <div style={{ ...glass, flexDirection: 'column', padding: '22px 26px', gap: 16, width: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AgentMark size={44} />
              <div style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: INK, letterSpacing: '-0.02em' }}>MambaHR</div>
            </div>
            {['The admin, done for you', 'Every step logged', 'You make the judgment calls'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, color: INK }}>
                <Tick />
                {t}
              </div>
            ))}
          </div>
        </div>
      </Stage>
    </div>
  )
}
