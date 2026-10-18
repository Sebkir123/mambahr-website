import type { Metadata } from 'next'
import { PARTNER_SHARE } from '@/content/early-access'
import { ogCard } from '@/lib/og'

const TITLE = 'Partner program | MambaHR'
const DESCRIPTION = `For accountants, fractional CFOs and HR leads, and VC platform teams. Bring MambaHR to the companies you advise and earn ${PARTNER_SHARE} of their first-year revenue.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.mambahr.com/partners', images: [{ url: ogCard('Bring MambaHR to the companies you advise.', 'Partners'), width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [ogCard('Bring MambaHR to the companies you advise.', 'Partners')] },
  alternates: { canonical: 'https://www.mambahr.com/partners' },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children
}
