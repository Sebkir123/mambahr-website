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

  // Clock only runs when the user explicitly hits Replay. Default state
  // shows the scenario fully rendered. No more staring at 'typing...'.
  const { elapsedMs, progress, reset } = useScenarioClock({
    durationMs: active.durationMs,
    paused: !playing || reducedMotion,
    onComplete: useCallback(() => {
      setPlaying(false)
    }, []),
  })

  // Default render = end of scenario (full story visible).
  // While playing, render the live frame.
  const renderElapsed = playing && !reducedMotion ? elapsedMs : active.durationMs

  // Reset to end-state when switching tabs.
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
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Tab chip strip */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 32,
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
                background: isActive ? 'var(--gold-dark)' : 'var(--bg)',
                color: isActive ? 'var(--bg)' : 'var(--text-muted)',
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

      {/* Device frame — adaptive height, no dead space */}
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top bar — tighter */}
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
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontWeight: 600 }}>{active.label}</span>
        </div>

        {/* Stage — sizes to content */}
        <div style={{ padding: '28px 24px' }}>{active.render(renderElapsed)}</div>

        {/* Controls strip — separate row, not floating */}
        <div
          style={{
            borderTop: '1px solid var(--border-faint)',
            padding: '10px 16px',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 11,
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          {reducedMotion ? (
            <span style={{ color: 'var(--text-muted)' }}>
              Reduced motion is on. Click a tab to switch scenarios.
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={handleReplay}
                disabled={playing}
                style={{
                  background: 'none',
                  border: 'none',
                  color: playing ? 'var(--text-faint)' : 'var(--text-muted)',
                  cursor: playing ? 'default' : 'pointer',
                  fontSize: 11,
                  padding: 0,
                  fontFamily: 'inherit',
                  fontWeight: 600,
                }}
              >
                {playing ? '⏵ Playing…' : '⏵ Watch it happen'}
              </button>
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: 'var(--border)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(playing ? progress : 1) * 100}%`,
                    height: '100%',
                    background: 'var(--gold-dark)',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
              <span>{Math.ceil(active.durationMs / 1000)}s</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
