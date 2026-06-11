'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import { PageCta, Em } from '@/components/v2/page-kit'

const PRINCIPLES = [
  {
    letter: 'M',
    title: 'Make our customers unstoppable.',
    body: "We build for outcomes, not features. Every workflow, every decision, every release should give our customers more speed, clarity, and control. If it doesn't help them win in real moments, it doesn't ship.",
  },
  {
    letter: 'A',
    title: 'All in on the details.',
    body: "We're obsessed with the craft. The small things matter because they compound into big outcomes. We simplify relentlessly, remove friction, and sweat the details so the product feels fast, clear, and effortless to use.",
  },
  {
    letter: 'M',
    title: 'Move with urgency.',
    body: "Speed is a feature. We don't let things sit, we don't overthink, and we don't wait for perfect. We ship, learn, and improve quickly because progress beats perfection every time.",
  },
  {
    letter: 'B',
    title: 'Be real.',
    body: "No fluff. No hiding. We say what needs to be said, even when it's uncomfortable. We communicate directly, solve problems faster, and operate with honesty inside and outside the company.",
  },
  {
    letter: 'A',
    title: 'Act as one.',
    body: 'No silos. No passengers. We step in, back each other up, and take shared ownership of outcomes. We win together and we lose together.',
  },
]

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
      <main>
        {/* ── Hero ── */}
        <section className="ah">
          <div className="aurora" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
          <span className="v2-grain" />
          <div className="top">
            <p className="eyebrow" data-reveal>About MambaHR</p>
            <h1 className="title" data-reveal data-delay="1">HR is <Em>changing shape.</Em></h1>
            <p className="lead" data-reveal data-delay="2">
              For thirty years, HR software was a database with a UI. We&rsquo;re building what comes
              next — an AI department that <b>does</b> the work, end to end, with a human in the loop
              only when it matters.
            </p>
          </div>
          <div className="stage" data-reveal data-delay="3">
            <div className="photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2-people/team.jpg" alt="A small team at work" />
              <div className="float agent-edge agent-working">
                <span className="mamba-chip working"><span className="mc-i" aria-hidden="true" />Mamba · working</span>
                <div className="f-t">The AI HR department</div>
                <div className="f-m">Made in San Francisco</div>
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
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(42px, 5.8vw, 76px); line-height: 1.02; letter-spacing: -0.03em; color: var(--text); margin: 18px 0 0; white-space: nowrap; }
            .lead { font-size: clamp(17px, 2vw, 20px); line-height: 1.58; color: var(--text-muted); max-width: 640px; margin: 22px auto 0; }
            .lead b { color: var(--text); font-weight: 600; }
            .stage { position: relative; max-width: 880px; margin: clamp(44px, 5.4vw, 64px) auto 0; }
            .photo-wrap { position: relative; }
            .photo-wrap img { display: block; width: 100%; aspect-ratio: 21 / 9; object-fit: cover; border-radius: 18px; box-shadow: 0 30px 60px rgba(20, 18, 14, 0.18); }
            .float { position: absolute; left: 24px; bottom: -26px; background: var(--bg); border: 1px solid var(--border); border-radius: 14px; box-shadow: var(--shadow-float); padding: 14px 18px; }
            .f-t { font-size: 14px; font-weight: 700; color: var(--text); margin-top: 10px; }
            .f-m { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
            @media (max-width: 880px) { .title { white-space: normal; } .photo-wrap img { aspect-ratio: 4 / 3; } }
          `}</style>
        </section>

        {/* ── Manifesto ── */}
        <section className="man">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Manifesto</p>
            <p className="lede" data-reveal data-delay="1">
              Most HR teams are drowning. One person doing the work of ten. Compliance gaps caught by
              auditors, not by the team. Good people lost because their leave request fell into a queue
              and never came back.
            </p>
            <p className="body" data-reveal data-delay="2">
              The tools got better — better dashboards, better forms, better databases. The work
              didn&rsquo;t go anywhere. It just got prettier wrappers.
            </p>
            <p className="body" data-reveal data-delay="2">
              Then AI got good enough to do the reasoning underneath the work. Not summarize a policy —
              work through whether FMLA stacks with California CFRA for an employee in their second
              trimester, cite the statute, and send the hard calls to a human. Not generate a draft —
              run the offer cycle, check the band, route for approval, send the signature link.
            </p>
            <p className="body" data-reveal data-delay="3">
              That changed what HR software can be. Not a system of record. A system of work. An agent
              department where the agent does the job, the human sets the policy, and every action is
              logged for accountability.
            </p>
            <p className="close" data-reveal data-delay="3">That&rsquo;s what we&rsquo;re building.</p>
          </div>
          <style jsx>{`
            .man { background: var(--bg); padding: clamp(88px, 11vw, 144px) var(--page-pad); }
            .wrap { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 26px; }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #8A6535; margin: 0; }
            .lede { font-family: var(--font-serif); font-size: clamp(22px, 2.5vw, 30px); line-height: 1.42; letter-spacing: -0.01em; color: var(--text); margin: 0; }
            .body { font-size: 17px; line-height: 1.75; color: var(--text-muted); margin: 0; }
            .close { font-family: var(--font-serif); font-size: clamp(20px, 2.2vw, 26px); line-height: 1.4; color: var(--text); margin: 6px 0 0; padding-left: 24px; border-left: 3px solid transparent; border-image: linear-gradient(180deg, #B98A4E, #6A5DA6) 1; }
          `}</style>
        </section>

        {/* ── Principles ── */}
        <section className="pr">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">What we believe · M·A·M·B·A</p>
              <h2 className="title">Five things we <Em>don&rsquo;t bend.</Em></h2>
            </div>
            <div className="list">
              {PRINCIPLES.map((p, i) => (
                <div key={`${p.letter}-${i}`} className="row" data-reveal data-delay={String(Math.min(i + 1, 4))}>
                  <span className="ltr" aria-hidden="true">{p.letter}</span>
                  <div className="main">
                    <h3 className="t">{p.title}</h3>
                    <p className="b">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .pr { background: var(--bg-warm); padding: clamp(88px, 11vw, 144px) var(--page-pad); }
            .wrap { max-width: var(--page-max); margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(40px, 5vw, 64px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .list { max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; }
            .row { display: grid; grid-template-columns: minmax(96px, 140px) 1fr; column-gap: clamp(24px, 4vw, 48px); padding: clamp(28px, 3.4vw, 40px) 0; border-top: 1px solid var(--border); align-items: start; }
            .row:last-child { border-bottom: 1px solid var(--border); }
            .ltr {
              font-family: var(--font-serif);
              font-size: clamp(72px, 8vw, 120px);
              line-height: 0.85;
              letter-spacing: -0.04em;
              background: linear-gradient(135deg, #B98A4E, #6A5DA6);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            .t { font-family: var(--font-serif); font-weight: 500; font-size: clamp(21px, 2.4vw, 28px); letter-spacing: -0.015em; color: var(--text); margin: 6px 0 12px; line-height: 1.2; }
            .b { font-size: 16px; color: var(--text-muted); line-height: 1.65; margin: 0; max-width: 620px; }
            @media (max-width: 640px) { .row { grid-template-columns: 1fr; row-gap: 10px; } }
          `}</style>
        </section>

        {/* ── Founders ── */}
        <section className="fd">
          <div className="wrap">
            <div className="head" data-reveal>
              <p className="eyebrow">Founders</p>
              <h2 className="title">The two of us, <Em>for now.</Em></h2>
              <p className="lead">Two founders, one HIL, and an agent that doesn&rsquo;t sleep. We answer our own sales calls, our own support tickets, and our own security questionnaires.</p>
            </div>
            <div className="grid">
              {FOUNDERS.map((p, i) => (
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
                    <span className="li">LinkedIn →</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="jobs" data-reveal>
              The team is small and growing. If this sounds like the work you want to be doing,{' '}
              <a href="mailto:jobs@mambahr.com">jobs@mambahr.com</a>.
            </p>
          </div>
          <style jsx>{`
            .fd { background: var(--bg); padding: clamp(88px, 11vw, 144px) var(--page-pad); }
            .wrap { max-width: 880px; margin: 0 auto; }
            .head { text-align: center; margin-bottom: clamp(36px, 4.4vw, 52px); }
            .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 16px; }
            .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(30px, 3.8vw, 48px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
            .lead { font-size: clamp(15.5px, 1.8vw, 17.5px); line-height: 1.6; color: var(--text-muted); margin: 16px auto 0; max-width: 560px; }
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
            .li { font-family: var(--font-mono); font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold-dark); }
            .jobs { text-align: center; font-size: 14px; color: var(--text-muted); margin: 32px 0 0; }
            :global(.fd .jobs a) { color: var(--gold-dark); font-weight: 700; text-decoration: none; }
            :global(.fd .jobs a:hover) { text-decoration: underline; }
            @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
          `}</style>
        </section>

        <PageCta
          title={<>Come see what <Em>we built.</Em></>}
          sub="A live demo with a founder — not a sales rep. 30 minutes."
        />
      </main>
      <Footer />
    </>
  )
}
