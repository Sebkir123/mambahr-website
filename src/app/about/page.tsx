import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description: "We're replacing the HR department, with a human in the loop. MambaHR is built by Brian Bell (CEO) and Sebastian Kirsch (CTO).",
}

const team = [
  {
    name: 'Brian Bell',
    role: 'CEO & Co-Founder',
    bio: 'Brian has built and scaled people operations at three startups — watching the same problems compound each time: one HR person doing the work of ten, compliance gaps discovered in audits, good people lost to process failures. MambaHR is the team he wished every company could afford.',
    linkedin: 'https://linkedin.com/in/brianbell',
  },
  {
    name: 'Sebastian Kirsch',
    role: 'CTO & Co-Founder',
    bio: 'Sebastian has spent a decade building agent systems and ML infrastructure. He designed the compliance engine and is obsessed with the gap between what frontier models can do and what HR software actually does with them. The gap is the business.',
    linkedin: 'https://linkedin.com/in/sebastiankirsch',
  },
]

const values = [
  { label: 'The human in the loop is a feature.', desc: "Every high-stakes HR decision has a person signing the paperwork. That's not a limitation — it's the design. Trust requires accountability." },
  { label: 'Honesty is the product.', desc: 'The agent cites its sources. It shows its confidence score. It escalates when it does not know. An agent that never says it is uncertain is not trustworthy.' },
  { label: 'Compliance is not marketing.', desc: 'We built a curated employment-law engine — federal + all 50 state codes — because companies trust us with their people data, and we need to earn that every day.' },
  { label: 'Small HR teams deserve enterprise tools.', desc: 'The compliance infrastructure, the audit trail, the FMLA stacking logic — all of it built for a Head of People running solo, not just for the Fortune 500.' },
]

export default function AboutPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <section style={{ background: 'var(--bg-warm)', padding: '100px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>ABOUT</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              Replacing the HR department,<br />with a human in the loop.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65 }}>
              MambaHR is building the AI HR department. Not HR software — the HR team. The one that runs in Slack, handles the compliance filings, and asks you to approve the calls that matter.
            </p>
          </div>
        </section>

        {/* Story */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>THE STORY</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <p>
                The problem kept showing up the same way: one HR person doing the work of ten. A Notion doc that had not been touched in six months called &ldquo;PTO Policy.&rdquo; Compliance gaps discovered by auditors, not caught by the team. Good people churning out because their leave request fell into a queue and never came back.
              </p>
              <p>
                The existing tools made the database better. They did not make the work go away. After three startups and the same structural failure each time, Brian and Sebastian started asking a different question: what if the work itself went away?
              </p>
              <p>
                Frontier models had gotten good enough at legal reasoning to make this possible — but only with the right scaffolding. We curated an employment-law engine covering federal regulations and all 50 state codes, wired it into the agents, and made every compliance call cite its source. The result is an HR department that catches the edge cases that ruin a Friday afternoon — FMLA + state PFML stacking, multi-state pay transparency, exempt classification — and routes the ambiguous ones to a human.
              </p>
              <p>
                We are building the AI HR department. The Chief People Officer stays — for judgment, not work. The agents handle the rest.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ background: 'var(--bg-cream)', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>THE TEAM</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 64,
              }}
            >
              Two founders. One problem.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {team.map((person) => (
                <div
                  key={person.name}
                  style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: 'var(--gold-tint)',
                      border: '1px solid rgba(176,141,87,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontWeight: 400,
                      marginBottom: 20,
                    }}
                  >
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{person.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--gold-dark)', fontWeight: 500, marginBottom: 16 }}>{person.role}</p>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>{person.bio}</p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'var(--gold-dark)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    LinkedIn →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 20 }}>WHAT WE BELIEVE</p>
            <h2
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 64,
              }}
            >
              The principles behind the product.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {values.map((v) => (
                <div key={v.label} style={{ padding: '28px 0', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>{v.label}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investor + CTA */}
        <section style={{ background: '#1C1917', padding: '100px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'rgba(176,141,87,0.9)', marginBottom: 20 }}>JOIN US</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Hire the agent.<br />Promote the human.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 48, lineHeight: 1.6 }}>
              Bring your HR team into the AI era. Investors — reach out directly.
            </p>
            <Waitlist />
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 24 }}>
              <a href="mailto:investors@mambahr.com" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Investor deck</a>
              <Link href="/security" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Security</Link>
              <a href="mailto:hello@mambahr.com" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Contact</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
