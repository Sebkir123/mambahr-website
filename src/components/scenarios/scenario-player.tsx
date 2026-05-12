'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Scenario } from './types'
import { useScenarioClock } from './use-scenario-clock'

type Props = {
  scenarios: Scenario[]
}

export default function ScenarioPlayer({ scenarios }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = scenarios[activeIdx]
  const { elapsedMs, progress, reset } = useScenarioClock({
    durationMs: active.durationMs,
    paused,
    onComplete: useCallback(() => {
      setActiveIdx((i) => (i + 1) % scenarios.length)
    }, [scenarios.length]),
  })

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx])

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Tab chip strip */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      >
        {scenarios.map((s, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: isActive ? '1px solid var(--gold-dark)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold-dark)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: 13,
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

      {/* Device frame */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 18,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 520,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: '12px 18px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          </span>
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono), monospace' }}>{active.label}</span>
        </div>

        {/* Stage */}
        <div style={{ padding: '32px 28px', minHeight: 440 }}>{active.render(elapsedMs)}</div>

        {/* Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 18,
            right: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 11,
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}
          >
            ▶ Replay
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}
          >
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <div
            style={{
              flex: 1,
              height: 2,
              background: 'rgba(0,0,0,0.06)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--gold-dark)', transition: 'width 0.05s linear' }} />
          </div>
          <span>{Math.ceil((active.durationMs - elapsedMs) / 1000)}s</span>
        </div>
      </div>
    </div>
  )
}
