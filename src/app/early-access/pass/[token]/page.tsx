import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPass, referralUrl } from '@/lib/early-access'
import { PassView } from '../../_parts/pass-view'

// A private page: the token in the URL is the only credential. Never indexed,
// never cached across visitors.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Your founding pass | MambaHR',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function PassPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ welcome?: string }>
}) {
  const [{ token }, { welcome }] = await Promise.all([params, searchParams])
  const pass = await getPass(token)
  if (!pass) notFound()
  return <PassView token={token} pass={pass} link={referralUrl(pass.referralCode)} welcome={welcome === '1'} />
}
