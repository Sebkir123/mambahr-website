import { NextRequest, NextResponse } from 'next/server'

// Short share link: mambahr.com/r/<code> → the early access page with the
// referral attached. The code is validated where it is used.
export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const url = new URL('/early-access', req.url)
  if (/^[0-9a-f]{8}$/i.test(code)) url.searchParams.set('ref', code.toLowerCase())
  return NextResponse.redirect(url, 307)
}
