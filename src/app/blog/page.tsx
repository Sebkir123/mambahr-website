import type { Metadata } from 'next'
import Link from 'next/link'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getPublishedPosts, effectiveDate } from '@/lib/blog-queries'
import { postUrl, type Post } from '@/lib/blog'
import styles from './blog.module.css'

export const dynamic = 'force-dynamic'

const SITE = 'https://mambahr.com'

// Deterministic 0–360° hue per post so each branded plate reads a little
// differently (gold→violet glow shifts) without storing anything per post.
function hueFor(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360
  return h
}

// Cover renders the real cover image when one exists, else a branded
// title-plate that echoes the OG-image aesthetic. Kept in this file so the
// blog.module.css hover selectors (.lead:hover .plate, .card:hover .cardImg)
// resolve against the same hashed class names.
function Cover({ post, variant }: { post: Post; variant: 'lead' | 'card' }) {
  if (post.cover_image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={post.cover_image_url}
        alt={post.title}
        className={variant === 'lead' ? styles.leadImg : styles.cardImg}
      />
    )
  }
  const tag = post.tags?.[0] ?? 'MambaHR'
  return (
    <div
      className={`${styles.plate} ${variant === 'card' ? styles.plateCard : ''}`}
      style={{ ['--cover-hue' as string]: `${hueFor(post.slug)}deg` }}
      aria-hidden
    >
      <div className={styles.plateBody}>
        <span className={styles.plateMark}>M</span>
        <span className={styles.plateBrand}>MambaHR</span>
      </div>
      <div className={styles.plateFoot}>
        <span className={styles.plateRule} />
        <span className={styles.plateTag}>{tag}</span>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Blog | MambaHR',
  description:
    'Field notes on AI in HR, multi-state compliance, hiring, onboarding, and what it takes to run a people function end to end. From the team building the AI HR department.',
  openGraph: {
    title: 'Blog | MambaHR',
    description: 'Field notes on AI in HR, compliance, hiring, and running a people function end to end.',
    url: `${SITE}/blog`,
    type: 'website',
    images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | MambaHR',
    description: 'Field notes on AI in HR, compliance, hiring, and running a people function end to end.',
    images: ['/mambahr_og_sharing.jpg'],
  },
  alternates: {
    canonical: `${SITE}/blog`,
    types: { 'application/rss+xml': `${SITE}/blog/rss.xml` },
  },
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts()
  const [lead, ...rest] = posts

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MambaHR Blog',
    url: `${SITE}/blog`,
    blogPost: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE}${postUrl(p.slug)}`,
      datePublished: effectiveDate(p),
      author: { '@type': 'Organization', name: p.author_name || 'MambaHR' },
    })),
  }

  return (
    <>
      <JsonLd data={itemListSchema} />
      <MegaNav />
      <main className={styles.page}>
        <header className={styles.head}>
          <p className="eyebrow">The MambaHR blog</p>
          <h1 className={styles.title}>Notes from the AI HR department.</h1>
          <p className={styles.lede}>
            What we&rsquo;re learning building the system that runs hiring, onboarding, payroll-ready exports,
            leave, performance, and 50-state compliance end to end.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>No posts yet. The first one is on its way.</p>
            <Link href="/demo" className="btn-gold">Book a demo</Link>
          </div>
        ) : (
          <>
            {lead && (
              <>
              <div className={styles.sectionRow}>
                <span className={styles.sectionLabel}>Latest</span>
                <span className={styles.sectionLine} />
              </div>
              <Link href={postUrl(lead.slug)} className={styles.lead}>
                <div className={styles.leadMedia}>
                  <Cover post={lead} variant="lead" />
                </div>
                <div className={styles.leadBody}>
                  <div className={styles.meta}>
                    {lead.tags?.[0] && <span className={styles.tag}>{lead.tags[0]}</span>}
                    <span className={styles.metaDot}>·</span>
                    <span>{fmtDate(effectiveDate(lead))}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{lead.reading_time} min read</span>
                  </div>
                  <h2 className={styles.leadTitle}>{lead.title}</h2>
                  {lead.excerpt && <p className={styles.leadExcerpt}>{lead.excerpt}</p>}
                  <span className={styles.readMore}>Read the post →</span>
                </div>
              </Link>
              </>
            )}

            {rest.length > 0 && (
              <>
              <div className={`${styles.sectionRow} ${styles.sectionRowGrid}`}>
                <span className={styles.sectionLabel}>More from the journal</span>
                <span className={styles.sectionLine} />
              </div>
              <div className={styles.grid}>
                {rest.map((p) => (
                  <Link key={p.id} href={postUrl(p.slug)} className={styles.card}>
                    <div className={styles.cardMedia}>
                      <Cover post={p} variant="card" />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.meta}>
                        {p.tags?.[0] && <span className={styles.tag}>{p.tags[0]}</span>}
                        <span className={styles.metaDot}>·</span>
                        <span>{fmtDate(effectiveDate(p))}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{p.title}</h3>
                      {p.excerpt && <p className={styles.cardExcerpt}>{p.excerpt}</p>}
                      <span className={styles.cardMins}>{p.reading_time} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
