'use client'

import { CSSProperties } from 'react'

type PhotoImgProps = {
  src: string
  alt: string
  style?: CSSProperties
}

export default function PhotoImg({ src, alt, style }: PhotoImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
