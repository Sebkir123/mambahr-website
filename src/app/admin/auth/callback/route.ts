import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Magic-link landing. Supabase appends ?code=… (PKCE); we exchange it for a
// session cookie, then redirect into the panel (or the originally requested
// page via ?next=).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/admin'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next.startsWith('/admin') ? next : '/admin'}`)
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth`)
}
