// Design check for the marketing pages: every route at 1440 and 390 wide
// (add more with WIDTHS=1440,1280,820,390). Fails on sideways scroll, clipped
// content, text under 12px, WCAG AA contrast on solid backgrounds, controls
// under 44px tall, and console errors. Writes a full-page screenshot per case;
// look at them, a pass here is not a design review. Text on a gradient is not
// measured here (the Dusk stops are checked by hand against white).
//
//   BASE=http://localhost:3088 node scripts/design-check-site.cjs <out-dir> [route ...]
//
// Adapted from scripts/design-check-early-access.cjs on site/early-access.
// Needs Playwright (PLAYWRIGHT_PATH or a resolvable `playwright`).
// REDUCED=1 renders with prefers-reduced-motion: reduce (the still frames).
/* eslint-disable @typescript-eslint/no-require-imports -- a plain Node CommonJS tool */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('fs');
const OUT = process.argv[2];
const B = process.env.BASE || 'http://localhost:3088';
const WIDTHS = (process.env.WIDTHS || '1440,390').split(',').map(Number);
const ROUTES = process.argv.slice(3).length ? process.argv.slice(3) : [
  '/', '/product', '/how-it-works', '/today', '/mamba', '/hiring', '/job-portal',
  '/onboarding', '/payroll', '/leave', '/compensation', '/compliance', '/rif',
  '/people', '/documents', '/pricing', '/about', '/careers', '/security', '/demo',
  '/compare', '/compare/rippling', '/guides', '/guides/how-to-hire-your-first-employee',
  '/hr-by-state', '/best-hris-for-startups', '/hr-software-small-business',
  '/ai-hr-software', '/resources/rif-playbook', '/blog', '/terms',
];
fs.mkdirSync(`${OUT}/shots`, { recursive: true });

// Runs in the page. Returns a list of problems.
function audit() {
  const out = [];
  const vw = window.innerWidth;
  if (document.documentElement.scrollWidth > vw + 1) out.push(`page scrolls sideways: ${document.documentElement.scrollWidth} > ${vw}`);
  const main = document.querySelector('main') || document.body;
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0 && cs.clip === 'auto'; };
  const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const name = (el) => (el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter((c) => !c.startsWith('jsx-')).map((c) => c.split('__')[1] || c).join('.') : '') + ` "${(el.textContent || '').trim().slice(0, 30)}"`);
  const content = [...main.querySelectorAll('*')].filter((el) => visible(el) && !el.closest('[aria-hidden="true"]') && (hasText(el) || ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IMG', 'A'].includes(el.tagName) || el.getAttribute('role') === 'img'));
  for (const el of content) {
    const r = el.getBoundingClientRect();
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflow !== 'visible' || cs.overflowX !== 'visible') {
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') break; // a deliberate scroller
        const ar = a.getBoundingClientRect();
        if (r.left < ar.left - 1 || r.right > ar.right + 1) out.push(`clipped sideways: ${name(el)} by ${name(a)}`);
        break;
      }
    }
    if (hasText(el) && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible' && getComputedStyle(el).textOverflow !== 'ellipsis') out.push(`text cut: ${name(el)}`);
    if (hasText(el) && parseFloat(getComputedStyle(el).fontSize) < 12) out.push(`tiny text ${getComputedStyle(el).fontSize}: ${name(el)}`);
  }
  const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const mix = (top, bottom) => { const a = top[3] ?? 1; return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)); };
  const pageBg = rgb(getComputedStyle(document.body).backgroundColor);
  function background(el) {
    const layers = [];
    for (let a = el; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/url\(/.test(cs.backgroundImage)) return null; // gradient
      const c = rgb(cs.backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0)) { layers.push(c); if (c[3] === undefined || c[3] === 1) break; }
      if (a.className && typeof a.className === 'string' && /field|glass|stage/.test(a.className)) return null;
    }
    let base = pageBg.length >= 3 ? pageBg.slice(0, 3) : [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) base = mix(layers[i], base);
    return base;
  }
  for (const el of content) {
    if (!hasText(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') continue; // gradient text
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
  main.querySelectorAll('button, a.btn, a.btn-primary, a.btn-secondary, a.btn-ghost, input:not([type=radio]):not([type=checkbox]):not([type=hidden]), select, textarea').forEach((el) => {
    if (!visible(el) || el.closest('[aria-hidden="true"]')) return;
    const r = el.getBoundingClientRect();
    if (r.height < 43.5) out.push(`target ${Math.round(r.height)}px tall: ${name(el)}`);
  });
  return [...new Set(out)];
}

(async () => {
  const b = await chromium.launch();
  let failures = 0;
  const report = [];
  for (const w of WIDTHS) {
    for (const route of ROUTES) {
      const id = (route === '/' ? 'home' : route.slice(1).replace(/\//g, '_'));
      const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500, reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference' });
      const p = await ctx.newPage();
      const errors = [];
      p.on('console', (m) => { if (m.type() === 'error' && !/turnstile|challenges\.cloudflare|favicon|supabase|Failed to load resource/i.test(m.text())) errors.push(m.text().slice(0, 140)); });
      p.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 140)));
      try {
        await p.goto(B + route, { waitUntil: 'load', timeout: 90000 });
      } catch (e) { report.push(`FAIL ${id} @${w}\n      - load: ${e.message.slice(0, 120)}`); failures++; await ctx.close(); continue; }
      // scroll through so count-ups and lazy sections render, then back to top
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(+(process.env.WAIT || 5000));
      const problems = [...(await p.evaluate(audit)), ...errors.map((e) => 'console: ' + e)];
      await p.screenshot({ path: `${OUT}/shots/${id}-${w}.png`, fullPage: true });
      report.push(`${problems.length ? 'FAIL' : 'ok  '} ${id} @${w}${problems.length ? '\n      - ' + problems.join('\n      - ') : ''}`);
      failures += problems.length ? 1 : 0;
      await ctx.close();
    }
  }
  const text = report.join('\n') + `\n\n${failures} failing case(s) of ${WIDTHS.length * ROUTES.length}\n`;
  fs.writeFileSync(`${OUT}/report.txt`, text);
  console.log(text);
  await b.close();
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error('HARNESS ERROR', e.message); process.exit(2); });
