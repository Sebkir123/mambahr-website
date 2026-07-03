'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './image-crop-modal.module.css'

const FRAME_W = 440 // display px; output canvas renders at 2x this for sharpness
const OUTPUT_SCALE = 2

const PRESETS: { label: string; value: number | null }[] = [
  { label: 'Original', value: null },
  { label: 'Social 1.91:1', value: 1200 / 630 },
  { label: 'Square', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
]

type Props = {
  file: File
  defaultAspect?: number | null
  onCancel: () => void
  onConfirm: (blob: Blob) => void
}

// Pan-and-zoom cropper (same interaction model as Twitter/LinkedIn's photo
// picker): the image always fully covers a fixed-aspect frame, you drag to
// reposition and use the slider to zoom in, so there's no resize-handle math
// and no way to leave blank space in the exported crop.
export default function ImageCropModal({ file, defaultAspect = null, onCancel, onConfirm }: Props) {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [aspect, setAspect] = useState<number | null>(defaultAspect)
  const [minScale, setMinScale] = useState(1)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [saving, setSaving] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  // Deliberately create+revoke the object URL in one effect, synced via
  // setState, rather than a useMemo'd URL with a separate cleanup effect:
  // React Strict Mode's dev-only mount→cleanup→remount replay would revoke
  // the memoized URL one extra time without recreating it, so the <img> ends
  // up pointing at an already-revoked blob (verified: ERR_FILE_NOT_FOUND).
  useEffect(() => {
    const url = URL.createObjectURL(file)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  // Frame height in display px, derived from the chosen aspect (or the
  // image's own natural aspect when "Original" is selected).
  const frameH = useMemo(() => {
    if (aspect) return FRAME_W / aspect
    if (natural.w) return FRAME_W * (natural.h / natural.w)
    return FRAME_W
  }, [aspect, natural])

  function clamp(nx: number, ny: number, s: number) {
    const dw = natural.w * s
    const dh = natural.h * s
    const minX = Math.min(0, FRAME_W - dw)
    const minY = Math.min(0, frameH - dh)
    return { x: Math.min(0, Math.max(minX, nx)), y: Math.min(0, Math.max(minY, ny)) }
  }

  function fitToFrame(w: number, h: number, targetAspect: number | null) {
    const fh = targetAspect ? FRAME_W / targetAspect : FRAME_W * (h / w)
    const s = Math.max(FRAME_W / w, fh / h)
    setMinScale(s)
    setScale(s)
    setPos({ x: (FRAME_W - w * s) / 2, y: (fh - h * s) / 2 })
  }

  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const w = e.currentTarget.naturalWidth
    const h = e.currentTarget.naturalHeight
    setNatural({ w, h })
    fitToFrame(w, h, aspect)
  }

  function changeAspect(a: number | null) {
    setAspect(a)
    if (natural.w) fitToFrame(natural.w, natural.h, a)
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y }
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setPos(clamp(dragRef.current.origX + dx, dragRef.current.origY + dy, scale))
  }
  function onPointerUp() {
    dragRef.current = null
  }

  function onZoom(e: React.ChangeEvent<HTMLInputElement>) {
    const s = Number(e.target.value)
    // Re-anchor on the frame's center so zooming feels like it zooms "into"
    // the image rather than dragging it toward the top-left corner.
    const cx = (FRAME_W / 2 - pos.x) / scale
    const cy = (frameH / 2 - pos.y) / scale
    setScale(s)
    setPos(clamp(FRAME_W / 2 - cx * s, frameH / 2 - cy * s, s))
  }

  function confirm() {
    if (!imgUrl) return
    setSaving(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(FRAME_W * OUTPUT_SCALE)
      canvas.height = Math.round(frameH * OUTPUT_SCALE)
      const ctx = canvas.getContext('2d')
      if (!ctx) { setSaving(false); return }
      ctx.drawImage(
        img,
        pos.x * OUTPUT_SCALE,
        pos.y * OUTPUT_SCALE,
        natural.w * scale * OUTPUT_SCALE,
        natural.h * scale * OUTPUT_SCALE,
      )
      canvas.toBlob(
        (blob) => {
          setSaving(false)
          if (blob) onConfirm(blob)
        },
        file.type === 'image/png' || file.type === 'image/gif' ? 'image/png' : 'image/jpeg',
        0.92,
      )
    }
    img.src = imgUrl
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Crop image">
      <div className={styles.modal}>
        <h3 className={styles.title}>Crop image</h3>

        <div
          className={styles.frame}
          style={{ width: FRAME_W, height: frameH }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {imgUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgUrl}
              alt=""
              draggable={false}
              onLoad={onImgLoad}
              className={styles.img}
              style={{
                left: pos.x,
                top: pos.y,
                width: natural.w * scale || undefined,
                height: natural.h * scale || undefined,
              }}
            />
          )}
        </div>

        <input
          type="range"
          className={styles.zoom}
          min={minScale}
          max={minScale * 3}
          step={(minScale * 3 - minScale) / 100 || 0.01}
          value={scale}
          onChange={onZoom}
          aria-label="Zoom"
        />

        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={aspect === p.value ? styles.presetOn : styles.presetOff}
              onClick={() => changeAspect(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="button" className={styles.confirmBtn} onClick={confirm} disabled={saving || !imgUrl}>
            {saving ? 'Saving…' : 'Use photo'}
          </button>
        </div>
      </div>
    </div>
  )
}
