'use client'

const FEAT = {
  photo: '/v2-people/feat.jpg',
  quote: 'By week two, Mamba had taken leave and onboarding off my desk completely. I finally spend my week on people, not paperwork.',
  name: 'Dana Whitfield',
  role: 'Head of People · Lumen Robotics',
  results: [
    { n: '12 hrs', l: 'back, every week' },
    { n: '1 day', l: 'to switch over' },
    { n: '240', l: 'employees · 2 in HR' },
  ],
}

const CARDS = [
  {
    photo: '/v2-people/marcus.jpg',
    badge: 'Saved 9 hrs / week',
    quote: 'Multi-state leave used to mean a week of emails with Legal. Now the answer comes back in seconds — with the law attached.',
    name: 'Marcus Lee',
    role: 'People Ops Lead · Fathom Health',
  },
  {
    photo: '/v2-people/sofia.jpg',
    badge: 'Live in a day',
    quote: 'We switched on a Friday and ran payday Monday without a hiccup. Nothing fell through.',
    name: 'Sofia Reyes',
    role: 'Director of HR · Northwind',
  },
]

export default function Testimonials() {
  return (
    <section className="ts">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Loved by people teams</p>
          <h2 className="title">Don&rsquo;t take our word <span className="em">for it.</span></h2>
        </div>

        <article className="feat" data-reveal data-delay="1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="feat-photo" src={FEAT.photo} alt={FEAT.name} />
          <div className="feat-body">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <blockquote className="feat-q">&ldquo;{FEAT.quote}&rdquo;</blockquote>
            <div className="who">
              <div className="who-n">{FEAT.name}</div>
              <div className="who-r">{FEAT.role}</div>
            </div>
            <div className="results">
              {FEAT.results.map((r) => (
                <div key={r.l} className="res">
                  <div className="res-n">{r.n}</div>
                  <div className="res-l">{r.l}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="row">
          {CARDS.map((c) => (
            <article key={c.name} className="card" data-reveal data-delay="2">
              <span className="badge">{c.badge}</span>
              <p className="q">&ldquo;{c.quote}&rdquo;</p>
              <div className="who small">
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
          grid-template-columns: 0.62fr 1fr;
          gap: clamp(20px, 3vw, 44px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 14px;
          box-shadow: var(--shadow-float);
          align-items: stretch;
        }
        .feat-photo {
          width: 100%;
          height: 100%;
          min-height: 320px;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          background: var(--bg-elevated);
        }
        .feat-body {
          padding: clamp(16px, 2.2vw, 30px) clamp(14px, 2vw, 28px) clamp(16px, 2.2vw, 26px) 6px;
          display: flex;
          flex-direction: column;
        }
        .stars {
          color: #B98A4E;
          font-size: 15px;
          letter-spacing: 3px;
        }
        .feat-q {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(21px, 2.5vw, 29px);
          line-height: 1.34;
          letter-spacing: -0.015em;
          color: var(--text);
          margin: 16px 0 0;
        }
        .who { margin-top: 20px; }
        .who-n { font-size: 14.5px; font-weight: 700; color: var(--text); }
        .who-r { font-size: 13px; color: var(--text-faint); margin-top: 2px; }
        .results {
          margin-top: auto;
          padding-top: 22px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          border-top: 1px solid var(--border-faint);
        }
        .res-n {
          font-family: var(--font-serif);
          font-size: clamp(22px, 2.2vw, 28px);
          line-height: 1;
          background: linear-gradient(110deg, #8A6535, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .res-l { font-size: 12px; color: var(--text-faint); margin-top: 6px; line-height: 1.35; }

        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
        .card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-float); }
        .badge {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #fff;
          background: linear-gradient(120deg, #B98A4E, #6A5DA6);
          padding: 5px 12px;
          border-radius: 999px;
        }
        .q {
          font-family: var(--font-serif);
          font-size: 18.5px;
          line-height: 1.42;
          letter-spacing: -0.01em;
          color: var(--text);
          margin: 0;
        }
        .who.small { display: flex; align-items: center; gap: 12px; margin-top: auto; }
        .av { width: 44px; height: 44px; border-radius: 999px; object-fit: cover; border: 2px solid #fff; box-shadow: var(--shadow-sm); background: var(--bg-elevated); }

        @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }
        @media (max-width: 820px) {
          .feat { grid-template-columns: 1fr; }
          .feat-photo { min-height: 240px; }
          .row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
