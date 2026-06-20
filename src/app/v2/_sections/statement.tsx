'use client'

const STATS = [
  { n: 67, prefix: '', suffix: '%', l: 'of HR teams miss compliance deadlines' },
  { n: 4700, prefix: '$', suffix: '', l: 'average cost per hire, mostly admin' },
  { n: 40, prefix: '', suffix: '%', l: 'of HR time spent on admin, not strategy' },
]

export default function Statement() {
  return (
    <section className="st">
      <span className="v2-grain" />
      <div className="inner">
        <h2 className="line" data-reveal>
          You bought the software. You still <span className="em">do the work.</span>
        </h2>
        <p className="body" data-reveal data-delay="1">
          Every HRIS needs people clicking the buttons. For every dollar spent on the
          system, companies spend six on the humans operating it. MambaHR is the operator.
        </p>

        <div className="stats" data-reveal data-delay="2">
          {STATS.map((s) => (
            <div key={s.l} className="stat">
              <div className="num">{s.prefix}<span data-count={String(s.n)}>{s.n.toLocaleString('en-US')}</span>{s.suffix}</div>
              <div className="lbl">{s.l}</div>
            </div>
          ))}
        </div>

        <figure className="quote" data-reveal data-delay="3">
          <blockquote>&ldquo;I was hired to build a great place to work. Instead I spend my days on paperwork.&rdquo;</blockquote>
          <figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatars/head-of-people.jpg" alt="" width={38} height={38} loading="lazy" decoding="async" />
            <span>Head of People · 240 employees</span>
          </figcaption>
        </figure>
      </div>

      <style jsx>{`
        .st {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(70% 55% at 18% -6%, rgba(185, 138, 78, 0.2), transparent 58%),
            radial-gradient(64% 50% at 86% 8%, rgba(106, 93, 166, 0.2), transparent 60%),
            radial-gradient(80% 60% at 50% 110%, rgba(106, 93, 166, 0.1), transparent 60%),
            #14110C;
          padding: clamp(96px, 13vw, 168px) var(--page-pad);
        }
        .inner {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }
        .line {
          font-family: var(--font-serif);
          color: #fff;
          font-weight: 400;
          font-size: clamp(26px, 3.6vw, 46px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .em {
          background: linear-gradient(100deg, #D4AA7C, #B98A4E 55%, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
        }
        .body {
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(17px, 2vw, 19px);
          line-height: 1.6;
          max-width: 620px;
          margin: 28px auto 0;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: clamp(56px, 7vw, 88px);
        }
        .stat {
          padding: 6px 28px;
        }
        .stat + .stat {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }
        .num {
          font-family: var(--font-serif);
          font-size: clamp(40px, 5vw, 60px);
          background: linear-gradient(120deg, #D4AA7C, #B98A4E 60%, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
        }
        .lbl {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.45;
          margin-top: 14px;
        }
        .quote {
          max-width: 620px;
          margin: clamp(52px, 6vw, 76px) auto 0;
          padding-top: clamp(40px, 5vw, 56px);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .quote blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(20px, 2.4vw, 27px);
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: #fff;
          margin: 0;
        }
        .quote figcaption {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin-top: 22px;
        }
        .quote figcaption img {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          object-fit: cover;
        }
        .quote figcaption span {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.62);
        }
        @media (max-width: 760px) {
          .stats { grid-template-columns: 1fr; }
          .stat { padding: 22px 0; }
          .stat + .stat {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </section>
  )
}
