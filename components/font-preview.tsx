'use client'

import { useEffect, useState } from 'react'
import { loadGoogleFont, formatFontFamily } from '@/lib/fonts'

interface FontPreviewProps {
  headingFont: string
  bodyFont: string
  headingText: string
  bodyText: string
  className?: string
}

export default function FontPreview({ 
  headingFont, 
  bodyFont, 
  headingText, 
  bodyText, 
  className = '' 
}: FontPreviewProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        setLoading(true)
        await loadGoogleFont(formatFontFamily(headingFont))
        await loadGoogleFont(formatFontFamily(bodyFont))
        setFontsLoaded(true)
      } catch (error) {
        console.error('Failed to load fonts:', error)
        setFontsLoaded(true) // Show text anyway
      } finally {
        setLoading(false)
      }
    }

    loadFonts()
  }, [headingFont, bodyFont])

  if (loading) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="text-2xl font-semibold text-white animate-pulse bg-gray-700 h-8 rounded"></div>
        <div className="text-sm text-gray-300 animate-pulse bg-gray-700 h-16 rounded"></div>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div 
        className="text-2xl font-semibold text-white"
        style={{ 
          fontFamily: fontsLoaded ? `'${formatFontFamily(headingFont)}', serif` : 'inherit'
        }}
      >
        {headingText}
      </div>
      <div 
        className="text-sm text-gray-300 leading-relaxed"
        style={{ 
          fontFamily: fontsLoaded ? `'${formatFontFamily(bodyFont)}', sans-serif` : 'inherit'
        }}
      >
        {bodyText}
      </div>
    </div>
  )
} 