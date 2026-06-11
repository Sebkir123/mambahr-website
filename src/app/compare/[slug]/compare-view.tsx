'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'
import type { CompetitorData } from './data'

function Cell({ value, mine }: { value: string | boolean; mine: boolean }) {
  if (typeof value === 'boolean') {
    return value ? <span className="yes" aria-label="Yes">✓</span> : <span className="no" aria-label="No">—</span>
  }
  return <span className={mine ? 'pill mine' : 'pill'}>{value}</span>
}

export default function CompareView({ data }: { data: CompetitorData }) {
  const [line1, line2] = data.heroHeadline.split('\n')
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main>
        {/* ── Hero ── */}
        <section className="ch">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="top">
            <p className="eyebrow" data-reveal>{data.tagline}</p>
            <h1 className="title" data-reveal data-delay="1">{line1}</h1>
            {line2 && <p className="title2" data-reveal data-delay="1">{line2}</p>}
            <p className="lead" data-reveal data-delay="2">{data.heroSub}</p>
            <div className="ctas" data-reveal data-delay="3">
              <Link href="/demo" className="btn-p">Book a demo</Link>
              <Link href="/pricing" className="btn-g">See pricing</Link>
            </div>
            <div className="proof" data-reveal data-delay="3">
              <div className="faces">
                {['priya', 'anna', 'maya', 'dave', 'brian'].map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p} src={`/avatars/${p}.jpg`} alt="" width={34} height={34} />
                ))}
              </div>
              <span className="proof-t">Teams compare. Then they switch.</span>
            </div>
          </div>
          <style jsx>{`
            .ch { position: relative; overflow: hidden; padding: clamp(124px, 14vw, 168px) var(--page-pad) clamp(56px, 7vw, 84px); background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%); }
            .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
            .aurora::after { content: ''; position: absolute; inset: 0; background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%); }
            .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: chA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: chB 28s ease-in-out infinite alternate; }
            @keyframes chA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes chB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .top { position: relative; max-width: 1000px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(34px, 4.4vw, 58px); line-height: 1.04; letter-spacing: -0.028em; color: var(--text); margin: 18px 0 0; white-space: nowrap; }
            .title2 {
              font-family: var(--font-serif);
              font-style: italic;
              font-size: clamp(30px, 4vw, 52px);
              line-height: 1.04;
              letter-spacing: -0.028em;
              margin: 6px 0 0;
              white-space: nowrap;
              background: linear-gradient(100deg, #B98A4E, #6A5DA6);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            .lead { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.58; color: var(--text-muted); max-width: 680px; margin: 24px auto 0; }
            .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
            :global(.ch .btn-p) {
              display: inline-block; background: #1A1A19; color: #fff; font-weight: 600; font-size: 15.5px;
              padding: 14px 28px; border-radius: 999px; text-decoration: none;
              box-shadow: 0 12px 26px rgba(20, 18, 14, 0.22); transition: transform 0.15s ease;
            }
            :global(.ch .btn-p:hover) { transform: translateY(-2px); }
            :global(.ch .btn-g) {
              display: inline-block; color: var(--text); font-weight: 600; font-size: 15.5px;
              padding: 14px 24px; border-radius: 999px; border: 1px solid var(--border-mid);
              background: rgba(255, 255, 255, 0.6); text-decoration: none;
            }
            :global(.ch .btn-g:hover) { background: #fff; }
            @media (prefers-reduced-motion: reduce) { :global(.ch .btn-p:hover) { transform: none; } }
            .proof { display: flex; align-items: center; gap: 13px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }
            .faces { display: flex; }
            .faces img {
              width: 34px; height: 34px; border-radius: 999px; object-fit: cover;
              border: 2px solid #fff; box-shadow: var(--shadow-sm);
              margin-left: -9px; background: var(--bg-elevated);
            }
            .faces img:first-child { margin-left: 0; }
            .proof-t { font-size: 14px; font-weight: 600; color: var(--text); }
            @media (max-width: 880px) { .title, .title2 { white-space: normal; } }
          `}</style>
        </section>

        {/* ── Why teams switch ── */}
        <section className="why">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Why teams switch</p>
              <h2 className="title">Three reasons, <Em>no fluff.</Em></h2>
            </div>
            <div className="grid">
              {data.switchReasons.map((r, i) => (
                <div key={r.title} className="card" data-reveal data-delay={String(i + 1)}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t">{r.title}</h3>
                  <p className="b">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .why { background: var(--bg); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); }
            .card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(22px, 2.6vw, 30px); box-shadow: var(--shadow-sm); }
            .num {
              font-family: var(--font-serif);
              font-size: 36px;
              line-height: 1;
              background: linear-gradient(120deg, #B98A4E, #6A5DA6);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            .t { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 14px 0 10px; line-height: 1.3; }
            .b { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 0; }
            @media (max-width: 880px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── The table ── */}
        <section className="tb">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Side by side</p>
              <h2 className="title">The honest <Em>table.</Em></h2>
              <p className="lead">Including the rows where {data.name} wins — you&rsquo;ll check anyway.</p>
            </div>
            <div className="card agent-edge agent-done" data-reveal data-delay="1">
              <div className="row hd">
                <span className="f" />
                <span className="m">MambaHR</span>
                <span className="o">{data.name}</span>
              </div>
              {data.tableRows.map((r) => (
                <div key={r.feature} className="row">
                  <span className="f">
                    {r.feature}
                    {r.note && <em className="note">{r.note}</em>}
                  </span>
                  <span className="m"><Cell value={r.mamba} mine /></span>
                  <span className="o"><Cell value={r.them} mine={false} /></span>
                </div>
              ))}
            </div>
            <div className="money" data-reveal>
              <p className="money-t">{data.costLine}</p>
              <Link href="/pricing" className="money-a">Do the math on pricing →</Link>
            </div>
          </div>
          <style jsx>{`
            .tb { background: var(--bg-warm); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: 920px; margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15px, 1.7vw, 17px); line-height: 1.6; color: var(--text-muted); margin: 14px auto 0; max-width: 540px; }
            .card { background: var(--bg); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; box-shadow: var(--shadow-float); }
            .row { display: grid; grid-template-columns: 1.6fr 1fr 1fr; align-items: center; }
            .row + .row { border-top: 1px solid var(--border-faint); }
            .row.hd { background: var(--bg-surface); border-bottom: 1px solid var(--border); }
            .row.hd .m, .row.hd .o { font-size: 13px; font-weight: 700; padding: 14px 12px; text-align: center; }
            .row.hd .m { color: #fff; background: linear-gradient(120deg, #B98A4E, #6A5DA6); }
            .row.hd .o { color: var(--text); }
            .f { padding: 13px 20px; font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; display: flex; flex-direction: column; gap: 3px; }
            .note { font-style: normal; font-size: 12px; font-weight: 400; color: var(--text-faint); }
            .m, .o { padding: 13px 12px; display: flex; justify-content: center; }
            .m { background: rgba(242, 236, 224, 0.45); }
            :global(.tb .yes) { color: var(--color-green); font-weight: 700; font-size: 16px; }
            :global(.tb .no) { color: var(--border-mid); font-size: 16px; }
            :global(.tb .pill) {
              font-size: 12px; font-weight: 600; color: var(--text-muted);
              background: var(--bg-surface); border: 1px solid var(--border);
              padding: 4px 12px; border-radius: 999px; text-align: center; line-height: 1.3;
            }
            :global(.tb .pill.mine) { color: var(--gold-dark); background: var(--gold-tint); border-color: rgba(138, 101, 53, 0.3); }
            @media (max-width: 640px) {
              .row { grid-template-columns: 1.2fr 1fr 1fr; }
              .f { padding: 12px 14px; font-size: 13px; }
            }
            .money {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
              flex-wrap: wrap;
              margin-top: clamp(18px, 2.2vw, 26px);
              border: 1px solid rgba(138, 101, 53, 0.25);
              border-radius: 16px;
              padding: clamp(18px, 2.2vw, 24px) clamp(20px, 2.6vw, 30px);
              background:
                radial-gradient(70% 100% at 4% 0%, rgba(196, 154, 108, 0.18), transparent 55%),
                radial-gradient(60% 100% at 100% 100%, rgba(106, 93, 166, 0.14), transparent 55%),
                var(--bg);
            }
            .money-t { font-family: var(--font-serif); font-size: clamp(16.5px, 1.9vw, 19.5px); line-height: 1.45; color: var(--text); margin: 0; max-width: 620px; letter-spacing: -0.01em; }
            :global(.tb .money-a) { flex: none; font-size: 13.5px; font-weight: 700; color: var(--gold-dark); text-decoration: none; white-space: nowrap; }
            :global(.tb .money-a:hover) { text-decoration: underline; }
          `}</style>
        </section>

        {/* ── Bottom line ── */}
        <section className="bl">
          <div className="wrap" data-reveal>
            <p className="t">{data.bottomLine}</p>
          </div>
          <style jsx>{`
            .bl { background: var(--bg); padding: clamp(64px, 8vw, 96px) var(--page-pad); }
            .wrap { max-width: 760px; margin: 0 auto; text-align: center; }
            .t {
              font-family: var(--font-serif);
              font-size: clamp(22px, 2.6vw, 30px);
              line-height: 1.45;
              letter-spacing: -0.01em;
              color: var(--text);
              margin: 0;
            }
          `}</style>
        </section>

        {/* ── Switching, de-risked ── */}
        <section className="sw">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">The part everyone dreads</p>
              <h2 className="title">Switching takes a day, <Em>not a quarter.</Em></h2>
            </div>
            <div className="grid">
              <div className="step" data-reveal data-delay="1">
                <span className="d">Day 1</span>
                <h3 className="t">Your data imports</h3>
                <p className="b">People, history, documents, time-off balances — pulled from {data.name} in one pass. Nothing re-keyed, nothing lost.</p>
              </div>
              <div className="step" data-reveal data-delay="2">
                <span className="d">Day 2</span>
                <h3 className="t">The department is live</h3>
                <p className="b">Slack and Teams connected, policies loaded, approvals routed to the right people. Your team just starts asking.</p>
              </div>
              <div className="step" data-reveal data-delay="3">
                <span className="d">Week 1</span>
                <h3 className="t">The work is getting done</h3>
                <p className="b">Leave approved, questions answered with citations, the first payroll change file ready to load. You approve the big calls.</p>
              </div>
            </div>
          </div>
          <style jsx>{`
            .sw { background: var(--bg-warm); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); }
            .step { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(22px, 2.6vw, 30px); box-shadow: var(--shadow-sm); }
            .d {
              display: inline-block;
              font-family: var(--font-mono);
              font-size: 10.5px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: #fff;
              background: linear-gradient(120deg, #B98A4E, #6A5DA6);
              border-radius: 999px;
              padding: 4px 11px;
            }
            .t { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 14px 0 8px; }
            .b { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 0; }
            @media (max-width: 880px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <PageCta
          title={<>See the difference <Em>live.</Em></>}
          sub={`Bring your ${data.name} bill to the demo. We'll do the math together.`}
        />
      </main>
      <Footer />
    </>
  )
}
