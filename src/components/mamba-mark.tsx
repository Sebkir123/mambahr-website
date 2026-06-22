// MambaHR brand mark, the official serif-M silhouette (alpha-only PNG at
// /brand/mamba-mark.png), painted as a CSS mask filled with `currentColor`.
// One asset tints to any context (ink on cream, paper on ink) and never
// carries a box. <MambaLockup> wraps it in the brand lockup: a thin gold
// double-rule frame with the gold→violet signature dash beneath the M.

import styles from './mamba-mark.module.css'

const SRC = '/brand/mamba-mark.png'

type MarkProps = {
  /** Square box size in px. */
  size?: number
  /** Mask fill, any CSS color or var(). Defaults to currentColor. */
  color?: string
  className?: string
  title?: string
}

export function MambaMark({ size = 22, color, className, title }: MarkProps) {
  const a11y = title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const }
  return (
    <span
      {...a11y}
      className={`${styles.mark} ${className ?? ''}`.trim()}
      style={{ width: size, height: size, ...(color ? { color } : null) }}
    />
  )
}

type LockupProps = {
  /** Outer frame size in px. */
  size?: number
  className?: string
  title?: string
}

// The brand lockup the design system uses: ink serif M, hairline gold
// double-rule frame, gold→violet dash. Light surfaces only (the deck is light).
export function MambaLockup({ size = 116, className, title = 'MambaHR' }: LockupProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`${styles.lockup} ${className ?? ''}`.trim()}
      style={{ width: size, height: size }}
    >
      <span className={styles.lockupMark} style={{ color: 'var(--text)' }} />
      <span className={styles.lockupDash} aria-hidden="true" />
    </span>
  )
}
