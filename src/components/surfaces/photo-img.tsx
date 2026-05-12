'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'

type PhotoImgProps = {
  src: string
  alt: string
  style?: CSSProperties
  width?: number
  height?: number
}

export default function PhotoImg({ src, alt, style, width = 400, height = 400 }: PhotoImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
