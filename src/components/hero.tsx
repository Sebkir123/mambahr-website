'use client'

import { useEffect, useState } from 'react'
import ProductMockup from '@/components/product-mockup'

export default function Hero() {
  const [animate, setAnimate] = useState(false)
  useEffect(() => { setAnimate(true) }, [])

  return (
    <section
      className={`bg-grid relative ${animate ? 'hero-animate' : ''}`}
      style={{ paddingTop: 100, paddingBottom: 0, backgroundColor: 'var(--bg)', overflow: 'hidden' }}
    >
      {/* Radial gold glow behind headline */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse at center, rgba(176,141,87,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Centered content */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Status badge */}
        <div
          className="inline-flex items-center hero-badge"
          style={{
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            border: '1px solid var(--border)',
            marginBottom: 20,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: 'var(--text-muted)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--green)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          Private Beta — accepting design partners
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            lineHeight: 0.95,
            fontWeight: 900,
            fontFamily: 'var(--font-inter), sans-serif',
            color: 'var(--text)',
            marginBottom: 16,
          }}
        >
          <span className="hero-headline-1" style={{display:'block'}}>The HR agent that never</span>
          <span
            className="hero-headline-2"
            style={{
              display: 'block',
              color: 'var(--gold)',
            }}
          >
            calls in sick.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="hero-sub"
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 520,
            margin: '0 auto 24px',
          }}
        >
          Leave requests, onboarding, people ops — handled in seconds, not days. Your HR team finally gets to do the work that matters.
        </p>

        {/* Single CTA */}
        <a
          href="#request-access"
          className="inline-block hero-cta cta-glow"
          style={{
            padding: '12px 32px',
            borderRadius: 999,
            backgroundColor: 'var(--gold)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: 10,
          }}
        >
          Request Access
        </a>

        {/* Micro-copy */}
        <p
          className="hero-micro"
          style={{
            fontSize: 13,
            color: 'var(--text-faint)',
            marginBottom: 32,
          }}
        >
          Free for design partners. Connects to your HRIS. Runs autonomously.
        </p>

        {/* ── Product mockup ── */}
        <div className="hero-dashboard">
          <ProductMockup />
        </div>
      </div>
    </section>
  )
}
