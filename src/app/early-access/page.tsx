import { getReferrer, isReferralCode } from '@/lib/early-access'
import { Landing } from './_parts/landing'

// Server half: resolves a shared link (?ref=<code>, or /r/<code>) to the
// company that shared it, so the page can say who gave the founding spot.
export default async function EarlyAccessPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams
  const code = ref && isReferralCode(ref.toLowerCase()) ? ref.toLowerCase() : null
  const referrer = code ? await getReferrer(code) : null
  return <Landing refCode={referrer ? code : null} referrer={referrer ? referrer.company ?? '' : null} />
}
