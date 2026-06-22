import 'server-only'

// Server-side classification helpers for site analytics. The route is the
// source of truth: it owns IP→geo/ASN, UA parsing, bot detection and traffic
// source derivation, so none of it can be spoofed by the client beacon.

const BOT_UA =
  /(bot|crawl|spider|slurp|bingpreview|headless|phantom|puppeteer|playwright|lighthouse|prerender|prefetch|facebookexternalhit|whatsapp|telegram|discord|slackbot|twitterbot|linkedinbot|embedly|monitor|uptime|pingdom|datadog|curl|wget|python-requests|axios|go-http|node-fetch|java\/|okhttp|semrush|ahrefs|mj12|dotbot|petalbot|gptbot|claudebot|ccbot|amazonbot|bytespider|applebot)/i

// UA-based bot classification, authoritative (a declared bot/crawler/headless
// agent). Heuristic "looks automated" detection (many views, zero engagement)
// is applied at READ time so it can use the full session.
export function classifyBot(ua: string): { isBot: boolean; reason: string | null } {
  if (!ua) return { isBot: true, reason: 'no user-agent' }
  const m = ua.match(BOT_UA)
  if (m) return { isBot: true, reason: `ua: ${m[1].toLowerCase()}` }
  return { isBot: false, reason: null }
}

// Traffic source from referrer + UTM. utm_source wins; otherwise classify the
// referrer host (search engines, socials, else referral); empty → direct.
export function deriveSource(
  referrer: string | null,
  utmSource: string | null,
  selfHosts: string[],
): { source: string } {
  if (utmSource) return { source: utmSource.toLowerCase() }
  if (!referrer) return { source: 'direct' }
  let host = ''
  try {
    host = new URL(referrer).hostname.replace(/^www\./, '').toLowerCase()
  } catch {
    return { source: 'direct' }
  }
  if (!host || selfHosts.some((h) => host === h || host.endsWith(`.${h}`))) return { source: 'direct' }
  if (/google\./.test(host)) return { source: 'google' }
  if (/bing\./.test(host)) return { source: 'bing' }
  if (/duckduckgo\./.test(host)) return { source: 'duckduckgo' }
  if (/linkedin\.|lnkd\.in/.test(host)) return { source: 'linkedin' }
  if (/(twitter|t\.co|x\.com)/.test(host)) return { source: 'x' }
  if (/threads\.(net|com)/.test(host)) return { source: 'threads' }
  if (/instagram\.|ig\.me|l\.instagram/.test(host)) return { source: 'instagram' }
  if (/tiktok\./.test(host)) return { source: 'tiktok' }
  if (/(facebook|fb)\.|l\.facebook|lm\.facebook/.test(host)) return { source: 'facebook' }
  if (/(youtube|youtu\.be)/.test(host)) return { source: 'youtube' }
  if (/reddit\.|redd\.it/.test(host)) return { source: 'reddit' }
  if (/bsky\.|bluesky/.test(host)) return { source: 'bluesky' }
  if (/(mastodon|mstdn|fosstodon|hachyderm)\./.test(host)) return { source: 'mastodon' }
  if (/(t\.me|telegram)/.test(host)) return { source: 'telegram' }
  if (/(wa\.me|whatsapp)/.test(host)) return { source: 'whatsapp' }
  if (/pinterest\.|pin\.it/.test(host)) return { source: 'pinterest' }
  if (/(substack|beehiiv)\./.test(host)) return { source: 'newsletter' }
  if (/news\.ycombinator|ycombinator/.test(host)) return { source: 'hackernews' }
  return { source: host }
}
