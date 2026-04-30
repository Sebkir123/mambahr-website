import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mambahr.com'
  const now = new Date()

  return [
    { url: `${base}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/today`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/mamba`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/people`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/hiring`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/security`,lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
