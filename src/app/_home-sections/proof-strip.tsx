import { Beat, Page } from '@/components/ui/page'

// Real HRIS import sources (features.md §3: Gusto, Rippling, BambooHR, ADP, Namely, Workday).
const switchFrom = ['Gusto', 'Workday', 'Rippling', 'BambooHR', 'Namely', 'ADP']

export default function ProofStrip() {
  return (
    <Beat bg="white" tight>
      <Page style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: 22 }}>Switch from</p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px 48px',
            marginBottom: 22,
          }}
        >
          {switchFrom.map((name) => (
            <span
              key={name}
              style={{
                fontSize: 'clamp(18px, 2.4vw, 24px)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--text-faint)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Migrate from your current HRIS in a day.
        </p>
      </Page>
    </Beat>
  )
}
