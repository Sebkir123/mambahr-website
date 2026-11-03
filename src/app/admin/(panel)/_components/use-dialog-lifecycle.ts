'use client'

import { useEffect, type RefObject } from 'react'

// CSS can hide a modal while the browser still keeps its document inert.
// Close the native dialog before hiding a responsive drawer, and whenever
// navigation leaves the page that opened it.
export function useDialogLifecycle(ref: RefObject<HTMLDialogElement | null>, pathname: string, hiddenWhen?: string) {
  useEffect(() => { ref.current?.close() }, [ref, pathname])
  useEffect(() => {
    const dialog = ref.current
    const media = hiddenWhen ? window.matchMedia(hiddenWhen) : null
    const closeWhenHidden = () => { if (media?.matches) dialog?.close() }
    closeWhenHidden()
    media?.addEventListener('change', closeWhenHidden)
    return () => { media?.removeEventListener('change', closeWhenHidden); dialog?.close() }
  }, [ref, hiddenWhen])
}
