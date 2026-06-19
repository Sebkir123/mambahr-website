import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { randomBytes } from 'node:crypto'
import { getAdminUser } from '@/lib/auth'
import { linkedinAuthUrl, linkedinConfigured } from '@/lib/social'

// Kick off the LinkedIn OAuth connect flow (admin only). Stores a CSRF state in
// an httpOnly cookie, then redirects to LinkedIn's consent screen.
export async function GET(req: Request) {
  const admin = await getAdminUser()
  if (!admin) return NextResponse.redirect(new URL('/admin/login', req.url))
  if (!linkedinConfigured()) {
    return NextResponse.redirect(new URL('/admin/social?error=not_configured', req.url))
  }
  const state = randomBytes(16).toString('hex')
  const jar = await cookies()
  jar.set('li_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' })
  return NextResponse.redirect(linkedinAuthUrl(state))
}
