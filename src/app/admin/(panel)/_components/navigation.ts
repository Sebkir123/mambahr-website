import type { IconName } from './icon'
export type NavItem = { href: string; label: string; icon: IconName; exact?: boolean }
export const NAVIGATION: { label: string; items: NavItem[] }[] = [
  { label: 'Workspace', items: [
    { href: '/admin', label: 'Overview', icon: 'home', exact: true },
    { href: '/admin/site', label: 'Website analytics', icon: 'chart' },
  ] },
  { label: 'Publishing', items: [
    { href: '/admin/blog', label: 'Blog', icon: 'file' },
    { href: '/admin/resources', label: 'Resources', icon: 'book' },
    { href: '/admin/field-guides', label: 'Field guides', icon: 'book' },
    { href: '/admin/seo', label: 'Search health', icon: 'search' },
  ] },
]
export const PAGES = NAVIGATION.flatMap((group) => group.items)
export function activeNav(pathname: string): string {
  return PAGES.find((item) => item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? '/admin'
}
