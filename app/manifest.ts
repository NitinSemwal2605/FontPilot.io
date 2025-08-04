import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FontPilot.io - Navigate Typography with Precision. Powered by AI.',
    short_name: 'FontPilot.io',
    description: 'Navigate typography with precision using AI-powered font pairing. Find perfect font combinations for websites, logos, and digital projects instantly.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['design', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  }
} 