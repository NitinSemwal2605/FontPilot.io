import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import StructuredData from './components/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://fontpilot.io'),
  title: {
    default: 'FontPilot.io - Navigate Typography with Precision. Powered by AI.',
    template: '%s | FontPilot.io'
  },
  description: 'Navigate typography with precision using AI-powered font pairing. Find perfect font combinations for websites, logos, and digital projects instantly. Free font pairing tool with Google Fonts integration.',
  keywords: [
    'font pairing',
    'typography',
    'AI font combinations',
    'Google Fonts',
    'web design',
    'font combinations',
    'typography tool',
    'font matching',
    'design tools',
    'font pairing generator',
    'AI typography',
    'font selection',
    'web typography',
    'design resources',
    'font recommendations'
  ],
  authors: [{ name: 'Nitin Semwal', url: 'https://github.com/NitinSemwal2605' }],
  creator: 'Nitin Semwal',
  publisher: 'FontPair.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fontpilot.io',
    siteName: 'FontPilot.io',
    title: 'FontPilot.io - Navigate Typography with Precision. Powered by AI.',
    description: 'Navigate typography with precision using AI-powered font pairing. Find perfect font combinations for websites, logos, and digital projects instantly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FontPair.ai - AI-Powered Font Pairing Tool',
      },
    ],
  },
      twitter: {
      card: 'summary_large_image',
      site: '@nitintweetz',
      creator: '@nitintweetz',
      title: 'FontPilot.io - Navigate Typography with Precision. Powered by AI.',
      description: 'Navigate typography with precision using AI-powered font pairing. Find perfect font combinations instantly.',
      images: ['/og-image.png'],
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://fontpilot.io',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
} 