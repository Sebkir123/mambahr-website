'use client'

import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

const PRINCIPLES = [
  {
    title: 'We take the admin',
    text: 'Forms, approvals, reminders and records get done, and every step is logged.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5h6V7H9z" /><path d="M8.5 12.5l2 2 4-4" /></svg>
    ),
  },
  {
    title: 'You make the decisions',
    text: 'Anything sensitive, like an offer above your pay range or a termination, waits for a person.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></svg>
    ),
  },
  {
    title: 'We show our work',
    text: 'Every answer shows the rule behind it, so you can check it.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
]

const TEAM = [
  { name: 'Brian Bell', role: 'Co-founder & CEO', photo: '/brian_bell.jpeg', linkedin: 'https://www.linkedin.com/in/brianjosephbell/' },
  { name: 'Sebastian Kirsch', role: 'Co-founder & CTO', photo: '/sebastian_kirsch.jpg', linkedin: 'https://www.linkedin.com/in/sebastiankirsch-/' },
]

export default function AboutPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <main id="main">
        <section className="about">
          <div className="top">
            <p className="eyebrow" data-reveal="eager">About MambaHR</p>
            <h1 className="title" data-reveal="eager">
              We build HR software that <Em>does the admin.</Em>
            </h1>
            <p className="lead" data-reveal="eager">
              HR teams spend most of their week on forms, approvals and records. MambaHR takes that
              work on, so they can spend their time on people.
            </p>
          </div>

          <div className="stage" data-reveal>
            <span className="field" aria-hidden="true"><i className="f1" /><i className="f2" /><i className="f3" /></span>
            <ul className="principles">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="glass">
                  <span className="ico">{p.icon}</span>
                  <p className="p-t">{p.title}</p>
                  <p className="p-x">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="team" data-reveal>
            <p className="team-l">The team</p>
            <ul className="people">
              {TEAM.map((t) => (
                <li key={t.name} className="person">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="av" src={t.photo} alt="" width={44} height={44} loading="lazy" decoding="async" />
                  <span className="who">
                    <a className="nm" href={t.linkedin} target="_blank" rel="noopener noreferrer">{t.name}</a>
                    <span className="rl">{t.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="hiring">We&rsquo;re hiring. <Link href="/careers">See careers</Link></p>
          </div>
        </section>

        <PageCta
          title={<>See MambaHR <Em>do the work.</Em></>}
          sub="A 30-minute demo using examples from your company."
        />
      </main>
      <Footer />

      <style jsx>{`
        .about { background: var(--bg); padding: clamp(128px, 13vw, 168px) var(--page-pad) clamp(40px, 5vw, 64px); }
        .top { max-width: 900px; margin: 0 auto; text-align: center; }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--gold-dark); margin: 0 0 20px; }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(42px, 6vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.045em;
          color: var(--text);
          margin: 0 auto;
          max-width: 15ch;
          text-wrap: balance;
        }
        .lead { font-size: clamp(17px, 1.9vw, 20px); line-height: 1.6; color: var(--text-muted); max-width: 54ch; margin: 24px auto 0; text-wrap: pretty; }

        .stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          max-width: 1320px;
          margin: clamp(48px, 6vw, 72px) auto 0;
          border-radius: var(--radius-xl);
          padding: clamp(28px, 5vw, 64px);
          background: var(--stage-field);
        }
        .field { position: absolute; inset: 0; z-index: -1; }
        .field i { position: absolute; border-radius: 50%; filter: blur(70px); }
        .f1 { width: 60%; height: 90%; left: -10%; top: -40%; background: radial-gradient(circle, var(--stage-glow-1), transparent 70%); }
        .f2 { width: 55%; height: 90%; right: -12%; bottom: -40%; background: radial-gradient(circle, var(--stage-glow-2), transparent 70%); }
        .f3 { width: 50%; height: 60%; left: 25%; top: 20%; background: radial-gradient(circle, var(--stage-glow-4), transparent 70%); }
        .principles { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(12px, 2vw, 20px); }
        .glass {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: clamp(20px, 2.4vw, 28px);
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          box-shadow: var(--shadow-md);
        }
        .ico { width: 40px; height: 40px; border-radius: var(--radius-full); display: grid; place-items: center; background: var(--gold-tint); color: var(--gold); margin-bottom: 6px; }
        .p-t { margin: 0; font-family: var(--font-serif); font-size: clamp(21px, 2vw, 25px); letter-spacing: -0.02em; color: var(--text); }
        .p-x { margin: 0; font-size: 15.5px; line-height: 1.55; color: var(--text-muted); }

        .team {
          max-width: 1180px;
          margin: clamp(40px, 5vw, 56px) auto 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px 36px;
          padding: 22px 0;
          border-top: 1px solid var(--border-faint);
          border-bottom: 1px solid var(--border-faint);
        }
        .team-l { margin: 0; font-size: 14px; font-weight: 600; color: var(--text-faint); }
        .people { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 12px 32px; }
        .person { display: flex; align-items: center; gap: 12px; }
        .av { width: 44px; height: 44px; border-radius: var(--radius-full); object-fit: cover; object-position: 50% 25%; filter: saturate(0.9); }
        .who { display: flex; flex-direction: column; line-height: 1.3; }
        .nm { font-size: 15px; font-weight: 600; color: var(--text); text-decoration: none; }
        .nm:hover { text-decoration: underline; text-underline-offset: 3px; }
        .rl { font-size: 13.5px; color: var(--text-muted); }
        .hiring { margin: 0 0 0 auto; font-size: 15px; color: var(--text-muted); }
        .hiring :global(a) { color: var(--text); font-weight: 600; text-decoration: underline; text-decoration-color: var(--border-mid); text-underline-offset: 3px; }
        .hiring :global(a:hover) { text-decoration-color: var(--text); }

        @media (max-width: 900px) {
          .principles { grid-template-columns: 1fr; }
          .hiring { margin-left: 0; }
        }
      `}</style>
    </>
  )
}
