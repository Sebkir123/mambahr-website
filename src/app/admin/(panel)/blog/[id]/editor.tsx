'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { type Post, slugify, TAG_OPTIONS } from '@/lib/blog'
import { savePost, setPostStatus, deletePost, listRevisions, restoreRevision, type SavePayload, type Revision } from '../actions'
import { uploadImage } from './upload'
import PostAnalytics from './post-analytics'
import type { BlogPostAnalytics } from '@/lib/blog-analytics-types'
import styles from './editor.module.css'

// TipTap + ProseMirror is ~440 KB — by far the heaviest chunk in the app. It's
// only needed inside this editor, so load it lazily (client-only) behind a
// placeholder rather than shipping it in the editor route's initial JS.
const RichText = dynamic(() => import('./rich-text'), {
  ssr: false,
  loading: () => <div className={styles.editorLoading}>Loading editor…</div>,
})

const SITE = 'https://mambahr.com'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function Editor({ post, analytics }: { post: Post; analytics: BlogPostAnalytics }) {
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [slugTouched, setSlugTouched] = useState(!post.slug.startsWith('untitled-'))
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [authorName, setAuthorName] = useState(post.author_name)
  const [tags, setTags] = useState<string[]>(post.tags || [])
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(post.cover_image_url)
  // SEO
  const [metaTitle, setMetaTitle] = useState(post.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(post.meta_description || '')
  const [canonicalUrl, setCanonicalUrl] = useState(post.canonical_url || '')
  const [ogTitle, setOgTitle] = useState(post.og_title || '')
  const [ogDescription, setOgDescription] = useState(post.og_description || '')
  const [ogImageUrl, setOgImageUrl] = useState<string | null>(post.og_image_url)
  const [noindex, setNoindex] = useState(post.noindex)
  // status
  const [status, setStatus] = useState(post.status)
  const [scheduledFor, setScheduledFor] = useState(post.scheduled_for || '')
  const [publishedAt, setPublishedAt] = useState(post.published_at || '')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()
  // revision history + restore signal pushed into the rich-text editor
  const [revisions, setRevisions] = useState<Revision[]>([])
  const [restore, setRestore] = useState<{ json: unknown; nonce: number } | null>(null)

  // latest body, written by the editor's onChange (kept in a ref to avoid
  // re-rendering the whole screen on every keystroke).
  const bodyRef = useRef<{ html: string; json: unknown }>({ html: post.body_html, json: post.body_json })
  const coverRef = useRef<HTMLInputElement>(null)
  const ogRef = useRef<HTMLInputElement>(null)
  const [deleting, setDeleting] = useState(false)
  const deletingRef = useRef(false)

  const buildPayload = useCallback(
    (): SavePayload => ({
      id: post.id,
      title,
      slug: slugTouched ? slug : slugify(title) || slug,
      excerpt,
      bodyHtml: bodyRef.current.html,
      bodyJson: bodyRef.current.json,
      coverImageUrl,
      authorName,
      tags,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      ogTitle: ogTitle || null,
      ogDescription: ogDescription || null,
      ogImageUrl,
      noindex,
      scheduledFor: scheduledFor || null,
      publishedAt: publishedAt || null,
    }),
    [post.id, title, slug, slugTouched, excerpt, coverImageUrl, authorName, tags, metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImageUrl, noindex, scheduledFor, publishedAt],
  )

  const doSave = useCallback(async () => {
    if (deletingRef.current) return // don't resurrect a post mid-delete
    setSaveState('saving')
    setError('')
    const res = await savePost(buildPayload())
    if (res.ok) {
      setSaveState('saved')
      // Reflect the slug the server actually persisted — it may have been
      // auto-deduped (untitled-post → untitled-post-2) to avoid a collision.
      if (res.slug !== slug) setSlug(res.slug)
    } else {
      setSaveState('error')
      setError(res.error)
    }
  }, [buildPayload, slug])

  // Debounced autosave whenever a tracked field changes.
  const dirtyRef = useRef(false)
  useEffect(() => {
    if (!dirtyRef.current) {
      dirtyRef.current = true
      return // skip the mount pass
    }
    setSaveState('saving')
    const t = setTimeout(() => {
      void doSave()
    }, 1200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, slug, excerpt, authorName, tags, coverImageUrl, metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImageUrl, noindex, scheduledFor, publishedAt])

  // Load revision history on mount and refresh it whenever a save lands (each
  // autosave appends a new snapshot, so the list should follow).
  const loadRevisions = useCallback(() => {
    void listRevisions(post.id).then(setRevisions)
  }, [post.id])
  useEffect(() => { loadRevisions() }, [loadRevisions])
  useEffect(() => {
    if (saveState === 'saved') loadRevisions()
  }, [saveState, loadRevisions])

  const onRestore = useCallback(async (rev: Revision) => {
    if (!confirm('Restore this version? The current content is replaced (and kept in history, so this is reversible).')) return
    const res = await restoreRevision(post.id, rev.id)
    if (!res.ok) { setError(res.error); return }
    setTitle(res.title)
    if (res.excerpt !== null) setExcerpt(res.excerpt)
    setRestore({ json: res.bodyJson, nonce: Date.now() })
  }, [post.id])

  const onBodyChange = useCallback((html: string, json: unknown) => {
    bodyRef.current = { html, json }
    setSaveState('saving')
    if (bodyTimer.current) clearTimeout(bodyTimer.current)
    bodyTimer.current = setTimeout(() => void doSave(), 1400)
  }, [doSave])
  const bodyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function changeStatus(next: 'published' | 'draft' | 'scheduled') {
    startTransition(async () => {
      // Persist current edits first so publish reflects them.
      await savePost(buildPayload())
      const res = await setPostStatus(post.id, next, scheduledFor || null)
      if (res.ok) setStatus(next)
      else setError(res.error)
    })
  }

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const url = await uploadImage(file)
    if (url) setCoverImageUrl(url)
  }
  async function onOg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const url = await uploadImage(file)
    if (url) setOgImageUrl(url)
  }

  const effTitle = (metaTitle || title || 'Untitled post').trim()
  const effDesc = (metaDescription || excerpt).trim()
  const effOgImg = ogImageUrl || coverImageUrl
  const liveUrl = `${SITE}/blog/${slugTouched ? slug : slugify(title) || slug}`

  return (
    <div className={styles.layout}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <Link href="/admin/blog" className={styles.back}>← Blog</Link>
        <div className={styles.topRight}>
          <span className={styles.saveState} data-state={saveState}>
            {saveState === 'saving' && 'Saving…'}
            {saveState === 'saved' && 'Saved'}
            {saveState === 'error' && 'Save failed'}
          </span>
          {status === 'published' && (
            <a href={`/blog/${slug}`} target="_blank" rel="noreferrer" className={styles.viewLink}>View ↗</a>
          )}
        </div>
      </div>

      {error && <div className={styles.errorBar}>{error}</div>}

      <div className={styles.grid}>
        {/* Main column */}
        <div className={styles.main}>
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />

          <div className={styles.slugRow}>
            <span className={styles.slugPrefix}>/blog/</span>
            <input
              className={styles.slugInput}
              value={slug}
              onChange={(e) => { setSlug(cleanSlugInput(e.target.value)); setSlugTouched(true) }}
              placeholder="post-slug"
            />
            <button
              type="button"
              className={styles.slugReset}
              onClick={() => { setSlug(slugify(title)); setSlugTouched(false) }}
            >
              from title
            </button>
          </div>

          {/* Cover image */}
          <div className={styles.coverBlock}>
            {coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImageUrl} alt="Cover" className={styles.coverImg} />
            ) : (
              <div className={styles.coverEmpty}>No cover image</div>
            )}
            <div className={styles.coverActions}>
              <button type="button" className={styles.smallBtn} onClick={() => coverRef.current?.click()}>
                {coverImageUrl ? 'Replace cover' : 'Add cover'}
              </button>
              {coverImageUrl && (
                <button type="button" className={styles.smallBtnGhost} onClick={() => setCoverImageUrl(null)}>Remove</button>
              )}
              <input ref={coverRef} type="file" accept="image/*" hidden onChange={onCover} />
            </div>
          </div>

          <RichText initialContent={post.body_json ?? post.body_html} onChange={onBodyChange} restore={restore} />
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Reads */}
          <PostAnalytics a={analytics} published={status === 'published'} />

          {/* Publish */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>Publish</h3>
            <div className={styles.statusLine}>
              Status: <strong className={styles[`st_${status}`]}>{status}</strong>
            </div>
            {status !== 'published' ? (
              <button className={styles.publishBtn} disabled={pending} onClick={() => changeStatus('published')}>
                {pending ? 'Working…' : 'Publish now'}
              </button>
            ) : (
              <button className={styles.unpublishBtn} disabled={pending} onClick={() => changeStatus('draft')}>
                {pending ? 'Working…' : 'Unpublish'}
              </button>
            )}
            <div className={styles.scheduleRow}>
              <label className={styles.fieldLabel}>Schedule for</label>
              <input
                type="datetime-local"
                className={styles.input}
                value={scheduledFor ? toLocalInput(scheduledFor) : ''}
                onChange={(e) => setScheduledFor(e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
              <button
                className={styles.smallBtn}
                disabled={pending || !scheduledFor}
                onClick={() => changeStatus('scheduled')}
              >
                Schedule
              </button>
            </div>
            {status === 'published' && (
              <div className={styles.scheduleRow}>
                <label className={styles.fieldLabel}>Publish date</label>
                <input
                  type="datetime-local"
                  className={styles.input}
                  value={publishedAt ? toLocalInput(publishedAt) : ''}
                  onChange={(e) => setPublishedAt(e.target.value ? new Date(e.target.value).toISOString() : '')}
                />
                <span className={styles.hint}>Used for ordering &amp; article schema. Backdate imported posts here.</span>
              </div>
            )}
          </section>

          {/* SEO */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>SEO</h3>

            <Field label="Meta title" hint={`${effTitle.length}/60`} over={effTitle.length > 60}>
              <input className={styles.input} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title || 'Defaults to post title'} />
            </Field>

            <Field label="Meta description" hint={`${effDesc.length}/160`} over={effDesc.length > 160}>
              <textarea className={styles.textarea} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder={excerpt || 'Defaults to excerpt'} rows={3} />
            </Field>

            {/* Google SERP preview */}
            <div className={styles.serp}>
              <div className={styles.serpUrl}>{liveUrl}</div>
              <div className={styles.serpTitle}>{effTitle}</div>
              <div className={styles.serpDesc}>{effDesc || 'Add a meta description or excerpt to preview the snippet.'}</div>
            </div>

            <Field label="Canonical URL">
              <input className={styles.input} value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} placeholder="Leave blank for default" />
            </Field>

            <label className={styles.checkRow}>
              <input type="checkbox" checked={noindex} onChange={(e) => setNoindex(e.target.checked)} />
              <span>Hide from search engines (noindex)</span>
            </label>
          </section>

          {/* Social card */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>Social card</h3>
            <div className={styles.socialCard}>
              {effOgImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={effOgImg} alt="Social preview" className={styles.socialImg} />
              ) : (
                <div className={styles.socialImgEmpty}>Cover / OG image</div>
              )}
              <div className={styles.socialMeta}>
                <div className={styles.socialDomain}>mambahr.com</div>
                <div className={styles.socialTitle}>{(ogTitle || effTitle).trim()}</div>
                <div className={styles.socialDesc}>{(ogDescription || effDesc).trim()}</div>
              </div>
            </div>
            <Field label="OG title"><input className={styles.input} value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} placeholder="Defaults to meta title" /></Field>
            <Field label="OG description"><textarea className={styles.textarea} value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} rows={2} placeholder="Defaults to meta description" /></Field>
            <div className={styles.coverActions}>
              <button type="button" className={styles.smallBtn} onClick={() => ogRef.current?.click()}>
                {ogImageUrl ? 'Replace OG image' : 'Custom OG image'}
              </button>
              {ogImageUrl && <button type="button" className={styles.smallBtnGhost} onClick={() => setOgImageUrl(null)}>Use cover</button>}
              <input ref={ogRef} type="file" accept="image/*" hidden onChange={onOg} />
            </div>
          </section>

          {/* Meta */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>Details</h3>
            <Field label="Excerpt"><textarea className={styles.textarea} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="One or two sentences shown on the blog index." /></Field>
            <Field label="Author"><input className={styles.input} value={authorName} onChange={(e) => setAuthorName(e.target.value)} /></Field>
            <Field label="Tags">
              <div className={styles.tagWrap}>
                {TAG_OPTIONS.map((t) => {
                  const on = tags.includes(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      className={on ? styles.tagOn : styles.tagOff}
                      onClick={() => setTags(on ? tags.filter((x) => x !== t) : [...tags, t])}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </Field>
          </section>

          {/* History */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>History</h3>
            {revisions.length === 0 ? (
              <p className={styles.historyEmpty}>No saved versions yet. Edits autosave a version you can roll back to.</p>
            ) : (
              <ul className={styles.historyList}>
                {revisions.map((rev) => (
                  <li key={rev.id} className={styles.historyRow}>
                    <div className={styles.historyMeta}>
                      <span className={styles.historyWhen}>{fmtWhen(rev.saved_at)}</span>
                      <span className={styles.historyTitle}>{rev.title?.trim() || 'Untitled post'}</span>
                    </div>
                    <button type="button" className={styles.smallBtnGhost} onClick={() => onRestore(rev)}>
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <button
            className={styles.deleteBtn}
            disabled={deleting}
            onClick={() => {
              if (deleting || !confirm('Delete this post permanently?')) return
              // Stop autosave from firing (and resurrecting the row) mid-delete,
              // and show progress so it doesn't look frozen during the redirect.
              deletingRef.current = true
              setDeleting(true)
              if (bodyTimer.current) clearTimeout(bodyTimer.current)
              startTransition(() => deletePost(post.id))
            }}
          >
            {deleting ? 'Deleting…' : 'Delete post'}
          </button>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, hint, over, children }: { label: string; hint?: string; over?: boolean; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label className={styles.fieldLabel}>{label}</label>
        {hint && <span className={over ? styles.hintOver : styles.hint}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

// Keep the slug field showing only valid slug characters as you type. Spaces
// become hyphens; anything outside [a-z0-9-] is dropped. The server still runs
// the canonical slugify() (collapsing repeats, trimming) on save.
function cleanSlugInput(v: string): string {
  return v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Compact timestamp for the history list, e.g. "Jun 15, 2:04 PM".
function fmtWhen(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

// ISO → value for <input type="datetime-local"> (local time, no seconds).
function toLocalInput(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
