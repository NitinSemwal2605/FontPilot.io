import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FontPair.ai - AI-Powered Font Pairing Assistant',
  description: 'Find perfect font combinations instantly with AI. Generate beautiful typography pairings for your designs with mood, brand, or font-based suggestions.',
  keywords: 'font pairing, typography, AI, design, Google Fonts, font combinations',
  authors: [{ name: 'FontPair.ai Team' }],
  openGraph: {
    title: 'FontPair.ai - AI-Powered Font Pairing Assistant',
    description: 'Find perfect font combinations instantly with AI. Generate beautiful typography pairings for your designs.',
    type: 'website',
    url: 'https://fontpair.ai',
    siteName: 'FontPair.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FontPair.ai - AI-Powered Font Pairing Assistant',
    description: 'Find perfect font combinations instantly with AI.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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
      </body>
    </html>
  )
} 