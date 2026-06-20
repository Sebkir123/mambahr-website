import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { getPublishedResource, resourceDownloadUrl } from '@/lib/resources'
import styles from './landing.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = await getPublishedResource(slug)
  if (!r) return { title: 'Resource — MambaHR' }
  const title = `${r.title} — MambaHR`
  const description = r.description || `Download ${r.title}, a free playbook from MambaHR.`
  const url = `https://mambahr.com/resources/${r.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'MambaHR', type: 'article', images: [{ url: '/mambahr_og_sharing.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/mambahr_og_sharing.jpg'] },
  }
}

export default async function ResourceLanding({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = await getPublishedResource(slug)
  if (!r) notFound()

  const fileUrl = r.file_path ? resourceDownloadUrl(r.file_path, r.file_name) : null

  return (
    <>
      <MegaNav />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.cover} aria-hidden="true">
            <span className={styles.grain} />
            <div className={styles.coverBrand}><span className={styles.m}>M</span>MambaHR</div>
            {r.cover_no && <div className={styles.coverKicker}>{r.kicker} № {r.cover_no}</div>}
            <div className={styles.coverTitle}>{r.title}</div>
            <div className={styles.coverFoot}>A people leader&rsquo;s field guide</div>
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>{r.kicker}</p>
            <h1 className={styles.title}>{r.title}</h1>
            {r.description && <p className={styles.desc}>{r.description}</p>}

            {r.bullets.length > 0 && (
              <ul className={styles.bullets}>
                {r.bullets.map((b) => (
                  <li key={b}><span className={styles.tick} aria-hidden="true" />{b}</li>
                ))}
              </ul>
            )}

            {fileUrl ? (
              <a
                className={styles.download}
                href={fileUrl}
                data-track="download"
                data-track-label={r.slug}
              >
                Download the {r.kicker.toLowerCase()}
              </a>
            ) : (
              <p className={styles.unavailable}>This resource isn’t available for download yet.</p>
            )}
            <p className={styles.note}>Free · no sign-up · no sales call</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
