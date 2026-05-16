import type { MetadataRoute } from 'next'
import { execFileSync } from 'node:child_process'
import { competitors } from './compare/[slug]/data'

const COMPARE_SLUGS = Object.keys(competitors)
const BASE = 'https://mambahr.com'

// Use the file's git commit time as a real, stable lastmod signal. Crawlers learn to ignore
// sitemaps where every URL claims to have changed today, so honesty matters here.
// Fallback to build time if git is unavailable (e.g. shallow CI clone).
const BUILD_TIME = new Date()
function gitMtime(path: string): Date {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    return out ? new Date(out) : BUILD_TIME
  } catch {
    return BUILD_TIME
  }
}

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']
type StaticRoute = { path: string; file: string; changeFrequency: Freq; priority: number }

const STATIC_ROUTES: StaticRoute[] = [
  { path: '/',         file: 'src/app/page.tsx',          changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/demo',     file: 'src/app/demo/page.tsx',     changeFrequency: 'weekly',  priority: 0.95 },
  { path: '/today',    file: 'src/app/today/page.tsx',    changeFrequency: 'monthly', priority: 0.9 },
  { path: '/mamba',    file: 'src/app/mamba/page.tsx',    changeFrequency: 'monthly', priority: 0.9 },
  { path: '/people',   file: 'src/app/people/page.tsx',   changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hiring',   file: 'src/app/hiring/page.tsx',   changeFrequency: 'monthly', priority: 0.8 },
  { path: '/compare',  file: 'src/app/compare/page.tsx',  changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about',    file: 'src/app/about/page.tsx',    changeFrequency: 'monthly', priority: 0.7 },
  { path: '/security', file: 'src/app/security/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
]

const COMPARE_SLUG_FILE = 'src/app/compare/[slug]/data.ts'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: gitMtime(r.file),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const compareLastMod = gitMtime(COMPARE_SLUG_FILE)
  const compareRoutes: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${BASE}/compare/${slug}`,
    lastModified: compareLastMod,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...compareRoutes]
}
