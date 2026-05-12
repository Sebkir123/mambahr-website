'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  durationMs: number
  paused?: boolean
  onComplete?: () => void
}

export function useScenarioClock({ durationMs, paused, onComplete }: Options) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startedAtRef = useRef<number | null>(null)
  const pauseAccumRef = useRef(0)
  const pauseStartedAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      if (pauseStartedAtRef.current == null) pauseStartedAtRef.current = performance.now()
      return
    }
    if (pauseStartedAtRef.current != null) {
      pauseAccumRef.current += performance.now() - pauseStartedAtRef.current
      pauseStartedAtRef.current = null
    }
    const tick = (now: number) => {
      if (startedAtRef.current == null) startedAtRef.current = now
      const e = now - startedAtRef.current - pauseAccumRef.current
      if (e >= durationMs) {
        setElapsedMs(durationMs)
        onComplete?.()
        return
      }
      setElapsedMs(e)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [durationMs, paused, onComplete])

  const reset = () => {
    startedAtRef.current = null
    pauseAccumRef.current = 0
    pauseStartedAtRef.current = null
    setElapsedMs(0)
  }

  return { elapsedMs, progress: Math.min(elapsedMs / durationMs, 1), reset }
}
