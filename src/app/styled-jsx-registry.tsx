'use client'

// styled-jsx style registry for the App Router.
//
// Why this exists: every v2 section uses styled-jsx (`<style jsx>`). In the App
// Router, styled-jsx does NOT inline its styles into the server-rendered HTML on
// its own, without this registry the component CSS ships inside the JS bundle and
// only paints after hydration, which is the flash-of-unstyled-content seen on a
// hard refresh. `useServerInsertedHTML` collects every component's styles during
// SSR and flushes them into the streamed <head>, so the first byte is fully styled.
//
// This is the pattern documented by Next.js:
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-jsx

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [jsxStyleRegistry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles()
    jsxStyleRegistry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}
