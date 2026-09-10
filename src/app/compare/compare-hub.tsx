'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

const CARDS = [
  { slug: 'rippling', name: 'Rippling', sub: 'Rippling is the stack. MambaHR is the department, and the stack.', tag: 'Most requested' },
  { slug: 'gusto', name: 'Gusto', sub: 'Gusto handles payday. MambaHR handles every other day.', tag: null },
  { slug: 'deel', name: 'Deel', sub: 'Deel is global payroll and EOR. MambaHR runs your US HR, on Deel for payroll.', tag: null },
  { slug: 'bamboohr', name: 'BambooHR', sub: 'BambooHR stores your data. MambaHR acts on it.', tag: null },
  { slug: 'namely', name: 'Namely', sub: 'Namely made the HRIS prettier. MambaHR makes it unnecessary.', tag: null },
  { slug: 'hibob', name: 'HiBob', sub: 'HiBob made HR look modern. MambaHR makes it do the work.', tag: null },
  { slug: 'adp', name: 'ADP', sub: 'ADP is the back office. MambaHR is the front line.', tag: null },
  { slug: 'workday', name: 'Workday', sub: 'Workday is a project. MambaHR is a product.', tag: null },
  { slug: 'justworks', name: 'Justworks', sub: 'Justworks gives you a support queue. MambaHR gives you the answer.', tag: null },
  { slug: 'trinet', name: 'TriNet', sub: 'TriNet is a PEO with a rep. MambaHR is the department.', tag: null },
  { slug: 'paychex', name: 'Paychex', sub: 'Paychex sells you services. MambaHR does the work.', tag: null },
  { slug: 'zenefits', name: 'Zenefits', sub: 'Zenefits gave you a dashboard. MambaHR does the work behind it.', tag: null },
  { slug: 'paylocity', name: 'Paylocity', sub: 'Paylocity is a suite to operate. MambaHR does the operating.', tag: null },
  { slug: 'ukg', name: 'UKG', sub: 'UKG is software you implement. MambaHR you turn on.', tag: null },
  { slug: 'greenhouse', name: 'Greenhouse', sub: 'Greenhouse is an ATS. MambaHR hires, then runs the rest.', tag: null },
  { slug: 'lever', name: 'Lever', sub: 'Lever is recruiting software. MambaHR is the whole department.', tag: null },
  { slug: 'remote', name: 'Remote', sub: 'Remote pays across borders. MambaHR runs the team you employ.', tag: null },
  { slug: 'oyster', name: 'Oyster', sub: 'Oyster hires across borders. MambaHR runs the team at home.', tag: null },
]

/* The choices teams actually weigh when HR gets messy, not just vendors. */
const OPTIONS = [
  {
    title: 'Hire someone',
    good: 'Judgment, presence, a person who owns it. Nothing replaces that.',
    breaks: 'They arrive to a backlog. Most of year one goes on filing and chasing instead of the work you hired them for.',
    mamba: 'MambaHR does the repeatable work, so the person you hire spends their time on judgment from day one, not on cleanup.',
  },
  {
    title: 'Buy more software',
    good: 'Cleaner records, better forms, nicer dashboards.',
    breaks: 'A system of record stores the work. Someone on your team still does it, in every module you bought.',
    mamba: 'MambaHR is the system of record and the worker in one. The data lives there, and the work gets done there.',
  },
  {
    title: 'Spreadsheets & Slack',
    good: 'Free, flexible, starts today.',
    breaks: 'Breaks fast. No audit trail, inconsistent process, and the payroll change someone forgot becomes a real problem.',
    mamba: 'MambaHR gives you structure, workflows, and an audit trail from day one, still in Slack, where your team already is.',
  },
]

const DIFFS = [
  { num: '01', title: 'It does the work.', desc: 'Leave approved. Offer drafted. Candidate screened. MambaHR handles the request end-to-end, not just surfaces the information for someone else to act on.' },
  { num: '02', title: 'Ask in Slack. The work happens in MambaHR.', desc: 'No new software to learn. Employees mention @MambaHR in any channel and get answers in seconds. Managers approve in a thread.' },
  { num: '03', title: 'Human in the loop.', desc: 'Every high-stakes decision, offers above band, terminations, large raises, routes to you for approval before anything happens. MambaHR handles the routine, you handle the judgment.' },
  { num: '04', title: 'Built for the long tail.', desc: 'The compliance engine, the audit trail, the specialist agents, all of it built for the HR lead doing the work of ten.' },
]

export default function CompareHub() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        {/* ── Hero ── */}
        <section className="ch">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="top">
            <p className="eyebrow" data-reveal>Compare</p>
            <h1 className="title" data-reveal data-delay="1">Weigh your <Em>options.</Em></h1>
            <p className="lead" data-reveal data-delay="2">
              When HR work gets messy, you have a few choices: hire someone, buy another system, or keep
              stitching it together yourself. Here&rsquo;s the honest comparison against all of them,
              including the rows we lose.
            </p>
            <div className="ctas" data-reveal data-delay="3">
              <Link href="/demo" className="btn-p">Book a demo</Link>
              <Link href="/pricing" className="btn-g">See pricing</Link>
            </div>
          </div>
          <style jsx>{`
            .ch { position: relative; overflow: hidden; padding: clamp(124px, 14vw, 168px) var(--page-pad) clamp(56px, 7vw, 84px); background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%); }
            .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
            .aurora::after { content: ''; position: absolute; inset: 0; background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%); }
            .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: cmA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: cmB 28s ease-in-out infinite alternate; }
            @keyframes cmA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes cmB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .top { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(42px, 5.8vw, 76px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 18px 0 0; text-wrap: balance; }
            .lead { font-size: clamp(16.5px, 1.9vw, 19px); line-height: 1.58; color: var(--text-muted); max-width: 660px; margin: 22px auto 0; }
            .ctas { display: flex; gap: 13px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
            :global(.ch .btn-p) {
              display: inline-block; background: var(--text); color: #fff; font-weight: 600; font-size: 16px;
              padding: 14px 28px; border-radius: 999px; text-decoration: none;
              box-shadow: 0 12px 26px rgba(20, 18, 14, 0.22); transition: transform 0.15s ease;
            }
            :global(.ch .btn-p:hover) { transform: translateY(-2px); }
            :global(.ch .btn-g) {
              display: inline-block; color: var(--text); font-weight: 600; font-size: 16px;
              padding: 14px 24px; border-radius: 999px; border: 1px solid var(--border-mid);
              background: rgba(255, 255, 255, 0.6); text-decoration: none;
            }
            :global(.ch .btn-g:hover) { background: #fff; }
            @media (prefers-reduced-motion: reduce) { :global(.ch .btn-p:hover) { transform: none; } }
          `}</style>
        </section>

        {/* ── The real options ── */}
        <section className="op">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Before the vendors</p>
              <h2 className="title">Your three real <Em>options.</Em></h2>
            </div>
            <div className="grid">
              {OPTIONS.map((o, i) => (
                <div key={o.title} className="card" data-reveal data-delay={String(i + 1)}>
                  <h3 className="t">{o.title}</h3>
                  <div className="block">
                    <span className="lbl good">What it&rsquo;s good for</span>
                    <p>{o.good}</p>
                  </div>
                  <div className="block">
                    <span className="lbl bad">Where it breaks</span>
                    <p>{o.breaks}</p>
                  </div>
                  <div className="block mamba">
                    <span className="lbl gold">The MambaHR answer</span>
                    <p>{o.mamba}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .op { background: var(--bg); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 1.8vw, 22px); align-items: stretch; }
            .card { display: flex; flex-direction: column; gap: 16px; background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(22px, 2.6vw, 28px); box-shadow: var(--shadow-sm); }
            .t { font-family: var(--font-serif); font-size: 22px; font-weight: 500; color: var(--text); margin: 0; letter-spacing: -0.01em; }
            .block p { font-size: 14px; line-height: 1.55; color: var(--text-muted); margin: 6px 0 0; }
            .block.mamba { margin-top: auto; background: var(--bg-warm); border: 1px solid var(--border-faint); border-radius: 12px; padding: 13px 15px; }
            .lbl { font-family: var(--font-mono); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
            .lbl.good { color: var(--color-green); }
            .lbl.bad { color: #B0584A; }
            .lbl.gold { color: var(--gold-dark); }
            @media (max-width: 880px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── Vendor grid ── */}
        <section className="vs">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Head to head</p>
              <h2 className="title">Pick your <Em>incumbent.</Em></h2>
              <p className="lead">Honest comparisons against every major HRIS, PEO, payroll, and ATS, feature tables included, the rows we lose included.</p>
            </div>
            <div className="grid">
              {CARDS.map((c, i) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="card" data-reveal data-delay={String(Math.min((i % 4) + 1, 4))}>
                  {c.tag && <span className="tag">{c.tag}</span>}
                  <span className="vs-l">MambaHR <em>vs</em></span>
                  <span className="nm">{c.name}</span>
                  <span className="sub">{c.sub}</span>
                  <span className="go">Read the comparison →</span>
                </Link>
              ))}
            </div>
          </div>
          <style jsx>{`
            .vs { background: var(--bg-warm); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15px, 1.7vw, 17px); line-height: 1.6; color: var(--text-muted); margin: 14px auto 0; max-width: 540px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.4vw, 18px); }
            :global(.vs .card) {
              position: relative;
              display: flex;
              flex-direction: column;
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 16px;
              padding: clamp(20px, 2.2vw, 26px);
              text-decoration: none;
              box-shadow: var(--shadow-sm);
              transition: transform 0.16s ease, box-shadow 0.16s ease;
            }
            :global(.vs .card:hover) { transform: translateY(-4px); box-shadow: var(--shadow-float); }
            @media (prefers-reduced-motion: reduce) { :global(.vs .card:hover) { transform: none; } }
            .tag {
              position: absolute;
              top: -10px;
              left: 18px;
              font-family: var(--font-mono);
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #fff;
              background: linear-gradient(120deg, var(--gold-mid), var(--violet));
              border-radius: 999px;
              padding: 4px 11px;
              box-shadow: 0 0 0 4px var(--bg);
            }
            .vs-l { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-faint); }
            .vs-l em { font-style: italic; color: var(--gold-dark); }
            .nm { font-family: var(--font-serif); font-size: clamp(22px, 2.2vw, 28px); color: var(--text); letter-spacing: -0.015em; margin-top: 6px; }
            .sub { font-size: 13px; line-height: 1.5; color: var(--text-muted); margin-top: 10px; flex: 1; }
            .go { font-size: 13px; font-weight: 700; color: var(--gold-dark); margin-top: 16px; }
            @media (max-width: 1080px) { .grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── What makes it different ── */}
        <section className="df">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Whoever you compare us to</p>
              <h2 className="title">Four things only <Em>we do.</Em></h2>
            </div>
            <div className="grid">
              {DIFFS.map((d, i) => (
                <div key={d.num} className="card" data-reveal data-delay={String(i + 1)}>
                  <span className="num">{d.num}</span>
                  <h3 className="t">{d.title}</h3>
                  <p className="b">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .df { background: var(--bg); padding: clamp(72px, 9vw, 112px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(32px, 4vw, 48px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(14px, 1.8vw, 22px); }
            .card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(22px, 2.6vw, 30px); box-shadow: var(--shadow-sm); }
            .num {
              font-family: var(--font-serif);
              font-size: 34px;
              line-height: 1;
              background: linear-gradient(120deg, var(--gold-mid), var(--violet));
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            .t { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; margin: 12px 0 8px; }
            .b { font-size: 14px; line-height: 1.6; color: var(--text-muted); margin: 0; }
            @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <PageCta
          title={<>Compare it <Em>live.</Em></>}
          sub="Bring your current bill to the demo. We'll do the math together."
        />
      </main>
      <Footer />
    </>
  )
}
