'use client'

import { useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { Em } from '@/components/v2/page-kit'
import { LeadForm, type LeadFormFields } from '@/components/lead-form'

const SEE = [
  'Your real questions, answered live with the law cited',
  'An onboarding run end to end — offer to day-one ready',
  'The approval queue: what waits for you, what just gets done',
  'Your headcount priced on the call — no follow-up quote dance',
]

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,000+']

export default function DemoPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit({ name, email, company, companyStage, turnstileToken }: LeadFormFields) {
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, companySize: companyStage, turnstileToken }),
    })
    if (!res.ok) {
      setStatus('error')
      throw new Error('api-error')
    }
    setStatus('success')
  }

  return (
    <>
      <MegaNav />
      <RevealInit />
      <main>
        <section className="dm">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="wrap">
            {/* ── Sell side ── */}
            <div className="sell" data-reveal>
              <p className="eyebrow">Book a demo</p>
              <h1 className="title">See it run, <Em>live.</Em></h1>
              <p className="lead">
                Thirty minutes, on your calendar this week. We&rsquo;ll run the department in front of
                you — on scenarios from your company, not a canned script.
              </p>
              <ul className="see">
                {SEE.map((s) => (
                  <li key={s}><span className="tick" aria-hidden="true" />{s}</li>
                ))}
              </ul>
            </div>

            {/* ── Form card ── */}
            <div className="formcol" data-reveal data-delay="1">
              <div className="card agent-edge agent-working agent-lg">
                {status === 'success' ? (
                  <div className="done">
                    <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Request received</span>
                    <h2 className="d-t">You&rsquo;ll hear from us today.</h2>
                    <p className="d-s">
                      A real reply from a real email — not a no-reply, not a sequence.
                      We&rsquo;ll send times for this week.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="card-head">
                      <span className="ch-t">Book your 30 minutes</span>
                      <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Replies same day</span>
                    </div>
                    <LeadForm
                      onSubmit={handleSubmit}
                      submitLabel="Book a demo"
                      stageOptions={COMPANY_SIZES.map((s) => `${s} employees`)}
                      stageLabel="Company size"
                      error={status === 'error' ? 'Something went wrong.' : undefined}
                      note="30 minutes · no deck, just the product · your data never touched"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <style jsx>{`
            .dm {
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
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: dmA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: dmB 28s ease-in-out infinite alternate; }
            @keyframes dmA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes dmB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .wrap {
              position: relative;
              width: 100%;
              max-width: var(--page-max);
              margin: 0 auto;
              display: grid;
              grid-template-columns: 1.05fr 0.95fr;
              gap: clamp(40px, 6vw, 88px);
              align-items: center;
            }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(40px, 5vw, 64px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 16px 0 0; white-space: nowrap; }
            .lead { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.6; color: var(--text-muted); margin: 18px 0 0; max-width: 480px; }
            .see { list-style: none; padding: 0; margin: 26px 0 0; display: flex; flex-direction: column; gap: 13px; }
            .see li { display: flex; align-items: flex-start; gap: 11px; font-size: 15px; line-height: 1.5; color: var(--text-muted); }
            .tick { flex: none; width: 18px; height: 18px; margin-top: 2px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
            .tick::after { content: ''; position: absolute; left: 6px; top: 3.5px; width: 3.5px; height: 7.5px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }

            .card {
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 18px;
              box-shadow: var(--shadow-float);
              padding: clamp(24px, 3vw, 34px);
            }
            .card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; }
            .ch-t { font-family: var(--font-serif); font-size: 21px; color: var(--text); letter-spacing: -0.01em; }

            .done { text-align: center; padding: clamp(16px, 2vw, 24px) 0; }
            .d-t { font-family: var(--font-serif); font-weight: 400; font-size: clamp(24px, 2.8vw, 32px); line-height: 1.15; letter-spacing: -0.02em; color: var(--text); margin: 18px 0 0; }
            .d-s { font-size: 14.5px; line-height: 1.6; color: var(--text-muted); margin: 12px auto 0; max-width: 340px; }

            @media (max-width: 880px) {
              .wrap { grid-template-columns: 1fr; }
              .title { white-space: normal; }
              .dm { align-items: flex-start; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  )
}
