import type { Metadata } from 'next'
import { ogCard } from '@/lib/og'

// Ad landing page for the SF tech startup segment of the October 2026 ad test
// (blue-collar companies vs SF tech startups). Not in the sitemap or the nav and
// not indexed: its words change with the test, and the ads link straight to it.
// The search page for startups is /best-hris-for-startups.
const title = 'HR for AI and Software Startups | MambaHR'
const description =
  'Your HR runs on agents, and you approve in Slack: offers inside your pay range, onboarding before day one, California’s rules built in, and payroll powered by Deel.'
const ogImage = ogCard('Your HR runs on agents. You approve in Slack.', 'For AI and software startups')

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: { title, description, url: 'https://www.mambahr.com/startups', images: [{ url: ogImage, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  alternates: { canonical: 'https://www.mambahr.com/startups' },
}

export default function StartupsLayout({ children }: { children: React.ReactNode }) {
  return children
}
