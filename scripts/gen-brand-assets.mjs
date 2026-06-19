// Generates downloadable brand-mark assets from the master alpha silhouette
// (public/brand/mamba-mark.png, a 1665² RGBA where the serif M lives in the
// alpha channel). Produces, into public/brand/:
//
//   mamba-mark-light.{svg,png}  — ink mark (#1A1A19), for LIGHT backgrounds
//   mamba-mark-dark.{svg,png}   — paper mark (#FEFDFA), for DARK backgrounds
//
// PNGs are tinted via sharp (color fill + the master's alpha). SVGs are TRUE
// vector — potrace traces the silhouette to a path, so they scale infinitely.
// Both PNG and SVG have transparent backgrounds.
//
// One-time / on-demand. Run: node scripts/gen-brand-assets.mjs
// Requires potrace at run time: npm i potrace --no-save (not a runtime dep).

import sharp from 'sharp'
import { trace } from 'potrace'
import { promisify } from 'node:util'
import { writeFile } from 'node:fs/promises'

const MASTER = 'public/brand/mamba-mark.png'
const INK = '#1A1A19'
const PAPER = '#FEFDFA'
const traceP = promisify(trace)

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

const meta = await sharp(MASTER).metadata()
const { width, height } = meta

// The M silhouette, as a 1-channel alpha buffer (M = 255, background = 0).
const alpha = await sharp(MASTER).extractChannel('alpha').toColourspace('b-w').raw().toBuffer()

// PNG: solid color fill carrying the master alpha → colored M on transparency.
async function tintedPng(hex) {
  const { r, g, b } = hexToRgb(hex)
  return sharp({ create: { width, height, channels: 3, background: { r, g, b } } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer()
}

// SVG: potrace wants a dark-on-white raster; negate the alpha (M → black).
const forTrace = await sharp(MASTER).extractChannel('alpha').negate().png().toBuffer()
async function tracedSvg(hex) {
  return traceP(forTrace, {
    color: hex,
    background: 'transparent',
    threshold: 128,
    turdSize: 2,
    optCurve: true,
    optTolerance: 0.2,
  })
}

await writeFile('public/brand/mamba-mark-light.png', await tintedPng(INK))
await writeFile('public/brand/mamba-mark-dark.png', await tintedPng(PAPER))
const inkSvg = await tracedSvg(INK)
const paperSvg = await tracedSvg(PAPER)
await writeFile('public/brand/mamba-mark-light.svg', inkSvg)
await writeFile('public/brand/mamba-mark-dark.svg', paperSvg)

// ── Brand LOCKUP (the real logo: gold M + "MambaHR" wordmark) ───────────────
// Horizontal lockup as used on the deck + site. The wordmark is traced to a
// vector path once via a headless render of Fraunces 600 (see the note below)
// and cached in scripts/wordmark-path.json, so regeneration needs no browser.
import { readFileSync } from 'node:fs'
const GOLD = '#8A6535'
const markPath = inkSvg.match(/<path d="([^"]+)"/)?.[1] ?? ''
const { path: wmPath, ww, wh } = JSON.parse(readFileSync('scripts/wordmark-path.json', 'utf8'))

// Measure the M glyph's tight box inside its 1665 frame so we can cap-align it
// to the wordmark.
const markRaster = await sharp(
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1665 1665" width="1665" height="1665"><path d="${markPath}" fill="#000"/></svg>`),
).png().toBuffer()
const mTrim = await sharp(markRaster).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true })
const mw = mTrim.info.width
const mh = mTrim.info.height
const mox = -(mTrim.info.trimOffsetLeft ?? 0)
const moy = -(mTrim.info.trimOffsetTop ?? 0)

const H = 1000 // wordmark cap height (units)
const sw = H / wh
const wordW = ww * sw
const markH = 1.22 * H // mark reads slightly taller than the wordmark
const sm = markH / mh
const markW = mw * sm
const gap = 0.36 * H
const W = Math.round(markW + gap + wordW)
const Hc = Math.round(markH)
const wy = (markH - H) / 2

function lockupSvg(wordFill) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hc}" viewBox="0 0 ${W} ${Hc}" fill="none">
  <g transform="translate(${(-mox * sm).toFixed(2)} ${(-moy * sm).toFixed(2)}) scale(${sm.toFixed(5)})"><path d="${markPath}" fill="${GOLD}"/></g>
  <g transform="translate(${markW.toFixed(2)} ${wy.toFixed(2)})"><g transform="translate(${gap.toFixed(2)} 0) scale(${sw.toFixed(5)})"><path d="${wmPath}" fill="${wordFill}"/></g></g>
</svg>
`
}

const lockupLight = lockupSvg(INK)
const lockupDark = lockupSvg(PAPER)
await writeFile('public/brand/mamba-logo-light.svg', lockupLight)
await writeFile('public/brand/mamba-logo-dark.svg', lockupDark)
await writeFile('public/brand/mamba-logo-light.png', await sharp(Buffer.from(lockupLight), { density: 110 }).resize(1600).png().toBuffer())
await writeFile('public/brand/mamba-logo-dark.png', await sharp(Buffer.from(lockupDark), { density: 110 }).resize(1600).png().toBuffer())

console.log('Wrote mamba-mark-{light,dark}.{png,svg} + mamba-logo-{light,dark}.{png,svg} to public/brand/')
// To re-trace the wordmark (e.g. font/weight change): render "MambaHR" in
// Fraunces 600 black-on-white, potrace it, and overwrite scripts/wordmark-path.json
// with { path, ww, wh }. See scripts/_compose-lockup.mjs history.
