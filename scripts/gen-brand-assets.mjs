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
await writeFile('public/brand/mamba-mark-light.svg', await tracedSvg(INK))
await writeFile('public/brand/mamba-mark-dark.svg', await tracedSvg(PAPER))

console.log('Wrote mamba-mark-{light,dark}.{png,svg} to public/brand/')
