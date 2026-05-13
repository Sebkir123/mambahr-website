import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request access — MambaHR',
  description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
  openGraph: {
    title: 'Request access — MambaHR',
    description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
    url: 'https://mambahr.com/demo',
    images: [{ url: '/api/og?line1=Apply+for&line2=access.&highlight=&subtitle=MambaHR+is+in+private+beta.+Tell+us+about+your+team.&bottomRight=Request+access', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request access — MambaHR',
    description: 'MambaHR is in private beta. Apply for access and we’ll be in touch.',
    images: ['/api/og?line1=Apply+for&line2=access.&highlight=&subtitle=MambaHR+is+in+private+beta.+Tell+us+about+your+team.&bottomRight=Request+access'],
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
