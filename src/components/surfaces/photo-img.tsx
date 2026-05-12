'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'

type PhotoImgProps = {
  src: string
  alt: string
  style?: CSSProperties
  width?: number
  height?: number
  sizes?: string
}

export default function PhotoImg({ src, alt, style, width = 400, height = 400, sizes }: PhotoImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      sizes={sizes}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
