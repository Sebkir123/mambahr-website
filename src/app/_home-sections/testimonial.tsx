import PhotoImg from '@/components/surfaces/photo-img'

// Local placeholder portraits served from /public/avatars/
const AVATAR = (name: string) => `/avatars/${name}.jpg`

export default function TestimonialSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: 32 }}>WHAT THIS LOOKS LIKE IN PRACTICE</p>
        <p
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--text)',
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}
        >
          &ldquo;By week two, our HR department was running itself. Two review cycles kicked off, multi-state filings done, every leave request handled. I went from running people ops to running people strategy. 380 employees. No HR team. Just me and Mamba.&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden' }}>
            <PhotoImg src={AVATAR('head-of-people')} alt="Head of People" sizes="56px" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Head of People</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Series B SaaS · 380 employees</p>
          </div>
        </div>
      </div>
    </section>
  )
}
