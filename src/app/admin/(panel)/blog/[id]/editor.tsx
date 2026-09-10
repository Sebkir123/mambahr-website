'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { type Post, slugify, TAG_OPTIONS } from '@/lib/blog'
import { savePost, setPostStatus, deletePost, listRevisions, restoreRevision, type SavePayload, type SaveResult, type Revision } from '../actions'
import { uploadImage, deleteImages } from './upload'
import { bodyImageUrls } from '@/lib/blog-images'
import ImageCropModal from './image-crop-modal'
import PostAnalytics from './post-analytics'
import { ConfirmButton } from '../../_components/confirm-button'
import type { BlogPostAnalytics } from '@/lib/blog-analytics-types'
import styles from './editor.module.css'

// TipTap + ProseMirror is ~440 KB, by far the heaviest chunk in the app. It's
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
  const [restore, setRestore] = useState<{ html: string | null; json: unknown; nonce: number } | null>(null)

  // latest body, written by the editor's onChange (kept in a ref to avoid
  // re-rendering the whole screen on every keystroke).
  const bodyRef = useRef<{ html: string; json: unknown }>({ html: post.body_html, json: post.body_json })
  const coverRef = useRef<HTMLInputElement>(null)
  const ogRef = useRef<HTMLInputElement>(null)
  const [deleting, setDeleting] = useState(false)
  const deletingRef = useRef(false)

  // Debounce timers + a "there is an unsaved change" flag, all in refs so the
  // flush-on-leave handler can reach them without re-subscribing every render.
  const fieldTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bodyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingSaveRef = useRef(false)
  // Current cover/OG URLs mirrored into refs so the stable onBodyChange (which
  // must not change identity, TipTap captures it once) can read the latest
  // values when garbage-collecting removed in-body images.
  const coverUrlRef = useRef(coverImageUrl)
  const ogUrlRef = useRef(ogImageUrl)
  useEffect(() => {
    coverUrlRef.current = coverImageUrl
    ogUrlRef.current = ogImageUrl
  }, [coverImageUrl, ogImageUrl])

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

  // buildPayload is recreated on every keystroke; doSave reads it through a
  // ref so doSave itself can stay referentially stable (needed for the save
  // chain below) while always picking up the latest field values.
  const buildPayloadRef = useRef(buildPayload)
  useEffect(() => { buildPayloadRef.current = buildPayload }, [buildPayload])

  // Autosave requests must never overlap. Supabase responses can arrive out
  // of order, and an older save landing after a newer one silently
  // overwrites it, in-body images, links, and heading levels reported as
  // "disappearing after a while" were exactly this: older content
  // clobbering newer edits whenever two autosaves' responses crossed in
  // flight. Chain every save onto whatever save is already in flight so
  // they run, and land, strictly in the order they were requested.
  const saveChainRef = useRef<Promise<SaveResult | void>>(Promise.resolve())
  const doSave = useCallback((): Promise<SaveResult | void> => {
    const run = async (): Promise<SaveResult | void> => {
      if (deletingRef.current) return // don't resurrect a post mid-delete
      setSaveState('saving')
      setError('')
      const res = await savePost(buildPayloadRef.current())
      if (res.ok) {
        setSaveState('saved')
        // Reflect the slug the server actually persisted, it may have been
        // auto-deduped (untitled-post → untitled-post-2) to avoid a collision.
        setSlug((prev) => (res.slug !== prev ? res.slug : prev))
      } else {
        setSaveState('error')
        setError(res.error)
      }
      return res
    }
    const next = saveChainRef.current.then(run, run)
    saveChainRef.current = next
    return next
  }, [])

  // Debounced autosave whenever a tracked field changes.
  const dirtyRef = useRef(false)
  useEffect(() => {
    if (!dirtyRef.current) {
      dirtyRef.current = true
      return // skip the mount pass
    }
    setSaveState('saving')
    pendingSaveRef.current = true
    if (fieldTimer.current) clearTimeout(fieldTimer.current)
    fieldTimer.current = setTimeout(() => { pendingSaveRef.current = false; void doSave() }, 1200)
    return () => { if (fieldTimer.current) clearTimeout(fieldTimer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, slug, excerpt, authorName, tags, coverImageUrl, metaTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImageUrl, noindex, scheduledFor, publishedAt])

  // Flush any pending debounced save immediately. Without this, an edit made
  // inside the debounce window (~1.2-1.4s) is silently lost when you leave the
  // editor or close the tab before the timer fires.
  const flushSave = useCallback(() => {
    if (deletingRef.current || !pendingSaveRef.current) return
    pendingSaveRef.current = false
    if (fieldTimer.current) clearTimeout(fieldTimer.current)
    if (bodyTimer.current) clearTimeout(bodyTimer.current)
    void doSave()
  }, [doSave])

  // Flush on tab-hide (switching away / closing) and on unmount (navigating
  // back to the blog list). visibilitychange fires before the page tears down,
  // giving the request a head start; the unmount flush covers SPA navigation,
  // where the fetch reliably completes because the page stays alive.
  useEffect(() => {
    const onHide = () => { if (document.visibilityState === 'hidden') flushSave() }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flushSave)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flushSave)
      flushSave()
    }
  }, [flushSave])

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
    const res = await restoreRevision(post.id, rev.id)
    if (!res.ok) { setError(res.error); return }
    setTitle(res.title)
    if (res.excerpt !== null) setExcerpt(res.excerpt)
    // Prefer the revision's body_html (carries hrefs) and fall back to body_json
    // for revisions saved before the body_html column existed.
    setRestore({ html: res.bodyHtml, json: res.bodyJson, nonce: Date.now() })
  }, [post.id])

  const onBodyChange = useCallback((html: string, json: unknown) => {
    // An in-body image that was removed from the body is a cleanup candidate,
    // but only once it's no longer referenced anywhere in the post (cover, OG,
    // or elsewhere in the body). We deliberately do NOT delete it here, an
    // undo would resurrect the <img> pointing at a now-deleted file, so the
    // daily sweep collects unreferenced, aged-out objects instead.
    bodyRef.current = { html, json }
    setSaveState('saving')
    pendingSaveRef.current = true
    if (bodyTimer.current) clearTimeout(bodyTimer.current)
    bodyTimer.current = setTimeout(() => { pendingSaveRef.current = false; void doSave() }, 1400)
  }, [doSave])

  function changeStatus(next: 'published' | 'draft' | 'scheduled') {
    startTransition(async () => {
      // Persist current edits first so publish reflects them, chained
      // through the same save queue so it can't race a pending autosave.
      await doSave()
      const res = await setPostStatus(post.id, next, scheduledFor || null)
      if (res.ok) setStatus(next)
      else setError(res.error)
    })
  }

  // Cover and OG images render at a fixed 1200×630 (1.91:1) card everywhere
  // they're shown (blog index cards, social previews), so both route through
  // the same crop-to-that-aspect step before upload.
  const [cropTarget, setCropTarget] = useState<{ file: File; kind: 'cover' | 'og' } | null>(null)

  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) setCropTarget({ file, kind: 'cover' })
  }
  function onOg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) setCropTarget({ file, kind: 'og' })
  }

  // Delete an image we're dropping (replaced/removed cover or OG) from storage,
  // but only if nothing else in the post still points at it. `next` carries the
  // values AFTER the change (state updates are async, so we can't read them back
  // yet). The cover/OG pickers have no undo stack, so eager deletion is safe here.
  function gcCoverOg(removed: string | null, next: { cover: string | null; og: string | null }) {
    if (!removed) return
    const stillUsed =
      removed === next.cover ||
      removed === next.og ||
      bodyImageUrls(bodyRef.current.html).includes(removed)
    if (!stillUsed) void deleteImages([removed])
  }

  async function onCropConfirm(blob: Blob) {
    const target = cropTarget
    setCropTarget(null)
    if (!target) return
    const cropped = new File([blob], target.file.name, { type: blob.type })
    const url = await uploadImage(cropped)
    if (!url) return
    if (target.kind === 'cover') {
      const old = coverImageUrl
      setCoverImageUrl(url)
      gcCoverOg(old, { cover: url, og: ogImageUrl })
    } else {
      const old = ogImageUrl
      setOgImageUrl(url)
      gcCoverOg(old, { cover: coverImageUrl, og: url })
    }
  }

  function removeCover() {
    const old = coverImageUrl
    setCoverImageUrl(null)
    gcCoverOg(old, { cover: null, og: ogImageUrl })
  }
  function useCoverForOg() {
    const old = ogImageUrl
    setOgImageUrl(null)
    gcCoverOg(old, { cover: coverImageUrl, og: null })
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
                <button type="button" className={styles.smallBtnGhost} onClick={removeCover}>Remove</button>
              )}
              <input ref={coverRef} type="file" accept="image/*" hidden onChange={onCover} />
            </div>
          </div>

          {/* Load from body_html (the sanitized, rendered source of truth), NOT
              body_json. An older editor build persisted <a> link marks WITHOUT
              their href into body_json; preferring body_json therefore loaded
              href-less links and the next autosave rewrote body_html with dead
              anchors — every external link silently died a while after publish.
              body_html round-trips losslessly for this editor's feature set. */}
          <RichText initialContent={post.body_html || post.body_json} onChange={onBodyChange} restore={restore} />
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
              {ogImageUrl && <button type="button" className={styles.smallBtnGhost} onClick={useCoverForOg}>Use cover</button>}
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
                    <ConfirmButton
                      onConfirm={() => onRestore(rev)}
                      confirmLabel="Restore"
                      className={styles.smallBtnGhost}
                    >
                      Restore
                    </ConfirmButton>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <ConfirmButton
            onConfirm={() => {
              deletingRef.current = true
              setDeleting(true)
              if (bodyTimer.current) clearTimeout(bodyTimer.current)
              startTransition(() => deletePost(post.id))
            }}
            confirmLabel="Delete post"
            pending={deleting}
            className={styles.deleteBtn}
          >
            Delete post
          </ConfirmButton>
        </aside>
      </div>

      {cropTarget && (
        <ImageCropModal
          file={cropTarget.file}
          defaultAspect={1200 / 630}
          onCancel={() => setCropTarget(null)}
          onConfirm={onCropConfirm}
        />
      )}
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
