'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

/* The story kit: what every animated product moment on the site shares.
   A story is a list of phase times (ms from the start) plus optional typed
   lines. It plays once, when its element first comes on screen; Replay plays
   it again from the top; reduced motion skips straight to the last frame. */

export type Typing = { at: number; text: string; ms?: number }
export type StoryScript = {
  phases: readonly number[]
  typing?: readonly Typing[]
  /** When the story starts, relative to the viewport. Default: once the
      element's top is 15% above the bottom edge, so a tall stacked story on
      a phone still starts. */
  rootMargin?: string
}

const REDUCED = '(prefers-reduced-motion: reduce)'

/** A media query as state, without a setState in an effect. */
export function useMedia(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', onChange)
      return () => m.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export function useStory<T extends HTMLElement = HTMLDivElement>(script: StoryScript) {
  // Scripts are module constants; keep the first one.
  const [cfg] = useState(script)
  const ref = useRef<T>(null)
  const timers = useRef<number[]>([])
  const [phase, setPhase] = useState(0)
  const [typed, setTyped] = useState<readonly number[]>(() => (cfg.typing ?? []).map(() => 0))
  const [resetting, setResetting] = useState(false)
  const [still, setStill] = useState(false)

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])
  const at = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  const play = useCallback(() => {
    clear()
    ;(cfg.typing ?? []).forEach((t, ti) => {
      for (let i = 1; i <= t.text.length; i++) {
        at(t.at + i * (t.ms ?? 30), () =>
          setTyped((prev) => prev.map((n, k) => (k === ti ? i : n))),
        )
      }
    })
    cfg.phases.forEach((ms, i) => at(ms, () => setPhase(i + 1)))
  }, [at, cfg, clear])

  const replay = useCallback(() => {
    clear()
    // Jump back without animating backwards, then play from the top.
    setResetting(true)
    setTyped((cfg.typing ?? []).map(() => 0))
    setPhase(0)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setResetting(false)
        play()
      }),
    )
  }, [cfg, clear, play])

  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) {
      at(0, () => {
        setStill(true)
        setTyped((cfg.typing ?? []).map((t) => t.text.length))
        setPhase(cfg.phases.length)
      })
      return clear
    }
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      play()
      return clear
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          play()
        }
      },
      { threshold: 0, rootMargin: cfg.rootMargin ?? '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clear()
    }
  }, [at, cfg, clear, play])

  return {
    ref,
    phase,
    typed,
    /** True for the one frame a replay jumps back: turn transitions off. */
    resetting,
    /** Reduced motion: the last frame, no Replay. */
    still,
    done: phase >= cfg.phases.length,
    replay,
  }
}
