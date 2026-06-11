'use client'

import { useEffect } from 'react'

// Animates any [data-count] element's number from 0 to its target when it
// scrolls into view. The element must contain only the number; render the
// unit (%, hrs) as a sibling. Respects prefers-reduced-motion.
export default function CountUp() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-count]'))
    if (!els.length) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

    const run = (el: Element) => {
      const target = parseFloat(el.getAttribute('data-count') || '0')
      if (reduce || Number.isNaN(target)) {
        el.textContent = fmt(target)
        return
      }
      const dur = 1100
      let start = 0
      const step = (t: number) => {
        if (!start) start = t
        const p = Math.min((t - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = fmt(target * eased)
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = fmt(target)
      }
      requestAnimationFrame(step)
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(run)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            run(en.target)
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.5 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return null
}
