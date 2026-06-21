'use client'

import { useState } from 'react'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import TurnstileWidget from '@/components/turnstile-widget'
import { Em } from '@/components/v2/page-kit'

const EDGE_FN_URL =
  'https://dqoqnlecylqlwsahudjn.supabase.co/functions/v1/handle-demo-request'

const SEE = [
  'Your real questions, answered live with the law cited',
  'An onboarding run end to end — offer to day-one ready',
  'The approval queue: what waits for you, what just gets done',
  'Your headcount priced on the call — no follow-up quote dance',
]

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,000+']

export default function DemoPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setStatus('loading')
    try {
      const res = await fetch(EDGE_FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, companySize, turnstileToken: token }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
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
              <div className="founders">
                <div className="f-faces">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brian_bell.jpeg" alt="Brian Bell" width={44} height={44} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/sebastian_kirsch.jpg" alt="Sebastian Kirsch" width={44} height={44} />
                </div>
                <div className="f-copy">
                  <span className="f-t">With a founder, not a sales rep.</span>
                  <span className="f-s">Brian or Sebastian runs every demo — the people who built it.</span>
                </div>
              </div>
            </div>

            {/* ── Form card ── */}
            <div className="formcol" data-reveal data-delay="1">
              <div className="card agent-edge agent-working agent-lg">
                {status === 'success' ? (
                  <div className="done">
                    <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Request received</span>
                    <h2 className="d-t">You&rsquo;ll hear from a founder today.</h2>
                    <p className="d-s">
                      A real reply from a real founder email — not a no-reply, not a sequence.
                      We&rsquo;ll send times for this week.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="card-head">
                      <span className="ch-t">Book your 30 minutes</span>
                      <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Replies same day</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="name" className="lbl">Full name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="inp"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="email" className="lbl">Work email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="inp"
                        placeholder="you@company.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="grid2">
                        <div>
                          <label htmlFor="company" className="lbl">Company</label>
                          <input
                            id="company"
                            type="text"
                            className="inp"
                            placeholder="Acme Inc."
                            autoComplete="organization"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="companySize" className="lbl">Company size</label>
                          <select
                            id="companySize"
                            className="inp"
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                          >
                            <option value="">Select…</option>
                            {COMPANY_SIZES.map((s) => (
                              <option key={s} value={s}>{s} employees</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="ts">
                        <TurnstileWidget onSuccess={setToken} theme="light" />
                      </div>
                      <button type="submit" className="btn" disabled={status === 'loading' || !token}>
                        {status === 'loading' ? 'Sending…' : 'Book a demo'}
                      </button>
                      {status === 'error' && (
                        <p className="err">
                          Something went wrong. <a href="mailto:founders@mambahr.com">Email the founders</a>
                        </p>
                      )}
                      <p className="fine">30 minutes · no deck, just the product · your data never touched</p>
                    </form>
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
            .founders { display: flex; align-items: center; gap: 14px; margin-top: 30px; padding-top: 24px; border-top: 1px solid var(--border-faint); }
            .f-faces { display: flex; flex: none; }
            .f-faces img { width: 44px; height: 44px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); margin-left: -10px; background: var(--bg-elevated); }
            .f-faces img:first-child { margin-left: 0; }
            .f-copy { display: flex; flex-direction: column; gap: 2px; }
            .f-t { font-size: 14.5px; font-weight: 700; color: var(--text); }
            .f-s { font-size: 13px; color: var(--text-muted); }

            .card {
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 18px;
              box-shadow: var(--shadow-float);
              padding: clamp(24px, 3vw, 34px);
            }
            .card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; }
            .ch-t { font-family: var(--font-serif); font-size: 21px; color: var(--text); letter-spacing: -0.01em; }
            .lbl { display: block; font-family: var(--font-mono); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 8px; }
            .inp {
              width: 100%;
              box-sizing: border-box;
              padding: 14px 16px;
              margin-bottom: 18px;
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 10px;
              font-size: 15px;
              font-family: var(--font-sans);
              color: var(--text);
              outline: none;
              transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }
            .inp:focus { border-color: var(--gold-dark); box-shadow: 0 0 0 3px var(--gold-tint); }
            .inp::placeholder { color: var(--text-faint); }
            select.inp { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%237A7A75' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; cursor: pointer; }
            .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
            @media (max-width: 480px) { .grid2 { grid-template-columns: 1fr; } }
            .inp:-webkit-autofill,
            .inp:-webkit-autofill:hover,
            .inp:-webkit-autofill:focus {
              -webkit-box-shadow: 0 0 0 1000px var(--bg) inset !important;
              -webkit-text-fill-color: var(--text) !important;
              transition: background-color 5000s ease-in-out 0s;
            }
            .ts { margin-bottom: 16px; }
            .btn {
              width: 100%;
              padding: 15px 24px;
              background: #1A1A19;
              color: #fff;
              font-weight: 600;
              font-size: 15.5px;
              border: none;
              border-radius: 999px;
              cursor: pointer;
              box-shadow: 0 12px 26px rgba(20, 18, 14, 0.2);
              transition: transform 0.15s ease, background 0.15s ease;
            }
            .btn:hover:not(:disabled) { transform: translateY(-2px); background: #2A2A28; }
            .btn:active:not(:disabled) { transform: translateY(0); }
            .btn:disabled { opacity: 0.45; cursor: not-allowed; }
            @media (prefers-reduced-motion: reduce) { .btn:hover:not(:disabled) { transform: none; } }
            .err { font-size: 13px; color: var(--color-red); text-align: center; margin: 14px 0 0; }
            .err a { color: var(--color-red); text-decoration: underline; }
            .fine { font-size: 12px; color: var(--text-faint); text-align: center; margin: 16px 0 0; }

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
