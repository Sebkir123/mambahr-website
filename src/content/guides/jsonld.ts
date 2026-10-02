// Structured data for the guides, state pages and hubs. Built only from the
// typed records in this folder (no user input), and only describing content a
// reader can see on the page.

import type { Faq } from './types'
import { LAST_REVIEWED } from './types'
import { SITE } from './index'

const PUBLISHER = {
  '@type': 'Organization',
  name: 'MambaHR',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/MambaHR_logo.png` },
}

export function articleJsonLd({ path, headline, description }: { path: string; headline: string; description: string }) {
  const url = `${SITE}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: LAST_REVIEWED,
    dateModified: LAST_REVIEWED,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: 'MambaHR', url: SITE },
    publisher: PUBLISHER,
    image: `${SITE}/mambahr_og_sharing.jpg`,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  }
}

/** Strips inline markup (links, bold) so text reads plainly in JSON-LD and llms.txt. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')
}

export function faqJsonLd(faq: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }
}

export function collectionJsonLd({
  path,
  name,
  description,
  items,
}: {
  path: string
  name: string
  description: string
  items: { name: string; path: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE}${path}`,
    dateModified: LAST_REVIEWED,
    publisher: PUBLISHER,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: `${SITE}${it.path}`,
      })),
    },
  }
}

/** Shared page metadata shape (canonical, OG, Twitter). */
export function pageMetadata({ path, title, description, type = 'article' }: { path: string; title: string; description: string; type?: 'article' | 'website' }) {
  const url = `${SITE}${path}`
  const og = '/mambahr_og_sharing.jpg'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MambaHR',
      type,
      images: [{ url: og, width: 1200, height: 630 }],
      ...(type === 'article' ? { modifiedTime: LAST_REVIEWED } : {}),
    },
    twitter: { card: 'summary_large_image' as const, title, description, images: [og] },
  }
}
