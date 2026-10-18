import type { Metadata } from 'next'
import { ogCard } from '@/lib/og'

// Ad landing page for the blue-collar segment of the October 2026 ad test
// (blue-collar companies vs SF tech startups). Not in the sitemap or the nav and
// not indexed: its words change with the test, and the ads link straight to it.
const title = 'HR for Crews, Shops and Job Sites | MambaHR'
const description =
  'Less paperwork, more time on the job. New hires sign everything on their phone, in English or Spanish, and every pay change is ready for payday.'
const ogImage = ogCard('You run the work. MambaHR runs the paperwork.', 'Crews, shops, kitchens and job sites')

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description, url: 'https://www.mambahr.com/crews', images: [{ url: ogImage, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  alternates: { canonical: 'https://www.mambahr.com/crews' },
}

export default function CrewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
