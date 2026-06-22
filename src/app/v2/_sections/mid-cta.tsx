'use client'

export default function MidCta() {
  return (
    <section className="mc">
      <div className="panel" data-reveal>
        <span className="v2-grain" />
        <div className="faces" aria-hidden="true">
          {['priya', 'anna', 'maya', 'dave', 'brian'].map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p} src={`/avatars/${p}.jpg`} alt="" width={40} height={40} loading="lazy" decoding="async" />
          ))}
        </div>
        <h3 className="line">Stop paying people to <span className="em">push buttons.</span></h3>
        <p className="sub">See what your team gets back, in a 30-minute walkthrough with the founders.</p>
        <a href="/demo" className="btn">Book a demo</a>
        <span className="note">Live the next morning · no setup project</span>
      </div>

      <style jsx>{`
        .mc {
          background: var(--bg);
          padding: clamp(28px, 4vw, 48px) var(--page-pad);
        }
        .panel {
          position: relative;
          overflow: hidden;
          max-width: var(--page-max);
          margin: 0 auto;
          border-radius: 18px;
          padding: clamp(48px, 6vw, 76px) var(--page-pad);
          text-align: center;
          background:
            radial-gradient(70% 90% at 15% 0%, rgba(185, 138, 78, 0.26), transparent 58%),
            radial-gradient(60% 80% at 88% 10%, rgba(106, 93, 166, 0.3), transparent 60%),
            radial-gradient(80% 70% at 50% 120%, rgba(106, 93, 166, 0.14), transparent 60%),
            #14110C;
          box-shadow: var(--shadow-float);
        }
        .faces {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
        }
        .faces img {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid #14110C;
          margin-left: -10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .faces img:first-child { margin-left: 0; }
        .line {
          position: relative;
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(30px, 3.8vw, 48px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }
        .em {
          background: linear-gradient(100deg, #D4AA7C, #AEA2E6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
        }
        .sub {
          position: relative;
          font-size: clamp(15px, 1.8vw, 17px);
          color: rgba(255, 255, 255, 0.72);
          margin: 16px 0 28px;
        }
        .btn {
          position: relative;
          display: inline-block;
          background: #fff;
          color: #1a1a19;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 30px;
          border-radius: 999px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .note {
          position: relative;
          display: block;
          margin-top: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .btn:hover { transform: none; }
        }
      `}</style>
    </section>
  )
}
