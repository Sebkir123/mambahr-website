import type { MetadataRoute } from 'next'

// Web app manifest, gives installable/PWA metadata and a stable brand identity
// to search engines and OS surfaces (Android home-screen, Windows tiles, etc.).
// Colors mirror the Warm Editorial Premium system: oat background, gold accent.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MambaHR, The AI HR Department',
    short_name: 'MambaHR',
    description:
      'The AI HR department for US companies, hiring, onboarding, time off, performance, compliance, and payroll-ready exports, run end to end.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F2EC',
    theme_color: '#8A6535',
    icons: [
      { src: '/MambaHR_logo.png', sizes: '2000x2000', type: 'image/png', purpose: 'any' },
      { src: '/MambaHR_logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/MambaHR_logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    ],
  }
}
