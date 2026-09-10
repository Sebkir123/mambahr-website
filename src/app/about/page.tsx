'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageCta, Em } from '@/components/v2/page-kit'
/* The platform, everything the department runs, each a real page. */
const PLATFORM = [
  { label: 'Hiring', desc: 'Job post to signed offer', href: '/hiring' },
  { label: 'Careers page', desc: 'Hosted on your domain', href: '/job-portal' },
  { label: 'Onboarding', desc: 'Day-one ready', href: '/onboarding' },
  { label: 'Payroll changes', desc: 'Every change in before payday', href: '/payroll' },
  { label: 'Time off & leave', desc: 'Vacation days to family leave', href: '/leave' },
  { label: 'Compensation', desc: 'Priced to your pay ranges', href: '/compensation' },
  { label: 'Compliance', desc: 'Every answer cites the law', href: '/compliance' },
  { label: 'Headcount & layoffs', desc: 'Notices, severance, final pay', href: '/rif' },
  { label: 'Employee records', desc: 'Every record, always current', href: '/people' },
  { label: 'Documents & e-sign', desc: 'Signed and filed', href: '/documents' },
  { label: 'Security', desc: 'Locked down, logged', href: '/security' },
]

const LEADERSHIP = [
  {
    name: 'Brian Bell',
    role: 'Co-founder & CEO',
    photo: '/brian_bell.jpeg',
    linkedin: 'https://www.linkedin.com/in/brianjosephbell/',
  },
  {
    name: 'Sebastian Kirsch',
    role: 'Co-founder & CTO',
    photo: '/sebastian_kirsch.jpg',
    linkedin: 'https://www.linkedin.com/in/sebastiankirsch-/',
  },
]

export default function AboutPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        {/* ── Hero ── */}
        <section className="ah">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="top">
            <p className="eyebrow" data-reveal>About MambaHR</p>
            <h1 className="title" data-reveal data-delay="1">The AI HR <Em>department.</Em></h1>
            <p className="lead" data-reveal data-delay="2">
              For thirty years, HR software was a database with a UI, and companies paid people to click
              through it. MambaHR is the company building what comes next: an AI department that <b>does</b> the
              work end to end, with a human on the calls that matter.
            </p>
          </div>
          <div className="stage" data-reveal data-delay="3">
            <div className="photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2-people/team.jpg" alt="A team at work" />
              <div className="float agent-edge agent-working">
                <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />MambaHR · working</span>
                <div className="f-t">The AI HR department</div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .ah { position: relative; overflow: hidden; padding: clamp(124px, 14vw, 172px) var(--page-pad) clamp(64px, 8vw, 96px); background: linear-gradient(180deg, #F7F3EB 0%, var(--bg-warm) 58%); }
            .aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
            .aurora::after { content: ''; position: absolute; inset: 0; background: radial-gradient(54% 48% at 50% 32%, rgba(254, 253, 250, 0.82), rgba(254, 253, 250, 0) 72%); }
            .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
            .b1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(196, 154, 108, 0.58), rgba(196, 154, 108, 0) 68%); top: -220px; left: -140px; animation: ahA 24s ease-in-out infinite alternate; }
            .b2 { width: 640px; height: 640px; background: radial-gradient(circle, rgba(106, 93, 166, 0.46), rgba(106, 93, 166, 0) 68%); top: -170px; right: -130px; animation: ahB 28s ease-in-out infinite alternate; }
            @keyframes ahA { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.16); } }
            @keyframes ahB { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-110px, 60px) scale(1.1); } }
            @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
            .top { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(42px, 5.8vw, 76px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 18px 0 0; text-wrap: balance; }
            .lead { font-size: clamp(17px, 2vw, 20px); line-height: 1.58; color: var(--text-muted); max-width: 660px; margin: 22px auto 0; }
            .lead b { color: var(--text); font-weight: 600; }
            .stage { position: relative; max-width: 880px; margin: clamp(44px, 5.4vw, 64px) auto 0; }
            .photo-wrap { position: relative; }
            .photo-wrap img { display: block; width: 100%; aspect-ratio: 21 / 9; object-fit: cover; border-radius: 18px; box-shadow: 0 30px 60px rgba(20, 18, 14, 0.18); }
            .float { position: absolute; left: 24px; bottom: -26px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; box-shadow: var(--shadow-float); padding: 14px 18px; }
            .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
            @media (max-width: 880px) { .photo-wrap img { aspect-ratio: 4 / 3; } }
          `}</style>
        </section>


        {/* ── The platform ── */}
        <section className="pf">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">What we build</p>
              <h2 className="title">One department, <Em>every job.</Em></h2>
              <p className="lead">
                MambaHR is the record and the worker in one. It is the applicant tracking system (ATS) and
                the recruiter, the careers page and the coordinator, the HR records system (HRIS) and the
                ops manager. Eleven functions, one system, every action logged.
              </p>
            </div>
            <div className="grid">
              {PLATFORM.map((p, i) => (
                <Link key={p.label} href={p.href} className="cell" data-reveal data-delay={String(Math.min((i % 4) + 1, 4))}>
                  <span className="c-l">{p.label}</span>
                  <span className="c-d">{p.desc}</span>
                  <span className="c-a" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
          <style jsx>{`
            .pf { background: var(--bg-warm); padding: clamp(80px, 10vw, 128px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(36px, 4.4vw, 52px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15.5px, 1.8vw, 17.5px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 640px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.4vw, 18px); }
            :global(.pf .cell) {
              position: relative;
              display: flex;
              flex-direction: column;
              gap: 4px;
              background: var(--bg);
              border: 1px solid var(--border);
              border-radius: 14px;
              padding: 18px 18px 16px;
              text-decoration: none;
              box-shadow: var(--shadow-sm);
              transition: transform 0.16s ease, box-shadow 0.16s ease;
            }
            :global(.pf .cell:hover) { transform: translateY(-3px); box-shadow: var(--shadow-float); }
            @media (prefers-reduced-motion: reduce) { :global(.pf .cell:hover) { transform: none; } }
            .c-l { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.01em; }
            .c-d { font-size: 13px; color: var(--text-muted); }
            .c-a { position: absolute; top: 16px; right: 16px; font-size: 13px; color: var(--gold-dark); opacity: 0; transition: opacity 0.16s ease; }
            :global(.pf .cell:hover) .c-a { opacity: 1; }
            @media (max-width: 1080px) { .grid { grid-template-columns: repeat(3, 1fr); } }
            @media (max-width: 720px) { .grid { grid-template-columns: repeat(2, 1fr); } }
          `}</style>
        </section>

        {/* ── Leadership ── */}
        <section className="fd">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Leadership</p>
              <h2 className="title">The <Em>founders.</Em></h2>
            </div>
            <div className="grid">
              {LEADERSHIP.map((p, i) => (
                <a key={p.name} className="card" href={p.linkedin} target="_blank" rel="noopener noreferrer" data-reveal data-delay={String(i + 1)}>
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={p.name} />
                    <span className="scrim" aria-hidden="true" />
                    <div className="who">
                      <span className="nm">{p.name}</span>
                      <span className="rl">{p.role}</span>
                    </div>
                  </div>
                  <div className="foot">
                    <span className="li">LinkedIn</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="facts" data-reveal>
              <span className="fact"><i aria-hidden="true" />Headquartered in San Francisco</span>
              <span className="fact"><i aria-hidden="true" />US data residency</span>
              <span className="fact"><i aria-hidden="true" />Statute cited on every answer</span>
              <span className="fact"><i aria-hidden="true" />We&rsquo;re hiring, <a href="mailto:hello@mambahr.com">hello@mambahr.com</a></span>
            </div>
          </div>
          <style jsx>{`
            .fd { background: var(--bg-warm); padding: clamp(80px, 10vw, 128px) var(--page-pad); }
            .wrap { max-width: 880px; margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(36px, 4.4vw, 52px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 2vw, 24px); }
            :global(.fd .card) { display: flex; flex-direction: column; border-radius: 18px; overflow: hidden; background: var(--bg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); text-decoration: none; transition: transform 0.18s ease, box-shadow 0.18s ease; }
            :global(.fd .card:hover) { transform: translateY(-4px); box-shadow: var(--shadow-float); }
            @media (prefers-reduced-motion: reduce) { :global(.fd .card:hover) { transform: none; } }
            .ph { position: relative; aspect-ratio: 4 / 3.4; }
            .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
            .scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20, 17, 12, 0) 55%, rgba(20, 17, 12, 0.6) 100%); }
            .who { position: absolute; left: 18px; right: 18px; bottom: 16px; display: flex; flex-direction: column; gap: 2px; }
            .nm { color: #fff; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; text-shadow: 0 1px 8px rgba(20, 17, 12, 0.4); }
            .rl { color: rgba(255, 255, 255, 0.85); font-size: 13px; }
            .foot { display: flex; align-items: center; justify-content: flex-end; padding: 12px 16px; border-top: 1px solid var(--border-faint); }
            .li { font-family: var(--font-mono); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold-dark); }
            .facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 22px; margin-top: clamp(28px, 3.4vw, 40px); padding-top: clamp(20px, 2.4vw, 28px); border-top: 1px solid var(--border-faint); }
            .fact { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: var(--text-muted); }
            .fact i { width: 6px; height: 6px; border-radius: 999px; background: linear-gradient(120deg, var(--gold-mid), var(--violet)); }
            :global(.fd .fact a) { color: var(--gold-dark); font-weight: 700; text-decoration: none; }
            :global(.fd .fact a:hover) { text-decoration: underline; }
            @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <PageCta
          title={<>See MambaHR <Em>do the work.</Em></>}
          sub="A 30-minute demo on your own scenarios. Then we import your data and switch you over."
        />
      </main>
      <Footer />
    </>
  )
}
