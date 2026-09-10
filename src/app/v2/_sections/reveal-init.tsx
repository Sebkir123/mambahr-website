'use client'

import { useEffect } from 'react'

// Lightweight scroll-reveal + shared texture for the v2 prototype.
// The hidden state is gated on `html.js-reveal`, which only this effect adds,
// so server HTML (and any visitor without JS) renders everything visible.
// On mount, anything already inside the viewport gets `.in` before the class
// lands, so the first paint is never blanked; IntersectionObserver then adds
// `.in` to the rest as they scroll into view. `data-reveal="eager"` opts an
// element out entirely (used by the heroes, which are the LCP on every page).
// Respects prefers-reduced-motion.
export default function RevealInit() {
  useEffect(() => {
    const root = document.documentElement
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="eager"])'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const vh = window.innerHeight || root.clientHeight
    els.forEach((e) => {
      const r = e.getBoundingClientRect()
      if (r.top < vh && r.bottom > 0) e.classList.add('in')
    })
    root.classList.add('js-reveal')
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
    els.forEach((e) => {
      if (!e.classList.contains('in')) io.observe(e)
    })
    return () => {
      io.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])

  return (
    <style jsx global>{`
      html.js-reveal [data-reveal]:not([data-reveal='eager']) {
        transition: opacity 0.7s cubic-bezier(0.2, 0.6, 0.2, 1),
          transform 0.7s cubic-bezier(0.2, 0.6, 0.2, 1);
      }
      html.js-reveal [data-reveal]:not([data-reveal='eager']):not(.in) {
        opacity: 0;
        transform: translateY(18px);
      }
      html.js-reveal [data-reveal][data-delay='1'] { transition-delay: 0.07s; }
      html.js-reveal [data-reveal][data-delay='2'] { transition-delay: 0.14s; }
      html.js-reveal [data-reveal][data-delay='3'] { transition-delay: 0.21s; }
      html.js-reveal [data-reveal][data-delay='4'] { transition-delay: 0.28s; }
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
        html.js-reveal [data-reveal] {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `}</style>
  )
}
