'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

const FOUNDERS = [
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
      <main id="main">
        {/* ── Hero ── */}
        <section className="ah">
          <div className="wrap">
            <p className="eyebrow" data-reveal="eager">About MambaHR</p>
            <h1 className="title" data-reveal="eager">
              We build HR software that <Em>does the admin.</Em>
            </h1>
            <p className="lead" data-reveal="eager">
              HR teams spend most of their week on forms, approvals and records. MambaHR takes that
              work on, so they can spend their time on people.
            </p>
          </div>
          <style jsx>{`
            .ah {
              padding: clamp(128px, 14vw, 176px) var(--page-pad) clamp(40px, 5vw, 64px);
              background: var(--bg);
            }
            .wrap { max-width: 1180px; margin: 0 auto; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 20px; }
            .title {
              font-family: var(--font-serif);
              font-weight: 400;
              font-size: clamp(44px, 6.4vw, 92px);
              line-height: 0.98;
              letter-spacing: -0.045em;
              color: var(--text);
              margin: 0;
              max-width: 14ch;
              text-wrap: balance;
            }
            .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 52ch; margin: 26px 0 0; }
          `}</style>
        </section>

        {/* ── The founders, on the same luminous field as the homepage ── */}
        <section className="fd">
          <div className="stage" data-reveal>
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
            <h2 className="h">The founders</h2>
            <div className="grid">
              {FOUNDERS.map((p) => (
                <article key={p.name} className="card">
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={p.name} loading="lazy" decoding="async" />
                  </div>
                  <div className="meta">
                    <div>
                      <p className="nm">{p.name}</p>
                      <p className="rl">{p.role}</p>
                    </div>
                    <a className="li" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                      LinkedIn
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <style jsx>{`
            .fd { padding: 0 var(--page-pad) clamp(56px, 7vw, 96px); background: var(--bg); }
            .stage {
              position: relative;
              isolation: isolate;
              overflow: hidden;
              max-width: 1320px;
              margin: 0 auto;
              border-radius: 32px;
              padding: clamp(40px, 6vw, 72px) clamp(20px, 5vw, 72px);
              background: linear-gradient(155deg, #f3c796 0%, #eab2a4 40%, #c3aee0 72%, #9d8fe0 100%);
            }
            .field { position: absolute; inset: 0; z-index: -1; }
            .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
            .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, rgba(255, 226, 184, 0.95), rgba(255, 226, 184, 0) 70%); }
            .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, rgba(139, 127, 208, 0.9), rgba(139, 127, 208, 0) 70%); }
            .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, rgba(255, 246, 234, 0.7), rgba(255, 246, 234, 0) 70%); }
            .h {
              font-family: var(--font-serif);
              font-weight: 400;
              font-size: clamp(30px, 3.6vw, 44px);
              letter-spacing: -0.03em;
              color: var(--text);
              margin: 0 0 clamp(24px, 3vw, 36px);
              text-align: center;
            }
            .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(16px, 2.4vw, 28px); max-width: 880px; margin: 0 auto; }
            .card {
              background: rgba(255, 255, 255, 0.72);
              -webkit-backdrop-filter: blur(16px);
              backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.85);
              border-radius: 22px;
              padding: 10px;
              box-shadow: 0 24px 48px -24px rgba(60, 40, 90, 0.4);
            }
            /* One crop and one tone for both portraits, so two different shoots read as a set. */
            .ph { aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden; background: #e9e2d8; }
            .ph img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; display: block; filter: saturate(0.88) contrast(1.03); }
            .meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 10px 8px; }
            .nm { margin: 0; font-family: var(--font-serif); font-size: 22px; letter-spacing: -0.01em; color: var(--text); }
            .rl { margin: 2px 0 0; font-size: 14px; color: var(--text-muted); }
            .li {
              display: inline-flex;
              align-items: center;
              gap: 7px;
              height: 40px;
              padding: 0 14px;
              border-radius: 999px;
              border: 1px solid rgba(26, 26, 25, 0.12);
              background: #fff;
              color: var(--text);
              font-size: 13.5px;
              font-weight: 600;
              text-decoration: none;
              flex: none;
            }
            .li:hover { border-color: var(--text); }
            .li:focus-visible { outline: 2px solid var(--violet); outline-offset: 2px; }
            @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        {/* ── Hiring ── */}
        <section className="hi">
          <div className="band" data-reveal>
            <div>
              <h2 className="h">We&rsquo;re hiring.</h2>
              <p className="p">If you&rsquo;d like to build HR software that does the work, we&rsquo;d like to hear from you.</p>
            </div>
            <Link href="/careers" className="btn btn-primary">See careers</Link>
          </div>
          <style jsx>{`
            .hi { padding: 0 var(--page-pad) clamp(24px, 4vw, 48px); background: var(--bg); }
            .band {
              max-width: 1180px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              gap: 20px 40px;
              padding: clamp(28px, 4vw, 40px) 0;
              border-top: 1px solid var(--border-faint);
              border-bottom: 1px solid var(--border-faint);
            }
            .h { font-family: var(--font-serif); font-weight: 400; font-size: clamp(28px, 3.4vw, 40px); letter-spacing: -0.03em; color: var(--text); margin: 0; }
            .p { margin: 8px 0 0; font-size: 17px; color: var(--text-muted); max-width: 52ch; }
          `}</style>
        </section>

        <PageCta
          title={<>See MambaHR <Em>do the work.</Em></>}
          sub="A 30-minute demo using examples from your company."
        />
      </main>
      <Footer />
    </>
  )
}
