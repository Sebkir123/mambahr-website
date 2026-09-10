import { requireAdmin } from '@/lib/auth'
import ui from '../admin-ui.module.css'
import styles from './design.module.css'

export const dynamic = 'force-dynamic'

type LogoAsset = { file: string; label: string; note: string; dark: boolean }

const LOGO_ASSETS: LogoAsset[] = [
  { file: 'mamba-lockup-light', label: 'Light mode', note: 'Framed lockup · on light backgrounds', dark: false },
  { file: 'mamba-lockup-dark', label: 'Dark mode', note: 'Framed lockup · on dark backgrounds', dark: true },
]
const ICON_ASSETS: LogoAsset[] = [
  { file: 'mamba-mark-light', label: 'Light mode', note: 'Ink mark · on light backgrounds', dark: false },
  { file: 'mamba-mark-dark', label: 'Dark mode', note: 'Paper mark · on dark backgrounds', dark: true },
]

function AssetCard({ a }: { a: LogoAsset }) {
  return (
    <div className={styles.logoCard}>
      <div className={`${styles.logoPreview} ${a.dark ? styles.logoDark : styles.logoLight}`}>
        {/* Render the PNG (pixel-identical everywhere). Browsers miscompute the
            intrinsic size of these wide-viewBox SVGs as CSS background-images,
            which cropped the preview to just the mark. next/image would re-encode
            the brand PNG, which is exactly what this preview must not do. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/brand/${a.file}.png`} alt={`MambaHR ${a.note}`} className={styles.logoImg} />
      </div>
      <div className={styles.logoMeta}>
        <div>
          <span className={styles.swatchName}>{a.label}</span>
          <span className={styles.logoNote}>{a.note}</span>
        </div>
        <div className={styles.logoActions}>
          <a href={`/brand/${a.file}.svg`} download className={styles.dlBtn}>SVG</a>
          <a href={`/brand/${a.file}.png`} download className={styles.dlBtn}>PNG</a>
        </div>
      </div>
    </div>
  )
}

type Color = { name: string; token: string; value: string; alpha?: boolean; onDark?: boolean }

const SURFACES: Color[] = [
  { name: 'Background', token: '--bg', value: '#FEFDFA' },
  { name: 'Warm', token: '--bg-warm', value: '#F4F2EC' },
  { name: 'Cream', token: '--bg-cream', value: '#ECE9E2' },
  { name: 'Surface', token: '--bg-surface', value: '#F8F6F1' },
  { name: 'Elevated', token: '--bg-elevated', value: '#ECE9E2' },
]

const TEXT: Color[] = [
  { name: 'Text', token: '--text', value: '#1A1A19', onDark: true },
  { name: 'Muted', token: '--text-muted', value: '#3D3D3A', onDark: true },
  { name: 'Faint', token: '--text-faint', value: '#7A7A75', onDark: true },
]

const BRAND: Color[] = [
  { name: 'Gold', token: '--gold', value: '#8A6535', onDark: true },
  { name: 'Gold dark', token: '--gold-dark', value: '#6B4E26', onDark: true },
  { name: 'Gold light', token: '--gold-light', value: '#C49A6C' },
  { name: 'Gold tint', token: '--gold-tint', value: '#F2ECE0' },
  { name: 'Violet', token: '--violet', value: '#6A5DA6', onDark: true },
  { name: 'Peach', token: '--peach', value: '#FFE8D6' },
  { name: 'Peach deep', token: '--peach-deep', value: '#FFD8B5' },
]

const BORDERS: Color[] = [
  { name: 'Border', token: '--border', value: 'rgba(0,0,0,0.12)', alpha: true },
  { name: 'Border mid', token: '--border-mid', value: 'rgba(0,0,0,0.18)', alpha: true },
  { name: 'Border faint', token: '--border-faint', value: 'rgba(0,0,0,0.07)', alpha: true },
]

const STATUS: Color[] = [
  { name: 'Green', token: '--green', value: '#16A34A', onDark: true },
  { name: 'Red', token: '--red', value: '#DC2626', onDark: true },
]

const GRADIENTS = [
  { name: 'Brand', token: '--grad', value: 'gold → iris-violet' },
  { name: 'Warm wash', token: '--grad-warm', value: 'peach → rose' },
  { name: 'Gold', token: '--grad-gold', value: 'light gold → gold' },
]

function Swatch({ c }: { c: Color }) {
  return (
    <div className={styles.swatch}>
      <div
        className={c.alpha ? `${styles.swatchChip} ${styles.alpha}` : styles.swatchChip}
        style={c.alpha ? undefined : { background: `var(${c.token})` }}
      >
        {c.alpha && <div style={{ height: '100%', background: `var(${c.token})` }} />}
      </div>
      <div className={styles.swatchMeta}>
        <span className={styles.swatchName}>{c.name}</span>
        <span className={styles.swatchVar}>var({c.token})</span>
        <span className={styles.swatchValue}>{c.value}</span>
      </div>
    </div>
  )
}

function ColorSection({ title, hint, colors }: { title: string; hint: string; colors: Color[] }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.sectionHint}>{hint}</span>
      </div>
      <div className={styles.swatchGrid}>
        {colors.map((c) => (
          <Swatch key={c.token} c={c} />
        ))}
      </div>
    </div>
  )
}

export default async function DesignAdminPage() {
  await requireAdmin()

  return (
    <>
      <div className={ui.header}>
        <div>
          <h1 className={ui.h1}>Design</h1>
          <p className={ui.subtitle}>
            The MambaHR brand system, Warm Editorial Premium. Colors, type, and components, live from the tokens.
          </p>
        </div>
      </div>

      {/* Logo, the framed lockup, as used on the deck + site */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Logo</h2>
          <span className={styles.sectionHint}>The brand lockup, SVG (vector) + PNG, transparent</span>
        </div>
        <div className={styles.logoGrid}>
          {LOGO_ASSETS.map((a) => (
            <AssetCard key={a.file} a={a} />
          ))}
        </div>
      </div>

      {/* Icon, mark only, no frame */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Icon</h2>
          <span className={styles.sectionHint}>Mark only, no frame, for favicons, avatars, tight spaces</span>
        </div>
        <div className={styles.logoGrid}>
          {ICON_ASSETS.map((a) => (
            <AssetCard key={a.file} a={a} />
          ))}
        </div>
      </div>

      <ColorSection title="Surfaces" hint="Page & panel backgrounds, light to warm" colors={SURFACES} />
      <ColorSection title="Text" hint="Three tones, primary, muted, faint" colors={TEXT} />
      <ColorSection title="Brand" hint="Gold accent + iris-violet AI secondary + peach warmth" colors={BRAND} />
      <ColorSection title="Borders" hint="Low-alpha hairlines over warm surfaces" colors={BORDERS} />
      <ColorSection title="Status" hint="Reserved for success / error only" colors={STATUS} />

      {/* Gradients */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Gradients</h2>
          <span className={styles.sectionHint}>Gold → iris-violet is the signature; warm wash for soft fills</span>
        </div>
        <div className={styles.gradGrid}>
          {GRADIENTS.map((g) => (
            <div key={g.token} className={styles.gradBox}>
              <div className={styles.gradFill} style={{ background: `var(${g.token})` }} />
              <div className={styles.gradMeta}>
                <span className={styles.swatchName}>{g.name}</span>
                <span className={styles.swatchVar}>var({g.token})</span>
                <span className={styles.swatchValue} style={{ textTransform: 'none' }}>
                  {g.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Typefaces</h2>
          <span className={styles.sectionHint}>Three families, each with one job</span>
        </div>
        <div className={ui.card}>
          <div className={styles.fontGrid}>
            <div className={styles.fontCard}>
              <div className={`${styles.fontSample} ${styles.fontSerif}`}>Aa</div>
              <span className={styles.fontName}>Fraunces</span>
              <span className={styles.fontUse}>Serif · headlines & display, var(--font-serif)</span>
            </div>
            <div className={styles.fontCard}>
              <div className={`${styles.fontSample} ${styles.fontSans}`}>Aa</div>
              <span className={styles.fontName}>Inter</span>
              <span className={styles.fontUse}>Sans · body & UI, var(--font-sans)</span>
            </div>
            <div className={styles.fontCard}>
              <div className={`${styles.fontSample} ${styles.fontMono}`}>123</div>
              <span className={styles.fontName}>JetBrains Mono</span>
              <span className={styles.fontUse}>Mono · numbers & labels, var(--font-mono)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Type scale */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Type scale</h2>
          <span className={styles.sectionHint}>Utility classes from globals.css</span>
        </div>
        <div className={ui.card}>
          <div className={styles.typeStack}>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>.t-display</span>
              <span className="t-display">We are the AI HR Department</span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>.t-h2</span>
              <span className="t-h2">Headcount at software margins</span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>.eyebrow</span>
              <span className="eyebrow">The completed work is the product</span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>.t-lead</span>
              <span className="t-lead">
                An employee onboarded. A leave processed. A termination completed. Compliance checked.
              </span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>.t-body</span>
              <span className="t-body">
                Humans stay in the loop on policy, not mechanics. High-certainty actions auto-complete; borderline
                cases queue for sign-off.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elevation */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Elevation</h2>
          <span className={styles.sectionHint}>Warm, low-alpha shadows, never neutral gray</span>
        </div>
        <div className={ui.card}>
          <div className={styles.shadowGrid}>
            <div className={`${styles.shadowCard} ${styles.shadowSm}`}>--shadow-sm</div>
            <div className={`${styles.shadowCard} ${styles.shadowMd}`}>--shadow-md</div>
            <div className={`${styles.shadowCard} ${styles.shadowFloat}`}>--shadow-float</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Buttons</h2>
          <span className={styles.sectionHint}>Global classes from globals.css</span>
        </div>
        <div className={ui.card}>
          <div className={styles.compArea}>
            <span className="btn-primary">Primary</span>
            <span className="btn-gold">Gold pill</span>
            <span className="btn-secondary">Secondary</span>
            <span className="btn-dark">Dark</span>
          </div>
        </div>
      </div>

      {/* Pills, badges, dividers */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Tags & badges</h2>
          <span className={styles.sectionHint}>Status badges live in the admin chrome</span>
        </div>
        <div className={ui.card}>
          <div className={`${styles.compArea} ${styles.spread}`}>
            <div className={styles.compGroup}>
              <span className={styles.compGroupLabel}>Pill</span>
              <div className={styles.compRow}>
                <span className="pill-gold">Gold tint pill</span>
              </div>
            </div>
            <div className={styles.compGroup}>
              <span className={styles.compGroupLabel}>Status badges</span>
              <div className={styles.compRow}>
                <span className={`${ui.badge} ${ui.badgePublished}`}>Published</span>
                <span className={`${ui.badge} ${ui.badgeDraft}`}>Draft</span>
                <span className={`${ui.badge} ${ui.badgeScheduled}`}>Scheduled</span>
              </div>
            </div>
            <div className={styles.compGroup}>
              <span className={styles.compGroupLabel}>Agent status</span>
              <div className={styles.compRow}>
                <span className="mamba-chip working">
                  <span className="mc-i" />
                  Mamba · Working
                </span>
                <span className="mamba-chip done">
                  <span className="mc-i" />
                  Mamba · Done
                </span>
              </div>
            </div>
          </div>
          <div style={{ padding: '0 22px 22px' }}>
            <div className="divider-gold" />
          </div>
        </div>
      </div>

      {/* Agent ring */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Agent ring</h2>
          <span className={styles.sectionHint}>The gold → violet edge that marks Mamba at work</span>
        </div>
        <div className={ui.card}>
          <div className={`${styles.compArea} ${styles.spread}`}>
            <div className={`${styles.agentCard} agent-edge agent-working`}>
              <span className="mamba-chip working">
                <span className="mc-i" />
                Working
              </span>
              <div className={styles.agentCardTitle}>Onboarding Sarah Chen</div>
              <div className={styles.agentCardBody}>Offer drafted, Okta queued, Checkr running. Flowing ring = live.</div>
            </div>
            <div className={`${styles.agentCard} agent-edge agent-done`}>
              <span className="mamba-chip done">
                <span className="mc-i" />
                Done
              </span>
              <div className={styles.agentCardTitle}>Leave request processed</div>
              <div className={styles.agentCardBody}>Approved, calendar blocked, payroll notified. Static ring = complete.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
