type MambaMarkProps = {
  size?: number
  alt?: string
}

export default function MambaMark({ size = 24, alt = 'MambaHR' }: MambaMarkProps) {
  return (
    <img
      src="/MambaHR_logo.png"
      alt={alt}
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
    />
  )
}
