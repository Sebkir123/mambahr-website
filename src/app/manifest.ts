import type { MetadataRoute } from 'next'

// Web app manifest, gives installable/PWA metadata and a stable brand identity
// to search engines and OS surfaces (Android home-screen, Windows tiles, etc.).
// Colors mirror the Warm Editorial Premium system: oat background, gold accent.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MambaHR',
    short_name: 'MambaHR',
    description:
      'MambaHR does the HR admin for US companies: hiring, onboarding, time off and leave, payroll changes, and compliance. You make the judgment calls.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F2EC',
    theme_color: '#F5F2EC',
    icons: [
      { src: '/MambaHR_logo.png', sizes: '2000x2000', type: 'image/png', purpose: 'any' },
      { src: '/MambaHR_logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/MambaHR_logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    ],
  }
}
