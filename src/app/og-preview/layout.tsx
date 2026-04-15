import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OG Preview',
  robots: { index: false, follow: false },
}

export default function OGPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#09090B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      {children}
    </div>
  )
}
