import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { readAdminRows } from '../../src/lib/admin-rows.ts'
import { publishingError } from '../../src/lib/admin-publishing.ts'
import { safeAdminNext } from '../../src/lib/admin-auth-redirect.ts'

const now = Date.parse('2026-11-03T12:00:00Z')
test('publishing requires saved content and a future schedule; unpublishing remains available', () => {
  assert.match(publishingError('published', null, 'Untitled post', '<p>Text</p>', now), /title/)
  assert.match(publishingError('published', null, 'Title', '<p>&nbsp;</p>', now), /content/)
  assert.match(publishingError('scheduled', 'not a date', 'Title', '<p>Text</p>', now), /future/)
  assert.match(publishingError('scheduled', '2026-11-02', 'Title', '<p>Text</p>', now), /future/)
  assert.equal(publishingError('scheduled', '2026-11-04T12:00:00Z', 'Title', '<p>Text</p>', now), null)
  assert.equal(publishingError('published', null, 'Title', '<img src="/image.png">', now), null)
  assert.equal(publishingError('draft', null, '', '', now), null)
  assert.match(publishingError('unknown', null, 'Title', '<p>Text</p>', now), /status/)
})
test('admin return paths retain nested destinations and reject lookalikes or external URLs', () => {
  for (const path of ['/admin', '/admin/blog/123', '/admin/blog?status=draft']) assert.equal(safeAdminNext(path), path)
  for (const path of ['https://example.test', '//example.test/admin', '/administrator', '/admin\\evil', '/admin\r\nLocation:bad', undefined]) assert.equal(safeAdminNext(path), '/admin')
})
test('admin reads continue past the API row cap and preserve a partial result on a later failure', async () => {
  const rows = Array.from({ length: 1204 }, (_, id) => ({ id }))
  let calls = 0
  const result = await readAdminRows(async (from, to) => { calls++; return { data: rows.slice(from, to + 1), error: null } })
  assert.equal(calls, 3); assert.equal(result.rows.length, 1204); assert.equal(result.truncated, false)
  const partial = await readAdminRows(async (from, to) => from ? { data: null, error: { message: 'offline' } } : { data: rows.slice(from, to + 1), error: null })
  assert.equal(partial.rows.length, 500); assert.equal(partial.error, 'offline')
})
test('a list at the safety boundary is complete; a larger list is visibly marked incomplete', async () => {
  const rows = Array.from({ length: 501 }, (_, id) => ({ id }))
  const read = (all) => async (from, to) => ({ data: all.slice(from, to + 1), error: null })
  assert.equal((await readAdminRows(read(rows.slice(0, 500)), 500)).truncated, false)
  assert.equal((await readAdminRows(read(rows), 500)).truncated, true)
})

// Exercise the actual server action with stubbed external services. This avoids
// sending emails, publishing posts or changing any live records during tests.
function loadAction(relative, modules) {
  const filename = fileURLToPath(new URL(relative, import.meta.url))
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText
  const actionModule = { exports: {} }
  new Function('require', 'module', 'exports', code)((name) => {
    if (!(name in modules)) throw new Error(`Unexpected import: ${name}`)
    return modules[name]
  }, actionModule, actionModule.exports)
  return actionModule.exports
}
function dbStub(results) {
  const calls = []
  let read = 0
  return { calls, db: { from(table) { const ops = [{ table }]; const result = results[read++] ?? { data: null, error: null }; const builder = new Proxy({}, { get(_target, key) {
    if (key === 'then') return (resolve, reject) => Promise.resolve(result).then(resolve, reject)
    return (...args) => { ops.push({ [key]: args }); return builder }
  } }); calls.push(ops); return builder } } }
}
function cacheStub() { return { revalidatePath() {}, updateTag() {} } }
test('the publishing action rejects a past schedule before issuing an update', async () => {
  const { db, calls } = dbStub([{ data: { slug: 'sample', published_at: null, title: 'Sample', body_html: '<p>Saved content</p>' }, error: null }])
  const actions = loadAction('../../src/app/admin/(panel)/blog/actions.ts', {
    'next/cache': cacheStub(), 'next/navigation': { redirect() {} }, '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/blog': {}, '@/lib/blog-images': {}, '@/lib/admin-publishing': { publishingError },
  })
  const result = await actions.setPostStatus('post-id', 'scheduled', '2000-01-01')
  assert.equal(result.ok, false); assert.match(result.error, /future/)
  assert.equal(calls.length, 1)
})
test('a missing post during publish is reported as failure rather than a successful status change', async () => {
  const { db } = dbStub([{ data: { slug: 'sample', published_at: null, title: 'Sample', body_html: '<p>Saved content</p>' }, error: null }, { data: null, error: null }])
  const actions = loadAction('../../src/app/admin/(panel)/blog/actions.ts', {
    'next/cache': cacheStub(), 'next/navigation': { redirect() {} }, '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/blog': {}, '@/lib/blog-images': {}, '@/lib/admin-publishing': { publishingError },
  })
  const result = await actions.setPostStatus('post-id', 'published', null)
  assert.equal(result.ok, false); assert.match(result.error, /no longer exists/)
})
test('blog overview and editor totals use the same all-time, bot-filtered tracker', async () => {
  const allTime = [{ path: '/blog/one', views: 12, readers: 8, avg_dwell_ms: 30000, completed: 3 }, { path: '/blog/two', views: 8, readers: 6, avg_dwell_ms: 20000, completed: 2 }]
  const db = { rpc: async (name, args) => ({ error: null, data: name === 'blog_stats' ? args.p_since.startsWith('1970') ? allTime : [{ path: '/blog/one', views: 2 }] : [] }) }
  const analytics = loadAction('../../src/lib/blog-analytics.ts', {
    'server-only': {}, react: { cache: (fn) => fn }, 'next/cache': { unstable_cache: (fn) => fn }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/supabase/service': { serviceDb: () => null }, '@/lib/blog-analytics-types': {},
  })
  const summary = await analytics.getBlogReadSummary()
  assert.equal(summary.total, 20); assert.equal(summary.last7d, 2)
  assert.equal((await analytics.getBlogPostAnalytics('one')).views, 12)
  assert.equal((await analytics.getBlogStatsBySlug()).get('two').views, 8)
})
test('saving a deleted or inaccessible post reports failure without creating a false revision', async () => {
  const { db, calls } = dbStub([{ data: [], error: null }, { data: null, error: null }])
  const actions = loadAction('../../src/app/admin/(panel)/blog/actions.ts', {
    'next/cache': cacheStub(), 'next/navigation': { redirect() {} }, '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/blog': { sanitizePostHtml: (html) => html, slugify: (value) => value, readingTimeMinutes: () => 1 }, '@/lib/blog-images': {}, '@/lib/admin-publishing': { publishingError },
  })
  const result = await actions.savePost({ id: 'removed', title: 'Sample', slug: 'sample', excerpt: '', authorName: 'Sample', bodyHtml: '<p>Content</p>', tags: [] })
  assert.equal(result.ok, false); assert.match(result.error, /no longer exists/)
  assert.equal(calls.length, 2)
})


test('responsive modal closes on desktop resize, route change and unmount so it cannot leave the document inert', () => {
  const effects = []
  const media = { matches: false, addEventListener(event, fn) { this.listener = fn }, removeEventListener(event, fn) { assert.equal(fn, this.listener); this.listener = null } }
  const previousWindow = globalThis.window
  globalThis.window = { matchMedia(query) { assert.equal(query, '(min-width: 881px)'); return media } }
  const { useDialogLifecycle } = loadAction('../../src/app/admin/(panel)/_components/use-dialog-lifecycle.ts', { react: { useEffect: (effect) => effects.push(effect) } })
  let closes = 0
  const ref = { current: { close() { closes++ } } }
  try {
    useDialogLifecycle(ref, '/admin/blog', '(min-width: 881px)')
    effects[0](); assert.equal(closes, 1)
    const cleanup = effects[1](); assert.equal(closes, 1)
    media.matches = true; media.listener(); assert.equal(closes, 2)
    media.matches = false; media.listener(); assert.equal(closes, 2)
    effects[0](); assert.equal(closes, 3)
    cleanup(); assert.equal(closes, 4); assert.equal(media.listener, null)
  } finally { globalThis.window = previousWindow }
})
test('page-search Enter cancels the native default before closing and navigating, preventing focus restoration from reopening it', () => {
  const calls = []
  let refCount = 0
  const jsx = (type, props) => ({ type, props })
  const component = loadAction('../../src/app/admin/(panel)/_components/workspace-bar.tsx', {
    react: { useEffect() {}, useRef: () => ({ current: refCount++ === 0 ? { close: () => calls.push('close') } : null }), useState: (value) => [value, () => {}], useTransition: () => [false, () => {}] },
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' }, 'next/link': { default: 'a' }, 'next/navigation': { usePathname: () => '/admin', useRouter: () => ({ push: (href) => calls.push(href) }) },
    './icon': { default: 'svg' }, './navigation': { PAGES: [{ href: '/admin/blog', label: 'Blog' }] }, './workspace-bar.module.css': { default: {} }, './use-dialog-lifecycle': { useDialogLifecycle() {} }, '../actions': {},
  }).default
  const tree = component()
  function findInput(node) { if (!node || typeof node !== 'object') return null; if (node.type === 'input') return node; return [node.props?.children].flat(Infinity).map(findInput).find(Boolean) }
  const input = findInput(tree); assert.ok(input)
  input.props.onKeyDown({ key: 'Enter', preventDefault: () => calls.push('prevent'), stopPropagation: () => calls.push('stop') })
  assert.deepEqual(calls, ['prevent', 'stop', 'close', '/admin/blog'])
})


test('content overview reads content only and exposes publishing work without CRM dependencies', async () => {
  const { db, calls } = dbStub([
    { data: [{ id: 'p1', slug: 'one', title: 'One', status: 'published' }, { id: 'p2', slug: 'two', title: 'Two', status: 'draft' }, { id: 'p3', slug: 'three', title: 'Three', status: 'scheduled' }], error: null },
    { data: [{ id: 'r1', status: 'published' }, { id: 'r2', status: 'draft' }], error: null },
  ])
  const { getOverview } = loadAction('../../src/lib/admin-analytics.ts', {
    'server-only': {}, 'next/cache': { unstable_cache: (fn) => fn }, '@/lib/supabase/server': {}, '@/lib/supabase/service': { serviceDb: () => db }, '@/lib/admin-rows': { readAdminRows },
    '@/lib/blog-analytics': { getBlogReadSummary: async () => ({ total: 20, last7d: 2, top: [{ slug: 'one', views: 12 }], warnings: [] }) },
    '@/lib/site-analytics': { getSiteAnalytics: async () => ({ totals: { real: 29, pageviews: 42 }, spark: [1, 2], warnings: [] }) },
    '@/lib/admin-seo': { getSeoOverview: async () => ({ warnings: [], posts: [{ status: 'published', noindex: false, hasMetaDescription: false }, { status: 'draft', noindex: false, hasMetaDescription: false }, { status: 'published', noindex: true, hasMetaDescription: false }] }) },
  })
  const result = await getOverview()
  assert.deepEqual(calls.map((ops) => ops[0].table), ['posts', 'resources'])
  assert.equal(result.posts.published, 1); assert.equal(result.posts.draft, 1); assert.equal(result.posts.scheduled, 1)
  assert.deepEqual(result.resources, { published: 1, draft: 1 })
  assert.equal(result.website.visits, 29); assert.equal(result.reads.top[0].title, 'One'); assert.equal(result.missingDescriptions, 1)
})

test('canceling a schedule returns the post to draft and clears its scheduled timestamp', async () => {
  const { db, calls } = dbStub([{ data: { slug: 'sample', published_at: null, title: 'Sample', body_html: '<p>Saved content</p>' }, error: null }, { data: { id: 'post-id' }, error: null }])
  const actions = loadAction('../../src/app/admin/(panel)/blog/actions.ts', {
    'next/cache': cacheStub(), 'next/navigation': { redirect() {} }, '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/blog': {}, '@/lib/blog-images': {}, '@/lib/admin-publishing': { publishingError },
  })
  const result = await actions.setPostStatus('post-id', 'draft', '2026-11-05T10:30:00Z')
  assert.equal(result.ok, true)
  assert.deepEqual(calls[1].find((op) => op.update).update[0], { status: 'draft', scheduled_for: null })
})

const resourceModules = (db) => ({ 'node:crypto': {}, 'next/cache': cacheStub(), '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/service': { serviceDb: () => db } })
const resourceActions = (db) => loadAction('../../src/app/admin/(panel)/resources/actions.ts', resourceModules(db))
const form = (values) => { const fd = new FormData(); for (const [key, value] of Object.entries(values)) fd.set(key, value); return fd }

test('resource status changes report missing rows, invalid statuses and unavailable PDFs without writing', async () => {
  for (const [result, message] of [[{ data: null, error: null }, /no longer exists/], [{ data: null, error: { message: 'offline' } }, /Could not load/], [{ data: { slug: 'sample', file_path: null }, error: null }, /Attach a PDF/]]) {
    const { db, calls } = dbStub([result])
    const response = await resourceActions(db).setResourceStatus(form({ id: 'r1', status: 'published' }))
    assert.equal(response.ok, false); assert.match(response.message, message); assert.equal(calls.length, 1)
  }
  const { db, calls } = dbStub([])
  assert.equal((await resourceActions(db).setResourceStatus(form({ id: 'r1', status: 'unknown' }))).ok, false)
  assert.equal(calls.length, 0)
})
test('resource status writes verify an affected row and revalidate the resource page', async () => {
  const { db, calls } = dbStub([{ data: { slug: 'sample', file_path: 'pdf/one.pdf' }, error: null }, { data: { id: 'r1' }, error: null }])
  const paths = []
  const actions = loadAction('../../src/app/admin/(panel)/resources/actions.ts', { ...resourceModules(db), 'next/cache': { updateTag() {}, revalidatePath: path => paths.push(path) } })
  assert.equal((await actions.setResourceStatus(form({ id: 'r1', status: 'published' }))).ok, true)
  assert.deepEqual(calls[1].find(op => op.not).not, ['file_path', 'is', null])
  assert.ok(calls[1].some(op => op.select)); assert.ok(paths.includes('/resources/sample'))
  const missing = dbStub([{ data: { slug: 'sample', file_path: 'pdf/one.pdf' }, error: null }, { data: null, error: null }])
  assert.equal((await resourceActions(missing.db).setResourceStatus(form({ id: 'r1', status: 'draft' }))).ok, false)
})
test('saving a removed resource keeps the edit unsuccessful rather than silently closing the form', async () => {
  const { db } = dbStub([{ data: null, error: null }])
  const result = await resourceActions(db).saveResource(form({ id: 'gone', title: 'Sample' }))
  assert.equal(result.ok, false); assert.match(result.message, /no longer exists/)
})
test('resource deletion never removes storage before a successful row deletion and preserves shared PDFs', async () => {
  for (const [deleted, refs, expectedRemoved, expectedOk] of [
    [{ data: null, error: { message: 'offline' } }, null, 0, false],
    [{ data: null, error: null }, null, 0, false],
    [{ data: { slug: 'sample', file_path: 'pdf/shared.pdf' }, error: null }, { data: [{ id: 'other' }], error: null }, 0, true],
    [{ data: { slug: 'sample', file_path: 'pdf/shared.pdf' }, error: null }, { data: [], error: null }, 1, true],
    [{ data: { slug: 'sample', file_path: 'pdf/shared.pdf' }, error: null }, { data: null, error: { message: 'offline' } }, 0, true],
  ]) {
    const { db, calls } = dbStub([deleted, refs]); let removed = 0
    db.storage = { from: () => ({ remove: async () => { assert.ok(calls[0].some(op => op.delete)); assert.equal(calls.length, 2); removed++; return { error: null } } }) }
    assert.equal((await resourceActions(db).deleteResource(form({ id: 'r1' }))).ok, expectedOk)
    assert.equal(removed, expectedRemoved)
  }
})
test('field guide revocation reports errors and no-op writes instead of pretending the link was revoked', async () => {
  for (const [result, ok] of [[{ data: null, error: null }, false], [{ data: null, error: { message: 'offline' } }, false], [{ data: { id: 'g1' }, error: null }, true]]) {
    const { db, calls } = dbStub([result])
    const actions = loadAction('../../src/app/admin/(panel)/field-guides/actions.ts', { 'next/cache': cacheStub(), '@/lib/auth': { requireAdmin: async () => ({}) }, '@/lib/supabase/service': { serviceDb: () => db }, '@/lib/admin-field-guides': {} })
    assert.equal((await actions.revokeFieldGuideLink(form({ id: 'g1' }))).ok, ok)
    assert.ok(calls[0].some(op => op.select))
  }
})

const queryHelpers = loadAction('../../src/lib/admin-list-query.ts', {})
test('list URLs survive reload/back and reject malformed state while keeping unrelated parameters', () => {
  const defaults = { q: '', status: 'all', sort: 'updated', page: 1 }
  const url = queryHelpers.patchListQuery('?utm_source=internal&page=8', { q: 'HR & AI', status: 'draft', page: 1 }, defaults)
  const state = queryHelpers.listQuery(new URLSearchParams(url), ['all', 'draft'], ['updated', 'title'])
  assert.deepEqual(state, { query: 'HR & AI', status: 'draft', sort: 'updated', page: 1 })
  assert.equal(new URLSearchParams(url).get('utm_source'), 'internal'); assert.equal(new URLSearchParams(url).has('page'), false)
  for (const page of ['-2', '0', '1.5', 'Infinity', 'bad']) assert.equal(queryHelpers.listQuery(new URLSearchParams(`status=invalid&sort=invalid&page=${page}`), ['all'], ['updated']).page, 1)
  assert.equal(queryHelpers.listQuery(new URLSearchParams({ q: 'x'.repeat(500) }), ['all'], ['updated']).query.length, 200)
})
test('list controls update URL state without fetching or losing the hash, and restore changed search parameters', () => {
  const previousWindow = globalThis.window
  let href = '/admin/blog?status=draft#articles'
  globalThis.window = { location: { pathname: '/admin/blog', search: '?status=draft', hash: '#articles' }, history: { replaceState(_state, _title, next) { href = next; globalThis.window.location.search = new URL(next, 'https://example.test').search } } }
  try {
    const { useListQuery } = loadAction('../../src/app/admin/(panel)/_components/use-list-query.ts', { 'next/navigation': { useSearchParams: () => new URLSearchParams(globalThis.window.location.search) }, '@/lib/admin-list-query': queryHelpers })
    const first = useListQuery(['all', 'draft'], ['updated', 'title'])
    first.setQuery('benefits'); first.setSort('title'); first.setPage(2)
    assert.equal(href, '/admin/blog?status=draft&q=benefits&sort=title&page=2#articles')
    assert.equal(useListQuery(['all', 'draft'], ['updated', 'title']).page, 2)
    globalThis.window.location.search = '?q=old&status=draft'
    assert.equal(useListQuery(['all', 'draft'], ['updated', 'title']).query, 'old')
    useListQuery(['all', 'draft'], ['updated', 'title']).clear()
    assert.equal(href, '/admin/blog#articles')
  } finally { globalThis.window = previousWindow }
})
function findNode(node, predicate) {
  if (!node || typeof node !== 'object') return null
  if (predicate(node)) return node
  return [node.props?.children].flat(Infinity).map(child => findNode(child, predicate)).find(Boolean)
}
test('the real Preview button saves first and never navigates on a failed save', async () => {
  for (const succeeds of [false, true]) {
    const calls = []; const jsx = (type, props) => ({ type, props })
    const Editor = loadAction('../../src/app/admin/(panel)/blog/[id]/editor.tsx', {
      react: { useEffect() {}, useRef: current => ({ current }), useState: value => [value, () => {}], useTransition: () => [false, () => {}], useId: () => 'test', useCallback: fn => fn },
      'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' }, 'next/dynamic': { default: () => 'dynamic' }, 'next/link': { default: 'a' }, 'next/navigation': { useRouter: () => ({ push: href => calls.push(href) }), useSearchParams: () => new URLSearchParams('returnTo=%2Fadmin%2Fblog%3Fstatus%3Ddraft') }, '@/lib/admin-auth-redirect': { safeAdminNext },
      '@/lib/blog-types': { slugify: value => value, TAG_OPTIONS: [] }, '../actions': { savePost: async () => { calls.push('save'); return succeeds ? { ok: true, slug: 'sample' } : { ok: false, error: 'offline' } } }, './upload': {}, './post-analytics': {}, '../../_components/confirm-button': {}, './editor.module.css': { default: {} }, '../../_components/icon': {},
    }).default
    const tree = Editor({ post: { id: 'p1', title: 'Sample', slug: 'sample', tags: [], body_html: '<p>Content</p>', status: 'draft', excerpt: '', author_name: 'QA', noindex: false }, analytics: {} })
    const preview = findNode(tree, node => node.type === 'button' && node.props.children === 'Preview')
    assert.ok(preview); await preview.props.onClick()
    assert.deepEqual(calls, succeeds ? ['save', '/admin/blog/p1/preview?returnTo=%2Fadmin%2Fblog%3Fstatus%3Ddraft'] : ['save'])
  }
})

test('resource Close and New protect dirty edits; Keep editing preserves them and Discard follows the chosen action', () => {
  const slots = []; let cursor = 0
  const useState = initial => { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next }] }
  const jsx = (type, props) => ({ type, props })
  const Manager = loadAction('../../src/app/admin/(panel)/resources/manager.tsx', {
    react: { useState, useRef: current => { const [ref] = useState(() => ({ current })); return ref }, useMemo: fn => fn(), useEffect() {}, useTransition: () => [false, () => {}] },
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' }, 'next/navigation': { useRouter: () => ({ push() {} }) }, '../_components/use-list-query': { useListQuery: () => ({ query: '', status: 'all', sort: 'order', page: 1 }) },
    './actions': {}, '@/lib/supabase/browser': {}, '../_components/confirm-button': {}, '../admin-ui.module.css': { default: {} }, '../_components/icon': {}, '../_components/pagination': { PAGE_SIZE: 25 }, './resources.module.css': { default: {} },
  }).default
  const render = () => { cursor = 0; return Manager({ resources: [], stats: {}, sources: {} }) }
  const button = (tree, text) => findNode(tree, node => node.type === 'button' && node.props.children === text)
  let tree = render(); button(tree, '+ New resource').props.onClick(); tree = render()
  const editor = () => findNode(tree, node => typeof node.type === 'function' && node.type.name === 'Editor')
  assert.ok(editor()); editor().props.onDirty(true); tree = render(); editor().props.onClose(); tree = render()
  assert.ok(button(tree, 'Keep editing')); assert.ok(editor())
  button(tree, 'Keep editing').props.onClick(); tree = render(); assert.ok(editor()); assert.equal(button(tree, 'Discard changes'), undefined)
  editor().props.onClose(); tree = render(); button(tree, 'Discard changes').props.onClick(); tree = render(); assert.equal(editor(), undefined)
  button(tree, '+ New resource').props.onClick(); tree = render(); editor().props.onDirty(true); tree = render()
  button(tree, '+ New resource').props.onClick(); tree = render(); assert.ok(button(tree, 'Discard changes')); assert.ok(editor())
})
test('the private preview checks admin access before querying drafts and renders only saved sanitized content', async () => {
  let reads = 0; let allowed = false
  const jsx = (type, props) => ({ type, props })
  const Preview = loadAction('../../src/app/admin/(panel)/blog/[id]/preview/page.tsx', {
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' }, 'next/link': { default: 'a' }, 'next/image': { default: 'img' }, 'next/navigation': { notFound: () => { throw new Error('not found') } },
    '@/lib/admin-auth-redirect': { safeAdminNext }, '@/lib/auth': { requireAdmin: async () => { if (!allowed) throw new Error('login required') } },
    '@/lib/supabase/server': { createSupabaseServerClient: async () => { reads++; return dbStub([{ data: { id: 'p1', title: 'Saved title', status: 'draft', updated_at: '2026-11-03T12:00:00Z', body_html: '<p>Saved body</p><script>bad()</script>', tags: [] }, error: null }]).db } },
    '@/lib/blog': { sanitizePostHtml: html => html.replace(/<script>.*?<\/script>/g, '') }, '@/app/blog/[slug]/post.module.css': { default: {} }, '../../../admin-ui.module.css': { default: {} }, './preview.module.css': { default: {} },
  }).default
  await assert.rejects(Preview({ params: Promise.resolve({ id: 'p1' }), searchParams: Promise.resolve({}) }), /login required/); assert.equal(reads, 0)
  allowed = true
  const tree = await Preview({ params: Promise.resolve({ id: 'p1' }), searchParams: Promise.resolve({}) })
  const article = findNode(tree, node => node.type === 'article')
  assert.equal(article.props.dangerouslySetInnerHTML.__html, '<p>Saved body</p>'); assert.equal(reads, 1)
})
test('a previously armed confirmation cannot remain actionable after its control becomes disabled', () => {
  let fires = 0
  const jsx = (type, props) => ({ type, props })
  const { ConfirmButton } = loadAction('../../src/app/admin/(panel)/_components/confirm-button.tsx', { react: { useState: () => [true, () => {}], useRef: () => ({ current: null }), useEffect() {} }, 'react/jsx-runtime': { jsx, jsxs: jsx }, './confirm-button.module.css': { default: {} } })
  const tree = ConfirmButton({ onConfirm: () => fires++, disabled: true, children: 'Delete' })
  assert.equal(tree.type, 'button'); assert.equal(tree.props.disabled, true); assert.equal(tree.props.children, 'Delete'); assert.equal(fires, 0)
})
