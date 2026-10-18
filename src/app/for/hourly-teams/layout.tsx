import type { Metadata } from 'next'
import { ogCard } from '@/lib/og'

// Ad landing page for the blue-collar segment of the October 2026 ad test
// (blue-collar companies vs SF tech startups). Not in the sitemap or the nav and
// not indexed: its words change with the test, and the ads link straight to it.
const title = 'HR for Crews, Shops and Job Sites | MambaHR'
const description =
  'HR admin for teams that work on shift, on site and on the floor: offers, joining paperwork and Form I-9 deadlines for every new hire, pay by each state’s rules, and final pay on time.'
const ogImage = ogCard('You run the work. MambaHR runs the paperwork.', 'Crews, shops, kitchens and job sites')

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description, url: 'https://www.mambahr.com/for/hourly-teams', images: [{ url: ogImage, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  alternates: { canonical: 'https://www.mambahr.com/for/hourly-teams' },
}

export default function HourlyTeamsLayout({ children }: { children: React.ReactNode }) {
  return children
}
