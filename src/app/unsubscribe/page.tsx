import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { addressFromLink } from '@/lib/unsubscribe'

// The page the "Unsubscribe" link in our emails opens. It asks for one click
// before anything changes, because mail scanners open links on their own.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Unsubscribe | MambaHR',
  description: 'Stop emails from MambaHR.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

const h1Style = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(36px, 5vw, 56px)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
  color: 'var(--text)',
  marginBottom: 20,
  lineHeight: 1.05,
} as const
const pStyle = { fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 32 } as const

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MegaNav />
      <main id="main" style={{ paddingTop: 64 }}>
        <section style={{ background: 'var(--bg-warm)', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', padding: '96px 16px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>{children}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}

const contact = <a href="mailto:hello@mambahr.com?subject=Unsubscribe">hello@mambahr.com</a>

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string; done?: string; error?: string }>
}) {
  const { e, t, done, error } = await searchParams

  if (done === '1') {
    return (
      <Shell>
        <h1 style={h1Style}>You are unsubscribed.</h1>
        <p style={pStyle}>
          We will not send you any more of these emails. If you change your mind, or something still arrives, write to {contact}.
        </p>
        <Link href="/" className="btn btn-secondary">Back to mambahr.com</Link>
      </Shell>
    )
  }

  const email = await addressFromLink(e, t)
  if (!email) {
    return (
      <Shell>
        <h1 style={h1Style}>This link does not work.</h1>
        <p style={pStyle}>
          It may have been cut short when it was copied. Use the Unsubscribe link in the email again, or write to {contact} and we will take you off the list.
        </p>
      </Shell>
    )
  }

  return (
    <Shell>
      <h1 style={h1Style}>Stop emails from MambaHR?</h1>
      <p style={pStyle}>
        We will stop sending emails about the early access list to <strong>{email}</strong>.
      </p>
      {error === 'save' && (
        <p role="alert" style={{ ...pStyle, color: 'var(--text)' }}>
          That did not go through. Try again, or write to {contact}.
        </p>
      )}
      <form method="post" action="/api/unsubscribe">
        <input type="hidden" name="e" value={e} />
        <input type="hidden" name="t" value={t} />
        <input type="hidden" name="from" value="page" />
        <button type="submit" className="btn btn-primary">Unsubscribe</button>
      </form>
    </Shell>
  )
}
