'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

const CARDS: { slug: string; name: string; sub: string; tag: string | null }[] = [
  { slug: 'rippling', name: 'Rippling', sub: 'Rippling gives you software to run. MambaHR does the admin for you.', tag: null },
  { slug: 'gusto', name: 'Gusto', sub: 'Gusto handles payday. MambaHR handles the HR admin around it.', tag: null },
  { slug: 'deel', name: 'Deel', sub: 'Deel runs payroll and hires abroad. MambaHR does your US HR admin and sends Deel the payroll changes.', tag: null },
  { slug: 'bamboohr', name: 'BambooHR', sub: 'BambooHR keeps your records. MambaHR keeps them and does the admin too.', tag: null },
  { slug: 'namely', name: 'Namely', sub: 'Namely gives your team HR software to run. MambaHR also does the admin.', tag: null },
  { slug: 'hibob', name: 'HiBob', sub: 'HiBob gives employees an HR app they like. MambaHR also does the admin for your team.', tag: null },
  { slug: 'adp', name: 'ADP', sub: 'ADP runs payroll and benefits. MambaHR does the everyday HR admin.', tag: null },
  { slug: 'workday', name: 'Workday', sub: 'Workday is a suite your admins configure. MambaHR does the admin, set up in a day.', tag: null },
  { slug: 'justworks', name: 'Justworks', sub: 'Justworks co-employs your team. MambaHR does the admin while you stay the employer.', tag: null },
  { slug: 'trinet', name: 'TriNet', sub: 'TriNet co-employs your team and assigns a rep. MambaHR does the admin directly.', tag: null },
  { slug: 'paychex', name: 'Paychex', sub: 'Paychex sells HR services one by one. MambaHR does the HR admin in one product.', tag: null },
  { slug: 'zenefits', name: 'Zenefits', sub: 'Zenefits puts HR in one dashboard. MambaHR also does the admin.', tag: null },
  { slug: 'paylocity', name: 'Paylocity', sub: 'Paylocity is a suite for your HR team to run. MambaHR also does the admin.', tag: null },
  { slug: 'ukg', name: 'UKG', sub: 'UKG is built for large, shift-based teams. MambaHR takes the HR admin off your plate.', tag: null },
  { slug: 'greenhouse', name: 'Greenhouse', sub: 'Greenhouse runs your hiring pipeline. MambaHR covers hiring and what comes after.', tag: null },
  { slug: 'lever', name: 'Lever', sub: 'Lever helps recruiters find candidates. MambaHR takes a hire from job post to first day.', tag: null },
  { slug: 'remote', name: 'Remote', sub: 'Remote employs people abroad. MambaHR does the HR admin for your US team.', tag: null },
  { slug: 'oyster', name: 'Oyster', sub: 'Oyster hires in other countries. MambaHR does the HR admin for your team at home.', tag: null },
]

/* The choices a team weighs when HR admin piles up, not just vendors. */
const OPTIONS = [
  {
    title: 'Do it by hand',
    good: 'Your team knows your people and your policies.',
    breaks: 'Admin crowds out the work that needs a person: filing, chasing forms, answering the same questions again.',
    mamba: 'MambaHR does the repeat admin, so your team spends its time on people and judgment calls.',
  },
  {
    title: 'Buy more software',
    good: 'Cleaner records, better forms, nicer dashboards.',
    breaks: 'Software stores the work. Someone on your team still does each task, in every tool you bought.',
    mamba: 'MambaHR keeps your HR records and also does the admin. You approve what matters.',
  },
  {
    title: 'Spreadsheets and Slack',
    good: 'Free, flexible and ready today.',
    breaks: 'No record of who changed what, a different process each time, and a missed payroll change becomes a real problem.',
    mamba: 'MambaHR adds approvals and a log of every change, and still works in Slack, where your team already is.',
  },
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
              When HR admin piles up, you have a few choices: do it by hand, buy more software, or
              keep patching it together in spreadsheets. Here is how MambaHR compares, including
              the rows where others do more.
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
              <h2 className="title">Your three <Em>options.</Em></h2>
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
                    <span className="lbl bad">Where it falls short</span>
                    <p>{o.breaks}</p>
                  </div>
                  <div className="block mamba">
                    <span className="lbl gold">With MambaHR</span>
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
              <h2 className="title">Pick the system <Em>you use today.</Em></h2>
              <p className="lead">Side-by-side pages for the main HR records systems, payroll providers, co-employers (PEOs) and hiring tools. Each table includes the rows where the other product does more.</p>
            </div>
            <div className="grid">
              {CARDS.map((c, i) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="card" data-reveal data-delay={String(Math.min((i % 4) + 1, 4))}>
                  {c.tag && <span className="tag">{c.tag}</span>}
                  <span className="vs-l">MambaHR <em>vs</em></span>
                  <span className="nm">{c.name}</span>
                  <span className="sub">{c.sub}</span>
                  <span className="go">Compare</span>
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

        <PageCta
          title={<>See it on <Em>your own requests.</Em></>}
          sub="A 30-minute demo, run on your own HR scenarios."
        />
      </main>
      <Footer />
    </>
  )
}
