'use client'

import { useState } from 'react'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { Em } from '@/components/v2/page-kit'
import { EarlyAccessForm, type EarlyAccessFields } from '@/components/early-access-form'
import { DEMO_HREF, DEMO_LABEL } from '@/content/cta'

const GET = [
  'An invite when your group opens',
  'Founding customer pricing, held for you',
  'Your records brought over from your current HR system in a day',
]

export default function EarlyAccessPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [joined, setJoined] = useState('')

  async function handleSubmit(fields: EarlyAccessFields) {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (!res.ok) {
      setStatus('error')
      throw new Error('api-error')
    }
    setJoined(fields.email)
    setStatus('success')
  }

  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <section className="ea">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="wrap">
            <div className="sell" data-reveal>
              <p className="eyebrow">Early access</p>
              <h1 className="title">Get in <Em>early.</Em></h1>
              <p className="lead">
                We&rsquo;re opening MambaHR to companies in small groups. Join the list and we&rsquo;ll
                invite you when your group opens.
              </p>
              <ul className="get">
                {GET.map((s) => (
                  <li key={s}><span className="tick" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <p className="alt">
                Rather see it first? <Link href={DEMO_HREF}>{DEMO_LABEL}</Link>
              </p>
            </div>

            <div className="formcol" data-reveal data-delay="1">
              <div className="card agent-edge agent-working agent-lg">
                {status === 'success' ? (
                  <div className="done">
                    <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Joined</span>
                    <h2 className="d-t">You&rsquo;re on the list.</h2>
                    <p className="d-s">
                      We&rsquo;ll email <strong>{joined}</strong> when your group opens. Founding customer
                      pricing is held for you.
                    </p>
                    <Link href={DEMO_HREF} className="btn btn-secondary d-b">Want to see it sooner? {DEMO_LABEL}</Link>
                  </div>
                ) : (
                  <>
                    <div className="card-head">
                      <span className="ch-t">Join the early access list</span>
                    </div>
                    <EarlyAccessForm
                      onSubmit={handleSubmit}
                      error={status === 'error' ? 'That did not go through. Try again, or email hello@mambahr.com.' : undefined}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <style jsx>{`
            .ea {
              position: relative;
              overflow: hidden;
              padding: clamp(124px, 14vw, 168px) var(--page-pad) clamp(80px, 10vw, 128px);
              background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%);
              min-height: calc(100vh - 80px);
              display: flex;
              align-items: center;
            }
            .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
            .aurora::after { content: ''; position: absolute; inset: 0; background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%); }
            .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: eaA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: eaB 28s ease-in-out infinite alternate; }
            @keyframes eaA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes eaB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .wrap {
              position: relative;
              width: 100%;
              max-width: var(--page-max);
              margin: 0 auto;
              display: grid;
              grid-template-columns: 0.95fr 1.05fr;
              gap: clamp(40px, 6vw, 88px);
              align-items: center;
            }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(40px, 5vw, 64px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 16px 0 0; text-wrap: balance; }
            .lead { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 18px 0 0; max-width: 480px; }
            .get { list-style: none; padding: 0; margin: 26px 0 0; display: flex; flex-direction: column; gap: 13px; }
            .get li { display: flex; align-items: flex-start; gap: 11px; font-size: 15px; line-height: 1.5; color: var(--text-muted); }
            .tick { flex: none; width: 18px; height: 18px; margin-top: 2px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
            .tick::after { content: ''; position: absolute; left: 6px; top: 3.5px; width: 3.5px; height: 7.5px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
            .alt { margin: 28px 0 0; font-size: 15px; color: var(--text-muted); }
            .alt :global(a) { color: var(--text); font-weight: 600; text-decoration: underline; text-decoration-color: rgba(138, 101, 53, 0.45); text-underline-offset: 4px; }
            .alt :global(a:hover) { text-decoration-color: var(--gold-dark); }

            .card {
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 18px;
              box-shadow: var(--shadow-float);
              padding: clamp(24px, 3vw, 34px);
            }
            .card-head { margin-bottom: 22px; }
            .ch-t { font-family: var(--font-serif); font-size: 21px; color: var(--text); letter-spacing: -0.01em; }

            .done { text-align: center; padding: clamp(16px, 2vw, 24px) 0; }
            .d-t { font-family: var(--font-serif); font-weight: 400; font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; letter-spacing: -0.02em; color: var(--text); margin: 18px 0 0; }
            .d-s { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 12px auto 0; max-width: 360px; overflow-wrap: anywhere; }
            .d-s strong { color: var(--text); font-weight: 600; }
            .done :global(.d-b) { margin-top: 24px; }

            @media (max-width: 880px) {
              .wrap { grid-template-columns: 1fr; }
              .ea { align-items: flex-start; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  )
}
