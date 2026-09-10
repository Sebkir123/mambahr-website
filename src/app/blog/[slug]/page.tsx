import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getPostBySlug, getPublishedPosts, effectiveDate } from '@/lib/blog-queries'
import { postUrl, sanitizePostHtml } from '@/lib/blog'
import ViewPing from './view-ping'
import styles from './post.module.css'

export const dynamic = 'force-dynamic'

const SITE = 'https://mambahr.com'

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post not found | MambaHR', robots: { index: false, follow: false } }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt || undefined
  const url = `${SITE}${postUrl(post.slug)}`
  // Admin uploads win; otherwise the branded dynamic OG image for this post.
  const ogImg = post.og_image_url || post.cover_image_url || `${url}/og`

  return {
    title: `${title} | MambaHR`,
    description,
    alternates: { canonical: post.canonical_url || url },
    robots: post.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: post.og_title || title,
      description: post.og_description || description,
      url,
      siteName: 'MambaHR',
      publishedTime: effectiveDate(post),
      modifiedTime: post.updated_at,
      authors: [post.author_name || 'MambaHR'],
      tags: post.tags,
      images: [{ url: ogImg, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.og_title || title,
      description: post.og_description || description,
      images: [ogImg],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const clean = sanitizePostHtml(post.body_html)
  const published = effectiveDate(post)
  const url = `${SITE}${postUrl(post.slug)}`
  const ogImg = post.og_image_url || post.cover_image_url || `${url}/og`

  // More posts (exclude current), newest first, up to 3.
  const all = await getPublishedPosts()
  const more = all.filter((p) => p.id !== post.id).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: ogImg.startsWith('http') ? ogImg : `${SITE}${ogImg}`,
    datePublished: published,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author_name || 'MambaHR', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'MambaHR',
      logo: { '@type': 'ImageObject', url: `${SITE}/MambaHR_logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags?.join(', ') || undefined,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <ViewPing slug={post.slug} />
      <MegaNav />
      <main id="main" className={styles.page}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/blog" className={styles.crumbLink}>Blog</Link>
          {post.tags?.[0] && <><span className={styles.crumbSep}>/</span><span>{post.tags[0]}</span></>}
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.byline}>
            <span>{post.author_name || 'MambaHR'}</span>
            <span className={styles.bDot}>·</span>
            <time dateTime={published}>{fmtDate(published)}</time>
            <span className={styles.bDot}>·</span>
            <span>{post.reading_time} min read</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tagRow}>
              {post.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          )}
        </header>

        {post.cover_image_url && (
          <div className={styles.cover}>
            <Image
              src={post.cover_image_url}
              alt={post.title}
              width={880}
              height={495}
              sizes="(max-width: 800px) calc(100vw - 40px), 760px"
              priority
              className={styles.coverImg}
            />
          </div>
        )}

        <article className={styles.prose} dangerouslySetInnerHTML={{ __html: clean }} />

        <div className={styles.cta}>
          <div>
            <p className={styles.ctaKicker}>Before you hire HR, hire MambaHR.</p>
            <p className={styles.ctaSub}>The whole department, hiring to compliance, run end to end.</p>
          </div>
          <Link href="/demo" className="btn-gold">Book a demo</Link>
        </div>
      </main>

      {more.length > 0 && (
        <section className={styles.moreWrap}>
          <div className={styles.moreInner}>
            <h2 className={styles.moreTitle}>Keep reading</h2>
            <div className={styles.moreGrid}>
              {more.map((p) => (
                <Link key={p.id} href={postUrl(p.slug)} className={styles.moreCard}>
                  {p.tags?.[0] && <span className={styles.tag}>{p.tags[0]}</span>}
                  <h3 className={styles.moreCardTitle}>{p.title}</h3>
                  <span className={styles.moreCardDate}>{fmtDate(effectiveDate(p))}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
