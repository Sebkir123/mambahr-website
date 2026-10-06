import type { Metadata } from 'next'

const TITLE = 'Partner program | MambaHR'
const DESCRIPTION =
  'For accountants, fractional CFOs and HR leads, and VC platform teams. Bring MambaHR to the companies you advise and earn 20% of their first-year revenue.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.mambahr.com/partners', images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/mambahr_og_sharing.jpg'] },
  alternates: { canonical: 'https://www.mambahr.com/partners' },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children
}
