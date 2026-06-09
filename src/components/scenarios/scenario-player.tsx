'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Scenario } from './types'
import { useScenarioClock } from './use-scenario-clock'
import { useReducedMotion } from '../use-reduced-motion'

type Props = {
  scenarios: Scenario[]
}

export default function ScenarioPlayer({ scenarios }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const active = scenarios[activeIdx]
  const reducedMotion = useReducedMotion()

  const { elapsedMs, progress, reset } = useScenarioClock({
    durationMs: active.durationMs,
    paused: !playing || reducedMotion,
    onComplete: useCallback(() => setPlaying(false), []),
  })

  const renderElapsed = playing && !reducedMotion ? elapsedMs : active.durationMs

  useEffect(() => {
    setPlaying(false)
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx])

  const handleReplay = () => {
    reset()
    setPlaying(true)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Tab chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
        {scenarios.map((s, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              style={{
                padding: '9px 18px',
                borderRadius: 999,
                border: isActive ? '1px solid var(--gold-dark)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold-dark)' : 'var(--bg)',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Two-column: copy left, live mockup right */}
      <div
        className="scenario-split"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.82fr 1.18fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* LEFT — what this gets you */}
        <div>
          <p
            className="mono"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-dark)',
              margin: '0 0 18px',
            }}
          >
            {active.label}
          </p>
          {active.headline && (
            <h3
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                margin: '0 0 18px',
                lineHeight: 1.1,
              }}
            >
              {active.headline}
            </h3>
          )}
          {active.blurb && (
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 28px', maxWidth: 420 }}>
              {active.blurb}
            </p>
          )}

          {!reducedMotion && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, maxWidth: 320 }}>
              <button
                type="button"
                onClick={handleReplay}
                disabled={playing}
                className="btn-secondary"
                style={{ fontSize: 13, padding: '9px 18px', cursor: playing ? 'default' : 'pointer' }}
              >
                {playing ? 'Playing…' : '▶ Watch it run'}
              </button>
              <div style={{ flex: 1, height: 2, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${(playing ? progress : 0) * 100}%`,
                    height: '100%',
                    background: 'var(--gold-dark)',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — the product, floating */}
        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            boxShadow: 'var(--shadow-float), var(--sheen)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-faint)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 11,
              color: 'var(--text-faint)',
            }}
          >
            <span style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border-mid)' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border-mid)' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border-mid)' }} />
            </span>
            <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
          </div>
          <div style={{ padding: '28px 24px' }}>{active.render(renderElapsed)}</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .scenario-split { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  )
}
