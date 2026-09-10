import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { MambaMark } from '@/components/mamba-mark'
import { getAnyResource } from '@/lib/resources'
import ResourceGate from './gate'
import ShareButton from './share-button'
import styles from './landing.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = await getAnyResource(slug)
  if (!r) return { title: 'Resource | MambaHR' }
  const title = `${r.title} | MambaHR`
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
  const r = await getAnyResource(slug)
  if (!r) notFound()

  const shareUrl = `https://mambahr.com/resources/${r.slug}`

  return (
    <>
      <MegaNav />
      {r.status === 'draft' && (
        <div style={{ background: 'var(--text)', color: '#F5C872', textAlign: 'center', padding: '10px 16px', fontSize: '13px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          DRAFT PREVIEW, not visible to the public until published
        </div>
      )}
      <main id="main" className={styles.main}>
        <div className={styles.aurora} aria-hidden="true"><span className={styles.blob} /><span className={styles.blob2} /></div>
        <div className={styles.wrap}>
          {/* ── Cover ── */}
          <div className={styles.coverCol}>
            <div className={styles.coverStage}>
              <div className={styles.cover}>
                <span className={styles.grain} aria-hidden="true" />
                <MambaMark size={230} color="rgba(196,154,108,0.13)" className={styles.coverEmblem} />
                <div className={styles.coverTop}>
                  <span className={styles.coverBrand}><span className={styles.m}>M</span>MambaHR</span>
                  <span className={styles.coverRule} aria-hidden="true" />
                </div>
                <div className={styles.coverBody}>
                  <span className={styles.coverKicker}>{r.kicker}{r.cover_no ? ` № ${r.cover_no}` : ''}</span>
                  <h2 className={styles.coverTitle}>{r.title}</h2>
                  <div className={styles.coverFoot}>
                    <span className={styles.coverFootText}>A people leader’s field guide</span>
                    <span className={styles.coverDash} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.coverMeta}>PDF · free · no sales call</p>
          </div>

          {/* ── Content + gate ── */}
          <div className={styles.content}>
            <p className={styles.eyebrow}>{r.kicker}</p>
            <h1 className={styles.title}>{r.title}</h1>
            {r.description && <p className={styles.desc}>{r.description}</p>}

            {r.bullets.length > 0 && (
              <>
                <p className={styles.whatsIn}>What’s inside</p>
                <ul className={styles.bullets}>
                  {r.bullets.map((b) => (
                    <li key={b}><span className={styles.tick} aria-hidden="true" />{b}</li>
                  ))}
                </ul>
              </>
            )}

            <div className={styles.gateCard}>
              <div className={styles.gateHead}>
                <span className={styles.gateTitle}>Get your copy</span>
                <ShareButton url={shareUrl} title={r.title} />
              </div>
              {r.file_path ? (
                <ResourceGate slug={r.slug} kicker={r.kicker} />
              ) : (
                <p className={styles.unavailable}>This resource isn’t available for download yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
