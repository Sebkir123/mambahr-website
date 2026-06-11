'use client'

import { useEffect } from 'react'

// Lightweight scroll-reveal + shared texture for the v2 prototype.
// IntersectionObserver adds `.in` to any [data-reveal] element when it scrolls
// into view; respects prefers-reduced-motion. Global CSS (grain + reveal) is
// injected once via styled-jsx global so sections stay self-contained.
export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <style jsx global>{`
      [data-reveal] {
        opacity: 0;
        transform: translateY(18px);
        transition: opacity 0.7s cubic-bezier(0.2, 0.6, 0.2, 1),
          transform 0.7s cubic-bezier(0.2, 0.6, 0.2, 1);
      }
      [data-reveal].in {
        opacity: 1;
        transform: none;
      }
      [data-reveal][data-delay='1'] { transition-delay: 0.07s; }
      [data-reveal][data-delay='2'] { transition-delay: 0.14s; }
      [data-reveal][data-delay='3'] { transition-delay: 0.21s; }
      [data-reveal][data-delay='4'] { transition-delay: 0.28s; }
      .v2-grain {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 130px 130px;
        opacity: 0.06;
        mix-blend-mode: overlay;
      }
      @media (prefers-reduced-motion: reduce) {
        [data-reveal] {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `}</style>
  )
}
