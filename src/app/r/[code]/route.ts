import { NextRequest, NextResponse } from 'next/server'
import { isReferralCode } from '@/lib/early-access'

// Short share link: mambahr.com/r/<code> → the early access page with the
// referral attached. The code is validated where it is used.
export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const url = new URL('/early-access', req.url)
  const ref = code.toLowerCase()
  if (isReferralCode(ref)) url.searchParams.set('ref', ref)
  return NextResponse.redirect(url, 307)
}
