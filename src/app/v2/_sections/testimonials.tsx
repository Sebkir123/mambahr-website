'use client'

const FEAT = {
  photo: '/v2-people/feat.jpg',
  quote: 'By week two the agent had taken the entire leave and onboarding lane off my desk. For the first time, I spent a week on the people, not the paperwork.',
  name: 'Dana Whitfield',
  role: 'Head of People',
  company: 'Lumen Robotics · 240 employees',
  metric: 'Saved 12 hrs / week',
}

const CARDS = [
  {
    photo: '/v2-people/marcus.jpg',
    quote: 'Multi-state leave used to mean a thread with Legal. Now the answer comes back with the statute already attached.',
    name: 'Marcus Lee',
    role: 'People Ops Lead · Fathom Health',
    metric: 'Saved 9 hrs / week',
  },
  {
    photo: '/v2-people/sofia.jpg',
    quote: 'We moved off our old HRIS on a Friday and ran the next pay cycle without a hiccup. Nothing left behind.',
    name: 'Sofia Reyes',
    role: 'Director of HR · Northwind',
    metric: 'Live in a day',
  },
]

export default function Testimonials() {
  return (
    <section className="ts">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Loved by people teams</p>
          <h2 className="title">Teams that got <span className="em">their week back.</span></h2>
        </div>

        <article className="feat" data-reveal data-delay="1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="feat-photo" src={FEAT.photo} alt={FEAT.name} />
          <div className="feat-body">
            <span className="badge">{FEAT.metric}</span>
            <blockquote className="feat-q">&ldquo;{FEAT.quote}&rdquo;</blockquote>
            <div className="who">
              <div className="who-n">{FEAT.name}</div>
              <div className="who-r">{FEAT.role} · {FEAT.company}</div>
            </div>
          </div>
        </article>

        <div className="row">
          {CARDS.map((c) => (
            <article key={c.name} className="card" data-reveal data-delay="2">
              <span className="badge sm">{c.metric}</span>
              <p className="q">&ldquo;{c.quote}&rdquo;</p>
              <div className="who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="av" src={c.photo} alt={c.name} />
                <div>
                  <div className="who-n">{c.name}</div>
                  <div className="who-r">{c.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ts { background: var(--bg-warm); padding-block: clamp(96px, 13vw, 168px); }
        .wrap { max-width: var(--page-max); margin: 0 auto; padding: 0 var(--page-pad); }
        .head { max-width: 720px; margin-bottom: clamp(36px, 4vw, 52px); }
        .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A6535; margin: 0 0 18px; }
        .title { font-family: var(--font-serif); font-weight: 400; font-size: clamp(36px, 4.8vw, 58px); line-height: 1.05; letter-spacing: -0.025em; color: var(--text); margin: 0; }
        .em { background: linear-gradient(100deg, #B98A4E, #6A5DA6); -webkit-background-clip: text; background-clip: text; color: transparent; font-style: italic; }

        .feat {
          display: grid;
          grid-template-columns: 0.66fr 1fr;
          gap: clamp(20px, 3vw, 40px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 14px;
          box-shadow: var(--shadow-float);
          align-items: stretch;
        }
        .feat-photo { width: 100%; height: 100%; min-height: 360px; object-fit: cover; border-radius: 14px; display: block; background: var(--bg-elevated); }
        .feat-body { padding: clamp(18px, 2.4vw, 34px) clamp(14px, 2vw, 28px) clamp(18px, 2.4vw, 30px) 6px; display: flex; flex-direction: column; }
        .badge { align-self: flex-start; font-family: var(--font-mono); font-size: 11px; color: #fff; background: linear-gradient(120deg, #B98A4E, #6A5DA6); padding: 5px 12px; border-radius: 999px; }
        .badge.sm { background: rgba(20, 18, 14,0.82); }
        .feat-q { font-family: var(--font-serif); font-weight: 400; font-size: clamp(22px, 2.6vw, 31px); line-height: 1.32; letter-spacing: -0.015em; color: var(--text); margin: 20px 0 auto; }
        .who { margin-top: 22px; }
        .who-n { font-size: 14.5px; font-weight: 700; color: var(--text); }
        .who-r { font-size: 13px; color: var(--text-faint); margin-top: 2px; }

        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
        .card { background: var(--bg); border: 1px solid var(--border); border-radius: 18px; padding: 24px; box-shadow: var(--shadow-md); display: flex; flex-direction: column; gap: 18px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-float); }
        .q { font-family: var(--font-serif); font-size: 19px; line-height: 1.4; letter-spacing: -0.01em; color: var(--text); margin: 0; }
        .row .who { margin-top: auto; display: flex; align-items: center; gap: 12px; }
        .av { width: 46px; height: 46px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); background: var(--bg-elevated); }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 820px) {
          .feat { grid-template-columns: 1fr; }
          .feat-photo { min-height: 260px; }
          .row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
