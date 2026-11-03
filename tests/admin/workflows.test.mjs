import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { readAdminRows } from '../../src/lib/admin-rows.ts'
import { publishingError } from '../../src/lib/admin-publishing.ts'
import { safeAdminNext } from '../../src/lib/admin-auth-redirect.ts'
import { csvCell, filterLeads } from '../../src/lib/admin-lead-filters.ts'
import * as crmTypes from '../../src/lib/crm-types.ts'
import { isoDateOrNull } from '../../src/lib/crm-types.ts'

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
  for (const path of ['/admin', '/admin/blog/123', '/admin/crm?kind=investor']) assert.equal(safeAdminNext(path), path)
  for (const path of ['https://example.test', '//example.test/admin', '/administrator', '/admin\\evil', '/admin\r\nLocation:bad', undefined]) assert.equal(safeAdminNext(path), '/admin')
})
test('lead filtering used for the list and export combines source with case-insensitive company/name/email/detail search', () => {
  const leads = [
    { source: 'waitlist', name: 'Alex Sample', email: 'alex@example.test', company: 'Example Labs', detail: null },
    { source: 'demo', name: null, email: 'demo@example.test', company: 'Example Labs', detail: 'Referral' },
    { source: 'partner', name: 'Morgan', email: 'morgan@example.test', company: null, detail: null },
  ]
  assert.equal(filterLeads(leads, 'all', ' EXAMPLE LABS ').length, 2)
  assert.equal(filterLeads(leads, 'demo', 'example').length, 1)
  assert.equal(filterLeads(leads, 'all', 'referral')[0].source, 'demo')
  assert.equal(filterLeads(leads, 'waitlist', 'Morgan').length, 0)
  assert.equal(filterLeads(leads, 'all', '').length, 3)
})
test('CSV exports quote commas, quotes and newlines, and neutralize spreadsheet formulas', () => {
  assert.equal(csvCell('A, "B"\nC'), '"A, ""B""\nC"')
  for (const value of ['=HYPERLINK("bad")', '+SUM(A1)', '-2+3', '@cmd', '\t=cmd']) assert.ok(csvCell(value).startsWith('"\''))
  assert.equal(csvCell(null), '""')
})
test('calendar validation rejects rolled-over dates while accepting leap days', () => {
  assert.equal(isoDateOrNull('2026-02-31'), null)
  assert.equal(isoDateOrNull('2026-02-29'), null)
  assert.equal(isoDateOrNull('2028-02-29'), '2028-02-29')
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
test('contact saves apply the expected version in the database update and report concurrent edits', async () => {
  const { db, calls } = dbStub([{ data: { kind: 'customer', stage: 'lead', owner: 'preview@example.test', updated_at: 'version-1' }, error: null }, { data: null, error: null }])
  const actions = loadAction('../../src/app/admin/(panel)/crm/actions.ts', {
    'next/cache': cacheStub(), '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/crm': { isValidStage: () => true, parseMoney: () => null, isoDateOrNull, ACTIVITY_KINDS: [] },
  })
  const form = new FormData(); form.set('id', 'contact-id'); form.set('name', 'Sample'); form.set('stage', 'lead'); form.set('expected_updated_at', 'version-1')
  const result = await actions.updateContact(form)
  assert.equal(result.ok, false); assert.match(result.message, /changed/)
  assert.ok(calls[1].some((op) => op.eq?.[0] === 'updated_at' && op.eq[1] === 'version-1'))
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

const { needsAttention, filterContacts } = loadAction('../../src/lib/admin-contact-filters.ts', { './crm-types': crmTypes })
test('follow-up attention excludes closed contacts and treats today as due, not overdue; exports use the same combined filters', () => {
  const base = { name: 'Alex', company: 'Example', email: 'alex@example.test', tags: [], stage: 'lead', kind: 'customer', owner: null, next_step: null, next_step_due: '2026-11-02' }
  assert.equal(needsAttention(base, 'overdue', '2026-11-03'), true)
  assert.equal(needsAttention({ ...base, next_step_due: '2026-11-03' }, 'overdue', '2026-11-03'), false)
  assert.equal(needsAttention({ ...base, stage: 'won' }, 'unassigned', '2026-11-03'), false)
  assert.equal(needsAttention({ ...base, owner: '  ' }, 'unassigned', '2026-11-03'), true)
  assert.equal(filterContacts([base, { ...base, kind: 'investor' }, { ...base, owner: 'Owner' }], { kind: 'customer', owner: 'all', open: true, q: ' EXAMPLE ', attention: 'unassigned' }, '2026-11-03').length, 1)
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

test('contact deletion reports a database failure rather than returning a false success', async () => {
  const { db } = dbStub([{ data: null, error: { message: 'offline' } }])
  const actions = loadAction('../../src/app/admin/(panel)/crm/actions.ts', {
    'next/cache': cacheStub(), '@/lib/auth': { requireAdmin: async () => ({ email: 'preview@example.test' }) }, '@/lib/supabase/server': { createSupabaseServerClient: async () => db }, '@/lib/crm': {},
  })
  const form = new FormData(); form.set('id', 'sample-id')
  const result = await actions.deleteContact(form)
  assert.equal(result.ok, false); assert.match(result.message, /could not be deleted/)
})
