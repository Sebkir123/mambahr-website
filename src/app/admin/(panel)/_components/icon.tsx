const paths = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  chart: 'M4 3v17h17M8 15v-4m5 4V7m5 8V4',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  briefcase: 'M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M3 11a20 20 0 0 0 18 0M3 6h18v14H3ZM12 10v4',
  inbox: 'M4 4h16l2 12v4H2v-4ZM2 15h6l2 3h4l2-3h6',
  book: 'M4 3h7a3 3 0 0 1 3 3v15a4 4 0 0 0-4-2H4Zm10 3a3 3 0 0 1 3-3h4v16h-3a4 4 0 0 0-4 2',
  file: 'M14 2H4v20h16V8Zm0 0v6h6M8 13h8m-8 4h5',
  social: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8Z',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  deck: 'M3 3h18v13H3ZM12 16v5m-5 0 5-5 5 5M7 11l3-3 3 2 4-5',
  arrow: 'M7 17 17 7M7 7h10v10',
  chevron: 'm9 5 7 7-7 7',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z',
  logout: 'M9 21H3V3h6m7 14 5-5-5-5m-9 5h14',
  refresh: 'M20 7v5h-5M4 17v-5h5M6 5a8 8 0 0 1 13 3M5 16a8 8 0 0 0 13 3',
  check: 'm5 12 4 4L19 6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',
} as const
export type IconName = keyof typeof paths
export default function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}><path d={paths[name]} /></svg>
}
