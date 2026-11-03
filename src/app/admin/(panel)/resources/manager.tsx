'use client'

import { useRef, useState, useTransition, useMemo, useEffect } from 'react'
import { saveResource, createResourceUploadUrl, setResourceStatus, deleteResource } from './actions'
import { useRouter } from 'next/navigation'
import { useListQuery } from '../_components/use-list-query'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { ConfirmButton } from '../_components/confirm-button'
import ui from '../admin-ui.module.css'
import Icon from '../_components/icon'
import Pagination, { PAGE_SIZE } from '../_components/pagination'
import styles from './resources.module.css'

const MAX_PDF_BYTES = 50 * 1024 * 1024

const SITE = 'https://www.mambahr.com'

export type Row = {
  id: string
  slug: string
  title: string
  kicker: string
  cover_no: string | null
  description: string
  bullets: string[]
  file_path: string | null
  file_name: string | null
  file_size: number | null
  featured: boolean
  status: 'draft' | 'published'
  sort_order: number
}
type Stat = { views: number; visitors: number; downloads: number; topSource: string | null }
type Src = { source: string; views: number }

// Pre-tagged share links for platforms whose in-app browsers strip the referrer
// (so they'd otherwise land as "direct"). The unified link auto-attributes the
// rest. Each appends ?utm_source so the tracker records it explicitly.
const SHARE_PLATFORMS = ['x', 'instagram', 'threads', 'facebook', 'tiktok', 'newsletter'] as const

const BLANK: Row = {
  id: '', slug: '', title: '', kicker: 'Playbook', cover_no: '', description: '',
  bullets: [], file_path: null, file_name: null, file_size: null, featured: false, status: 'draft', sort_order: 0,
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

export default function ResourcesManager({ resources, stats, sources }: { resources: Row[]; stats: Record<string, Stat>; sources: Record<string, Src[]> }) {
  const [editing, setEditing] = useState<Row | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { query, status, sort, page, setQuery, setStatus, setSort, setPage } = useListQuery(['all', 'published', 'draft'], ['order', 'title', 'downloads'])
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [version, setVersion] = useState(0)
  type Intent = { row: Row } | { close: true } | { href: string }
  const [intent, setIntent] = useState<Intent | null>(null)
  const [notice, setNotice] = useState<{ ok: boolean; message: string } | null>(null)
  const guardRef = useRef<HTMLDivElement>(null)
  function apply(next: Intent) {
    setDirty(false); setIntent(null)
    if ('href' in next) { router.push(next.href); return }
    if ('close' in next) { setOpen(false); return }
    setEditing({ ...next.row }); setVersion(v => v + 1); setOpen(true)
  }
  function request(next: Intent) {
    if (busy) return
    if (dirty) { setIntent(next); return }
    apply(next)
  }
  useEffect(() => { if (intent) guardRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }) }, [intent])
  useEffect(() => {
    if (!dirty && !busy) return
    const unload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download') || anchor.origin !== window.location.origin) return
      if (anchor.pathname === window.location.pathname && anchor.search === window.location.search) return
      event.preventDefault(); event.stopPropagation()
      if (!busy) setIntent({ href: anchor.pathname + anchor.search + anchor.hash })
    }
    window.addEventListener('beforeunload', unload)
    document.addEventListener('click', navigate, true)
    return () => { window.removeEventListener('beforeunload', unload); document.removeEventListener('click', navigate, true) }
  }, [dirty, busy])
  const editorRef = useRef<HTMLDivElement>(null)
  const filtered = useMemo(() => resources.filter((resource) => (status === 'all' || resource.status === status) && `${resource.title} ${resource.kicker} ${resource.description}`.toLowerCase().includes(query.toLowerCase().trim())).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'downloads' ? (stats[b.slug]?.downloads ?? 0) - (stats[a.slug]?.downloads ?? 0) : a.sort_order - b.sort_order || a.title.localeCompare(b.title)), [resources, stats, query, status, sort])
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  useEffect(() => { if (open) { editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); editorRef.current?.focus() } }, [open, editing?.id])

  const startNew = () => request({ row: BLANK })
  const startEdit = (r: Row) => { if (open && editing?.id === r.id) { editorRef.current?.scrollIntoView({ behavior: 'smooth' }); return }; request({ row: r }) }

  return (
    <>
      <div className={styles.toolbar}>
        <label className={ui.search}><Icon name="search" size={15} /><input type="search" aria-label="Search resources" placeholder="Search resources…" value={query} onChange={(e) => { setQuery(e.target.value) }} /></label>
        <label className={styles.filter}>Status<select aria-label="Filter resources" value={status} onChange={e => setStatus(e.target.value)}><option value="all">All resources</option><option value="published">Published</option><option value="draft">Draft</option></select></label>
        <label className={styles.filter}>Sort<select aria-label="Sort resources" value={sort} onChange={e => setSort(e.target.value)}><option value="order">Library order</option><option value="title">Title</option><option value="downloads">Most downloaded</option></select></label>
        <button type="button" disabled={busy} className={ui.btnPrimary} onClick={startNew}>+ New resource</button>
      </div>

      {notice && <p role={notice.ok ? 'status' : 'alert'} className={notice.ok ? styles.okMsg : styles.errMsg}>{notice.message}</p>}
      {intent && <div ref={guardRef} className={styles.discard} role="alert"><div><strong>Discard unsaved changes?</strong><p>Your resource edits have not been saved.</p></div><button type="button" className={ui.btnGhost} onClick={() => setIntent(null)}>Keep editing</button><button type="button" className={`${ui.btnGhost} ${styles.discardButton}`} onClick={() => apply(intent)}>Discard changes</button></div>}
      {open && editing && (
        <div ref={editorRef} tabIndex={-1}><Editor key={version} row={editing} stat={stats[editing.slug]} srcs={sources[editing.slug] ?? []} onDirty={setDirty} onBusy={setBusy} onSaved={() => { setDirty(false); setOpen(false); setNotice({ ok: true, message: 'Resource saved.' }) }} onClose={() => request({ close: true })} /></div>
      )}

      <div className={ui.card}>
        {filtered.length === 0 ? (
          <div className={ui.empty}>
            <h3>{resources.length ? 'No matching resources' : 'Your resource library starts here'}</h3>
            <p>{resources.length ? 'Try another search term.' : 'Upload a playbook or guide to give it a shareable page and track downloads.'}</p>
          </div>
        ) : (
          <div className={ui.tableWrap}><table className={ui.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Views</th>
                <th style={{ textAlign: 'right' }}>Downloads</th>
                <th>Top source</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => {
                const s = stats[r.slug]
                const url = `${SITE}/resources/${r.slug}`
                return (
                  <tr key={r.id}>
                    <td>
                      <button type="button" className={styles.titleBtn} onClick={() => startEdit(r)}>
                        {r.title || 'Untitled'}
                      </button>
                      {r.featured && <span className={styles.featuredTag}>Featured</span>}
                      <span className={styles.kicker}>{r.kicker}</span>
                    </td>
                    <td>
                      <span className={`${ui.badge} ${r.status === 'published' ? ui.badgePublished : ui.badgeDraft}`}>{r.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>{s?.views ? s.views : '—'}</td>
                    <td style={{ textAlign: 'right', fontWeight: s?.downloads ? 600 : 400 }}>{s?.downloads ? s.downloads : '—'}</td>
                    <td>{s?.topSource ? <span className={styles.source}>{s.topSource}</span> : '—'}</td>
                    <td><CopyOne url={url} label="Copy link" /></td>
                    <td className={styles.rowActions}>
                      <ResourceActions resource={r} disabled={open || busy} onResult={setNotice} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table></div>
        )}
        <Pagination total={filtered.length} page={current} onPage={setPage} label="resources" />
      </div>
    </>
  )
}

function ResourceActions({ resource, disabled, onResult }: { resource: Row; disabled: boolean; onResult: (result: { ok: boolean; message: string }) => void }) {
  const [pending, start] = useTransition()
  const [removing, setRemoving] = useState(false)
  function run(remove: boolean) {
    setRemoving(remove)
    start(async () => {
      const fd = new FormData(); fd.set('id', resource.id); fd.set('status', resource.status === 'published' ? 'draft' : 'published')
      try { onResult(await (remove ? deleteResource(fd) : setResourceStatus(fd))) }
      catch { onResult({ ok: false, message: 'The resource could not be updated. Please retry.' }) }
    })
  }
  return <>
    <button type="button" className={styles.miniBtn} disabled={disabled || pending || (resource.status === 'draft' && !resource.file_path)} title={resource.status === 'draft' && !resource.file_path ? 'Attach a PDF in the editor before publishing.' : undefined} onClick={() => run(false)}>{pending && !removing ? 'Updating…' : resource.status === 'published' ? 'Unpublish' : 'Publish'}</button>
    <ConfirmButton onConfirm={() => run(true)} disabled={disabled || pending} pending={pending && removing} confirmLabel="Delete resource" className={styles.miniDanger}>Delete</ConfirmButton>
  </>
}

function CopyOne({ url, label }: { url: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { setFailed(true) }
  }
  return <button type="button" className={styles.copyBtn} onClick={copy}>{copied ? 'Copied' : failed ? 'Copy failed; retry' : label}</button>
}

function Editor({ row, stat, srcs, onClose, onSaved, onDirty, onBusy }: { row: Row; stat?: Stat; srcs: Src[]; onClose: () => void; onSaved: () => void; onDirty: (dirty: boolean) => void; onBusy: (busy: boolean) => void }) {
  const [title, setTitle] = useState(row.title)
  const [slug, setSlug] = useState(row.slug)
  const [slugTouched, setSlugTouched] = useState(Boolean(row.slug))
  const [kicker, setKicker] = useState(row.kicker)
  const [coverNo, setCoverNo] = useState(row.cover_no ?? '')
  const [description, setDescription] = useState(row.description)
  const [bullets, setBullets] = useState(row.bullets.join('\n'))
  const [featured, setFeatured] = useState(row.featured)
  const [status, setStatus] = useState<'draft' | 'published'>(row.status)
  const [filePath, setFilePath] = useState(row.file_path)
  const [fileName, setFileName] = useState(row.file_name)
  const [fileSize, setFileSize] = useState(row.file_size)
  const [uploading, setUploading] = useState(false)
  const [pending, setPending] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const effectiveSlug = slug || slugify(title)

  const fingerprint = JSON.stringify([title, slug, kicker, coverNo, description, bullets, featured, status, filePath, fileName, fileSize])
  const initialFingerprint = useRef(fingerprint)
  useEffect(() => { onDirty(fingerprint !== initialFingerprint.current) }, [fingerprint, onDirty])
  useEffect(() => { onBusy(pending || uploading); return () => onBusy(false) }, [pending, uploading, onBusy])

  async function onPickFile(file: File) {
    if (file.type !== 'application/pdf') { setMsg({ ok: false, text: 'Upload a PDF.' }); return }
    if (file.size > MAX_PDF_BYTES) { setMsg({ ok: false, text: 'PDF must be under 50 MB.' }); return }
    setUploading(true); setMsg(null)
    try {
      // 1) mint a signed upload URL (tiny request, just metadata)
      const fd = new FormData()
      fd.set('name', file.name); fd.set('type', file.type); fd.set('size', String(file.size))
      const ticket = await createResourceUploadUrl(fd)
      if (!ticket.ok || !ticket.path || !ticket.token) { setMsg({ ok: false, text: ticket.message ?? 'Upload failed.' }); return }
      // 2) upload the bytes DIRECTLY to storage (bypasses Vercel's body limit)
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.storage.from('resources').uploadToSignedUrl(ticket.path, ticket.token, file, {
        contentType: 'application/pdf',
      })
      if (error) { setMsg({ ok: false, text: 'Upload failed, try again.' }); return }
      setFilePath(ticket.path); setFileName(ticket.name ?? file.name); setFileSize(file.size)
    } catch { setMsg({ ok: false, text: 'Upload failed.' }) }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = '' }
  }

  async function submit() {
    if (!title.trim()) { setMsg({ ok: false, text: 'Title is required.' }); return }
    if (status === 'published' && !filePath) { setMsg({ ok: false, text: 'Attach a PDF before publishing.' }); return }
    setPending(true); setMsg(null)
    const fd = new FormData()
    if (row.id) fd.set('id', row.id)
    fd.set('title', title); fd.set('slug', effectiveSlug); fd.set('kicker', kicker); fd.set('cover_no', coverNo)
    fd.set('description', description); fd.set('bullets', bullets)
    if (filePath) fd.set('file_path', filePath)
    if (fileName) fd.set('file_name', fileName)
    if (fileSize) fd.set('file_size', String(fileSize))
    fd.set('featured', featured ? 'true' : 'false')
    fd.set('status', status); fd.set('sort_order', String(row.sort_order))
    try {
      const res = await saveResource(fd)
      setMsg({ ok: res.ok, text: res.message })
      if (res.ok) onSaved()
    } catch { setMsg({ ok: false, text: 'Something went wrong.' }) }
    finally { setPending(false) }
  }

  return (
    <div className={ui.card}>
      <div className={styles.editorHead}>
        <h2 className={styles.editorTitle}>{row.id ? 'Edit resource' : 'New resource'}</h2>
        <button type="button" className={styles.miniBtn} disabled={pending || uploading} onClick={onClose}>Close</button>
      </div>
      {row.id && row.status === 'published' && <AnalyticsPanel slug={effectiveSlug} stat={stat} srcs={srcs} />}
      <fieldset disabled={pending || uploading} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Title</span>
          <input className={styles.input} value={title} onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)) }} placeholder="The Defensible Layoff Playbook" />
        </label>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span className={styles.label}>Slug</span>
            <input className={styles.input} value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }} placeholder="defensible-layoff-playbook" />
            <span className={styles.hint}>/resources/{effectiveSlug || '…'}</span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Kicker</span>
            <input className={styles.input} value={kicker} onChange={(e) => setKicker(e.target.value)} placeholder="Playbook" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Cover №</span>
            <input className={styles.input} value={coverNo} onChange={(e) => setCoverNo(e.target.value)} placeholder="02" />
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="One or two sentences on what's inside." />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Key points <span className={styles.hint}>(one per line, max 8)</span></span>
          <textarea className={styles.textarea} value={bullets} onChange={(e) => setBullets(e.target.value)} rows={4} placeholder={'State-by-state notice rules\nWARN Act thresholds\nManager + employee scripts'} />
        </label>

        <div className={styles.field}>
          <span className={styles.label}>PDF</span>
          <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={(e) => e.target.files?.[0] && onPickFile(e.target.files[0])} />
          <div className={styles.fileRow}>
            <button type="button" className={styles.miniBtn} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading…' : filePath ? 'Replace PDF' : 'Upload PDF'}
            </button>
            {fileName ? <span className={styles.fileName}>{fileName}{fileSize ? ` · ${(fileSize / 1024 / 1024).toFixed(1)} MB` : ''}</span> : <span className={styles.hint}>Required to publish</span>}
          </div>
        </div>

        <div className={styles.row2}>
          <label className={styles.checkField}>
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <span>Featured (listed first on the site)</span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Status</span>
            <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        {msg && <div role={msg.ok ? 'status' : 'alert'} className={msg.ok ? styles.okMsg : styles.errMsg}>{msg.text}</div>}
        <div className={styles.actions}>
          <button type="button" className={ui.btnGhost} disabled={pending || uploading} onClick={onClose}>Cancel</button>
          <button type="button" className={ui.btnPrimary} onClick={submit} disabled={pending || uploading}>
            {pending ? 'Saving…' : row.id ? 'Save' : 'Create'}
          </button>
        </div>
      </fieldset>
    </div>
  )
}

// Per-resource traffic + sharing. One unified link; the page tracker attributes
// most sources automatically. The pre-tagged links exist only for in-app
// browsers (Instagram/TikTok/Threads) that strip the referrer.
function AnalyticsPanel({ slug, stat, srcs }: { slug: string; stat?: Stat; srcs: Src[] }) {
  const url = `${SITE}/resources/${slug}`
  const totalSrc = srcs.reduce((n, s) => n + s.views, 0)
  const conv = stat && stat.views ? Math.round((stat.downloads / stat.views) * 100) : 0
  return (
    <div className={styles.analytics}>
      <div className={styles.statRow}>
        <Metric label="Views" value={stat?.views ?? 0} />
        <Metric label="Visitors" value={stat?.visitors ?? 0} />
        <Metric label="Downloads" value={stat?.downloads ?? 0} />
        <Metric label="Conversion" value={`${conv}%`} />
      </div>

      {srcs.length > 0 && (
        <div className={styles.srcBlock}>
          <span className={styles.srcTitle}>Where traffic came from</span>
          <div className={styles.srcBars}>
            {srcs.map((s) => (
              <div key={s.source} className={styles.srcRow}>
                <span className={styles.srcName}>{s.source}</span>
                <span className={styles.srcTrack}><span className={styles.srcFill} style={{ width: `${totalSrc ? Math.max(6, (s.views / totalSrc) * 100) : 0}%` }} /></span>
                <span className={styles.srcCount}>{s.views}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.srcBlock}>
        <span className={styles.srcTitle}>Share, one link, auto-tracked</span>
        <div className={styles.shareLinks}>
          <CopyOne url={url} label="Copy unified link" />
          {SHARE_PLATFORMS.map((p) => (
            <CopyOne key={p} url={`${url}?utm_source=${p}`} label={p} />
          ))}
        </div>
        <p className={styles.shareHint}>Share the unified link anywhere; referral sources are detected automatically. Use a tagged link only for Instagram / TikTok / Threads, whose apps hide the referrer.</p>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  )
}
