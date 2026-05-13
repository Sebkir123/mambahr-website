import type { Scenario } from './types'

const TOTAL_REVIEWS = 47
const INGEST_START = 1200
const INGEST_DURATION = 3800
const DRAFT_START = 5000
const DRAFT_DURATION = 3500
const QUEUE_AT = 8800

const OUTLIERS = [
  { name: 'Marcus T.', reason: 'feedback diverges sharply across reviewers' },
  { name: 'Jordan L.', reason: 'performance review overdue by 2 cycles' },
  { name: 'Casey W.', reason: 'promotion threshold reached — needs decision' },
]

export const reviewsScenario: Scenario = {
  id: 'reviews',
  label: 'Annual reviews',
  durationMs: 11000,
  render: (elapsedMs) => {
    const ingestProgress = Math.max(0, Math.min(1, (elapsedMs - INGEST_START) / INGEST_DURATION))
    const ingestDone = elapsedMs >= INGEST_START + INGEST_DURATION
    const draftProgress = Math.max(0, Math.min(1, (elapsedMs - DRAFT_START) / DRAFT_DURATION))
    const draftCount = Math.floor(draftProgress * TOTAL_REVIEWS)
    const draftStarted = elapsedMs >= DRAFT_START
    const queueVisible = elapsedMs >= QUEUE_AT

    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        {/* Banner */}
        <div
          style={{
            background: 'var(--bg-warm)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--gold-dark)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--gold-dark)', fontWeight: 700 }}>
            Calendar
          </span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Review season started</span>
        </div>

        {/* Agent header */}
        {elapsedMs >= 500 && (
          <div style={{ marginBottom: 10, fontSize: 11, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold-dark)' }}>Performance agent</strong> is drafting in parallel…
          </div>
        )}

        {/* Two-stage progress card */}
        {elapsedMs >= 500 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              maxWidth: 540,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              marginBottom: 14,
            }}
          >
            {/* Ingest */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text)' }}>
                  Ingesting {TOTAL_REVIEWS} employees&apos; goals + peer feedback…
                </span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: ingestDone ? '#15803D' : 'var(--text-muted)' }}>
                  {Math.round(ingestProgress * 100)}%
                </span>
              </div>
              <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${ingestProgress * 100}%`,
                    height: '100%',
                    background: ingestDone ? '#15803D' : 'var(--gold-dark)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>

            {/* Draft */}
            <div style={{ opacity: draftStarted ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text)' }}>Drafting review summaries…</span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: draftCount === TOTAL_REVIEWS ? '#15803D' : 'var(--text-muted)' }}>
                  {draftCount} / {TOTAL_REVIEWS}
                </span>
              </div>
              <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${draftProgress * 100}%`,
                    height: '100%',
                    background: draftCount === TOTAL_REVIEWS ? '#15803D' : 'var(--gold-dark)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Queue summary */}
        {queueVisible && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 14,
              maxWidth: 540,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              animation: 'mamba-card-in 0.4s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <strong style={{ fontSize: 14 }}>Today queue</strong>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {TOTAL_REVIEWS} reviews drafted · <strong style={{ color: '#C2410C' }}>3 need you</strong>
              </span>
            </div>
            <div>
              {OUTLIERS.map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <span style={{ background: '#FFF7ED', color: '#C2410C', padding: '1px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>
                    <strong>{o.name}</strong> <span style={{ color: 'var(--text-muted)' }}>— {o.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
}
