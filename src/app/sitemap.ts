import type { MetadataRoute } from 'next'
import { competitors } from './compare/[slug]/data'

const COMPARE_SLUGS = Object.keys(competitors)

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mambahr.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/demo`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/today`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/mamba`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/people`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/hiring`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/security`,lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const compareRoutes: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${base}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticRoutes, ...compareRoutes]
}
