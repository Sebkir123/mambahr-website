// Design check for /early-access, the pass page and /partners: every page and
// state at 1440, 1280, 820 and 390 wide. Fails on sideways scroll, clipped
// content, overlapping stage cards, text under 12px, WCAG AA contrast on solid
// backgrounds, controls under 44px tall, and console errors. Writes a full-page
// screenshot per case; look at them, a pass here is not a design review.
//
//   node scripts/design-check-early-access.cjs <out-dir> [rows.json]
//
// Needs the dev server on :3077 (`npx next dev -p 3077`, with the service-role
// key in .env.local) and Playwright (PLAYWRIGHT_PATH or a resolvable
// `playwright`). rows.json maps three test emails to {pass_token,
// referral_code}: dana@northwind-trading.com (company), ea.render.test@gmail.com
// (personal inbox), ops@longname-test.com (long name; the Workday case saves it).
// Delete those rows from public.waitlist afterwards.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('fs');
const OUT = process.argv[2], B = 'http://localhost:3077';
const rows = JSON.parse(fs.readFileSync(process.argv[3] || '/tmp/claude-ea-rows.json', 'utf8'));
fs.mkdirSync(`${OUT}/shots`, { recursive: true });
const WIDTHS = [1440, 1280, 820, 390];

// Runs in the page. Returns a list of problems.
function audit() {
  const out = [];
  const vw = window.innerWidth;
  if (document.documentElement.scrollWidth > vw + 1) out.push(`page scrolls sideways: ${document.documentElement.scrollWidth} > ${vw}`);
  const main = document.querySelector('main');
  if (!main) return out;
  // Screen-reader-only text (1px, clipped on purpose) is not visual content.
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0 && cs.clip === 'auto'; };
  const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const name = (el) => (el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').map((c) => c.split('__')[1] || c).join('.') : '') + ` "${(el.textContent || '').trim().slice(0, 30)}"`);
  const content = [...main.querySelectorAll('*')].filter((el) => visible(el) && !el.closest('[aria-hidden="true"]') && (hasText(el) || ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IMG', 'A'].includes(el.tagName) || el.getAttribute('role') === 'img'));
  for (const el of content) {
    const r = el.getBoundingClientRect();
    // clipped by an ancestor that hides overflow
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflow !== 'visible' || cs.overflowX !== 'visible') {
        const ar = a.getBoundingClientRect();
        if (r.left < ar.left - 1 || r.right > ar.right + 1) out.push(`clipped sideways: ${name(el)} by ${name(a)}`);
        break;
      }
    }
    // text cut inside its own box (ellipsis share links are intended)
    if (hasText(el) && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible' && getComputedStyle(el).textOverflow !== 'ellipsis') out.push(`text cut: ${name(el)}`);
    if (hasText(el) && parseFloat(getComputedStyle(el).fontSize) < 12) out.push(`tiny text ${getComputedStyle(el).fontSize}: ${name(el)}`);
  }
  // WCAG AA contrast on solid backgrounds (text on gradients is checked by eye)
  const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const mix = (top, bottom) => { const a = top[3] ?? 1; return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)); };
  function background(el) {
    const layers = [];
    for (let a = el; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/url\(/.test(cs.backgroundImage)) return null; // gradient
      const c = rgb(cs.backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0)) { layers.push(c); if (c[3] === undefined || c[3] === 1) break; }
      if (a.className && typeof a.className === 'string' && /field|glass/.test(a.className)) return null;
    }
    let base = [254, 253, 250];
    for (let i = layers.length - 1; i >= 0; i--) base = mix(layers[i], base);
    return base;
  }
  for (const el of content) {
    if (!hasText(el)) continue;
    const cs = getComputedStyle(el);
    const bg = background(el);
    if (!bg) continue;
    const fg = mix(rgb(cs.color), bg);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 600;
    const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
    if (el.tagName === 'INPUT' || el.closest('[disabled]')) continue;
    if (ratio < need) out.push(`contrast ${ratio.toFixed(2)} < ${need}: ${name(el)}`);
  }
  // touch targets: every control at least 44px tall
  main.querySelectorAll('button, a.btn, input:not([type=radio]):not([type=checkbox]), select, textarea, label:has(> input[type=radio]), label:has(> input[type=checkbox]), a[class*="btn"]').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if (r.height < 43.5) out.push(`target ${Math.round(r.height)}px tall: ${name(el)}`);
  });
  // stage cards must not collide with each other
  document.querySelectorAll('[class*="stage"]').forEach((stage) => {
    const kids = [...stage.children].filter((k) => !/field/.test(k.className) && visible(k));
    for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) {
      const a = kids[i].getBoundingClientRect(), b = kids[j].getBoundingClientRect();
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ix > 2 && iy > 2) out.push(`stage cards overlap: ${name(kids[i])} / ${name(kids[j])}`);
      const sr = stage.getBoundingClientRect();
      if (b.left < sr.left - 1 || b.right > sr.right + 1) out.push(`stage card outside stage: ${name(kids[j])}`);
    }
  });
  return [...new Set(out)];
}

const CASES = [
  { id: 'landing', url: '/early-access' },
  { id: 'landing-typed', url: '/early-access', act: async (p) => { await p.fill('#ea-email', 'dana@northwind-trading.com'); } },
  { id: 'landing-referred', url: `/r/${rows['dana@northwind-trading.com'].referral_code}` },
  { id: 'landing-error', url: '/early-access', act: async (p) => { await p.fill('#ea-email', 'not-an-email'); await p.click('button[type=submit]'); } },
  { id: 'pass-company', url: `/early-access/pass/${rows['dana@northwind-trading.com'].pass_token}?welcome=1` },
  { id: 'pass-gmail', url: `/early-access/pass/${rows['ea.render.test@gmail.com'].pass_token}` },
  { id: 'pass-longname', url: `/early-access/pass/${rows['ops@longname-test.com'].pass_token}` },
  { id: 'pass-saved-workday', url: `/early-access/pass/${rows['ops@longname-test.com'].pass_token}`, act: async (p) => {
      const edit = p.getByRole('button', { name: 'Edit' });
      if (await edit.count()) await edit.click();
      await p.locator('label', { hasText: '75 to 150' }).first().click();
      await p.selectOption('select', 'workday');
      await Promise.all([p.waitForResponse((r) => r.url().endsWith('/api/waitlist/profile')), p.getByRole('button', { name: 'Save' }).click()]);
    } },
  { id: 'partners', url: '/partners' },
  { id: 'partners-form-error', url: '/partners', act: async (p) => { await p.getByRole('button', { name: 'Send application' }).click(); } },
];

(async () => {
  const b = await chromium.launch();
  let failures = 0;
  const report = [];
  for (const w of WIDTHS) {
    for (const c of CASES) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });
      const p = await ctx.newPage();
      const errors = [];
      p.on('console', (m) => { if (m.type() === 'error' && !/turnstile|challenges\.cloudflare|favicon/i.test(m.text())) errors.push(m.text().slice(0, 140)); });
      p.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 140)));
      await p.goto(B + c.url, { waitUntil: 'load' });
      await p.waitForTimeout(2200); // entrance animations settle
      if (c.act) { await c.act(p); await p.waitForTimeout(500); }
      const problems = [...(await p.evaluate(audit)), ...errors.map((e) => 'console: ' + e)];
      await p.screenshot({ path: `${OUT}/shots/${c.id}-${w}.png`, fullPage: true });
      report.push(`${problems.length ? 'FAIL' : 'ok  '} ${c.id} @${w}${problems.length ? '\n      - ' + problems.join('\n      - ') : ''}`);
      failures += problems.length ? 1 : 0;
      await ctx.close();
    }
  }
  console.log(report.join('\n'));
  console.log(`\n${failures} failing case(s) of ${WIDTHS.length * CASES.length}`);
  await b.close();
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error('HARNESS ERROR', e.message); process.exit(2); });
