'use client'

const TIERS = [
  { name: 'HR Starter', price: '$14', unit: '/employee/mo', min: '$10k/yr minimum', blurb: 'HR structure before your first HR hire.', feats: ['Employee records & org chart', 'AI HR helpdesk', 'Documents & workflows', 'Payroll-ready exports'], cta: 'Start here' },
  { name: 'HR Ops Manager', price: '$22', unit: '/employee/mo', min: '$24k/yr minimum', blurb: "A full HR ops team's worth of work.", feats: ['Everything in Starter', 'Onboarding & offboarding', 'Offers & approval routing', 'Performance & leave'], cta: 'Most teams start here', popular: true },
  { name: 'AI HR Department', price: '$30', unit: '/employee/mo', min: '$45k/yr minimum', blurb: 'Ops plus HRBP-level support.', feats: ['Everything in Ops Manager', 'RIF & change planning', 'Advanced compliance & audit', 'SSO, custom workflows'], cta: 'Scale up' },
  { name: 'Enterprise', price: 'Custom', unit: '', min: 'from $100k/yr', blurb: 'Multi-entity, security review.', feats: ['Everything in AI HR Dept', 'Custom implementation', 'Procurement & security', 'Enterprise integrations'], cta: 'Talk to founders' },
]

export default function Pricing() {
  return (
    <section className="pr">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Pricing</p>
          <h2 className="title">A fraction of a <span className="em">full HR team.</span></h2>
          <p className="lead">
            An HR generalist runs $85k&ndash;$120k a year. MambaHR gives your lean team that
            firepower from $24k. Founding pricing for the first 20 companies, locked for the
            life of the contract.
          </p>
        </div>

        <div className="grid">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`card${t.popular ? ' pop' : ''}`} data-reveal data-delay={String(i + 1)}>
              {t.popular && <span className="ribbon">Most popular</span>}
              <div className="name">{t.name}</div>
              <div className="price">
                <span className="amt">{t.price}</span>
                <span className="unit">{t.unit}</span>
              </div>
              <div className="min">{t.min}</div>
              <p className="blurb">{t.blurb}</p>
              <ul className="feats">
                {t.feats.map((f) => (
                  <li key={f}><span className="tick" aria-hidden="true" />{f}</li>
                ))}
              </ul>
              <a href="#access" className={`btn${t.popular ? ' btn-pop' : ''}`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pr {
          background: var(--bg);
          padding-block: clamp(96px, 13vw, 168px);
        }
        .wrap {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-pad);
        }
        .head {
          max-width: 680px;
          margin-bottom: clamp(44px, 5vw, 64px);
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
          font-size: clamp(36px, 4.8vw, 58px);
          line-height: 1.05;
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
          font-size: clamp(16px, 1.9vw, 18px);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 20px 0 0;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        @media (prefers-reduced-motion: reduce) {
          .card { transition: none; }
          .card:hover { transform: none; }
        }
        .pop {
          border: none;
          background:
            linear-gradient(var(--bg), var(--bg)) padding-box,
            linear-gradient(150deg, #D4AA7C, #B98A4E 55%, #6A5DA6) border-box;
          border: 2px solid transparent;
          box-shadow: var(--shadow-float);
          position: relative;
        }
        .ribbon {
          position: absolute;
          top: -11px;
          left: 22px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #fff;
          background: linear-gradient(120deg, #B98A4E, #6A5DA6);
          padding: 4px 11px;
          border-radius: 999px;
        }
        .name {
          font-weight: 600;
          font-size: 15px;
          color: var(--text);
        }
        .price {
          margin-top: 12px;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .amt {
          font-family: var(--font-serif);
          font-size: 44px;
          line-height: 1;
          color: var(--text);
        }
        .unit {
          font-size: 13px;
          color: var(--text-faint);
        }
        .min {
          font-size: 12.5px;
          color: var(--text-faint);
          margin-top: 8px;
        }
        .blurb {
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 18px 0;
          min-height: 42px;
        }
        .feats {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .feats li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .tick {
          flex: none;
          width: 15px;
          height: 15px;
          margin-top: 1px;
          border-radius: 999px;
          background: #F2ECE0;
          border: 1px solid #E6D3BC;
          position: relative;
        }
        .tick::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2.5px;
          width: 3px;
          height: 6px;
          border: solid #8A6535;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .btn {
          margin-top: auto;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          padding: 12px;
          border-radius: 999px;
          border: 1px solid var(--border-mid);
          color: var(--text);
        }
        .btn:hover { border-color: var(--text); }
        .btn-pop {
          border: none;
          color: #fff;
          background: linear-gradient(120deg, #B98A4E, #6A5DA6);
        }
        @media (max-width: 980px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
