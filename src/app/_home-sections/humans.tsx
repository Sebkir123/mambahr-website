import Image from 'next/image'
import { Beat, Page } from '@/components/ui/page'

const founders = [
  { name: 'Brian Bell', role: 'Co-founder', photo: '/brian_bell.jpeg' },
  { name: 'Sebastian Kirsch', role: 'Co-founder', photo: '/sebastian_kirsch.jpg' },
]

export default function HumansSection() {
  return (
    <Beat bg="warm">
      <Page>
        <div className="humans-grid" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Design-partner quote with a real face */}
          <figure style={{ margin: 0 }}>
            <p className="eyebrow" style={{ marginBottom: 22 }}>From a design partner</p>
            <blockquote style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 400, lineHeight: 1.32, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
              &ldquo;By week two, the agent was handling the operational lane — leave, classifications, multi-state filings, onboarding. <em style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>I started doing the role I was actually hired for.</em>&rdquo;
            </blockquote>
            <figcaption style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border)', position: 'relative', background: 'var(--bg-cream)' }}>
                <Image src="/avatars/head-of-people.jpg" alt="" fill sizes="52px" style={{ objectFit: 'cover' }} />
              </span>
              <span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Head of People</span>
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-faint)', marginTop: 1 }}>Series-B startup · MambaHR design partner</span>
              </span>
            </figcaption>
          </figure>

          {/* Built by operators — founder faces */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 30px', boxShadow: 'var(--shadow-sm)' }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Built by HR operators</p>
            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 22, fontWeight: 400, color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 24px' }}>
              We lived the 7am leave requests and the multi-state filings. So we built the thing we wished we&rsquo;d had.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {founders.map((f) => (
                <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, position: 'relative', border: '1px solid var(--border)', background: 'var(--bg-cream)' }}>
                    <Image src={f.photo} alt={f.name} fill sizes="46px" style={{ objectFit: 'cover' }} />
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{f.name}</span>
                    <span style={{ display: 'block', fontSize: 13, color: 'var(--text-faint)' }}>{f.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>
      <style>{`@media (max-width: 900px){ .humans-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </Beat>
  )
}
