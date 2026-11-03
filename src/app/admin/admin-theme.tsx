'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'
import styles from './admin-theme.module.css'

type Theme = 'light' | 'dark'
const listeners = new Set<() => void>()
const ThemeContext = createContext({ theme: 'light' as Theme, toggle: () => {} })
const key = 'mambahr-admin-theme'
let fallback: Theme = 'light'
function snapshot(): Theme {
  try { return localStorage.getItem(key) === 'dark' ? 'dark' : 'light' } catch { return fallback }
}
function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  return () => { listeners.delete(listener); window.removeEventListener('storage', listener) }
}
export function useAdminTheme() { return useContext(ThemeContext) }

export default function AdminTheme({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, snapshot, () => 'light' as Theme)
  function toggle() {
    fallback = theme === 'light' ? 'dark' : 'light'
    try { localStorage.setItem(key, fallback) } catch { /* use the in-memory preference */ }
    listeners.forEach((listener) => listener())
  }
  return <ThemeContext.Provider value={{ theme, toggle }}><div className={styles.root} data-admin-theme={theme}>{children}</div></ThemeContext.Provider>
}
