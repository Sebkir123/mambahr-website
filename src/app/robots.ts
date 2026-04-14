import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/d/' },
    ],
    sitemap: 'https://mambahr.com/sitemap.xml',
  }
}
