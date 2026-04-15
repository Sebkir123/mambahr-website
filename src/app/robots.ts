import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/d/' },
      { userAgent: 'ia_archiver', disallow: '/' },
      { userAgent: 'archive.org_bot', disallow: '/' },
    ],
    sitemap: 'https://mambahr.com/sitemap.xml',
  }
}
