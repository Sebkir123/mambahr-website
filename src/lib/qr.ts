import qrcode from 'qrcode-generator'

/**
 * A QR code as one SVG path (one 1x1 square per dark module), so the pass on
 * the site and the pass image for the email draw the identical code.
 * Error correction M: survives a little print blur, stays compact for a URL.
 */
export function qrPath(text: string): { size: number; d: string } {
  const qr = qrcode(0, 'M')
  qr.addData(text)
  qr.make()
  const n = qr.getModuleCount()
  let d = ''
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`
    }
  }
  return { size: n, d }
}

/** The same code as a standalone SVG document, for an <img> data URI. */
export function qrSvg(text: string, color = '#1F1B26'): string {
  const { size, d } = qrPath(text)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><path fill="${color}" d="${d}"/></svg>`
}
