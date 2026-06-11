'use client'

export default function PeopleBand() {
  return (
    <section className="pb">
      <div className="wrap">
        <div className="copy" data-reveal>
          <p className="eyebrow">Built for people teams</p>
          <h2 className="title">
            HR is a people job.<br />
            We do the <span className="em">paperwork part.</span>
          </h2>
          <p className="lead">
            MambaHR takes the admin off your team&rsquo;s plate so they can do the human work
            only they can — the coaching, the culture, the hard conversations.
          </p>
          <ul className="points">
            <li><span className="tick" aria-hidden="true" />The agent handles the filings, approvals, and follow-ups</li>
            <li><span className="tick" aria-hidden="true" />Your team keeps the judgment calls and the relationships</li>
            <li><span className="tick" aria-hidden="true" />Every action logged, nothing happens without a trail</li>
          </ul>
        </div>

        <div className="visual" data-reveal data-delay="1">
          <div className="photo-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="photo" src="/v2-people/team2.jpg" alt="A people team working together" />
          </div>
          <div className="float-card">
            <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />Mamba · done</span>
            <div className="fc-t">Leave approved · Maya Chen</div>
            <div className="fc-m">Calendar blocked · manager notified · logged</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pb {
          background: var(--bg-warm);
          padding-block: clamp(96px, 13vw, 168px);
        }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(40px, 6vw, 88px);
          align-items: center;
        }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8A6535;
          margin: 0 0 18px;
        }
        .title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(36px, 4.6vw, 56px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text);
          margin: 0;
        }
        .em {
          background: linear-gradient(100deg, #B98A4E, #6A5DA6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
        }
        .lead {
          font-size: clamp(17px, 2vw, 19px);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 22px 0 0;
          max-width: 480px;
        }
        .points {
          list-style: none;
          padding: 0;
          margin: 26px 0 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .points li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-muted);
        }
        .tick {
          flex: none;
          width: 17px;
          height: 17px;
          margin-top: 2px;
          border-radius: 999px;
          background: var(--gold-tint);
          border: 1px solid rgba(138, 101, 53, 0.3);
          position: relative;
        }
        .tick::after {
          content: '';
          position: absolute;
          left: 5.5px;
          top: 3px;
          width: 3px;
          height: 7px;
          border: solid var(--gold);
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .visual { position: relative; }
        .photo-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-float);
          transform: rotate(1deg);
        }
        .photo {
          display: block;
          width: 100%;
          height: clamp(340px, 38vw, 480px);
          object-fit: cover;
          background: var(--bg-elevated);
        }
        .float-card {
          position: absolute;
          left: -22px;
          bottom: 26px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-md);
          padding: 14px 16px;
          max-width: 290px;
          transform: rotate(-1.2deg);
        }
        .fc-t {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin-top: 9px;
        }
        .fc-m {
          font-size: 12px;
          color: var(--text-faint);
          margin-top: 3px;
        }

        @media (max-width: 880px) {
          .wrap { grid-template-columns: 1fr; }
          .photo-card { transform: none; }
          .float-card { left: 12px; }
        }
      `}</style>
    </section>
  )
}
