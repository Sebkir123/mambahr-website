// Google Docs represents every hyperlink's clipboard HTML as a real <a href>,
// but the href is Google's own /url?q= click-tracking redirector, not the
// actual destination. Left alone, a pasted link publishes as a link through
// google.com instead of the real target. No other imports here on purpose:
// this needs to stay safe to import from both the server-side sanitizer and
// the client-side editor bundle.
export function unwrapGoogleRedirect(href: string): string {
  try {
    const url = new URL(href)
    if (!/(^|\.)google\.[a-z.]+$/i.test(url.hostname) || url.pathname !== '/url') return href
    const target = url.searchParams.get('q')
    return target || href
  } catch {
    return href
  }
}
