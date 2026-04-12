'use client'

import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AnimateOnScroll from '@/components/animate-on-scroll'

const team = [
  {
    name: 'Founder Name',
    role: 'CEO & Co-Founder',
    bio: 'Previously [company]. Background in [domain]. Building MambaHR because HR deserves better tooling.',
    linkedin: '#',
  },
  {
    name: 'Founder Name',
    role: 'CTO & Co-Founder',
    bio: 'Previously [company]. Background in [domain]. Leading the AI lab and agent architecture.',
    linkedin: '#',
  },
]

const values = [
  {
    num: '01',
    title: 'Autonomy over automation',
    desc: 'We don\'t build dashboards with more buttons. We build an agent that does the work — so your team doesn\'t have to.',
  },
  {
    num: '02',
    title: 'Accuracy is non-negotiable',
    desc: 'HR decisions affect people\'s lives. Every output is verified against encoded HR policies. Not a confident guess — an auditable answer.',
  },
  {
    num: '03',
    title: 'Research-first',
    desc: 'We publish benchmarks, build proprietary datasets, and file patents. MambaHR is a lab, not a wrapper.',
  },
]

const timeline = [
  { date: 'Q2 2025', label: 'Started researching AI + HR — discovered that generic models fail catastrophically on real HR decisions' },
  { date: 'Q4 2025', label: 'Built the first version of the HR decision engine — 95K lines of domain logic' },
  { date: 'Q1 2026', label: 'MambaHR founded. Private beta launched with first design partners' },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ═══ HERO — dark with bg-grid ═══ */}
        <section
          className="bg-grid relative"
          style={{ paddingTop: 140, paddingBottom: 100, backgroundColor: 'var(--bg)', overflow: 'hidden' }}
        >
          {/* Radial gold glow */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(176,141,87,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', textAlign: 'center', zIndex: 1 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--gold)',
                marginBottom: 20,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              Company
            </p>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                maxWidth: 700,
                margin: '0 auto 24px',
              }}
            >
              We&apos;re building the{' '}
              <span style={{ color: 'var(--gold)' }}>HR agent</span> the industry
              should have built years ago.
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                maxWidth: 540,
                margin: '0 auto 48px',
              }}
            >
              MambaHR is a domain AI lab focused on people operations. We combine
              proprietary HR research with autonomous agent technology to
              handle the work HR teams shouldn&apos;t be doing manually.
            </p>

            {/* Frosted stat strip */}
            <div
              style={{
                backgroundColor: 'rgba(17,17,19,0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: 16,
                border: '1px solid rgba(176,141,87,0.12)',
                padding: '36px 24px',
                maxWidth: 640,
                margin: '0 auto',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(176,141,87,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.3), transparent)',
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
                {[
                  { value: '95K', label: 'Lines of domain logic' },
                  { value: '7', label: 'Patents pending' },
                  { value: '3,200+', label: 'Employees managed' },
                ].map((stat, i) => (
                  <div key={stat.label} style={{ textAlign: 'center', position: 'relative' }}>
                    {i > 0 && (
                      <div
                        className="hidden md:block"
                        style={{
                          position: 'absolute',
                          left: -12,
                          top: '10%',
                          bottom: '10%',
                          width: 1,
                          background: 'linear-gradient(to bottom, transparent, rgba(176,141,87,0.2), transparent)',
                        }}
                      />
                    )}
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--text-faint)',
                        fontFamily: 'var(--font-mono), monospace',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MISSION — light, two columns ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--gold)',
                marginBottom: 16,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              Mission
            </p>
            <h2
              data-animate
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-dark)',
                marginBottom: 48,
              }}
            >
              The problem we&apos;re solving
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48 }}>
              {/* Left — narrative */}
              <div>
                <div style={{ fontSize: 16, color: 'var(--text-dark-muted)', lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 16 }}>
                    HR teams are drowning. Not in people work — in admin. Leave requests,
                    onboarding checklists, payroll updates, policy questions. The same
                    tasks, repeated thousands of times, consuming 40% of an HR team&apos;s time.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    The existing tools just organized the busywork into prettier dashboards.
                    Nobody actually did the work. Until now.
                  </p>
                  <p>
                    MambaHR is the first HR agent that doesn&apos;t just track tasks — it completes
                    them. Autonomously, accurately, and with full policy verification built in.
                  </p>
                </div>
              </div>

              {/* Right — timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {timeline.map((m, i) => (
                  <div
                    key={m.date}
                    data-animate
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      padding: '24px 20px',
                      borderRadius: 12,
                      backgroundColor: 'var(--bg-light-surface)',
                      border: '1px solid var(--border-light)',
                      marginBottom: i < timeline.length - 1 ? 12 : 0,
                      position: 'relative',
                      overflow: 'hidden',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    {/* Gold number accent */}
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: 'var(--gold)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        minWidth: 36,
                        fontFamily: 'var(--font-mono), monospace',
                        opacity: 0.6,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Divider */}
                    <div
                      style={{
                        width: 1,
                        alignSelf: 'stretch',
                        backgroundColor: 'var(--border-light)',
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--gold)',
                          fontFamily: 'var(--font-mono), monospace',
                          letterSpacing: '0.04em',
                          marginBottom: 4,
                        }}
                      >
                        {m.date}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: 'var(--text-dark)',
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ VALUES — light, same bg ═══ */}
        <section style={{ padding: '0 24px 96px', backgroundColor: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--gold)',
                marginBottom: 16,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              Values
            </p>
            <h2
              data-animate
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-dark)',
                marginBottom: 48,
              }}
            >
              What we believe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
              {values.map((v, i) => (
                <div
                  key={v.title}
                  data-animate
                  className="card-hover"
                  style={{
                    padding: 28,
                    borderRadius: 14,
                    backgroundColor: 'var(--bg-light-surface)',
                    border: '1px solid var(--border-light)',
                    position: 'relative',
                    overflow: 'hidden',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Left gold accent bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: 2,
                      borderRadius: 1,
                      backgroundColor: 'var(--gold)',
                      opacity: 0.4,
                    }}
                  />
                  <div style={{ paddingLeft: 12 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--gold)',
                        fontFamily: 'var(--font-mono), monospace',
                      }}
                    >
                      {v.num}
                    </span>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--text-dark)',
                        margin: '10px 0 6px',
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--text-dark-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TEAM — dark with frosted glass ═══ */}
        <section
          className="bg-grid relative"
          style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--gold)',
                marginBottom: 16,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              Team
            </p>
            <h2
              data-animate
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 48,
              }}
            >
              The people behind the agent.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
              {team.map((person) => (
                <div
                  key={person.role}
                  data-animate
                  style={{
                    padding: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(17,17,19,0.5)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(176,141,87,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Gold top shimmer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '10%',
                      right: '10%',
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, rgba(176,141,87,0.25), transparent)',
                    }}
                  />
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--text-faint)',
                      marginBottom: 20,
                    }}
                  >
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                    {person.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 14, fontWeight: 500 }}>
                    {person.role}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                    {person.bio}
                  </p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-faint)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border-mid)',
                      paddingBottom: 2,
                    }}
                  >
                    LinkedIn &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BACKED BY + HIRING — light ═══ */}
        <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg-light)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 900, margin: '0 auto', gap: 20 }}>
            {/* Backed by */}
            <div
              data-animate
              className="card-hover"
              style={{
                padding: 32,
                borderRadius: 14,
                backgroundColor: 'var(--bg-light-surface)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  bottom: '20%',
                  width: 2,
                  borderRadius: 1,
                  backgroundColor: 'var(--gold)',
                  opacity: 0.4,
                }}
              />
              <div style={{ paddingLeft: 12 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--gold)',
                    marginBottom: 14,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  Backed by
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
                  Investors &amp; partners
                </h3>
                <p style={{ fontSize: 15, color: 'var(--text-dark-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                  MambaHR is backed by [investors / accelerator]. We&apos;re a Delaware C-Corp
                  headquartered in San Francisco.
                </p>
                <a
                  href="mailto:investors@mambahr.com"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  Request investor deck <span style={{ fontSize: 16 }}>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Hiring */}
            <div
              data-animate
              className="card-hover"
              style={{
                padding: 32,
                borderRadius: 14,
                backgroundColor: 'var(--bg-light-surface)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                overflow: 'hidden',
                transitionDelay: '100ms',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  bottom: '20%',
                  width: 2,
                  borderRadius: 1,
                  backgroundColor: 'var(--gold)',
                  opacity: 0.4,
                }}
              />
              <div style={{ paddingLeft: 12 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--gold)',
                    marginBottom: 14,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  Careers
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
                  We&apos;re hiring
                </h3>
                <p style={{ fontSize: 15, color: 'var(--text-dark-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                  We&apos;re looking for founding engineers who want to build the
                  infrastructure layer for HR AI. If you care about doing novel
                  research with real-world impact, we should talk.
                </p>
                <a
                  href="mailto:careers@mambahr.com"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  See open roles <span style={{ fontSize: 16 }}>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA — dark with bg-grid ═══ */}
        <section
          className="bg-grid relative"
          style={{ padding: '96px 24px', backgroundColor: 'var(--bg)', overflow: 'hidden' }}
        >
          {/* Radial gold glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(176,141,87,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2
              data-animate
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 12,
              }}
            >
              Ready to see MambaHR in action?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.6 }}>
              We&apos;re onboarding design partners now.
            </p>
            <a
              href="/#request-access"
              className="cta-glow"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: 999,
                backgroundColor: 'var(--gold)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Request Access
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <AnimateOnScroll />
    </>
  )
}
