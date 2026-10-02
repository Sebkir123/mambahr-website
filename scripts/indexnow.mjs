// Tells Bing (and through it ChatGPT search and Copilot), Yandex, Seznam and
// Naver that our pages changed, so new or edited pages are picked up in hours
// instead of whenever the crawler next comes by. Run after a production deploy:
//
//   npm run indexnow            # every URL in the live sitemap
//   npm run indexnow -- <url>…  # just these
//
// The key file public/4739d12605d01af7bbe63e4dec442fc0.txt proves we own the host; IndexNow
// fetches it from https://www.mambahr.com/4739d12605d01af7bbe63e4dec442fc0.txt.
const HOST = 'www.mambahr.com'
const KEY = '4739d12605d01af7bbe63e4dec442fc0'

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

const urls = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls()
if (urls.length === 0) throw new Error('no URLs to submit')

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
// 200 and 202 both mean accepted; anything else is worth reading.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`)
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text())
  process.exit(1)
}
