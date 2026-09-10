'use client'

import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import RevealInit from '@/app/v2/_sections/reveal-init'
import CountUp from '@/app/v2/_sections/count-up'
import { PageHero, AgentLoop, FeatureSplit, StatTrio, QuoteBand, PageCta, Em } from '@/components/v2/page-kit'

/* ── Hero fragment: signed offer letter, filed ── */
function SignedDocCard() {
  return (
    <div className="doc agent-edge agent-done">
      <div className="bar">
        <span className="dots"><b /><b /><b /></span>
        <span className="addr">app.mambahr.com</span>
      </div>
      <div className="body">
        <div className="d-head">
          <span className="d-ic" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 1.5h5.5L13 5v9.5H4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M9.5 1.5V5H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <div className="d-name">Offer, Maya Chen.pdf</div>
            <div className="d-meta">Senior Engineer · generated from your template</div>
          </div>
          <span className="chip">Signed · 11:15 AM</span>
        </div>
        <div className="preview">
          <div className="p-line w80" /><div className="p-line w95" /><div className="p-line w70" />
          <div className="sig">
            <div className="sig-block">
              <span className="sig-name">Maya Chen</span>
              <span className="sig-rule" />
              <span className="sig-lbl">Employee · e-signed</span>
            </div>
            <span className="sig-ok" aria-hidden="true" />
          </div>
        </div>
        <div className="filed">
          <span className="mono">Filed → Maya Chen / Employment · audit trail attached</span>
        </div>
        <div className="foot">
          <span className="mamba-chip done"><span className="mc-i" aria-hidden="true" />MambaHR · signed &amp; filed</span>
          <span className="foot-t">Drafted, sent, signed, and filed, 41 minutes start to finish</span>
        </div>
      </div>
      <style jsx>{`
        .doc { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow-float); }
        .bar { display: flex; align-items: center; gap: 12px; height: 40px; padding: 0 14px; background: #F8F6F1; border-bottom: 1px solid var(--border); }
        .dots { display: flex; gap: 6px; }
        .dots b { width: 9px; height: 9px; border-radius: 999px; background: #e3ddd6; }
        .dots b:first-child { background: #f0a59a; }
        .dots b:nth-child(2) { background: #f4ce8e; }
        .dots b:nth-child(3) { background: #a9cfa6; }
        .addr { margin: 0 auto; font-size: 12px; color: var(--text-faint); background: var(--bg); border: 1px solid var(--border); border-radius: 7px; padding: 2px 16px; }
        .body { padding: 16px 18px 18px; }
        .d-head { display: flex; align-items: center; gap: 11px; }
        .d-ic { flex: none; width: 34px; height: 34px; border-radius: 10px; background: var(--gold-tint); color: var(--gold-dark); display: flex; align-items: center; justify-content: center; }
        .d-name { font-size: 14px; font-weight: 700; color: var(--text); }
        .d-meta { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
        .chip { margin-left: auto; flex: none; font-size: 12px; font-weight: 600; color: var(--color-green); background: rgba(34, 160, 94, 0.09); border-radius: 999px; padding: 4px 10px; }
        .preview { margin-top: 14px; border: 1px solid var(--border); border-radius: 11px; background: #FDFCF9; padding: 16px 18px 14px; }
        .p-line { height: 7px; border-radius: 999px; background: var(--border-faint); margin-bottom: 8px; }
        .w80 { width: 80%; } .w95 { width: 95%; } .w70 { width: 70%; }
        .sig { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; margin-top: 16px; }
        .sig-block { display: flex; flex-direction: column; }
        .sig-name { font-family: var(--font-serif); font-style: italic; font-size: 19px; color: var(--text); }
        .sig-rule { width: 180px; height: 1px; background: var(--text-faint); margin: 4px 0 5px; }
        .sig-lbl { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .sig-ok { width: 20px; height: 20px; border-radius: 999px; background: var(--color-green); position: relative; }
        .sig-ok::after { content: ''; position: absolute; left: 7px; top: 4px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .filed { margin-top: 11px; border: 1px solid var(--border-faint); border-radius: 9px; background: var(--bg-warm); padding: 8px 13px; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
        .foot { display: flex; align-items: center; gap: 10px; margin-top: 13px; flex-wrap: wrap; }
        .foot-t { font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

/* ── Acknowledgement tracker fragment ── */
function AckTracker() {
  return (
    <div className="ack agent-edge agent-done">
      <div className="a-head">
        <span className="a-t">Policy acknowledgments</span>
        <span className="a-live"><i />Collected by e-signature</span>
      </div>
      <div className="pol">
        <div className="pol-top">
          <span className="pol-name">Employee Handbook · 2026 update</span>
          <span className="pol-pct">94%</span>
        </div>
        <div className="bar-track" aria-hidden="true"><span className="bar-fill" /></div>
        <div className="pol-meta">
          <span>1,172 of 1,247 acknowledged</span>
          <span className="mono">Sent for e-signature · status tracked</span>
        </div>
      </div>
      <div className="rows">
        {[
          { img: '/avatars/tom.jpg', name: 'Tom Harrison', s: 'Acknowledged', ok: true, t: '8:12 AM' },
          { img: '/avatars/dave.jpg', name: 'Dave Buchanan', s: 'Awaiting signature', ok: false, t: '9:30 AM' },
          { img: '/avatars/anna.jpg', name: 'Anna Wilson', s: 'Acknowledged', ok: true, t: 'Yesterday' },
        ].map((r) => (
          <div className="row" key={r.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.img} alt="" width={24} height={24} />
            <span className="r-name">{r.name}</span>
            <span className={`r-s${r.ok ? ' ok' : ''}`}>{r.s}</span>
            <span className="r-t">{r.t}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .ack { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px 20px 16px; box-shadow: var(--shadow-float); }
        .a-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .a-t { font-family: var(--font-serif); font-size: 18px; color: var(--text); }
        .a-live { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--violet); background: rgba(106, 93, 166, 0.1); border-radius: 999px; padding: 3px 9px; }
        .a-live i { width: 6px; height: 6px; border-radius: 999px; background: var(--violet); }
        .pol { border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; background: var(--bg-warm); }
        .pol-top { display: flex; align-items: baseline; justify-content: space-between; }
        .pol-name { font-size: 14px; font-weight: 700; color: var(--text); }
        .pol-pct { font-family: var(--font-serif); font-size: 21px; color: var(--gold-dark); }
        .bar-track { height: 7px; border-radius: 999px; background: #E6D3BC; margin-top: 10px; overflow: hidden; }
        .bar-fill { display: block; width: 94%; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--gold-mid), var(--gold)); }
        .pol-meta { display: flex; justify-content: space-between; gap: 10px; margin-top: 9px; font-size: 12px; color: var(--text-muted); flex-wrap: wrap; }
        .mono { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
        .rows { margin-top: 12px; }
        .row { display: flex; align-items: center; gap: 9px; padding: 8px 4px; font-size: 13px; }
        .row + .row { border-top: 1px solid var(--border-faint); }
        .row img { width: 24px; height: 24px; border-radius: 999px; object-fit: cover; }
        .r-name { font-weight: 600; color: var(--text); }
        .r-s { color: var(--gold-dark); flex: 1; text-align: right; }
        .r-s.ok { color: var(--color-green); }
        .r-t { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); width: 64px; text-align: right; }
      `}</style>
    </div>
  )
}

/* ── Retrieval photo with floating card ── */
function RetrievalStage() {
  return (
    <div className="ret">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="photo" src="/v2-people/feat.jpg" alt="An HR lead finding a document instantly" />
      <div className="float agent-edge agent-done">
        <span className="f-check" aria-hidden="true" />
        <div>
          <div className="f-t">Every version · every signature · kept</div>
          <div className="f-s">Ask for any document, it&rsquo;s back in seconds, with its history</div>
        </div>
      </div>
      <style jsx>{`
        .ret { position: relative; }
        .photo { width: 100%; height: auto; display: block; border-radius: 16px; box-shadow: var(--shadow-float); }
        .float { position: absolute; left: 18px; bottom: 18px; display: flex; align-items: center; gap: 11px; background: var(--bg); border: 1px solid var(--border); border-radius: 13px; padding: 12px 18px 12px 14px; box-shadow: var(--shadow-md); max-width: calc(100% - 36px); }
        .f-check { flex: none; width: 20px; height: 20px; border-radius: 999px; background: var(--color-green); position: relative; }
        .f-check::after { content: ''; position: absolute; left: 7px; top: 4px; width: 4px; height: 9px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .f-t { font-size: 14px; font-weight: 700; color: var(--text); }
        .f-s { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
      `}</style>
    </div>
  )
}

export default function DocumentsPage() {
  return (
    <>
      <MegaNav />
      <RevealInit />
      <CountUp />
      <main id="main">
        <PageHero
          eyebrow="Documents & e-sign"
          title={<>Signed and <Em>filed.</Em></>}
          lead="Stop chasing signatures on Friday afternoons. MambaHR drafts offers, agreements, and acknowledgments in seconds, sends them for e-signature, chases them, and files them where you’ll find them in three years."
          photo="/v2-people/team.jpg"
          photoChip="MambaHR · signed & filed"
          photoCaption="Maya’s offer, out, signed, filed in 41 min"
        >
          <SignedDocCard />
        </PageHero>

        <AgentLoop
          eyebrow="From draft to filed"
          title={<>MambaHR moves every document from draft to filed</>}
          lead="No template hunting, no chasing, no “where did that go?” The right template, the right people, the right folder, every time."
          steps={[
            { n: '01', label: 'Drafted from your template', desc: 'The right template, the right details, name, role, comp, dates, filled in correctly.', who: 'agent', time: 'seconds' },
            { n: '02', label: 'Sent for e-signature', desc: 'Delivered for e-signature, to the right people in the right order.', who: 'agent', time: 'instant', img: '/avatars/maya.jpg' },
            { n: '03', label: 'You sign what matters', desc: 'Offers, agreements, anything with your name on it, a person signs, always.', who: 'you', img: '/avatars/anna.jpg' },
            { n: '04', label: 'Status tracked until signed', desc: 'Sent for e-signature, status tracked. You see who has signed and who has not.', who: 'agent', time: 'as needed', img: '/avatars/tom.jpg' },
            { n: '05', label: 'Filed with the audit trail', desc: 'Into the right folder, under the right person, with who signed what and when.', who: 'agent', time: 'instant' },
            { n: '06', label: 'Back the second you ask', desc: 'Three years later, in an audit or a dispute, it’s one question away.', who: 'agent', time: 'seconds' },
          ]}
        />

        <FeatureSplit
          eyebrow="Policy rollouts"
          title={<>Acknowledged, <Em>every last one</Em></>}
          lead="A handbook update used to mean a spreadsheet of who hasn’t. Now MambaHR files policies with version history and collects acknowledgments by e-signature, so you see one number: done."
          bullets={[
            'Every acknowledgment collected by e-signature, with date',
            'Policies filed with version history',
            'A clean record for the day an auditor asks',
          ]}
        >
          <AckTracker />
        </FeatureSplit>

        <FeatureSplit
          flip
          warm
          eyebrow="Retrieval"
          title={<>Found in seconds, <Em>years later</Em></>}
          lead="The day a dispute lands, the document you need is one question away, not buried in someone’s old shared drive. MambaHR files every offer, agreement, and acknowledgment under the right person, with the signature record attached."
          bullets={[
            'Filed by person, not buried in a shared drive',
            'Signature record attached, who signed and when',
            'Audits and disputes answered in minutes, not weekends',
          ]}
        >
          <RetrievalStage />
        </FeatureSplit>

        <StatTrio
          stats={[
            { n: 30, suffix: 's', label: 'from approved offer to sent for signature' },
            { n: 100, suffix: '%', label: 'of documents filed under the right person, signature record attached' },
            { n: 0, label: 'lost agreements' },
          ]}
        />

        <QuoteBand
          quote="I used to spend Friday afternoons chasing signatures and refiling PDFs. Now an offer goes out in seconds, signs itself through, and lands in the right folder before I've finished my coffee."
          role="People Operations Lead · AI startup, 180 people"
          img="/v2-people/marcus.jpg"
          metric="Saved 9 hrs / week"
        />

        <PageCta title={<>Paperwork that <Em>does itself.</Em></>} sub="A 30-minute demo of one offer, drafted to filed. Then we import your documents and switch you over." />
      </main>
      <Footer />
    </>
  )
}
