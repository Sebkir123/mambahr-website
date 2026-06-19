import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminUser } from '@/lib/auth'
import { exchangeCode, fetchLinkedInProfile, encryptToken, socialDb } from '@/lib/social'

// LinkedIn OAuth callback — verifies state, exchanges the code, stores the
// connected account (tokens encrypted) via the service role.
export async function GET(req: Request) {
  const admin = await getAdminUser()
  if (!admin) return NextResponse.redirect(new URL('/admin/login', req.url))

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const jar = await cookies()
  const saved = jar.get('li_oauth_state')?.value
  jar.delete('li_oauth_state')

  if (url.searchParams.get('error')) {
    return NextResponse.redirect(new URL('/admin/social?error=denied', req.url))
  }
  if (!code || !state || state !== saved) {
    return NextResponse.redirect(new URL('/admin/social?error=state', req.url))
  }

  try {
    const tok = await exchangeCode(code)
    const profile = await fetchLinkedInProfile(tok.access_token)
    const db = socialDb()
    if (!db) throw new Error('Service role not configured')
    await db.from('social_accounts').upsert(
      {
        provider: 'linkedin',
        external_id: profile.sub,
        account_name: profile.name,
        avatar_url: profile.picture ?? null,
        author_urn: `urn:li:person:${profile.sub}`,
        access_token: encryptToken(tok.access_token),
        refresh_token: tok.refresh_token ? encryptToken(tok.refresh_token) : null,
        expires_at: new Date(Date.now() + tok.expires_in * 1000).toISOString(),
        connected_by: admin.email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'provider,external_id' },
    )
    return NextResponse.redirect(new URL('/admin/social?connected=1', req.url))
  } catch {
    return NextResponse.redirect(new URL('/admin/social?error=connect', req.url))
  }
}
