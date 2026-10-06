import type { Metadata } from 'next'

const TITLE = 'Get early access | MambaHR'
const DESCRIPTION =
  'Join the MambaHR early access list. We open to companies in small groups, at founding customer pricing.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.mambahr.com/early-access',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: { canonical: 'https://www.mambahr.com/early-access' },
}

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
