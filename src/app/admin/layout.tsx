import type { Metadata } from 'next'
import AdminTheme from './admin-theme'
import './product-tokens.css'

// Bare wrapper so /admin/login renders without the authed shell. The shell +
// auth gate live in (panel)/layout.tsx.
export const metadata: Metadata = {
  title: 'Admin · MambaHR',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminTheme>{children}</AdminTheme>
}
