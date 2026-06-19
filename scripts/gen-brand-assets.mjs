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

// ── Brand LOCKUP ───────────────────────────────────────────────────────────
// The real logo as used on the deck + site: the M inside a hairline gold
// double-rule frame with the gold→violet signature dash beneath. Composed here
// to match mamba-mark.module.css (.lockup) exactly, at a 248² viewBox (2× the
// deck's 124px) so the fixed-px frame/dash proportions carry over.
const GOLD_LIGHT = '#C49A6C'
// --grad: linear-gradient(100deg, #B98A4E 0%, #8A6535 48%, #6A5DA6 100%)
const markPath = inkSvg.match(/<path d="([^"]+)"/)?.[1] ?? ''
const MARK_SCALE = 144 / 1665 // .lockupMark is 58% of 248 ≈ 144

function lockupSvg(markHex) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="248" height="248" viewBox="0 0 248 248" fill="none">
  <defs>
    <linearGradient id="mambaDash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B98A4E"/>
      <stop offset="48%" stop-color="#8A6535"/>
      <stop offset="100%" stop-color="#6A5DA6"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="246" height="246" fill="none" stroke="${GOLD_LIGHT}" stroke-width="2"/>
  <rect x="14" y="14" width="220" height="220" fill="none" stroke="${GOLD_LIGHT}" stroke-opacity="0.55" stroke-width="2"/>
  <g transform="translate(52 37) scale(${MARK_SCALE})"><path d="${markPath}" fill="${markHex}"/></g>
  <rect x="96.7" y="204" width="54.6" height="4" rx="2" fill="url(#mambaDash)"/>
</svg>
`
}

const lockupInk = lockupSvg(INK)
const lockupPaper = lockupSvg(PAPER)
await writeFile('public/brand/mamba-logo-light.svg', lockupInk)
await writeFile('public/brand/mamba-logo-dark.svg', lockupPaper)
await writeFile(
  'public/brand/mamba-logo-light.png',
  await sharp(Buffer.from(lockupInk), { density: 384 }).resize(744, 744).png().toBuffer(),
)
await writeFile(
  'public/brand/mamba-logo-dark.png',
  await sharp(Buffer.from(lockupPaper), { density: 384 }).resize(744, 744).png().toBuffer(),
)

console.log('Wrote mamba-mark-{light,dark}.{png,svg} + mamba-logo-{light,dark}.{png,svg} to public/brand/')
