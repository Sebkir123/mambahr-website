'use client'

import { useEffect } from 'react'

export default function AnimateOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]')

    // Immediately reveal elements already in viewport
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
