import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'About — MambaHR',
  description: "The HR department is changing shape. We're building what comes next — an AI department that does the work, end to end, with a human in the loop only when it matters.",
}

const principles = [
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
    body: "No silos. No passengers. We step in, back each other up, and take shared ownership of outcomes. We win together and we lose together.",
  },
]

const leadership = [
  {
    name: 'Brian Bell',
    role: 'CEO & co-founder',
    prev: 'Previously people ops at three startups',
    initials: 'BB',
    color: '#C4B5A5',
    linkedin: 'https://linkedin.com/in/brianbell',
  },
  {
    name: 'Sebastian Kirsch',
    role: 'CTO & co-founder',
    prev: 'Previously AI agent systems · ML infrastructure',
    initials: 'SK',
    color: '#A5B5C4',
    linkedin: 'https://linkedin.com/in/sebastiankirsch',
  },
]

export default function AboutPage() {
  return (
    <>
      <MegaNav />
      <main style={{ paddingTop: 64 }}>

        {/* ── HERO — claim about the world ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px 96px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 28 }}>
              About MambaHR
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 400,
                letterSpacing: '-0.035em',
                color: 'var(--text)',
                marginBottom: 32,
                lineHeight: 0.98,
              }}
            >
              The HR department<br />is changing shape.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 620 }}>
              For thirty years, HR software was a database with a UI. We&apos;re building what comes next — an AI department that <em style={{ color: 'var(--text)', fontStyle: 'normal', fontWeight: 600 }}>does</em> the work, end to end, with a human in the loop only when it matters.
            </p>
          </div>
        </section>

        {/* ── MANIFESTO — three short paragraphs, editorial ── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32 }}>
              Manifesto
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.4, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
                Most HR teams are drowning. One person doing the work of ten. Compliance gaps caught by auditors, not by the team. Good people lost because their leave request fell into a queue and never came back.
              </p>

              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                The tools got better — better dashboards, better forms, better databases. The work didn&apos;t go anywhere. It just got prettier wrappers.
              </p>

              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                Then frontier AI became good enough to do legal reasoning. Not summarize a policy — actually reason about whether FMLA stacks with California CFRA for an employee in their second trimester. Not generate a draft — actually run the offer cycle, check the band, route for approval, send the signature link.
              </p>

              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                That changed what HR software can be. Not a system of record. A system of work. An agent department where the agent does the job, the human sets the policy, and every action is logged for accountability.
              </p>

              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.4, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em', borderLeft: '3px solid var(--gold)', paddingLeft: 24, marginTop: 12 }}>
                That&apos;s what we&apos;re building.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRINCIPLES — five MAMBA values, vertical stack ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>WHAT WE BELIEVE</p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5vw, 60px)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
                marginBottom: 72,
                lineHeight: 1.05,
                maxWidth: 720,
              }}
            >
              Five things<br />we don&apos;t bend.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {principles.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(120px, 160px) 1fr',
                    columnGap: 40,
                    padding: '40px 0',
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === principles.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontSize: 'clamp(80px, 9vw, 140px)',
                      fontWeight: 400,
                      color: 'var(--gold-dark)',
                      lineHeight: 0.85,
                      letterSpacing: '-0.04em',
                      textAlign: 'left',
                    }}
                  >
                    {p.letter}
                  </div>
                  <div style={{ paddingTop: 12 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(24px, 2.6vw, 32px)',
                        fontWeight: 500,
                        letterSpacing: '-0.015em',
                        color: 'var(--text)',
                        marginBottom: 14,
                        lineHeight: 1.2,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 640 }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP — restrained, Linear-style ── */}
        <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
                Leadership
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontSize: 'clamp(28px, 3vw, 38px)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                The two of us, for now.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }} className="mobile-stack">
              {leadership.map((person) => (
                <div key={person.name} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 0' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: person.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 17,
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      color: '#FFFFFF',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      flexShrink: 0,
                    }}
                  >
                    {person.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 2px' }}>{person.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 2px' }}>{person.role}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: '0 0 6px' }}>{person.prev}</p>
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)', textDecoration: 'none' }}>
                      LinkedIn →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-faint)', lineHeight: 1.6, marginTop: 48, maxWidth: 480 }}>
              The team is small and growing. If the work above sounds like the work you want to be doing,{' '}
              <a href="mailto:jobs@mambahr.com" style={{ color: 'var(--gold-dark)', fontWeight: 600, textDecoration: 'none' }}>
                jobs@mambahr.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── HIRING / CLOSER — type-led, calm ── */}
        <section style={{ background: 'var(--bg-warm)', padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
              We&apos;re hiring
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.0,
              }}
            >
              Build the next<br />HR department<br />with us.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
              We&apos;re looking for engineers, designers, and HR practitioners who think the existing tools should be replaced — not improved.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="mailto:jobs@mambahr.com" className="btn-gold">
                jobs@mambahr.com →
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
                <Link href="/security" style={{ color: 'inherit', textDecoration: 'none' }}>Security</Link>
                <span style={{ color: 'var(--border-mid)' }}>·</span>
                <a href="mailto:hello@mambahr.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@mambahr.com</a>
                <span style={{ color: 'var(--border-mid)' }}>·</span>
                <a href="https://linkedin.com/company/mambahr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
