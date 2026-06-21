'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, StatTrio, PageCta, Em } from '@/components/v2/page-kit'
import type { CategoryData } from './category-data'

/* Small Slack-style exchange shown in the hero stage — the product, as a
   hardcoded CSS fragment (not a screenshot), per the marketing display rule. */
function SlackFragment() {
  return (
    <div className="sf agent-edge agent-done">
      <div className="sf-top">
        <span className="sf-hash">#</span>
        <span className="sf-ch">people-help</span>
        <span className="sf-chip">Mamba · done</span>
      </div>
      <div className="sf-msg">
        <span className="sf-av sf-av-h" aria-hidden="true">A</span>
        <div className="sf-body">
          <div className="sf-meta"><b>Anna</b><span>9:24 AM</span></div>
          <p className="sf-text">@MambaHR I’m taking parental leave starting June 3 — what am I eligible for in California?</p>
        </div>
      </div>
      <div className="sf-msg sf-mamba">
        <span className="sf-av sf-av-m" aria-hidden="true" />
        <div className="sf-body">
          <div className="sf-meta"><b>MambaHR</b><span className="sf-bot">agent</span><span>9:24 AM</span></div>
          <p className="sf-text">You’re eligible for 12 weeks under FMLA, stacked with up to 8 weeks of California PFL wage replacement. I’ve drafted the leave plan and routed it to Dave for approval.</p>
          <div className="sf-pills">
            <span className="sf-pill">FMLA · CFRA · CA PFL</span>
            <span className="sf-pill sf-pill-g">Approval routed</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sf { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-float); text-align: left; }
        .sf-top { display: flex; align-items: center; gap: 7px; padding: 12px 16px; background: linear-gradient(90deg, #FBF7EE, #F4F1F9); border-bottom: 1px solid var(--border-faint); }
        .sf-hash { color: var(--text-faint); font-weight: 700; }
        .sf-ch { font-size: 13px; font-weight: 700; color: var(--text); }
        .sf-chip { margin-left: auto; font-family: var(--font-mono); font-size: 10.5px; color: #fff; background: linear-gradient(120deg, #B98A4E, #6A5DA6); border-radius: 999px; padding: 4px 11px; }
        .sf-msg { display: flex; gap: 11px; padding: 14px 16px; }
        .sf-msg + .sf-msg { border-top: 1px solid var(--border-faint); }
        .sf-mamba { background: rgba(106, 93, 166, 0.05); }
        .sf-av { flex: none; width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; font-size: 13px; font-weight: 700; color: #fff; }
        .sf-av-h { background: linear-gradient(135deg, #C99655, #8A6535); }
        .sf-av-m { background: linear-gradient(135deg, #6A5DA6, #4A3F7A); position: relative; }
        .sf-av-m::after { content: ''; position: absolute; inset: 8px; border-radius: 3px; background: #fff; opacity: 0.92; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
        .sf-body { min-width: 0; }
        .sf-meta { display: flex; align-items: center; gap: 8px; }
        .sf-meta b { font-size: 13.5px; color: var(--text); }
        .sf-meta span { font-size: 11px; color: var(--text-faint); }
        .sf-bot { font-family: var(--font-mono); font-size: 9.5px !important; text-transform: uppercase; letter-spacing: 0.05em; color: #6A5DA6 !important; background: rgba(106, 93, 166, 0.12); border-radius: 4px; padding: 1px 5px; }
        .sf-text { font-size: 13.5px; line-height: 1.5; color: var(--text-muted); margin: 4px 0 0; }
        .sf-pills { display: flex; gap: 7px; margin-top: 10px; flex-wrap: wrap; }
        .sf-pill { font-family: var(--font-mono); font-size: 10.5px; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; }
        .sf-pill-g { color: var(--color-green); border-color: rgba(45, 138, 90, 0.3); background: rgba(45, 138, 90, 0.08); }
      `}</style>
    </div>
  )
}

export default function CategoryView({ data }: { data: CategoryData }) {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main>
        <PageHero
          eyebrow={data.eyebrow}
          title={<>{data.hero.lead} <Em>{data.hero.em}</Em>{data.hero.tail}</>}
          lead={data.heroSub}
          proof="Trusted by lean US teams"
        >
          <SlackFragment />
        </PageHero>

        {/* ── AEO direct answer ── */}
        <section className="ans">
          <div className="wrap" data-reveal>
            <h2 className="q">{data.answer.question}</h2>
            <p className="a">{data.answer.answer}</p>
          </div>
          <style jsx>{`
            .ans { background: var(--bg); padding: clamp(56px, 7vw, 88px) var(--page-pad) clamp(8px, 2vw, 16px); }
            .wrap { max-width: 760px; margin: 0 auto; text-align: center; }
            .q { font-family: var(--font-serif); font-weight: 400; font-size: clamp(22px, 2.6vw, 30px); line-height: 1.2; letter-spacing: -0.02em; color: var(--text); margin: 0 0 16px; }
            .a { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.62; color: var(--text-muted); margin: 0; }
          `}</style>
        </section>

        {/* ── Why / reasons ── */}
        <section className="why">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Why MambaHR</p>
              <h2 className="title">Different <Em>by design.</Em></h2>
            </div>
            <div className="grid">
              {data.reasons.map((r, i) => (
                <div key={r.title} className="card" data-reveal data-delay={String(i + 1)}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t">{r.title}</h3>
                  <p className="b">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .why { background: var(--bg); padding: clamp(56px, 7vw, 96px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); }
            .card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(22px, 2.6vw, 30px); box-shadow: var(--shadow-sm); }
            .num { font-family: var(--font-serif); font-size: 36px; line-height: 1; background: linear-gradient(120deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; }
            .t { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 14px 0 10px; line-height: 1.3; }
            .b { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 0; }
            @media (max-width: 880px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── Checklist ── */}
        <section className="cl">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">{data.checklist.eyebrow}</p>
              <h2 className="title">{data.checklist.title}</h2>
              <p className="lead">{data.checklist.lead}</p>
            </div>
            <div className="grid">
              {data.checklist.items.map((it, i) => (
                <div key={it.t} className="item" data-reveal data-delay={String((i % 3) + 1)}>
                  <span className="tick" aria-hidden="true" />
                  <div>
                    <h3 className="it-t">{it.t}</h3>
                    <p className="it-d">{it.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .cl { background: var(--bg-warm); padding: clamp(56px, 7vw, 96px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.06; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15px, 1.7vw, 17px); line-height: 1.6; color: var(--text-muted); margin: 14px auto 0; max-width: 560px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(12px, 1.6vw, 18px); }
            .item { display: flex; gap: 13px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: clamp(18px, 2.2vw, 24px); box-shadow: var(--shadow-sm); }
            .tick { flex: none; width: 22px; height: 22px; margin-top: 1px; border-radius: 999px; background: var(--gold-tint); border: 1px solid rgba(138, 101, 53, 0.3); position: relative; }
            .tick::after { content: ''; position: absolute; left: 7.5px; top: 4px; width: 4px; height: 9px; border: solid var(--gold); border-width: 0 2px 2px 0; transform: rotate(45deg); }
            .it-t { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 0 0 5px; }
            .it-d { font-size: 13.5px; line-height: 1.55; color: var(--text-muted); margin: 0; }
            @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <StatTrio stats={data.stats} />

        {/* ── FAQ ── */}
        <section className="faq">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Questions, answered</p>
              <h2 className="title">The honest <Em>FAQ.</Em></h2>
            </div>
            <div className="list">
              {data.faq.map((f, i) => (
                <div key={f.q} className="qa" data-reveal data-delay={String((i % 3) + 1)}>
                  <h3 className="q">{f.q}</h3>
                  <p className="a">{f.a}</p>
                </div>
              ))}
            </div>
            {data.related && (
              <div className="related" data-reveal>
                <span className="rl-label">Keep comparing</span>
                <div className="rl-links">
                  {data.related.map((r) => (
                    <Link key={r.href} href={r.href} className="rl">{r.label} →</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <style jsx>{`
            .faq { background: var(--bg); padding: clamp(56px, 7vw, 96px) var(--page-pad); }
            .wrap { max-width: 820px; margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .list { display: flex; flex-direction: column; gap: 14px; }
            .qa { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: clamp(20px, 2.4vw, 28px); box-shadow: var(--shadow-sm); }
            .q { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 0 0 9px; }
            .a { font-size: 14.5px; line-height: 1.62; color: var(--text-muted); margin: 0; }
            .related { margin-top: clamp(32px, 4vw, 44px); text-align: center; }
            .rl-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); }
            .rl-links { display: flex; gap: 10px 22px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
            :global(.faq .rl) { font-size: 14px; font-weight: 600; color: var(--gold-dark); text-decoration: none; }
            :global(.faq .rl:hover) { text-decoration: underline; }
          `}</style>
        </section>

        <PageCta title={<>{data.cta.title} <Em>{data.cta.em}</Em></>} sub={data.cta.sub} />
      </main>
      <Footer />
    </>
  )
}
