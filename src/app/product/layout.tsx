import type { Metadata } from 'next'

const ogImage = '/og?title=See%20the%20AI%20HR%20department%20run%20the%20work&eyebrow=Product'

export const metadata: Metadata = {
  title: 'Product | MambaHR',
  description:
    'See the AI HR department run the work: onboarding, leave, performance, compensation, compliance, and headcount, handled end to end, with a human on the calls that matter.',
  openGraph: {
    title: 'Product | MambaHR',
    description:
      'Watch the agent run hiring, onboarding, leave, performance, compensation, and compliance, across Slack and the web.',
    url: 'https://mambahr.com/product',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product | MambaHR',
    description: 'See the AI HR department run the work, end to end.',
    images: [ogImage],
  },
  alternates: { canonical: 'https://mambahr.com/product' },
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
